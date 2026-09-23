import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# 1. Remove global animation
content = content.replace(
    'className="flex flex-col min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-32 pt-8"',
    'className="flex flex-col min-h-screen bg-white pb-32 pt-8"'
)
content = content.replace(
    'className="flex flex-col relative bg-white min-h-screen pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"',
    'className="flex flex-col relative bg-white min-h-screen pb-32"'
)

# 2. Category selection screen
content = content.replace(
    '<div className="px-6 pt-6">',
    '<div className="px-6 pt-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">'
)
# Stagger the category buttons
buttons = [
    '<h3 className="text-xl font-black text-slate-900 mb-1">Share a Space</h3>',
    '<h3 className="text-xl font-black text-slate-900 mb-1">Start a Group Buy</h3>',
    '<h3 className="text-xl font-black text-slate-900 mb-1">Lend an Item</h3>',
    '<h3 className="text-xl font-black text-slate-900 mb-1">Offer a Skill</h3>',
    '<h3 className="text-xl font-black text-slate-900 mb-1">Host an Event</h3>',
    '<h3 className="text-xl font-black text-white mb-1">Knock-Knock SOS</h3>'
]

# We need to target the `<button ...>` tags before these elements. Since it's hard to do purely by string replace,
# we'll inject stagger delays into the button className.
for i, title in enumerate(buttons):
    # Find the button className before this title
    pattern = r'(className="w-full text-left [^"]+ group hover:scale-\[1\.01\] transition-transform")([\s\S]*?)(' + re.escape(title) + ')'
    delay = (i + 1) * 100
    replacement = r'className="\1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[' + str(delay) + r'ms] fill-mode-both"\2\3'
    content = re.sub(pattern, replacement, content)

# 3. Form screen
content = content.replace(
    '<header className="pt-12 pb-4 px-6 sticky top-0 bg-white/80 backdrop-blur-2xl z-20 border-b border-slate-100 flex items-center justify-between">',
    '<header className="pt-12 pb-4 px-6 sticky top-0 bg-white/80 backdrop-blur-2xl z-20 border-b border-slate-100 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500 delay-0 fill-mode-both">'
)
content = content.replace(
    '<div className="px-6 mt-8">',
    '<div className="px-6 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[100ms] fill-mode-both">'
)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
