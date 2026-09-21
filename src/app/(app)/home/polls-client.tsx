"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Vote, CheckCircle2, AlertTriangle, PartyPopper } from "lucide-react";
import { castVote } from "@/app/actions/polls";

export function PollsClient({ initialActive, initialCompleted }: { initialActive: any[], initialCompleted: any[] }) {
  const [activePolls, setActivePolls] = useState(initialActive);
  const [completedPolls, setCompletedPolls] = useState(initialCompleted);

  const handleVote = async (poll: any, vote: 'yes' | 'no') => {
    // Optimistically remove from active and add to completed
    setActivePolls(prev => prev.filter(p => p.id !== poll.id));
    
    // Optimistically add to completed (assuming they are the only voter for now to keep it simple, or just a placeholder)
    setCompletedPolls(prev => [{
      ...poll,
      yesVotes: vote === 'yes' ? 1 : 0,
      totalVotes: 1,
      percentage: vote === 'yes' ? 100 : 0,
      userVote: vote
    }, ...prev]);

    try {
      await castVote(poll.id, vote);
    } catch (e) {
      console.error(e);
      // Revert on error (skipped for simplicity in prototype)
    }
  };

  if (activePolls.length === 0 && completedPolls.length === 0) {
    return null;
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'budget': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'event': return <PartyPopper className="w-5 h-5 text-purple-500" />;
      default: return <Vote className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4 px-1">
        <Vote className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-black tracking-tight text-slate-900">Democracy</h2>
      </div>

      {/* Active Polls - Swipe Cards */}
      <div className="relative h-64 w-full mb-6">
        {activePolls.length > 0 ? (
          <AnimatePresence>
            {activePolls.map((poll, index) => {
              const isTop = index === activePolls.length - 1;
              return (
                <motion.div
                  key={poll.id}
                  className="absolute inset-0 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xl flex flex-col justify-between"
                  style={{ zIndex: index }}
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ 
                    scale: isTop ? 1 : 0.95 - ((activePolls.length - 1 - index) * 0.05),
                    opacity: 1,
                    y: isTop ? 0 : ((activePolls.length - 1 - index) * -10)
                  }}
                  exit={{ x: poll.exitX || 0, opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x;
                    if (swipe > 100) {
                      poll.exitX = 200;
                      handleVote(poll, 'yes');
                    } else if (swipe < -100) {
                      poll.exitX = -200;
                      handleVote(poll, 'no');
                    }
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {getCategoryIcon(poll.category)}
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{poll.category}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{poll.title}</h3>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">{poll.description}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-4">
                    <button 
                      onClick={() => { poll.exitX = -200; handleVote(poll, 'no'); }}
                      className="flex-1 flex items-center justify-center gap-2 bg-rose-50 text-rose-600 py-3 rounded-2xl font-bold hover:bg-rose-100 transition-colors"
                    >
                      <X className="w-5 h-5" /> No
                    </button>
                    <button 
                      onClick={() => { poll.exitX = 200; handleVote(poll, 'yes'); }}
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 py-3 rounded-2xl font-bold hover:bg-emerald-100 transition-colors"
                    >
                      <Check className="w-5 h-5" /> Yes
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 bg-slate-50 border border-slate-200 border-dashed rounded-[2rem] flex flex-col items-center justify-center text-center p-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
            <p className="text-sm font-bold text-slate-900">You're all caught up!</p>
            <p className="text-xs font-medium text-slate-500 mt-1">No active decisions to make.</p>
          </div>
        )}
      </div>

      {/* Completed Polls Results */}
      {completedPolls.length > 0 && (
        <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Past Decisions</h3>
          <div className="flex flex-col gap-4">
            {completedPolls.map((poll) => (
              <div key={poll.id} className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-bold text-slate-900">{poll.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${poll.percentage >= 50 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {poll.percentage >= 50 ? 'Passed' : 'Failed'}
                  </span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${poll.percentage >= 50 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ width: `${poll.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>{poll.percentage}% Yes</span>
                  <span>{poll.totalVotes} Votes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
