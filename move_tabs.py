import re

with open('src/app/(app)/market/page.tsx', 'r') as f:
    content = f.read()

# Fix transform positions
old_transform = "`translateX(${activeTab === 'deals' ? '0%' : activeTab === 'coown' ? '100%' : activeTab === 'borrow' ? '200%' : '300%'})`"
new_transform = "`translateX(${activeTab === 'deals' ? '0%' : activeTab === 'borrow' ? '100%' : activeTab === 'spaces' ? '200%' : '300%'})`"
content = content.replace(old_transform, new_transform)

# Fix margins
old_margin = "marginLeft: activeTab === 'deals' ? '0px' : activeTab === 'coown' ? '6px' : activeTab === 'borrow' ? '12px' : '18px'"
new_margin = "marginLeft: activeTab === 'deals' ? '0px' : activeTab === 'borrow' ? '6px' : activeTab === 'spaces' ? '12px' : '18px'"
content = content.replace(old_margin, new_margin)

# Move the Co-own link block to the end
# Co-own block:
coown_block = """          <Link
            href="?tab=coown"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold z-10 transition-colors ${activeTab === 'coown' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <PieChart className="w-3.5 h-3.5" /> Co-Own
          </Link>\n"""

content = content.replace(coown_block, '')

# Add it after spaces block
spaces_block = """          <Link
            href="?tab=spaces"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold z-10 transition-colors ${activeTab === 'spaces' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <CarFront className="w-3.5 h-3.5" /> Spaces
          </Link>"""

content = content.replace(spaces_block, spaces_block + '\n' + coown_block.rstrip('\n'))

with open('src/app/(app)/market/page.tsx', 'w') as f:
    f.write(content)

