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
        <div className="w-16 h-16 shrink-0 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
          {imageFallback}
        </div>
        <div className="flex-1 flex flex-col justify-start">
          <Badge variant="secondary" className="w-fit bg-slate-100 text-slate-600 border-slate-200 text-[9px] mb-2 uppercase tracking-wider font-bold">
            {ownerName} · {tower}
          </Badge>
          <h3 className="font-bold text-slate-900 leading-tight">{name}</h3>
        </div>
      </div>
      
      <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-wrap">{description}</p>
      
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mt-2 space-y-3">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <span className={available ? "text-green-600" : "text-slate-500"}>
            {available ? "AVAILABLE TO BORROW" : "CURRENTLY BORROWED"}
          </span>
          <span className="text-indigo-500 flex items-center gap-1">
            Condition: {condition}
          </span>
        </div>
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
