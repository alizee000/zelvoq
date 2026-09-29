import re

with open('src/components/ui/carousel-wrapper.tsx', 'r') as f:
    content = f.read()

# Replace the scroll logic to calculate based on the first child
old_logic = "const scrollAmount = scrollRef.current.clientWidth * 0.8;"
new_logic = """// Calculate width based on the first child element to ensure exact snapping
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      // scrollAmount = child width + gap (approx 16px)
      const scrollAmount = firstChild ? firstChild.clientWidth + 16 : scrollRef.current.clientWidth * 0.8;"""

content = content.replace(old_logic, new_logic)

with open('src/components/ui/carousel-wrapper.tsx', 'w') as f:
    f.write(content)
