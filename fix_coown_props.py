with open('src/components/shared/co-own-card.tsx', 'r') as f:
    content = f.read()

# Add to interface
if 'currentUserName?: string;' not in content:
    content = content.replace('  status: string;\n}', '  status: string;\n  currentUserName?: string;\n}')

# Add to destructuring
if 'currentUserName' not in content.split('}: CoOwnCardProps')[0]:
    content = content.replace('  status,\n}: CoOwnCardProps)', '  status,\n  currentUserName,\n}: CoOwnCardProps)')

with open('src/components/shared/co-own-card.tsx', 'w') as f:
    f.write(content)
