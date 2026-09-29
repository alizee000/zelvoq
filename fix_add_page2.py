import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# I need to completely replace the exact bad block.
bad_block = """              <div>
                <h3 className="text-xl font-black text-rose-600 mb-1">Knock-Knock SOS</h3>
                <p className="text-sm text-rose-500 font-medium">Ask neighbors for a quick favor</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#FFE4E6] flex items-center justify-center text-rose-600 shrink-0 group-hover:scale-110 transition-transform">
                <BellRing className="w-7 h-7" />
              </div>
            </button>"""

content = content.replace(bad_block, "")

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)

