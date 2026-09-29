import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // 1. Insert Profiles
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
    await supabase.from('profiles').upsert({
      owner_name: p.owner_name,
      image_url: p.image_url,
      capabilities: p.capabilities,
      updated_at: new Date().toISOString()
    }, { onConflict: 'owner_name' });
  }

  // 2. Insert Talents
  const talents = [
    {
      title: "Artisan Sourdough Masterclass",
      description: "I host weekend sourdough baking sessions in my kitchen. You'll learn to maintain a starter, score dough, and bake the perfect crust. Flour and materials provided! Perfect for food lovers.",
      category: "skill",
      tags: ["Food", "Baking", "Culinary", "Bread"],
      owner_name: "Chef Julian",
      is_paid: true
    },
    {
      title: "Custom Mechanical Keyboards",
      description: "I can help you build, solder, and lube your first custom mechanical keyboard. I have all the tools, switches, and tech experience needed to make your board sound like creamy thocks.",
      category: "skill",
      tags: ["Tech", "Technology", "Hardware", "Keyboards"],
      owner_name: "Alex Dev",
      is_paid: false
    },
    {
      title: "Sunrise Vinyasa on the Lawn",
      description: "Join me every Tuesday at 6 AM on the central lawn for a 45-minute wellness and yoga flow. Great for flexibility, breathwork, and starting the day right. Bring your own mat!",
      category: "skill",
      tags: ["Wellness", "Yoga", "Fitness", "Health"],
      owner_name: "Maya Zen",
      is_paid: false
    },
    {
      title: "Wheel Throwing & Ceramics",
      description: "I have a professional pottery wheel on my balcony. I offer 1-on-1 creative sessions to teach you how to throw clay, trim, and glaze your own coffee mugs.",
      category: "skill",
      tags: ["Creative", "Art", "Pottery", "Design"],
      owner_name: "Studio Leo",
      is_paid: true
    }
  ];

  for (const t of talents) {
    const { error } = await supabase.from('talents').upsert({
      title: t.title,
      description: t.description,
      category: t.category,
      tags: t.tags,
      owner_name: t.owner_name,
      is_paid: t.is_paid,
      created_at: new Date().toISOString()
    }, { onConflict: 'title' });
    
    if (error) console.error("Error inserting talent:", t.title, error);
    else console.log("Inserted talent:", t.title);
  }
}

run();
