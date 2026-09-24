import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# 1. Add fill-mode-both to all sections to ensure they are hidden before their delay triggers
content = content.replace('duration-700 delay-75"', 'duration-700 delay-75 fill-mode-both"')
content = content.replace('duration-700 delay-150"', 'duration-700 delay-[150ms] fill-mode-both"')
content = content.replace('duration-700 delay-[200ms]"', 'duration-700 delay-[225ms] fill-mode-both"')
content = content.replace('duration-700 delay-[300ms]"', 'duration-700 delay-[300ms] fill-mode-both"')

# Also animate the header and video to stagger perfectly
content = content.replace('duration-700">', 'duration-700 fill-mode-both">')

# 2. Add staggered animations to 'People you should know' cards
old_people_map = r'\{people\.length > 0 \? people\.map\(\(person: any\) => \(\s*<Link href=\{\`/talent/\$\{person\.id\}\`\} key=\{person\.id\} className="flex-none w-\[120px\] bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center snap-start shadow-sm hover:scale-\[1\.02\] hover:border-indigo-100 transition-all cursor-pointer">'

new_people_map = """{people.length > 0 ? people.map((person: any, i: number) => (
              <Link href={`/talent/${person.id}`} key={person.id} style={{ animationDelay: `${300 + (i * 75)}ms`, animationFillMode: "both" }} className="flex-none w-[120px] bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center snap-start shadow-sm hover:scale-[1.02] hover:border-indigo-100 transition-all cursor-pointer animate-in fade-in zoom-in-[0.9] slide-in-from-right-8 duration-500">"""

content = re.sub(old_people_map, new_people_map, content)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

