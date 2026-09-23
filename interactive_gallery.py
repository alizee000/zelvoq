import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

interactive_gallery_html = """
        <section 
          className="relative w-full h-[700px] overflow-hidden bg-slate-50 rounded-[2rem] mt-6 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes revealUp {
              0% { opacity: 0; transform: translateY(40px) scale(0.9); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}} />
          
          <div className="absolute top-4 left-4 z-50 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold text-slate-500 shadow-sm border border-slate-200">
            Move cursor to explore gallery
          </div>

          {/* The exploratory canvas plane that moves against the mouse */}
          <div 
            className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
            style={{
              transform: `translate(${-mousePos.x * 60}px, ${-mousePos.y * 60}px) scale(1.1)`
            }}
          >
            {uniqueNeighbors.length > 0 ? (
              uniqueNeighbors.map((talent: any, i: number) => {
                const total = uniqueNeighbors.length;
                
                // Sunflower spiral algorithm for organic scattered placement
                const goldenRatio = (1 + Math.sqrt(5)) / 2;
                const angle = i * goldenRatio * Math.PI * 2;
                // Max radius is ~40% so it stays within the 100% canvas bounds
                const radius = Math.sqrt((i + 1) / total) * 45; 
                
                const top = 50 + radius * Math.sin(angle);
                const left = 50 + radius * Math.cos(angle);

                return (
                  <Link 
                    href={`/talent/${talent.id}`} 
                    key={talent.id} 
                    className="absolute group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/60 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-110 hover:z-50 transition-all duration-500 cursor-pointer w-[200px]"
                    style={{
                      top: `${top}%`,
                      left: `${left}%`,
                      marginLeft: '-100px', // half width
                      marginTop: '-120px',  // half height
                      animation: `revealUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.05}s both`,
                    }}
                  >
                    <div className="h-40 w-full relative bg-slate-100 overflow-hidden">
                      {talent.image_url ? (
                        <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 text-indigo-300 text-6xl font-black">
                          {talent.owner_name?.charAt(0) || '?'}
                        </div>
                      )}
                      
                      {/* Name overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                        <div className="w-full">
                          <h4 className="text-white font-bold text-lg leading-tight truncate">{talent.owner_name}</h4>
                          <p className="text-indigo-200 text-xs font-medium truncate mt-0.5">{talent.title}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                <Users className="w-12 h-12 mb-4 opacity-50" />
                <p>No talents found in this category.</p>
              </div>
            )}
          </div>
"""

# Replace the previous section
pattern = re.compile(r'<section className="py-10 min-h-\[600px\] w-full">.*?(?=\s*\) : \(\s*<div className="flex flex-col items-center)', re.DOTALL)
content = pattern.sub(interactive_gallery_html.strip(), content)

# Inject the handleMouseMove and mousePos state
component_start = 'export function DiscoverClient({ skills }: { skills: any[] }) {'
handler_code = """
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    
    // Normalize to -1 to 1
    const x = ((clientX - left) / width) * 2 - 1;
    const y = ((clientY - top) / height) * 2 - 1;
    
    setMousePos({ x, y });
  };
"""

content = content.replace('const [selectedCategory, setSelectedCategory] = useState<string>("all");', 
                          'const [selectedCategory, setSelectedCategory] = useState<string>("all");\n' + handler_code)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

