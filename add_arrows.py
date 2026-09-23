import re

with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    content = f.read()

# 1. Add useRef and Chevron icons
content = content.replace('import { useState } from "react";', 'import { useState, useRef } from "react";')
content = content.replace('import { Search, MapPin, Star, Sparkles, Filter } from "lucide-react";', 'import { Search, MapPin, Star, Sparkles, Filter, ChevronLeft, ChevronRight } from "lucide-react";')

# 2. Add scrollRef and scroll function inside DiscoverClient
hook_insertion = """  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };
"""
content = content.replace('  const [selectedCategory, setSelectedCategory] = useState<string>("all");', hook_insertion)

# 3. Add buttons and ref to the Carousel section
carousel_wrapper = """
        {/* Carousel Content */}
        <section className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[200ms] fill-mode-both relative group">
          {uniqueNeighbors.length > 0 ? (
            <>
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

              <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 snap-x hide-scrollbar scroll-smooth">
"""

pattern = re.compile(r'\{\/\* Carousel Content \*\/\}\s*<section className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-\[200ms\] fill-mode-both">\s*\{uniqueNeighbors\.length > 0 \? \(\s*<div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 snap-x hide-scrollbar">')
content = pattern.sub(carousel_wrapper.strip(), content)

# Also need to close the empty fragment we opened for the buttons `<>`
closing_pattern = re.compile(r'(<\/Link>\s*\)\)\}\s*<\/div>)')
content = closing_pattern.sub(r'\1\n            </>', content)


with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(content)

