with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

hive_button = """
 {/* Experimental Hive Link */}
 <div className="mt-8 mb-4 px-6 flex justify-center">
   <Link href="/hive" className="inline-flex items-center gap-2 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-6 py-3 rounded-full transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)]">
     <Sparkles className="w-4 h-4" />
     Enter Experimental 3D Hive Mode
   </Link>
 </div>

 </div>
"""

content = content.replace('\n </div>\n </div>\n );\n}', hive_button + ' </div>\n );\n}')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
