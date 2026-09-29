import re

with open('src/app/actions/auth.ts', 'r') as f:
    auth_ts = f.read()

# Fix logout redirect
auth_ts = auth_ts.replace('  revalidatePath("/", "layout");\n  redirect("/");', '  return { success: true };')

with open('src/app/actions/auth.ts', 'w') as f:
    f.write(auth_ts)

with open('src/components/layout/top-nav-menu.tsx', 'r') as f:
    menu = f.read()

# Add useAuth and custom logout handler
if 'useAuth' not in menu:
    menu = menu.replace('import { SignOutButton } from "@clerk/nextjs";', 'import { useAuth } from "@clerk/nextjs";\nimport { logout } from "@/app/actions/auth";')
    
    new_hook = '''export function TopNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    // 1. Sign out of Clerk (if they have a real session)
    try { await signOut(); } catch (e) {}
    // 2. Clear our custom test_bypass cookies & Supabase session
    try { await logout(); } catch (e) {}
    // 3. Force redirect to login screen
    window.location.href = "/";
  };'''
    
    menu = re.sub(r'export function TopNavMenu\(\) \{[\s\S]*?const menuRef = useRef<HTMLDivElement>\(null\);', new_hook, menu)
    
    # Replace SignOutButton with custom handler
    old_btn = '''          <SignOutButton>
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </SignOutButton>'''
          
    new_btn = '''          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>'''
          
    menu = menu.replace(old_btn, new_btn)

with open('src/components/layout/top-nav-menu.tsx', 'w') as f:
    f.write(menu)
