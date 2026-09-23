import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

better_card = """
              {uniqueNeighbors.map((talent: any, i: number) => (
                <Link 
                  href={`/talent/${talent.id}`} 
                  key={talent.id} 
                  className="group flex flex-col bg-white rounded-[2rem] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-indigo-100 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer animate-in fade-in zoom-in-[0.95] slide-in-from-bottom-4 fill-mode-both" 
                  style={{ animationDelay: `${150 + (i * 75)}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-indigo-50 ring-4 ring-slate-50/50 shadow-sm shrink-0 group-hover:scale-110 group-hover:ring-indigo-50 transition-all duration-300">
                      {talent.image_url ? (
                        <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-black text-indigo-300">
                          {talent.owner_name?.charAt(0) || '?'}
                        </div>
                      )}
                    </div>
                    <div className="bg-slate-50 text-slate-500 text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-100 shrink-0">
                      {talent.tower || "Resident"}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-2">
                    <h4 className="text-[17px] font-black text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors tracking-tight">{talent.owner_name}</h4>
                    <p className="text-[13px] text-slate-500 line-clamp-2 mt-1 leading-relaxed font-medium">{talent.title}</p>
                  </div>
                </Link>
              ))}
"""

pattern = re.compile(r'\{uniqueNeighbors\.map\(\(talent: any.*?\)\s*=>\s*\(\s*<Link.*?<\/Link>\s*\)\)\}', re.DOTALL)
content = pattern.sub(better_card.strip(), content)


with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

