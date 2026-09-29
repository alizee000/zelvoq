import os

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Make the header massive and bold
old_header = '''          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Add Listing
            </h1>
            <p className="text-sm text-slate-500 mt-1">Select a category to get started.</p>
          </div>'''
new_header = '''          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Create
            </h1>
            <p className="text-slate-500 font-medium">What would you like to share?</p>
          </div>'''
content = content.replace(old_header, new_header)

# Change the flex column of buttons into a responsive grid
old_container = '''          <div className="flex flex-col gap-4">
            {/* Knock-Knock Option */}
            <button onClick={() => setCategory("knock")} className="w-full text-left bg-rose-50 rounded-3xl p-6 shadow-sm border border-rose-100 relative overflow-hidden flex items-center justify-between group hover:shadow-md transition-all"
            >'''
new_container = '''          <div className="grid grid-cols-2 gap-4">
            {/* Knock-Knock Option */}
            <button onClick={() => setCategory("knock")} className="col-span-2 w-full text-left bg-rose-500 rounded-3xl p-6 shadow-lg border-none relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] active:scale-95 transition-all"
            >
              <div>
                <h3 className="text-xl font-black text-white mb-1">Emergency SOS</h3>
                <p className="text-sm text-rose-100 font-medium">Alert neighbors immediately</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                <BellRing className="w-7 h-7" />
              </div>
            </button>
            <div className="col-span-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 mb-1 px-2">Marketplace & Community</div>'''

content = content.replace(old_container, new_container)

# We also need to fix the other buttons to be vertical cards so they fit in a 2-col grid
# We'll use regex to rewrite all buttons

import re

def rewrite_button(match):
    cat = match.group(1)
    color = match.group(2)
    icon = match.group(3)
    title = match.group(4)
    desc = match.group(5)
    
    return f'''
            <button onClick={{() => setCategory("{cat}")}} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white relative flex flex-col items-start gap-4 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-{color}-100 flex items-center justify-center text-{color}-600 shrink-0 group-hover:scale-110 transition-transform">
                <{icon} className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{title}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-snug">{desc}</p>
              </div>
            </button>'''

# Regex to match the existing horizontal buttons
pattern = r'<button onClick=\{\(\) => setCategory\("([^"]+)"\)\}.*?<h3[^>]*>([^<]+)</h3>.*?<p[^>]*>([^<]+)</p>.*?bg-([a-z]+)-50.*?<([A-Z][a-zA-Z]+) className="w-7 h-7" />.*?</button>'

# Let's do it manually using replace to be safe
content = content.replace('''            {/* Item Option */}
            <button onClick={() => setCategory("item")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:shadow-md transition-all hover:border-slate-300"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Lend an Item</h3>
                <p className="text-sm text-slate-500 font-medium">Share idle tools and equipment</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Wrench className="w-7 h-7" />
              </div>
            </button>''', 
            '''            {/* Item Option */}
            <button onClick={() => setCategory("item")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Lend Item</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Share tools & gear</p>
              </div>
            </button>''')

content = content.replace('''            {/* Skill Option */}
            <button onClick={() => setCategory("skill")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:shadow-md transition-all hover:border-slate-300"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Offer a Skill</h3>
                <p className="text-sm text-slate-500 font-medium">Teach math, yoga, or baking</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Target className="w-7 h-7" />
              </div>
            </button>''',
            '''            {/* Skill Option */}
            <button onClick={() => setCategory("skill")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Offer Skill</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Teach baking, yoga</p>
              </div>
            </button>''')

content = content.replace('''            {/* Deal Option */}
            <button onClick={() => setCategory("deal")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:shadow-md transition-all hover:border-slate-300"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Start Group Buy</h3>
                <p className="text-sm text-slate-500 font-medium">Unlock bulk discounts together</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <ShoppingBag className="w-7 h-7" />
              </div>
            </button>''',
            '''            {/* Deal Option */}
            <button onClick={() => setCategory("deal")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Group Buy</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Bulk discounts</p>
              </div>
            </button>''')

content = content.replace('''            {/* Event Option */}
            <button onClick={() => setCategory("event")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:shadow-md transition-all hover:border-slate-300"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Host an Event</h3>
                <p className="text-sm text-slate-500 font-medium">Organize a meetup or party</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <Calendar className="w-7 h-7" />
              </div>
            </button>''',
            '''            {/* Event Option */}
            <button onClick={() => setCategory("event")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Host Event</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Meetups & parties</p>
              </div>
            </button>''')

content = content.replace('''            {/* Co-Own Option */}
            <button onClick={() => setCategory("coown")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:shadow-md transition-all hover:border-slate-300"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Fractional Co-Own</h3>
                <p className="text-sm text-slate-500 font-medium">Pool money to buy premium items</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <PieChart className="w-7 h-7" />
              </div>
            </button>''',
            '''            {/* Co-Own Option */}
            <button onClick={() => setCategory("coown")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-110 transition-transform">
                <PieChart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Co-Own</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Fractional assets</p>
              </div>
            </button>''')

content = content.replace('''            {/* Space Option */}
            <button onClick={() => setCategory("space")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:shadow-md transition-all hover:border-slate-300"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Share a Space</h3>
                <p className="text-sm text-slate-500 font-medium">List parking or guest rooms</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                <CarFront className="w-7 h-7" />
              </div>
            </button>''',
            '''            {/* Space Option */}
            <button onClick={() => setCategory("space")} className="w-full text-left bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white relative flex flex-col items-start gap-3 group hover:scale-[1.02] active:scale-95 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-110 transition-transform">
                <CarFront className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Share Space</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">Parking & rooms</p>
              </div>
            </button>''')

# Remove the previously modified knock button old text just in case there's duplication
# Not needed since I replaced the whole container at the top

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
