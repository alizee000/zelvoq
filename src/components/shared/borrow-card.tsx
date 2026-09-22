"use client";

import { User, MapPin, HandHeart, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ActionModal } from "./action-modal";
import { useState } from "react";

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

export function BorrowCard({ id, name, ownerName, tower, condition, available, imageFallback, description }: BorrowCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  const handleRequest = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRequested(true);
  };

  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col gap-5 relative overflow-hidden group">
      <div className="flex gap-4">
        <div className="w-16 h-16 shrink-0 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl">
          {imageFallback}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">
            {ownerName} · {tower}
          </span>
          <h3 className="font-black text-lg text-slate-900 leading-tight">{name}</h3>
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

      {isRequested ? (
        <div className="flex gap-2 mt-2">
          <div className="flex-[0.8] py-4 rounded-xl font-bold text-[13px] bg-green-50 text-green-600 flex items-center justify-center gap-1.5 border border-green-200">
            <CheckCircle2 className="w-4 h-4" /> Requested
          </div>
          <Link href={`/chat/${id}`} className="flex-1 py-4 rounded-xl font-bold text-[13px] bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-sm shadow-indigo-500/20">
            <MessageSquare className="w-4 h-4" /> Chat Now
          </Link>
        </div>
      ) : (
        <button 
          disabled={!available}
          onClick={() => setIsModalOpen(true)}
          className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm mt-2 
            ${available 
              ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] shadow-indigo-500/20" 
              : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
        >
          {available ? "Request to Borrow" : "Currently Unavailable"}
        </button>
      )}

      <ActionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRequest}
        title={`Borrow ${name}?`}
        description={
          <>
            You are requesting to borrow <strong>{name}</strong> from <strong>{ownerName}</strong> ({tower}). They will be notified of your request.
          </>
        }
        confirmText="Send Request"
        icon={<HandHeart className="w-6 h-6" />}
      />
    </div>
  );
}
