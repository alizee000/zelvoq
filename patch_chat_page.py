import re

with open('src/app/(app)/chat/[id]/page.tsx', 'r') as f:
    content = f.read()

# 1. Add fetching events
fetch_block = '''  const { data: groupBuy } = await supabase.from("group_buys").select("*").eq("id", resolvedParams.id).single();
  const { data: borrowItem } = await supabase.from("borrow_items").select("*").eq("id", resolvedParams.id).single();'''

fetch_block_new = fetch_block + '''
  const { data: event } = await supabase.from("events").select("*").eq("id", resolvedParams.id).single();'''
content = content.replace(fetch_block, fetch_block_new)

# 2. Update if condition
if_block = 'if (!talent && !groupBuy && !borrowItem) return notFound();'
if_block_new = 'if (!talent && !groupBuy && !borrowItem && !event) return notFound();'
content = content.replace(if_block, if_block_new)

# 3. Update isPublicChat
is_public = 'const isPublicChat = !!groupBuy;'
is_public_new = 'const isPublicChat = !!groupBuy || !!event;'
content = content.replace(is_public, is_public_new)

# 4. Update title logic
title_logic = '''  } else if (groupBuy) {
    receiverName = "Group Discussion";
    talentTitle = groupBuy.title;'''
title_logic_new = title_logic + '''
  } else if (event) {
    receiverName = "Event Chat";
    talentTitle = event.title;'''
content = content.replace(title_logic, title_logic_new)

with open('src/app/(app)/chat/[id]/page.tsx', 'w') as f:
    f.write(content)
