import re

with open('src/app/(app)/home/community-video.tsx', 'r') as f:
    content = f.read()

# Remove the text overlay
overlay_pattern = r'<div className="absolute bottom-2 right-2 flex items-center justify-center pointer-events-none">.*?</div>'
content = re.sub(overlay_pattern, '', content, flags=re.DOTALL)

with open('src/app/(app)/home/community-video.tsx', 'w') as f:
    f.write(content)
