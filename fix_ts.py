with open('src/app/(app)/talent/[id]/page.tsx', 'r') as f:
    content = f.read()

# Fix MotionSection type definition
old_type = 'function MotionSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number })'
new_type = 'function MotionSection({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string })'

content = content.replace(old_type, new_type)

# Fix the render of MotionSection to include className
old_render = '''    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.section>'''

new_render = '''    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.section>'''

content = content.replace(old_render, new_render)

with open('src/app/(app)/talent/[id]/page.tsx', 'w') as f:
    f.write(content)
