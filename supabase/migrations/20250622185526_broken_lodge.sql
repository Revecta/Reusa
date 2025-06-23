/*
  # Create boxes table for storing user box dimensions

  1. New Tables
    - `boxes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `width_cm` (integer, box width in centimeters)
      - `height_cm` (integer, box height in centimeters)
      - `depth_cm` (integer, box depth in centimeters)
      - `volume_l` (float, calculated volume in liters)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `boxes` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to insert their own data
    - Add policy for authenticated users to update their own data
    - Add policy for authenticated users to delete their own data

  3. Indexes
    - Add index on user_id for faster queries
    - Add index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS boxes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  width_cm integer NOT NULL CHECK (width_cm > 0),
  height_cm integer NOT NULL CHECK (height_cm > 0),
  depth_cm integer NOT NULL CHECK (depth_cm > 0),
  volume_l float NOT NULL CHECK (volume_l > 0),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE boxes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own boxes"
  ON boxes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own boxes"
  ON boxes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own boxes"
  ON boxes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own boxes"
  ON boxes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS boxes_user_id_idx ON boxes(user_id);
CREATE INDEX IF NOT EXISTS boxes_created_at_idx ON boxes(created_at DESC);
CREATE INDEX IF NOT EXISTS boxes_volume_idx ON boxes(volume_l);