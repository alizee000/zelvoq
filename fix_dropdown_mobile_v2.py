import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Replace the dropdown container classes again
old_container = r'className="absolute top-12 -right-16 sm:-right-4 w-\[270px\] sm:w-\[300px\] bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"'

# Use fixed positioning for mobile to guarantee it aligns with the screen edge, absolute for desktop
new_container = 'className="fixed sm:absolute top-16 sm:top-12 right-2 sm:-right-4 w-[250px] sm:w-[300px] bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"'

content = re.sub(old_container, new_container, content)

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)
