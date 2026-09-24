import re

with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('.strip()', '.trim()')

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)

