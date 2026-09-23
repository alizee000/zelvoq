import { Store, Wrench, ShoppingBag, CarFront, PieChart, Plus } from "lucide-react";
import { BorrowCard } from "@/components/shared/borrow-card";
import { GroupBuyCard } from "@/components/shared/group-buy-card";
import { SpaceCard } from "@/components/shared/space-card";
import { CoOwnCard } from "@/components/shared/co-own-card";
import { getTalents, getGroupBuys, getCoOwnItems } from "@/lib/data/fetchers";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";


export default async function MarketPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab === "spaces" ? "spaces" : resolvedParams.tab === "borrow" ? "borrow" : resolvedParams.tab === "coown" ? "coown" : "deals";

  const allTalents = await getTalents();
  const borrowItems = allTalents.filter((t: any) => t.category === 'item' || t.category === 'lend');
  const spacesItems = allTalents.filter((t: any) => t.category === 'space');
  const groupBuys = await getGroupBuys();
  const coOwnItems = await getCoOwnItems();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const currentUserName = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32">
      
      {/* Header */}
      <div className="px-6 pt-10 pb-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">
        <h1 className="text-[32px] font-extrabold tracking-tight text-slate-900 leading-tight">
          Marketplace
        </h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Borrow equipment, join deals, and share spaces.</p>
      </div>

      {/* iOS Segmented Control */}
      <div className="px-6 mb-8 animate-in fade-in zoom-in-95 duration-700 delay-[100ms] fill-mode-both">
        <div className="bg-slate-100 p-1.5 rounded-full flex relative">
          <div 
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
          </Link>
        </div>
      </div>

      <div className="px-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[200ms] fill-mode-both">
        {activeTab === "deals" ? (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-slate-900">Active Deals</h2>
              <Link href="/add?type=deal" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95">
                 <Plus className="w-5 h-5 text-white" />
              </Link>
            </div>
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
                  currentUserName={currentUserName}
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
                ) : activeTab === "coown" ? (
          <div className="flex flex-col gap-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-2">
              <h3 className="font-bold text-indigo-900 text-sm mb-1">Fractional Ownership 💎</h3>
              <p className="text-xs text-indigo-700/80 leading-relaxed">
                Pool money with neighbors to buy premium items. You own a fraction, split the cost, and share access via the community booking calendar.
              </p>
            </div>
            
            
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-slate-900">Active Pools</h2>
              <Link href="/add?type=coown" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95">
                 <Plus className="w-5 h-5 text-white" />
              </Link>
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
                  currentUserName={currentUserName}
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
          </div>
        ) : activeTab === "borrow" ? (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-slate-900">Library Items</h2>
              <Link href="/add?type=item" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95">
                 <Plus className="w-5 h-5 text-white" />
              </Link>
            </div>
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
                  currentUserName={currentUserName}
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
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-slate-900">Available Spaces</h2>
              <Link href="/add?type=space" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95">
                 <Plus className="w-5 h-5 text-white" />
              </Link>
            </div>
             {spacesItems.length > 0 ? (
               spacesItems.map((item: any) => (
                 <SpaceCard 
                   key={item.id}
                   id={item.id}
                   title={item.title}
                   description={item.description}
                   ownerName={item.owner_name || "Neighbor"}
                   location={item.tower || "Your Community"}
                   availability="Available Now"
                   price={item.is_paid ? "Paid" : "Free"}
                   imageUrl={item.image_url || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop"}
                   currentUserName={currentUserName}
                 />
               ))
             ) : (
               <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <CarFront className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No spaces listed</h3>
                <p className="text-sm text-slate-500">List an empty parking spot or guest room.</p>
              </div>
             )}
          </div>
        )}
      </div>

    </div>
  );
}
