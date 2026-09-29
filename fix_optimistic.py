import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Add optimistic state
if 'const [optimisticKnocks, setOptimisticKnocks]' not in content:
    content = content.replace(
        'const [isSubmitting, setIsSubmitting] = useState(false);',
        'const [isSubmitting, setIsSubmitting] = useState(false);\n  const [optimisticKnocks, setOptimisticKnocks] = useState<any[]>([]);'
    )

# Update handleCreate
new_handle = """  const handleCreate = async () => {
    if (!newKnockText.trim()) return;
    
    const textToSubmit = newKnockText;
    
    // Optimistic Mobile UI: Instantly close modal and show ring
    setIsCreating(false);
    setNewKnockText("");
    
    // Add fake local knock so it appears instantly
    const fakeKnock = {
      id: 'optimistic-' + Date.now(),
      title: textToSubmit,
      owner_name: userFullName || userFirstName,
      image_url: userImageUrl || '',
      created_at: new Date().toISOString(),
      tower: 'Sending...'
    };
    setOptimisticKnocks(prev => [fakeKnock, ...prev]);

    try {
      await createKnockKnock(textToSubmit);
      // Server will revalidate and we'll get the real data, 
      // but we can clear optimistic after a short delay
      setTimeout(() => setOptimisticKnocks([]), 2000);
    } catch (e) {
      console.error(e);
      setOptimisticKnocks([]); // Revert on failure
    }
  };"""

pattern = re.compile(r'const handleCreate = async \(\) => \{[\s\S]*?\}\n  \};')
match = pattern.search(content)
if match:
    content = content[:match.start()] + new_handle + content[match.end():]

# Apply optimistic knocks to the main array
group_logic = """  // Combine real and optimistic knocks
  const allKnocks = [...optimisticKnocks, ...knocks];
  
  // 1. Group knocks by user
  const groupedKnocks = allKnocks.reduce((acc: any, knock: any) => {"""

content = content.replace(
    '  // 1. Group knocks by user\n  const groupedKnocks = knocks.reduce((acc: any, knock: any) => {',
    group_logic
)

# Remove the disabled={isSubmitting} and loader from the button
btn_old = """                <button 
                  onClick={handleCreate}
                  disabled={!newKnockText.trim() || isSubmitting}
                  className="w-16 h-16 rounded-full bg-slate-900 text-white disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center active:scale-90 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.15)] disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-slate-600 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Plus className="w-8 h-8" />
                  )}
                </button>"""

btn_new = """                <button 
                  onClick={handleCreate}
                  disabled={!newKnockText.trim()}
                  className="w-16 h-16 rounded-full bg-slate-900 text-white disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center active:scale-90 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.15)] disabled:shadow-none"
                >
                  <Plus className="w-8 h-8" />
                </button>"""

content = content.replace(btn_old, btn_new)

with open('src/components/ui/live-knocks.tsx', 'w') as f:
    f.write(content)

