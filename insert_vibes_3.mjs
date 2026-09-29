import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const titles = [
    "Artisan Sourdough Masterclass",
    "Custom Mechanical Keyboards",
    "Sunrise Vinyasa on the Lawn",
    "Wheel Throwing & Ceramics"
  ];
  
  await supabase.from('talents').delete().in('title', titles);

  const talents = [
    {
      title: "Artisan Sourdough Masterclass",
      description: "I host weekend sourdough baking sessions in my kitchen. You'll learn to maintain a starter, score dough, and bake the perfect crust. Flour and materials provided! Perfect for food lovers.",
      category: "skill",
      skills: ["Food", "Baking", "Culinary", "Bread"],
      owner_name: "Chef Julian",
      is_paid: true,
      tower: "DSR Rainbow Heights"
    },
    {
      title: "Custom Mechanical Keyboards",
      description: "I can help you build, solder, and lube your first custom mechanical keyboard. I have all the tools, switches, and tech experience needed to make your board sound like creamy thocks.",
      category: "skill",
      skills: ["Tech", "Technology", "Hardware", "Keyboards"],
      owner_name: "Alex Dev",
      is_paid: false,
      tower: "DSR Rainbow Heights"
    },
    {
      title: "Sunrise Vinyasa on the Lawn",
      description: "Join me every Tuesday at 6 AM on the central lawn for a 45-minute wellness and yoga flow. Great for flexibility, breathwork, and starting the day right. Bring your own mat!",
      category: "skill",
      skills: ["Wellness", "Yoga", "Fitness", "Health"],
      owner_name: "Maya Zen",
      is_paid: false,
      tower: "DSR Rainbow Heights"
    },
    {
      title: "Wheel Throwing & Ceramics",
      description: "I have a professional pottery wheel on my balcony. I offer 1-on-1 creative sessions to teach you how to throw clay, trim, and glaze your own coffee mugs.",
      category: "skill",
      skills: ["Creative", "Art", "Pottery", "Design"],
      owner_name: "Studio Leo",
      is_paid: true,
      tower: "DSR Rainbow Heights"
    }
  ];

  for (const t of talents) {
    const { error } = await supabase.from('talents').insert({
      title: t.title,
      description: t.description,
      category: t.category,
      skills: t.skills,
      owner_name: t.owner_name,
      is_paid: t.is_paid,
      tower: t.tower,
      created_at: new Date().toISOString()
    });
    
    if (error) console.error("Error inserting talent:", t.title, error);
    else console.log("Inserted talent:", t.title);
  }
}

run();
