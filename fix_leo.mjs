import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // Use a known good Unsplash portrait (a girl in a pottery studio or just a nice portrait)
  const newUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80";
  const { error } = await supabase.from('profiles').update({ image_url: newUrl }).eq('owner_name', 'Studio Leo');
  if (error) console.error("Error:", error);
  else console.log("Updated Studio Leo image!");
}
run();
