import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'import { CommunityHandshake } from "./community-handshake";',
    'import { CommunityVideo } from "./community-video";'
)

content = content.replace(
    '<CommunityHandshake />',
    '<CommunityVideo />'
)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
