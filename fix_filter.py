import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# 1. Remove the filter icon from the search bar and match Home's exact styling
old_search = """            <input 
              type="text" 
              placeholder="Search chefs, tutors, skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-full py-4 pl-12 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button className="absolute inset-y-0 right-4 flex items-center">
              <Filter className="h-5 w-5 text-slate-400 hover:text-indigo-600 transition-colors" />
            </button>"""

new_search = """            <input 
              type="text" 
              placeholder="Search chefs, tutors, skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-full py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20"
            />"""

content = content.replace(old_search, new_search)

# 2. Make the category pills smaller and sleeker (iOS style)
old_pills = """                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`snap-start whitespace-nowrap px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all shrink-0 border
                    ${isSelected 
                      ? "bg-slate-900 border-slate-900 text-white shadow-md" 
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >"""

new_pills = """                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`snap-start whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shrink-0
                    ${isSelected 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                >"""

content = content.replace(old_pills, new_pills)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

