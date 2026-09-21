-- Create polls table
CREATE TABLE polls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    society_id UUID REFERENCES societies(id) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- e.g., 'budget', 'event', 'policy'
    created_by TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create poll_votes table
CREATE TABLE poll_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    poll_id UUID REFERENCES polls(id) ON DELETE CASCADE NOT NULL,
    user_name TEXT NOT NULL, -- using name as identifier for prototype
    vote TEXT NOT NULL CHECK (vote IN ('yes', 'no')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(poll_id, user_name)
);

-- Enable RLS
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read polls" ON polls FOR SELECT USING (true);
CREATE POLICY "Allow public insert polls" ON polls FOR INSERT WITH CHECK (true);

ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read poll_votes" ON poll_votes FOR SELECT USING (true);
CREATE POLICY "Allow public insert poll_votes" ON poll_votes FOR INSERT WITH CHECK (true);

-- Insert some sample polls for the test society
DO $$ 
DECLARE
    soc_id UUID;
BEGIN
    SELECT id INTO soc_id FROM societies WHERE passcode = 'KOODU-2026' LIMIT 1;
    
    INSERT INTO polls (society_id, title, description, category, created_by) VALUES 
    (soc_id, 'Upgrade Gym Equipment?', 'Approve ₹1.5L from the society fund to replace the 3 broken treadmills and add a new squat rack.', 'budget', 'Admin'),
    (soc_id, 'Host a Diwali Carnival?', 'Should we organize a massive society-wide carnival next month? Ticket would be ₹500 per flat.', 'event', 'Cultural Committee'),
    (soc_id, 'Strict Delivery Hours?', 'Restrict Swiggy/Zomato entry directly to flats after 11:30 PM? (Must collect at gate)', 'policy', 'Security Admin');
END $$;
