import { ArrowLeft, Star, MapPin, Award, CheckCircle2, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function TalentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: talent } = await supabase
    .from("talents")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!talent) return notFound();

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
    <div className="flex flex-col relative min-h-full pb-24 bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <Link href="/discover" className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </Link>
        <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 transition-colors">
          <Star className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="px-6 mt-6 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4 relative bg-indigo-50 flex items-center justify-center text-5xl font-bold uppercase text-indigo-300">
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
        
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          {talent.owner_name}
          <CheckCircle2 className="w-5 h-5 text-blue-500" />
        </h1>
        
        <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1">
          {talent.title}
        </div>
        
        <div className="flex items-center gap-4 mt-3 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 bg-slate-200/50 px-3 py-1 rounded-full">
            <MapPin className="w-4 h-4" />
            {talent.tower}
          </div>
          <div className="flex items-center gap-1.5 bg-slate-200/50 px-3 py-1 rounded-full">
            <Award className="w-4 h-4 text-amber-500" />
            0 Endorsements
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full max-w-sm mt-8">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Message
          </button>
          <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            Call
          </button>
        </div>

        <div className="w-full max-w-sm mt-8 border-t border-slate-200 pt-8">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">About this Listing</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {talent.description}
          </p>
        </div>

        {allSkills.length > 0 && (
          <div className="flex flex-col mt-8 w-full max-w-sm">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">All Tags & Skills</h3>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill: string) => (
                <div 
                  key={skill} 
                  className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-2xl text-xs font-bold shadow-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Listings */}
        {allUserTalents && allUserTalents.length > 1 && (
          <div className="mt-8 w-full max-w-sm">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Other Listings by {talent.owner_name}</h3>
            <div className="flex flex-col gap-2">
              {allUserTalents.filter(t => t.id !== talent.id).map(t => (
                <Link href={`/talent/${t.id}`} key={t.id} className="bg-white border border-slate-200 p-3 rounded-2xl flex items-center justify-between hover:border-indigo-200 hover:shadow-sm transition-all group">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.title}</div>
                    <div className="text-[10px] font-bold text-indigo-500 uppercase">{t.category}</div>
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
