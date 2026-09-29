import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

new_home = """import { Suspense } from "react";
import { Search, Bell, Sparkles, MapPin, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getTalents } from "@/lib/api/talents";
import { LiveKnocks } from "@/components/ui/live-knocks";

export default async function HomePage() {
  const user = await currentUser();
  const firstName = user?.firstName || "Neighbor";
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  
  const allTalents = await getTalents() || [];
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data: dbKnocks } = await supabase.from("knock_knocks").select("*").eq("status", "active").order("created_at", { ascending: false });
  
  const liveKnocks = dbKnocks?.map((k: any) => ({
    id: k.id,
    title: k.title,
    owner_name: k.creator_name,
    image_url: '', 
    created_at: k.created_at,
    tower: k.tower
  })) || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] relative">
      {/* 
        PREMIUM HEADER
        Absolutely pristine, minimal, glassmorphic header.
      */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-slate-100/50 pt-8 pb-3 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200 shadow-sm">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt={firstName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-0.5">MyKoodu</span>
            <span className="text-[14px] font-bold text-slate-900 leading-none">Prestige Falcon City</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/hive" className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm">
            <Sparkles className="w-4 h-4" />
          </Link>
          <button className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 relative shadow-sm hover:bg-slate-100 transition-colors">
            <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white z-10" />
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 
        INSTAGRAM-STYLE STORIES ROW
        Zero padding above, sitting perfectly flush below the header.
      */}
      <div className="bg-white border-b border-slate-100/50 pb-4">
        <LiveKnocks knocks={liveKnocks} userFirstName={firstName} userFullName={fullName} userImageUrl={user?.imageUrl} />
      </div>

      <main className="flex-1 overflow-y-auto hide-scrollbar pb-32">
        {/* 
          UNIFIED VERTICAL FEED
          Instead of cluttered horizontal scrolls and grids, we use a massive, gorgeous vertical feed like Airbnb/Instagram.
        */}
        <div className="px-5 pt-6 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Neighborhood Feed</h2>
          </div>

          {allTalents.length > 0 ? allTalents.map((item: any) => (
            <Link href={`/item/${item.id}`} key={item.id} className="block group">
              <div className="w-full bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100/50 relative overflow-hidden transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
                
                {/* Category Badge */}
                <div className="absolute top-5 right-5 z-10">
                  <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{item.category}</span>
                  </div>
                </div>

                {/* Massive Image Area */}
                <div className="w-full aspect-[4/3] rounded-[1.5rem] bg-slate-100 mb-5 relative overflow-hidden">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-slate-300">
                       <Search className="w-12 h-12 mb-3 opacity-20" />
                    </div>
                  )}
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[18px] font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[16px] font-black text-slate-900 shrink-0">
                      {item.is_paid ? '₹₹' : 'Free'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-sm font-bold">{item.tower || 'Anywhere'}</span>
                    </div>
                    <span className="text-sm font-bold">{item.owner_name?.split(' ')[0]}</span>
                  </div>
                </div>

              </div>
            </Link>
          )) : (
             <div className="w-full py-20 flex flex-col items-center justify-center text-center px-6 border-2 border-dashed border-slate-200 rounded-[2rem]">
               <Sparkles className="w-10 h-10 text-slate-300 mb-4" />
               <h3 className="text-lg font-black text-slate-900 mb-2">Feed is quiet</h3>
               <p className="text-sm font-medium text-slate-500">Be the first to share something with your neighborhood.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
"""

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(new_home)
