with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'const TOWERS = ["Tower A", "Tower B"];',
    'const TOWERS = ["Red Block", "Yellow Block"];'
)

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(content)

