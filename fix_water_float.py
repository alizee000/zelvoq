import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add the keyframes at the end of the file
float_style = """
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}} />
    </div>
  );
}
"""
content = content.replace('    </div>\n  );\n}', float_style)

# Add float animation to the trending items, keeping the entrance animation but adding the infinite float
# Since we can't easily chain two animations in inline tailwind without a custom class, we can wrap the item in a div that handles the float.
old_trending_link = '                <Link href={item.href} key={i} style={{ animationDelay: `${150 + (i * 100)}ms`, animationFillMode: "both" }} className={`flex-none w-[140px] ${item.bg} rounded-3xl p-5 snap-start shadow-sm hover:scale-[1.05] transition-all duration-300 animate-in fade-in zoom-in-[0.8] slide-in-from-bottom-4`}>'
new_trending_link = '                <div key={i} style={{ animationDelay: `${i * 0.7}s` }} className="animate-[float_4s_ease-in-out_infinite] flex-none snap-start">\n                  <Link href={item.href} style={{ animationDelay: `${150 + (i * 100)}ms`, animationFillMode: "both" }} className={`block w-[140px] ${item.bg} rounded-3xl p-5 shadow-sm hover:scale-[1.05] transition-all duration-300 animate-in fade-in zoom-in-[0.8] slide-in-from-bottom-4`}>'
content = content.replace(old_trending_link, new_trending_link)
# We also need to add closing div for the new wrapper
content = content.replace('                </Link>\n              );', '                  </Link>\n                </div>\n              );')


# Do the same for the avatars
old_people_link = '              <Link href={`/talent/${person.id}`} key={i} style={{ animationDelay: `${250 + (i * 100)}ms`, animationFillMode: "both" }} className="flex flex-col items-center gap-2 flex-none snap-start group animate-in fade-in zoom-in-75 hover:scale-110 transition-all duration-300">'
new_people_link = '              <div key={i} style={{ animationDelay: `${i * 0.5}s` }} className="animate-[float_5s_ease-in-out_infinite] flex-none snap-start">\n                <Link href={`/talent/${person.id}`} style={{ animationDelay: `${250 + (i * 100)}ms`, animationFillMode: "both" }} className="flex flex-col items-center gap-2 group animate-in fade-in zoom-in-75 hover:scale-110 transition-all duration-300">'
content = content.replace(old_people_link, new_people_link)
content = content.replace('                </div>\n              </Link>', '                </div>\n                </Link>\n              </div>')


with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)

