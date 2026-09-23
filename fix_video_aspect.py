import re

with open('src/app/(app)/home/community-video.tsx', 'r') as f:
    content = f.read()

# Replace aspect-video with a wider aspect ratio to reduce height
content = content.replace('w-full aspect-video bg-slate-100', 'w-full aspect-[21/9] bg-slate-100')

with open('src/app/(app)/home/community-video.tsx', 'w') as f:
    f.write(content)
