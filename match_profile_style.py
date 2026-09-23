import re

with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

# 1. Replace the wrapper and header
old_header = r'<div className="flex flex-col pb-32 relative min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">\s*\{\/\* Header \*\/\}\s*<div className="flex flex-col gap-6 px-6 pt-6 mb-6">\s*<section className="animate-in fade-in slide-in-from-top-4 duration-700">\s*<div className="flex items-center justify-between">\s*<div>\s*<h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">\s*Profile\s*<\/h1>\s*<p className="text-sm text-slate-500 mt-1">\s*Manage your account and listings\.\s*<\/p>\s*<\/div>\s*<\/div>\s*<\/section>\s*<\/div>\s*<div className="px-6 flex flex-col gap-6 max-w-4xl mx-auto w-full">'

new_header = """<div className="flex flex-col min-h-screen bg-slate-50/50 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Profile</h1>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Manage your account and listings.</p>
      </div>

      <div className="flex flex-col gap-8 px-6 mt-4 max-w-4xl mx-auto w-full">"""

content = re.sub(old_header, new_header, content)

# 2. Update the "My Skills & Talents" section
old_listings = r'\{\/\* My Skills & Talents \*\/\}\s*<div className="bg-white rounded-\[2rem\] p-6 shadow-sm border border-slate-100 flex flex-col gap-4">(.*?)<\/div>\s*<\/div>\s*<\/div>'

new_listings = """{/* My Skills & Talents */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">My Listings</h2>
            <Link href="/add" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full transition-colors">Add New</Link>
          </div>
          
          {myTalents && myTalents.length > 0 ? (
            <div className="flex flex-col gap-3">
              {myTalents.map((talent) => (
                <Link href={`/talent/${talent.id}`} key={talent.id} className="p-4 bg-white border border-slate-100 rounded-[1.5rem] flex justify-between items-center group hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div>
                    <div className="text-[15px] font-bold text-slate-900 mb-1">{talent.title}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{talent.category}</div>
                  </div>
                  <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 transition-all">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-white border border-slate-100 rounded-[2rem] shadow-sm">
              <Star className="w-8 h-8 text-slate-300 mb-2" />
              <div className="text-sm font-bold text-slate-900">No listings yet</div>
              <div className="text-[13px] text-slate-500 mt-1">Share a skill or item with the community.</div>
            </div>
          )}
        </section>

      </div>
    </div>"""

content = re.sub(old_listings, new_listings, content, flags=re.DOTALL)

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)

