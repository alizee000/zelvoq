import re

with open('src/app/auth-client.tsx', 'r') as f:
    client = f.read()

client = client.replace(
    '<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Resident Portal</p>',
    '<p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-4">My community. My people. My world.</p>'
)

with open('src/app/auth-client.tsx', 'w') as f:
    f.write(client)
