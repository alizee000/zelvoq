with open('src/components/layout/top-nav.tsx', 'r') as f:
    content = f.read()

# Remove the logout form we added in the previous step
import re
form_pattern = re.compile(r'        <form action=\{logout\}>\n\s*<button type="submit" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden hover:scale-105 hover:bg-rose-50 transition-all text-slate-500 hover:text-rose-500 group">\n\s*<LogOut className="w-4 h-4 ml-0\.5 group-hover:scale-110 transition-transform" />\n\s*</button>\n\s*</form>\n', re.DOTALL)
content = form_pattern.sub('', content)

# Import TopNavMenu
if 'TopNavMenu' not in content:
    content = content.replace('import { NotificationsDropdown } from "./notifications-dropdown";', 'import { NotificationsDropdown } from "./notifications-dropdown";\nimport { TopNavMenu } from "./top-nav-menu";')

# Add the TopNavMenu right after the Profile link
if '<TopNavMenu />' not in content:
    content = content.replace('        </Link>\n      </div>', '        </Link>\n        <TopNavMenu />\n      </div>')

with open('src/components/layout/top-nav.tsx', 'w') as f:
    f.write(content)
