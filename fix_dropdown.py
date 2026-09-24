import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Add notifications to props
old_props = r'export function NotificationsDropdown\(\{ \s*initialActive, \s*initialCompleted \s*\}\: \{ \s*initialActive\: any\[\],\s*initialCompleted\: any\[\]\s*\}\) \{'
new_props = """export function NotificationsDropdown({ 
  initialActive, 
  initialCompleted,
  notifications = []
}: { 
  initialActive: any[],
  initialCompleted: any[],
  notifications?: any[]
}) {"""
content = re.sub(old_props, new_props, content)

# Calculate total count
content = content.replace('activePolls.length > 0', '(activePolls.length + notifications.length) > 0')
content = content.replace('{activePolls.length}', '{activePolls.length + notifications.length}')

# Render notifications above past decisions
old_past = r'\{\/\* Past Decisions Section \*\/\}'
new_past = """{/* Feed Notifications Section */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Community Activity</h4>
                  <div className="flex flex-col gap-3">
                    {notifications.map((notif: any) => (
                      <div key={notif.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-600">{notif.author_name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800 leading-tight">
                            <span className="font-bold">{notif.author_name}</span> {notif.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Decisions Section */}"""
content = content.replace(old_past, new_past)

# Change empty message condition
content = content.replace('activePolls.length === 0 ? (', '(activePolls.length === 0 && notifications.length === 0) ? (')

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)
