import re

with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

# Add Logo import
if 'import { Logo }' not in content:
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { Logo } from "@/components/shared/logo";')

# Replace the Zap icon in the Root Node with Logo, and update label styling
old_root = '''<div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-indigo-600 border-[4px] border-white shadow-[0_15px_40px_rgba(99,102,241,0.4)] z-20 overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-500" />
                        <Zap className="w-10 h-10 text-white relative z-10" />
                      </div>
                      <div className="mt-3 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
                        {node.label}'''

new_root = '''<div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 border-[4px] border-white shadow-[0_15px_40px_rgba(99,102,241,0.4)] z-20 overflow-hidden cursor-pointer">
                        <Logo className="w-12 h-12 text-white relative z-10" />
                      </div>
                      <div className="mt-3 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] font-black text-slate-900 text-sm tracking-tight flex items-center gap-2">
                        MyKoodu'''

content = content.replace(old_root, new_root)

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(content)
