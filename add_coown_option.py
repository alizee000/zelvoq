import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Make sure useSearchParams and PieChart are imported
if 'useSearchParams' not in content:
    content = content.replace('useRouter } from "next/navigation";', 'useRouter, useSearchParams } from "next/navigation";')
if 'PieChart' not in content:
    content = content.replace('Target, CarFront,', 'Target, CarFront, PieChart,')

# Add the Co-Own action import
if 'createCoOwnItem' not in content:
    content = content.replace('import { createKnockKnock } from "@/app/actions/knock-knocks";', 'import { createKnockKnock } from "@/app/actions/knock-knocks";\nimport { createCoOwnItem } from "@/app/actions/co-own";')

# Update category state and useSearchParams
content = content.replace(
    'const [category, setCategory] = useState<"skill" | "item" | "deal" | "space" | "event" | "knock" | null>(null);',
    'const searchParams = useSearchParams();\n  const initialType = searchParams.get("type") as "skill" | "item" | "deal" | "space" | "event" | "knock" | "coown" | null;\n  const [category, setCategory] = useState<"skill" | "item" | "deal" | "space" | "event" | "knock" | "coown" | null>(initialType);'
)

# Add Co-Own Option button
coown_button = """

            {/* Co-Own Option */}
            <button 
              onClick={() => setCategory("coown")}
              className="w-full text-left bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden border border-slate-100 flex items-center justify-between group hover:scale-[1.01] transition-transform"
            >
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Co-Own an Asset</h3>
                <p className="text-sm text-slate-500 font-medium">Pool money to buy a drone or PS5</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-500 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                <PieChart className="w-7 h-7" />
              </div>
            </button>
"""

content = content.replace('            {/* Deal Option */}', coown_button + '\n            {/* Deal Option */}')

# Add form handling
form_submit_handler = """            } else if (category === "coown") {
              const res = await createCoOwnItem(formData);
              if (res.success) router.push("/market?tab=coown");
            } else {"""
content = content.replace('} else {\n              const res = await addTalent', form_submit_handler + '\n              const res = await addTalent')

# Update placeholder text logic
content = content.replace('category === \'knock\' ? "e.g., Need 2 eggs urgently!" :', 'category === \'knock\' ? "e.g., Need 2 eggs urgently!" : category === \'coown\' ? "e.g., DJI Mini 4 Pro Drone" :')

# Add Co-Own specific fields
coown_fields = """
          {category === 'coown' && (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total Price</label>
                <input name="total_price" type="number" required placeholder="₹50000" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Max Shares</label>
                  <input name="max_shares" type="number" required placeholder="10" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Price per Share</label>
                  <input name="price_per_share" type="number" required placeholder="₹5000" className="w-full bg-slate-50 border-transparent rounded-2xl px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20" />
                </div>
              </div>
            </>
          )}
"""
content = content.replace("          {category === 'deal' ? (", coown_fields + "\n          {category === 'deal' ? (")

# Update file upload visibility logic (allow for coown)
content = content.replace("category !== 'skill' && category !== 'knock' && (", "category !== 'skill' && category !== 'knock' && (")


with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
