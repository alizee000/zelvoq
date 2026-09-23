import re

with open('src/components/shared/co-own-card.tsx', 'r') as f:
    content = f.read()

# Replace Image component with standard img tag
content = content.replace(
    '<Image \n            src={imageUrl} \n            alt={title} \n            fill \n            className="object-cover"\n          />',
    '<img \n            src={imageUrl} \n            alt={title} \n            className="w-full h-full object-cover"\n          />'
)

# Remove the import for Image if not used elsewhere
content = content.replace('import Image from "next/image";\n', '')

with open('src/components/shared/co-own-card.tsx', 'w') as f:
    f.write(content)
