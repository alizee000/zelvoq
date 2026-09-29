with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Fix the invalid CSS class artifact
content = content.replace(']fill-mode-both', ']')

# Fix Knock Knock text color
content = content.replace('text-rose-900', 'text-rose-400').replace('text-rose-500', 'text-rose-300')

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
