import re

with open('src/app/(app)/home/community-video.tsx', 'r') as f:
    content = f.read()

# Replace the placeholder URL with the real one
content = content.replace(
    'const videoUrl = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"; // Placeholder until actual file is uploaded',
    'const videoUrl = "https://aqalfjxrzamtkrsxsvpe.supabase.co/storage/v1/object/public/video/gemini_generated_video_822701fb.mp4";'
)

with open('src/app/(app)/home/community-video.tsx', 'w') as f:
    f.write(content)
