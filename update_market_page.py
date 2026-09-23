import re

with open('src/app/(app)/market/page.tsx', 'r') as f:
    content = f.read()

# Add import for getCoOwnItems and CoOwnCard
if 'getCoOwnItems' not in content:
    content = content.replace('getGroupBuys } from', 'getGroupBuys, getCoOwnItems } from')
    content = content.replace('import { Store, Wrench, ShoppingBag, CarFront } from "lucide-react";', 'import { Store, Wrench, ShoppingBag, CarFront, PieChart } from "lucide-react";')
    content = content.replace('import { SpaceCard } from "@/components/shared/space-card";', 'import { SpaceCard } from "@/components/shared/space-card";\nimport { CoOwnCard } from "@/components/shared/co-own-card";')

# Update activeTab logic
content = content.replace(
    'const activeTab = resolvedParams.tab === "spaces" ? "spaces" : resolvedParams.tab === "borrow" ? "borrow" : "deals";',
    'const activeTab = resolvedParams.tab === "spaces" ? "spaces" : resolvedParams.tab === "borrow" ? "borrow" : resolvedParams.tab === "coown" ? "coown" : "deals";'
)

# Add data fetch
if 'const coOwnItems = await getCoOwnItems();' not in content:
    content = content.replace(
        'const groupBuys = await getGroupBuys();',
        'const groupBuys = await getGroupBuys();\n  const coOwnItems = await getCoOwnItems();'
    )

# Update segmented control
old_tabs = """          <div 
            className="absolute top-1.5 bottom-1.5 w-[calc(33.333%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out"
            style={{ 
              transform: `translateX(${activeTab === 'deals' ? '0%' : activeTab === 'borrow' ? '100%' : '200%'})`,
              left: activeTab === 'deals' ? '6px' : activeTab === 'borrow' ? '0px' : '-6px',
              marginLeft: activeTab === 'deals' ? '0px' : activeTab === 'borrow' ? '6px' : '12px'
            }}
          />
          <Link
            href="?tab=deals"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[11px] uppercase tracking-wider font-bold z-10 transition-colors ${activeTab === 'deals' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <ShoppingBag className="w-4 h-4" /> Deals
          </Link>
          <Link
            href="?tab=borrow"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[11px] uppercase tracking-wider font-bold z-10 transition-colors ${activeTab === 'borrow' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <Wrench className="w-4 h-4" /> Library
          </Link>
          <Link
            href="?tab=spaces"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[11px] uppercase tracking-wider font-bold z-10 transition-colors ${activeTab === 'spaces' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <CarFront className="w-4 h-4" /> Spaces
          </Link>"""

new_tabs = """          <div 
            className="absolute top-1.5 bottom-1.5 w-[calc(25%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out"
            style={{ 
              transform: `translateX(${activeTab === 'deals' ? '0%' : activeTab === 'coown' ? '100%' : activeTab === 'borrow' ? '200%' : '300%'})`,
              left: activeTab === 'deals' ? '6px' : activeTab === 'coown' ? '2px' : activeTab === 'borrow' ? '-2px' : '-6px',
              marginLeft: activeTab === 'deals' ? '0px' : activeTab === 'coown' ? '6px' : activeTab === 'borrow' ? '12px' : '18px'
            }}
          />
          <Link
            href="?tab=deals"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold z-10 transition-colors ${activeTab === 'deals' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Deals
          </Link>
          <Link
            href="?tab=coown"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold z-10 transition-colors ${activeTab === 'coown' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <PieChart className="w-3.5 h-3.5" /> Co-Own
          </Link>
          <Link
            href="?tab=borrow"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold z-10 transition-colors ${activeTab === 'borrow' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <Wrench className="w-3.5 h-3.5" /> Library
          </Link>
          <Link
            href="?tab=spaces"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold z-10 transition-colors ${activeTab === 'spaces' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <CarFront className="w-3.5 h-3.5" /> Spaces
          </Link>"""

content = content.replace(old_tabs, new_tabs)

# Add the coown view content
coown_view = """        ) : activeTab === "coown" ? (
          <div className="flex flex-col gap-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-2">
              <h3 className="font-bold text-indigo-900 text-sm mb-1">Fractional Ownership 💎</h3>
              <p className="text-xs text-indigo-700/80 leading-relaxed">
                Pool money with neighbors to buy premium items. You own a fraction, split the cost, and share access via the community booking calendar.
              </p>
            </div>
            
            {coOwnItems.length > 0 ? (
              coOwnItems.map((item: any) => (
                <CoOwnCard 
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.image_url}
                  totalPrice={item.total_price}
                  maxShares={item.max_shares}
                  pricePerShare={item.price_per_share}
                  fundedShares={item.funded_shares}
                  status={item.status}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <PieChart className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No active pools</h3>
                <p className="text-sm text-slate-500">Propose an item to co-own with neighbors.</p>
              </div>
            )}
          </div>"""

# Replace the specific else if structure
content = content.replace(
    ') : activeTab === "borrow" ? (',
    coown_view + '\n        ) : activeTab === "borrow" ? ('
)

with open('src/app/(app)/market/page.tsx', 'w') as f:
    f.write(content)
