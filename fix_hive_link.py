with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add the Sparkles icon import
content = content.replace(
    'import { CheckCircle2, ArrowRight } from "lucide-react";',
    'import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";'
)

# Insert the button at the bottom of the page before the final closing divs
hive_button = """
      {/* Magic Screen Entry */}
      <MotionSection delay={0.4}>
        <div className="mt-4 mb-8 px-6 flex justify-center">
          <Link href="/hive" className="inline-flex items-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white text-[15px] font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-95">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Explore the Living Network
          </Link>
        </div>
      </MotionSection>
"""

content = content.replace(
    '      </MotionSection>\n\n    </div>',
    '      </MotionSection>\n' + hive_button + '\n    </div>'
)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

