import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Replace the dropdown container classes
old_container = r'className="absolute top-12 right-0 w-\[calc\(100vw-3rem\)\] sm:w-80 max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"'

# Make it smaller (w-64 is 256px, w-72 is 288px) and move it right (-right-16)
new_container = 'className="absolute top-12 -right-16 sm:-right-4 w-[270px] sm:w-[300px] bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"'

content = re.sub(old_container, new_container, content)

# Reduce the height back a bit so it's compact as requested
content = content.replace('className="max-h-[60vh] md:max-h-[400px] overflow-y-auto hide-scrollbar"', 'className="max-h-[350px] overflow-y-auto hide-scrollbar"')

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)
