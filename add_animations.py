import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# 1. Update CATEGORIES map to add index and stagger animation
old_cat_map = r'\{CATEGORIES\.map\(\(c\) => \(\s*<button\s*key=\{c\.id\}\s*onClick=\{\(\) => setCategory\(c\.id\)\}\s*className=\{cn\(\s*"p-4 rounded-\[1\.5rem\] flex flex-col items-center justify-center gap-2 text-center transition-all",'

new_cat_map = """{CATEGORIES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              style={{ animationDelay: `${idx * 50}ms` }}
              className={cn(
                "animate-in fade-in zoom-in-95 duration-500 fill-mode-both",
                "p-4 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 text-center transition-all",
"""
content = re.sub(old_cat_map, new_cat_map, content)

# 2. Update form to fade in smoothly
old_form = r'<form action=\{handleSubmit\} className="bg-white p-6 rounded-\[2rem\] shadow-sm border border-slate-100 flex flex-col gap-5">'

new_form = """<form action={handleSubmit} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">"""
content = re.sub(old_form, new_form, content)

# 3. Animate the header as well
old_header = r'<div className="px-6 pt-6 pb-2">\s*<h1 className="text-2xl font-black text-slate-900 tracking-tight">Add Listing<\/h1>'

new_header = """<div className="px-6 pt-6 pb-2 animate-in fade-in slide-in-from-left-4 duration-500">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add Listing</h1>"""
content = re.sub(old_header, new_header, content)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)

