import re

# 1. Fix home/page.tsx gap
with open('src/app/(app)/home/page.tsx', 'r') as f:
    home = f.read()

home = home.replace('className="relative z-10 px-6 pt-16 pb-10"', 'className="relative z-10 px-6 pt-6 pb-8"')
with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(home)

# 2. Fix LiveKnocks size and padding
with open('src/components/ui/live-knocks.tsx', 'r') as f:
    knocks = f.read()

knocks = knocks.replace('className="w-full pt-6 pb-2 pl-6 overflow-hidden"', 'className="w-full pt-2 pb-0 pl-6 overflow-hidden"')
knocks = knocks.replace('className="relative w-[72px] h-[72px]"', 'className="relative w-[64px] h-[64px]"')
knocks = knocks.replace('className="flex items-center gap-1 mb-3 pr-6"', 'className="flex items-center gap-1 mb-2 pr-6"')

with open('src/components/ui/live-knocks.tsx', 'w') as f:
    f.write(knocks)
