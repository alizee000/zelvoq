"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, User, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function HiveNetwork({ talents }: { talents: any[] }) {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Organize talents into logical clusters for the Living Network visual
  const clusters = useMemo(() => {
    const defaultClusters: Record<string, any[]> = {
      "Culinary Arts": [],
      "Technology": [],
      "Fitness & Sports": [],
      "Creative Arts": [],
      "Community": []
    };

    talents.forEach(t => {
      const title = (t.title || "").toLowerCase();
      if (title.includes("bake") || title.includes("cook") || title.includes("cake") || title.includes("food")) {
        defaultClusters["Culinary Arts"].push(t);
      } else if (title.includes("tech") || title.includes("code") || title.includes("laptop") || title.includes("repair")) {
        defaultClusters["Technology"].push(t);
      } else if (title.includes("fit") || title.includes("yoga") || title.includes("badminton") || title.includes("run")) {
        defaultClusters["Fitness & Sports"].push(t);
      } else if (title.includes("photo") || title.includes("paint") || title.includes("guitar") || title.includes("art")) {
        defaultClusters["Creative Arts"].push(t);
      } else {
        defaultClusters["Community"].push(t);
      }
    });

    // Remove empty clusters
    Object.keys(defaultClusters).forEach(k => {
      if (defaultClusters[k].length === 0) delete defaultClusters[k];
    });

    return defaultClusters;
  }, [talents]);

  if (!isMounted) return <div className="absolute inset-0 bg-[#050505] z-50" />;

  return (
    <div className="absolute inset-0 bg-[#050505] z-50 flex flex-col font-sans overflow-y-auto overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* Premium Dark Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Header Statistics (Linear / Arc Vibe) */}
      <div className="relative z-30 p-8 md:p-12">
        <Link href="/home" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium tracking-wide">Back to Home</span>
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Your Community
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">{talents.length + 142}</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Residents</span>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">{talents.length * 3 + 12}</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Capabilities</span>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">{Object.keys(clusters).length + 4}</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Active Clusters</span>
          </div>
        </div>
      </div>

      {/* The Living Network (Abstract Clusters) */}
      <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-8 pb-32 flex flex-col gap-16 md:gap-24">
        {Object.entries(clusters).map(([clusterName, clusterTalents], idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
            key={clusterName} 
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight">{clusterName}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6">
              {clusterTalents.map((talent: any) => (
                <motion.button
                  key={talent.id}
                  onClick={() => setSelectedNode(talent)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex flex-col items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all w-32 md:w-40"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-indigo-400/50 transition-colors bg-slate-900">
                    {talent.image_url ? (
                      <img src={talent.image_url} alt={talent.owner_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><User className="w-6 h-6 text-slate-600" /></div>
                    )}
                  </div>
                  <div className="text-center w-full">
                    <div className="text-sm font-bold text-white truncate w-full">{talent.owner_name.split(' ')[0]}</div>
                    <div className="text-[10px] text-slate-400 font-medium truncate w-full mt-0.5">{talent.title}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Premium Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-xl"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-[#111] border border-white/10 rounded-[2rem] p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#111] shadow-[0_0_0_2px_rgba(255,255,255,0.1)] mb-4 bg-slate-900">
                  {selectedNode.image_url ? (
                    <img src={selectedNode.image_url} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><User className="w-8 h-8 text-slate-600" /></div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{selectedNode.owner_name}</h2>
                <div className="text-sm font-medium text-indigo-400">{selectedNode.title}</div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-8">
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  {selectedNode.description}
                </p>
              </div>

              <div className="flex gap-3">
                <Link href={`/talent/${selectedNode.id}`} className="flex-1 bg-white text-black hover:bg-slate-200 text-center text-[15px] font-bold py-3.5 rounded-xl transition-colors">
                  View Profile
                </Link>
                <button onClick={() => setSelectedNode(null)} className="px-6 bg-transparent hover:bg-white/10 text-white text-[15px] font-bold rounded-xl transition-colors border border-white/20">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
