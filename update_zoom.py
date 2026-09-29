import re

with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

old_controls = """      {/* Floating Zoom Controls (Premium UI) */}
      <div className="absolute bottom-10 right-8 z-40 flex flex-col gap-2 pointer-events-auto">
        <div className="flex flex-col bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-2xl overflow-hidden p-1">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <div className="h-px bg-slate-200 mx-2" />
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.4))} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <Minus className="w-5 h-5" />
          </button>
        </div>
        <button onClick={centerScroll} className="w-12 h-12 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-[0_8px_20px_rgba(99,102,241,0.3)] transition-colors mt-2">
          <Maximize className="w-5 h-5" />
        </button>
      </div>"""

new_controls = """      {/* Floating Zoom Controls (Premium UI) */}
      <div className="absolute top-6 right-6 z-40 flex flex-col gap-2 pointer-events-auto">
        <div className="flex flex-col bg-white/80 backdrop-blur-xl border border-white shadow-sm rounded-xl overflow-hidden p-0.5">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-200 mx-1.5" />
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.4))} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Minus className="w-4 h-4" />
          </button>
        </div>
        <button onClick={centerScroll} className="w-8 h-8 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-[0_4px_10px_rgba(99,102,241,0.3)] transition-colors mx-auto">
          <Maximize className="w-3.5 h-3.5" />
        </button>
      </div>"""

if old_controls in content:
    content = content.replace(old_controls, new_controls)
    with open('src/components/ui/hive-network.tsx', 'w') as f:
        f.write(content)
    print("Successfully replaced zoom controls.")
else:
    print("Could not find the exact zoom controls string.")
