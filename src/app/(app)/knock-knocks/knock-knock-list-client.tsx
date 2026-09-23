"use client";

import { BellRing, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { resolveKnockKnock } from "@/app/actions/knock-knocks";
function formatDistanceToNow(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

export function KnockKnockListClient({ initialKnocks }: { initialKnocks: any[] }) {
  const [knocks, setKnocks] = useState(initialKnocks);
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  const handleHelp = async (id: string) => {
    setResolvingId(id);
    try {
      await resolveKnockKnock(id);
      // Remove from list optimistically
      setKnocks(knocks.filter(k => k.id !== id));
    } catch (e) {
      console.error(e);
    } finally {
      setResolvingId(null);
    }
  };

  if (knocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 border-2 border-white shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">All clear!</h3>
        <p className="text-sm text-slate-500 max-w-[200px]">Nobody in your community currently needs a quick favor.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {knocks.map((knock) => (
        <div key={knock.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFF1F2] flex items-center justify-center text-rose-500 font-bold text-sm shrink-0">
                {knock.creator_name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{knock.creator_name}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{knock.tower}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(knock.created_at))}
            </div>
          </div>
          
          <div className="flex items-start gap-2 mb-6">
            <BellRing className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-base font-bold text-slate-900 leading-snug">"{knock.title}"</p>
          </div>
          
          <button 
            onClick={() => handleHelp(knock.id)}
            disabled={resolvingId === knock.id}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {resolvingId === knock.id ? (
              "Resolving..."
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                I can help!
              </>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
