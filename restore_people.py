import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# We need to replace the SECOND occurrence of the trendingItems map with the correct people map.
# Find the section starting with {/* People you should know */}
people_section_start = content.find('{/* People you should know */}')
people_section_end = content.find('</section>', people_section_start) + len('</section>')

correct_people_section = """{/* People you should know */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[300ms]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">People you should know</h2>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x hide-scrollbar">
            {people.length > 0 ? people.map((person: any) => (
              <div key={person.id} className="flex-none w-[120px] bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center snap-start shadow-sm">
                <div className="w-14 h-14 rounded-full overflow-hidden mb-3 bg-slate-100 border-2 border-white shadow-sm">
                  {person.image_url ? (
                    <img src={person.image_url} alt={person.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl bg-indigo-50">
                      👤
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1 w-full">{person.owner_name}</h3>
                <p className="text-[10px] text-slate-500 line-clamp-1 w-full mt-0.5 font-medium">{person.title}</p>
                <p className="text-[9px] text-slate-400 line-clamp-1 w-full mt-1 uppercase tracking-wider">{person.tower || "Resident"}</p>
              </div>
            )) : (
              <div className="text-sm text-slate-500 p-4">No profiles found. Encourage your neighbors to join!</div>
            )}
          </div>
        </section>"""

content = content[:people_section_start] + correct_people_section + content[people_section_end:]

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

