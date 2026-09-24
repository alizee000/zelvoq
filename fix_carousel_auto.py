import re

with open('src/components/ui/carousel-wrapper.tsx', 'r') as f:
    content = f.read()

# Add useEffect import if not present
if 'useEffect' not in content:
    content = content.replace('import { useRef }', 'import { useRef, useEffect }')

# Add prop
content = content.replace('className?: string }', 'className?: string, autoScrollInterval?: number }')
content = content.replace('className = "" }: {', 'className = "", autoScrollInterval }: {')

# Add scroll logic to loop and auto scroll
old_scroll = '''  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };'''

new_scroll = '''  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      
      // Infinite loop effect for auto-scrolling
      if (direction === "right" && scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10) {
         scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
         scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (!autoScrollInterval) return;
    const interval = setInterval(() => {
      scroll("right");
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, [autoScrollInterval]);'''

content = content.replace(old_scroll, new_scroll)

with open('src/components/ui/carousel-wrapper.tsx', 'w') as f:
    f.write(content)
