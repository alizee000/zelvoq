import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // we need service key for direct writes if RLS is on

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // Let's search in profiles
  const { data: profiles, error: pError } = await supabase.from('profiles').select('*').ilike('name', '%Chef%');
  console.log("Profiles:", profiles, pError);

  // Let's search in talents title or name
  const { data: talents, error: tError } = await supabase.from('talents').select('*').ilike('name', '%Chef%');
  console.log("Talents (by name):", talents, tError);
  
  const { data: talentsTitle, error: t2Error } = await supabase.from('talents').select('*').ilike('title', '%Chef%');
  console.log("Talents (by title):", talentsTitle, t2Error);
}

run();
