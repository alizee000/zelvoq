import re

with open('src/app/(app)/chat/[id]/chat-client.tsx', 'r') as f:
    content = f.read()

# Add the import
if 'import { createClient }' not in content:
    content = content.replace('import { useRouter } from "next/navigation";', 'import { useRouter } from "next/navigation";\nimport { createClient } from "@/lib/supabase/client";')

# Add the useEffect
old_scroll = r'  useEffect\(\(\) => \{\s*bottomRef\.current\?\.scrollIntoView\(\{ behavior: "smooth" \}\);\s*\}, \[initialMessages\]\);'

new_realtime = """  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [initialMessages]);

  useEffect(() => {
    const supabase = createClient();
    const activeRoomId = chatRoomId || talentId;
    
    const channel = supabase.channel(`chat_${activeRoomId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'feed_posts',
        filter: `tower=eq.${activeRoomId}`
      }, (payload) => {
        router.refresh();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatRoomId, talentId, router]);"""

content = re.sub(old_scroll, new_realtime, content)

with open('src/app/(app)/chat/[id]/chat-client.tsx', 'w') as f:
    f.write(content)
