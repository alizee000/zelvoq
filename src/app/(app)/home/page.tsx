import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { LiveFeedClient } from "./live-feed-client";
import { getFeedPosts, getGroupBuys, getTalents } from "@/lib/data/fetchers";
import { getPollsForUser } from "@/lib/data/polls";
import { CloudSun, Zap, ShoppingBag, Target, ArrowRight, Flame, Wrench, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

  // Get up to 4 real neighbor avatars for the Discover card
  const displayAvatars = talents
    .filter((t: any) => t.image_url)
    .map((t: any) => t.image_url)
    .filter((val: any, index: number, self: any) => self.indexOf(val) === index) // Unique
    .slice(0, 4);

  // Fallback avatars if empty
  const defaultAvatars = ["/images/ananya.jpg", "/images/arjun.jpg", "/images/fatima.jpg", "/images/rohan.jpg"];
  const finalAvatars = displayAvatars.length >= 3 ? displayAvatars : defaultAvatars;

  const { activePolls } = await getPollsForUser(fullName);
  
  // Decide the most impactful headline to show
  let impactfulHeadline = (
    <>
      Good {greeting.toLowerCase()},<br/>
      <span className="text-indigo-600">{firstName}.</span>
    </>
  );

  if (activePolls.length > 0) {
    impactfulHeadline = (
      <>
        Action required: <span className="text-rose-500">{activePolls.length} pending vote{activePolls.length > 1 ? 's' : ''}.</span>
      </>
    );
  } else if (groupBuys.length > 0) {
    impactfulHeadline = (
      <>
        Unlock <span className="text-orange-500">{groupBuys.length} neighborhood deals</span> today.
      </>
    );
  } else if (talents.length > 0) {
    impactfulHeadline = (
      <>
        Discover <span className="text-indigo-600">{talents.length} local experts</span> today.
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-[90px] relative bg-[#F8FAFC]">
      <div className="flex flex-col gap-6 px-6 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out z-0">
        
        {/* Impactful Typography Header */}
        <section className="pt-2 pb-2">
           <div className="flex items-center gap-2 mb-2">
             <MapPin className="w-3.5 h-3.5 text-indigo-600" />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest line-clamp-1">
               DSR Rainbow Heights, HSR
             </span>
             <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mx-1">•</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
               <CloudSun className="w-3 h-3 text-amber-500" /> {temp}
             </span>
           </div>
           <h1 className="text-[34px] font-black text-slate-900 tracking-tight leading-[1.1]">
             {impactfulHeadline}
           </h1>
        </section>

        {/* Impactful Hero Discover Card (App Store Style) */}
        <section>
          <Link href="/discover" className="block w-full bg-white rounded-[2rem] p-1 shadow-[0_8px_30px_rgb(0,0,0,0.06)] group hover:scale-[1.01] transition-transform">
            <div className="bg-slate-50 rounded-[1.8rem] p-6 relative overflow-hidden h-[220px] flex flex-col justify-between">
              
              {/* Decorative Mesh Background */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-[60px] opacity-70 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[60px] opacity-70 group-hover:scale-110 transition-transform duration-700" />
              
              {/* Overlapping Avatars */}
              <div className="relative z-10 flex -space-x-3">
                {finalAvatars.map((src: string, i: number) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white shadow-md relative overflow-hidden bg-slate-200">
                    <Image src={src} alt="Neighbor" fill className="object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs z-10">
                  +{talents.length > 4 ? talents.length - 4 : 2}
                </div>
              </div>
              
              <div className="relative z-10 mt-auto">
                <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Target className="w-3 h-3" /> The Talent Network
                </div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  Meet the experts living next door.
                </h3>
              </div>
            </div>
          </Link>
        </section>

        {/* Modern Action Pills */}
        <section className="flex gap-4">
          <Link href="/market" className="flex-1 bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900">{groupBuys.length} Deals</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Group Buys</div>
            </div>
          </Link>

          <Link href="/market" className="flex-1 bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900">{borrowItems.length} Tools</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Library</div>
            </div>
          </Link>
        </section>
        
        <section className="flex flex-col gap-4 mt-2">
          <h2 className="text-xl font-black tracking-tight text-slate-900">Live Activity</h2>
          <LiveFeedClient initialPosts={feedPosts} />
        </section>

      </div>
    </div>
  );
}
