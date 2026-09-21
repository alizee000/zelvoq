import { MapPin, Target, Activity, Zap, ShieldAlert, Cpu, User, Sun, ShoppingBag, CalendarDays, CloudSun } from "lucide-react";
import Link from "next/link";
import { getFeedPosts, getGroupBuys, getTalents } from "@/lib/data/fetchers";

export default async function HomePage() {
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
            MyInAi
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
                {greeting},<br/>Zeeshan.
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
                <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">Available to Borrow</div>
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
      
      <section className="flex flex-col bg-white/70 backdrop-blur-xl border border-white/50 rounded-[2rem] p-6 shadow-sm mb-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="flex items-center justify-between shrink-0 relative z-10">
          <h2 className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-slate-800">
            <Zap className="w-4 h-4 text-amber-500" />
            Live Community Feed
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Live</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mb-5 mt-1 shrink-0">Real-time updates, requests, and activity from your neighbors.</p>
        
        <div className="flex flex-col gap-4">
          {feedPosts.length > 0 ? feedPosts.map((post: any) => {
            // Determine color based on type
            let colorStr = "bg-indigo-500";
            let textColorStr = "text-indigo-700";
            let Icon = Cpu;
            
            if (post.type === 'offer') {
              colorStr = "bg-green-500";
              textColorStr = "text-green-700";
              Icon = Activity;
            } else if (post.type === 'alert') {
              colorStr = "bg-amber-500";
              textColorStr = "text-amber-700";
              Icon = ShieldAlert;
            }

            return (
              <div key={post.id} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl relative overflow-hidden shadow-sm">
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colorStr}`} />
                <div className="flex justify-between items-center mb-2">
                  <div className={`text-[10px] ${textColorStr} font-bold uppercase tracking-wider flex items-center gap-1`}>
                    <Icon className="w-3 h-3" /> {post.type}
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold">
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-xs text-slate-700 leading-relaxed">
                  <span className="text-slate-900 font-bold hover:text-indigo-600 transition-colors">{post.author_name}</span> ({post.tower}) {post.content}
                </div>
              </div>
            );
          }) : (
            <div className="p-4 text-center text-sm text-slate-500">
              The feed is quiet right now.
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
