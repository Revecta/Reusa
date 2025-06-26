/*
  # Add reused column to existing boxes table

  1. Changes
    - Add `reused` boolean column to existing `boxes` table
    - Set default value to false for existing records
    - Update existing records to have reused = false

  2. Notes
    - The boxes table and its policies already exist from previous migration
    - This migration only adds the missing reused column
    - No need to recreate existing policies or indexes
*/

-- Add reused column to existing boxes table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'boxes' AND column_name = 'reused'
  ) THEN
    ALTER TABLE boxes ADD COLUMN reused boolean DEFAULT false;
  END IF;
END $$;

-- Update any existing records to have reused = false if they don't have a value
UPDATE boxes SET reused = false WHERE reused IS NULL;