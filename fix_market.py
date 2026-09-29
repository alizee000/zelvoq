import os

with open('src/app/(app)/market/page.tsx', 'r') as f:
    content = f.read()

# Change bg-white to bg-transparent
content = content.replace('className="flex flex-col min-h-screen bg-white pb-32"', 'className="flex flex-col min-h-screen bg-transparent pb-32"')

# Make the Header bolder and better
header_old = '''      {/* Header */}
      <div className="flex flex-col gap-6 px-6 pt-6">
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Marketplace
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Borrow equipment, join deals, and share spaces.
              </p>
            </div>
          </div>
        </section>
      </div>'''

header_new = '''      {/* Header */}
      <div className="flex flex-col gap-6 px-6 pt-6 mb-4">
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Market
            </h1>
            <p className="text-slate-500 font-medium">
              Unlock the resources of your community.
            </p>
          </div>
        </section>
      </div>'''

content = content.replace(header_old, header_new)

# Improve empty states to look less like a college project
empty_state_1_old = '''<div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No active deals</h3>
                <p className="text-sm text-slate-500">Start a group buy to get discounts.</p>
              </div>'''
empty_state_1_new = '''<div className="flex flex-col items-center justify-center py-20 text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <ShoppingBag className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No active deals</h3>
                <p className="text-slate-500 max-w-[200px] leading-relaxed">Start a group buy and unlock bulk discounts.</p>
              </div>'''
content = content.replace(empty_state_1_old, empty_state_1_new)

empty_state_2_old = '''<div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <PieChart className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No active pools</h3>
                <p className="text-sm text-slate-500">Propose an item to co-own with neighbors.</p>
              </div>'''
empty_state_2_new = '''<div className="flex flex-col items-center justify-center py-20 text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <PieChart className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No active pools</h3>
                <p className="text-slate-500 max-w-[200px] leading-relaxed">Propose an item to co-own with your neighbors.</p>
              </div>'''
content = content.replace(empty_state_2_old, empty_state_2_new)

empty_state_3_old = '''<div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Wrench className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Library is empty</h3>
                <p className="text-sm text-slate-500">List your idle tools for neighbors.</p>
              </div>'''
empty_state_3_new = '''<div className="flex flex-col items-center justify-center py-20 text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Wrench className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Library is empty</h3>
                <p className="text-slate-500 max-w-[200px] leading-relaxed">List your idle tools and equipment for neighbors.</p>
              </div>'''
content = content.replace(empty_state_3_old, empty_state_3_new)

empty_state_4_old = '''<div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <CarFront className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No spaces listed</h3>
                <p className="text-sm text-slate-500">List an empty parking spot or guest room.</p>
              </div>'''
empty_state_4_new = '''<div className="flex flex-col items-center justify-center py-20 text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <CarFront className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No spaces listed</h3>
                <p className="text-slate-500 max-w-[200px] leading-relaxed">List an empty parking spot or guest bedroom.</p>
              </div>'''
content = content.replace(empty_state_4_old, empty_state_4_new)

with open('src/app/(app)/market/page.tsx', 'w') as f:
    f.write(content)
