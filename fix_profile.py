with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

# Fix layout wrapper to be transparent and remove duration-700
content = content.replace(
    '<div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-32duration-700">',
    '<div className="flex flex-col min-h-screen bg-transparent pb-32 relative overflow-hidden">'
)

# Fix section delays that were left over from stripping animate-in
content = content.replace('<section className="delay-100">', '<section>')
content = content.replace('<section className="delay-200">', '<section>')

# Redesign the Digital ID card from Dark Mode (bg-slate-900) to Premium Light Mode (bg-white)
old_card = '''        {/* Digital ID Card */}
        <div className="w-full bg-slate-900 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/20 blur-[50px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/20 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="absolute top-6 right-6 z-20">
            <EditProfileModal currentFlat={flat} currentTower={tower} currentSociety={society} />
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Avatar Frame */}
            <div className="relative mb-5">
              <div className="w-28 h-28 p-1.5 rounded-[2rem] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 backdrop-blur-sm">
                <div className="w-full h-full bg-slate-800 rounded-[1.75rem] overflow-hidden flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-80 z-20 pointer-events-none mix-blend-overlay"></div>
                  <div className="relative z-30">
                    <AvatarUploader initialImage={currentImageUrl} ownerName={ownerName} />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 shadow-lg border-2 border-slate-900">
                <Shield className="w-3 h-3" /> Verified
              </div>
            </div>
            
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-1">{ownerName}</h2>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-6">
              <span>{tower}</span>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <span>Apt {flat}</span>
            </div>
            
            {/* Stats Row */}
            <div className="w-full grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="flex flex-col items-center py-3">
                <span className="text-xl font-bold text-white leading-none mb-1">{myTalents?.length || 0}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Listings</span>
              </div>
              <div className="flex flex-col items-center py-3 border-x border-white/10">
                <span className="text-xl font-bold text-white leading-none mb-1">{lendCount || 0}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Lends</span>
              </div>
              <div className="flex flex-col items-center py-3">
                <span className="text-xl font-bold text-white leading-none mb-1">{hostCount || 0}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Hosted</span>
              </div>
            </div>
          </div>
        </div>'''

new_card = '''        {/* Digital ID Card (Light Mode) */}
        <div className="w-full bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-100 blur-[50px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-100 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="absolute top-6 right-6 z-20">
            <EditProfileModal currentFlat={flat} currentTower={tower} currentSociety={society} />
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Avatar Frame */}
            <div className="relative mb-5">
              <div className="w-28 h-28 p-1.5 rounded-[2rem] bg-gradient-to-br from-indigo-100 to-purple-100 backdrop-blur-sm shadow-sm">
                <div className="w-full h-full bg-white rounded-[1.75rem] overflow-hidden flex items-center justify-center relative">
                  <div className="relative z-30">
                    <AvatarUploader initialImage={currentImageUrl} ownerName={ownerName} />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 shadow-md border-2 border-white">
                <Shield className="w-3 h-3" /> Verified
              </div>
            </div>
            
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">{ownerName}</h2>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-6">
              <span>{tower}</span>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Apt {flat}</span>
            </div>
            
            {/* Stats Row */}
            <div className="w-full grid grid-cols-3 gap-2 p-1 bg-slate-50/80 rounded-2xl border border-slate-100">
              <div className="flex flex-col items-center py-3">
                <span className="text-xl font-bold text-slate-900 leading-none mb-1">{myTalents?.length || 0}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Listings</span>
              </div>
              <div className="flex flex-col items-center py-3 border-x border-slate-200">
                <span className="text-xl font-bold text-slate-900 leading-none mb-1">{lendCount || 0}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Lends</span>
              </div>
              <div className="flex flex-col items-center py-3">
                <span className="text-xl font-bold text-slate-900 leading-none mb-1">{hostCount || 0}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Hosted</span>
              </div>
            </div>
          </div>
        </div>'''

content = content.replace(old_card, new_card)

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)
