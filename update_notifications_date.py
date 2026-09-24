import re

with open('src/components/layout/top-nav.tsx', 'r') as f:
    content = f.read()

# Add a 7-day cutoff date
old_query = r'\.neq\("author_name", fullName\)\s*\.order\("created_at", \{ ascending: false \}\)'

new_query = """.neq("author_name", fullName)
    .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order("created_at", { ascending: false })"""

content = re.sub(old_query, new_query, content)

with open('src/components/layout/top-nav.tsx', 'w') as f:
    f.write(content)
