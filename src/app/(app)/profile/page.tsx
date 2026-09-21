import { User, Settings, Shield, Award, ChevronRight, LogOut, MapPin, Bell, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AvatarUploader } from "@/components/shared/avatar-uploader";
import { createClient } from "@/lib/supabase/server";

export default async function MyProfilePage() {
  const supabase = await createClient();
  
  // Fetch existing image from their real profile table
  const { data: myProfile } = await supabase
    .from("profiles")
    .select("image_url")
    .eq("owner_name", "Zeeshan Ali")
    .single();
    
  const currentImageUrl = myProfile?.image_url || undefined;

  // Fetch their listings
  const { data: myTalents } = await supabase
    .from("talents")
    .select("*")
    .eq("owner_name", "Zeeshan Ali")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col pb-24 relative min-h-full bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Header */}
      <header className="flex items-center justify-between mt-8 px-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Profile
          </h1>
          <p className="text-sm font-bold text-slate-500 mt-1">Manage your account</p>
        </div>
        <button className="p-2 bg-white rounded-full border border-slate-200 shadow-sm hover:scale-105 transition-transform">
          <Settings className="w-5 h-5 text-slate-700" />
        </button>
      </header>

      <div className="px-6 mt-6 flex flex-col gap-6 max-w-4xl mx-auto w-full">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-indigo-500 to-purple-600"></div>
          
          {/* INTERACTIVE AVATAR UPLOADER */}
          <div className="relative z-10 mt-6">
            <div className="bg-white p-1 rounded-full shadow-sm">
              <AvatarUploader initialImage={currentImageUrl} />
            </div>
            <div className="absolute bottom-4 right-0 w-7 h-7 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center z-20 shadow-md">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900">Zeeshan Ali</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Apt 134 · RED BLOCK</p>
          
          <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-indigo-50 rounded-full">
            <Award className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-bold text-indigo-700">Level 3 Neighbor</span>
          </div>

        </div>

        {/* My Skills & Talents */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-slate-900">My Listings</h3>
            <Link href="/add" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-full">Add New</Link>
          </div>
          
          {myTalents && myTalents.length > 0 ? (
            myTalents.map((talent) => (
              <div key={talent.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold text-slate-900 mb-1">{talent.title}</div>
                  <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{talent.category}</div>
                </div>
                <Link href={`/talent/${talent.id}`} className="p-2 bg-white rounded-full border border-slate-200 shadow-sm hover:scale-105 transition-transform">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
              You haven't listed anything yet!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
