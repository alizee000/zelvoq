import re

with open('src/components/layout/top-nav.tsx', 'r') as f:
    content = f.read()

content = content.replace('.or(`tower.eq.${tower},tower.eq.${fullName}`)', '.or(`tower.eq."${tower}",tower.eq."${fullName}"`)')

with open('src/components/layout/top-nav.tsx', 'w') as f:
    f.write(content)
