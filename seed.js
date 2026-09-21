const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seed() {
  console.log("Seeding borrow item...");
  const { error: itemError } = await supabase.from('talents').insert({
    title: "Heavy Duty Power Drill",
    description: "Bosch impact drill with masonry and wood drill bits. Perfect for hanging shelves and pictures. Available for 24h borrowing.",
    category: "item",
    is_paid: false,
    owner_name: "Sameer Verma",
    tower: "Green Block",
    skills: ["Power Tools", "Hardware", "DIY"]
  });
  if (itemError) console.error(itemError);
  
  console.log("Done!");
}

seed();
