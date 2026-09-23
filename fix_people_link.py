with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

old_link = '              <Link href="/discover" key={person.id} className="flex-none w-[120px] bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center snap-start shadow-sm hover:scale-[1.02] hover:border-indigo-100 transition-all cursor-pointer">'
new_link = '              <Link href={`/talent/${person.id}`} key={person.id} className="flex-none w-[120px] bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center snap-start shadow-sm hover:scale-[1.02] hover:border-indigo-100 transition-all cursor-pointer">'

content = content.replace(old_link, new_link)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

