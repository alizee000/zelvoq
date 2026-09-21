"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface HiddenGemProps {
  id: string;
  name: string;
  avatarUrl: string;
  tower: string;
  headline: string;
  description: string;
  tags: string[];
}

export function HiddenGem({ id, name, avatarUrl, tower, headline, description, tags }: HiddenGemProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl p-[1px] group hologram-container">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 z-0" />
      
      <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-[calc(1.5rem-1px)] h-full border border-cyan-500/30 flex flex-col p-6 z-10 shadow-[inset_0_0_20px_rgba(0,255,255,0.05)]">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-cyan-400" style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.8))' }} />
          <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-300">Target Acquired</span>
        </div>
        
        <h3 className="text-lg font-medium text-slate-200 mb-4">
          Meet <span className="font-bold text-cyan-400 tracking-wide">{name}</span>.
          <br className="hidden md:block" />
          {headline}
        </h3>

        <div className="flex items-start gap-4 mb-5">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-cyan-500/50 bg-slate-950 hologram-container shadow-[0_0_10px_rgba(0,255,255,0.2)]">
            {avatarUrl ? (
              <Image src={avatarUrl} alt={name} fill className="object-cover hologram-image" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-lg font-medium hologram-image">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-medium">
              {tag}
            </Badge>
          ))}
        </div>

        <Link href={`/talent/${id}`} className="mt-auto flex items-center justify-between w-full p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/40 hover:bg-cyan-900/50 transition-colors group/btn shadow-[0_0_10px_rgba(0,255,255,0.1)]">
          <span className="text-sm font-bold text-cyan-100/90 tracking-wide uppercase text-[10px]">Access Database</span>
          <ArrowRight className="w-4 h-4 text-cyan-400 group-hover/btn:text-cyan-200 transition-all group-hover/btn:translate-x-1" style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.5))' }} />
        </Link>
      </div>
    </div>
  );
}
