"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Vote, CheckCircle2, AlertTriangle, PartyPopper, ChevronDown } from "lucide-react";
import { castVote } from "@/app/actions/polls";

export function PollsTile({ initialActive, initialCompleted }: { initialActive: any[], initialCompleted: any[] }) {
  const [activePolls, setActivePolls] = useState(initialActive);
  const [completedPolls, setCompletedPolls] = useState(initialCompleted);
  const [isOpen, setIsOpen] = useState(false);

  const handleVote = async (poll: any, vote: 'yes' | 'no') => {
    setActivePolls(prev => prev.filter(p => p.id !== poll.id));
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
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'budget': return <AlertTriangle className="w-6 h-6 text-amber-500" />;
      case 'event': return <PartyPopper className="w-6 h-6 text-purple-500" />;
      default: return <Vote className="w-6 h-6 text-indigo-500" />;
    }
  };

  const pendingCount = activePolls.length;

  return (
    <>
      {/* The Tile on Home Page */}
      <button 
        onClick={() => setIsOpen(true)}
        className="col-span-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2rem] p-6 shadow-xl shadow-indigo-600/20 text-white flex items-center justify-between hover:scale-[1.02] transition-transform relative overflow-hidden group"
      >
        <div className="absolute -right-10 -top-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Vote className="w-48 h-48" />
        </div>
        
        <div className="relative z-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Vote className="w-5 h-5 text-indigo-200" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100">Society Decisions</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight leading-tight">
            Democracy
          </h2>
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-xl font-black shadow-sm">
            {pendingCount}
          </div>
          <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mt-2">Pending</span>
        </div>
      </button>

      {/* The Fullscreen Modal when clicked */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 md:left-1/2 md:right-auto md:-translate-x-1/2 w-full md:max-w-md z-[100] bg-slate-900 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 pt-12 flex justify-between items-center z-20">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Liquid Democracy</h2>
                <p className="text-sm font-medium text-slate-400">Swipe to govern your society.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronDown className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Swipe Cards */}
            <div className="flex-1 relative flex items-center justify-center p-6 mb-12">
              {activePolls.length > 0 ? (
                <AnimatePresence>
                  {activePolls.map((poll, index) => {
                    const isTop = index === activePolls.length - 1;
                    return (
                      <motion.div
                        key={poll.id}
                        className="absolute w-full max-w-[340px] bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl flex flex-col"
                        style={{ zIndex: index, height: '460px' }}
                        initial={{ scale: 0.95, opacity: 0, y: 40 }}
                        animate={{ 
                          scale: isTop ? 1 : 0.95 - ((activePolls.length - 1 - index) * 0.05),
                          opacity: 1,
                          y: isTop ? 0 : ((activePolls.length - 1 - index) * -20)
                        }}
                        exit={{ x: poll.exitX || 0, y: poll.exitY || 0, opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                        drag={isTop ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        whileDrag={{ scale: 1.05, rotate: 2, cursor: "grabbing" }}
                        onDragEnd={(e, { offset }) => {
                          const swipe = offset.x;
                          if (swipe > 100) {
                            poll.exitX = 300;
                            poll.exitY = 50;
                            handleVote(poll, 'yes');
                          } else if (swipe < -100) {
                            poll.exitX = -300;
                            poll.exitY = 50;
                            handleVote(poll, 'no');
                          }
                        }}
                      >
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                          <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                            {getCategoryIcon(poll.category)}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{poll.category}</span>
                          <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{poll.title}</h3>
                          <p className="text-sm font-medium text-slate-500 leading-relaxed">{poll.description}</p>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-8">
                          <button 
                            onClick={() => { poll.exitX = -300; poll.exitY = 50; handleVote(poll, 'no'); }}
                            className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors shadow-sm"
                          >
                            <X className="w-8 h-8" strokeWidth={3} />
                          </button>
                          
                          <div className="flex flex-col items-center opacity-30">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Swipe</span>
                          </div>

                          <button 
                            onClick={() => { poll.exitX = 300; poll.exitY = 50; handleVote(poll, 'yes'); }}
                            className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center hover:bg-emerald-100 transition-colors shadow-sm"
                          >
                            <Check className="w-8 h-8" strokeWidth={3} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <div className="flex flex-col items-center justify-center text-center text-white h-full w-full">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">You're all caught up!</h2>
                  <p className="text-sm text-slate-400 max-w-[250px]">No pending decisions right now. Check back later.</p>
                </div>
              )}
            </div>
            
            {/* Results Section at bottom of modal */}
            {completedPolls.length > 0 && activePolls.length === 0 && (
              <div className="bg-white/5 border-t border-white/10 p-6 pb-12 overflow-y-auto max-h-[40vh]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                  <Vote className="w-4 h-4" /> Past Decisions
                </h3>
                
                <div className="flex flex-col gap-5">
                  {completedPolls.map((poll) => (
                    <div key={poll.id} className="flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-white">{poll.title}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${poll.percentage >= 50 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                          {poll.percentage >= 50 ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${poll.percentage >= 50 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                          style={{ width: `${poll.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>{poll.percentage}% Yes</span>
                        <span>{poll.totalVotes} Votes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
