import re

with open('src/components/home/hidden-gem.tsx', 'r') as f:
    content = f.read()

# Add a CSS shimmer overlay to the Hidden Gem card
shimmer_html = """
      {/* Premium Shimmer Sweep Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none" />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
"""

if "animate-[shimmer" not in content:
    content = content.replace('      <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 border border-white/40">',
                              shimmer_html + '\n      <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 border border-white/40">')

with open('src/components/home/hidden-gem.tsx', 'w') as f:
    f.write(content)

