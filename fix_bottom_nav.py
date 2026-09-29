with open('src/components/layout/bottom-nav.tsx', 'r') as f:
    content = f.read()

# Add imports
if "import { triggerHaptic }" not in content:
    content = content.replace(
        'import { cn } from "@/lib/utils";',
        'import { cn } from "@/lib/utils";\nimport { triggerHaptic } from "@/lib/utils/haptics";\nimport { motion } from "framer-motion";'
    )

# Replace Link mapping with motion.div wrapping Link
content = content.replace(
    '''      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center h-full space-y-1 transition-all px-3",
            isActive ? "text-indigo-600" : "text-slate-400 hover:text-indigo-400"
          )}
        >''',
    '''      return (
        <motion.div
          key={item.href}
          whileTap={{ scale: 0.85 }}
          onClick={() => triggerHaptic('light')}
        >
          <Link
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center h-full space-y-1 transition-all px-3",
              isActive ? "text-indigo-600" : "text-slate-400 hover:text-indigo-400"
            )}
          >'''
)

content = content.replace(
    '        </Link>\n      );',
    '          </Link>\n        </motion.div>\n      );'
)

# Replace Center Action Button with motion + haptic
content = content.replace(
    '<Link href="/add" className="relative w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white hover:scale-105 hover:-translate-y-1 transition-all group border-4 border-slate-50/50">',
    '''<motion.div whileTap={{ scale: 0.9, rotate: 15 }} onClick={() => triggerHaptic('medium')}>
          <Link href="/add" className="relative w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white transition-all group border-4 border-slate-50/50">'''
)
content = content.replace(
    '<Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />\n        </Link>',
    '<Plus className="w-6 h-6 transition-transform duration-300" />\n          </Link>\n        </motion.div>'
)

with open('src/components/layout/bottom-nav.tsx', 'w') as f:
    f.write(content)
