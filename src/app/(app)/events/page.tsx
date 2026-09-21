"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const EVENTS = [
  {
    id: 1,
    title: "Weekend Badminton Meetup",
    date: "This Saturday, 7:00 AM",
    location: "Society Sports Complex",
    attendees: 12,
    host: "Neha",
    category: "Sports",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Diwali Food Exchange",
    date: "Sunday, 6:00 PM",
    location: "Tower B Clubhouse",
    attendees: 28,
    host: "Fatima",
    category: "Food",
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "Sunday Sunrise Yoga",
    date: "Sunday, 6:30 AM",
    location: "Central Park",
    attendees: 8,
    host: "Rahul",
    category: "Wellness",
    color: "bg-green-500",
  }
];

import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Users, Plus, Sparkles } from "lucide-react";

export default function EventsPage() {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex flex-col gap-10 pb-24 pt-8 px-6 max-w-4xl mx-auto w-full min-h-full">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Events</h1>
            <p className="text-slate-500 mt-1 text-sm font-medium">Neighborhood activities & gatherings.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
        </button>
      </header>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md shadow-xl relative">
            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Create Event</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">Event Name</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="E.g. Sunday Book Club" />
              </div>
              <div>
                <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">Location</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="E.g. Green Block Lounge" />
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Event successfully added to the community board!');
                    setShowCreateModal(false);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Suggestion - Turn Talent into Experience */}
      <section>
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles className="w-24 h-24 text-indigo-600" />
          </div>
          
          <div className="relative z-10 flex flex-col gap-6 items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-indigo-600 font-bold tracking-widest text-xs uppercase">
                <Sparkles className="w-4 h-4" />
                Community Tip
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Host a Baking Masterclass?</h2>
              <p className="text-slate-600 text-sm max-w-xl leading-relaxed">
                18 neighbors have been looking for baking tips recently, and your endorsements for "Celebration Cakes" are very high.
              </p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Event
            </button>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="flex flex-col gap-6">
        {EVENTS.map(event => (
          <div key={event.id} className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl overflow-hidden transition-all group flex flex-col shadow-sm">
            <div className={`h-24 ${event.color} bg-opacity-10 relative p-6 flex flex-col justify-end border-b border-slate-100`}>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-white text-slate-700 border border-slate-200 font-bold uppercase tracking-wider text-[10px] shadow-sm">
                  {event.category}
                </Badge>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 tracking-tight">{event.title}</h3>
              
              <div className="space-y-3 mb-6 flex-1 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-4 h-4 text-indigo-500" />
                  <span className="text-slate-700">{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span>{event.attendees} NEIGHBORS ATTENDING</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                    {event.host[0]}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">HOST / {event.host}</span>
                </div>
                
                <button className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider hover:text-indigo-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
