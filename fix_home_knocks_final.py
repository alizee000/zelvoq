import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Let's find the Magazine Cover Header end
magazine_cover_end = r'<\/MotionSection>\s*<\/div>\s*<\/div>'

live_knocks_ui = """
      {/* Live Knocks Status Row */}
      <LiveKnocks knocks={liveKnocks} userFirstName={firstName} userFullName={fullName} userImageUrl={user?.imageUrl} />
"""

match = re.search(magazine_cover_end, content)
if match:
    content = content[:match.end()] + live_knocks_ui + content[match.end():]
    with open('src/app/(app)/home/page.tsx', 'w') as f:
        f.write(content)
    print("Successfully injected Live Knocks.")
else:
    print("Could not find Magazine Cover end.")
