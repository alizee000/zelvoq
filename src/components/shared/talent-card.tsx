"use client";

import { User, Star, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TalentCardProps {
  id: string;
  name: string;
  role: string;
  tower: string;
  endorsements: number;
  imageUrl?: string;
}

export function TalentCard({ id, name, role, tower, endorsements, imageUrl }: TalentCardProps) {
  return (
    <Link href={`/talent/${id}`} className="w-full shrink-0 group cursor-pointer block">
      <div className="aspect-[4/5] rounded-3xl relative overflow-hidden mb-3 bg-white border border-slate-200 shadow-sm group-hover:shadow-md transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10" />
        
        {/* Background Image or Placeholder */}
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold uppercase transition-transform duration-500 group-hover:scale-105 bg-indigo-50 text-indigo-200">
            {name.charAt(0)}
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <h4 className="text-white font-bold text-base leading-tight tracking-tight">{name}</h4>
          <div className="flex items-center gap-1 mt-1 text-white/80">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px] font-semibold">{tower}</span>
          </div>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-bold text-slate-800 line-clamp-1">{role}</p>
        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span>{endorsements} Endorsements</span>
        </div>
      </div>
    </Link>
  );
}
