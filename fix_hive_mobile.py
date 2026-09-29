with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

# Replace pixel math with vw math
content = content.replace(
    "const radius = 100 + Math.random() * 80;",
    "const radius = 25 + Math.random() * 10; // Use vw for mobile responsiveness"
)

content = content.replace(
    "x2={`calc(50% + ${node.x}px)`}",
    "x2={`calc(50% + ${node.x}vw)`}"
)

content = content.replace(
    "y2={`calc(50% + ${node.y}px)`}",
    "y2={`calc(50% + ${node.y}vw)`}"
)

# Wait, the node animation itself needs 'vw' too!
content = content.replace(
    "animate={{ opacity: 1, x: node.x, y: node.y }}",
    "animate={{ opacity: 1, x: `${node.x}vw`, y: `${node.y}vw` }}"
)

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(content)
