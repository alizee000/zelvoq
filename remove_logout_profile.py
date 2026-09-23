import re

with open('src/app/(app)/profile/page.tsx', 'r') as f:
    content = f.read()

# Pattern to match the logout form in the profile page
form_pattern = re.compile(r'        <form action=\{logout\}>\n\s*<button type="submit" className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center hover:bg-slate-100 hover:scale-105 transition-all group">\n\s*<LogOut className="w-5 h-5 text-slate-400 group-hover:text-rose-500 transition-colors" />\n\s*</button>\n\s*</form>\n', re.DOTALL)

content = form_pattern.sub('', content)

# Remove the unused `logout` and `LogOut` imports to keep it clean
content = content.replace('import { logout } from "@/app/actions/auth";\n', '')
content = content.replace('LogOut, ', '')
content = content.replace(', LogOut', '')

with open('src/app/(app)/profile/page.tsx', 'w') as f:
    f.write(content)
