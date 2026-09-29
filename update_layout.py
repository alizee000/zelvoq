with open('src/app/(app)/layout.tsx', 'r') as f:
    content = f.read()

# Replace the decorative background and main wrapper
old_bg = '''      {/* Decorative background blur elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-100/40 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-200/30 to-transparent pointer-events-none -z-10 blur-3xl rounded-full" />

      <main className="flex-1 w-full max-w-md mx-auto relative overflow-y-auto overflow-x-hidden hide-scrollbar pb-32 md:pb-0 z-0 bg-white">'''

new_bg = '''      {/* VisionOS Ambient Glow (Global Background) */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[#FAFAFA]" />
      <div className="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-orange-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <main className="flex-1 w-full max-w-md mx-auto relative overflow-y-auto overflow-x-hidden hide-scrollbar pb-32 md:pb-0 z-0 bg-transparent shadow-[0_0_50px_rgba(0,0,0,0.03)] border-x border-white/50 backdrop-blur-[2px]">'''

content = content.replace(old_bg, new_bg)

with open('src/app/(app)/layout.tsx', 'w') as f:
    f.write(content)
