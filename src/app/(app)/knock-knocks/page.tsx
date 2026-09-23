import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, BellRing, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { KnockKnockListClient } from "./knock-knock-list-client";

export default async function KnockKnocksPage() {
  const supabase = await createClient();
  
  // Fetch active Knock-Knocks
  const { data: knockKnocks } = await supabase
    .from("knock_knocks")
    .select("*")
    .is("resolved_by", null)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
        <Link href="/home" className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Neighbor SOS
          </h1>
          <p className="text-xs text-slate-500 font-medium">Help neighbors with quick favors</p>
        </div>
      </div>

      <div className="px-6 pt-6">
        <KnockKnockListClient initialKnocks={knockKnocks || []} />
      </div>
    </div>
  );
}
