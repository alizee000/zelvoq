import re
with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { CarouselWrapper } from"@/components/ui/carousel-wrapper";', 'import { CarouselWrapper } from "@/components/ui/carousel-wrapper";\nimport { MotionSection } from "@/components/ui/motion-wrapper";')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
