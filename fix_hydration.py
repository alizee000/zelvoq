with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

# Add isMounted state
content = content.replace(
    "const [selectedNode, setSelectedNode] = useState<any | null>(null);",
    "const [selectedNode, setSelectedNode] = useState<any | null>(null);\n  const [isMounted, setIsMounted] = useState(false);\n  const [nodes, setNodes] = useState<any[]>([]);\n\n  useEffect(() => {\n    setIsMounted(true);\n    const generatedNodes = talents.map((t, i) => {\n      const angle = (i / talents.length) * Math.PI * 2;\n      const radius = 25 + Math.random() * 10;\n      return {\n        ...t,\n        x: Math.cos(angle) * radius,\n        y: Math.sin(angle) * radius,\n        delay: i * 0.1,\n      };\n    });\n    setNodes(generatedNodes);\n  }, [talents]);\n\n  if (!isMounted) return <div className=\"fixed inset-0 bg-[#0F172A] z-50\" />;"
)

# Remove the synchronous nodes calculation
content = content.replace(
    "  const nodes = talents.map((t, i) => {\n    const angle = (i / talents.length) * Math.PI * 2;\n    const radius = 25 + Math.random() * 10; // Use vw for mobile responsiveness\n    return {\n      ...t,\n      x: Math.cos(angle) * radius,\n      y: Math.sin(angle) * radius,\n      delay: i * 0.1,\n    };\n  });\n",
    ""
)

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(content)
