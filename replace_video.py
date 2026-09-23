import re

with open('src/app/(app)/home/community-video.tsx', 'r') as f:
    content = f.read()

# Replace the videoUrl with a direct mp4
content = content.replace(
    'const videoUrl = "https://share.gemini.google/VSMZZDr3EBMw";',
    'const videoUrl = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"; // Placeholder until actual file is uploaded'
)

# Remove the play button overlay so it just plays the video natively
new_overlay = """
      <div className="absolute bottom-2 right-2 flex items-center justify-center pointer-events-none">
        <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest bg-black/30 backdrop-blur-md px-2 py-1 rounded-md">
          Community Highlight
        </span>
      </div>
"""

content = re.sub(r'\{/\* Play Button Overlay \*/\}.*</div>\n    </div>', new_overlay + '\n    </div>', content, flags=re.DOTALL)

# Make the video fully visible
content = content.replace('opacity-40 group-hover:opacity-70 transition-opacity duration-500', 'opacity-100 object-cover w-full h-full')

with open('src/app/(app)/home/community-video.tsx', 'w') as f:
    f.write(content)
