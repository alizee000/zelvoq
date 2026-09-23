with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

# Update title placeholder
old_placeholder = 'placeholder={category === \'skill\' ? "e.g., Mathematics Tutoring" : category === \'item\' ? "e.g., Bosch Power Drill" : category === \'space\' ? "e.g., Covered Parking Basement 1" : category === \'event\' ? "e.g., Weekend Badminton Tournament" : "e.g., Farm Fresh Mangoes"}'
new_placeholder = 'placeholder={category === \'skill\' ? "e.g., Mathematics Tutoring" : category === \'item\' ? "e.g., Bosch Power Drill" : category === \'space\' ? "e.g., Covered Parking Basement 1" : category === \'event\' ? "e.g., Weekend Badminton Tournament" : category === \'knock\' ? "e.g., Need 2 eggs urgently!" : "e.g., Farm Fresh Mangoes"}'
content = content.replace(old_placeholder, new_placeholder)

# Update page header title
old_header = "{category === 'space' ? 'New Space' : category === 'deal' ? 'New Group Buy' : category === 'item' ? 'Lend Item' : category === 'event' ? 'Host Event' : 'Offer Skill'}"
new_header = "{category === 'space' ? 'New Space' : category === 'deal' ? 'New Group Buy' : category === 'item' ? 'Lend Item' : category === 'event' ? 'Host Event' : category === 'knock' ? 'Ask a Favor' : 'Offer Skill'}"
content = content.replace(old_header, new_header)

# Hide description and image logic for knock
content = content.replace('<div className="space-y-1.5">\n            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Description</label>',
'{category !== \'knock\' && (\n          <div className="space-y-1.5">\n            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Description</label>')

content = content.replace('resize-none"\n            />\n          </div>',
'resize-none"\n            />\n          </div>\n          )}')

content = content.replace('{category !== \'skill\' && (', '{category !== \'skill\' && category !== \'knock\' && (')

with open('src/app/(app)/add/page.tsx', 'w') as f:
    f.write(content)
