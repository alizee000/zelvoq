import re

with open('src/components/layout/top-nav.tsx', 'r') as f:
    content = f.read()

# Change the query to include both community-wide and targeted notifications
old_query = r'\.eq\("tower", tower\)\s*\.neq\("author_name", fullName\)'
new_query = """.or(`tower.eq.${tower},tower.eq.${fullName}`)
    .neq("author_name", fullName)"""

content = re.sub(old_query, new_query, content)

with open('src/components/layout/top-nav.tsx', 'w') as f:
    f.write(content)
