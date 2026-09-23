with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Replace the count query for knock_knocks to only count unresolved ones
old_query = '  const { count: knockKnocksCount } = await supabase.from("knock_knocks").select("id", { count: "exact", head: true });'
new_query = '  const { count: knockKnocksCount } = await supabase.from("knock_knocks").select("id", { count: "exact", head: true }).is("resolved_by", null);'

content = content.replace(old_query, new_query)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

