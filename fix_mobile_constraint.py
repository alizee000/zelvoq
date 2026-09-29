import re

with open('src/components/ui/hive-network.tsx', 'r') as f:
    content = f.read()

# Change main wrapper from fixed to absolute so it obeys the max-w-md layout of the app
content = content.replace(
    'className="fixed inset-0 bg-[#0F172A] z-50 overflow-y-auto overflow-x-hidden flex flex-col font-sans"',
    'className="absolute inset-0 bg-[#0F172A] z-50 overflow-y-auto overflow-x-hidden flex flex-col font-sans"'
)

# Change fallback loading wrapper
content = content.replace(
    'if (!isMounted) return <div className="fixed inset-0 bg-[#0F172A] z-50" />;',
    'if (!isMounted) return <div className="absolute inset-0 bg-[#0F172A] z-50" />;'
)

# Change modal wrapper from fixed to absolute
content = content.replace(
    'className="fixed bottom-0 left-0 w-full z-40 p-4 md:p-6"',
    'className="absolute bottom-0 left-0 w-full z-40 p-4 md:p-6"'
)

# Ensure the towers stack and fit tightly within a ~400px mobile width
# Make the gap smaller, flats slightly smaller.
content = content.replace(
    'className="relative z-10 flex flex-col md:flex-row items-end justify-center gap-8 p-8 min-h-max pb-32"',
    'className="relative z-10 flex flex-col items-center justify-start gap-8 p-4 min-h-max pb-32 pt-10"'
)

# Scale down the flats so they fit easily in a ~350px width screen
content = content.replace(
    'className={`relative w-12 h-14 md:w-16 md:h-20 rounded-lg border-2 transition-all duration-300 flex items-center justify-center overflow-hidden',
    'className={`relative w-10 h-12 rounded-md border-2 transition-all duration-300 flex items-center justify-center overflow-hidden'
)

# Remove md: sizes from the avatar and icons
content = content.replace('md:w-16 md:h-20 ', '')
content = content.replace('w-6 h-6 md:w-8 md:h-8', 'w-5 h-5')
content = content.replace('w-3 h-3 md:w-4 md:h-4', 'w-3 h-3')
content = content.replace('text-[8px] md:text-[9px]', 'text-[7px]')

with open('src/components/ui/hive-network.tsx', 'w') as f:
    f.write(content)

# Also fix the page.tsx wrapper
with open('src/app/(app)/hive/page.tsx', 'r') as f:
    page_content = f.read()

page_content = page_content.replace(
    '<main className="w-full h-screen overflow-hidden bg-slate-950">',
    '<div className="absolute inset-0 bg-slate-950">'
)
page_content = page_content.replace('</main>', '</div>')

with open('src/app/(app)/hive/page.tsx', 'w') as f:
    f.write(page_content)

