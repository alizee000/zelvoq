import re

with open('src/components/layout/top-nav.tsx', 'r') as f:
    content = f.read()

# Change header padding
old_header = '<header className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between bg-white/70 backdrop-blur-xl border-b border-slate-200/50">'
new_header = '<header className="sticky top-0 z-40 pl-6 pr-2 py-4 flex items-center justify-between bg-white/70 backdrop-blur-xl border-b border-slate-200/50">'
content = content.replace(old_header, new_header)

# Tighten the gap slightly so they feel more cohesive and are moved further right relative to the container
old_gap = '<div className="flex items-center gap-3">'
new_gap = '<div className="flex items-center gap-1.5">'
content = content.replace(old_gap, new_gap)

with open('src/components/layout/top-nav.tsx', 'w') as f:
    f.write(content)
