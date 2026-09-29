with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

# Replace the Profile Card and Layout
old_card = '''        {/* Profile Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 border-b border-slate-100"></div>
          <div className="absolute top-4 right-4 z-20">
            <EditProfileModal currentFlat={flat} currentTower={tower} currentSociety={society} />
          </div>
          
          {/* INTERACTIVE AVATAR UPLOADER */}
          <div className="relative z-10 mt-10">
            <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-slate-100">
              <AvatarUploader initialImage={currentImageUrl} ownerName={ownerName} />
            </div>
            <div className="absolute bottom-4 right-0 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white flex items-center justify-center z-20 shadow-md">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 mt-2">{ownerName}</h2>
          <p className="text-slate-500 font-medium text-[11px] mt-1 tracking-wide uppercase">Flat {flat} · {tower}<br/>{society}</p>
          
          <div className="flex items-center gap-2 mt-4 px-5 py-2.5 bg-slate-50 rounded-full border border-slate-100">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-[13px] font-bold text-slate-700">Level 3 Neighbor</span>
          </div>
        </div>'''

new_card = '''        {/* Digital ID Card */}
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

content = content.replace(old_card, new_card)

# Update My Listings Section
old_listings = '''          {myTalents && myTalents.length > 0 ? (
            <div className="flex flex-col gap-3">
              {myTalents.map((talent) => (
                <Link href={`/talent/${talent.id}`} key={talent.id} className="p-4 bg-white border border-slate-100 rounded-[1.5rem] flex justify-between items-center group hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div>
                    <div className="text-[15px] font-bold text-slate-900 mb-1">{talent.title}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{talent.category}</div>
                  </div>
                  <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 transition-all">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-white border border-slate-100 rounded-[2rem] shadow-sm">
              <Star className="w-8 h-8 text-slate-300 mb-2" />
              <div className="text-sm font-bold text-slate-900">No listings yet</div>
              <div className="text-[13px] text-slate-500 mt-1">Share a skill or item with the community.</div>
            </div>
          )}'''

new_listings = '''          {myTalents && myTalents.length > 0 ? (
            <div className="flex flex-col gap-3">
              {myTalents.map((talent) => (
                <Link href={`/talent/${talent.id}`} key={talent.id} className="p-4 bg-white border border-slate-100 rounded-[1.5rem] flex justify-between items-center group hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      {talent.category === 'skill' ? <Star className="w-5 h-5 text-indigo-500" /> : 
                       talent.category === 'space' ? <MapPin className="w-5 h-5 text-indigo-500" /> :
                       <Shield className="w-5 h-5 text-indigo-500" />}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-0.5">{talent.category}</div>
                      <div className="text-[15px] font-bold text-slate-900 leading-tight">{talent.title}</div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors shrink-0">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 border border-slate-100/50 rounded-[2rem]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Star className="w-6 h-6 text-slate-300" />
              </div>
              <div className="text-base font-bold text-slate-900 mb-1">Your showcase is empty</div>
              <div className="text-sm font-medium text-slate-500 max-w-[200px]">Offer a skill, lend an item, or host a group buy.</div>
            </div>
          )}'''

content = content.replace(old_listings, new_listings)
content = content.replace('bg-slate-50/50', 'bg-[#FAFAFA]')

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)
