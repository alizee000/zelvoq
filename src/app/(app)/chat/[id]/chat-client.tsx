"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { ArrowLeft, Send, Sparkles, Image as ImageIcon, Mic, Bot } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { sendMessage } from "@/app/actions/chat";

type Message = {
  id: string;
  sender_name: string;
  receiver_name: string;
  text: string;
  created_at: string;
};

export default function ChatClient({
  talentId,
  chatRoomId,
  receiverName,
  receiverImage,
  talentTitle,
  currentUserName,
  initialMessages,
}: {
  talentId: string;
  chatRoomId?: string;
  receiverName: string;
  receiverImage: string | null;
  talentTitle: string;
  currentUserName: string;
  initialMessages: any[];
}) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [initialMessages]);

  useEffect(() => {
    const supabase = createClient();
    const activeRoomId = chatRoomId || talentId;
    
    const channel = supabase.channel(`chat_${activeRoomId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'feed_posts',
        filter: `tower=eq.${activeRoomId}`
      }, (payload) => {
        router.refresh();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatRoomId, talentId, router]);

  const handleSend = () => {
    if (!input.trim() || isPending) return;

    const textToSend = input;
    setInput("");

    startTransition(async () => {
      let targetReceiver = receiverName;
      if (currentUserName === receiverName && initialMessages.length > 0) {
          const otherPersonMsg = initialMessages.find((m: Message) => m.sender_name !== currentUserName);
          if (otherPersonMsg) {
              targetReceiver = otherPersonMsg.sender_name;
          }
      }

      await sendMessage(chatRoomId || talentId, targetReceiver, textToSend);
      router.refresh();
    });
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative w-full max-w-md mx-auto pb-24 bg-slate-50/50">
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
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                {receiverName === "Group Discussion" ? talentTitle : currentUserName === receiverName ? talentTitle : receiverName}
              </h2>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                {receiverName === "Group Discussion" ? "Community Chat" : currentUserName === receiverName ? "Listing Chat" : talentTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-6 py-6 pb-24 relative">
        {initialMessages.length === 0 && (
          <div className="text-center p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">No messages yet. Send a message to start the conversation!</p>
          </div>
        )}

        {initialMessages.map((msg: Message) => {
          const isMe = msg.sender_name === currentUserName;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              {!isMe && (
                <span className="text-[10px] font-bold text-slate-400 mb-1 ml-1">{msg.sender_name}</span>
              )}
              <div
                className={`p-4 rounded-[1.5rem] shadow-sm max-w-[85%] ${
                  isMe
                    ? "bg-indigo-600 text-white rounded-br-md"
                    : "bg-white border border-slate-100 text-slate-800 rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">{msg.text}</p>
              </div>
              <span className="text-[10px] font-bold text-slate-400 mt-1.5 px-2 uppercase tracking-widest">
                {formatTime(msg.created_at)}
              </span>
            </div>
          );
        })}
        
        {isPending && (
          <div className="flex justify-end">
             <div className="bg-indigo-600/50 p-4 rounded-[1.5rem] rounded-br-md shadow-sm flex items-center gap-1.5 h-[52px]">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-[90px] left-0 w-full px-6 flex justify-center z-40 pointer-events-none">
        <div className="w-full max-w-md pointer-events-auto">
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
              disabled={isPending}
              className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-all active:scale-95 flex-shrink-0 disabled:opacity-50"
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
