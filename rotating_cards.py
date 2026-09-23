import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# I will replace the entire <section onMouseMove={handleMouseMove}...> with the new Rotating Cards grid layout.

rotating_cards_html = """
        <section className="py-10 min-h-[600px] w-full">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes flipIn {
              0% { 
                opacity: 0; 
                transform: perspective(1200px) rotateY(-90deg) scale(0.9); 
              }
              100% { 
                opacity: 1; 
                transform: perspective(1200px) rotateY(0deg) scale(1); 
              }
            }
          `}} />
          
          {uniqueNeighbors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {uniqueNeighbors.map((talent: any, i: number) => {
                return (
                  <Link 
                    href={`/talent/${talent.id}`} 
                    key={talent.id} 
                    className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                    style={{
                      animation: `flipIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.15}s both`,
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Top half: Cover Image or Gradient */}
                    <div className="h-32 w-full relative bg-gradient-to-br from-indigo-50 to-indigo-100 overflow-hidden">
                      {talent.image_url ? (
                        <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-indigo-200" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    
                    {/* Bottom half: Info */}
                    <div className="p-6 flex flex-col items-center text-center bg-white relative">
                      {/* Avatar overlaps the cover */}
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-white border-4 border-white shadow-md absolute -top-8 flex items-center justify-center">
                         {talent.image_url ? (
                          <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl font-bold bg-indigo-50 text-indigo-400">
                            {talent.owner_name?.charAt(0) || '?'}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="text-lg font-bold text-slate-900">{talent.owner_name}</h4>
                        <p className="text-sm text-slate-500 mt-1">{talent.title}</p>
                        <div className="mt-4">
                          <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
                            {talent.tower || "Resident"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
"""

# Replace the previous section
pattern = re.compile(r'<section onMouseMove=\{handleMouseMove\}.*?(?=\s*\) : \(\s*<div className="flex flex-col items-center)', re.DOTALL)
content = pattern.sub(rotating_cards_html.strip(), content)

# Remove the handleMouseMove and wheelRotation state
content = re.sub(r'const \[wheelRotation, setWheelRotation\] = useState\(0\);\s*const handleMouseMove = \(e: React\.MouseEvent<HTMLElement>\) => \{.*?\};\s*', '', content, flags=re.DOTALL)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

