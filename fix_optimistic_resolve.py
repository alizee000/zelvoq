import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Add hidden state for optimistic deletes
if 'const [hiddenKnocks, setHiddenKnocks]' not in content:
    content = content.replace(
        'const [optimisticKnocks, setOptimisticKnocks] = useState<any[]>([]);',
        'const [optimisticKnocks, setOptimisticKnocks] = useState<any[]>([]);\n  const [hiddenKnocks, setHiddenKnocks] = useState<Set<string>>(new Set());'
    )

new_resolve = """  const handleResolve = async () => {
    if (!activeUser) return;
    
    const currentKnock = activeUser.knocks[storyIndex];
    
    // Optimistic Mobile UI: Instantly close and hide
    setHiddenKnocks(prev => new Set(prev).add(currentKnock.id));
    setActiveUser(null);
    
    try {
      await resolveKnockKnock(currentKnock.id);
    } catch (e) {
      console.error(e);
      // Revert on failure
      setHiddenKnocks(prev => {
        const next = new Set(prev);
        next.delete(currentKnock.id);
        return next;
      });
    }
  };"""

pattern = re.compile(r'const handleResolve = async \(\) => \{[\s\S]*?\}\n  \};')
match = pattern.search(content)
if match:
    content = content[:match.start()] + new_resolve + content[match.end():]

group_logic = """  // Combine real and optimistic knocks
  const allKnocks = [...optimisticKnocks, ...knocks].filter(k => !hiddenKnocks.has(k.id));"""

content = content.replace(
    '  // Combine real and optimistic knocks\n  const allKnocks = [...optimisticKnocks, ...knocks];',
    group_logic
)

btn_old = """                    <button onClick={handleResolve} disabled={isSubmitting} className="w-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-600 font-bold text-[17px] py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm">
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-600 rounded-full animate-spin" /> : <><CheckCircle className="w-5 h-5" /> Mark as Resolved</>}
                    </button>"""

btn_new = """                    <button onClick={handleResolve} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[17px] py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm">
                      <CheckCircle className="w-5 h-5" /> Mark as Resolved
                    </button>"""

content = content.replace(btn_old, btn_new)

with open('src/components/ui/live-knocks.tsx', 'w') as f:
    f.write(content)
