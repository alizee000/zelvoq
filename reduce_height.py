import re

with open('src/app/(app)/home/community-video.tsx', 'r') as f:
    content = f.read()

# Change h-32 sm:h-40 to h-20 sm:h-28
content = content.replace(
    'className="w-full h-32 sm:h-40 bg-slate-900 rounded-[2rem] overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
    'className="w-full h-20 sm:h-24 bg-slate-900 rounded-[1.5rem] overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
)

with open('src/app/(app)/home/community-video.tsx', 'w') as f:
    f.write(content)
