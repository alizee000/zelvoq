import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# I will find the grid container and replace everything inside it up to the end of the category selection UI
start_marker = '<div className="grid grid-cols-2 gap-4">'
end_marker = '</div>\n\n      </div>\n    );\n  }'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    new_grid = '''<div className="grid grid-cols-2 gap-3">
            {/* Knock-Knock Option */}
            <button onClick={() => setCategory("knock")} className="col-span-2 w-full text-left bg-rose-500 rounded-3xl p-6 shadow-lg border-none relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] active:scale-95 transition-all"
            >
              <div>
                <h3 className="text-xl font-black text-white mb-1 truncate">Emergency SOS</h3>
                <p className="text-sm text-rose-100 font-medium truncate">Alert neighbors immediately</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                <BellRing className="w-7 h-7" />
              </div>
            </button>
            <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 px-2">Marketplace & Community</div>

            {/* Item Option */}
            <button onClick={() => setCategory("item")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0 group-hover:scale-110 transition-transform">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="w-full">
                <h3 className="text-[15px] sm:text-lg font-bold text-slate-900 leading-tight truncate w-full">Lend Item</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug truncate w-full">Share tools & gear</p>
              </div>
            </button>

            {/* Skill Option */}
            <button onClick={() => setCategory("skill")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="w-full">
                <h3 className="text-[15px] sm:text-lg font-bold text-slate-900 leading-tight truncate w-full">Offer Skill</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug truncate w-full">Teach baking, yoga</p>
              </div>
            </button>

            {/* Deal Option */}
            <button onClick={() => setCategory("deal")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="w-full">
                <h3 className="text-[15px] sm:text-lg font-bold text-slate-900 leading-tight truncate w-full">Group Buy</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug truncate w-full">Bulk discounts</p>
              </div>
            </button>

            {/* Event Option */}
            <button onClick={() => setCategory("event")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="w-full">
                <h3 className="text-[15px] sm:text-lg font-bold text-slate-900 leading-tight truncate w-full">Host Event</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug truncate w-full">Meetups & parties</p>
              </div>
            </button>

            {/* Co-Own Option */}
            <button onClick={() => setCategory("coown")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-110 transition-transform">
                <PieChart className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="w-full">
                <h3 className="text-[15px] sm:text-lg font-bold text-slate-900 leading-tight truncate w-full">Co-Own</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug truncate w-full">Fractional assets</p>
              </div>
            </button>

            {/* Space Option */}
            <button onClick={() => setCategory("space")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-110 transition-transform">
                <CarFront className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="w-full">
                <h3 className="text-[15px] sm:text-lg font-bold text-slate-900 leading-tight truncate w-full">Share Space</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug truncate w-full">Parking & rooms</p>
              </div>
            </button>
'''
    new_content = content[:start_idx] + new_grid + content[end_idx:]
    with open('src/app/(app)/add/page.tsx', 'w') as f:
        f.write(new_content)
else:
    print("Could not find the markers!")
