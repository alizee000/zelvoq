with open('src/app/(app)/profile/loading.tsx', 'r') as f:
    content = f.read()

# Fix layout wrapper to be transparent
content = content.replace(
    '<div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-32 pt-6 px-6">',
    '<div className="flex flex-col min-h-screen bg-transparent pb-32 pt-6 px-6 relative overflow-hidden">'
)

# Fix ID Card skeleton to Light Mode
content = content.replace(
    '<div className="w-full h-[400px] bg-slate-900 rounded-[2rem] animate-pulse p-8 flex flex-col items-center">',
    '<div className="w-full h-[400px] bg-white rounded-[2rem] border border-slate-100 shadow-sm animate-pulse p-8 flex flex-col items-center">'
)
content = content.replace('bg-slate-800', 'bg-slate-100')

with open('src/app/(app)/profile/loading.tsx', 'w') as f:
    f.write(content)
