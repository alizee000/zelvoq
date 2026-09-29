with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Make the wrapper dark mode cinematic
content = content.replace(
    '<div className="flex flex-col min-h-screen bg-slate-50/50 pb-32 pt-8 ">',
    '<div className="flex flex-col min-h-screen bg-slate-900 pb-32 pt-12 relative overflow-hidden text-white">'
)
content = content.replace(
    'text-slate-900', 'text-white'
).replace(
    'text-slate-500', 'text-slate-400'
).replace(
    'text-slate-400', 'text-slate-500'
).replace(
    'text-slate-700', 'text-white/80'
)

# Fix close button
content = content.replace(
    'bg-white rounded-full p-2 shadow-sm border border-slate-100',
    'bg-white/10 rounded-full p-2 backdrop-blur-md border border-white/20'
)

# Fix Category selection buttons (from light theme to cinematic glassmorphism)
content = content.replace(
    'bg-[#FFF1F2] rounded-3xl p-6 shadow-sm border border-rose-100',
    'bg-rose-500/10 rounded-3xl p-6 shadow-sm border border-rose-500/20 backdrop-blur-md'
).replace(
    'bg-white rounded-3xl p-6 shadow-sm border border-slate-100',
    'bg-white/5 rounded-3xl p-6 shadow-sm border border-white/10 backdrop-blur-md hover:bg-white/10'
)

# Fix Form Inputs container
content = content.replace(
    '<div className="flex flex-col min-h-screen bg-white  pb-32">',
    '<div className="flex flex-col min-h-screen bg-slate-900 pb-32 pt-12 relative overflow-hidden text-white">'
).replace(
    'bg-slate-50 border-transparent rounded-2xl',
    'bg-black/20 border border-white/10 rounded-2xl text-white focus:bg-black/40 focus:border-indigo-500/50'
).replace(
    'bg-slate-50 p-4 rounded-2xl border border-slate-100',
    'bg-black/20 p-4 rounded-2xl border border-white/10 backdrop-blur-md'
)

# Fix Image Upload area
content = content.replace(
    'bg-slate-50 border-2 border-dashed border-slate-200',
    'bg-black/20 border-2 border-dashed border-white/20 hover:border-white/40'
).replace(
    'text-slate-300', 'text-slate-400'
)

# Fix specific button
content = content.replace(
    'bg-slate-900 hover:bg-slate-800 text-white',
    'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/50'
)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
