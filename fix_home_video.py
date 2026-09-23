import re

with open('src/app/(app)/home/page.tsx', 'r') as f:
    content = f.read()

# Add the import
import_statement = 'import { CommunityVideo } from "./community-video";\n'
if import_statement not in content:
    content = content.replace('import { Search, Sparkles, Ticket, Activity, Camera, Coffee, ChevronRight } from "lucide-react";', 
                            'import { Search, Sparkles, Ticket, Activity, Camera, Coffee, ChevronRight } from "lucide-react";\n' + import_statement)

# Inject the video component below the header
header_section = """        {/* Header Section */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            ☀️ Good morning, {firstName}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Your community is full of hidden talent.
          </p>
        </section>"""

video_section = """        {/* Header Section */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            ☀️ Good morning, {firstName}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Your community is full of hidden talent.
          </p>
        </section>

        {/* Featured Video */}
        <CommunityVideo />"""

content = content.replace(header_section, video_section)

with open('src/app/(app)/home/page.tsx', 'w') as f:
    f.write(content)
