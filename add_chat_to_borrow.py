import re

with open('src/components/shared/borrow-card.tsx', 'r') as f:
    content = f.read()

# Add MessageCircle and Send to imports
if 'MessageCircle' not in content:
    content = content.replace('MapPin, Tag', 'MapPin, Tag, MessageCircle, Send')

# Add chat state
state_addition = """  const [requested, setRequested] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: ownerName, text: "Hey! Let me know when you want to pick it up.", time: "10:00 AM" }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now(), sender: currentUserName || "You", text: message, time: "Just now" }]);
    setMessage("");
  };"""
content = content.replace('  const [requested, setRequested] = useState(false);', state_addition)

# Replace the button section
old_button = """      {/* Action Button */}
      <div className="mt-5">
        <button 
          onClick={() => setRequested(true)}
          disabled={!available || requested}
          className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm ${
            requested 
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
              : available 
                ? 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md active:scale-[0.98]' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {requested ? 'Request Sent 🎉' : available ? 'Request to Borrow' : 'Currently Unavailable'}
        </button>
      {requested && (
        <button onClick={() => setRequested(false)} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-3 transition-colors text-center w-full block">Cancel Request</button>
      )}
      </div>"""

new_button = """      {/* Action Button & Chat */}
      <div className="mt-5 flex flex-col gap-3">
        {!available ? (
           <button className="w-full py-3.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-sm tracking-wide cursor-not-allowed" disabled>
             Currently Unavailable
           </button>
        ) : !requested ? (
           <button 
             onClick={() => setRequested(true)}
             className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md active:scale-[0.98]"
           >
             Request to Borrow
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

        {requested && (
          <button onClick={() => { setRequested(false); setShowChat(false); }} className="text-[11px] font-bold text-rose-500 hover:text-rose-600 mt-1 transition-colors text-center w-full block">Cancel Request</button>
        )}
      </div>"""
content = content.replace(old_button, new_button)

with open('src/components/shared/borrow-card.tsx', 'w') as f:
    f.write(content)
