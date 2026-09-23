with open('src/app/(app)/profile/karma-rings.tsx', 'r') as f:
    content = f.read()

# Find the function SparklesIcon() and remove it
import re
content = re.sub(r'function SparklesIcon\(\) \{[\s\S]*?\}', '', content)

with open('src/app/(app)/profile/karma-rings.tsx', 'w') as f:
    f.write(content)
