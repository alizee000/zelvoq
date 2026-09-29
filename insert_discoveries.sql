-- Insert some sample profiles if they don't exist
INSERT INTO public.profiles (id, owner_name, image_url)
VALUES 
  (gen_random_uuid(), 'Vikram Singh', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'),
  (gen_random_uuid(), 'Aisha Patel', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'),
  (gen_random_uuid(), 'Rahul Sharma', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80')
ON CONFLICT (owner_name) DO NOTHING;

-- Insert the talents (items/spaces)
INSERT INTO public.talents (title, description, category, skills, owner_name, tower, image_url)
VALUES
(
  'Bosch Professional Drill',
  'Heavy duty impact drill. Perfect for putting up shelves, TVs, and heavy mirrors. Comes with a full set of masonry and wood bits. Please return it clean!',
  'item',
  ARRAY['Tools', 'DIY', 'Home Improvement'],
  'Vikram Singh',
  'Tower A',
  'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80'
),
(
  'Sony A7III + 50mm Lens',
  'Full frame mirrorless camera, amazing for low light. Im happy to lend this out for weekend trips or family events. Requires a security deposit.',
  'item',
  ARRAY['Photography', 'Camera', 'Tech'],
  'Aisha Patel',
  'Tower B',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80'
),
(
  'Covered Parking Spot (Basement 2)',
  'My car is in the workshop for the next 2 weeks. Spot B2-142 is empty. Feel free to park your second car or guests car here.',
  'space',
  ARRAY['Parking', 'Space'],
  'Rahul Sharma',
  'Tower C',
  'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&q=80'
),
(
  '4-Person Quechua Tent',
  'Waterproof camping tent. Pops up in 2 minutes. Used it twice for trips to Coorg. Great condition.',
  'item',
  ARRAY['Camping', 'Outdoors', 'Travel'],
  'Vikram Singh',
  'Tower A',
  'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&q=80'
);
