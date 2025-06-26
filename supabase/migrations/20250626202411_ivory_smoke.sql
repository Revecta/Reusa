/*
  # Fix boxes table migration - avoid policy conflicts

  1. New Tables
    - `boxes` - User box dimensions with reuse tracking
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `width_cm` (integer, box width in centimeters)
      - `height_cm` (integer, box height in centimeters)
      - `depth_cm` (integer, box depth in centimeters)
      - `volume_l` (float, calculated volume in liters)
      - `reused` (boolean, tracking reuse status)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `boxes` table
    - Add policies for authenticated users to manage their own data

  3. Indexes
    - Add indexes for better performance
*/

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can read own boxes" ON boxes;
DROP POLICY IF EXISTS "Users can insert own boxes" ON boxes;
DROP POLICY IF EXISTS "Users can update own boxes" ON boxes;
DROP POLICY IF EXISTS "Users can delete own boxes" ON boxes;

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS boxes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  width_cm integer NOT NULL CHECK (width_cm > 0),
  height_cm integer NOT NULL CHECK (height_cm > 0),
  depth_cm integer NOT NULL CHECK (depth_cm > 0),
  volume_l float NOT NULL CHECK (volume_l > 0),
  reused boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE boxes ENABLE ROW LEVEL SECURITY;

-- Create policies with unique names
CREATE POLICY "boxes_select_own" ON boxes
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "boxes_insert_own" ON boxes
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "boxes_update_own" ON boxes
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "boxes_delete_own" ON boxes
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS boxes_user_id_idx ON boxes(user_id);
CREATE INDEX IF NOT EXISTS boxes_created_at_idx ON boxes(created_at DESC);
CREATE INDEX IF NOT EXISTS boxes_volume_idx ON boxes(volume_l);