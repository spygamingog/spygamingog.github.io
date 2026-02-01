-- ============================================================================
-- SPYRUN MANHUNT SCHEMA
-- Run this in your Supabase SQL Editor to set up the database for Manhunt.
-- ============================================================================

-- 1. Create the Matches Table
-- Stores general information about each match.
CREATE TABLE matches_manhunt (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mode TEXT NOT NULL,                  -- e.g., '1v1', '1v2', '2v4'
    start_time TIMESTAMPTZ DEFAULT NOW(),
    end_time TIMESTAMPTZ,                -- Null if match is still in progress
    winner_team TEXT,                    -- 'runners' or 'hunters' (Null if in progress)
    duration_ms BIGINT,                  -- Match duration in milliseconds
    status TEXT DEFAULT 'in_progress',   -- 'in_progress', 'completed', 'cancelled'
    server_id TEXT                       -- ID of the server hosting the match
);

-- 2. Create the Participants Table
-- Stores every player involved in a match and their team.
CREATE TABLE match_participants_manhunt (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    match_id UUID REFERENCES matches_manhunt(id) ON DELETE CASCADE,
    player_uuid TEXT NOT NULL,
    player_name TEXT NOT NULL,
    team TEXT NOT NULL,                  -- 'runner' or 'hunter'
    is_winner BOOLEAN                    -- True if this player won
);

-- 3. Create the Leaderboard Table
-- Tracks cumulative stats for each player.
CREATE TABLE leaderboard_manhunt (
    player_uuid TEXT PRIMARY KEY,
    player_name TEXT NOT NULL,
    wins_runner INT DEFAULT 0,
    wins_hunter INT DEFAULT 0,
    losses_runner INT DEFAULT 0,
    losses_hunter INT DEFAULT 0,
    total_matches INT DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS) - Optional but recommended
-- This allows anyone to read, but only service_role (your plugin) to write.
ALTER TABLE matches_manhunt ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_participants_manhunt ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_manhunt ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so the website can show data)
CREATE POLICY "Public Read Matches" ON matches_manhunt FOR SELECT USING (true);
CREATE POLICY "Public Read Participants" ON match_participants_manhunt FOR SELECT USING (true);
CREATE POLICY "Public Read Leaderboard" ON leaderboard_manhunt FOR SELECT USING (true);

-- ============================================================================
-- HOW TO USE:
-- 1. Copy the content of this file.
-- 2. Go to your Supabase Dashboard -> SQL Editor.
-- 3. Paste and run the script.
-- ============================================================================
