
import { createClient } from "@/lib/supabase/server";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";


export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase.from("events").select("*").order("event_date", { ascending: true });
  const { data: attendees } = await supabase.from("event_attendees").select("event_id");

  const getAttendeeCount = (eventId: string) => {
    return attendees?.filter((a) => a.event_id === eventId).length || 0;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      
      <div className="px-6 pt-10 pb-6">
        <h1 className="text-[32px] font-extrabold tracking-tight text-slate-900 leading-tight">
          Events
        </h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Tournaments, festivals, and gatherings.</p>
      </div>

      <div className="px-6 flex flex-col gap-6">
        {events && events.length > 0 ? (
          events.map((event) => (
            <Link 
              href={`/events/${event.id}`} 
              key={event.id}
              className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex flex-col gap-4 group hover:scale-[1.02] transition-transform"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">{event.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-1">{event.description}</p>
                </div>
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-rose-500 uppercase">{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-lg font-black text-rose-600 leading-none">{new Date(event.event_date).getDate()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.location}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl">
                  <Users className="w-3.5 h-3.5" />
                  {getAttendeeCount(event.id)} joined
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No upcoming events</h3>
            <p className="text-sm text-slate-500 mb-6">Be the first to host a tournament or festival.</p>
            <Link href="/add" className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm">
              Host an Event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
