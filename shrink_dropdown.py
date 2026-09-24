import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Shrink dropdown width
content = content.replace('w-72 bg-white', 'w-64 bg-white')

# Shrink padding and text size in headers
content = content.replace('p-3 border-b', 'p-2 border-b')
content = content.replace('p-3 border-t', 'p-2 border-t')
content = content.replace('text-sm text-slate-900', 'text-xs text-slate-900')
content = content.replace('text-xs font-medium text-slate-500', 'text-[10px] font-medium text-slate-500')

# Shrink the individual notification padding and text
content = content.replace('<div className="flex flex-col gap-3">', '<div className="flex flex-col gap-2">')
content = content.replace('<div className="w-8 h-8', '<div className="w-6 h-6')
content = content.replace('text-[10px] font-bold text-slate-600', 'text-[9px] font-bold text-slate-600')
content = content.replace('<p className="text-sm font-medium text-slate-800 leading-tight">', '<p className="text-xs font-medium text-slate-800 leading-tight">')
content = content.replace('text-[10px] font-bold text-slate-400', 'text-[8px] font-bold text-slate-400')

# Reduce max height slightly to keep the "3 items" proportion with the new smaller text
content = content.replace('max-h-[260px]', 'max-h-[200px]')

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)
