with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Remove global animation
content = content.replace(
    'className="flex flex-col gap-6 px-6 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out z-0"',
    'className="flex flex-col gap-6 px-6 pt-6 z-0"'
)

# Header animation
content = content.replace(
    '<section className="pt-2 pb-2">',
    '<section className="pt-2 pb-2 animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">'
)

# Talent network card animation
content = content.replace(
    '<section>',
    '<section className="animate-in fade-in zoom-in-95 duration-700 delay-[100ms] fill-mode-both">'
)

# Make decorative meshes in talent network rotate continuously
content = content.replace(
    'group-hover:scale-110 transition-transform duration-700"',
    'animate-[spin_15s_linear_infinite] group-hover:scale-110 transition-transform duration-700"'
)
content = content.replace(
    'mix-blend-multiply filter blur-[60px] opacity-70 group-hover:scale-110 transition-transform duration-700"',
    'mix-blend-multiply filter blur-[60px] opacity-70 animate-[spin_20s_linear_infinite_reverse] group-hover:scale-110 transition-transform duration-700"'
)

# Deals pill
content = content.replace(
    '<Link href="/market" className="flex-1 bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-4 group">',
    '<Link href="/market" className="flex-1 bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-4 group animate-in fade-in slide-in-from-left-8 duration-700 delay-[200ms] fill-mode-both">'
)

# Library pill
content = content.replace(
    '<Link href="/market?tab=borrow" className="flex-1 bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-4 group">',
    '<Link href="/market?tab=borrow" className="flex-1 bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-4 group animate-in fade-in slide-in-from-right-8 duration-700 delay-[300ms] fill-mode-both">'
)

# Events pill
content = content.replace(
    '<Link href="/events" className="col-span-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-between group">',
    '<Link href="/events" className="col-span-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-between group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[400ms] fill-mode-both">'
)

# Live activity section
content = content.replace(
    '<section className="flex flex-col gap-4 mt-2">',
    '<section className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[600ms] fill-mode-both">'
)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
