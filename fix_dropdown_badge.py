import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Add useEffect and localStorage logic
old_state = r'const \[isOpen, setIsOpen\] = useState\(false\);\s*const \[activePolls, setActivePolls\] = useState\(initialActive\);\s*const \[isVoting, setIsVoting\] = useState\(false\);\s*const router = useRouter\(\);'

new_state = """const [isOpen, setIsOpen] = useState(false);
  const [activePolls, setActivePolls] = useState(initialActive);
  const [isVoting, setIsVoting] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const router = useRouter();

  import { useEffect } from "react";
  useEffect(() => {
    const latestNotifId = notifications?.[0]?.id || 'none';
    const latestPollId = activePolls?.[0]?.id || 'none';
    const currentLatest = `${latestNotifId}-${latestPollId}`;
    const lastSeen = localStorage.getItem('last_seen_notif');
    
    if ((notifications.length > 0 || activePolls.length > 0) && currentLatest !== lastSeen) {
      setHasUnread(true);
    }
  }, [notifications, activePolls]);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const latestNotifId = notifications?.[0]?.id || 'none';
      const latestPollId = activePolls?.[0]?.id || 'none';
      localStorage.setItem('last_seen_notif', `${latestNotifId}-${latestPollId}`);
      setHasUnread(false);
    }
  };"""

content = re.sub(old_state, new_state, content)
content = content.replace('onClick={() => setIsOpen(!isOpen)}', 'onClick={handleOpenDropdown}')
content = content.replace('onClick={() => setIsOpen(false)}', 'onClick={() => setIsOpen(false)}') # already fine

# Replace the badge logic
old_badge = r'\{\(activePolls\.length \+ notifications\.length\) > 0 && \('
new_badge = '{hasUnread && ('
content = re.sub(old_badge, new_badge, content)

# But we still want to show the count of unread items. Since we are storing 'last_seen', we can't easily calculate exact count of *unread*. So we'll just show the total count, but only if `hasUnread` is true.
# Wait, let's keep the count as it is.
# So if hasUnread is true, it renders the div, and inside the div it renders the count.

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)

