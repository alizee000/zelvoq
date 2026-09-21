"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Sparkles, Image as ImageIcon, Mic, Bot } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
};

export default function ChatClient({
  talentId,
  receiverName,
  receiverImage,
  talentTitle,
}: {
  talentId: string;
  receiverName: string;
  receiverImage: string | null;
  talentTitle: string;
}) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "bot",
      text: `Hi! I'm ${receiverName}'s AI assistant. You can ask me anything about their "${talentTitle}" offering, or I can connect you directly with them!`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "That sounds great! I've just pinged them with your request. They usually respond within a few hours. Is there anything else you need?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full relative w-full max-w-2xl mx-auto pb-24">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/80 px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-slate-200/50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-400 overflow-hidden relative border-2 border-white shadow-sm">
                {receiverImage ? (
                  <Image src={receiverImage} alt={receiverName} fill className="object-cover" />
                ) : (
                  receiverName.charAt(0)
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center">
                <Bot className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                {receiverName}'s AI
              </h2>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                Always Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col gap-6 px-6 py-6 pb-24 relative">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "bot" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-shrink-0 items-center justify-center mr-2 shadow-sm mt-auto mb-1">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`flex flex-col max-w-[75%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`p-4 rounded-[1.5rem] shadow-sm ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-md"
                    : "bg-white border border-slate-100 text-slate-800 rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
              </div>
              <span className="text-[10px] font-bold text-slate-400 mt-1.5 px-2 uppercase tracking-widest">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-shrink-0 items-center justify-center mr-2 shadow-sm mt-auto mb-1">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-[1.5rem] rounded-bl-md shadow-sm flex items-center gap-1.5 h-[52px]">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Floating Input */}
      <div className="fixed bottom-[90px] left-0 w-full px-6 flex justify-center z-40 pointer-events-none">
        <div className="w-full max-w-2xl pointer-events-auto">
          <div className="flex items-end gap-2 bg-white/90 backdrop-blur-md p-2 border border-slate-200 rounded-[2rem] shadow-2xl shadow-indigo-500/10">
            <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-full transition-colors flex-shrink-0">
              <ImageIcon className="w-5 h-5" />
            </button>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 bg-transparent resize-none outline-none py-3 px-2 text-sm text-slate-800 placeholder:text-slate-400 max-h-32 min-h-[44px]"
            rows={1}
          />
          
          {input.trim() ? (
            <button 
              onClick={handleSend}
              className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-all active:scale-95 flex-shrink-0"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          ) : (
            <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-full transition-colors flex-shrink-0">
              <Mic className="w-5 h-5" />
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
