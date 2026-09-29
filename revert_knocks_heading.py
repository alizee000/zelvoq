import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Fix padding
content = content.replace('pt-10 pb-2 pl-5', 'pt-6 pb-2 pl-6')

# Add heading back
heading = """<div className="flex items-center gap-1 mb-3 pr-6">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight uppercase">Live Knocks</h2>
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ml-1" />
        </div>"""

content = content.replace('<div className="flex gap-4 overflow-x-auto', heading + '\n\n        <div className="flex gap-4 overflow-x-auto')

with open('src/components/ui/live-knocks.tsx', 'w') as f:
    f.write(content)

