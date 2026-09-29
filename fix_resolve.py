import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Add resolve import
if 'import { resolveKnockKnock }' not in content:
    content = content.replace(
        'import { createKnockKnock } from "@/app/actions/knock-knocks";',
        'import { createKnockKnock, resolveKnockKnock } from "@/app/actions/knock-knocks";'
    )

# Add the handleResolve function
if 'const handleResolve = async () => {' not in content:
    handle_resolve = """
  const handleResolve = async () => {
    if (!activeUser) return;
    setIsSubmitting(true);
    try {
      const currentKnock = activeUser.knocks[storyIndex];
      if (currentKnock.id.startsWith('demo')) {
        setActiveUser(null);
        return;
      }
      await resolveKnockKnock(currentKnock.id);
      setActiveUser(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

"""
    content = content.replace('const handleCreate = async () => {', handle_resolve + 'const handleCreate = async () => {')

# Find the button and replace its onClick
old_resolve_btn = """<button onClick={() => setActiveUser(null)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[16px] py-4 rounded-2xl transition-transform active:scale-95 flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" /> Mark as Resolved
                    </button>"""

new_resolve_btn = """<button onClick={handleResolve} disabled={isSubmitting} className="w-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-600 font-bold text-[16px] py-4 rounded-2xl transition-transform active:scale-95 flex items-center justify-center gap-2">
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-600 rounded-full animate-spin" /> : <><CheckCircle className="w-5 h-5" /> Mark as Resolved</>}
                    </button>"""

if old_resolve_btn in content:
    content = content.replace(old_resolve_btn, new_resolve_btn)
    with open('src/components/ui/live-knocks.tsx', 'w') as f:
        f.write(content)
    print("Successfully wired up Mark as Resolved button.")
else:
    print("Could not find the Mark as Resolved button to replace.")

