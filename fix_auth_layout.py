import re

with open('src/app/auth-client.tsx', 'r') as f:
    client = f.read()

# Fix the main wrapper to handle scrolling properly
client = client.replace(
    '<div className="flex-1 flex flex-col justify-end relative z-10 w-full min-h-screen pt-32">',
    '<div className="flex-1 flex flex-col justify-between relative z-10 w-full min-h-[100dvh] pt-8">'
)

old_header = """          {/* Brand Header Floating Top */}
          <div className="absolute top-12 left-0 right-0 flex flex-col items-center justify-center pointer-events-none px-8 text-center">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/10 mb-4">
              <Logo className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1.5">MyKoodu</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Resident Portal</p>
            
            <p className="text-[14px] font-medium text-slate-600 leading-relaxed max-w-[280px]">
              Discover hidden talents, borrow tools, and join local events instantly within your society.
            </p>
          </div>"""

new_header = """          {/* Brand Header */}
          <div className="flex-1 flex flex-col items-center justify-center pointer-events-none px-6 text-center shrink-0 min-h-[220px] pb-6">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/10 mb-4">
              <Logo className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">MyKoodu</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Resident Portal</p>
            
            <p className="text-[14px] font-medium text-slate-600 leading-relaxed max-w-[300px]">
              Discover hidden talents, borrow tools, and join local events instantly within your society.
            </p>
          </div>"""

client = client.replace(old_header, new_header)

with open('src/app/auth-client.tsx', 'w') as f:
    f.write(client)
