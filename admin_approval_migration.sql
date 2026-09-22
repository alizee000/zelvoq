-- 1. Add flat_number, role, and status to profiles
ALTER TABLE profiles 
ADD COLUMN flat_number TEXT,
ADD COLUMN role TEXT DEFAULT 'resident' CHECK (role IN ('resident', 'admin')),
ADD COLUMN status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- 2. Automatically approve the default test user and make them an admin
UPDATE profiles 
SET status = 'approved', role = 'admin' 
WHERE name = 'Koodu' OR name = 'Zeeshan';

-- 3. Update RLS policies so only approved residents can see data
-- (This replaces the old policies)
-- Example for feed_posts:
-- DROP POLICY IF EXISTS "Strict society isolation for feed_posts" ON feed_posts;
-- CREATE POLICY "Strict society isolation for feed_posts" 
-- ON feed_posts FOR ALL 
-- TO authenticated
-- USING (
--   society_id = auth.user_society_id() AND 
--   EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.status = 'approved')
-- );
