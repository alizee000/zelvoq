"use client";

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
