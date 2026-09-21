require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const sql = fs.readFileSync('setup_multi_tenant.sql', 'utf8');
  
  // Since we cannot run raw SQL blocks through REST API easily, 
  // let's just do it via standard supabase-js queries.
}
run();
