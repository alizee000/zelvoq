import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Remove the fallback demo data block
pattern = re.compile(r'// Fallback demo data if empty\s*if \(usersList\.length === 0\) \{[\s\S]*?\}\n')
match = pattern.search(content)

if match:
    content = content[:match.start()] + content[match.end():]
    with open('src/components/ui/live-knocks.tsx', 'w') as f:
        f.write(content)
    print("Successfully removed demo data fallback.")
else:
    print("Could not find demo data block.")

