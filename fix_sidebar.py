import re

with open('src/components/layout/sidebar.tsx', 'r') as f:
    content = f.read()

old_logo_block = """          <div>
            <span className="text-xl font-bold tracking-tight">MyKoodu</span>
          </div>"""

new_logo_block = """          <div className="flex flex-col items-start justify-center">
            <span className="text-xl font-bold tracking-tight leading-none mt-1">MyKoodu</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1 text-center w-full">my world</span>
          </div>"""

content = content.replace(old_logo_block, new_logo_block)

with open('src/components/layout/sidebar.tsx', 'w') as f:
    f.write(content)
