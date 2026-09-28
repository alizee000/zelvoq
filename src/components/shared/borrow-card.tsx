"use client";

import { Hand, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BorrowCardProps {
  id: string;
  name: string;
  description: string;
  ownerName: string;
  tower: string;
  condition: string;
  available: boolean;
  imageFallback: string;
  currentUserName?: string | null;
}

export function BorrowCard({ id, name, description, ownerName, tower, available, imageFallback }: BorrowCardProps) {
  return (
    <Link 
      href={`/talent/${id}`}
      className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-slate-100"
    >
      <div className="w-full h-48 bg-slate-100 relative overflow-hidden">
        {imageFallback !== "📦" && !imageFallback.startsWith("http") ? (
          <div className="absolute inset-0 flex items-center justify-center text-5xl bg-slate-100">{imageFallback}</div>
        ) : (
          <Image src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80" alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm text-xs font-bold text-slate-700">
          <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {tower || "Resident"}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
        <p className="text-sm font-medium text-slate-500 mb-4 line-clamp-1">From {ownerName.split(' ')[0]}</p>
        
        <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
          </div>
        </div>
      </div>
    </Link>
  );
}
