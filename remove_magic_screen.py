import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Define the block to remove using regex
pattern = re.compile(r'\{\/\* Magic Screen Entry \*\/\}.*?<\/MotionSection>', re.DOTALL)

# Replace with empty string
new_content = pattern.sub('', content)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(new_content)
