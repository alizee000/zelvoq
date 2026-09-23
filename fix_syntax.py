import os

files = [
    'src/components/shared/group-buy-card.tsx',
    'src/components/shared/borrow-card.tsx',
    'src/components/shared/space-card.tsx',
    'src/components/shared/co-own-card.tsx'
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Revert the bad useState, useEffect replacement on the function calls
        content = content.replace('useState, useEffect(', 'useState(')
        
        # But wait, it also messed up the import: `import { useState, useEffect } from "react";` -> `import { useState, useEffect, useEffect } from "react";`?
        # Let's just fix the function calls first.
        content = content.replace('useState, useEffect([', 'useState([')
        content = content.replace('useState, useEffect("', 'useState("')
        
        # Ensure the import is correct
        if 'import { useState } from "react";' in content:
             content = content.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";')
        elif 'import { useState, useEffect } from "react";' in content:
             pass # correct
        elif 'import { useState, useEffect, useEffect }' in content:
             content = content.replace('import { useState, useEffect, useEffect } from "react";', 'import { useState, useEffect } from "react";')
             
        # Just use regex to fix any remaining `useState, useEffect(` calls
        import re
        content = re.sub(r'useState,\s*useEffect\(', 'useState(', content)

        with open(filepath, 'w') as f:
            f.write(content)
