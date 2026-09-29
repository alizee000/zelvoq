with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Revert main wrappers to transparent/light mode
content = content.replace(
    '<div className="flex flex-col min-h-screen bg-slate-900 pb-32 pt-8 relative overflow-hidden text-white">',
    '<div className="flex flex-col min-h-screen bg-transparent pb-32 pt-8 relative overflow-hidden text-slate-900">'
)
content = content.replace(
    '<div className="flex flex-col min-h-screen bg-slate-900 pb-32 relative overflow-hidden text-white">',
    '<div className="flex flex-col min-h-screen bg-transparent pb-32 relative overflow-hidden text-slate-900">'
)

# Fix Headers
content = content.replace('text-2xl font-bold text-white', 'text-2xl font-bold text-slate-900 tracking-tight')
content = content.replace('<ArrowLeft className="w-5 h-5 text-white" />', '<ArrowLeft className="w-5 h-5 text-slate-900" />')
content = content.replace('bg-white/10 rounded-full p-2 backdrop-blur-md border border-white/20', 'bg-white rounded-full p-2 shadow-sm border border-slate-100')

# Fix Category selection buttons to match Home page style (Premium Light)
content = content.replace(
    'bg-rose-500/10 rounded-3xl p-6 shadow-sm border border-rose-500/20 backdrop-blur-md relative overflow-hidden flex items-center justify-between group hover:scale-[1.02]',
    'bg-rose-50 rounded-3xl p-6 shadow-sm border border-rose-100 relative overflow-hidden flex items-center justify-between group hover:shadow-md transition-all'
)
content = content.replace('text-rose-400', 'text-rose-600')
content = content.replace('text-rose-300', 'text-rose-500')

content = content.replace(
    'bg-white/5 rounded-3xl p-6 shadow-sm border border-white/10 backdrop-blur-md hover:bg-white/10 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02]',
    'bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:shadow-md transition-all hover:border-slate-300'
)
content = content.replace('text-xl font-black text-white', 'text-xl font-bold text-slate-900')

# Fix Form Inputs container (Premium Light)
content = content.replace(
    'bg-black/20 border border-white/10 rounded-2xl text-white focus:bg-black/40 focus:border-indigo-500/50',
    'bg-white border border-slate-200 rounded-2xl text-slate-900 focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 shadow-sm'
)
content = content.replace(
    'bg-black/20 p-4 rounded-2xl border border-white/10 backdrop-blur-md',
    'bg-white p-4 rounded-2xl border border-slate-100 shadow-sm'
)
content = content.replace('text-sm font-bold text-white', 'text-sm font-bold text-slate-900')

# Fix Image Upload area (Premium Light)
content = content.replace(
    'bg-black/20 border-2 border-dashed border-white/20 hover:border-white/40 rounded-2xl',
    'bg-slate-50 border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-2xl'
)
content = content.replace('hover:bg-white/5 hover:border-white/40', '')

# Ensure text-slate-500 is used instead of text-slate-400 where appropriate in light mode
# We had flipped them earlier, so let's just make placeholders slate-400
content = content.replace('placeholder:text-slate-500', 'placeholder:text-slate-400')

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
