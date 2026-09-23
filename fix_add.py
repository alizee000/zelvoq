with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'import { ArrowLeft, Sparkles, Wrench, ShoppingBag, HeartHandshake, UploadCloud, Building, Target, CarFront, Calendar } from "lucide-react";',
    'import { ArrowLeft, Sparkles, Wrench, ShoppingBag, HeartHandshake, UploadCloud, Building, Target, CarFront, Calendar, BellRing } from "lucide-react";'
)

knock_block = """
            {/* Knock-Knock Option */}
            <button 
              onClick={() => setCategory("knock")}
              className="w-full text-left bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl p-6 shadow-[0_8px_30px_rgba(244,63,94,0.3)] relative overflow-hidden flex items-center justify-between group hover:scale-[1.01] transition-transform"
            >
              <div>
                <h3 className="text-xl font-black text-white mb-1">Knock-Knock SOS</h3>
                <p className="text-sm text-white/80 font-medium">Ask neighbors for a quick favor</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <BellRing className="w-7 h-7" />
              </div>
            </button>
"""

content = content.replace(
    '<Calendar className="w-7 h-7" />\n              </div>\n            </button>\n\n\n          </div>',
    '<Calendar className="w-7 h-7" />\n              </div>\n            </button>\n' + knock_block + '\n          </div>'
)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
