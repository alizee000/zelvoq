with open('src/app/(app)/profile/karma-rings.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden mb-8"',
    'className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden"'
)

content = content.replace('bg-indigo-500/20', 'bg-indigo-100')
content = content.replace('text-white flex', 'text-slate-900 flex')
content = content.replace('text-slate-400 font-medium', 'text-slate-500 font-medium')
content = content.replace('text-slate-400', 'text-slate-500')
content = content.replace('text-white', 'text-slate-900')
content = content.replace('bg-red-500/20', 'bg-red-50')
content = content.replace('bg-purple-500/20', 'bg-purple-50')
content = content.replace('bg-emerald-500/20', 'bg-emerald-50')

with open('src/app/(app)/profile/karma-rings.tsx', 'w') as f:
    f.write(content)
