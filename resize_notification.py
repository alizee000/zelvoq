import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Change width from w-80 to w-72 (320px to 288px)
# Change rounded-3xl to rounded-2xl to match smaller size
content = content.replace('w-80 bg-white rounded-3xl', 'w-72 bg-white rounded-2xl')

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)

