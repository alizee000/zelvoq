with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

# Add statuses to the mock data generation
content = content.replace(
    'data[tower][floor][flatIndex] = talent;',
    '''
      // Assign a random impactful status
      const statuses = ['offer', 'offer', 'sos', 'deal'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      data[tower][floor][flatIndex] = {
        ...talent,
        hive_status: randomStatus,
        hive_message: randomStatus === 'sos' ? '🚨 URGENT: Need a ladder right now!' : 
                      randomStatus === 'deal' ? '📦 Group Buy: Fresh Mangoes arriving soon' : 
                      '✨ Offering: ' + talent.title
      };
'''
)

# Update the window styling based on the status
old_button_class = """className={`relative w-10 h-12 rounded-md border-2 transition-all duration-300 flex items-center justify-center overflow-hidden
                              ${isOccupied 
                                ? (isSelected 
                                    ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.6)] cursor-pointer' 
                                    : 'bg-indigo-900/60 border-indigo-500/50 hover:bg-indigo-700 cursor-pointer')
                                : 'bg-slate-900 border-slate-800 cursor-default opacity-50'
                              }
                            `}"""

new_button_class = """className={`relative w-10 h-12 rounded-md border-2 transition-all duration-300 flex items-center justify-center overflow-hidden
                              ${!isOccupied ? 'bg-slate-900 border-slate-800 cursor-default opacity-50' : 
                                isSelected ? 'border-white shadow-[0_0_25px_rgba(255,255,255,0.6)] z-20 cursor-pointer ' : 'cursor-pointer '
                              }
                              ${isOccupied && talent.hive_status === 'sos' && !isSelected ? 'bg-rose-900/60 border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.6)] animate-pulse' : ''}
                              ${isOccupied && talent.hive_status === 'deal' && !isSelected ? 'bg-emerald-900/60 border-emerald-500' : ''}
                              ${isOccupied && talent.hive_status === 'offer' && !isSelected ? 'bg-indigo-900/60 border-indigo-500/50 hover:bg-indigo-700' : ''}
                              ${isOccupied && isSelected && talent.hive_status === 'sos' ? 'bg-rose-500' : ''}
                              ${isOccupied && isSelected && talent.hive_status === 'deal' ? 'bg-emerald-500' : ''}
                              ${isOccupied && isSelected && talent.hive_status === 'offer' ? 'bg-indigo-500' : ''}
                            `}"""

content = content.replace(old_button_class, new_button_class)

# Update the modal to show the actionable impact
old_modal_content = """<div className="inline-flex items-center text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">
                    {selectedNode.category} • {selectedNode.owner_name}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">{selectedNode.title}</h2>
                  <p className="text-sm text-slate-400 line-clamp-2">{selectedNode.description}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href={`/talent/${selectedNode.id}`} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-center text-sm font-bold py-3 rounded-xl transition-colors">
                  View Full Profile
                </Link>"""

new_modal_content = """<div className={`inline-flex items-center text-[9px] font-black uppercase tracking-widest mb-1 ${selectedNode.hive_status === 'sos' ? 'text-rose-400' : selectedNode.hive_status === 'deal' ? 'text-emerald-400' : 'text-indigo-400'}`}>
                    {selectedNode.hive_status === 'sos' ? '🚨 LIVE KNOCK-KNOCK' : selectedNode.hive_status === 'deal' ? '📦 ACTIVE GROUP BUY' : '✨ COMMUNITY TALENT'} • {selectedNode.owner_name}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">{selectedNode.hive_message}</h2>
                  <p className="text-sm text-slate-400 line-clamp-2">{selectedNode.description}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href={`/talent/${selectedNode.id}`} className={`flex-1 text-white text-center text-sm font-bold py-3 rounded-xl transition-colors ${selectedNode.hive_status === 'sos' ? 'bg-rose-600 hover:bg-rose-500' : selectedNode.hive_status === 'deal' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
                  {selectedNode.hive_status === 'sos' ? 'Respond to SOS' : selectedNode.hive_status === 'deal' ? 'Join Group Buy' : 'View Profile'}
                </Link>"""

content = content.replace(old_modal_content, new_modal_content)

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(content)

