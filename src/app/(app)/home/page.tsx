import { Target, User, ShoppingBag, CloudSun } from "lucide-react";
import Link from "next/link";
import { getFeedPosts, getGroupBuys, getTalents } from "@/lib/data/fetchers";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { LiveFeedClient } from "./live-feed-client";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  
  let fullName = "INAI";
  if (user) {
    fullName = user.user_metadata?.full_name || "Resident";
  } else if (cookieStore.has("test_name")) {
    fullName = cookieStore.get("test_name")?.value || "INAI";
  }
  
  const firstName = fullName.split(" ")[0];

  const feedPosts = await getFeedPosts();
  const groupBuys = await getGroupBuys();
  const talents = await getTalents();
  const borrowItems = talents.filter((t: any) => t.category === "lend");
  
  // Real weather fetch
  let temp = "24°C";
  let weatherCondition = "Clear";
  try {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current_weather=true", { next: { revalidate: 3600 } });
    if (res.ok) {
      const weatherData = await res.json();
      temp = `${Math.round(weatherData.current_weather.temperature)}°C`;
      const code = weatherData.current_weather.weathercode;
      if (code === 0) weatherCondition = "Clear sky";
      else if (code <= 3) weatherCondition = "Partly cloudy";
      else if (code <= 49) weatherCondition = "Fog/Cloudy";
      else if (code <= 69) weatherCondition = "Rain";
      else if (code <= 79) weatherCondition = "Snow";
      else if (code <= 99) weatherCondition = "Thunderstorm";
    }
  } catch (e) {
    console.error("Failed to fetch weather");
  }

  // Real greeting based on time (Server Time)
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";

  // Total Activity
  const totalActivity = talents.length + groupBuys.length;

  return (
    <div className="flex flex-col min-h-full pt-8 pb-[90px] px-6 gap-6 relative animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            MyINAI
          </h1>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            Discover People. Discover Possibilities.
          </div>
        </div>
      </header>

      {/* Grid Layout */}
      <section className="grid grid-cols-2 gap-4">
        {/* Main Greeting Tile */}
        <div className="col-span-2 bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-xl shadow-indigo-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-200/40 to-orange-400/20 rounded-full blur-3xl opacity-50 -z-10" />
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-orange-500 mb-2">
                <CloudSun className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{temp} • {weatherCondition}</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {greeting},<br/>{firstName}.
              </h1>
            </div>
            <Link href="/profile" className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform z-10">
              <User className="w-5 h-5 text-indigo-600" />
            </Link>
          </div>
          <p className="text-sm font-medium text-slate-600">The society is buzzing today. <span className="text-indigo-600 font-bold">{totalActivity} total listings</span> active.</p>
        </div>

        {/* Small Tile 1 */}
        <Link href="/market" className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-5 shadow-xl shadow-indigo-500/5 flex flex-col justify-between hover:scale-[1.02] transition-transform h-36">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">{groupBuys.length}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Active Deals</div>
          </div>
        </Link>

        {/* Small Tile 2 */}
        <Link href="/discover" className="bg-gradient-to-br from-indigo-500 to-purple-600 border border-indigo-400/50 rounded-[2rem] p-5 shadow-xl shadow-indigo-600/20 flex flex-col justify-between hover:scale-[1.02] transition-transform h-36 relative overflow-hidden text-white">
          <div className="absolute -right-4 -bottom-4 opacity-20">
            <Target className="w-24 h-24" />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2 z-10">
            <User className="w-5 h-5" />
          </div>
          <div className="z-10">
            <div className="text-2xl font-black tracking-tight leading-tight">{talents.length}</div>
            <div className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mt-0.5">Skills Shared</div>
          </div>
        </Link>
      </section>

      {/* Marketplace Spotlight */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <span className="text-[10px] font-bold uppercase tracking-widest">Marketplace Spotlight</span>
          </div>
          <Link href="/market" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">
            Enter Market
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {groupBuys.length > 0 ? (
            <Link href="/market" className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:border-indigo-200 transition-all group">
              <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                ❄️
              </div>
              <div>
                <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1">Group Buy</div>
                <div className="text-sm font-bold text-slate-900 leading-tight line-clamp-1">{groupBuys[0].item_name}</div>
              </div>
            </Link>
          ) : (
             <Link href="/add" className="bg-white border border-dashed border-slate-300 rounded-3xl p-4 shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:border-indigo-200 transition-all group">
              <div className="text-sm font-bold text-slate-500">Start a Group Buy</div>
            </Link>
          )}
          
          {borrowItems.length > 0 ? (
            <Link href="/market" className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:border-indigo-200 transition-all group">
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🛠️
              </div>
              <div>
                <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">Library</div>
                <div className="text-sm font-bold text-slate-900 leading-tight line-clamp-1">{borrowItems[0].title}</div>
              </div>
            </Link>
          ) : (
             <Link href="/add" className="bg-white border border-dashed border-slate-300 rounded-3xl p-4 shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:border-indigo-200 transition-all group">
              <div className="text-sm font-bold text-slate-500">List an Item</div>
            </Link>
          )}
        </div>
      </section>
      
      <LiveFeedClient initialPosts={feedPosts} />

    </div>
  );
}
