import os
import re

replacements = {
    'src/app/(app)/discover/discover-client.tsx': ('Sparkles', 'Search'),
    'src/app/(app)/add/page.tsx': ('Sparkles', 'Check'),
    'src/components/ui/hive-network.tsx': ('Sparkles', 'Zap'),
    'src/components/ui/ask-mykoodu.tsx': ('Sparkles', 'Search'),
    'src/components/home/ai-search-bar.tsx': ('Sparkles', 'Search'),
    'src/components/home/hidden-gem.tsx': ('Sparkles', 'Gem'),
    'src/components/shared/co-own-card.tsx': ('Sparkles', 'Activity'),
    'src/app/auth-client.tsx': ('Sparkles', 'Hexagon'),
    'src/app/(app)/chat/[id]/chat-client.tsx': ('Sparkles', 'Zap'),
    'src/app/(app)/ask/page.tsx': ('Sparkles', 'Search'),
    'src/components/layout/top-nav.tsx': ('Sparkles', 'Hexagon'),
    'src/components/layout/sidebar.tsx': ('Sparkles', 'Search'),
    'src/app/(app)/home/page.tsx': ('Sparkles', 'Gem'),
}

for file_path, (old, new) in replacements.items():
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Replace the import if it exists and 'new' isn't already imported
        if new not in content and 'lucide-react' in content:
            content = re.sub(r'import \{([^\}]+)\} from "lucide-react";', 
                             lambda m: f'import {{{m.group(1).replace(old, new) if old in m.group(1) else m.group(1) + ", " + new}}} from "lucide-react";', 
                             content)
        elif new in content:
            # If new is already there, just remove old from imports
            content = re.sub(rf'\b{old},\s*', '', content)
            content = re.sub(rf',\s*{old}\b', '', content)
            content = re.sub(rf'\b{old}\b', new, content) # Replace usage
            
        content = content.replace(f'<{old}', f'<{new}')
        content = content.replace(f'icon: {old}', f'icon: {new}')
        
        with open(file_path, 'w') as f:
            f.write(content)

