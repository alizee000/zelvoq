"use client";

import { User, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BorrowCardProps {
  id: string;
  name: string;
  ownerName: string;
  tower: string;
  condition: string;
  available: boolean;
  imageFallback: string;
  description: string;
}

export function BorrowCard({ name, ownerName, tower, condition, available, imageFallback, description }: BorrowCardProps) {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:shadow-md transition-all">
      <div className="flex gap-4">
        <div className="w-20 h-20 shrink-0 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
          {imageFallback}
        </div>
        <div className="flex-1 flex flex-col justify-start pt-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-slate-900 leading-tight line-clamp-2">{name}</h3>
          </div>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
            {ownerName[0]}
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{ownerName} · {tower}</span>
        </div>
        <Badge variant="secondary" className={available ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-100 text-slate-500 border-slate-200"}>
          {available ? "Available" : "Borrowed"}
        </Badge>
      </div>

      <button 
        disabled={!available}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm mt-2 
          ${available 
            ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02]" 
            : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
      >
        {available ? "Request to Borrow" : "Currently Unavailable"}
      </button>
    </div>
  );
}
