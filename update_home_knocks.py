import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add import
if 'LiveKnocks' not in content:
    content = content.replace('import { CarouselWrapper }', 'import { LiveKnocks } from "@/components/ui/live-knocks";\nimport { CarouselWrapper }')

# Add knocks filtering logic
if 'const liveKnocks =' not in content:
    content = content.replace('const discoveries =', 'const liveKnocks = allTalents?.filter((t: any) => t.category === \'knock\') || [];\n  \n  const discoveries =')

# Add the Live Knocks UI right above the Magazine Cover Header
if 'LiveKnocks knocks=' not in content:
    injection = """
      {/* Live Knocks (Stories) */}
      <div className="bg-white pt-2">
        <LiveKnocks knocks={liveKnocks} userFirstName={firstName} userImageUrl={user?.imageUrl} />
      </div>

      {/* Magazine Cover Header */}
      <div className="relative w-full overflow-hidden bg-white rounded-b-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
"""
    # Fix the rounded top if we insert it. Actually, if LiveKnocks is bg-white, and the header is bg-white, they blend seamlessly.
    # We should just insert it right at the top, inside the main div
    
    old_header = """      {/* Magazine Cover Header */}
      <div className="relative w-full overflow-hidden bg-white rounded-b-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">"""
    
    content = content.replace(old_header, injection.strip())

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
