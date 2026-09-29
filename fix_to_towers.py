with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

new_code = """"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, User, Zap, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function HiveNetwork({ talents }: { talents: any[] }) {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Generate a mock apartment building layout
  const TOWERS = ["Tower A", "Tower B"];
  const FLOORS = 8;
  const FLATS_PER_FLOOR = 4;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Randomly distribute the talents into specific flats so the building feels alive
  const buildingData = useMemo(() => {
    const data: any = {};
    TOWERS.forEach(t => {
      data[t] = {};
      for (let f = FLOORS; f >= 1; f--) {
        data[t][f] = new Array(FLATS_PER_FLOOR).fill(null);
      }
    });

    // Place talents randomly
    talents.forEach((talent) => {
      const tower = TOWERS[Math.floor(Math.random() * TOWERS.length)];
      const floor = Math.floor(Math.random() * FLOORS) + 1;
      const flatIndex = Math.floor(Math.random() * FLATS_PER_FLOOR);
      
      // If flat is already taken by a random placement, just overwrite it for the prototype
      data[tower][floor][flatIndex] = talent;
    });

    return data;
  }, [talents]);

  if (!isMounted) return <div className="fixed inset-0 bg-[#0F172A] z-50" />;

  return (
    <div className="fixed inset-0 bg-[#0F172A] z-50 overflow-y-auto overflow-x-hidden flex flex-col font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0F172A] to-[#0F172A] pointer-events-none fixed" />

      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between p-6 bg-gradient-to-b from-[#0F172A] to-transparent">
        <Link href="/home" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-950/50 px-4 py-2 rounded-full border border-indigo-500/30 backdrop-blur-md">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold tracking-wider">EXIT DIGITAL TWIN</span>
        </Link>
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase">Live Society</span>
        </div>
      </div>

      {/* Building Layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-end justify-center gap-8 p-8 min-h-max pb-32">
        {TOWERS.map((tower, tIndex) => (
          <div key={tower} className="flex flex-col items-center">
            {/* Tower Label */}
            <div className="flex items-center gap-2 mb-4 text-indigo-300 bg-indigo-950/40 px-4 py-1.5 rounded-full border border-indigo-500/30">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-black tracking-widest uppercase">{tower}</span>
            </div>

            {/* The Tower Structure */}
            <div className="bg-slate-900 border-2 border-slate-800 rounded-t-3xl p-4 shadow-2xl flex flex-col gap-2 relative">
              {/* Roof Details */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-slate-800 rounded-t-lg" />

              {/* Floors */}
              {Array.from({ length: FLOORS }).map((_, fIndex) => {
                const floorNum = FLOORS - fIndex;
                const flats = buildingData[tower][floorNum];

                return (
                  <div key={floorNum} className="flex items-center gap-2">
                    {/* Floor Number */}
                    <div className="w-6 text-[10px] font-bold text-slate-600 text-right pr-2">
                      {floorNum}F
                    </div>

                    {/* Flats (Windows) */}
                    <div className="flex gap-2 p-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
                      {flats.map((talent: any, flatIndex: number) => {
                        const isOccupied = !!talent;
                        const isSelected = selectedNode?.id === talent?.id;

                        return (
                          <motion.button
                            key={flatIndex}
                            onClick={() => isOccupied && setSelectedNode(talent)}
                            whileHover={isOccupied ? { scale: 1.1, zIndex: 10 } : {}}
                            className={`relative w-12 h-14 md:w-16 md:h-20 rounded-lg border-2 transition-all duration-300 flex items-center justify-center overflow-hidden
                              ${isOccupied 
                                ? (isSelected 
                                    ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.6)] cursor-pointer' 
                                    : 'bg-indigo-900/60 border-indigo-500/50 hover:bg-indigo-700 cursor-pointer')
                                : 'bg-slate-900 border-slate-800 cursor-default opacity-50'
                              }
                            `}
                          >
                            {/* Window Glare */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                            
                            {isOccupied && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative z-10 flex flex-col items-center gap-1"
                              >
                                {talent.image_url ? (
                                  <img src={talent.image_url} className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover border border-indigo-300 shadow-lg" />
                                ) : (
                                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-indigo-950 flex items-center justify-center border border-indigo-500 text-indigo-300">
                                    <User className="w-3 h-3 md:w-4 md:h-4" />
                                  </div>
                                )}
                                <span className="text-[8px] md:text-[9px] font-bold text-indigo-100 truncate w-full px-1 text-center">
                                  {talent.owner_name.split(' ')[0]}
                                </span>
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Details Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full z-40 p-4 md:p-6"
          >
            <div className="max-w-2xl mx-auto bg-slate-900/90 backdrop-blur-xl border-t border-x border-slate-700 rounded-t-3xl p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 shrink-0">
                  {selectedNode.image_url ? (
                    <img src={selectedNode.image_url} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center"><User className="w-8 h-8 text-slate-400" /></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">
                    {selectedNode.category} • {selectedNode.owner_name}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">{selectedNode.title}</h2>
                  <p className="text-sm text-slate-400 line-clamp-2">{selectedNode.description}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href={`/talent/${selectedNode.id}`} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-center text-sm font-bold py-3 rounded-xl transition-colors">
                  View Full Profile
                </Link>
                <button onClick={() => setSelectedNode(null)} className="px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold rounded-xl transition-colors border border-slate-700">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"""

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(new_code)
