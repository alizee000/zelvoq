import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# Replace the grid with a circular orbit container
# First, find the grid section
grid_start = '<section>'
grid_end = '          ) : ('

orbit_html = """
        <section className="flex justify-center items-center py-20 min-h-[500px] overflow-hidden">
          {uniqueNeighbors.length > 0 ? (
            <div className="relative w-[300px] h-[300px] animate-[spin_20s_linear_infinite]">
              {uniqueNeighbors.map((talent: any, i: number) => {
                const total = uniqueNeighbors.length;
                const angle = (360 / total) * i;
                return (
                  <Link 
                    href={`/talent/${talent.id}`} 
                    key={talent.id} 
                    className="absolute top-1/2 left-1/2 -ml-[70px] -mt-[85px] w-[140px] bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center shadow-md hover:scale-[1.1] hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer z-10"
                    style={{ 
                      transform: `rotate(${angle}deg) translateY(-160px) rotate(-${angle}deg)`,
                    }}
                  >
                    {/* Inner wrapper counter-rotates so the card stays perfectly upright while the parent container spins */}
                    <div className="flex flex-col items-center w-full animate-[spin_20s_linear_infinite_reverse]">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center relative">
                        {talent.image_url ? (
                          <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-indigo-50 text-indigo-300">
                            {talent.owner_name?.charAt(0) || '?'}
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1 w-full">{talent.owner_name}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1 w-full mt-0.5 font-medium">{talent.title}</p>
                      <p className="text-[9px] text-slate-400 line-clamp-1 w-full mt-1 uppercase tracking-wider">{talent.tower || "Resident"}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
"""

# We need to carefully replace the old section with the new orbit html
# The old section starts with `<section>` and has `{uniqueNeighbors.length > 0 ? (`
# Let's use regex to replace it
pattern = re.compile(r'<section>.*?(?=\s*\) : \(\s*<div className="flex flex-col items-center)', re.DOTALL)
content = pattern.sub(orbit_html.strip(), content)

# Remove the custom orbitDeal style block from earlier
content = re.sub(r'<style dangerouslySetInnerHTML=\{{__html: `\n\s*@keyframes orbitDeal.*?`\}}\} />', '', content, flags=re.DOTALL)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

