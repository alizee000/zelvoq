import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

professional_card = """
              {uniqueNeighbors.map((talent: any, i: number) => (
                <Link 
                  href={`/talent/${talent.id}`} 
                  key={talent.id} 
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-4 fill-mode-both" 
                  style={{ animationDelay: `${150 + (i * 75)}ms` }}
                >
                  {/* Premium Cover Area */}
                  <div className="h-20 w-full relative bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-100">
                    {/* Optional pattern or solid color */}
                  </div>
                  
                  <div className="px-4 pb-5 relative flex flex-col grow">
                    {/* Overlapping Avatar */}
                    <div className="w-14 h-14 rounded-full border-[3px] border-white bg-white shadow-sm absolute -top-7 left-4 overflow-hidden z-10">
                      {talent.image_url ? (
                        <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-slate-400 bg-slate-50">
                          {talent.owner_name?.charAt(0) || '?'}
                        </div>
                      )}
                    </div>
                    
                    {/* Tower Badge aligned right */}
                    <div className="flex justify-end mt-2 mb-3 h-5">
                      <span className="bg-slate-50 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-slate-200">
                        {talent.tower || "Resident"}
                      </span>
                    </div>
                    
                    {/* Full Text Content */}
                    <h4 className="text-[15px] font-bold text-slate-900 leading-tight">{talent.owner_name}</h4>
                    <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed flex-grow">{talent.title}</p>
                  </div>
                </Link>
              ))}
"""

pattern = re.compile(r'\{uniqueNeighbors\.map\(\(talent: any.*?\)\s*=>\s*\(\s*<Link.*?<\/Link>\s*\)\)\}', re.DOTALL)
content = pattern.sub(professional_card.strip(), content)

# I should also revert `grid-cols-2` to `grid-cols-2 md:grid-cols-3` to be safe, but they said "two cards in a row", which means `grid-cols-2` on mobile is what they requested.
# I'll leave the grid classes alone (they are currently grid-cols-2 md:grid-cols-3 lg:grid-cols-4).

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

