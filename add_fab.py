import re

with open('src/app/(app)/market/page.tsx', 'r') as f:
    content = f.read()

# Make sure Plus is imported
if 'Plus' not in content:
    content = content.replace('PieChart, Wrench, CarFront', 'PieChart, Wrench, CarFront, Plus')

# Add header for Deals
deals_header = """            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-slate-900">Active Deals</h2>
              <Link href="/add?type=deal" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95">
                 <Plus className="w-5 h-5 text-white" />
              </Link>
            </div>"""

if 'Active Deals</h2>' not in content:
    content = content.replace(
        '{activeTab === "deals" ? (\n          <div className="flex flex-col gap-6">\n            {groupBuys.length > 0 ? (',
        '{activeTab === "deals" ? (\n          <div className="flex flex-col gap-6">\n' + deals_header + '\n            {groupBuys.length > 0 ? ('
    )

# Add header for Borrow
borrow_header = """            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-slate-900">Library Items</h2>
              <Link href="/add?type=item" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95">
                 <Plus className="w-5 h-5 text-white" />
              </Link>
            </div>"""

if 'Library Items</h2>' not in content:
    content = content.replace(
        ') : activeTab === "borrow" ? (\n          <div className="flex flex-col gap-6">\n            {borrowItems.length > 0 ? (',
        ') : activeTab === "borrow" ? (\n          <div className="flex flex-col gap-6">\n' + borrow_header + '\n            {borrowItems.length > 0 ? ('
    )

# Add header for Spaces
spaces_header = """            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-slate-900">Available Spaces</h2>
              <Link href="/add?type=space" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95">
                 <Plus className="w-5 h-5 text-white" />
              </Link>
            </div>"""

if 'Available Spaces</h2>' not in content:
    content = content.replace(
        ') : (\n          <div className="flex flex-col gap-6">\n             {spacesItems.length > 0 ? (',
        ') : (\n          <div className="flex flex-col gap-6">\n' + spaces_header + '\n             {spacesItems.length > 0 ? ('
    )

with open('src/app/(app)/market/page.tsx', 'w') as f:
    f.write(content)
