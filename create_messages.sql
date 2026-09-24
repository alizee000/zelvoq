CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid NOT NULL,
  sender_name text NOT NULL,
  receiver_name text NOT NULL,
  text text NOT NULL,
  created_at timestamp with time zone default timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read messages they sent or received
CREATE POLICY "Allow users to read their messages"
ON messages FOR SELECT
USING (true); -- For demo simplicity, allow all reads

-- Allow anyone to insert messages
CREATE POLICY "Allow anyone to insert messages"
ON messages FOR INSERT
WITH CHECK (true);
