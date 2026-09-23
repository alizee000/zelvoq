"use client";

import { BellRing, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { resolveKnockKnock } from "@/app/actions/knock-knocks";

export function KnockKnockRadar({ knockKnocks }: { knockKnocks: any[] }) {
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  if (!knockKnocks || knockKnocks.length === 0) return null;

  const activeKnock = knockKnocks[0]; // Show the most recent one

  const handleHelp = async () => {
    setResolvingId(activeKnock.id);
    try {
      await resolveKnockKnock(activeKnock.id);
    } catch (e) {
      console.error(e);
      setResolvingId(null);
    }
  };

  return (
    <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-slate-900 p-1 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
      {/* Pulsing radar backgrounds */}
      <div className="absolute top-1/2 left-8 w-12 h-12 -translate-y-1/2 bg-rose-500 rounded-full animate-ping opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-8 w-12 h-12 -translate-y-1/2 bg-rose-500 rounded-full animate-pulse opacity-40 pointer-events-none" />
      
      <div className="relative bg-slate-900 rounded-[1.8rem] p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
              <BellRing className="w-5 h-5 text-rose-500 animate-[wiggle_1s_ease-in-out_infinite]" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-0.5">SOS Knock-Knock</div>
              <div className="text-white font-medium text-sm">{activeKnock.creator_name} &bull; {activeKnock.tower}</div>
            </div>
          </div>
          <div className="text-xs font-bold text-slate-500 bg-slate-800 px-3 py-1.5 rounded-full">Active Now</div>
        </div>
        
        <p className="text-xl font-black text-white leading-tight">"{activeKnock.title}"</p>
        
        <button 
          onClick={handleHelp}
          disabled={resolvingId === activeKnock.id}
          className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 mt-1"
        >
          {resolvingId === activeKnock.id ? (
            "Resolving..."
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              I can help!
            </>
          )}
        </button>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wiggle {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
      `}} />
    </div>
  );
}
