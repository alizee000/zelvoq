with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Replace the specific Link for the Hidden Gem Hero
old_link = '        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">\n          <Link href="/discover" className="block w-full bg-gradient-to-br from-[#FFF5F0] to-[#FFE8E0] rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">'
new_link = '        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">\n          <Link href={gemTalent ? `/talent/${gemTalent.id}` : "/discover"} className="block w-full bg-gradient-to-br from-[#FFF5F0] to-[#FFE8E0] rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">'

content = content.replace(old_link, new_link)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

