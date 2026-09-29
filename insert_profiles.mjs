import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const profiles = [
    {
      owner_name: "Chef Julian",
      image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
      capabilities: ["Food", "Culinary Arts", "Baking", "Sourdough", "Cooking"]
    },
    {
      owner_name: "Alex Dev",
      image_url: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80",
      capabilities: ["Tech", "Technology", "Keyboards", "Coding", "Hardware"]
    },
    {
      owner_name: "Maya Zen",
      image_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
      capabilities: ["Wellness", "Yoga", "Meditation", "Fitness", "Mindfulness"]
    },
    {
      owner_name: "Studio Leo",
      image_url: "https://images.unsplash.com/photo-1525134479668-1bea5340665b?w=400&q=80",
      capabilities: ["Creative", "Art", "Ceramics", "Pottery", "Design"]
    }
  ];

  for (const p of profiles) {
    const { error } = await supabase.from('profiles').upsert({
      owner_name: p.owner_name,
      image_url: p.image_url,
      capabilities: p.capabilities,
      updated_at: new Date().toISOString()
    }, { onConflict: 'owner_name' });
    
    if (error) console.error("Error inserting profile:", p.owner_name, error);
    else console.log("Inserted profile:", p.owner_name);
  }
}

run();
