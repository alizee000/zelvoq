import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# Remove the wrapper animation
old_wrapper = '<section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[300ms]">'
new_wrapper = '<section>'
content = content.replace(old_wrapper, new_wrapper)

# Update the map function to include the index `i`
content = content.replace('{uniqueNeighbors.map((talent: any) => (', '{uniqueNeighbors.map((talent: any, i: number) => (')

# Update the Link card to have staggered jitter entrance animations
old_link = '                <Link href={`/talent/${talent.id}`} key={talent.id} className="flex-none bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center shadow-sm hover:scale-[1.02] hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer">'
new_link = '                <Link href={`/talent/${talent.id}`} key={talent.id} style={{ animationDelay: `${100 + (i * 100)}ms`, animationFillMode: "both" }} className="animate-in fade-in zoom-in-[0.8] slide-in-from-bottom-8 duration-500 flex-none bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center shadow-sm hover:scale-[1.05] hover:-translate-y-1 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer">'
content = content.replace(old_link, new_link)


with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

