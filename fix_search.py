import re

# 1. Update Home Page to use <form>
with open('src/app/(app)/home/page.tsx', 'r') as f:
    home_content = f.read()

old_search = r'<div className="relative">\s*<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">\s*<Search className="h-5 w-5 text-slate-400" \/>\s*<\/div>\s*<input\s*type="text"\s*placeholder="What are you looking for\?"\s*className="w-full bg-slate-50 border-none rounded-full py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500\/20"\s*\/>\s*<\/div>'

new_search = """<form action="/discover" className="relative block group">
            <button type="submit" className="absolute inset-y-0 left-4 flex items-center cursor-pointer z-10 hover:scale-110 transition-transform">
              <Search className="h-5 w-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </button>
            <input 
              type="text"
              name="q" 
              placeholder="What are you looking for?" 
              className="w-full bg-slate-50 border-none rounded-full py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
            />
          </form>"""

home_content = re.sub(old_search, new_search, home_content)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(home_content)


# 2. Update Discover Page to pass query
with open('src/app/(app)/discover/page.tsx', 'r') as f:
    discover_page = f.read()

old_page_sig = r'export default async function DiscoverPage\(\) \{'
new_page_sig = 'export default async function DiscoverPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {\n  const searchParams = await props.searchParams;\n  const q = typeof searchParams.q === "string" ? searchParams.q : "";'
discover_page = re.sub(old_page_sig, new_page_sig, discover_page)

discover_page = discover_page.replace('<DiscoverClient skills={skills} />', '<DiscoverClient skills={skills} initialQuery={q} />')

with open('src/app/(app)/discover/page.tsx', 'w') as f:
    f.write(discover_page)


# 3. Update Discover Client to use initialQuery
with open('src/app/(app)/discover/discover-client.tsx', 'r') as f:
    discover_client = f.read()

discover_client = discover_client.replace(
    'export function DiscoverClient({ skills }: { skills: any[] }) {', 
    'export function DiscoverClient({ skills, initialQuery = "" }: { skills: any[], initialQuery?: string }) {'
)
discover_client = discover_client.replace(
    'const [searchQuery, setSearchQuery] = useState("");',
    'const [searchQuery, setSearchQuery] = useState(initialQuery);'
)

with open('src/app/(app)/discover/discover-client.tsx', 'w') as f:
    f.write(discover_client)

