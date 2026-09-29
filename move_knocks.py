import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# 1. Remove the current Live Knocks
live_knocks_ui = """
      {/* Live Knocks Status Row */}
      <LiveKnocks knocks={liveKnocks} userFirstName={firstName} userFullName={fullName} userImageUrl={user?.imageUrl} />
"""
content = content.replace(live_knocks_ui, '')

# 2. Find the top of the magazine cover
magazine_cover_start = """      {/* Magazine Cover Header */}
      <div className="relative w-full overflow-hidden bg-white rounded-b-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
        {/* Subtle decorative mesh gradient */}
        <div className="absolute top-[-50%] left-[-20%] w-[140%] h-[150%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-white to-orange-50/40 pointer-events-none opacity-70" />
"""

new_live_knocks = """
        {/* Live Knocks Status Row - At the very top */}
        <div className="relative z-20 pt-2">
          <LiveKnocks knocks={liveKnocks} userFirstName={firstName} userFullName={fullName} userImageUrl={user?.imageUrl} />
        </div>
"""

content = content.replace(magazine_cover_start, magazine_cover_start + new_live_knocks)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
