with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">',
    '{category !== \'knock\' && (\n              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">'
)

content = content.replace(
    '</label>\n              </div>\n            </>\n          )}',
    '</label>\n              </div>\n              )}\n            </>\n          )}'
)

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
