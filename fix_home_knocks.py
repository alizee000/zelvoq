import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Let's find the Search Bar block
search_bar = """        {/* Search Bar */}
        <div className="px-6 mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search neighborhood..." 
              className="w-full bg-white pl-11 pr-4 py-3.5 rounded-2xl text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 border border-slate-200 shadow-sm transition-all"
            />
          </div>
        </div>"""

live_knocks_ui = """
        {/* Live Knocks Status Row */}
        <LiveKnocks knocks={liveKnocks} userFirstName={firstName} userFullName={fullName} userImageUrl={user?.imageUrl} />
"""

content = content.replace(search_bar, search_bar + live_knocks_ui)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
