import os
import re

files = [
    'src/app/(app)/profile/page.tsx',
    'src/app/(app)/add/page.tsx',
    'src/app/(app)/discover/page.tsx',
    'src/app/(app)/discover/discover-client.tsx'
]

pattern = re.compile(r'\s*animate-in fade-in (slide-in-from-[a-z0-9-]+ )?(duration-[0-9]+ )?(delay-\[[0-9a-z]+\] )?(delay-[0-9]+ )?(fill-mode-both )?')

for file in files:
    if os.path.exists(file):
        with open(file, 'r') as f:
            content = f.read()
        
        new_content = pattern.sub('', content)
        
        with open(file, 'w') as f:
            f.write(new_content)
            
print("Done removing animations.")
