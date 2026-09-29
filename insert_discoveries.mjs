import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  // Insert Profiles
  const { error: pErr } = await supabase.from('profiles').upsert([
    { owner_name: 'Vikram Singh', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
    { owner_name: 'Aisha Patel', image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
    { owner_name: 'Rahul Sharma', image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }
  ], { onConflict: 'owner_name' });
  
  if (pErr) console.error("Profile Error:", pErr);

  // Insert Talents (without image_url)
  const { error: tErr } = await supabase.from('talents').insert([
    {
      title: 'Bosch Professional Drill',
      description: 'Heavy duty impact drill. Perfect for putting up shelves, TVs, and heavy mirrors.',
      category: 'item',
      skills: ['Tools', 'DIY'],
      owner_name: 'Vikram Singh',
      tower: 'Tower A'
    },
    {
      title: 'Sony A7III + 50mm Lens',
      description: 'Full frame mirrorless camera, amazing for low light.',
      category: 'item',
      skills: ['Photography', 'Camera'],
      owner_name: 'Aisha Patel',
      tower: 'Tower B'
    },
    {
      title: 'Covered Parking Spot (B2-142)',
      description: 'Spot B2-142 is empty. Feel free to park your second car or guests car here.',
      category: 'space',
      skills: ['Parking', 'Space'],
      owner_name: 'Rahul Sharma',
      tower: 'Tower C'
    },
    {
      title: '4-Person Quechua Tent',
      description: 'Waterproof camping tent. Pops up in 2 minutes. Great condition.',
      category: 'item',
      skills: ['Camping', 'Outdoors'],
      owner_name: 'Vikram Singh',
      tower: 'Tower A'
    }
  ]);

  if (tErr) console.error("Talent Error:", tErr);
  else console.log("Success!");
}

run();
