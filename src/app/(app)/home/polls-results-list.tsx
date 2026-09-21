"use client";

import { useState } from "react";
import { Vote, ChevronDown, ChevronUp } from "lucide-react";

export function PollsResultsList({ completedPolls }: { completedPolls: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!completedPolls || completedPolls.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <div 
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-indigo-600">
          <span className="text-[10px] font-bold uppercase tracking-widest">Past Decisions</span>
        </div>
        <button className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 flex items-center gap-1 uppercase tracking-widest transition-colors">
          {isOpen ? 'Hide' : 'Show'}
          {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {completedPolls.map((poll) => (
            <div key={poll.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-bold text-slate-900 leading-tight pr-4">{poll.title}</span>
                <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded uppercase ${poll.percentage >= 50 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {poll.percentage >= 50 ? 'Passed' : 'Failed'}
                </span>
              </div>
              <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div 
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${poll.percentage >= 50 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${poll.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{poll.percentage}% Yes</span>
                <span>{poll.totalVotes} Votes</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
