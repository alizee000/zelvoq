import os

new_code = """"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, MessageCircle, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";

interface LiveKnocksProps {
  knocks: any[];
  userFirstName: string;
  userImageUrl?: string;
}

export function LiveKnocks({ knocks, userFirstName, userImageUrl }: LiveKnocksProps) {
  const [activeUser, setActiveUser] = useState<any | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  // 1. Group knocks by user
  const groupedKnocks = knocks.reduce((acc: any, knock: any) => {
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

  // Fallback demo data if empty
  if (usersList.length === 0) {
    usersList = [
      {
        owner_name: 'Sarah Jenkins',
        image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        tower: 'Tower A',
        knocks: [
          {
            id: 'demo-1',
            title: 'Does anyone have a power drill I can borrow for 20 mins? Need to mount a TV!',
            created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          },
          {
            id: 'demo-1-b',
            title: 'Also looking for 2 screws (size 8) if anyone has spares!',
            created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          }
        ]
      },
      {
        owner_name: 'David Chen',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        tower: 'Tower C',
        knocks: [
          {
            id: 'demo-2',
            title: 'Running short on eggs! Can I borrow 2 eggs for a recipe? Will replace tomorrow!',
            created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          }
        ]
      }
    ];
  }

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
      <div className="w-full pt-6 pb-2 pl-6 overflow-hidden">
        <div className="flex items-center gap-1 mb-3 pr-6">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight uppercase">Live Knocks</h2>
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ml-1" />
        </div>

        <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pr-6 pb-2">
          
          {/* Create New Knock Button */}
          <Link href="/add" className="flex flex-col items-center gap-2 snap-start shrink-0 group">
            <div className="relative w-[72px] h-[72px]">
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
          </Link>

          {/* Active User Stories */}
          {usersList.map((user: any, idx) => (
            <button 
              key={idx} 
              onClick={() => { setActiveUser(user); setStoryIndex(0); setProgress(0); }}
              className="flex flex-col items-center gap-2 snap-start shrink-0 group"
            >
              <div className="relative w-[72px] h-[72px]">
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

      {/* Story Modal View using React Portal */}
      {isMounted && createPortal(
        <AnimatePresence>
          {activeUser && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-xl p-4 sm:p-6"
              onClick={() => setActiveUser(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-md bg-white rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col h-[70vh] sm:h-auto sm:min-h-[500px]"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Tap Zones for Next/Prev */}
                <div className="absolute inset-0 z-10 flex">
                   <div className="w-1/3 h-full" onClick={handlePrevStory} />
                   <div className="w-2/3 h-full" onClick={handleNextStory} />
                </div>

                {/* Segmented Progress Bars */}
                <div className="absolute top-0 left-0 right-0 p-3 z-30 flex gap-1.5 bg-gradient-to-b from-black/50 to-transparent pt-4 px-4">
                  {activeUser.knocks.map((_: any, i: number) => (
                    <div key={i} className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden backdrop-blur-sm">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-75 ease-linear" 
                        style={{ width: i < storyIndex ? '100%' : i === storyIndex ? `${progress}%` : '0%' }} 
                      />
                    </div>
                  ))}
                </div>

                {/* Story Header */}
                <div className="absolute top-0 left-0 w-full pt-8 pb-4 px-5 z-20 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100">
                      {activeUser.image_url ? (
                        <img src={activeUser.image_url} alt={activeUser.owner_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm bg-gradient-to-br from-amber-100 to-orange-100">👋</div>
                      )}
                    </div>
                    <div className="flex flex-col text-white drop-shadow-md">
                      <span className="font-bold text-[15px] leading-tight">{activeUser.owner_name}</span>
                      <span className="text-[11px] font-medium opacity-90">{formatTimeAgo(activeUser.knocks[storyIndex].created_at || new Date().toISOString())}</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveUser(null)} className="pointer-events-auto w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors backdrop-blur-md">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Story Content Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 z-0" />
                
                {/* Story Text Content */}
                <div className="relative z-0 flex-1 flex items-center justify-center p-8 text-center mt-16 pointer-events-none">
                  <h3 className="text-3xl font-black text-white leading-tight drop-shadow-sm">
                    "{activeUser.knocks[storyIndex].title}"
                  </h3>
                </div>

                {/* Bottom Action Bar */}
                <div className="relative z-30 bg-white p-5 pb-8 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-2 mb-4 justify-center">
                     <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                       <Clock className="w-3.5 h-3.5" /> Expires in 24h
                     </div>
                     {activeUser.tower && (
                       <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                         <MapPin className="w-3.5 h-3.5" /> {activeUser.tower}
                       </div>
                     )}
                  </div>
                  
                  <button onClick={() => setActiveUser(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[16px] py-4 rounded-2xl transition-transform active:scale-95 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> I can help!
                  </button>
                </div>

              </motion.div>
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
"""

with open('src/components/ui/live-knocks.tsx', 'w') as f:
    f.write(new_code)
