import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, MapPin, Calendar as CalIcon, Users, Send } from "lucide-react";
import Link from "next/link";

import { joinEvent, sendEventMessage } from "@/app/actions/events";
import { cookies } from "next/headers";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const eventId = resolvedParams.id;
  const supabase = await createClient();
  
  const { data: event } = await supabase.from("events").select("*").eq("id", eventId).single();
  const { data: attendees } = await supabase.from("event_attendees").select("*").eq("event_id", eventId);
  const { data: messages } = await supabase.from("event_messages").select("*").eq("event_id", eventId).order("created_at", { ascending: true });

  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const currentUserName = user?.user_metadata?.full_name || cookieStore.get("test_name")?.value || "Test Resident";

  const hasJoined = attendees?.some(a => a.user_name === currentUserName);

  if (!event) return <div>Event not found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative pb-48">
      {/* Header */}
      <div className="bg-white px-6 pt-8 pb-6 shadow-sm z-10 sticky top-0">
        <Link href="/events" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900 leading-tight mb-2">{event.title}</h1>
        <p className="text-sm text-slate-600 mb-4">{event.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
            <CalIcon className="w-3.5 h-3.5" />
            {new Date(event.event_date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
            <MapPin className="w-3.5 h-3.5" />
            {event.location}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl">
            <Users className="w-3.5 h-3.5" />
            {attendees?.length || 0} joined
          </div>
        </div>

        {!hasJoined && (
          <form action={async () => {
            "use server";
            await joinEvent(eventId);
          }}>
            <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-rose-500/30">
              RSVP & Join Chat
            </button>
          </form>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
        {!hasJoined ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
            <Users className="w-12 h-12 text-slate-400 mb-4" />
            <h3 className="font-bold text-slate-700">Chat is locked</h3>
            <p className="text-sm text-slate-500">Join the event to see messages.</p>
          </div>
        ) : (
          messages?.length === 0 ? (
            <div className="text-center text-slate-400 text-sm py-10 font-medium">No messages yet. Say hi!</div>
          ) : (
            messages?.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.user_name === currentUserName ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] font-bold text-slate-400 mb-1 ml-1">{msg.user_name}</span>
                <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm ${msg.user_name === currentUserName ? 'bg-indigo-500 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'}`}>
                  {msg.message}
                </div>
              </div>
            ))
          )
        )}
      </div>

      {/* Message Input */}
      {hasJoined && (
        <div className="fixed bottom-[95px] left-4 right-4 rounded-3xl md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full max-w-md mx-auto bg-white border-t border-slate-100 p-2 pl-4 z-20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-200">
          <form action={async (formData) => {
            "use server";
            const msg = formData.get("message") as string;
            if (msg.trim()) await sendEventMessage(eventId, msg);
          }} className="flex gap-2">
            <input 
              name="message" 
              placeholder="Send a message..." 
              autoComplete="off"
              className="flex-1 bg-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <button className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/20">
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
