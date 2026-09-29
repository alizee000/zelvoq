import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Replace the existing creation modal with a native full-screen Instagram-style camera/text takeover
old_modal = """
      {/* Inline Creation Modal */}
      {isMounted && createPortal(
        <AnimatePresence>
          {isCreating && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/95 backdrop-blur-3xl p-4 sm:p-6"
              onClick={() => setIsCreating(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 40, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden relative shadow-2xl flex flex-col h-[75vh] sm:h-auto sm:min-h-[550px]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="absolute top-0 left-0 w-full pt-6 pb-4 px-6 z-10 flex items-center justify-between border-b border-slate-100 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center text-amber-600">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-[17px] leading-tight">New Knock</h3>
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Ask the community</p>
                    </div>
                  </div>
                  <button onClick={() => setIsCreating(false)} className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Input Area */}
                <div className="flex-1 flex flex-col p-6 pt-24 bg-gradient-to-b from-white to-slate-50">
                  <textarea 
                    autoFocus
                    value={newKnockText}
                    onChange={(e) => setNewKnockText(e.target.value)}
                    placeholder="e.g., Does anyone have a ladder I can borrow for 20 mins?"
                    className="flex-1 w-full bg-transparent text-slate-900 text-3xl sm:text-4xl font-black placeholder:text-slate-300 focus:outline-none resize-none leading-tight"
                  />
                </div>

                {/* Bottom Action */}
                <div className="p-6 bg-white border-t border-slate-100">
                  <p className="text-center text-[12px] font-bold text-slate-400 mb-4 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> Disappears in 24 hours
                  </p>
                  <button 
                    onClick={handleCreate}
                    disabled={!newKnockText.trim() || isSubmitting}
                    className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-[17px] py-4 rounded-2xl transition-all active:scale-[0.98] shadow-[0_8px_30px_rgba(245,158,11,0.25)] disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Post to Neighborhood"
                    )}
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
"""

new_modal = """
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

# The code might have the exact block. Since whitespace is tricky, we'll use regex.
pattern = re.compile(r'\{\/\* Inline Creation Modal \*\/\}[\s\S]*?<\/AnimatePresence>')
match = pattern.search(content)

if match:
    content = content[:match.start()] + new_modal.strip() + content[match.end():]
    with open('src/components/ui/live-knocks.tsx', 'w') as f:
        f.write(content)
    print("Successfully replaced modal.")
else:
    print("Could not find the modal pattern to replace.")
