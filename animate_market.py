import re

with open('src/app/(app)/market/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="flex flex-col min-h-screen bg-white pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"',
    'className="flex flex-col min-h-screen bg-white pb-32"'
)
content = content.replace(
    '<div className="px-6 pt-10 pb-6">',
    '<div className="px-6 pt-10 pb-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">'
)
content = content.replace(
    '<div className="px-6 mb-8">',
    '<div className="px-6 mb-8 animate-in fade-in zoom-in-95 duration-700 delay-[100ms] fill-mode-both">'
)
content = content.replace(
    '<div className="px-6 animate-in fade-in slide-in-from-bottom-2 duration-300">',
    '<div className="px-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[200ms] fill-mode-both">'
)

with open('src/app/(app)/market/page.tsx', 'w') as f:
    f.write(content)
