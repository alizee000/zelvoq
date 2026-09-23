import re

with open('src/app/(app)/talent/[id]/page.tsx', 'r') as f:
    content = f.read()

# Replace the data fetch for the single talent
old_fetch = """  const { data: talent } = await supabase
    .from("talents")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();"""

new_fetch = """  const { data: talentRaw } = await supabase
    .from("talents")
    .select("*, profiles(image_url)")
    .eq("id", resolvedParams.id)
    .single();

  if (!talentRaw) return notFound();
  
  // @ts-ignore
  const talent = { ...talentRaw, image_url: talentRaw.profiles?.image_url || null };"""

content = content.replace(old_fetch, new_fetch)
content = content.replace("if (!talent) return notFound();", "")

with open('src/app/(app)/talent/[id]/page.tsx', 'w') as f:
    f.write(content)

