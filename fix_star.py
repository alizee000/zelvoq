import re

with open('src/app/(app)/talent/[id]/page.tsx', 'r') as f:
    content = f.read()

# 1. Remove it from the flex row
old_flex_row = '''          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full">
              <MapPin className="w-4 h-4" />
              {talent.tower}
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 px-4 py-1.5 rounded-full">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              5.0 (New)
            </div>
          </div>'''

new_flex_row = '''          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full">
              <MapPin className="w-4 h-4" />
              {talent.tower}
            </div>
          </div>'''

content = content.replace(old_flex_row, new_flex_row)

# 2. Add it to the top corner
old_card_top = '''        {/* Profile Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-700 delay-75">
          <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 border-b border-slate-100"></div>'''

new_card_top = '''        {/* Profile Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-700 delay-75">
          <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 border-b border-slate-100"></div>
          
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white border border-slate-100 shadow-sm text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            5.0 <span className="text-slate-400 font-medium ml-0.5">(New)</span>
          </div>'''

content = content.replace(old_card_top, new_card_top)

with open('src/app/(app)/talent/[id]/page.tsx', 'w') as f:
    f.write(content)
