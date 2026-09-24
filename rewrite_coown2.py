with open('src/components/shared/co-own-card.tsx', 'w') as f:
    f.write("""\"use client\";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Coins, Sparkles, MessageCircle, Send } from "lucide-react";

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
    <div className="bg-white rounded-[1.5rem] border border-slate-100 p-4 shadow-sm relative overflow-hidden group">
      
      {/* Top Section */}
      <div className="flex gap-4">
        <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden relative shrink-0">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          {status === 'active' && (
             <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
               <Sparkles className="w-3 h-3" /> Live
             </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">{title}</h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
             <div className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md flex items-center gap-1.5 font-bold text-xs">
                <Coins className="w-3.5 h-3.5" />
                ₹{pricePerShare.toLocaleString()} <span className="text-indigo-400 font-medium">/ share</span>
             </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="mt-5">
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold">
            <Users className="w-4 h-4 text-slate-400" />
            <span>{fundedShares} / {maxShares} shares claimed</span>
          </div>
          <div className="text-xs font-bold text-slate-900">
             {Math.round(progress)}%
          </div>
        </div>
        
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${isFullyFunded ? 'bg-emerald-500' : 'bg-indigo-600'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Action Button & Chat */}
      <div className="mt-5 flex flex-col gap-3">
        {isFullyFunded && !invested ? (
           <button className="w-full py-3.5 rounded-xl bg-slate-50 text-slate-400 font-bold text-sm tracking-wide border border-slate-200" disabled>
             Fully Funded
           </button>
        ) : !invested ? (
           <button 
             onClick={() => { setInvested(true); localStorage.setItem(`coown_${id}`, 'true'); }}
             className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]"
           >
             Claim a Share
           </button>
        ) : (
           <Link 
             href={`/chat/${id}`}
             className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
           >
             <MessageCircle className="w-4 h-4" /> 
             Enter Co-Owners Chat 🎉
           </Link>
        )}
        {invested && (
           <button onClick={() => { setInvested(false); localStorage.removeItem(`coown_${id}`); }} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-1 transition-colors text-center w-full">Withdraw Share</button>
        )}
      </div>

    </div>
  );
}
""")

with open('src/components/shared/borrow-card.tsx', 'w') as f:
    f.write("""\"use client\";

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
""")

with open('src/components/shared/space-card.tsx', 'w') as f:
    f.write("""\"use client\";

import { MapPin, Calendar, CreditCard, MessageCircle, HeartHandshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionModal } from "./action-modal";
import { useState, useEffect } from "react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";

interface SpaceCardProps {
  id: string;
  title: string;
  description: string;
  ownerName: string;
  location: string;
  availability: string;
  price: string;
  imageUrl: string;
  currentUserName?: string;
}

export function SpaceCard({ id, title, description, ownerName, location, availability, price, imageUrl, currentUserName }: SpaceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(`space_${id}`);
    if (savedState === 'true') setIsRequested(true);
  }, [id]);

  const handleRequest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsRequested(true);
    localStorage.setItem(`space_${id}`, 'true');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 flex flex-col gap-4 relative overflow-hidden group">
      
      <div className="w-full h-40 bg-slate-100 rounded-[1.5rem] overflow-hidden relative">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <Badge className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border-none shadow-md ${
          price.toLowerCase() === 'free' ? "bg-emerald-500 text-white" : "bg-white text-slate-900"
        }`}>
          {price}
        </Badge>
      </div>

      <div className="px-2">
        <h3 className="font-black text-lg text-slate-900 leading-tight">{title}</h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
             <MapPin className="w-4 h-4 text-indigo-500" />
             {location} • Hosted by {ownerName}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
             <Calendar className="w-4 h-4 text-emerald-500" />
             {availability}
          </div>
        </div>
      </div>

      {/* Action Button & Chat */}
      <div className="mt-2 flex flex-col gap-3">
        {!isRequested ? (
           <button 
             onClick={() => setIsModalOpen(true)}
             className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800"
           >
             Request Booking
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
          <button onClick={() => { setIsRequested(false); localStorage.removeItem(`space_${id}`); }} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-1 transition-colors text-center w-full block">Cancel Booking</button>
        )}
      </div>

      <ActionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRequest}
        title={`Book ${title}?`}
        description={
          <>
            You are requesting to book <strong>{title}</strong> from <strong>{ownerName}</strong>. You will be able to chat with the host to confirm dates.
          </>
        }
        confirmText="Send Request"
        icon={<HeartHandshake className="w-6 h-6" />}
      />
    </div>
  );
}
""")

