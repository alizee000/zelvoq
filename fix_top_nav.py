import re

with open('src/components/layout/top-nav.tsx', 'r') as f:
    content = f.read()

old_logo_block = """      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Logo className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-slate-900">
            MyKoodu
          </h1>
        </div>
        <p className="text-[7.5px] font-bold uppercase tracking-widest text-slate-400 ml-10 -mt-1 opacity-80">
          My community. My people. My world.
        </p>
      </div>"""

new_logo_block = """      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Logo className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
              MyKoodu
            </h1>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1 text-center w-full">
              my world
            </p>
          </div>
        </div>
      </div>"""

content = content.replace(old_logo_block, new_logo_block)

with open('src/components/layout/top-nav.tsx', 'w') as f:
    f.write(content)
