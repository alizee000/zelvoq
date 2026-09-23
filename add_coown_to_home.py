import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Make sure PieChart is imported
if 'PieChart' not in content:
    content = content.replace('Calendar,', 'Calendar, PieChart,')

# Create the Co-Own banner
coown_banner = """

          <Link href="/market?tab=coown" className="col-span-2 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-between group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[500ms] fill-mode-both">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-black text-white">Co-Own Luxury Assets</div>
                <div className="text-[10px] font-bold text-teal-100 uppercase tracking-widest mt-0.5">Fractional Ownership</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md transition-transform group-hover:translate-x-1">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </Link>
"""

# Insert the banner after the events pill
content = content.replace('</Link>\n        </section>', '</Link>' + coown_banner + '\n        </section>')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
