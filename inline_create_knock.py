import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Replace the Next.js Link with a button that triggers a creation modal state
if 'const [isMounted, setIsMounted] = useState(false);' in content:
    content = content.replace(
        'const [isMounted, setIsMounted] = useState(false);',
        'const [isMounted, setIsMounted] = useState(false);\n  const [isCreating, setIsCreating] = useState(false);\n  const [newKnockText, setNewKnockText] = useState("");\n  const [isSubmitting, setIsSubmitting] = useState(false);'
    )

# Add the server action import
if 'import { createKnockKnock }' not in content:
    content = content.replace('import { createPortal } from "react-dom";', 'import { createPortal } from "react-dom";\nimport { createKnockKnock } from "@/app/actions/knock-knocks";')

# Add the handleCreate function
if 'const handleNextStory = () => {' in content:
    handle_create = """
  const handleCreate = async () => {
    if (!newKnockText.trim()) return;
    setIsSubmitting(true);
    try {
      await createKnockKnock(newKnockText);
      setIsCreating(false);
      setNewKnockText("");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

"""
    content = content.replace('const handleNextStory = () => {', handle_create + 'const handleNextStory = () => {')


# Replace the Link with a Button
old_link = """<Link href="/add" className="flex flex-col items-center gap-2 snap-start shrink-0 group">"""
new_btn = """<button onClick={() => setIsCreating(true)} className="flex flex-col items-center gap-2 snap-start shrink-0 group">"""
content = content.replace(old_link, new_btn)
content = content.replace('</Link>', '</button>', 1)


# Inject the Creation Modal right after the viewing modal AnimatePresence
creation_modal = """
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
        </AnimatePresence>,
        document.body
      )}
"""
content = content.replace('        document.body\n      )}', '        document.body\n      )}\n' + creation_modal)


with open('src/components/ui/live-knocks.tsx', 'w') as f:
    f.write(content)

