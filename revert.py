import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# Remove the mouse handler state and functions
content = re.sub(r'const \[mousePos, setMousePos\] = useState\(\{ x: 0, y: 0 \}\);\s*const handleMouseMove = \(e: React\.MouseEvent<HTMLElement>\) => \{.*?\};\s*', '', content, flags=re.DOTALL)

# Revert the Grid Content section
plain_grid = """
        {/* Grid Content */}
        <section className="mt-8">
          {uniqueNeighbors.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uniqueNeighbors.map((talent: any) => (
                <Link 
                  href={`/talent/${talent.id}`} 
                  key={talent.id} 
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="h-32 w-full relative bg-slate-100">
                    {talent.image_url ? (
                      <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-4xl font-black bg-indigo-50 text-indigo-300">
                        {talent.owner_name?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex flex-col relative bg-white">
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{talent.owner_name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{talent.title}</p>
                    <div className="mt-3">
                      <span className="bg-slate-50 text-slate-500 text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wider border border-slate-100">
                        {talent.tower || "Resident"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">No results</h3>
              <p className="text-sm text-slate-500">Try adjusting your filters.</p>
            </div>
          )}
        </section>
"""

# Replace the gallery section
pattern = re.compile(r'\{\/\* Grid Content \*\/\}.*?(?=\s*<\/div>\s*<style dangerouslySetInnerHTML)', re.DOTALL)
content = pattern.sub(plain_grid.strip(), content)

# Remove the orphaned <style> blocks at the bottom
content = re.sub(r'<style dangerouslySetInnerHTML=\{\{__html: `\s*@keyframes orbitDeal.*?\`\}\}\s*\/>\s*', '', content, flags=re.DOTALL)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

