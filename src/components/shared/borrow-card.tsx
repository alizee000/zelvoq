"use client";

import { User, MapPin, HandHeart, MessageSquare, CheckCircle2, MessageCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionModal } from "./action-modal";
import { useState, useEffect } from "react";
import { DeleteButton } from "./delete-button";

interface BorrowCardProps {
  id: string;
  name: string;
  ownerName: string;
  tower: string;
  condition: string;
  available: boolean;
  imageFallback: string;
  currentUserName?: string;
  description: string;
}

export function BorrowCard({ id, name, ownerName, tower, condition, available, imageFallback,
  currentUserName, description }: BorrowCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: ownerName, text: "Hey! Let me know when you want to pick it up.", time: "10:00 AM" }
  ]);


  useEffect(() => {
    const savedState = localStorage.getItem(`borrow_${id}`);
    if (savedState === 'true') setIsRequested(true);
    localStorage.setItem(`borrow_${id}`, 'true');
    
    const savedChat = localStorage.getItem(`borrow_chat_${id}`);
    if (savedChat) {
      try { setChatMessages(JSON.parse(savedChat)); } catch (e) {}
    }
  }, [id]);
  const handleRequest = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsRequested(true);
    localStorage.setItem(`borrow_${id}`, 'true');
    setIsModalOpen(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMsg = { id: Date.now(), sender: currentUserName || "You", text: message, time: "Just now" };
    const newMessages = [...chatMessages, newMsg];
    setChatMessages(newMessages);
    localStorage.setItem(`borrow_chat_${id}`, JSON.stringify(newMessages));
    setMessage("");
  };

  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col gap-5 relative overflow-hidden group">
      <div className="flex gap-4">
        <div className="w-16 h-16 shrink-0 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl">
          {imageFallback}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">
            {ownerName} · {tower}
          </span>
          <h3 className="font-black text-lg text-slate-900 leading-tight">{name}</h3>
        </div>
      </div>
      
      <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-wrap">{description}</p>
      
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mt-2 space-y-3">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <span className={available ? "text-green-600" : "text-slate-500"}>
            {available ? "AVAILABLE TO BORROW" : "CURRENTLY BORROWED"}
          </span>
          <span className="text-indigo-500 flex items-center gap-1">
            Condition: {condition}
          </span>
        </div>
      </div>

      {/* Action Button & Chat */}
      <div className="mt-2 flex flex-col gap-3">
        {!available ? (
           <button className="w-full py-4 rounded-xl bg-slate-100 text-slate-400 font-bold text-sm tracking-wide cursor-not-allowed" disabled>
             Currently Unavailable
           </button>
        ) : !isRequested ? (
           <button 
             onClick={() => setIsModalOpen(true)}
             className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]"
           >
             Request to Borrow
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
             {showChat ? 'Close Chat' : `Chat with ${ownerName.split(' ')[0]} 🎉`}
           </button>
        )}

        {/* Expandable Chat UI */}
        {showChat && (
          <div className="mt-2 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700">Direct Message with {ownerName}</span>
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
                placeholder="Message owner..."
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

        {isRequested && (
          <button onClick={() => { setIsRequested(false); localStorage.removeItem(`borrow_${id}`); localStorage.removeItem(`borrow_chat_${id}`); setShowChat(false); }} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-1 transition-colors text-center w-full block">Cancel Request</button>
        )}
      </div>

      <ActionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRequest}
        title={`Borrow ${name}?`}
        description={
          <>
            You are requesting to borrow <strong>{name}</strong> from <strong>{ownerName}</strong> ({tower}). They will be notified of your request.
          </>
        }
        confirmText="Send Request"
        icon={<HandHeart className="w-6 h-6" />}
      />
    </div>
  );
}
