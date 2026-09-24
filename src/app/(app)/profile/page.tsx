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
    <div className="flex flex-col min-h-screen bg-slate-50/50 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Profile</h1>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Manage your account and listings.</p>
      </div>

      <div className="flex flex-col gap-8 px-6 mt-4 max-w-4xl mx-auto w-full">
        {/* Profile Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 border-b border-slate-100"></div>
          <div className="absolute top-4 right-4 z-20">
            <EditProfileModal currentFlat={flat} currentTower={tower} currentSociety={society} />
          </div>
          
          {/* INTERACTIVE AVATAR UPLOADER */}
          <div className="relative z-10 mt-10">
            <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-slate-100">
              <AvatarUploader initialImage={currentImageUrl} ownerName={ownerName} />
            </div>
            <div className="absolute bottom-4 right-0 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white flex items-center justify-center z-20 shadow-md">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 mt-2">{ownerName}</h2>
          <p className="text-slate-500 font-medium text-[11px] mt-1 tracking-wide uppercase">Flat {flat} · {tower}<br/>{society}</p>
          
          <div className="flex items-center gap-2 mt-4 px-5 py-2.5 bg-slate-50 rounded-full border border-slate-100">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-[13px] font-bold text-slate-700">Level 3 Neighbor</span>
          </div>
        </div>

      <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Community Impact</h2>
          </div>
          <KarmaRings lendCount={lendCount || 0} hostCount={hostCount} helpCount={helpCount || 0} />
        </section>

        {/* My Skills & Talents */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">My Listings</h2>
            <Link href="/add" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full transition-colors">Add New</Link>
          </div>
          
          {myTalents && myTalents.length > 0 ? (
            <div className="flex flex-col gap-3">
              {myTalents.map((talent) => (
                <Link href={`/talent/${talent.id}`} key={talent.id} className="p-4 bg-white border border-slate-100 rounded-[1.5rem] flex justify-between items-center group hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div>
                    <div className="text-[15px] font-bold text-slate-900 mb-1">{talent.title}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{talent.category}</div>
                  </div>
                  <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 transition-all">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-white border border-slate-100 rounded-[2rem] shadow-sm">
              <Star className="w-8 h-8 text-slate-300 mb-2" />
              <div className="text-sm font-bold text-slate-900">No listings yet</div>
              <div className="text-[13px] text-slate-500 mt-1">Share a skill or item with the community.</div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
