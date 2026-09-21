-- Create societies table
CREATE TABLE IF NOT EXISTS societies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    passcode TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on societies
ALTER TABLE societies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read societies" ON societies FOR SELECT USING (true);

-- Insert a default society
INSERT INTO societies (name, passcode) 
VALUES ('Prestige Shantiniketan', 'KOODU-2026')
ON CONFLICT (passcode) DO NOTHING;

-- Get the default society ID
DO $$ 
DECLARE
    default_society_id UUID;
BEGIN
    SELECT id INTO default_society_id FROM societies WHERE passcode = 'KOODU-2026' LIMIT 1;

    -- Add society_id to profiles
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'society_id') THEN
        ALTER TABLE profiles ADD COLUMN society_id UUID REFERENCES societies(id);
    END IF;
    UPDATE profiles SET society_id = default_society_id WHERE society_id IS NULL;

    -- Add society_id to feed_posts
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'feed_posts' AND column_name = 'society_id') THEN
        ALTER TABLE feed_posts ADD COLUMN society_id UUID REFERENCES societies(id);
    END IF;
    UPDATE feed_posts SET society_id = default_society_id WHERE society_id IS NULL;

    -- Add society_id to talents
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'talents' AND column_name = 'society_id') THEN
        ALTER TABLE talents ADD COLUMN society_id UUID REFERENCES societies(id);
    END IF;
    UPDATE talents SET society_id = default_society_id WHERE society_id IS NULL;

    -- Add society_id to group_buys
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'group_buys' AND column_name = 'society_id') THEN
        ALTER TABLE group_buys ADD COLUMN society_id UUID REFERENCES societies(id);
    END IF;
    UPDATE group_buys SET society_id = default_society_id WHERE society_id IS NULL;

END $$;
