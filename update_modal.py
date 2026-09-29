import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Add createPortal import
if 'createPortal' not in content:
    content = content.replace('import { useState, useEffect } from "react";', 'import { useState, useEffect } from "react";\nimport { createPortal } from "react-dom";')

# Wrap AnimatePresence with createPortal logic
# But we can't easily do createPortal directly inside the return if we don't have a check for document.body.
# We'll use a mounted state.

modal_code = """      {/* Story Modal View */}
      {isMounted && createPortal(
        <AnimatePresence>
          {activeKnock && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-xl p-4 sm:p-6"
              onClick={() => setActiveKnock(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-md bg-white rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col h-[70vh] sm:h-auto sm:min-h-[500px]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Instagram-style Progress Bar */}
                <div className="absolute top-0 left-0 right-0 p-3 z-20 flex gap-1 bg-gradient-to-b from-black/50 to-transparent">
                  <div className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden backdrop-blur-sm">
                    <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Story Header */}
                <div className="absolute top-0 left-0 w-full pt-6 pb-4 px-5 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100">
                      {activeKnock.image_url ? (
                        <img src={activeKnock.image_url} alt={activeKnock.owner_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm bg-gradient-to-br from-amber-100 to-orange-100">👋</div>
                      )}
                    </div>
                    <div className="flex flex-col text-white drop-shadow-md">
                      <span className="font-bold text-[15px] leading-tight">{activeKnock.owner_name}</span>
                      <span className="text-[11px] font-medium opacity-90">{formatTimeAgo(activeKnock.created_at || new Date().toISOString())}</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveKnock(null)} className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors backdrop-blur-md">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Story Content Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600" />
                
                {/* Story Text Content */}
                <div className="relative z-0 flex-1 flex items-center justify-center p-8 text-center mt-12">
                  <h3 className="text-3xl font-black text-white leading-tight drop-shadow-sm">
                    "{activeKnock.title}"
                  </h3>
                </div>

                {/* Bottom Action Bar */}
                <div className="relative z-10 bg-white p-5 pb-8 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-2 mb-4 justify-center">
                     <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                       <Clock className="w-3.5 h-3.5" /> Expires in 24h
                     </div>
                     {activeKnock.tower && (
                       <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                         <MapPin className="w-3.5 h-3.5" /> {activeKnock.tower}
                       </div>
                     )}
                  </div>
                  
                  <button onClick={() => { setActiveKnock(null); }} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[16px] py-4 rounded-2xl transition-transform active:scale-95 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> I can help!
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}"""

# We need to extract the exact old string to replace.
# It starts from {/* Story Modal View */} to </AnimatePresence>
import re
pattern = re.compile(r'\{\/\* Story Modal View \*\/\}[\s\S]*?<\/AnimatePresence>')
match = pattern.search(content)

if match:
    # Also add const [isMounted, setIsMounted] = useState(false); if it doesn't exist.
    # Actually, we need isMounted because document.body is not available during SSR.
    if 'const [isMounted, setIsMounted] = useState(false);' not in content:
        content = content.replace('const [progress, setProgress] = useState(0);', 'const [progress, setProgress] = useState(0);\n  const [isMounted, setIsMounted] = useState(false);\n  useEffect(() => setIsMounted(true), []);')
    
    content = content[:match.start()] + modal_code + content[match.end():]
    
    with open('src/components/ui/live-knocks.tsx', 'w') as f:
        f.write(content)
    print("Successfully wrapped modal in createPortal.")
else:
    print("Could not find the modal pattern to replace.")
