import re

with open('src/app/(app)/chat/[id]/page.tsx', 'r') as f:
    content = f.read()

# Replace the messages query
old_query = r'const \{ data: rawMessages \} = await supabase\s*\.from\("messages"\)\s*\.select\("\*"\)\s*\.eq\("listing_id", resolvedParams\.id\)\s*\.order\("created_at", \{ ascending: true \}\);\s*\/\/ Only show messages where the current user is either the sender or receiver\s*\/\/ Or if the current user is the owner of the listing, they can see messages sent to them about this listing\s*const relevantMessages = \(rawMessages \|\| \[\]\)\.filter\(m => m\.sender_name === currentUserName \|\| m\.receiver_name === currentUserName \|\| receiverName === currentUserName\);'

new_query = """const { data: rawMessages } = await supabase
    .from("feed_posts")
    .select("*")
    .eq("type", "chat")
    .eq("tower", resolvedParams.id)
    .order("created_at", { ascending: true });

  // Map feed_posts back to message format
  const relevantMessages = (rawMessages || []).map(m => ({
    id: m.id,
    sender_name: m.author_name,
    receiver_name: receiverName,
    text: m.content,
    created_at: m.created_at
  }));"""

content = re.sub(old_query, new_query, content)

with open('src/app/(app)/chat/[id]/page.tsx', 'w') as f:
    f.write(content)

