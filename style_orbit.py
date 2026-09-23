import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# I want to change the whole layout to be a stunning dark mode orbit, 
# or just style the cards with glassmorphism and add the orbit rings.
# Since the app uses a white Apple-like theme, I will create a dedicated dark-themed hero section for the orbit.

orbit_html = """
        <section className="relative flex justify-center items-center py-32 min-h-[600px] overflow-hidden bg-slate-900 rounded-[3rem] mt-6 mx-0 shadow-2xl">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          {uniqueNeighbors.length > 0 ? (
            <div className="relative w-[300px] h-[300px] flex items-center justify-center animate-[spin_30s_linear_infinite]">
              
              {/* Central Element & Orbit Rings */}
              <div className="absolute w-[320px] h-[320px] rounded-full border border-slate-700/50 border-dashed pointer-events-none" />
              <div className="absolute w-[180px] h-[180px] rounded-full border border-slate-700/30 pointer-events-none" />
              
              <div className="absolute w-20 h-20 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)] z-0 animate-[spin_30s_linear_infinite_reverse]">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>

              {uniqueNeighbors.map((talent: any, i: number) => {
                const total = uniqueNeighbors.length;
                const angle = (360 / total) * i;
                return (
                  <Link 
                    href={`/talent/${talent.id}`} 
                    key={talent.id} 
                    className="absolute top-1/2 left-1/2 -ml-[80px] -mt-[100px] w-[160px] h-[200px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-5 flex flex-col items-center justify-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-[1.1] hover:bg-white/20 hover:border-indigo-400/50 transition-all cursor-pointer z-10 group"
                    style={{ 
                      transform: `rotate(${angle}deg) translateY(-160px) rotate(-${angle}deg)`,
                    }}
                  >
                    <div className="flex flex-col items-center justify-center w-full h-full animate-[spin_30s_linear_infinite_reverse]">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-4 bg-slate-800 border-2 border-white/20 shadow-lg flex items-center justify-center relative group-hover:scale-110 transition-transform">
                        {talent.image_url ? (
                          <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-indigo-500/20 text-indigo-300">
                            {talent.owner_name?.charAt(0) || '?'}
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white line-clamp-1 w-full">{talent.owner_name}</h4>
                      <p className="text-[11px] text-indigo-300 line-clamp-1 w-full mt-1 font-medium">{talent.title}</p>
                      <div className="mt-auto pt-3">
                        <span className="bg-white/10 text-white/70 text-[9px] px-2 py-1 rounded-full uppercase tracking-widest backdrop-blur-md border border-white/10">
                          {talent.tower || "Resident"}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
"""

pattern = re.compile(r'<section className="flex justify-center items-center py-20 min-h-\[500px\] overflow-hidden">.*?(?=\s*\) : \(\s*<div className="flex flex-col items-center)', re.DOTALL)
content = pattern.sub(orbit_html.strip(), content)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

