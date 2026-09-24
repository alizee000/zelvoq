import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Replace right-2 sm:-right-4 with right-1 sm:-right-12
old_container = r'right-2 sm:-right-4 w-\[250px\] sm:w-\[300px\]'
new_container = 'right-1 sm:-right-8 w-[250px] sm:w-[300px]'

content = re.sub(old_container, new_container, content)

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)
