import re

with open('src/app/auth-client.tsx', 'r') as f:
    content = f.read()

bad_block = """          <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none mt-2">MyKoodu</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">my world</p>"""

good_block = """          <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none mt-2">MyKoodu</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.1em] text-[10px] mt-2 whitespace-nowrap">My community. My people. My world.</p>"""

content = content.replace(bad_block, good_block)

with open('src/app/auth-client.tsx', 'w') as f:
    f.write(content)
