with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add Lucide imports
content = content.replace(
    'import { Sparkles, ArrowRight, MapPin } from "lucide-react";',
    'import { Sparkles, ArrowRight, MapPin, Calendar, Star, Users } from "lucide-react";'
)

happening_this_week = """
      {/* Happening This Week */}
      <MotionSection delay={0.25}>
        <div className="px-6 mt-8 mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Happening this week</h2>
        </div>
        
        <CarouselWrapper autoScrollInterval={0} className="pl-6 pr-6 pb-4 -mt-2">
          {/* Event 1 */}
          <Link href="/events" className="block flex-none w-[85vw] sm:w-[320px] snap-center bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">Saturday, 7 AM</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">Weekend Badminton</h3>
            <p className="text-sm text-slate-500 font-medium mb-4">Tower A Sports Club</p>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" className="w-full h-full object-cover" /></div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" className="w-full h-full object-cover" /></div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" className="w-full h-full object-cover" /></div>
              </div>
              <span className="text-xs font-bold text-slate-500">+12 neighbors joining</span>
            </div>
          </Link>

          {/* Event 2 */}
          <Link href="/events" className="block flex-none w-[85vw] sm:w-[320px] snap-center bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Sunday, 4 PM</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">Kids Coding Workshop</h3>
            <p className="text-sm text-slate-500 font-medium mb-4">Clubhouse Room B</p>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" className="w-full h-full object-cover" /></div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80" className="w-full h-full object-cover" /></div>
              </div>
              <span className="text-xs font-bold text-slate-500">+8 kids registered</span>
            </div>
          </Link>
        </CarouselWrapper>
      </MotionSection>
"""

nominate_banner = """
      {/* Nominate a Hidden Gem (Viral Loop) */}
      <MotionSection delay={0.35}>
        <div className="px-6 mt-8 mb-4">
          <div className="w-full bg-slate-900 rounded-[2rem] p-8 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Know someone amazing?</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-4">
                  Did your neighbor make incredible biryani? Are they a tech wizard? Nominate them.
                </p>
                <button className="bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold px-6 py-3 rounded-xl transition-colors active:scale-95 shadow-sm inline-flex items-center gap-2">
                  Nominate a Neighbor <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
"""

content = content.replace(
    '{/* Community Discoveries List */}',
    happening_this_week + '\n      {/* Community Discoveries List */}'
)

content = content.replace(
    '      {/* Magic Screen Entry */}',
    nominate_banner + '\n      {/* Magic Screen Entry */}'
)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
