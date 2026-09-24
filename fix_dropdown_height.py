import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Replace the max height container
old_container = r'<div className="max-h-\[60vh\] overflow-y-auto hide-scrollbar">'
new_container = '<div className="max-h-[260px] overflow-y-auto hide-scrollbar">'

content = re.sub(old_container, new_container, content)

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)

