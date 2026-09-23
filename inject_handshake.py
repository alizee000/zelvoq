import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace(
    'import { LiveFeedClient } from "./live-feed-client";',
    'import { LiveFeedClient } from "./live-feed-client";\nimport { CommunityHandshake } from "./community-handshake";'
)

# Insert component
content = content.replace(
    '<section className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[600ms] fill-mode-both">',
    '<CommunityHandshake />\n        \n        <section className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[600ms] fill-mode-both">'
)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
