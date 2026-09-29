import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Replace the vibrant dark gradient takeover with the pristine VisionOS Light Mode glassmorphic takeover
old_modal = """
      {/* Inline Creation Modal (Native iOS Full-Screen Takeover) */}
      {isMounted && createPortal(
        <AnimatePresence>
          {isCreating && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[120] flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500"
            >
              {/* Top Controls */}
              <div className="w-full pt-12 pb-4 px-6 flex items-center justify-between">
                <button onClick={() => setIsCreating(false)} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center active:scale-95 transition-transform">
                  <X className="w-6 h-6" />
                </button>
                <div className="px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-md flex items-center gap-2 text-white">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">24H Knock</span>
                </div>
              </div>

              {/* Centered Massive Input */}
              <div className="flex-1 flex items-center justify-center px-8 relative">
                <textarea 
                  autoFocus
                  value={newKnockText}
                  onChange={(e) => setNewKnockText(e.target.value)}
                  placeholder="Type your request..."
                  className="w-full bg-transparent text-white text-center text-4xl font-black placeholder:text-white/40 focus:outline-none resize-none leading-tight"
                  rows={4}
                />
              </div>

              {/* Bottom Action Bar */}
              <div className="p-8 pb-12 flex justify-end">
                <button 
                  onClick={handleCreate}
                  disabled={!newKnockText.trim() || isSubmitting}
                  className="w-16 h-16 rounded-full bg-white text-indigo-600 disabled:opacity-50 flex items-center justify-center active:scale-90 transition-transform shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                  ) : (
                    <Plus className="w-8 h-8" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
"""

new_modal = """
      {/* Inline Creation Modal (Native iOS Full-Screen Takeover - Light Mode) */}
      {isMounted && createPortal(
        <AnimatePresence>
          {isCreating && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[120] flex flex-col bg-white/95 backdrop-blur-2xl"
            >
              {/* Top Controls */}
              <div className="w-full pt-12 pb-4 px-6 flex items-center justify-between">
                <button onClick={() => setIsCreating(false)} className="w-10 h-10 rounded-full bg-slate-100/80 backdrop-blur-md text-slate-500 hover:bg-slate-200 flex items-center justify-center active:scale-95 transition-all shadow-sm">
                  <X className="w-6 h-6" />
                </button>
                <div className="px-4 py-1.5 rounded-full bg-amber-50/80 border border-amber-100 backdrop-blur-md flex items-center gap-2 text-amber-600 shadow-sm">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">24H Knock</span>
                </div>
              </div>

              {/* Centered Massive Input */}
              <div className="flex-1 flex items-center justify-center px-8 relative">
                <textarea 
                  autoFocus
                  value={newKnockText}
                  onChange={(e) => setNewKnockText(e.target.value)}
                  placeholder="What do you need?"
                  className="w-full bg-transparent text-slate-900 text-center text-4xl sm:text-5xl font-black placeholder:text-slate-300 focus:outline-none resize-none leading-tight"
                  rows={4}
                />
              </div>

              {/* Bottom Action Bar */}
              <div className="p-8 pb-12 flex justify-end">
                <button 
                  onClick={handleCreate}
                  disabled={!newKnockText.trim() || isSubmitting}
                  className="w-16 h-16 rounded-full bg-slate-900 text-white disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center active:scale-90 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.15)] disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-slate-600 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Plus className="w-8 h-8" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
"""

# Use regex to find and replace
pattern = re.compile(r'\{\/\* Inline Creation Modal \(Native iOS Full-Screen Takeover\) \*\/\}[\s\S]*?<\/AnimatePresence>')
match = pattern.search(content)

if match:
    content = content[:match.start()] + new_modal.strip() + content[match.end():]
    with open('src/components/ui/live-knocks.tsx', 'w') as f:
        f.write(content)
    print("Successfully replaced modal with consistent Light Mode styling.")
else:
    print("Could not find the modal pattern to replace.")
