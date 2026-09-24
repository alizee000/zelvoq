import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Make the wrapper have a bg and slide in
old_wrapper_1 = r'<div className="flex flex-col min-h-screen bg-white pb-32 pt-8">'
new_wrapper_1 = '<div className="flex flex-col min-h-screen bg-slate-50/50 pb-32 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">'
content = content.replace(old_wrapper_1, new_wrapper_1)

# Animate the Knock-Knock option
old_knock = r'<button\s*onClick=\{\(\) => setCategory\("knock"\)\}\s*className="w-full text-left bg-\[\#FFF1F2\] rounded-3xl p-6 shadow-sm border border-rose-100 relative overflow-hidden flex items-center justify-between group  hover:scale-\[1\.02\]"'
new_knock = '<button onClick={() => setCategory("knock")} className="w-full text-left bg-[#FFF1F2] rounded-3xl p-6 shadow-sm border border-rose-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[50ms] fill-mode-both"'
content = re.sub(old_knock, new_knock, content)

# Animate Item option
old_item = r'<button\s*onClick=\{\(\) => setCategory\("item"\)\}\s*className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden border border-slate-100 flex items-center justify-between group  hover:scale-\[1\.02\]"'
new_item = '<button onClick={() => setCategory("item")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[100ms] fill-mode-both"'
content = re.sub(old_item, new_item, content)

# Animate Skill option
old_skill = r'<button\s*onClick=\{\(\) => setCategory\("skill"\)\}\s*className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden border border-slate-100 flex items-center justify-between group  hover:scale-\[1\.02\]"'
new_skill = '<button onClick={() => setCategory("skill")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[150ms] fill-mode-both"'
content = re.sub(old_skill, new_skill, content)

# Animate Deal option
old_deal = r'<button\s*onClick=\{\(\) => setCategory\("deal"\)\}\s*className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden border border-slate-100 flex items-center justify-between group  hover:scale-\[1\.02\]"'
new_deal = '<button onClick={() => setCategory("deal")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[200ms] fill-mode-both"'
content = re.sub(old_deal, new_deal, content)

# Animate Event option
old_event = r'<button\s*onClick=\{\(\) => setCategory\("event"\)\}\s*className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden border border-slate-100 flex items-center justify-between group  hover:scale-\[1\.02\]"'
new_event = '<button onClick={() => setCategory("event")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[250ms] fill-mode-both"'
content = re.sub(old_event, new_event, content)

# Animate Space option
old_space = r'<button\s*onClick=\{\(\) => setCategory\("space"\)\}\s*className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden border border-slate-100 flex items-center justify-between group  hover:scale-\[1\.02\]"'
new_space = '<button onClick={() => setCategory("space")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[300ms] fill-mode-both"'
content = re.sub(old_space, new_space, content)

# Animate Coown option
old_coown = r'<button\s*onClick=\{\(\) => setCategory\("coown"\)\}\s*className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden border border-slate-100 flex items-center justify-between group  hover:scale-\[1\.02\]"'
new_coown = '<button onClick={() => setCategory("coown")} className="w-full text-left bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between group hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[350ms] fill-mode-both"'
content = re.sub(old_coown, new_coown, content)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)

