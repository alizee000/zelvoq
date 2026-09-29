import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

pattern = re.compile(r'<div className="flex items-center gap-1 mb-3 pr-6">[\s\S]*?<\/div>')
match = pattern.search(content)
if match:
    content = content[:match.start()] + content[match.end():]
    with open('src/components/ui/live-knocks.tsx', 'w') as f:
        f.write(content)

