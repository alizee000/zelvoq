import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# I will replace the entire <section> with the exact design from the image
# Background: light gray
# Hemisphere: dark gray arc
# Cards: Tall rectangles, full bleed image, tilted along the arc, heavy drop shadow

design_html = """
        <section className="relative flex justify-center py-10 h-[600px] overflow-hidden bg-[#e5e5e5] rounded-[2rem] mt-6 mx-0 shadow-inner">
          
          {/* THE HEMISPHERE (Dark gray arc at the bottom) */}
          <div className="absolute -bottom-[800px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-[#8a8a8a] shadow-[inset_0_20px_40px_rgba(0,0,0,0.1)] pointer-events-none" />
          
          {/* ORBIT WHEEL */}
          {uniqueNeighbors.length > 0 ? (
            /* The wheel center is at the center of the hemisphere (-bottom-[800px] translates to top edge being 200px from bottom) */
            <div className="absolute -bottom-[800px] left-1/2 w-[1000px] h-[1000px] -ml-[500px] flex items-center justify-center animate-[spin_40s_linear_infinite]">
              
              {uniqueNeighbors.map((talent: any, i: number) => {
                const total = uniqueNeighbors.length;
                // Distribute cards around the wheel. 
                // If there are many cards, they will go all the way around.
                const angle = (360 / total) * i;
                return (
                  <div
                    key={talent.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      /* First rotate to the correct angle on the wheel, then push it out to the edge (radius 500px) */
                      /* Also adjust the rotation so they stand up along the tangent! */
                      transform: `rotate(${angle}deg) translateY(-500px)`,
                      transformOrigin: "center center"
                    }}
                  >
                    {/* The Card - perfectly matches the image proportions (tall, rounded corners, drop shadow) */}
                    {/* -ml and -mt are used to center the card exactly on its translation point */}
                    <Link 
                      href={`/talent/${talent.id}`} 
                      className="block -ml-[120px] -mt-[170px] w-[240px] h-[340px] bg-black rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-all cursor-pointer z-10 relative group"
                    >
                      {talent.image_url ? (
                        <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-4xl font-black bg-gradient-to-b from-gray-700 to-gray-900 text-white uppercase tracking-tighter leading-none p-4 text-center break-words">
                          {talent.owner_name}
                        </div>
                      )}
                      
                      {/* Name overlay at the bottom, sleek design */}
                      {talent.image_url && (
                        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <h4 className="text-lg font-bold text-white uppercase tracking-wider">{talent.owner_name}</h4>
                          <p className="text-xs text-gray-300 font-medium uppercase tracking-widest">{talent.title}</p>
                        </div>
                      )}
                    </Link>
                  </div>
                )
              })}
            </div>
"""

pattern = re.compile(r'<section className="relative flex justify-center py-10 h-\[450px\] overflow-hidden.*?(?=\s*\) : \(\s*<div className="flex flex-col items-center)', re.DOTALL)
content = pattern.sub(design_html.strip(), content)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

