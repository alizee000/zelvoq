import re

with open('src/components/layout/top-nav.tsx', 'r') as f:
    content = f.read()

bad_block = """      <div className="flex flex-col">
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

good_block = """      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <Logo className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-[19px] font-black tracking-tight text-slate-900 leading-none">
              MyKoodu
            </h1>
            <p className="text-[7.5px] font-bold uppercase tracking-[0.1em] text-slate-400 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis opacity-90">
              My community. My people. My world.
            </p>
          </div>
        </div>
      </div>"""

content = content.replace(bad_block, good_block)

with open('src/components/layout/top-nav.tsx', 'w') as f:
    f.write(content)
