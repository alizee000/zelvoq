import re

with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

old_karma = r'<div>\s*<KarmaRings lendCount=\{lendCount \|\| 0\} hostCount=\{hostCount\} helpCount=\{helpCount \|\| 0\} \/>\s*<\/div>'

new_karma = """<section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Community Impact</h2>
          </div>
          <KarmaRings lendCount={lendCount || 0} hostCount={hostCount} helpCount={helpCount || 0} />
        </section>"""

content = re.sub(old_karma, new_karma, content)

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)

