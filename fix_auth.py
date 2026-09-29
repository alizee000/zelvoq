import re

with open('src/app/auth-client.tsx', 'r') as f:
    content = f.read()

old_logo_block = """          <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">MyKoodu</h1>
          <p className="text-slate-500 font-medium text-sm">My community. My people. My world.</p>"""

new_logo_block = """          <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none mt-2">MyKoodu</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">my world</p>"""

content = content.replace(old_logo_block, new_logo_block)

with open('src/app/auth-client.tsx', 'w') as f:
    f.write(content)
