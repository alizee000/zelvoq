import re

with open('src/app/(app)/knock-knocks/knock-knock-list-client.tsx', 'r') as f:
    content = f.read()

content = content.replace('<div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">', '<div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full" suppressHydrationWarning>')

with open('src/app/(app)/knock-knocks/knock-knock-list-client.tsx', 'w') as f:
    f.write(content)
