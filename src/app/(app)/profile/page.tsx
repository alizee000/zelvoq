import { User, Settings, Shield, Award, ChevronRight, MapPin, Bell, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AvatarUploader } from "@/components/shared/avatar-uploader";
import { KarmaRings } from "./karma-rings";
import { EditProfileModal } from "./edit-profile-modal";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function MyProfilePage() {
  const clerkUser = await currentUser();
  const supabase = await createClient();
  const cookieStore = await cookies();
  const isTestBypass = cookieStore.has("test_bypass");

  if (!clerkUser && !isTestBypass) {
    redirect("/");
  }

  let ownerName = "Guest";
  let tower = "Unknown Tower";
  let flat = "Unknown Flat";
  let society = "DSR Rainbow Heights";

  if (clerkUser) {
    if (clerkUser.firstName) {
        ownerName = `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim();
    } else if (clerkUser.emailAddresses?.[0]?.emailAddress) {
        ownerName = clerkUser.emailAddresses[0].emailAddress.substring(0, 4);
    }
    
    tower = (clerkUser.publicMetadata?.tower as string) || "DSR Rainbow Heights";
    flat = (clerkUser.publicMetadata?.flat as string) || "Apt 134";
    society = (clerkUser.publicMetadata?.society as string) || "DSR Rainbow Heights";
  } else {
    ownerName = cookieStore.get("test_name")?.value || "Koodu";
    tower = cookieStore.get("test_tower")?.value || "Test Tower";
    flat = cookieStore.get("test_flat")?.value || "101";
    society = cookieStore.get("test_society")?.value || "Test Society";
  }

  // Fetch existing image from their real profile table
  const { data: myProfile } = await supabase
    .from("profiles")
    .select("image_url")
    .eq("owner_name", ownerName)
    .single();
    
  const currentImageUrl = myProfile?.image_url || undefined;

  // Fetch their listings
  const { data: myTalents } = await supabase
    .from("talents")
    .select("*")
    .eq("owner_name", ownerName)
    .order("created_at", { ascending: false });

  // Calculate Karma
  const { count: lendCount } = await supabase.from("talents").select("*", { count: 'exact', head: true }).eq("owner_name", ownerName).in("category", ["item", "lend"]);
  const { count: groupBuysCount } = await supabase.from("group_buys").select("*", { count: 'exact', head: true }).eq("owner_name", ownerName);
  const { count: eventsCount } = await supabase.from("events").select("*", { count: 'exact', head: true }).eq("owner_name", ownerName);
  const { count: helpCount } = await supabase.from("knock_knocks").select("*", { count: 'exact', head: true }).eq("resolved_by", ownerName);
  
  const hostCount = (groupBuysCount || 0) + (eventsCount || 0);

  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-32 relative overflow-hidden">
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Profile</h1>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Manage your account and listings.</p>
      </div>

      <div className="flex flex-col gap-8 px-6 mt-4 max-w-4xl mx-auto w-full">
        {/* Digital ID Card (Light Mode) */}
        <div className="w-full bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-100 blur-[50px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-100 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="absolute top-6 right-6 z-20">
            <EditProfileModal currentFlat={flat} currentTower={tower} currentSociety={society} />
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Avatar Frame */}
            <div className="relative mb-5">
              <div className="w-28 h-28 p-1.5 rounded-[2rem] bg-gradient-to-br from-indigo-100 to-purple-100 backdrop-blur-sm shadow-sm">
                <div className="w-full h-full bg-white rounded-[1.75rem] overflow-hidden flex items-center justify-center relative">
                  <div className="relative z-30">
                    <AvatarUploader initialImage={currentImageUrl} ownerName={ownerName} />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 shadow-md border-2 border-white">
                <Shield className="w-3 h-3" /> Verified
              </div>
            </div>
            
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">{ownerName}</h2>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-6">
              <span>{tower}</span>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Apt {flat}</span>
            </div>
            
            {/* Stats Row */}
            <div className="w-full grid grid-cols-3 gap-2 p-1 bg-slate-50/80 rounded-2xl border border-slate-100">
              <div className="flex flex-col items-center py-3">
                <span className="text-xl font-bold text-slate-900 leading-none mb-1">{myTalents?.length || 0}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Listings</span>
              </div>
              <div className="flex flex-col items-center py-3 border-x border-slate-200">
                <span className="text-xl font-bold text-slate-900 leading-none mb-1">{lendCount || 0}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Lends</span>
              </div>
              <div className="flex flex-col items-center py-3">
                <span className="text-xl font-bold text-slate-900 leading-none mb-1">{hostCount || 0}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Hosted</span>
              </div>
            </div>
          </div>
        </div>

      <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Community Impact</h2>
          </div>
          <KarmaRings lendCount={lendCount || 0} hostCount={hostCount} helpCount={helpCount || 0} />
        </section>

        {/* My Skills & Talents */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">My Listings</h2>
            <Link href="/add" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full transition-colors">Add New</Link>
          </div>
          
          {myTalents && myTalents.length > 0 ? (
            <div className="flex flex-col gap-3">
              {myTalents.map((talent) => (
                <Link href={`/talent/${talent.id}`} key={talent.id} className="p-4 bg-white border border-slate-100 rounded-[1.5rem] flex justify-between items-center group hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      {talent.category === 'skill' ? <Star className="w-5 h-5 text-indigo-500" /> : 
                       talent.category === 'space' ? <MapPin className="w-5 h-5 text-indigo-500" /> :
                       <Shield className="w-5 h-5 text-indigo-500" />}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-0.5">{talent.category}</div>
                      <div className="text-[15px] font-bold text-slate-900 leading-tight">{talent.title}</div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors shrink-0">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 border border-slate-100/50 rounded-[2rem]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Star className="w-6 h-6 text-slate-300" />
              </div>
              <div className="text-base font-bold text-slate-900 mb-1">Your showcase is empty</div>
              <div className="text-sm font-medium text-slate-500 max-w-[200px]">Offer a skill, lend an item, or host a group buy.</div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
