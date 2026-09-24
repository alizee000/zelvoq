import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Regular expression to match all tailwind animate-in classes
# like: animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-both delay-[150ms] zoom-in-95 ...
# We'll just remove 'animate-in' and any following animation related classes in the same string

patterns = [
    r'animate-in\s+',
    r'fade-in\s+',
    r'slide-in-from-[^\s"]+\s+',
    r'slide-in-from-[^\s"]+',
    r'zoom-in-[^\s"]+\s+',
    r'zoom-in-[^\s"]+',
    r'duration-\d+\s+',
    r'delay-\[[^\]]+\]\s+',
    r'fill-mode-both\s+',
    r'fill-mode-both'
]

for p in patterns:
    content = re.sub(p, '', content)

# Also fix any style={{ animationDelay: ... }} inline styles
content = re.sub(r'style={{[^}]+}}\s+', '', content)

# Clean up any trailing spaces inside classNames left behind
content = re.sub(r'\s+"', '"', content)
content = re.sub(r'className="\s+', 'className="', content)
content = re.sub(r'className=" "', 'className=""', content)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
