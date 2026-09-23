import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Make padding smaller
content = content.replace('p-4 border-b border-slate-100', 'p-3 border-b border-slate-100')
content = content.replace('p-4 border-b border-slate-50', 'p-3 border-b border-slate-50')
content = content.replace('p-4 bg-slate-50', 'p-3 bg-slate-50')

# Make the title smaller
content = content.replace('font-extrabold text-slate-900', 'font-bold text-sm text-slate-900')

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)

