import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, MapPin, Calendar as CalIcon, Users, Send } from "lucide-react";
import Link from "next/link";

import { joinEvent, leaveEvent, sendEventMessage } from "@/app/actions/events";
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
        
        {hasJoined && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-bold text-emerald-600">You are attending! 🎉</span>
            <form action={async () => {
              "use server";
              await leaveEvent(eventId);
            }}>
              <button className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors">
                Leave Event
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Realtime Chat Button */}
      {hasJoined && (
        <div className="px-6 mt-6">
          <Link href={`/chat/${eventId}`} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2">
            <Send className="w-5 h-5" />
            Enter Event Chat
          </Link>
        </div>
      )}
    </div>
  );
}