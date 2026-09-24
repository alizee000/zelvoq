import re

with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

# Add the EditProfileModal inside the Profile Card
old_card = r'<div className="bg-white rounded-\[2rem\] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">\s*<div className="absolute top-0 left-0 w-full h-32 bg-slate-50 border-b border-slate-100"><\/div>'

new_card = """<div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 border-b border-slate-100"></div>
          <div className="absolute top-4 right-4 z-20">
            <EditProfileModal currentFlat={flat} currentTower={tower} currentSociety="DSR Rainbow Heights" />
          </div>"""

content = re.sub(old_card, new_card, content)

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)
