import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# Restore Page Header animation
content = content.replace(
    '<section>', 
    '<section className="animate-in fade-in slide-in-from-top-4 duration-700">'
)

# Since I might have just removed them, I'll use a more precise replacement

pattern_header = re.compile(r'\{\/\* Page Header \*\/\}\s*<section>')
content = pattern_header.sub('{/* Page Header */}\n        <section className="animate-in fade-in slide-in-from-top-4 duration-700">', content)

pattern_search = re.compile(r'\{\/\* Search Bar \*\/\}\s*<section>')
content = pattern_search.sub('{/* Search Bar */}\n        <section className="animate-in fade-in zoom-in-95 duration-700 delay-75 fill-mode-both">', content)

pattern_cat = re.compile(r'\{\/\* Categories \(Apple style pills\) \*\/\}\s*<section>')
content = pattern_cat.sub('{/* Categories (Apple style pills) */}\n        <section className="animate-in fade-in slide-in-from-right-8 duration-700 delay-150 fill-mode-both">', content)

pattern_grid = re.compile(r'\{\/\* Grid Content \*\/\}\s*<section className="mt-8">')
content = pattern_grid.sub('{/* Grid Content */}\n        <section className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[200ms] fill-mode-both">', content)

# I should also add stagger to the cards to match home page
pattern_card = re.compile(r'<Link \s*href=\{`/talent/\$\{talent.id\}`\} \s*key=\{talent.id\} \s*className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer"\s*>')

# We can replace this with a map that uses index `i`
content = content.replace('uniqueNeighbors.map((talent: any) => (', 'uniqueNeighbors.map((talent: any, i: number) => (')
content = re.sub(
    r'<Link \s*href=\{`/talent/\$\{talent\.id\}`\} \s*key=\{talent\.id\} \s*className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer"\s*>',
    r'<Link href={`/talent/${talent.id}`} key={talent.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-in fade-in zoom-in-[0.9] slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${250 + (i * 100)}ms` }}>',
    content
)


with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

