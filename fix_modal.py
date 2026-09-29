with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

# Locate the exact block
old_block = """          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-0 left-0 w-full z-40 p-4 md:p-6"
          >
            <div className="max-w-2xl mx-auto bg-slate-900/90 backdrop-blur-xl border-t border-x border-slate-700 rounded-t-3xl p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">"""

new_block = """          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setSelectedNode(null)}
          >
            <div 
              className="w-full max-w-[90%] md:max-w-sm bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >"""

content = content.replace(old_block, new_block)

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(content)
