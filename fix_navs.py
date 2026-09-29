import re

# 1. Fix Bottom Nav (Edge-to-edge iOS style)
with open('src/components/layout/bottom-nav.tsx', 'r') as f:
    bottom_nav = f.read()

new_bottom_nav = bottom_nav.replace(
    'className="fixed bottom-6 left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-md h-16 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-full shadow-[0_20px_40px_-10px_rgba(79,70,229,0.15)] z-50 flex items-center justify-between px-4 pb-safe"',
    'className="fixed bottom-0 left-0 right-0 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-md h-[88px] bg-white/85 backdrop-blur-2xl border-t border-slate-200/60 z-50 flex items-start justify-between px-6 pt-3 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.03)]"'
)
# Change the center button to not float weirdly
new_bottom_nav = new_bottom_nav.replace(
    '<div className="absolute left-1/2 -translate-x-1/2 -top-5">',
    '<div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/3">'
)
with open('src/components/layout/bottom-nav.tsx', 'w') as f:
    f.write(new_bottom_nav)

# 2. Fix Top Nav (Ultra minimal)
with open('src/components/layout/top-nav.tsx', 'r') as f:
    top_nav = f.read()

# Remove the slogan and simplify
top_nav = re.sub(
    r'<div className="flex items-center gap-2">[\s\S]*?<\/div>\s*<\/div>',
    """<div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] bg-slate-900 flex items-center justify-center shadow-sm shrink-0">
            <Logo className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-[20px] font-black tracking-tight text-slate-900 leading-none">
            MyKoodu
          </h1>
        </div>""",
    top_nav
)
top_nav = top_nav.replace('bg-white/70 backdrop-blur-xl border-b border-slate-200/50', 'bg-white/90 backdrop-blur-3xl border-b border-slate-100/50')
with open('src/components/layout/top-nav.tsx', 'w') as f:
    f.write(top_nav)

# 3. Remove duplicate header from home/page.tsx
with open('src/app/(app)/home/page.tsx', 'r') as f:
    home_page = f.read()

pattern = re.compile(r'<div className="flex items-center justify-between px-6 pt-8 pb-4">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>')
match = pattern.search(home_page)
if match:
    home_page = home_page[:match.start()] + home_page[match.end():]
    with open('src/app/(app)/home/page.tsx', 'w') as f:
        f.write(home_page)

