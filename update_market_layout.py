with open('src/app/(app)/market/page.tsx', 'r') as f:
    content = f.read()

# Replace Header
header_old = '''      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-12 pb-4 bg-white/80 backdrop-blur-xl sticky top-0 z-30 border-b border-slate-100">
        <Link href="/home" className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Market</h1>
      </div>'''

header_new = '''      {/* Premium Header */}
      <div className="px-6 pt-16 pb-6 bg-[#FAFAFA]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-3 h-3 text-white" />
          </div>
          <span className="text-[10px] font-black tracking-[0.25em] text-indigo-600 uppercase">Exchange</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter leading-[1.1] mb-2">
          Community Market
        </h1>
        <p className="text-sm text-slate-500 font-medium max-w-[280px] leading-relaxed">
          Group buys, fractional ownership, and borrowing. Powered by trust.
        </p>
      </div>'''

content = content.replace(header_old, header_new)

# Replace Tabs
tabs_old = '''      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="flex bg-slate-50 rounded-[2rem] p-1.5 shadow-inner border border-slate-100">
          <Link
            href="?tab=deals"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold z-10 transition-colors rounded-[1.75rem] ${activeTab === 'deals' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            <Percent className="w-3.5 h-3.5" /> Deals
          </Link>
          <Link
            href="?tab=borrow"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold z-10 transition-colors rounded-[1.75rem] ${activeTab === 'borrow' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Borrow
          </Link>
          <Link
            href="?tab=spaces"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold z-10 transition-colors rounded-[1.75rem] ${activeTab === 'spaces' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            <CarFront className="w-3.5 h-3.5" /> Spaces
          </Link>
          <Link
            href="?tab=coown"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold z-10 transition-colors ${activeTab === 'coown' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <PieChart className="w-3.5 h-3.5" /> Co-Own
          </Link>
        </div>
      </div>'''

tabs_new = '''      {/* Premium Apple-style Tabs */}
      <div className="px-6 mb-8 sticky top-0 z-30 pt-4 pb-4 bg-[#FAFAFA]/90 backdrop-blur-xl border-b border-slate-100">
        <div className="flex bg-slate-200/50 rounded-2xl p-1 relative">
          <Link
            href="?tab=deals"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all z-10 ${activeTab === 'deals' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {activeTab === 'deals' && <div className="absolute inset-y-1 left-1 right-3/4 bg-white rounded-xl shadow-sm -z-10" />}
            Group Buys
          </Link>
          <Link
            href="?tab=coown"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all z-10 ${activeTab === 'coown' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {activeTab === 'coown' && <div className="absolute inset-y-1 left-1/4 right-2/4 bg-white rounded-xl shadow-sm -z-10" />}
            Fractional
          </Link>
          <Link
            href="?tab=borrow"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all z-10 ${activeTab === 'borrow' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {activeTab === 'borrow' && <div className="absolute inset-y-1 left-2/4 right-1/4 bg-white rounded-xl shadow-sm -z-10" />}
            Borrow
          </Link>
          <Link
            href="?tab=spaces"
            scroll={false}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all z-10 ${activeTab === 'spaces' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {activeTab === 'spaces' && <div className="absolute inset-y-1 left-3/4 right-1 bg-white rounded-xl shadow-sm -z-10" />}
            Spaces
          </Link>
        </div>
      </div>'''

content = content.replace(tabs_old, tabs_new)
content = content.replace('bg-white selection:bg-indigo-100', 'bg-[#FAFAFA] selection:bg-indigo-100')

with open('src/app/(app)/market/page.tsx', 'w') as f:
    f.write(content)
