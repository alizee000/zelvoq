import { createClient } from"@/lib/supabase/server";
import { currentUser } from"@clerk/nextjs/server";
import { getTalents } from"@/lib/data/fetchers";
import { cookies } from"next/headers";
import Image from"next/image";
import Link from"next/link";
import { Search, Sparkles, Ticket, Activity, Camera, Coffee, ChevronRight } from"lucide-react";
import { CarouselWrapper } from "@/components/ui/carousel-wrapper";
import { MotionSection } from "@/components/ui/motion-wrapper";
import { CommunityVideo } from"./community-video";
import { DynamicGreeting } from"./dynamic-greeting";



export default async function HomePage() {
 const supabase = await createClient();
 const clerkUser = await currentUser();
 const cookieStore = await cookies();
 
 let firstName ="";
 if (clerkUser?.firstName) {
 firstName = clerkUser.firstName;
 } else if (clerkUser?.emailAddresses?.[0]?.emailAddress) {
 firstName = clerkUser.emailAddresses[0].emailAddress.substring(0, 4);
 } else if (cookieStore.has("test_name")) {
 firstName = (cookieStore.get("test_name")?.value ||"User").split("")[0];
 } else {
 firstName ="Guest";
 }

 const allTalents = await getTalents();
 const allPeople = allTalents.filter((t: any) => t.category ==="skill" || t.category ==="service");
 const uniquePeopleMap = new Map();
 allPeople.forEach((t: any) => {
 if (!uniquePeopleMap.has(t.owner_name)) {
 uniquePeopleMap.set(t.owner_name, t);
 }
 });
 const people = Array.from(uniquePeopleMap.values()).slice(0, 5);


 // Dynamic Trending Data
 const { count: dealsCount } = await supabase.from("group_buys").select("id", { count:"exact", head: true });
 const { count: knockKnocksCount } = await supabase.from("knock_knocks").select("id", { count:"exact", head: true }).is("resolved_by", null);
 const { count: eventsCount } = await supabase.from("events").select("id", { count:"exact", head: true });
 const libraryCount = allTalents?.filter((t: any) => t.category ==="lend" || t.category ==="item").length || 0;
 const skillsCount = allTalents?.filter((t: any) => t.category ==="skill").length || 0;

 const trendingItems = [];
 if (dealsCount) trendingItems.push({ count: dealsCount, label:"Active community deals", href:"/market", icon: Ticket, bg:"bg-[#F0FDF4]", iconBg:"bg-[#DCFCE7]", iconColor:"text-[#166534]" });
 if (knockKnocksCount) trendingItems.push({ count: knockKnocksCount, label:"Neighbors needing help", href:"/knock-knocks", icon: Activity, bg:"bg-[#FFFBEB]", iconBg:"bg-[#FEF3C7]", iconColor:"text-[#D97706]" });
 if (eventsCount) trendingItems.push({ count: eventsCount, label:"Upcoming community events", href:"/events", icon: Coffee, bg:"bg-[#FFF1F2]", iconBg:"bg-[#FFE4E6]", iconColor:"text-[#BE123C]" });
 if (libraryCount) trendingItems.push({ count: libraryCount, label:"Items to borrow", href:"/market?tab=borrow", icon: Camera, bg:"bg-[#F3E8FF]", iconBg:"bg-[#E9D5FF]", iconColor:"text-[#7E22CE]" });
 if (skillsCount) trendingItems.push({ count: skillsCount, label:"Local experts & skills", href:"/discover", icon: Sparkles, bg:"bg-[#FFFBEB]", iconBg:"bg-[#FEF3C7]", iconColor:"text-[#D97706]" });

 const gemTalent = allTalents?.find((t: any) => t.title.toLowerCase().includes("bake") || t.title.toLowerCase().includes("chef") || t.title.toLowerCase().includes("cake")) || allTalents?.[0];


 return (
 <div className="flex flex-col min-h-screen pb-[90px] bg-white relative">
 <div className="flex flex-col gap-6 px-6 pt-6 relative z-10">
 
 {/* Header Section */}
 <MotionSection delay={0}>
 <DynamicGreeting firstName={firstName} />
 <p className="text-sm text-slate-500 mt-1">
 Your community is full of hidden talent.
 </p>
 </MotionSection>

 {/* Featured Video */}
 <CommunityVideo />

 {/* Search Bar */}
 <MotionSection delay={0.1}>
 <form action="/discover" className="relative block group">
 <button type="submit" className="absolute inset-y-0 left-4 flex items-center cursor-pointer z-10 hover:scale-110 transition-transform">
 <Search className="h-5 w-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
 </button>
 <input 
 type="text"
 name="q" 
 placeholder="What are you looking for?" 
 className="w-full bg-slate-50 border-none rounded-full py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
 />
 </form>
 </MotionSection>

 {/* Hidden Gems Carousel */}
 <MotionSection delay={0.2}>
 <CarouselWrapper autoScrollInterval={3000}>
 {allTalents?.map((talent: any) => (
 <Link key={talent.id} href={`/talent/${talent.id}`} className="block flex-none w-[85vw] sm:w-[400px] snap-center bg-gradient-to-br from-[#FFF5F0] to-[#FFE8E0] rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
 <div className="absolute right-0 bottom-0 w-32 h-40">
 <img src={talent.image_url ||"https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop"} alt={talent.title} className="w-full h-full object-cover object-left rounded-tl-[3rem]" />
 </div>
 <div className="relative z-10 w-[65%]">
 <div className="inline-flex items-center gap-1 text-[#D97706] bg-[#FEF3C7] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3">
 Hidden Gem
 </div>
 <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">Meet {talent.owner_name.split(' ')[0]}</h2>
 <p className="text-xs text-slate-700 mb-4 leading-relaxed line-clamp-3">
 {talent.description}
 </p>
 <div className="inline-flex items-center gap-1 bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
 View Profile <ChevronRight className="w-3 h-3" />
 </div>
 </div>
 </Link>
 ))}
 </CarouselWrapper>
 </MotionSection>

 {/* Trending Section */}
 <MotionSection delay={0.3}>
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-base font-bold text-slate-900">Trending in your community</h2>
 <ChevronRight className="w-4 h-4 text-slate-400" />
 </div>
 
 
 <CarouselWrapper>
 {trendingItems.map((item, i) => {
 const Icon = item.icon;
 return (
 <Link href={item.href} key={i} style={{ animationDelay: `${150 + (i * 100)}ms`, animationFillMode:"both" }} className={`flex-none w-[140px] ${item.bg} rounded-3xl p-5 snap-start shadow-sm hover:scale-[1.05] transition-all zoom-in-[0.8] `}>
 <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center mb-4 ${item.iconColor}`}>
 <Icon className="w-4 h-4" />
 </div>
 <div className="text-2xl font-black text-slate-900 mb-1">{item.count}</div>
 <div className="text-xs text-slate-600 leading-tight">{item.label}</div>
 </Link>
 );
 })}
 </CarouselWrapper>
 </MotionSection>

 {/* People you should know */}
 <MotionSection delay={0.4}>
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-base font-bold text-slate-900">People you should know</h2>
 <ChevronRight className="w-4 h-4 text-slate-400" />
 </div>
 
 <CarouselWrapper>
 {people.length > 0 ? people.map((person: any, i: number) => (
 <Link href={`/talent/${person.id}`} key={person.id} style={{ animationDelay: `${300 + (i * 75)}ms`, animationFillMode:"both" }} className="flex-none w-[120px] bg-white border border-slate-100 rounded-3xl p-4 flex flex-col items-center text-center snap-start shadow-sm hover:scale-[1.02] hover:border-indigo-100 transition-all cursor-pointer zoom-in-[0.9]">
 <div className="w-14 h-14 rounded-full overflow-hidden mb-3 bg-slate-100 border-2 border-white shadow-sm">
 {person.image_url ? (
 <img src={person.image_url} alt={person.title} className="w-full h-full object-cover" />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-xl bg-indigo-50">
 👤
 </div>
 )}
 </div>
 <h3 className="text-sm font-bold text-slate-900 line-clamp-1 w-full">{person.owner_name}</h3>
 <p className="text-[10px] text-slate-500 line-clamp-1 w-full mt-0.5 font-medium">{person.title}</p>
 <p className="text-[9px] text-slate-400 line-clamp-1 w-full mt-1 uppercase tracking-wider">{person.tower ||"Resident"}</p>
 </Link>
 )) : (
 <div className="text-sm text-slate-500 p-4">No profiles found. Encourage your neighbors to join!</div>
 )}
 </CarouselWrapper>
 </MotionSection>

 </div>
 </div>
 );
}

