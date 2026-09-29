import re

# Update home/page.tsx
with open('src/app/(app)/home/page.tsx', 'r') as f:
    home_content = f.read()

if 'userFullName={fullName}' not in home_content:
    home_content = home_content.replace(
        'const firstName = user?.firstName || "Neighbor";',
        'const firstName = user?.firstName || "Neighbor";\n  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();'
    )
    home_content = home_content.replace(
        '<LiveKnocks knocks={liveKnocks} userFirstName={firstName} userImageUrl={user?.imageUrl} />',
        '<LiveKnocks knocks={liveKnocks} userFirstName={firstName} userFullName={fullName} userImageUrl={user?.imageUrl} />'
    )
    with open('src/app/(app)/home/page.tsx', 'w') as f:
        f.write(home_content)

# Update live-knocks.tsx
with open('src/components/ui/live-knocks.tsx', 'r') as f:
    knocks_content = f.read()

if 'userFullName: string;' not in knocks_content:
    knocks_content = knocks_content.replace(
        'userFirstName: string;',
        'userFirstName: string;\n  userFullName?: string;'
    )
    knocks_content = knocks_content.replace(
        'export function LiveKnocks({ knocks, userFirstName, userImageUrl }: LiveKnocksProps) {',
        'export function LiveKnocks({ knocks, userFirstName, userFullName, userImageUrl }: LiveKnocksProps) {'
    )

# Now find the "I can help!" button and make it conditional
old_button = """                  <button onClick={() => setActiveUser(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[16px] py-4 rounded-2xl transition-transform active:scale-95 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> I can help!
                  </button>"""

# We can import CheckCircle from lucide-react if not there. Let's just use X or Check.
# Actually, Lucide is imported as: import { Plus, X, MessageCircle, Clock, MapPin } from "lucide-react";
# We can add CheckCircle or just use X. Let's add CheckCircle.
if 'CheckCircle' not in knocks_content:
    knocks_content = knocks_content.replace('MessageCircle, Clock, MapPin', 'MessageCircle, Clock, MapPin, CheckCircle')

new_button = """                  {activeUser.owner_name === userFullName ? (
                    <button onClick={() => setActiveUser(null)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[16px] py-4 rounded-2xl transition-transform active:scale-95 flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" /> Mark as Resolved
                    </button>
                  ) : (
                    <button onClick={() => setActiveUser(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[16px] py-4 rounded-2xl transition-transform active:scale-95 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" /> I can help!
                    </button>
                  )}"""

if old_button in knocks_content:
    knocks_content = knocks_content.replace(old_button, new_button)
    with open('src/components/ui/live-knocks.tsx', 'w') as f:
        f.write(knocks_content)
    print("Successfully updated buttons.")
else:
    print("Could not find button to replace.")

