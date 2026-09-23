import re

with open('src/app/auth-client.tsx', 'r') as f:
    content = f.read()

# Make background matching Home page
content = content.replace('min-h-screen bg-slate-50 relative', 'min-h-screen bg-slate-50/50 relative')

# Soften shadow on the main card
content = content.replace('shadow-xl border border-slate-100', 'shadow-sm border border-slate-100')

# Update Tabs to be pill-shaped
content = content.replace('bg-slate-100/50 p-1 rounded-2xl', 'bg-slate-100/50 p-1 rounded-full')
content = content.replace('rounded-xl transition-all', 'rounded-full transition-all')

# Update all inputs to be perfectly pill-shaped or smoothly rounded
content = content.replace('rounded-2xl', 'rounded-full')

# Update specific input styles to remove borders or lighten them to match Home search
content = content.replace('border border-slate-200', 'border-none')
# Add shadow-sm to borderless inputs to make them stand out slightly against the white card
content = content.replace('bg-slate-50 border-none', 'bg-slate-50 border-none shadow-sm')

# For the passcode field, adjust it too
content = content.replace('border border-indigo-200', 'border-none shadow-sm')

with open('src/app/auth-client.tsx', 'w') as f:
    f.write(content)

