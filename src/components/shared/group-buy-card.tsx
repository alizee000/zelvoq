"use client";

import { Users, Clock, ArrowRight, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionModal } from "./action-modal";
import { useState } from "react";

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
  description: string;
}

export function GroupBuyCard({ title, vendor, targetQuantity, currentQuantity, originalPrice, discountedPrice, expiresInDays, imageFallback, description }: GroupBuyCardProps) {
  const progressPercent = Math.min(100, Math.round((currentQuantity / targetQuantity) * 100));
  const isGoalReached = currentQuantity >= targetQuantity;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsJoined(true);
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:shadow-md transition-all">
      <div className="flex gap-4">
        <div className="w-16 h-16 shrink-0 bg-orange-50/50 border border-orange-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
          {imageFallback}
        </div>
        <div className="flex-1 flex flex-col justify-start">
          <Badge variant="secondary" className="w-fit bg-slate-100 text-slate-600 border-slate-200 text-[9px] mb-2 uppercase tracking-wider font-bold">
            {vendor}
          </Badge>
          <h3 className="font-bold text-slate-900 leading-tight">{title}</h3>
        </div>
      </div>
      
      <p className="text-xs text-slate-500 line-clamp-2">{description}</p>
      
      {/* Pricing */}
      <div className="flex items-end gap-2 mt-2">
        <span className="text-2xl font-extrabold text-slate-900">₹{discountedPrice}</span>
        <span className="text-sm font-medium text-slate-400 line-through mb-1">₹{originalPrice}</span>
        <Badge className="ml-auto bg-green-100 text-green-700 border-green-200 hover:bg-green-100 uppercase tracking-widest text-[9px] font-bold">
          Save ₹{originalPrice - discountedPrice}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mt-2 space-y-3">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
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
            className={`h-full rounded-full transition-all duration-1000 ${isGoalReached ? 'bg-green-500' : 'bg-indigo-500'}`} 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        disabled={isJoined}
        className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
          isJoined 
            ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
            : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02]"
        }`}
      >
        {isJoined ? "Joined Successfully" : "Join Deal"}
        {!isJoined && <ArrowRight className="w-4 h-4" />}
      </button>

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
