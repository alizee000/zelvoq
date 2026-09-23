with open('src/app/(app)/talent/[id]/page.tsx', 'r') as f:
    content = f.read()

new_ui = """
  return (
    <div className="flex flex-col relative bg-slate-950 min-h-screen pb-0">
      
      {/* Top Actions Floating */}
      <div className="absolute top-10 left-6 right-6 flex items-center justify-between z-20">
        <Link href="/discover" className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="text-white font-bold text-sm tracking-wide">
          {talent.owner_name} details
        </div>
        <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors">
          <Heart className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Background Image / Cover */}
      <div className="w-full h-[55vh] relative bg-slate-800 rounded-b-[2rem] overflow-hidden shadow-2xl">
        {talent.image_url ? (
          <Image src={talent.image_url} alt={talent.owner_name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-8xl font-black uppercase bg-slate-800 text-slate-700">
            {talent.owner_name.charAt(0)}
          </div>
        )}
      </div>

      {/* The Bottom Sheet Card */}
      <div className="bg-white rounded-t-[2.5rem] -mt-10 relative z-10 p-8 min-h-[50vh] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] flex flex-col">
        
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-[26px] font-black text-slate-900 tracking-tight flex items-center gap-2 truncate">
            {talent.owner_name}
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-full shrink-0">92% Matched</span>
          </h1>
        </div>
        
        <div className="text-sm font-bold text-slate-500 flex items-center gap-1.5 mb-8">
          <span className="truncate">{talent.title}</span> <span className="text-slate-300">|</span> <MapPin className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{talent.tower}</span>
        </div>

        {/* 3 Col Stats */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 mb-8 border-b border-slate-100 pb-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-slate-900 font-black text-xl">
              <Star className="w-5 h-5 text-slate-400" /> 4.8
            </div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1 text-center">120 Reviews</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-slate-900 font-black text-xl">
              <MessageSquare className="w-5 h-5 text-slate-400" /> 6.2%
            </div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1 text-center">Engagement</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-slate-900 font-black text-xl">
              <Users className="w-5 h-5 text-slate-400" /> 870k
            </div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1 text-center">Followers</div>
          </div>
        </div>

        {/* Segmented Controls */}
        <div className="flex items-center bg-slate-50 p-1.5 rounded-full mb-8">
          <div className="flex-1 text-center bg-slate-900 text-white rounded-full py-3 text-sm font-bold shadow-md cursor-default">Details</div>
          <div className="flex-1 text-center text-slate-500 py-3 text-sm font-bold hover:text-slate-700 cursor-pointer">Activity</div>
          <div className="flex-1 text-center text-slate-500 py-3 text-sm font-bold hover:text-slate-700 cursor-pointer">Reviews</div>
        </div>

        {/* Details Content */}
        <div className="bg-slate-50 rounded-3xl p-6 mb-28">
          <h3 className="text-sm font-black text-slate-900 mb-4">About this Listing</h3>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            {talent.description}
          </p>
          
          {allSkills.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {allSkills.map((skill: string) => (
                <div key={skill} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-[#1C1C1E] rounded-full p-2 pl-6 shadow-2xl flex items-center justify-between border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Fee</span>
            <span className="text-orange-500 text-lg font-black">{talent.is_paid ? "$450" : "Free"}</span>
          </div>
          <Link href={`/chat/${talent.id}`} className="bg-white text-slate-900 px-6 py-4 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
            Send an Inquiry <MessageSquare className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
"""

content = content.split('  return (')[0] + new_ui

with open('src/app/(app)/talent/[id]/page.tsx', 'w') as f:
    f.write(content)
