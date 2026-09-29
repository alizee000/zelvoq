import re

with open('src/components/layout/sidebar.tsx', 'r') as f:
    content = f.read()

bad_block = """          <div className="flex flex-col items-start justify-center">
            <span className="text-xl font-bold tracking-tight leading-none mt-1">MyKoodu</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1 text-center w-full">my world</span>
          </div>"""

good_block = """          <div className="flex flex-col items-start justify-center overflow-hidden">
            <span className="text-[19px] font-black tracking-tight leading-none">MyKoodu</span>
            <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5 whitespace-nowrap">My community. My people. My world.</span>
          </div>"""

content = content.replace(bad_block, good_block)

with open('src/components/layout/sidebar.tsx', 'w') as f:
    f.write(content)
