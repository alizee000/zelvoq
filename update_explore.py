with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

zero_state_old = '''        ) : (
          /* ZERO STATE (Curated Discovery) */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-10 mt-2">'''

zero_state_new = '''        ) : (
          /* ZERO STATE (Curated Discovery) */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-10 mt-2">
            
            {/* Visual Categories */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">Browse by Vibe</h2>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setSearchQuery('Food')} className="relative h-24 rounded-3xl overflow-hidden group">
                  <Image src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80" alt="Culinary" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest uppercase text-xs">Culinary Arts</span>
                  </div>
                </button>
                <button onClick={() => setSearchQuery('Tech')} className="relative h-24 rounded-3xl overflow-hidden group">
                  <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" alt="Tech" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-indigo-900/40 group-hover:bg-indigo-900/60 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest uppercase text-xs">Technology</span>
                  </div>
                </button>
                <button onClick={() => setSearchQuery('Wellness')} className="relative h-24 rounded-3xl overflow-hidden group">
                  <Image src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80" alt="Wellness" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-emerald-900/40 group-hover:bg-emerald-900/60 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest uppercase text-xs">Wellness</span>
                  </div>
                </button>
                <button onClick={() => setSearchQuery('Creative')} className="relative h-24 rounded-3xl overflow-hidden group">
                  <Image src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80" alt="Creative" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-orange-900/40 group-hover:bg-orange-900/60 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest uppercase text-xs">Creative</span>
                  </div>
                </button>
              </div>
            </div>'''

content = content.replace(zero_state_old, zero_state_new)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)
