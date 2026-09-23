import re

with open('src/app/(app)/events/[id]/page.tsx', 'r') as f:
    content = f.read()

# Add leaveEvent action
if 'leaveEvent' not in content:
    content = content.replace('joinEvent, sendEventMessage', 'joinEvent, leaveEvent, sendEventMessage')
    
# Add Leave Event form button right under the RSVP & Join Chat if they HAVE joined
leave_button = """        )}
        
        {hasJoined && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-bold text-emerald-600">You are attending! 🎉</span>
            <form action={async () => {
              "use server";
              await leaveEvent(eventId);
            }}>
              <button className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors">
                Leave Event
              </button>
            </form>
          </div>
        )}
      </div>"""

content = content.replace('        )}\n      </div>', leave_button)

with open('src/app/(app)/events/[id]/page.tsx', 'w') as f:
    f.write(content)
