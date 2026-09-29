with open('src/components/ui/motion-wrapper.tsx', 'r') as f:
    content = f.read()

old_func = 'export function MotionSection({ children, delay = 0 }: { children: ReactNode, delay?: number }) {\n  return (\n    <motion.section\n      initial={{ opacity: 0, y: 20 }}\n      animate={{ opacity: 1, y: 0 }}\n      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}\n    >\n      {children}\n    </motion.section>\n  );\n}'

new_func = 'export function MotionSection({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {\n  return (\n    <motion.section\n      initial={{ opacity: 0, y: 20 }}\n      animate={{ opacity: 1, y: 0 }}\n      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}\n      className={className}\n    >\n      {children}\n    </motion.section>\n  );\n}'

content = content.replace(old_func, new_func)

with open('src/components/ui/motion-wrapper.tsx', 'w') as f:
    f.write(content)
