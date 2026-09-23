import re

with open('src/app/(app)/home/community-video.tsx', 'r') as f:
    content = f.read()

# Replace the old video URL with the new one
old_url = '"https://aqalfjxrzamtkrsxsvpe.supabase.co/storage/v1/object/public/video/gemini_generated_video_822701fb.mp4"'
new_url = '"https://aqalfjxrzamtkrsxsvpe.supabase.co/storage/v1/object/public/video/gemini_generated_video_150cafde.mp4"'

content = content.replace(old_url, new_url)

with open('src/app/(app)/home/community-video.tsx', 'w') as f:
    f.write(content)

