import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add Zap icon to imports if missing
if 'Zap' not in content:
    content = content.replace('ArrowRight, MapPin, Calendar, Star, Users', 'ArrowRight, MapPin, Calendar, Star, Users, Zap')

injection = """
      {/* NEW: The Hive Premium Banner */}
      <MotionSection delay={0.15}>
        <div className="px-6 mb-8">
          <Link href="/hive" className="block w-full relative overflow-hidden rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(99,102,241,0.2)] hover:shadow-[0_20px_40px_rgb(99,102,241,0.3)] transition-all duration-500 group bg-slate-900 border border-slate-800 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80')] opacity-30 bg-cover bg-center mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-800/90" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
            
            <div className="relative z-10 flex flex-row items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-md border border-white/10 shadow-sm">
                  <Zap className="w-3 h-3 text-yellow-300" /> Interactive Feature
                </div>
                <h2 className="text-3xl font-black text-white leading-none mb-1 tracking-tight">
                  The Hive
                </h2>
                <p className="text-xs font-medium text-indigo-100 max-w-[200px]">
                  Explore your neighborhood in a stunning 3D Node Map.
                </p>
              </div>
              
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:bg-slate-50 transition-colors duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </MotionSection>

      {/* Hidden Gems: Editorial Carousel */}
"""

content = content.replace('      {/* Hidden Gems: Editorial Carousel */}', injection.strip() + '\n\n      {/* Hidden Gems: Editorial Carousel */}')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
