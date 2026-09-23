import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

home_page_card = """
              {uniqueNeighbors.map((talent: any, i: number) => (
                <Link 
                  href={`/talent/${talent.id}`} 
                  key={talent.id} 
                  className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col items-center text-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-indigo-100 transition-all cursor-pointer animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-4 fill-mode-both"
                  style={{ animationDelay: `${150 + (i * 75)}ms` }}
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 bg-slate-100 border-4 border-white shadow-sm shrink-0">
                    {talent.image_url ? (
                      <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl bg-indigo-50">
                        👤
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 w-full leading-tight">{talent.owner_name}</h3>
                  <p className="text-[13px] text-slate-500 w-full mt-1.5 font-medium leading-relaxed">{talent.title}</p>
                  <div className="mt-auto pt-3 w-full">
                    <p className="text-[10px] text-slate-400 w-full uppercase tracking-wider font-bold">{talent.tower || "Resident"}</p>
                  </div>
                </Link>
              ))}
"""

pattern = re.compile(r'\{uniqueNeighbors\.map\(\(talent: any.*?\)\s*=>\s*\(\s*<Link.*?<\/Link>\s*\)\)\}', re.DOTALL)
content = pattern.sub(home_page_card.strip(), content)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

