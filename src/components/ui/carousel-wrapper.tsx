"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CarouselWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <button 
        onClick={() => scroll("left")}
        className="absolute -left-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.1)] flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:scale-110 border border-slate-100 opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button 
        onClick={() => scroll("right")}
        className="absolute -right-4 top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.1)] flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:scale-110 border border-slate-100 opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x hide-scrollbar scroll-smooth">
        {children}
      </div>
    </div>
  );
}
