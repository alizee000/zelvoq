const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
async function check() {
  const { data: talents } = await supabase.from('talents').select('*');
  console.log("Talents:", talents);
}
check();
