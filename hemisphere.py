import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# Replace the current orbit section with a 3D Hemisphere layout
hemisphere_html = """
        <section className="relative flex justify-center py-10 h-[450px] overflow-hidden bg-[#0A0A0B] rounded-[2rem] mt-6 mx-0 shadow-2xl border border-white/10">
          
          {/* THE HEMISPHERE */}
          {/* A massive circle positioned at the very bottom, cut off by overflow-hidden to create a hemisphere/dome */}
          <div className="absolute -bottom-[300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border-[1px] border-indigo-500/30 bg-gradient-to-b from-indigo-900/40 to-transparent shadow-[inset_0_40px_100px_rgba(99,102,241,0.2)] pointer-events-none" />
          
          {/* Inner glowing core of the hemisphere */}
          <div className="absolute -bottom-[150px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-indigo-500/20 blur-[60px] pointer-events-none" />

          {/* ORBIT CONTAINER */}
          {uniqueNeighbors.length > 0 ? (
            /* The orbit center is precisely at the center of the hemisphere (bottom of the screen) */
            <div className="absolute -bottom-[300px] left-1/2 w-[600px] h-[600px] -ml-[300px] flex items-center justify-center animate-[spin_40s_linear_infinite]">
              
              {/* Additional orbit dashed line exactly matching the hemisphere border */}
              <div className="absolute w-[600px] h-[600px] rounded-full border border-indigo-500/40 border-dashed pointer-events-none" />

              {uniqueNeighbors.map((talent: any, i: number) => {
                const total = uniqueNeighbors.length;
                const angle = (360 / total) * i;
                return (
                  <Link 
                    href={`/talent/${talent.id}`} 
                    key={talent.id} 
                    className="absolute top-1/2 left-1/2 -ml-[70px] -mt-[90px] w-[140px] h-[180px] bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:scale-110 hover:bg-white/10 hover:border-indigo-400 transition-all cursor-pointer z-10 group"
                    style={{ 
                      /* translate out to the radius of the hemisphere (300px) */
                      transform: `rotate(${angle}deg) translateY(-300px) rotate(-${angle}deg)`,
                    }}
                  >
                    <div className="flex flex-col items-center justify-center w-full h-full animate-[spin_40s_linear_infinite_reverse]">
                      <div className="w-14 h-14 rounded-full overflow-hidden mb-3 bg-slate-800 border-[1.5px] border-white/20 shadow-lg flex items-center justify-center relative group-hover:scale-110 transition-transform">
                        {talent.image_url ? (
                          <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl font-bold bg-indigo-500/20 text-indigo-300">
                            {talent.owner_name?.charAt(0) || '?'}
                          </div>
                        )}
                      </div>
                      <h4 className="text-[13px] font-bold text-white line-clamp-1 w-full">{talent.owner_name}</h4>
                      <p className="text-[10px] text-indigo-300 line-clamp-1 w-full mt-0.5 font-medium">{talent.title}</p>
                      <div className="mt-auto pt-2">
                        <span className="bg-white/10 text-white/70 text-[8px] px-2 py-1 rounded-full uppercase tracking-widest border border-white/5">
                          {talent.tower || "Resident"}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
"""

pattern = re.compile(r'<section className="relative flex justify-center items-center py-32 min-h-\[600px\] overflow-hidden.*?(?=\s*\) : \(\s*<div className="flex flex-col items-center)', re.DOTALL)
content = pattern.sub(hemisphere_html.strip(), content)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

