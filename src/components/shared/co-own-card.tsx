"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Coins, Activity, MessageCircle, Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface CoOwnCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  totalPrice: number;
  maxShares: number;
  pricePerShare: number;
  fundedShares: number;
  status: string;
  currentUserName?: string;
}

export function CoOwnCard({
  id,
  title,
  description,
  imageUrl,
  totalPrice,
  maxShares,
  pricePerShare,
  fundedShares,
  status,
  currentUserName,
}: CoOwnCardProps) {
  const [invested, setInvested] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(`coown_${id}`);
    if (savedState === 'true') setInvested(true);
  }, [id]);
  
  const progress = (fundedShares / maxShares) * 100;
  const isFullyFunded = fundedShares >= maxShares;

  return (
    <div className="w-full bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all relative mb-2">
      
      {/* Massive Hero Image */}
      <div className="h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center">
        {imageUrl.startsWith('http') ? (
          <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="text-6xl">💎</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Status Badge */}
        {status === 'active' && (
          <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1.5 backdrop-blur-md">
            <Activity className="w-3 h-3" /> Live Pool
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure Escrow
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase block mb-0.5">Total Value</span>
            <span className="text-2xl font-black text-white leading-none">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2">{title}</h3>
        <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-6">{description}</p>
        
        {/* Price Per Share Highlight */}
        <div className="bg-indigo-50 rounded-2xl p-4 mb-6 border border-indigo-100/50 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Price Per Share</div>
            <div className="text-xl font-black text-indigo-700">₹{pricePerShare.toLocaleString()}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
        </div>
        
        {/* Progress Bar Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase mb-2">
            <span className={isFullyFunded ? "text-emerald-600 flex items-center gap-1" : "text-slate-500"}>
              {isFullyFunded ? <><CheckCircle2 className="w-3 h-3"/> FULLY FUNDED</> : `${fundedShares} / ${maxShares} SHARES CLAIMED`}
            </span>
            <span className="text-slate-900">
               {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${isFullyFunded ? 'bg-emerald-500' : 'bg-indigo-600'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Button & Chat */}
        <div className="flex flex-col gap-3">
          {isFullyFunded && !invested ? (
             <button className="w-full py-4 rounded-xl bg-slate-50 text-slate-400 font-bold text-[15px] border border-slate-200 cursor-not-allowed" disabled>
               Fully Funded
             </button>
          ) : !invested ? (
             <button 
               onClick={() => { setInvested(true); localStorage.setItem(`coown_${id}`, 'true'); }}
               className="w-full py-4 rounded-xl font-bold text-[15px] transition-all shadow-sm bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]"
             >
               Claim a Share
             </button>
          ) : (
             <Link 
               href={`/chat/${id}`}
               className="w-full py-4 rounded-xl font-bold text-[15px] transition-all shadow-sm flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 active:scale-[0.98]"
             >
               <MessageCircle className="w-5 h-5" /> 
               Enter Co-Owners Chat
             </Link>
          )}
          {invested && (
             <button onClick={() => { setInvested(false); localStorage.removeItem(`coown_${id}`); }} className="text-[12px] font-bold text-slate-400 hover:text-rose-500 mt-2 transition-colors text-center w-full">Withdraw Share</button>
          )}
        </div>

      </div>
    </div>
  );
}
