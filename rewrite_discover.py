import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

new_ui = """
  return (
    <div className="flex flex-col relative bg-slate-950 min-h-screen pb-32">
      
      {/* Page Header */}
      <div className="pt-10 pb-6 px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[36px] leading-[1.1] tracking-tight text-white">
            Discover<br/>
            <span className="font-black text-white">local talents</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative group mb-8">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <Input 
            type="text" 
            placeholder="Search chefs, tutors, skills..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 pr-14 py-7 text-base font-medium bg-white/10 border-transparent rounded-full shadow-none text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white/30 transition-all"
          />
          <button className="absolute inset-y-0 right-5 flex items-center">
            <Filter className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
          </button>
        </div>

        {/* Categories (Apple style pills) */}
        <div className="flex overflow-x-auto gap-3 -mx-6 px-6 hide-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-[14px] font-bold tracking-wide transition-all shrink-0 border
                  ${isSelected 
                    ? "bg-white border-white text-slate-950 shadow-md" 
                    : "bg-transparent border-slate-800 text-slate-400 hover:bg-white/10 hover:border-white/20"
                  }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid Content */}
      <div className="px-6 pt-4">
        {uniqueNeighbors.length > 0 ? (
          <div className="flex flex-col gap-8">
            {uniqueNeighbors.map((talent: any) => (
              <Link href={`/talent/${talent.id}`} key={talent.id} className="group relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-900 block">
                {/* Edge-to-edge Image Container */}
                {talent.image_url ? (
                  <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-8xl font-black uppercase bg-slate-800 text-slate-700 transition-transform duration-700 group-hover:scale-105">
                    {talent.owner_name?.charAt(0) || '?'}
                  </div>
                )}
                
                {/* Floating Rating Badge */}
                <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span className="text-[11px] font-bold text-white tracking-widest uppercase">98% Matched</span>
                </div>
                
                {/* Frosted Floating Card at bottom */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xl p-5 rounded-[1.5rem] shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 leading-tight truncate flex items-center gap-2">
                        {talent.owner_name}
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{talent.category}</span>
                      </h4>
                      <div className="flex items-center gap-1 mt-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold uppercase tracking-widest">{talent.tower || "DSR Heights"}</span>
                      </div>
                    </div>
                    <div className="bg-slate-100 px-3 py-1.5 rounded-full">
                      <span className="text-sm font-black text-slate-900">Free</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Star className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-bold">120 Reviews</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-xs font-bold">Level 3</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No results</h3>
            <p className="text-sm text-slate-400">Try adjusting your filters.</p>
          </div>
        )}
      </div>

    </div>
  );
}
"""

content = re.sub(r'  return \([\s\S]*\}\;', new_ui, content)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)
