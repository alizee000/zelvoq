with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<div className="flex flex-col min-h-screen bg-slate-50/50 pb-32 pt-8duration-700">',
    '<div className="flex flex-col min-h-screen bg-slate-900 pb-32 pt-8 relative overflow-hidden text-white">'
)

content = content.replace(
    '<div className="flex flex-col min-h-screen bg-whitepb-32">',
    '<div className="flex flex-col min-h-screen bg-slate-900 pb-32 relative overflow-hidden text-white">'
)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)

