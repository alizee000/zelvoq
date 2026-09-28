import { ArrowLeft, CheckCircle2, MessageSquare, Briefcase, Heart, Calendar, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { triggerHaptic } from "@/lib/utils/haptics";
import { MotionSection } from "@/components/ui/motion-wrapper";

export const revalidate = 0;

export default async function TalentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: talentRaw } = await supabase
    .from("talents")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!talentRaw) return notFound();
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("image_url")
    .eq("owner_name", talentRaw.owner_name)
    .single();
    
  const talent = { ...talentRaw, image_url: profile?.image_url || null };

  const { data: allUserTalents } = await supabase
    .from("talents")
    .select("skills, title, id, category")
    .eq("owner_name", talent.owner_name);

  // Derive logical groupings from the user's data
  const services = allUserTalents?.filter(t => t.category === 'skill' || t.category === 'service') || [];
  const items = allUserTalents?.filter(t => t.category === 'lend' || t.category === 'item' || t.category === 'space') || [];

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 font-sans selection:bg-indigo-100">
      
      {/* Editorial Header / Cover */}
      <div className="relative w-full h-[280px] bg-slate-50">
        {talent.image_url ? (
          <Image
            src={talent.image_url}
            alt={talent.owner_name}
            fill
            className="object-cover opacity-80"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-slate-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-12 left-6 z-20">
          <Link href="/home" className="w-10 h-10 bg-white/90 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-sm border border-slate-200">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </Link>
        </div>
      </div>

      <div className="px-6 -mt-24 relative z-10 max-w-2xl mx-auto w-full">
        {/* Avatar */}
        <MotionSection delay={0}>
          <div className="w-32 h-32 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden bg-white mb-6">
            {talent.image_url ? (
              <div className="relative w-full h-full">
                <Image
                  src={talent.image_url}
                  alt={talent.owner_name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-slate-100 text-slate-300">
                {talent.owner_name.charAt(0)}
              </div>
            )}
          </div>

          {/* Identity */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-2">
              {talent.owner_name.split(' ')[0]}
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </h1>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              {talent.title} <span className="text-slate-300 mx-1">&bull;</span> {talent.tower || 'Resident'}
            </p>
          </div>
        </MotionSection>

        {/* Action Buttons */}
        <MotionSection delay={0.1} className="flex gap-3 mb-12">
          <Link href={`/chat/${talent.id}`} className="flex-1 bg-slate-900 hover:bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-sm transition-colors active:scale-95 flex items-center justify-center gap-2 text-[15px]">
            <MessageSquare className="w-5 h-5" />
            Message
          </Link>
          <button className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold transition-colors active:scale-95 flex items-center justify-center gap-2 text-[15px]">
            Request help
          </button>
        </MotionSection>

        <div className="space-y-10">
          
          {/* I can help with */}
          {services.length > 0 && (
            <MotionSection delay={0.2}>
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-bold text-slate-900">I can help with</h3>
              </div>
              <div className="space-y-3">
                {services.map(s => (
                  <div key={s.id} className="text-[15px] text-slate-700 font-medium pl-8 border-l-2 border-slate-100">
                    {s.title}
                  </div>
                ))}
              </div>
            </MotionSection>
          )}

          {/* I am lending */}
          {items.length > 0 && (
            <MotionSection delay={0.3}>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-bold text-slate-900">Available to borrow</h3>
              </div>
              <div className="space-y-3">
                {items.map(i => (
                  <div key={i.id} className="text-[15px] text-slate-700 font-medium pl-8 border-l-2 border-slate-100">
                    {i.title}
                  </div>
                ))}
              </div>
            </MotionSection>
          )}

          {/* Description / About */}
          {talent.description && (
            <MotionSection delay={0.4}>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-bold text-slate-900">About</h3>
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed font-medium pl-8">
                "{talent.description}"
              </p>
            </MotionSection>
          )}

          {/* Trust & Availability */}
          <MotionSection delay={0.5} className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Available</div>
              <div className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" /> Weekends
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Community</div>
              <div className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Verified
              </div>
            </div>
          </MotionSection>
        </div>
      </div>
    </div>
  );
}
