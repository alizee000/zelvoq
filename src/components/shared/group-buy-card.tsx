"use client";

import { Clock, ArrowRight, ShoppingBag, MessageCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ActionModal } from "./action-modal";
import { useState, useEffect } from "react";
import { triggerHaptic } from "@/lib/utils/haptics";
import Image from "next/image";

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

export function GroupBuyCard({ id, title, vendor, targetQuantity, currentQuantity, originalPrice, discountedPrice, expiresInDays, imageFallback, currentUserName, description }: GroupBuyCardProps) {
  const progressPercent = Math.min(100, Math.round((currentQuantity / targetQuantity) * 100));
  const isGoalReached = currentQuantity >= targetQuantity;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(`deal_${id}`);
    if (savedState === 'true') setIsJoined(true);
  }, [id]);

  const handleJoin = async () => {
    triggerHaptic('medium');
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsJoined(true);
    localStorage.setItem(`deal_${id}`, 'true');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all relative">
      <div className="h-40 bg-slate-100 relative overflow-hidden flex items-center justify-center">
        {imageFallback.startsWith('http') ? (
          <Image src={imageFallback} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="text-6xl">{imageFallback}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <Badge className="bg-emerald-500 text-white border-none px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
            Save ₹{originalPrice - discountedPrice}
          </Badge>
          <div className="text-right">
            <span className="text-xs font-bold text-white/70 line-through block mb-0.5">₹{originalPrice}</span>
            <span className="text-2xl font-black text-white leading-none">₹{discountedPrice}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1.5">{vendor}</div>
        <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2">{title}</h3>
        <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-6">{description}</p>
        
        <div className="mb-6">
          <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase mb-2">
            <span className={isGoalReached ? "text-emerald-600 flex items-center gap-1" : "text-slate-500"}>
              {isGoalReached ? <><CheckCircle2 className="w-3 h-3"/> GOAL REACHED</> : `${currentQuantity} / ${targetQuantity} JOINED`}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {expiresInDays}D LEFT
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${isGoalReached ? 'bg-emerald-500' : 'bg-slate-900'}`}
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>

        {!isJoined ? (
          <button 
            onClick={() => { triggerHaptic('light'); setIsModalOpen(true); }}
            className="w-full py-3.5 rounded-2xl font-bold text-[15px] tracking-wide text-white transition-transform active:scale-95 flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
          >
            Join Deal
          </button>
        ) : (
          <Link 
             href={`/chat/${id}`}
             onClick={() => triggerHaptic('light')}
             className="w-full py-3.5 rounded-2xl font-bold text-[15px] tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
           >
             <MessageCircle className="w-4 h-4" /> 
             Enter Deal Chat
           </Link>
        )}
        
        {isJoined && (
          <button onClick={() => { setIsJoined(false); localStorage.removeItem(`deal_${id}`); }} className="text-[11px] font-bold text-slate-400 hover:text-slate-600 mt-4 transition-colors text-center w-full block">Leave Group Buy</button>
        )}
      </div>

      <ActionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleJoin}
        title="Confirm Purchase"
        description={<>You are committing to purchase this item from <strong>{vendor}</strong> for <strong>₹{discountedPrice}</strong>. Payment will be collected when the goal is reached.</>}
        confirmText="Join Deal"
        icon={<ShoppingBag className="w-6 h-6" />}
      />
    </div>
  );
}
