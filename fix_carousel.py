with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

# Modify the container holding the towers to be a horizontal scroll carousel
content = content.replace(
    'className="relative z-10 flex flex-col items-center justify-start gap-8 p-4 min-h-max pb-32 pt-10"',
    'className="relative z-10 flex flex-row items-end justify-start gap-8 px-8 min-h-max pb-32 pt-10 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar w-full"'
)

# Make sure each tower snaps to center and shrinks if needed, but primarily stays full width
content = content.replace(
    'className="flex flex-col items-center"',
    'className="flex flex-col items-center flex-none snap-center w-[85%] max-w-[300px]"'
)

# Make the flats flex-wrap if they need to, or just ensure they fit inside the tower width
content = content.replace(
    'className="bg-slate-900 border-2 border-slate-800 rounded-t-3xl p-4 shadow-2xl flex flex-col gap-2 relative"',
    'className="bg-slate-900 border-2 border-slate-800 rounded-t-3xl p-4 shadow-2xl flex flex-col gap-2 relative w-full"'
)

content = content.replace(
    'className="flex gap-2 p-2 bg-slate-800/50 rounded-xl border border-slate-700/50"',
    'className="flex gap-2 p-2 bg-slate-800/50 rounded-xl border border-slate-700/50 w-full justify-center"'
)

# Also ensure the main wrapper allows horizontal scroll within the mobile bounds
content = content.replace(
    'className="absolute inset-0 bg-[#0F172A] z-50 overflow-y-auto overflow-x-hidden flex flex-col font-sans"',
    'className="absolute inset-0 bg-[#0F172A] z-50 flex flex-col font-sans overflow-hidden"'
)

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(content)

