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
    <div className="flex flex-col min-h-full pb-24 pt-8 px-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ease-out">
      
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          Marketplace
        </h1>
        <p className="text-slate-500 text-sm mt-2">Borrow equipment and join bulk deals.</p>
      </header>

      {/* Custom Tabs using Links */}
      <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-2xl mb-8 border border-slate-200">
        <Link
          href="?tab=deals"
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "deals" 
              ? "bg-white text-indigo-700 shadow-sm" 
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Group Buys
        </Link>
        <Link
          href="?tab=borrow"
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "borrow" 
              ? "bg-white text-indigo-700 shadow-sm" 
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
          }`}
        >
          <Wrench className="w-4 h-4" />
          Library
        </Link>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
              <p className="text-sm text-slate-500">No active group buys yet.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              <p className="text-sm text-slate-500">No items available to borrow yet.</p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
