import { getTalents } from "@/lib/data/fetchers";
import { MotionSection } from "@/components/ui/motion-wrapper";
import { AskMyKoodu } from "@/components/ui/ask-mykoodu";
import { DynamicGreeting } from "./dynamic-greeting";
import { currentUser } from "@clerk/nextjs/server";
import { CarouselWrapper } from "@/components/ui/carousel-wrapper";
import Link from "next/link";
import { LiveKnocks } from "@/components/ui/live-knocks";
import { ArrowRight, MapPin, Calendar, Star, Users, Zap } from "lucide-react";
import Image from "next/image";

export const revalidate = 0;

export default async function HomePage() {
  const user = await currentUser();
  const firstName = user?.firstName || "Neighbor";
  
  const allTalents = await getTalents();

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
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

  
  // Filter for Hidden Gems (skills/services)
  const hiddenGems = allTalents?.filter((t: any) => t.category === 'skill' || t.category === 'service').slice(0, 5) || [];
  
  // Filter for Discoveries (items/spaces to borrow)
  const discoveries = allTalents?.filter((t: any) => t.category === 'item' || t.category === 'lend' || t.category === 'space').slice(0, 4) || [];

  return (
    <div className="flex flex-col min-h-screen pb-[120px] bg-[#FAFAFA] relative font-sans selection:bg-indigo-500/30">
      
      {/* Magazine Cover Header */}
      <div className="relative w-full overflow-hidden bg-white rounded-b-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
        {/* Subtle decorative mesh gradient */}
        <div className="absolute top-[-50%] left-[-20%] w-[140%] h-[150%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-white to-orange-50/40 pointer-events-none opacity-70" />

        {/* Live Knocks Status Row - At the very top */}
        <div className="relative z-20 pt-2">
          <LiveKnocks knocks={liveKnocks} userFirstName={firstName} userFullName={fullName} userImageUrl={user?.imageUrl} />
        </div>
        
        <div className="relative z-10 px-6 pt-6 pb-8">
          <MotionSection delay={0}>

            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tighter leading-[1.1] mb-4">
              Good evening,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {firstName}.
              </span>
            </h1>
            
            <p className="text-base text-slate-500 font-medium mb-8 max-w-[280px] leading-relaxed">
              Your next favorite person might already live next door.
            </p>
          </MotionSection>

          {/* Hero Interaction */}
          <MotionSection delay={0.1}>
            <AskMyKoodu />
          </MotionSection>
        </div>
      </div>

{/* NEW: The Hive Premium Banner */}
      <MotionSection delay={0.15}>
        <div className="px-6 mb-8">
          <Link href="/hive" className="block w-full relative overflow-hidden rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(99,102,241,0.2)] hover:shadow-[0_20px_40px_rgb(99,102,241,0.3)] transition-all duration-500 group bg-slate-900 border border-slate-800 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80')] opacity-30 bg-cover bg-center mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-800/90" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
            
            <div className="relative z-10 flex flex-row items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-md border border-white/10 shadow-sm">
                  <Zap className="w-3 h-3 text-yellow-300" /> Interactive Feature
                </div>
                <h2 className="text-3xl font-black text-white leading-none mb-1 tracking-tight">
                  The Hive
                </h2>
                <p className="text-xs font-medium text-indigo-100 max-w-[200px]">
                  Explore your neighborhood in a stunning 3D Node Map.
                </p>
              </div>
              
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:bg-slate-50 transition-colors duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </MotionSection>

      {/* Hidden Gems: Editorial Carousel */}

      {/* Hidden Gems: Editorial Carousel */}
      <MotionSection delay={0.2}>
        <div className="px-6 mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Hidden Gems</h2>
        </div>
        
        <CarouselWrapper autoScrollInterval={0} className="pl-6 pr-6 pb-8 -mt-2">
          {hiddenGems.map((talent: any) => (
            <Link 
              key={talent.id} 
              href={`/talent/${talent.id}`} 
              className="block flex-none w-[85vw] sm:w-[320px] snap-center relative group"
            >
              {/* Premium Image Card */}
              <div className="w-full h-[380px] rounded-[2rem] overflow-hidden relative shadow-lg shadow-slate-200/50 bg-slate-100">
                {talent.image_url ? (
                  <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <span className="text-6xl">✨</span>
                  </div>
                )}
                
                {/* Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                
                {/* Card Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider mb-3">
                    <MapPin className="w-3 h-3" /> {talent.tower || "Resident"}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white leading-tight mb-1">
                    {talent.owner_name.split(' ')[0]}
                  </h3>
                  
                  <p className="text-sm font-medium text-slate-300 line-clamp-1 mb-4">
                    {talent.title}
                  </p>
                  
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-sm">
                    <ArrowRight className="w-5 h-5 text-slate-900" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CarouselWrapper>
      </MotionSection>

      
      {/* Happening This Week */}
      <MotionSection delay={0.25}>
        <div className="px-6 mt-8 mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Happening this week</h2>
        </div>
        
        <CarouselWrapper autoScrollInterval={0} className="pl-6 pr-6 pb-4 -mt-2">
          {/* Event 1 */}
          <Link href="/events" className="block flex-none w-[85vw] sm:w-[320px] snap-center bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">Saturday, 7 AM</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">Weekend Badminton</h3>
            <p className="text-sm text-slate-500 font-medium mb-4">Tower A Sports Club</p>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" className="w-full h-full object-cover" /></div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" className="w-full h-full object-cover" /></div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" className="w-full h-full object-cover" /></div>
              </div>
              <span className="text-xs font-bold text-slate-500">+12 neighbors joining</span>
            </div>
          </Link>

          {/* Event 2 */}
          <Link href="/events" className="block flex-none w-[85vw] sm:w-[320px] snap-center bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Sunday, 4 PM</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">Kids Coding Workshop</h3>
            <p className="text-sm text-slate-500 font-medium mb-4">Clubhouse Room B</p>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" className="w-full h-full object-cover" /></div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80" className="w-full h-full object-cover" /></div>
              </div>
              <span className="text-xs font-bold text-slate-500">+8 kids registered</span>
            </div>
          </Link>
        </CarouselWrapper>
      </MotionSection>

      {/* Community Discoveries List */}
      <MotionSection delay={0.3}>
        <div className="px-6 mt-2 mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Community Discoveries</h2>
        </div>

        <div className="px-6 flex flex-col gap-3">
          {discoveries.map((item: any) => (
            <Link 
              key={item.id} 
              href={`/talent/${item.id}`}
              className="flex items-center gap-5 p-4 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
            >
              <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden bg-slate-50 shrink-0 relative">
                {item.image_url ? (
                  <Image src={item.image_url} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">📦</div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-1">
                  {item.category === 'space' ? 'Space' : 'Borrow'}
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-tight truncate mb-0.5">{item.title}</h4>
                <p className="text-sm text-slate-500 font-medium truncate">From {item.owner_name.split(' ')[0]}</p>
              </div>
              
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
              </div>
            </Link>
          ))}
        </div>
      </MotionSection>

      

    </div>
  );
}
