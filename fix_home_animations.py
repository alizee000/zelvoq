import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Import AmbientBackground
if 'import { AmbientBackground }' not in content:
    content = content.replace('import { DynamicGreeting } from "./dynamic-greeting";', 
                            'import { DynamicGreeting } from "./dynamic-greeting";\nimport { AmbientBackground } from "./ambient-background";')

# Inject ambient background
content = content.replace('<div className="flex flex-col min-h-screen pb-[90px] bg-white">', 
                          '<div className="flex flex-col min-h-screen pb-[90px] bg-white relative">\n      <AmbientBackground />')

# Make the wrapper div relative and z-10 so it sits above the background
content = content.replace('<div className="flex flex-col gap-6 px-6 pt-6">', 
                          '<div className="flex flex-col gap-6 px-6 pt-6 relative z-10">')

# Add stagger animation to trending items
old_trending_link = '                <Link href={item.href} key={i} className={`flex-none w-[140px] ${item.bg} rounded-3xl p-5 snap-start shadow-sm hover:scale-[1.02] hover:shadow-md transition-all`}>'
new_trending_link = '                <Link href={item.href} key={i} style={{ animationDelay: `${150 + (i * 100)}ms`, animationFillMode: "both" }} className={`flex-none w-[140px] ${item.bg} rounded-3xl p-5 snap-start shadow-sm hover:scale-[1.05] hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-right-8 zoom-in-95`}>'
content = content.replace(old_trending_link, new_trending_link)

# Add stagger animation to people items
old_people_link = '              <Link href={`/talent/${person.id}`} key={i} className="flex flex-col items-center gap-2 flex-none snap-start group">'
new_people_link = '              <Link href={`/talent/${person.id}`} key={i} style={{ animationDelay: `${250 + (i * 100)}ms`, animationFillMode: "both" }} className="flex flex-col items-center gap-2 flex-none snap-start group animate-in fade-in slide-in-from-bottom-8 zoom-in-90 hover:scale-110 transition-all duration-300">'
content = content.replace(old_people_link, new_people_link)

# Add a subtle pulse to the Hidden Gem card
content = content.replace('<HiddenGem talent={gemTalent} />', '<div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 fill-mode-both hover:-translate-y-1 transition-transform duration-500">\n          <HiddenGem talent={gemTalent} />\n        </div>')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

