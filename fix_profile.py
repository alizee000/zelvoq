import re

with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

old_header = """      {/* Header */}
      <div className="flex items-center justify-between pt-10 px-6 pb-6">
        <div>
          <h1 className="text-[32px] font-extrabold tracking-tight text-slate-900 leading-tight">
            Profile
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage your account and listings</p>
        </div>
      </div>"""

new_header = """      {/* Header */}
      <div className="flex flex-col gap-6 px-6 pt-6 mb-6">
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Profile
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your account and listings.
              </p>
            </div>
          </div>
        </section>
      </div>"""

content = content.replace(old_header, new_header)

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)

