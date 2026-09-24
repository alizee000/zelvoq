import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Replace the single Hidden Gem Hero with a Carousel of all talents
old_hidden_gem = '''        {/* Hidden Gem Hero */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[150ms] fill-mode-both">
          <Link href={gemTalent ? `/talent/${gemTalent.id}` : "/discover"} className="block w-full bg-gradient-to-br from-[#FFF5F0] to-[#FFE8E0] rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-32 h-40">
              {/* Fallback image if we don't have a baker */}
              <img src={gemTalent?.image_url || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop"} alt={gemTalent?.title || "Baker"} className="w-full h-full object-cover object-left rounded-tl-[3rem]" />
            </div>
            <div className="relative z-10 w-[65%]">
              <div className="inline-flex items-center gap-1 text-[#D97706] bg-[#FEF3C7] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3">
                Hidden Gem
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{gemTalent ? `Meet ${gemTalent.owner_name.split(' ')[0]}` : "Meet Ayesha"}</h2>
              <p className="text-xs text-slate-700 mb-4 leading-relaxed line-clamp-3">
                {gemTalent?.description || "Creates beautiful celebration cakes and custom desserts."}
              </p>
              <div className="inline-flex items-center gap-1 bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                View Profile <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        </section>'''

new_hidden_gem = '''        {/* Hidden Gems Carousel */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[150ms] fill-mode-both">
          <CarouselWrapper>
            {allTalents?.map((talent: any) => (
              <Link key={talent.id} href={`/talent/${talent.id}`} className="block flex-none w-[85vw] sm:w-[400px] snap-center bg-gradient-to-br from-[#FFF5F0] to-[#FFE8E0] rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-32 h-40">
                  <img src={talent.image_url || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop"} alt={talent.title} className="w-full h-full object-cover object-left rounded-tl-[3rem]" />
                </div>
                <div className="relative z-10 w-[65%]">
                  <div className="inline-flex items-center gap-1 text-[#D97706] bg-[#FEF3C7] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3">
                    Hidden Gem
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">Meet {talent.owner_name.split(' ')[0]}</h2>
                  <p className="text-xs text-slate-700 mb-4 leading-relaxed line-clamp-3">
                    {talent.description}
                  </p>
                  <div className="inline-flex items-center gap-1 bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                    View Profile <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </CarouselWrapper>
        </section>'''

content = content.replace(old_hidden_gem, new_hidden_gem)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
