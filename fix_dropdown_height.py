import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Increase the max-h 
content = content.replace('className="max-h-[200px] overflow-y-auto hide-scrollbar"', 'className="max-h-[60vh] md:max-h-[400px] overflow-y-auto hide-scrollbar"')

# In case the user means on mobile the dropdown is pushed off-screen due to `right-0 w-64`, let's make it responsive
content = content.replace('className="absolute top-12 right-0 w-64 bg-white rounded-2xl', 'className="absolute top-12 right-0 w-[calc(100vw-3rem)] sm:w-80 max-w-sm bg-white rounded-2xl')

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)
