"use client";

import { Link2, Quote } from "lucide-react";
import Link from "next/link";
import { CarouselWrapper } from "./carousel-wrapper";

export interface Story {
  id: string;
  type: "item" | "space" | "skill";
  title: string;
  text: string;
  avatar: string | null;
  ownerName: string;
  href: string;
}

export function CommunityStories({ stories }: { stories: Story[] }) {
  if (!stories || stories.length === 0) return null;

  return (
    <CarouselWrapper>
      {stories.map((story, i) => (
        <Link 
          key={story.id} 
          href={story.href} 
          style={{ animationDelay: `${250 + (i * 100)}ms`, animationFillMode: "both" }}
          className="flex-none w-[260px] bg-white border border-slate-100 rounded-3xl p-5 snap-center shadow-sm hover:scale-[1.02] hover:shadow-md transition-all relative overflow-hidden group zoom-in-[0.9]"
        >
          {/* Decorative Quote Icon */}
          <div className="absolute top-4 right-4 text-slate-100 group-hover:text-indigo-50 transition-colors">
            <Quote className="w-12 h-12 rotate-180" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm shrink-0">
                {story.avatar ? (
                  <img src={story.avatar} alt={story.ownerName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm bg-indigo-50">👤</div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">{story.ownerName}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500">
                  {story.type === "item" ? "Library" : story.type === "space" ? "Space" : "Discover"}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-700 font-medium leading-relaxed mb-4 line-clamp-4">
              "{story.text}"
            </p>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
              View {story.type === 'item' ? 'Item' : story.type === 'space' ? 'Space' : 'Profile'}
              <Link2 className="w-3 h-3" />
            </div>
          </div>
        </Link>
      ))}
    </CarouselWrapper>
  );
}
