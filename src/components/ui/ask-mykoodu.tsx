"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const PLACEHOLDERS = [
  "Who makes great cakes here?",
  "Anyone playing badminton Saturday?",
  "Who teaches guitar?",
  "Who can help with a laptop?",
  "Who loves photography?"
];

export function AskMyKoodu() {
  const [index, setIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isFocused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isFocused]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q");
    if (q) {
      router.push(`/discover?q=${encodeURIComponent(q as string)}`);
    }
  };

  return (
    <div className="w-full relative group mt-2 mb-8">
      <form onSubmit={handleSubmit} className="relative z-10">
        <div 
          className={`absolute inset-0 bg-slate-900 rounded-[2rem] transition-all duration-500 ${isFocused ? 'scale-[1.02] shadow-2xl shadow-slate-900/20' : 'scale-100 shadow-sm'}`}
        />
        
        <div className="relative flex items-center p-2">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          
          <div className="flex-1 relative h-12 flex items-center">
            <AnimatePresence mode="wait">
              {!isFocused && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center text-[15px] text-slate-400 pointer-events-none"
                >
                  {PLACEHOLDERS[index]}
                </motion.div>
              )}
            </AnimatePresence>
            
            <input
              type="text"
              name="q"
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                if (!e.target.value) setIsFocused(false);
              }}
              className="w-full h-full bg-transparent border-none text-[15px] text-white placeholder:text-transparent focus:ring-0 px-0 relative z-20"
              placeholder={isFocused ? "Ask MyKoodu anything..." : ""}
              autoComplete="off"
            />
          </div>

          <button 
            type="submit"
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all"
          >
            <Search className="w-5 h-5 text-slate-900" />
          </button>
        </div>
      </form>
    </div>
  );
}
