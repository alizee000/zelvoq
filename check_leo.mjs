import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: talents } = await supabase.from('talents').select('owner_name').eq('title', 'Wheel Throwing & Ceramics');
  console.log("Talent Owner Name:", talents);
  
  const { data: profiles } = await supabase.from('profiles').select('*').ilike('owner_name', '%leo%');
  console.log("Profiles matching Leo:", profiles);
}
run();
