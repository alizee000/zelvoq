"use client";

import { Users, Clock, ArrowRight, ShoppingBag, MessageSquare, CheckCircle2, MessageCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ActionModal } from "./action-modal";
import { useState, useEffect } from "react";
import { DeleteButton } from "./delete-button";

interface GroupBuyCardProps {
  id: string;
  title: string;
  vendor: string;
  targetQuantity: number;
  currentQuantity: number;
  originalPrice: number;
  discountedPrice: number;
  expiresInDays: number;
  imageFallback: string;
  currentUserName?: string;
  description: string;
}

export function GroupBuyCard({ id, title, vendor, targetQuantity, currentQuantity, originalPrice, discountedPrice, expiresInDays, imageFallback,
  currentUserName, description }: GroupBuyCardProps) {
  const progressPercent = Math.min(100, Math.round((currentQuantity / targetQuantity) * 100));
  const isGoalReached = currentQuantity >= targetQuantity;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(`deal_${id}`);
    if (savedState === 'true') setIsJoined(true);
  }, [id]);

  const handleJoin = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsJoined(true);
    localStorage.setItem(`deal_${id}`, 'true');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col gap-5 relative overflow-hidden group">
      <div className="flex gap-4">
        <div className="w-16 h-16 shrink-0 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl">
          {imageFallback}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
            {vendor}
          </span>
          <h3 className="font-black text-lg text-slate-900 leading-tight">
            {title}
          </h3>
        </div>
      </div>
      
      <p className="text-xs text-slate-500 line-clamp-2">{description}</p>
      
      {/* Pricing */}
      <div className="flex items-end gap-2 mt-2">
        <span className="text-2xl font-extrabold text-slate-900">₹{discountedPrice}</span>
        <span className="text-sm font-medium text-slate-400 line-through mb-1">₹{originalPrice}</span>
        <Badge className="ml-auto bg-green-100 text-green-700 border-none px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-1">
          Save ₹{originalPrice - discountedPrice}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase mb-3">
          <span className={isGoalReached ? "text-green-600" : "text-slate-500"}>
            {isGoalReached ? "GOAL REACHED!" : `${currentQuantity} / ${targetQuantity} JOINED`}
          </span>
          <span className="text-orange-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {expiresInDays}D LEFT
          </span>
        </div>
        
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${isGoalReached ? 'bg-green-500' : 'bg-orange-500'}`}
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      {/* Action Button & Chat */}
      <div className="mt-2 flex flex-col gap-3">
        {!isJoined ? (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 rounded-2xl font-black text-sm tracking-wide text-white transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:scale-95 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800"
          >
            Join Deal
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Link 
             href={`/chat/${id}`}
             className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
           >
             <MessageCircle className="w-4 h-4" /> 
             Enter Deal Chat 🎉
           </Link>
        )}

        {isJoined && (
          <button onClick={() => { setIsJoined(false); localStorage.removeItem(`deal_${id}`); }} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-1 transition-colors text-center w-full block">Leave Group Buy</button>
        )}
      </div>

      <ActionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleJoin}
        title={`Join ${title} Deal?`}
        description={
          <>
            You are committing to purchase this item from <strong>{vendor}</strong> for the discounted price of <strong>₹{discountedPrice}</strong>.
          </>
        }
        confirmText="Confirm Purchase"
        icon={<ShoppingBag className="w-6 h-6" />}
      />
    </div>
  );
}
