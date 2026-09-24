import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Add the Supabase client import
if 'import { createClient }' not in content:
    content = content.replace('import { useRouter } from "next/navigation";', 'import { useRouter } from "next/navigation";\nimport { createClient } from "@/lib/supabase/client";')

# Add the realtime subscription useEffect
old_use_effect = r'  useEffect\(\(\) => \{\s*const latestNotifId = notifications\?\.\[0\]\?\.id \|\| \'none\';\s*const latestPollId = activePolls\?\.\[0\]\?\.id \|\| \'none\';\s*const currentLatest = `\$\{latestNotifId\}-\$\{latestPollId\}`;\s*const lastSeen = localStorage\.getItem\(\'last_seen_notif\'\);\s*if \(\(notifications\.length > 0 \|\| activePolls\.length > 0\) && currentLatest !== lastSeen\) \{\s*setHasUnread\(true\);\s*\}\s*\}, \[notifications, activePolls\]\);'

new_use_effect = """  useEffect(() => {
    const latestNotifId = notifications?.[0]?.id || 'none';
    const latestPollId = activePolls?.[0]?.id || 'none';
    const currentLatest = `${latestNotifId}-${latestPollId}`;
    const lastSeen = localStorage.getItem('last_seen_notif');
    
    if ((notifications.length > 0 || activePolls.length > 0) && currentLatest !== lastSeen) {
      setHasUnread(true);
    }
  }, [notifications, activePolls]);

  // Real-time subscription to feed_posts
  useEffect(() => {
    const supabase = createClient();
    
    const channel = supabase.channel('realtime_notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'feed_posts' }, (payload) => {
        // Automatically fetch new notifications from server
        router.refresh();
        // Immediately trigger the red badge
        setHasUnread(true);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);"""

content = re.sub(old_use_effect, new_use_effect, content)

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)
