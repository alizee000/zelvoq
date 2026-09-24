"use client";

import { useState, useEffect } from "react";
import { Bell, Check, X } from "lucide-react";
import { castVote } from "@/app/actions/polls";
import { useRouter } from "next/navigation";

export function NotificationsDropdown({ 
  initialActive, 
  initialCompleted,
  notifications = []
}: { 
  initialActive: any[],
  initialCompleted: any[],
  notifications?: any[]
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePolls, setActivePolls] = useState(initialActive);
  const [isVoting, setIsVoting] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const latestNotifId = notifications?.[0]?.id || 'none';
    const latestPollId = activePolls?.[0]?.id || 'none';
    const currentLatest = `${latestNotifId}-${latestPollId}`;
    const lastSeen = localStorage.getItem('last_seen_notif');
    
    if ((notifications.length > 0 || activePolls.length > 0) && currentLatest !== lastSeen) {
      setHasUnread(true);
    }
  }, [notifications, activePolls]);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const latestNotifId = notifications?.[0]?.id || 'none';
      const latestPollId = activePolls?.[0]?.id || 'none';
      localStorage.setItem('last_seen_notif', `${latestNotifId}-${latestPollId}`);
      setHasUnread(false);
    }
  };

  const handleVote = async (pollId: string, choice: 'yes' | 'no') => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      await castVote(pollId, choice);
      // Remove from active list optimistically
      setActivePolls(prev => prev.filter(p => p.id !== pollId));
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button 
        onClick={handleOpenDropdown}
        className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <Bell className="w-5 h-5 text-slate-700" />
        {hasUnread && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-rose-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">{activePolls.length + notifications.length}</span>
          </div>
        )}
      </button>

      {/* Dropdown Overlay */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-12 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="p-3 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-sm text-slate-900">Notifications</h3>
              <p className="text-xs font-medium text-slate-500">Community decisions & alerts</p>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto hide-scrollbar">
              {(activePolls.length === 0 && notifications.length === 0) ? (
                <div className="p-8 text-center text-slate-500 text-sm font-medium">
                  You're all caught up!
                </div>
              ) : (
                <div className="flex flex-col">
                  {activePolls.map((poll) => (
                    <div key={poll.id} className="p-3 border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[9px] font-bold uppercase tracking-widest rounded">Action Required</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-3">{poll.title}</h4>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleVote(poll.id, 'yes')}
                          disabled={isVoting}
                          className="flex-1 flex items-center justify-center gap-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" /> Accept
                        </button>
                        <button 
                          onClick={() => handleVote(poll.id, 'no')}
                          disabled={isVoting}
                          className="flex-1 flex items-center justify-center gap-1 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors"
                        >
                          <X className="w-3.5 h-3.5" /> Deny
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Past Decisions Section */}
              {initialCompleted.length > 0 && (
                <div className="p-3 bg-slate-50 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Past Decisions</h4>
                  <div className="flex flex-col gap-3">
                    {initialCompleted.map((poll) => (
                      <div key={poll.id}>
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="text-[11px] font-bold text-slate-700 line-clamp-1 pr-2">{poll.title}</span>
                          <span className={`shrink-0 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${poll.percentage >= 50 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {poll.percentage >= 50 ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                        <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`absolute top-0 left-0 h-full rounded-full ${poll.percentage >= 50 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                            style={{ width: `${poll.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
