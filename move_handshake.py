import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Remove it from the bottom
content = content.replace(
    '<CommunityHandshake />\n        \n        <section className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[600ms] fill-mode-both">',
    '<section className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[600ms] fill-mode-both">'
)

# Insert it at the top
content = content.replace(
    '<div className="flex flex-col gap-6 px-6 pt-6 z-0">',
    '<div className="flex flex-col gap-6 px-6 pt-6 z-0">\n        \n        <CommunityHandshake />'
)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
