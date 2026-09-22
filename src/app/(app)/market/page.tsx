import { Store, Wrench, ShoppingBag } from "lucide-react";
import { BorrowCard } from "@/components/shared/borrow-card";
import { GroupBuyCard } from "@/components/shared/group-buy-card";
import { getTalents, getGroupBuys } from "@/lib/data/fetchers";
import Link from "next/link";

export default async function MarketPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab === "borrow" ? "borrow" : "deals";

  const allTalents = await getTalents();
  const borrowItems = allTalents.filter((t: any) => t.category === 'item');
  const groupBuys = await getGroupBuys();

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="px-6 pt-10 pb-6">
        <h1 className="text-[32px] font-extrabold tracking-tight text-slate-900 leading-tight">
          Marketplace
        </h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Borrow equipment and join bulk deals.</p>
      </div>

      {/* iOS Segmented Control */}
      <div className="px-6 mb-8">
        <div className="bg-slate-100 p-1.5 rounded-full flex relative">
          <div 
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out"
            style={{ 
              transform: `translateX(${activeTab === 'deals' ? '0%' : '100%'})`,
              left: activeTab === 'deals' ? '6px' : '0px',
              marginLeft: activeTab === 'deals' ? '0px' : '6px'
            }}
          />
          <Link
            href="?tab=deals"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-bold z-10 transition-colors ${activeTab === 'deals' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <ShoppingBag className="w-4 h-4" /> Group Buys
          </Link>
          <Link
            href="?tab=borrow"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-bold z-10 transition-colors ${activeTab === 'borrow' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <Wrench className="w-4 h-4" /> Library
          </Link>
        </div>
      </div>

      <div className="px-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === "deals" ? (
          <div className="flex flex-col gap-6">
            {groupBuys.length > 0 ? (
              groupBuys.map((deal: any) => (
                <GroupBuyCard 
                  key={deal.id} 
                  id={deal.id}
                  title={deal.title}
                  vendor={deal.vendor}
                  description={deal.description}
                  targetQuantity={deal.target_quantity}
                  currentQuantity={deal.current_quantity}
                  originalPrice={deal.original_price}
                  discountedPrice={deal.discounted_price}
                  expiresInDays={deal.expires_in_days}
                  imageFallback="🛍️"
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No active deals</h3>
                <p className="text-sm text-slate-500">Start a group buy to get discounts.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {borrowItems.length > 0 ? (
              borrowItems.map((item: any) => (
                <BorrowCard 
                  key={item.id} 
                  id={item.id}
                  name={item.title}
                  description={item.description}
                  ownerName={item.owner_name}
                  tower={item.tower}
                  condition="Good"
                  available={true}
                  imageFallback="📦"
                />
              ))
            ) : (
               <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Wrench className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Library is empty</h3>
                <p className="text-sm text-slate-500">List your idle tools for neighbors.</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
