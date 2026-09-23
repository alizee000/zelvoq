with open('src/components/layout/top-nav.tsx', 'r') as f:
    content = f.read()

# Make sure LogOut is imported
if 'LogOut' not in content:
    content = content.replace('Sparkles, User', 'Sparkles, User, LogOut')

# Make sure the logout action is imported
if 'logout' not in content:
    content = content.replace('import { Logo } from "@/components/shared/logo";', 'import { Logo } from "@/components/shared/logo";\nimport { logout } from "@/app/actions/auth";')

# Inject the form
form_str = """        <form action={logout}>
          <button type="submit" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden hover:scale-105 hover:bg-rose-50 transition-all text-slate-500 hover:text-rose-500 group">
            <LogOut className="w-4 h-4 ml-0.5 group-hover:scale-110 transition-transform" />
          </button>
        </form>
"""

# Place it right before the Profile link
if '<form action={logout}>' not in content:
    content = content.replace('        <Link href="/profile"', form_str + '\n        <Link href="/profile"')

with open('src/components/layout/top-nav.tsx', 'w') as f:
    f.write(content)
