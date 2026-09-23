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
    <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            Koodu Karma
          </h3>
          <p className="text-sm text-slate-500 font-medium">Your community impact</p>
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
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <HandHeart className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500">Lending</div>
              <div className="text-sm font-bold text-slate-900">{lendCount} / {LEND_GOAL} items</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500">Hosting</div>
              <div className="text-sm font-bold text-slate-900">{hostCount} / {HOST_GOAL} events</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500">Helping</div>
              <div className="text-sm font-bold text-slate-900">{helpCount} / {HELP_GOAL} favors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


