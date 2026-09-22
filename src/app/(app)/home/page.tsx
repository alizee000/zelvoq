import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { LiveFeedClient } from "./live-feed-client";
import { getFeedPosts, getGroupBuys, getTalents } from "@/lib/data/fetchers";
import { CloudSun, ShoppingBag, Target, Zap, Snowflake } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  
  let fullName = "Koodu";
  if (user) {
    fullName = user.user_metadata?.full_name || "Resident";
  } else if (cookieStore.has("test_name")) {
    fullName = cookieStore.get("test_name")?.value || "Koodu";
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

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
  const totalActivity = talents.length + groupBuys.length;

  return (
    <div className="flex flex-col min-h-full pb-[90px] relative bg-[#F8FAFC]">
      <div className="flex flex-col gap-8 px-6 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out z-0">
        
        {/* Dynamic Greeting Card */}
        <section>
          <div className="w-full bg-slate-900 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-40" />
            
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <CloudSun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-200">{temp} • {weatherCondition}</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h1 className="text-4xl font-black tracking-tight text-white leading-none mb-2">
                  Good {greeting.toLowerCase()},<br/>{firstName}.
                </h1>
                <p className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {totalActivity} active listings in society
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Grid */}
        <section className="grid grid-cols-2 gap-4">
          <Link href="/market" className="col-span-1 bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:border-indigo-100 transition-all h-40 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">{groupBuys.length}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Active Deals</div>
            </div>
          </Link>

          <Link href="/discover" className="col-span-1 bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:border-purple-100 transition-all h-40 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-2 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">{talents.length}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Skills Shared</div>
            </div>
          </Link>
        </section>

        {/* Horizontal Scrolling Marketplace Spotlight */}
        <section className="flex flex-col gap-4 -mx-6 px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight text-slate-900">Spotlight</h2>
            <Link href="/market" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-full">
              View All
            </Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 pr-6">
            {groupBuys.length > 0 && (
              <Link href="/market" className="shrink-0 w-64 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100/50 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Snowflake className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1">Group Buy</div>
                  <div className="text-lg font-black text-slate-900 leading-tight line-clamp-2">{groupBuys[0].item_name}</div>
                </div>
              </Link>
            )}
            
            {borrowItems.length > 0 && (
              <Link href="/market" className="shrink-0 w-64 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/50 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <span className="text-2xl">🛠️</span>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">Library</div>
                  <div className="text-lg font-black text-slate-900 leading-tight line-clamp-2">{borrowItems[0].title}</div>
                </div>
              </Link>
            )}

            {groupBuys.length === 0 && borrowItems.length === 0 && (
              <div className="shrink-0 w-64 border-2 border-dashed border-slate-200 rounded-3xl p-5 flex flex-col justify-center items-center text-center">
                <p className="text-sm font-bold text-slate-400">Nothing here yet</p>
                <Link href="/add" className="text-xs font-bold text-indigo-600 mt-2">Start a listing</Link>
              </div>
            )}
          </div>
        </section>
        
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-black tracking-tight text-slate-900">Activity</h2>
          <LiveFeedClient initialPosts={feedPosts} />
        </section>

      </div>
    </div>
  );
}
