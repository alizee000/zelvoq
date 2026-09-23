import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Replace header animation
content = content.replace('animate-in fade-in slide-in-from-top-4 duration-700 delay-0 fill-mode-both', '')

# Remove all Jitter animation classes and styles from the buttons
pattern = re.compile(r'animate-in fade-in zoom-in-\[0\.95\] slide-in-from-bottom-4 duration-500 fill-mode-both(.*?)\"\s+style=\{\{\s*animationDelay:\s*"[^"]+"\s*\}\}', re.DOTALL)
content = pattern.sub(r'\1"', content)

# I'll just do a more generic regex to remove ` animate-in fade-in zoom-in-[0.95] slide-in-from-bottom-4 duration-500 fill-mode-both` and `style={{ animationDelay: "..." }}`
content = re.sub(r'\s*animate-in fade-in zoom-in-\[0\.95\] slide-in-from-bottom-4 duration-500 fill-mode-both', '', content)
content = re.sub(r'\s*animate-in fade-in slide-in-from-bottom-4 duration-700 delay-0 fill-mode-both', '', content)
content = re.sub(r'\s*style=\{\{\s*animationDelay:\s*"[^"]+"\s*\}\}', '', content)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)

