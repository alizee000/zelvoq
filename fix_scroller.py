import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# 1. Revert the slice(0,3) back to showing all of them
content = content.replace('{notifications.slice(0, 3).map((notif: any) => (', '{notifications.map((notif: any) => (')

# 2. Reduce the max-h to force scrolling earlier
content = content.replace('className="max-h-[350px] overflow-y-auto hide-scrollbar"', 'className="max-h-[200px] overflow-y-auto hide-scrollbar"')

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)
