import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Replace the two nested motion.divs for the Story Viewer with a single native edge-to-edge takeover
old_viewer_pattern = re.compile(r'\{\/\* Story Modal View using React Portal \*\/\}[\s\S]*?\{\/\* Inline Creation Modal \(Native iOS')

new_viewer = """{/* Story Modal View (Native Full-Screen Takeover) */}
      {isMounted && createPortal(
        <AnimatePresence>
          {activeUser && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, borderRadius: "2rem" }}
              animate={{ scale: 1, opacity: 1, borderRadius: "0rem" }}
              exit={{ scale: 0.9, opacity: 0, borderRadius: "2rem" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 inset-x-0 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 w-full sm:max-w-md z-[100] flex flex-col bg-white overflow-hidden shadow-2xl border-x border-white/50"
            >
                {/* Tap Zones for Next/Prev */}
                <div className="absolute inset-0 z-20 flex">
                   <div className="w-1/3 h-full" onClick={handlePrevStory} />
                   <div className="w-2/3 h-full" onClick={handleNextStory} />
                </div>

                {/* Segmented Progress Bars */}
                <div className="absolute top-0 left-0 right-0 pt-4 px-4 z-40 flex gap-1.5 bg-gradient-to-b from-black/40 to-transparent pb-8 pointer-events-none">
                  {activeUser.knocks.map((_: any, i: number) => (
                    <div key={i} className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden backdrop-blur-md">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-75 ease-linear" 
                        style={{ width: i < storyIndex ? '100%' : i === storyIndex ? `${progress}%` : '0%' }} 
                      />
                    </div>
                  ))}
                </div>

                {/* Story Header */}
                <div className="absolute top-0 left-0 w-full pt-10 pb-4 px-5 z-30 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-md bg-slate-100">
                      {activeUser.image_url ? (
                        <img src={activeUser.image_url} alt={activeUser.owner_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm bg-gradient-to-br from-amber-100 to-orange-100">👋</div>
                      )}
                    </div>
                    <div className="flex flex-col text-white drop-shadow-md">
                      <span className="font-bold text-[15px] leading-tight">{activeUser.owner_name}</span>
                      <span className="text-[11px] font-medium text-white/90">{formatTimeAgo(activeUser.knocks[storyIndex].created_at || new Date().toISOString())}</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveUser(null)} className="pointer-events-auto w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors backdrop-blur-md active:scale-95">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Story Content Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 z-0" />
                
                {/* Story Text Content */}
                <div className="relative z-10 flex-1 flex items-center justify-center p-8 text-center mt-16 pointer-events-none">
                  <h3 className="text-4xl font-black text-white leading-tight drop-shadow-md">
                    "{activeUser.knocks[storyIndex].title}"
                  </h3>
                </div>

                {/* Bottom Action Bar */}
                <div className="relative z-30 bg-white p-6 pb-10 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-widest border border-slate-100">
                       <Clock className="w-3.5 h-3.5" /> 24h
                     </div>
                     {activeUser.tower && (
                       <div className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-widest border border-slate-100">
                         <MapPin className="w-3.5 h-3.5" /> {activeUser.tower}
                       </div>
                     )}
                  </div>
                  
                  <div className="w-full relative z-40">
                  {activeUser.owner_name === userFullName ? (
                    <button onClick={handleResolve} disabled={isSubmitting} className="w-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-600 font-bold text-[17px] py-4.5 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm">
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-600 rounded-full animate-spin" /> : <><CheckCircle className="w-5 h-5" /> Mark as Resolved</>}
                    </button>
                  ) : (
                    <button onClick={() => setActiveUser(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[17px] py-4.5 rounded-2xl transition-all active:scale-[0.98] shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" /> I can help!
                    </button>
                  )}
                  </div>
                </div>

            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Inline Creation Modal (Native iOS"""

match = old_viewer_pattern.search(content)
if match:
    content = content[:match.start()] + new_viewer + content[match.end() - len("{/* Inline Creation Modal (Native iOS"):]
    with open('src/components/ui/live-knocks.tsx', 'w') as f:
        f.write(content)
    print("Successfully replaced Story Viewer modal.")
else:
    print("Could not find Story Viewer modal pattern.")

