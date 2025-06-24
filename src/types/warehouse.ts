export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  role: 'ADMIN' | 'MANAGER' | 'OPERATOR' | 'VIEWER';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  zone?: string;
  aisle?: string;
  shelf?: string;
  position?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  category_id?: string;
  location_id?: string;
  length_m: number;
  width_m: number;
  height_m: number;
  volume_m3: number;
  weight_kg: number;
  current_stock: number;
  min_stock: number;
  max_stock?: number;
  notes?: string;
  barcode?: string;
  image_url?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  category?: Category;
  location?: Location;
}

export interface Movement {
  id: string;
  product_id: string;
  type: 'IN' | 'OUT' | 'TRANSFER' | 'ADJUSTMENT';
  quantity: number;
  previous_stock: number;
  new_stock: number;
  reference_number?: string;
  notes?: string;
  cost_per_unit?: number;
  total_cost?: number;
  from_location_id?: string;
  to_location_id?: string;
  created_by: string;
  created_at: string;
  
  // Relations
  product?: Product;
  from_location?: Location;
  to_location?: Location;
  created_by_profile?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'LOW_STOCK' | 'MOVEMENT' | 'SYSTEM';
  title: string;
  message: string;
  product_id?: string;
  read: boolean;
  created_at: string;
  
  // Relations
  product?: Product;
}

export interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  recentMovements: number;
  topCategories: Array<{
    category: string;
    count: number;
    value: number;
  }>;
  stockLevels: Array<{
    date: string;
    in: number;
    out: number;
  }>;
}