"use client";

import { MapPin, Calendar, HeartHandshake, MessageCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionModal } from "./action-modal";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="w-full bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all relative mb-2">
      
      {/* Massive Hero Image */}
      <div className="h-56 bg-slate-100 relative overflow-hidden flex items-center justify-center">
        {imageUrl.startsWith('http') ? (
          <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="text-6xl">🏢</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <Badge className={`px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase border-none shadow-lg backdrop-blur-md ${
            price.toLowerCase() === 'free' ? "bg-emerald-500/90 text-white" : "bg-white/90 text-slate-900"
          }`}>
            {price}
          </Badge>
        </div>

        {/* Location & Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold mb-1 drop-shadow-md">
             <MapPin className="w-3.5 h-3.5" />
             {location}
          </div>
          <h3 className="font-black text-2xl text-white leading-tight drop-shadow-md">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-400 border border-slate-200">
               {ownerName.charAt(0)}
             </div>
             <div>
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hosted by</div>
               <div className="text-sm font-bold text-slate-900">{ownerName}</div>
             </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
             <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9
          </div>
        </div>
        
        <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-6 leading-relaxed">{description}</p>
        
        <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-500">
             <Calendar className="w-5 h-5" />
           </div>
           <div>
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Availability</div>
             <div className="text-sm font-bold text-slate-900">{availability}</div>
           </div>
        </div>

        {/* Action Button & Chat */}
        <div className="flex flex-col gap-3">
          {!isRequested ? (
             <button 
               onClick={() => setIsModalOpen(true)}
               className="w-full py-4 rounded-xl font-bold text-[15px] transition-all shadow-sm flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]"
             >
               Request Booking
             </button>
          ) : (
             <Link 
               href={`/chat/${id}`}
               className="w-full py-4 rounded-xl font-bold text-[15px] transition-all shadow-sm flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 active:scale-[0.98]"
             >
               <MessageCircle className="w-5 h-5" /> 
               Chat with {ownerName.split(' ')[0]}
             </Link>
          )}

          {isRequested && (
            <button onClick={() => { setIsRequested(false); localStorage.removeItem(`space_${id}`); }} className="text-[12px] font-bold text-slate-400 hover:text-rose-500 mt-2 transition-colors text-center w-full block">Cancel Booking</button>
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
    </div>
  );
}
