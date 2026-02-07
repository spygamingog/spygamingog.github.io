-- ============================================================================
-- SPYRUN MANHUNT SCHEMA UPDATE - RUNNER KILLS
-- Run this in your Supabase SQL Editor to update the leaderboard table.
-- ============================================================================

-- Add the 'runner_kills' column to the leaderboard table
ALTER TABLE leaderboard_manhunt ADD COLUMN IF NOT EXISTS runner_kills INT DEFAULT 0;

-- Optional: Update existing rows to have 0 if they were null (though DEFAULT handles new ones)
UPDATE leaderboard_manhunt SET runner_kills = 0 WHERE runner_kills IS NULL;
