import re

with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

if 'className="absolute top-6 right-6 z-40 flex flex-col gap-2 pointer-events-auto"' in content:
    content = content.replace('className="absolute top-6 right-6 z-40 flex flex-col gap-2 pointer-events-auto"', 'className="absolute top-24 right-6 z-40 flex flex-col gap-2 pointer-events-auto"')
    with open('src/components/ui/hive-network.tsx', 'w') as f:
        f.write(content)
    print("Successfully moved down to top-24")
else:
    print("Could not find the target string.")
