import re
import os

# Remove the ambient background file
if os.path.exists("src/app/(app)/home/ambient-background.tsx"):
    os.remove("src/app/(app)/home/ambient-background.tsx")

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Remove the ambient background import and usage
content = content.replace('import { AmbientBackground } from "./ambient-background";\n', '')
content = content.replace('<AmbientBackground />\n      ', '')

# Update the trending items entrance (bounce/spring instead of slide)
old_trending = 'className={`flex-none w-[140px] ${item.bg} rounded-3xl p-5 snap-start shadow-sm hover:scale-[1.05] hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-right-8 zoom-in-95`}'
new_trending = 'className={`flex-none w-[140px] ${item.bg} rounded-3xl p-5 snap-start shadow-sm hover:scale-[1.05] transition-all duration-300 animate-in fade-in zoom-in-[0.8] slide-in-from-bottom-4`}'
content = content.replace(old_trending, new_trending)

# Update people items entrance
old_people = 'className="flex flex-col items-center gap-2 flex-none snap-start group animate-in fade-in slide-in-from-bottom-8 zoom-in-90 hover:scale-110 transition-all duration-300"'
new_people = 'className="flex flex-col items-center gap-2 flex-none snap-start group animate-in fade-in zoom-in-75 hover:scale-110 transition-all duration-300"'
content = content.replace(old_people, new_people)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

