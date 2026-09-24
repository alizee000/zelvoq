"use client";

import { Clock, MapPin, HandHeart, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionModal } from "./action-modal";
import { useState, useEffect } from "react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";

interface BorrowCardProps {
  id: string;
  name: string;
  description: string;
  ownerName: string;
  tower: string;
  condition: string;
  available: boolean;
  imageFallback: string;
  currentUserName?: string;
}

export function BorrowCard({ id, name, description, ownerName, tower, condition, available, imageFallback, currentUserName }: BorrowCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(`borrow_${id}`);
    if (savedState === 'true') setIsRequested(true);
  }, [id]);

  const handleRequest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsRequested(true);
    localStorage.setItem(`borrow_${id}`, 'true');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col gap-4 relative overflow-hidden group">
      
      <div className="flex justify-between items-start">
        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">
          {imageFallback}
        </div>
        <Badge className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border-none ${
          available ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
        }`}>
          {available ? "Available" : "Borrowed"}
        </Badge>
      </div>

      <div>
        <h3 className="font-black text-lg text-slate-900 leading-tight">{name}</h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{description}</p>
      </div>
      
      <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 mt-2">
        <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
           <MapPin className="w-3.5 h-3.5 text-indigo-500" />
           {ownerName} • {tower}
        </div>
      </div>

      {/* Action Button & Chat */}
      <div className="mt-2 flex flex-col gap-3">
        {!isRequested ? (
           <button 
             onClick={() => setIsModalOpen(true)}
             className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800"
           >
             Request to Book
           </button>
        ) : (
           <Link 
             href={`/chat/${id}`}
             className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
           >
             <MessageCircle className="w-4 h-4" /> 
             Chat with {ownerName.split(' ')[0]} 🎉
           </Link>
        )}

        {isRequested && (
          <button onClick={() => { setIsRequested(false); localStorage.removeItem(`borrow_${id}`); }} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-1 transition-colors text-center w-full block">Cancel Request</button>
        )}
      </div>

      <ActionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRequest}
        title={`Book ${name}?`}
        description={
          <>
            You are requesting to book <strong>{name}</strong> from <strong>{ownerName}</strong>. You'll be able to chat with them to arrange pickup.
          </>
        }
        confirmText="Send Request"
        icon={<HandHeart className="w-6 h-6" />}
      />
    </div>
  );
}
