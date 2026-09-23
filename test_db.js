const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function check() {
  const { data: talents } = await supabase.from('talents').select('title, category');
  console.log("Talents:", talents);
  
  const { data: events } = await supabase.from('events').select('title');
  console.log("Events:", events);
  
  const { data: groupBuys } = await supabase.from('group_buys').select('title');
  console.log("Group Buys:", groupBuys);
  
  const { data: knockKnocks } = await supabase.from('knock_knocks').select('title');
  console.log("Knock-Knocks:", knockKnocks);
}
check();
