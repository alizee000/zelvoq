import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="flex flex-col min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-32 pt-8"',
    'className="flex flex-col min-h-screen bg-white pb-32 pt-8"'
)

content = content.replace(
    '<div className="px-6 pt-6">',
    '<div className="px-6 pt-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">'
)

content = content.replace(
    '<div className="flex flex-col gap-4">',
    '<div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[200ms] fill-mode-both">'
)

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
