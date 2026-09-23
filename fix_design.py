import os

files_to_fix = [
    "src/app/(app)/add/page.tsx",
    "src/app/(app)/profile/page.tsx",
    "src/app/(app)/events/page.tsx",
    "src/components/shared/group-buy-card.tsx",
    "src/components/shared/space-card.tsx",
    "src/components/shared/borrow-card.tsx",
    "src/components/shared/co-own-card.tsx"
]

for file_path in files_to_fix:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()

        # General clean-ups for the cards
        content = content.replace('shadow-[0_8px_30px_rgb(0,0,0,0.06)]', 'shadow-sm border border-slate-100')
        content = content.replace('shadow-[0_8px_30px_rgba(244,63,94,0.3)]', 'shadow-sm border border-rose-100')
        
        # Specific fix for Knock-Knock gradient in add/page.tsx
        if "add/page.tsx" in file_path:
            content = content.replace(
                'bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl p-6 shadow-sm border border-rose-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.01] transition-transform',
                'bg-[#FFF1F2] rounded-3xl p-6 shadow-sm border border-rose-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.01] transition-transform'
            )
            content = content.replace('text-xl font-black text-white', 'text-xl font-black text-rose-900')
            content = content.replace('text-sm text-white/80 font-medium', 'text-sm text-rose-500 font-medium')
            content = content.replace('bg-white/20 flex items-center justify-center text-white', 'bg-[#FFE4E6] flex items-center justify-center text-rose-600')

        # Specific fix for Profile page gradient
        if "profile/page.tsx" in file_path:
            content = content.replace(
                '<div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90"></div>',
                '<div className="absolute top-0 left-0 w-full h-32 bg-slate-50 border-b border-slate-100"></div>'
            )
            content = content.replace('shadow-[0_8px_30px_rgb(0,0,0,0.12)]', 'shadow-sm border border-slate-100')
            
        with open(file_path, 'w') as f:
            f.write(content)

print("Done updating styles!")
