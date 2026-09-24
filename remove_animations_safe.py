import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    lines = f.readlines()

patterns = [
    r'\banimate-in\b',
    r'\bfade-in\b',
    r'\bslide-in-from-[a-zA-Z0-9-]+\b',
    r'\bzoom-in-[a-zA-Z0-9-]+\b',
    r'\bduration-\d+\b',
    r'\bdelay-\[[^\]]+\]\b',
    r'\bfill-mode-both\b'
]

new_lines = []
for line in lines:
    for p in patterns:
        line = re.sub(p, '', line)
    
    # Remove inline style delays for animation
    line = re.sub(r'style=\{\{\s*animationDelay[^}]+\}\}', '', line)
    
    # Clean up double spaces in classNames
    while '  ' in line:
        line = line.replace('  ', ' ')
    line = line.replace('className=" "', 'className=""')
    new_lines.append(line)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.writelines(new_lines)
