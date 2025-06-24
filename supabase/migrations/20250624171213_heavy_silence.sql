/*
  # Warehouse Management System Database Schema

  1. New Tables
    - `profiles` - Extended user profiles
    - `categories` - Product categories
    - `products` - Warehouse products/items
    - `movements` - Stock movements history
    - `locations` - Warehouse locations
    - `notifications` - System notifications

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
    - Role-based access control

  3. Functions and Triggers
    - Auto-calculate volume
    - Stock level notifications
    - Movement tracking
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE movement_type AS ENUM ('IN', 'OUT', 'TRANSFER', 'ADJUSTMENT');
CREATE TYPE user_role AS ENUM ('ADMIN', 'MANAGER', 'OPERATOR', 'VIEWER');
CREATE TYPE notification_type AS ENUM ('LOW_STOCK', 'MOVEMENT', 'SYSTEM');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  role user_role DEFAULT 'OPERATOR',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  color text DEFAULT '#6B7280',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  zone text,
  aisle text,
  shelf text,
  position text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  location_id uuid REFERENCES locations(id) ON DELETE SET NULL,
  
  -- Dimensions in meters
  length_m decimal(10,3) NOT NULL CHECK (length_m > 0),
  width_m decimal(10,3) NOT NULL CHECK (width_m > 0),
  height_m decimal(10,3) NOT NULL CHECK (height_m > 0),
  volume_m3 decimal(10,6) GENERATED ALWAYS AS (length_m * width_m * height_m) STORED,
  
  -- Weight and stock
  weight_kg decimal(10,3) NOT NULL CHECK (weight_kg > 0),
  current_stock integer DEFAULT 0 CHECK (current_stock >= 0),
  min_stock integer DEFAULT 0 CHECK (min_stock >= 0),
  max_stock integer,
  
  -- Metadata
  notes text,
  barcode text,
  image_url text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Movements table
CREATE TABLE IF NOT EXISTS movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  type movement_type NOT NULL,
  quantity integer NOT NULL,
  previous_stock integer NOT NULL,
  new_stock integer NOT NULL,
  
  -- Movement details
  reference_number text,
  notes text,
  cost_per_unit decimal(10,2),
  total_cost decimal(10,2),
  
  -- Location tracking
  from_location_id uuid REFERENCES locations(id) ON DELETE SET NULL,
  to_location_id uuid REFERENCES locations(id) ON DELETE SET NULL,
  
  -- User tracking
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Admins can manage all profiles" ON profiles FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- Categories policies
CREATE POLICY "All users can view categories" ON categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers can manage categories" ON categories FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER'))
);

-- Locations policies
CREATE POLICY "All users can view locations" ON locations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers can manage locations" ON locations FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER'))
);

-- Products policies
CREATE POLICY "All users can view products" ON products FOR SELECT TO authenticated USING (true);
CREATE POLICY "Operators can create products" ON products FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER', 'OPERATOR'))
);
CREATE POLICY "Operators can update products" ON products FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER', 'OPERATOR'))
);
CREATE POLICY "Managers can delete products" ON products FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER'))
);

-- Movements policies
CREATE POLICY "All users can view movements" ON movements FOR SELECT TO authenticated USING (true);
CREATE POLICY "Operators can create movements" ON movements FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MANAGER', 'OPERATOR'))
);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);
CREATE INDEX IF NOT EXISTS products_code_idx ON products(code);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_location_idx ON products(location_id);
CREATE INDEX IF NOT EXISTS products_stock_idx ON products(current_stock, min_stock);
CREATE INDEX IF NOT EXISTS movements_product_idx ON movements(product_id);
CREATE INDEX IF NOT EXISTS movements_created_at_idx ON movements(created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_user_read_idx ON notifications(user_id, read);

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update stock after movement
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS trigger AS $$
BEGIN
  UPDATE products 
  SET current_stock = NEW.new_stock,
      updated_at = now()
  WHERE id = NEW.product_id;
  
  -- Check for low stock notification
  IF NEW.new_stock <= (SELECT min_stock FROM products WHERE id = NEW.product_id) THEN
    INSERT INTO notifications (user_id, type, title, message, product_id)
    SELECT 
      p.id,
      'LOW_STOCK',
      'Low Stock Alert',
      'Product ' || pr.name || ' is running low (Current: ' || NEW.new_stock || ', Min: ' || pr.min_stock || ')',
      NEW.product_id
    FROM profiles p
    CROSS JOIN products pr
    WHERE pr.id = NEW.product_id
    AND p.role IN ('ADMIN', 'MANAGER');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update stock
DROP TRIGGER IF EXISTS on_movement_created ON movements;
CREATE TRIGGER on_movement_created
  AFTER INSERT ON movements
  FOR EACH ROW EXECUTE PROCEDURE update_product_stock();

-- Insert default categories
INSERT INTO categories (name, description, color) VALUES
  ('Electronics', 'Electronic devices and components', '#3B82F6'),
  ('Furniture', 'Office and warehouse furniture', '#8B5CF6'),
  ('Tools', 'Hand tools and equipment', '#F59E0B'),
  ('Packaging', 'Boxes, containers, and packaging materials', '#10B981'),
  ('Raw Materials', 'Basic materials and supplies', '#6B7280'),
  ('Finished Goods', 'Ready-to-ship products', '#EF4444')
ON CONFLICT (name) DO NOTHING;

-- Insert default locations
INSERT INTO locations (name, description, zone, aisle, shelf) VALUES
  ('A1-01', 'Zone A, Aisle 1, Shelf 1', 'A', '1', '01'),
  ('A1-02', 'Zone A, Aisle 1, Shelf 2', 'A', '1', '02'),
  ('A2-01', 'Zone A, Aisle 2, Shelf 1', 'A', '2', '01'),
  ('B1-01', 'Zone B, Aisle 1, Shelf 1', 'B', '1', '01'),
  ('B1-02', 'Zone B, Aisle 1, Shelf 2', 'B', '1', '02'),
  ('RECEIVING', 'Receiving area for incoming goods', 'DOCK', 'REC', '00'),
  ('SHIPPING', 'Shipping area for outgoing goods', 'DOCK', 'SHIP', '00')
ON CONFLICT (name) DO NOTHING;