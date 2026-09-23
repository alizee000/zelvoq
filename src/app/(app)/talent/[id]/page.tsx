import { ArrowLeft, Star, MapPin, Award, CheckCircle2, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function TalentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: talentRaw } = await supabase
    .from("talents")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!talentRaw) return notFound();
  
  // Fetch their latest profile image
  const { data: profile } = await supabase
    .from("profiles")
    .select("image_url")
    .eq("owner_name", talentRaw.owner_name)
    .single();
    
  const talent = { ...talentRaw, image_url: profile?.image_url || null };

  

  // Fetch ALL talents by this user to combine their skills
  const { data: allUserTalents } = await supabase
    .from("talents")
    .select("skills, title, id, category")
    .eq("owner_name", talent.owner_name);

  // Combine and deduplicate all skills arrays
  const allSkillsSet = new Set<string>();
  if (allUserTalents) {
    allUserTalents.forEach(t => {
      if (t.skills && Array.isArray(t.skills)) {
        t.skills.forEach(skill => allSkillsSet.add(skill));
      }
    });
  }
  const allSkills = Array.from(allSkillsSet);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32">
      
      {/* Header */}
      <div className="flex flex-col gap-6 px-6 pt-6 mb-6">
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-3">
            <Link href="/discover" className="p-2 -ml-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Talent Profile
              </h1>
            </div>
          </div>
        </section>
      </div>

      <div className="px-6 flex flex-col gap-6 max-w-4xl mx-auto w-full">
        {/* Profile Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-700 delay-75">
          <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 border-b border-slate-100"></div>
          
          <div className="relative z-10 mt-10">
            <div className="w-32 h-32 rounded-full border-[6px] border-white shadow-sm overflow-hidden bg-slate-100 flex items-center justify-center text-5xl font-bold uppercase text-slate-300">
              {talent.image_url ? (
                <Image
                  src={talent.image_url}
                  alt={talent.owner_name}
                  fill
                  className="object-cover"
                />
              ) : (
                talent.owner_name.charAt(0)
              )}
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2 mt-4">
            {talent.owner_name}
            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
          </h1>
          
          <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">
            {talent.title}
          </div>
          
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full">
              <MapPin className="w-4 h-4" />
              {talent.tower}
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 px-4 py-1.5 rounded-full">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              5.0 (New)
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full mt-8">
            <Link href={`/chat/${talent.id}`} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4" />
              Message
            </Link>
            <button className="flex-1 bg-slate-50 border border-slate-100 text-slate-700 py-3.5 rounded-2xl font-bold shadow-sm hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              Call
            </button>
          </div>
        </div>

        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <h3 className="text-sm font-bold text-slate-900 mb-3">About this Listing</h3>
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
            <p className="text-slate-600 text-sm leading-relaxed">
              {talent.description}
            </p>
          </div>
        </div>

        {allSkills.length > 0 && (
          <div className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Tags & Skills</h3>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill: string) => (
                <div 
                  key={skill} 
                  className="bg-slate-50 border border-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold shadow-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Listings */}
        {allUserTalents && allUserTalents.length > 1 && (
          <div className="mt-2 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Other Listings by {talent.owner_name}</h3>
            <div className="flex flex-col gap-3">
              {allUserTalents.filter(t => t.id !== talent.id).map(t => (
                <Link href={`/talent/${t.id}`} key={t.id} className="bg-white border border-slate-100 p-4 rounded-[1.5rem] flex items-center justify-between hover:border-slate-300 hover:shadow-sm transition-all group shadow-sm">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.title}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">{t.category}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                     <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
