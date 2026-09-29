"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, MessageCircle, Clock, MapPin, CheckCircle } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { createKnockKnock, resolveKnockKnock } from "@/app/actions/knock-knocks";

interface LiveKnocksProps {
  knocks: any[];
  userFirstName: string;
  userFullName?: string;
  userImageUrl?: string;
}

export function LiveKnocks({ knocks, userFirstName, userFullName, userImageUrl }: LiveKnocksProps) {
  const [activeUser, setActiveUser] = useState<any | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newKnockText, setNewKnockText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [optimisticKnocks, setOptimisticKnocks] = useState<any[]>([]);
  const [hiddenKnocks, setHiddenKnocks] = useState<Set<string>>(new Set());

  useEffect(() => setIsMounted(true), []);

    const handleCreate = async () => {
    if (!newKnockText.trim()) return;
    
    const textToSubmit = newKnockText;
    
    // Optimistic Mobile UI: Instantly close modal and show ring
    setIsCreating(false);
    setNewKnockText("");
    
    // Add fake local knock so it appears instantly
    const fakeKnock = {
      id: 'optimistic-' + Date.now(),
      title: textToSubmit,
      owner_name: userFullName || userFirstName,
      image_url: userImageUrl || '',
      created_at: new Date().toISOString(),
      tower: 'Sending...'
    };
    setOptimisticKnocks(prev => [fakeKnock, ...prev]);

    try {
      await createKnockKnock(textToSubmit);
      // Server will revalidate and we'll get the real data, 
      // but we can clear optimistic after a short delay
      setTimeout(() => setOptimisticKnocks([]), 2000);
    } catch (e) {
      console.error(e);
      setOptimisticKnocks([]); // Revert on failure
    }
  };

    const handleResolve = async () => {
    if (!activeUser) return;
    
    const currentKnock = activeUser.knocks[storyIndex];
    
    // Optimistic Mobile UI: Instantly close and hide
    setHiddenKnocks(prev => new Set(prev).add(currentKnock.id));
    setActiveUser(null);
    
    try {
      await resolveKnockKnock(currentKnock.id);
    } catch (e) {
      console.error(e);
      // Revert on failure
      setHiddenKnocks(prev => {
        const next = new Set(prev);
        next.delete(currentKnock.id);
        return next;
      });
    }
  };

  // Combine real and optimistic knocks
  const allKnocks = [...optimisticKnocks, ...knocks].filter(k => !hiddenKnocks.has(k.id));
  
  // 1. Group knocks by user
  const groupedKnocks = allKnocks.reduce((acc: any, knock: any) => {
    if (!acc[knock.owner_name]) {
      acc[knock.owner_name] = {
        owner_name: knock.owner_name,
        image_url: knock.image_url,
        tower: knock.tower,
        knocks: []
      };
    }
    acc[knock.owner_name].knocks.push(knock);
    return acc;
  }, {});

  let usersList = Object.values(groupedKnocks);

  const handleNextStory = () => {
    if (!activeUser) return;
    if (storyIndex < activeUser.knocks.length - 1) {
      setStoryIndex(storyIndex + 1);
      setProgress(0);
    } else {
      setActiveUser(null);
    }
  };

  const handlePrevStory = () => {
    if (!activeUser) return;
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  };

  // Auto-advance story timer
  useEffect(() => {
    if (!activeUser) {
      setProgress(0);
      return;
    }
    
    const duration = 5000; // 5 seconds per story
    const interval = 50;
    const step = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          handleNextStory();
          return 0; // reset for next story
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeUser, storyIndex]);

  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  return (
    <>
      <div className="w-full pt-2 pb-0 pl-6 overflow-hidden">
        <div className="flex items-center gap-1 mb-2 pr-6">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight uppercase">Live Knocks</h2>
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ml-1" />
        </div>

        <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pr-6 pb-2">
          
          {/* Create New Knock Button */}
          <button onClick={() => setIsCreating(true)} className="flex flex-col items-center gap-2 snap-start shrink-0 group">
            <div className="relative w-[64px] h-[64px]">
              <div className="absolute inset-0 rounded-full border-2 border-slate-200 border-dashed group-hover:border-amber-400 transition-colors" />
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                {userImageUrl ? (
                  <img src={userImageUrl} alt="You" className="w-full h-full object-cover opacity-50" />
                ) : (
                  <div className="w-full h-full bg-slate-100" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-amber-500 rounded-full border-2 border-[#FAFAFA] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                <Plus className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-500">Add Knock</span>
          </button>

          {/* Active User Stories */}
          {usersList.map((user: any, idx) => (
            <button 
              key={idx} 
              onClick={() => { setActiveUser(user); setStoryIndex(0); setProgress(0); }}
              className="flex flex-col items-center gap-2 snap-start shrink-0 group"
            >
              <div className="relative w-[64px] h-[64px]">
                {/* Glowing Story Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 p-[2.5px] group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#FAFAFA] rounded-full" />
                </div>
                {/* Avatar */}
                <div className="absolute inset-[4px] rounded-full overflow-hidden border border-slate-100 bg-slate-100 shadow-sm">
                  {user.image_url ? (
                    <img src={user.image_url} alt={user.owner_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl bg-gradient-to-br from-amber-100 to-orange-100">👋</div>
                  )}
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-900 truncate w-16 text-center">
                {user.owner_name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Story Modal View (Native Full-Screen Takeover) */}
      {isMounted && createPortal(
        <AnimatePresence>
          {activeUser && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, borderRadius: "2rem" }}
              animate={{ scale: 1, opacity: 1, borderRadius: "0rem" }}
              exit={{ scale: 0.9, opacity: 0, borderRadius: "2rem" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 inset-x-0 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 w-full sm:max-w-md z-[100] flex flex-col bg-white overflow-hidden shadow-2xl border-x border-slate-200"
            >
                {/* Tap Zones for Next/Prev */}
                <div className="absolute inset-0 z-20 flex">
                   <div className="w-1/3 h-full" onClick={handlePrevStory} />
                   <div className="w-2/3 h-full" onClick={handleNextStory} />
                </div>

                {/* Segmented Progress Bars */}
                <div className="absolute top-0 left-0 right-0 pt-4 px-4 z-40 flex gap-1.5 bg-gradient-to-b from-black/40 to-transparent pb-8 pointer-events-none">
                  {activeUser.knocks.map((_: any, i: number) => (
                    <div key={i} className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden backdrop-blur-md">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-75 ease-linear" 
                        style={{ width: i < storyIndex ? '100%' : i === storyIndex ? `${progress}%` : '0%' }} 
                      />
                    </div>
                  ))}
                </div>

                {/* Story Header */}
                <div className="absolute top-0 left-0 w-full pt-10 pb-4 px-5 z-30 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-md bg-slate-100">
                      {activeUser.image_url ? (
                        <img src={activeUser.image_url} alt={activeUser.owner_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm bg-gradient-to-br from-amber-100 to-orange-100">👋</div>
                      )}
                    </div>
                    <div className="flex flex-col text-white drop-shadow-md">
                      <span className="font-bold text-[15px] leading-tight">{activeUser.owner_name}</span>
                      <span className="text-[11px] font-medium text-white/90">{formatTimeAgo(activeUser.knocks[storyIndex].created_at || new Date().toISOString())}</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveUser(null)} className="pointer-events-auto w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors backdrop-blur-md active:scale-95">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Story Content Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 z-0" />
                
                {/* Story Text Content */}
                <div className="relative z-10 flex-1 flex items-center justify-center p-8 text-center mt-16 pointer-events-none">
                  <h3 className="text-4xl font-black text-white leading-tight drop-shadow-md">
                    "{activeUser.knocks[storyIndex].title}"
                  </h3>
                </div>

                {/* Bottom Action Bar */}
                <div className="relative z-30 bg-white p-6 pb-10 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-widest border border-slate-100">
                       <Clock className="w-3.5 h-3.5" /> 24h
                     </div>
                     {activeUser.tower && (
                       <div className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-widest border border-slate-100">
                         <MapPin className="w-3.5 h-3.5" /> {activeUser.tower}
                       </div>
                     )}
                  </div>
                  
                  <div className="w-full relative z-40">
                  {activeUser.owner_name === userFullName ? (
                    <button onClick={handleResolve} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[17px] py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm">
                      <CheckCircle className="w-5 h-5" /> Mark as Resolved
                    </button>
                  ) : (
                    <button onClick={() => setActiveUser(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[17px] py-4 rounded-2xl transition-all active:scale-[0.98] shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" /> I can help!
                    </button>
                  )}
                  </div>
                </div>

            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Inline Creation Modal (Native iOS Full-Screen Takeover - Light Mode) */}
      {isMounted && createPortal(
        <AnimatePresence>
          {isCreating && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 inset-x-0 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 w-full sm:max-w-md z-[120] flex flex-col bg-white/95 backdrop-blur-3xl shadow-2xl border-x border-slate-200"
            >
              {/* Top Controls */}
              <div className="w-full pt-12 pb-4 px-6 flex items-center justify-between">
                <button onClick={() => setIsCreating(false)} className="w-10 h-10 rounded-full bg-slate-100/80 backdrop-blur-md text-slate-500 hover:bg-slate-200 flex items-center justify-center active:scale-95 transition-all shadow-sm">
                  <X className="w-6 h-6" />
                </button>
                <div className="px-4 py-1.5 rounded-full bg-amber-50/80 border border-amber-100 backdrop-blur-md flex items-center gap-2 text-amber-600 shadow-sm">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">24H Knock</span>
                </div>
              </div>

              {/* Centered Massive Input */}
              <div className="flex-1 flex items-center justify-center px-8 relative">
                <textarea 
                  autoFocus
                  value={newKnockText}
                  onChange={(e) => setNewKnockText(e.target.value)}
                  placeholder="What do you need?"
                  className="w-full bg-transparent text-slate-900 text-center text-4xl sm:text-5xl font-black placeholder:text-slate-300 focus:outline-none resize-none leading-tight"
                  rows={4}
                />
              </div>

              {/* Bottom Action Bar */}
              <div className="p-8 pb-12 flex justify-end">
                <button 
                  onClick={handleCreate}
                  disabled={!newKnockText.trim()}
                  className="w-16 h-16 rounded-full bg-slate-900 text-white disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center active:scale-90 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.15)] disabled:shadow-none"
                >
                  <Plus className="w-8 h-8" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
