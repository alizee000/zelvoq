"use client";

import { Users, Clock, ArrowRight, ShoppingBag, MessageSquare, CheckCircle2, MessageCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionModal } from "./action-modal";
import { useState } from "react";
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
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Neighbor (Flat 301)", text: "Has anyone ordered from this vendor before?", time: "11:00 AM" },
    { id: 2, sender: "Neighbor (Flat 505)", text: "Yes, the quality is excellent. Highly recommended.", time: "11:15 AM" }
  ]);

  const handleJoin = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsJoined(true);
    setIsModalOpen(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now(), sender: currentUserName || "You", text: message, time: "Just now" }]);
    setMessage("");
  };

  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col gap-5 relative overflow-hidden group">
      <div className="flex gap-4">
        <div className="w-16 h-16 shrink-0 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl">
          {imageFallback}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">
            {vendor}
          </span>
          <h3 className="font-black text-lg text-slate-900 leading-tight">{title}</h3>
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

      {/* Action Button & Chat */}
      <div className="mt-2 flex flex-col gap-3">
        {!isJoined ? (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] shadow-indigo-500/20"
          >
            Join Deal
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
             onClick={() => setShowChat(!showChat)}
             className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 ${
               showChat 
                 ? 'bg-slate-100 text-slate-600' 
                 : 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
             }`}
           >
             <MessageCircle className="w-4 h-4" /> 
             {showChat ? 'Close Chat' : 'Enter Deal Chat 🎉'}
           </button>
        )}

        {/* Expandable Chat UI */}
        {showChat && (
          <div className="mt-2 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700">Group Buy Members ({currentQuantity + 1} Online)</span>
            </div>
            
            <div className="p-4 h-48 overflow-y-auto flex flex-col gap-3">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === currentUserName || msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] font-bold text-slate-400 mb-0.5">{msg.sender}</span>
                  <div className={`px-3 py-2 rounded-2xl text-sm ${msg.sender === currentUserName || msg.sender === 'You' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message group..."
                className="flex-1 bg-slate-50 border-transparent rounded-full px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button 
                type="submit" 
                disabled={!message.trim()}
                className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:bg-slate-300 transition-colors"
              >
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </form>
          </div>
        )}

        {isJoined && (
          <button onClick={() => { setIsJoined(false); setShowChat(false); }} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-1 transition-colors text-center w-full block">Leave Group Buy</button>
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
