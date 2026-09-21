"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PLACEHOLDERS = [
  "Need a birthday cake this weekend...",
  "Who plays badminton?",
  "Looking for a yoga instructor...",
  "Who can teach my child maths?",
  "Need a photographer for Sunday...",
  "Who knows about home loans?"
];

export function AISearchBar() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/ask" className="block w-full relative group cursor-pointer">
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transition-opacity duration-500 -z-10",
          "opacity-0 group-hover:opacity-100"
        )} 
      />
      
      <div className="relative flex items-center w-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(0,255,255,0.05)] hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl overflow-hidden transition-all duration-300">
        <div className="pl-4 pr-3 py-4 flex items-center justify-center text-cyan-400" style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.8))' }}>
          <Sparkles className="w-5 h-5 transition-transform duration-700 group-hover:scale-110" />
        </div>
        
        <div className="flex-1 py-4 text-base font-mono w-full">
          <span className="text-cyan-200/50 animate-pulse transition-all duration-300" key={placeholderIndex}>
            {PLACEHOLDERS[placeholderIndex]}
          </span>
        </div>

        <div className="mr-2 p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ boxShadow: '0 0 10px rgba(0,255,255,0.2)' }}>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}
