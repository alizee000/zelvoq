import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Remove the wrapper animation so we can animate individual items
old_wrapper = '          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[200ms] fill-mode-both">'
new_wrapper = '          <div className="flex flex-col gap-4">'
content = content.replace(old_wrapper, new_wrapper)

# Add staggered animations to each button
categories = [
    ('onClick={() => setCategory("knock")}', 'animate-in fade-in zoom-in-[0.95] slide-in-from-bottom-4 duration-500 fill-mode-both hover:scale-[1.02]', 100),
    ('onClick={() => setCategory("item")}', 'animate-in fade-in zoom-in-[0.95] slide-in-from-bottom-4 duration-500 fill-mode-both hover:scale-[1.02]', 150),
    ('onClick={() => setCategory("skill")}', 'animate-in fade-in zoom-in-[0.95] slide-in-from-bottom-4 duration-500 fill-mode-both hover:scale-[1.02]', 200),
    ('onClick={() => setCategory("deal")}', 'animate-in fade-in zoom-in-[0.95] slide-in-from-bottom-4 duration-500 fill-mode-both hover:scale-[1.02]', 250),
    ('onClick={() => setCategory("event")}', 'animate-in fade-in zoom-in-[0.95] slide-in-from-bottom-4 duration-500 fill-mode-both hover:scale-[1.02]', 300),
    ('onClick={() => setCategory("space")}', 'animate-in fade-in zoom-in-[0.95] slide-in-from-bottom-4 duration-500 fill-mode-both hover:scale-[1.02]', 350),
    ('onClick={() => setCategory("coown")}', 'animate-in fade-in zoom-in-[0.95] slide-in-from-bottom-4 duration-500 fill-mode-both hover:scale-[1.02]', 400),
]

for onClickStr, animStr, delayMs in categories:
    # Find the button that has this onClick
    pattern = r'(<button\s+onClick=\{\(\) => setCategory\("[a-z]+"\)\}\s+className=")([^"]+)(")'
    
    def repl(m):
        if onClickStr in m.group(0):
            # Replace hover:scale-[1.01] or similar with our new anim string
            old_classes = m.group(2)
            # Remove existing hover scales and transition-transform to replace with our comprehensive string
            old_classes = re.sub(r'hover:scale-\[.*?\]', '', old_classes)
            old_classes = re.sub(r'transition-transform', '', old_classes)
            return f'{m.group(1)}{old_classes.strip()} {animStr}" style={{ animationDelay: "{delayMs}ms" }}'
        return m.group(0)

    content = re.sub(pattern, repl, content)


with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)

