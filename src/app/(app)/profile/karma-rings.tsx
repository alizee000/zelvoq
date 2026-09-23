"use client";

import { HandHeart, Target, HelpCircle } from "lucide-react";

export function KarmaRings({ lendCount, hostCount, helpCount }: { lendCount: number, hostCount: number, helpCount: number }) {
  // Goals for filling the rings
  const LEND_GOAL = 5;
  const HOST_GOAL = 3;
  const HELP_GOAL = 10;

  const lendPct = Math.min((lendCount / LEND_GOAL) * 100, 100);
  const hostPct = Math.min((hostCount / HOST_GOAL) * 100, 100);
  const helpPct = Math.min((helpCount / HELP_GOAL) * 100, 100);

  const Circle = ({ color, pct, size, stroke }: any) => {
    const radius = (size - stroke) / 2;
    const circ = radius * 2 * Math.PI;
    const strokePct = ((100 - pct) * circ) / 100;
    
    return (
      <svg width={size} height={size} className="-rotate-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <circle
          r={radius}
          cx={size/2}
          cy={size/2}
          fill="transparent"
          stroke={color}
          strokeWidth={stroke}
          strokeOpacity={0.2}
        />
        <circle
          r={radius}
          cx={size/2}
          cy={size/2}
          fill="transparent"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={strokePct}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
    );
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden mb-8">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            Koodu Karma <SparklesIcon />
          </h3>
          <p className="text-sm text-slate-400 font-medium">Your community impact</p>
        </div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        {/* The Rings */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <Circle color="#ef4444" pct={lendPct} size={128} stroke={12} />  {/* Red/Rose */}
          <Circle color="#a855f7" pct={hostPct} size={96} stroke={12} />   {/* Purple */}
          <Circle color="#10b981" pct={helpPct} size={64} stroke={12} />   {/* Emerald */}
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1 ml-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <HandHeart className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400">Lending</div>
              <div className="text-sm font-bold text-white">{lendCount} / {LEND_GOAL} items</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400">Hosting</div>
              <div className="text-sm font-bold text-white">{hostCount} / {HOST_GOAL} events</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400">Helping</div>
              <div className="text-sm font-bold text-white">{helpCount} / {HELP_GOAL} favors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
