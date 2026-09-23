import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# Replace the Grid wrapper with a Carousel wrapper
# Find the `<section className="mt-8 animate-in...`
carousel_wrapper = """
        {/* Carousel Content */}
        <section className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[200ms] fill-mode-both">
          {uniqueNeighbors.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 snap-x hide-scrollbar">
              {uniqueNeighbors.map((talent: any, i: number) => (
                <Link 
                  href={`/talent/${talent.id}`} 
                  key={talent.id} 
                  className="flex-none w-[42vw] md:w-[200px] bg-white border border-slate-100 rounded-3xl p-5 flex flex-col items-center text-center snap-start shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-indigo-100 transition-all cursor-pointer"
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
            </div>
"""

pattern = re.compile(r'\{\/\* Grid Content \*\/\}.*?\{uniqueNeighbors\.map\(\(talent: any.*?\)\s*=>\s*\(\s*<Link.*?<\/Link>\s*\)\)\}\s*<\/div>', re.DOTALL)
content = pattern.sub(carousel_wrapper.strip(), content)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

