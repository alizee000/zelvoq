import re

with open('src/app/(app)/talent/[id]/page.tsx', 'r') as f:
    content = f.read()

# Replace the function signature
pattern = r'function MotionSection\(\{ children, delay = 0 \}: \{ children: React\.ReactNode, delay\?: number \}\)'
replacement = 'function MotionSection({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string })'
content = re.sub(pattern, replacement, content)

# Replace the component render
pattern_render = r'(transition=\{\{ duration: 0\.5, delay, ease: \[0\.23, 1, 0\.32, 1\] \}\})\n\s*>'
replacement_render = r'\1\n      className={className}\n    >'
content = re.sub(pattern_render, replacement_render, content)

with open('src/app/(app)/talent/[id]/page.tsx', 'w') as f:
    f.write(content)
