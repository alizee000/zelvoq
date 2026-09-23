import re

with open('src/components/layout/bottom-nav.tsx', 'r') as f:
    content = f.read()

new_ui = """
export function BottomNav() {
  const pathname = usePathname();

  const renderNavItems = (items: typeof LEFT_NAV) => 
    items.map((item) => {
      // Keep Discover active if we are on a talent page
      const isActive = pathname === item.href || (pathname.startsWith("/talent") && item.name === "Explore");
      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center justify-center transition-all h-11 px-4 rounded-full",
            isActive ? "bg-white text-slate-900 shadow-md" : "text-slate-500 hover:text-slate-300"
          )}
        >
          <item.icon
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isActive ? "mr-1.5" : ""
            )}
            strokeWidth={isActive ? 2.5 : 2}
          />
          <span className={cn(
            "text-[13px] font-bold tracking-wide",
            isActive ? "block" : "hidden"
          )}>
            {item.name}
          </span>
        </Link>
      );
    });

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-md h-[68px] bg-[#111111]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] z-50 flex items-center justify-between px-2 pb-safe">
      <div className="flex items-center gap-1 h-full">
        {renderNavItems(LEFT_NAV)}
      </div>
      
      {/* Center Action Button */}
      <div className="flex items-center justify-center mx-2">
        <Link href="/add" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group">
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
        </Link>
      </div>

      <div className="flex items-center gap-1 h-full">
        {renderNavItems(RIGHT_NAV)}
      </div>
    </div>
  );
}
"""

content = re.sub(r'export function BottomNav\(\) \{[\s\S]*', new_ui, content)

with open('src/components/layout/bottom-nav.tsx', 'w') as f:
    f.write(content)
