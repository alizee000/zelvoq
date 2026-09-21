-- 1. Create societies table
CREATE TABLE societies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    passcode TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Insert a default test society
INSERT INTO societies (name, passcode) 
VALUES ('Prestige Shantiniketan', 'KOODU-2026');

-- 3. Add society_id to all tables
ALTER TABLE profiles ADD COLUMN society_id UUID REFERENCES societies(id);
ALTER TABLE feed_posts ADD COLUMN society_id UUID REFERENCES societies(id);
ALTER TABLE talents ADD COLUMN society_id UUID REFERENCES societies(id);
ALTER TABLE group_buys ADD COLUMN society_id UUID REFERENCES societies(id);

-- 4. Update existing records to belong to the default society (so they don't break)
UPDATE profiles SET society_id = (SELECT id FROM societies WHERE passcode = 'KOODU-2026' LIMIT 1);
UPDATE feed_posts SET society_id = (SELECT id FROM societies WHERE passcode = 'KOODU-2026' LIMIT 1);
UPDATE talents SET society_id = (SELECT id FROM societies WHERE passcode = 'KOODU-2026' LIMIT 1);
UPDATE group_buys SET society_id = (SELECT id FROM societies WHERE passcode = 'KOODU-2026' LIMIT 1);

-- 5. Enable RLS on societies
ALTER TABLE societies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read societies" ON societies FOR SELECT USING (true);
