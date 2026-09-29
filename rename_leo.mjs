import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // Update Profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ owner_name: 'Namitha' })
    .eq('owner_name', 'Studio Leo');
    
  if (profileError) console.error("Error updating profile:", profileError);
  else console.log("Profile updated!");

  // Update Talent
  const { error: talentError } = await supabase
    .from('talents')
    .update({ owner_name: 'Namitha' })
    .eq('owner_name', 'Studio Leo');
    
  if (talentError) console.error("Error updating talent:", talentError);
  else console.log("Talent updated!");
}
run();
