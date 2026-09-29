import re

with open('src/components/ui/live-knocks.tsx', 'r') as f:
    content = f.read()

# Fix the Story Viewer Modal
old_viewer_class = 'className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-xl p-4 sm:p-6"'
new_viewer_class = 'className="fixed inset-y-0 inset-x-0 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 w-full sm:max-w-md z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl"'

if old_viewer_class in content:
    content = content.replace(old_viewer_class, new_viewer_class)

# Fix the Inline Creation Modal
old_create_class = 'className="fixed inset-0 z-[120] flex flex-col bg-white/95 backdrop-blur-2xl"'
new_create_class = 'className="fixed inset-y-0 inset-x-0 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 w-full sm:max-w-md z-[120] flex flex-col bg-white/95 backdrop-blur-3xl shadow-2xl border-x border-white/50"'

if old_create_class in content:
    content = content.replace(old_create_class, new_create_class)

with open('src/components/ui/live-knocks.tsx', 'w') as f:
    f.write(content)
print("Successfully constrained modals to mobile width.")
