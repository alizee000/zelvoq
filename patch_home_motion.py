import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add import
if 'MotionSection' not in content:
    content = content.replace('import { CarouselWrapper } from "@/components/ui/carousel-wrapper";', 'import { CarouselWrapper } from "@/components/ui/carousel-wrapper";\nimport { MotionSection } from "@/components/ui/motion-wrapper";')

# Replace sections with MotionSection and delays
sections = list(re.finditer(r'<section\b[^>]*>', content))

delays = [0, 0.1, 0.2, 0.3, 0.4, 0.5]
delay_idx = 0

new_content = ""
last_end = 0

for match in sections:
    new_content += content[last_end:match.start()]
    
    # Check what kind of section it is by looking slightly ahead
    delay = delays[delay_idx] if delay_idx < len(delays) else 0.5
    delay_idx += 1
    
    new_content += f'<MotionSection delay={{{delay}}}>'
    last_end = match.end()

new_content += content[last_end:]

# Replace closing tags
new_content = new_content.replace('</section>', '</MotionSection>')

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(new_content)
