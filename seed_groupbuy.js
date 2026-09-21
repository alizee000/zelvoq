const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seed() {
  console.log("Seeding group buy...");
  const { error: gbError } = await supabase.from('group_buys').insert({
    title: "Fresh Alphonso Mangoes (1 Dozen)",
    vendor: "Ratnagiri Farms Direct",
    description: "Farm fresh mangoes directly from Ratnagiri. Need 10 people to order to get wholesale price.",
    current_quantity: 3,
    target_quantity: 10,
    original_price: 25.00,
    discounted_price: 12.00,
    expires_in_days: 2,
  });
  if (gbError) {
    console.error(gbError);
  } else {
    console.log("Successfully seeded group buy.");
  }
}

seed();
