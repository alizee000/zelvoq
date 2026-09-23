import re

with open('src/app/(app)/home/community-handshake.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'fill\s*\n\s*unoptimized\s*\n', '', content)
content = re.sub(r'fill\n', '', content)

with open('src/app/(app)/home/community-handshake.tsx', 'w') as f:
    f.write(content)
