import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Replace notifications.map with notifications.slice(0, 3).map
content = content.replace('{notifications.map((notif: any) => (', '{notifications.slice(0, 3).map((notif: any) => (')

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)
