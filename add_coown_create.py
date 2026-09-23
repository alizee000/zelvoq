import re

with open('src/app/(app)/market/page.tsx', 'r') as f:
    content = f.read()

# Make sure Plus is imported
if 'Plus' not in content:
    content = content.replace('import { Store, Wrench, ShoppingBag, CarFront, PieChart } from "lucide-react";', 'import { Store, Wrench, ShoppingBag, CarFront, PieChart, Plus } from "lucide-react";')

# Find the Co-Own tab content and add a create button
create_button = """
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-slate-900">Active Pools</h2>
              <Link href="/add?type=coown" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95">
                 <Plus className="w-5 h-5 text-white" />
              </Link>
            </div>
            
            {coOwnItems.length > 0 ? ("""

content = content.replace('{coOwnItems.length > 0 ? (', create_button, 1)

with open('src/app/(app)/market/page.tsx', 'w') as f:
    f.write(content)
