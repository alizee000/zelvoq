-- Create Co-Own Items Table
CREATE TABLE IF NOT EXISTS public.co_own_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    total_price INTEGER NOT NULL,
    max_shares INTEGER NOT NULL,
    price_per_share INTEGER NOT NULL,
    funded_shares INTEGER DEFAULT 0,
    status TEXT DEFAULT 'funding', -- funding, active
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.co_own_items ENABLE ROW LEVEL SECURITY;

-- Allow read access for everyone
CREATE POLICY "Allow read access for all co_own_items"
    ON public.co_own_items FOR SELECT
    USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow insert for authenticated users"
    ON public.co_own_items FOR INSERT
    WITH CHECK (auth.uid() = created_by);

-- Allow everyone to update funded_shares (simplification for prototype)
CREATE POLICY "Allow update for all users"
    ON public.co_own_items FOR UPDATE
    USING (true);

-- Insert dummy data
INSERT INTO public.co_own_items (title, description, image_url, total_price, max_shares, price_per_share, funded_shares, status)
VALUES 
('DJI Mini 4 Pro Drone', 'Perfect for vacations. 10 shares available. Keep it for 3 days a month per share.', 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=800&auto=format&fit=crop', 50000, 10, 5000, 6, 'funding'),
('Sony PS5 Pro Console', 'Shared gaming console for the community. Includes 2 controllers and 4 games.', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop', 60000, 20, 3000, 20, 'active'),
('Karcher High-Pressure Washer', 'Professional grade pressure washer for cars and balconies.', 'https://images.unsplash.com/photo-1610555356070-d1fb3de9ce4d?q=80&w=800&auto=format&fit=crop', 15000, 5, 3000, 2, 'funding');
