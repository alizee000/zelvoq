import re
with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'delay-\[[^\]]+\]', '', content)
# Clean up spaces inside quotes again
content = re.sub(r'className="\s+', 'className="', content)
content = re.sub(r'\s+"', '"', content)
content = content.replace('className=""', 'className=""')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
