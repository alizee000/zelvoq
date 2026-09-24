import re

with open('src/app/layout.tsx', 'r') as f:
    content = f.read()

# Add ClerkProvider import
content = content.replace('import "./globals.css";', 'import "./globals.css";\nimport { ClerkProvider } from "@clerk/nextjs";')

# Wrap children in ClerkProvider
old_return = r'return \(\s*<html'
new_return = 'return (\n    <ClerkProvider>\n    <html'
content = re.sub(old_return, new_return, content)

old_end = r'<\/html>\s*\);'
new_end = '</html>\n    </ClerkProvider>\n  );'
content = re.sub(old_end, new_end, content)

with open('src/app/layout.tsx', 'w') as f:
    f.write(content)

