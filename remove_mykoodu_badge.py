with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

badge_code = """            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-[10px] font-black tracking-[0.25em] text-slate-900 uppercase">MyKoodu</span>
            </div>"""

new_content = content.replace(badge_code, '')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(new_content)
