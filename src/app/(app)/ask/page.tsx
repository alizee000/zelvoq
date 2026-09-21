"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Loader2, Star, MessageSquare, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function AskPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(false);
    
    // Simulate AI Search delay
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full pb-24 pt-8 px-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ease-out">
      
      <div className={cn(
        "flex flex-col w-full transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] relative",
        hasSearched ? "pt-4" : "pt-[15vh]"
      )}>
        <button 
          onClick={() => window.history.back()} 
          className="absolute left-0 top-0 p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors z-20"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>

        {!hasSearched && (
          <h1 className="text-4xl font-extrabold tracking-tight text-center mb-8 text-slate-900 mt-2">
            Ask Around
          </h1>
        )}

        <form onSubmit={handleSearch} className="w-full relative group mx-auto max-w-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl transition-opacity duration-500 opacity-50 group-focus-within:opacity-100 -z-10" />
          
          <div className="relative flex items-center w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm transition-all duration-300 focus-within:border-indigo-400 focus-within:shadow-md focus-within:ring-4 focus-within:ring-indigo-50">
            <div className="pl-6 pr-3 py-5 flex items-center justify-center text-indigo-500">
              {isSearching ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
            </div>
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you need help with?"
              className="flex-1 bg-transparent border-none outline-none py-5 text-base text-slate-900 placeholder:text-slate-400 w-full"
              autoFocus
            />

            <button 
              type="submit"
              disabled={!query.trim() || isSearching}
              className="mr-3 p-3 rounded-2xl bg-indigo-600 border border-transparent text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-indigo-700 hover:scale-105 shadow-sm"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </form>

        {!hasSearched && !isSearching && (
          <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {["Find a badminton partner", "Need a photographer", "Yoga instructor", "Math tutor"].map((suggestion) => (
              <button 
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors shadow-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {hasSearched && (
        <div className="mt-12 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
            <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500">2 Neighbors Found Nearby</h2>
          </div>

          <div className="space-y-4">
            
            {/* Match 1 */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex flex-col gap-5 items-start relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
              
              <div className="flex items-center gap-4 flex-1 w-full z-10">
                <div className="relative w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-500 shrink-0 border border-indigo-100 overflow-hidden shadow-sm">
                  <Image src="/images/zahida.jpg" alt="Zahida" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    Zahida
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold uppercase tracking-widest">92% Match</span>
                  </h3>
                  <p className="text-slate-500 text-xs font-semibold mt-1 uppercase tracking-widest">Cake Specialist · RED BLOCK</p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-slate-500">23 ENDORSEMENTS</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 z-10" />

              <div className="flex-1 text-sm text-slate-600 leading-relaxed z-10">
                <span className="font-bold text-slate-900">Why them?</span> Specializes in birthday cakes and custom desserts, and indicated availability on weekends.
              </div>

              <div className="w-full flex gap-3 z-10">
                <Link href="/talent/zahida" className="flex-1">
                  <button className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-sm">
                    <MessageSquare className="w-4 h-4" />
                    Message Neighbor
                  </button>
                </Link>
              </div>
            </div>

            {/* Match 2 */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex flex-col gap-5 items-start hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4 flex-1 w-full">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-400 shrink-0 border border-slate-200 overflow-hidden relative">
                  <Image src="/images/priya.jpg" alt="Priya" fill className="object-cover transition-all" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    Priya
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-bold tracking-widest uppercase">78% Match</span>
                  </h3>
                  <p className="text-slate-500 text-xs font-semibold mt-1 uppercase tracking-widest">Baker · GREEN BLOCK</p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-slate-500">17 ENDORSEMENTS</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100" />

              <div className="flex-1 text-sm text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900">Why them?</span> Enjoys baking and taking custom orders for neighbours.
              </div>

              <div className="w-full flex gap-3">
                <Link href="/talent/priya" className="flex-1">
                  <button className="w-full px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center gap-2 shadow-sm">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
