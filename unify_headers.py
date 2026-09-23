import re

# 1. Update Market Page
with open('src/app/(app)/market/page.tsx', 'r') as f:
    market_content = f.read()

# Replace header in market page
old_market_header = """      {/* Header */}
      <div className="px-6 pt-10 pb-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">
        <h1 className="text-[32px] font-extrabold tracking-tight text-slate-900 leading-tight">
          Marketplace
        </h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Borrow equipment, join deals, and share spaces.</p>
      </div>"""

new_market_header = """      {/* Header */}
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
      </div>"""

market_content = market_content.replace(old_market_header, new_market_header)

with open('src/app/(app)/market/page.tsx', 'w') as f:
    f.write(market_content)


# 2. Update Add Page
with open('src/app/(app)/add/page.tsx', 'r') as f:
    add_content = f.read()

old_add_header = """        <div className="px-6 pt-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-tight mb-2">
            What would you like to list?
          </h1>
          <p className="text-slate-500 font-medium mb-10">Select a category to get started.</p>"""

new_add_header = """        <div className="flex flex-col gap-6 px-6 pt-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Add Listing
            </h1>
            <p className="text-sm text-slate-500 mt-1">Select a category to get started.</p>
          </div>"""

add_content = add_content.replace(old_add_header, new_add_header)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(add_content)


# 3. Check Profile Page
