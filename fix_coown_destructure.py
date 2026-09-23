with open('src/components/shared/co-own-card.tsx', 'r') as f:
    content = f.read()

content = content.replace('  status,\n}: CoOwnCardProps) {', '  status,\n  currentUserName,\n}: CoOwnCardProps) {')
content = content.replace('  status\n}: CoOwnCardProps) {', '  status,\n  currentUserName,\n}: CoOwnCardProps) {')

with open('src/components/shared/co-own-card.tsx', 'w') as f:
    f.write(content)
