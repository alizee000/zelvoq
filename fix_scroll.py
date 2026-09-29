with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

# Make the main wrapper allow vertical scrolling
content = content.replace(
    'className="absolute inset-0 bg-[#0F172A] z-50 flex flex-col font-sans overflow-hidden"',
    'className="absolute inset-0 bg-[#0F172A] z-50 flex flex-col font-sans overflow-y-auto overflow-x-hidden"'
)

# Allow the carousel to overflow vertically so we can see the bottom of the towers
content = content.replace(
    'overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar w-full"',
    'overflow-x-auto overflow-y-visible snap-x snap-mandatory hide-scrollbar w-full min-h-[120vh]"'
)

# Ensure the towers align to the top so you scroll down to see them, rather than aligning to the bottom
content = content.replace(
    'items-end justify-start gap-8',
    'items-start justify-start gap-8'
)

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(content)

