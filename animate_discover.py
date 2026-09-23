import re

# 1. Update discover/page.tsx
with open('src/app/(app)/discover/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="flex flex-col min-h-full animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"',
    'className="flex flex-col min-h-full"'
)
with open('src/app/(app)/discover/page.tsx', 'w') as f:
    f.write(content)

# 2. Update discover/discover-client.tsx
with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<div className="pt-6 pb-4 px-6">',
    '<div className="pt-6 pb-4 px-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">'
)
content = content.replace(
    '<div className="relative group mb-6">',
    '<div className="relative group mb-6 animate-in fade-in zoom-in-95 duration-700 delay-[100ms] fill-mode-both">'
)
content = content.replace(
    '<div className="flex overflow-x-auto gap-2 -mx-6 px-6 hide-scrollbar">',
    '<div className="flex overflow-x-auto gap-2 -mx-6 px-6 hide-scrollbar animate-in fade-in slide-in-from-right-8 duration-700 delay-[200ms] fill-mode-both">'
)
content = content.replace(
    '<div className="px-6 pt-6">',
    '<div className="px-6 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[300ms] fill-mode-both">'
)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)
