import re

with open('src/app/(app)/talent/[id]/page.tsx', 'r') as f:
    content = f.read()

# Replace the data fetch for the single talent
old_fetch = """  const { data: talentRaw } = await supabase
    .from("talents")
    .select("*, profiles(image_url)")
    .eq("id", resolvedParams.id)
    .single();

  if (!talentRaw) return notFound();
  
  // @ts-ignore
  const talent = { ...talentRaw, image_url: talentRaw.profiles?.image_url || null };"""

new_fetch = """  const { data: talentRaw } = await supabase
    .from("talents")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!talentRaw) return notFound();
  
  // Fetch their latest profile image
  const { data: profile } = await supabase
    .from("profiles")
    .select("image_url")
    .eq("owner_name", talentRaw.owner_name)
    .single();
    
  const talent = { ...talentRaw, image_url: profile?.image_url || null };"""

content = content.replace(old_fetch, new_fetch)

with open('src/app/(app)/talent/[id]/page.tsx', 'w') as f:
    f.write(content)

