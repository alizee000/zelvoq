"use client";

import { useState, useEffect } from "react";
import { Zap, Cpu, Activity, ShieldAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LiveFeedClient({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [isMounted, setIsMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setIsMounted(true);
    // Set up real-time subscription for new posts
    const channel = supabase
      .channel("feed_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "feed_posts",
        },
        (payload) => {
          // Prevent duplicates if we optimistically added it
          setPosts((current) => {
            if (current.some(p => p.id === payload.new.id)) return current;
            return [payload.new, ...current].slice(0, 3);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <section className="flex flex-col bg-white/70 backdrop-blur-xl border border-white/50 rounded-[2rem] p-6 shadow-sm mb-4 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="flex items-center justify-between shrink-0 relative z-10">
        <h2 className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-slate-800">
          <Zap className="w-4 h-4 text-amber-500" />
          Live Community Feed
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Live</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 mb-5 mt-1 shrink-0">Real-time updates, requests, and activity from your neighbors.</p>
      
      <div className="flex flex-col gap-4 relative z-10">
        {posts.length > 0 ? posts.map((post: any) => {
          // Determine color based on type
          let colorStr = "bg-indigo-500";
          let textColorStr = "text-indigo-700";
          let Icon = Cpu;
          
          if (post.type === 'offer') {
            colorStr = "bg-green-500";
            textColorStr = "text-green-700";
            Icon = Activity;
          } else if (post.type === 'alert') {
            colorStr = "bg-amber-500";
            textColorStr = "text-amber-700";
            Icon = ShieldAlert;
          }

          return (
            <div key={post.id} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl relative overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colorStr}`} />
              <div className="flex justify-between items-center mb-2">
                <div className={`text-[10px] ${textColorStr} font-bold uppercase tracking-wider flex items-center gap-1`}>
                  <Icon className="w-3 h-3" /> {post.type}
                </div>
                <div className="text-[10px] text-slate-500 font-bold">
                  {post.id.toString().startsWith("temp-") 
                    ? "Just now" 
                    : (isMounted ? new Date(post.created_at).toLocaleDateString() : "")}
                </div>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="text-slate-900 font-bold hover:text-indigo-600 transition-colors cursor-pointer">{post.author_name}</span> ({post.tower}) {post.content}
              </div>
            </div>
          );
        }) : (
          <div className="p-4 text-center text-sm text-slate-500">
            The feed is quiet right now.
          </div>
        )}
      </div>
    </section>
  );
}
