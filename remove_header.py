import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Remove the header
pattern = re.compile(r'\{\/\*[\s\S]*?PREMIUM HEADER[\s\S]*?\*\/\}[\s\S]*?<\/header>')
match = pattern.search(content)
if match:
    content = content[:match.start()] + content[match.end():]
    with open('src/app/(app)/home/page.tsx', 'w') as f:
        f.write(content)
    print("Successfully removed header.")
else:
    print("Could not find the header to remove.")
