import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# I need to fetch dbKnocks right after getTalents
if 'const { data: dbKnocks }' not in content:
    content = content.replace('const allTalents = await getTalents();', 'const allTalents = await getTalents();\n  const { createClient } = await import("@/lib/supabase/server");\n  const supabase = await createClient();\n  const { data: dbKnocks } = await supabase.from("knock_knocks").select("*").eq("status", "active").order("created_at", { ascending: false });')

# Fix the any type error
content = content.replace('const liveKnocks = dbKnocks?.map(k => ({', 'const liveKnocks = dbKnocks?.map((k: any) => ({')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
