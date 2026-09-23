"use client";

import { useState, useEffect } from "react";
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
}: CoOwnCardProps) {
  const [invested, setInvested] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Arjun (Flat 402)", text: "I can keep the item for the first week of next month!", time: "10:24 AM" },
    { id: 2, sender: "Fatima (Flat 105)", text: "Sounds perfect. I will take it for the weekend.", time: "10:30 AM" }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMsg = { id: Date.now(), sender: currentUserName || "You", text: message, time: "Just now" };
    const newMessages = [...chatMessages, newMsg];
    setChatMessages(newMessages);
    localStorage.setItem(`coown_chat_${id}`, JSON.stringify(newMessages));
    setMessage("");
  };

  useEffect(() => {
    const savedState = localStorage.getItem(`coown_${id}`);
    if (savedState === 'true') setInvested(true);
    
    const savedChat = localStorage.getItem(`coown_chat_${id}`);
    if (savedChat) {
      try { setChatMessages(JSON.parse(savedChat)); } catch (e) {}
    }
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
           <button 
             onClick={() => setShowChat(!showChat)}
             className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 ${
               showChat 
                 ? 'bg-slate-100 text-slate-600' 
                 : 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
             }`}
           >
             <MessageCircle className="w-4 h-4" /> 
             {showChat ? 'Close Chat' : 'Enter Co-Owners Chat 🎉'}
           </button>
        )}

        {/* Expandable Chat UI */}
        {showChat && (
          <div className="mt-2 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700">Co-Owners Lounge ({Math.max(fundedShares, 3)} Online)</span>
            </div>
            
            <div className="p-4 h-48 overflow-y-auto flex flex-col gap-3">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] font-bold text-slate-400 mb-0.5">{msg.sender}</span>
                  <div className={`px-3 py-2 rounded-2xl text-sm ${msg.sender === 'You' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'}`}>
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
                placeholder="Message co-owners..."
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
        {invested && (
           <button onClick={() => { setInvested(false); localStorage.removeItem(`coown_${id}`); localStorage.removeItem(`coown_chat_${id}`); setShowChat(false); }} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-1 transition-colors text-center w-full">Withdraw Share</button>
        )}
      </div>

    </div>
  );
}
