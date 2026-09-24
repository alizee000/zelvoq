import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

old_block = r'\{\/\* Past Decisions Section \*\/\}\s*\{initialCompleted\.length > 0 && \('

new_block = """{/* Feed Notifications Section */}
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

              {/* Past Decisions Section */}
              {initialCompleted.length > 0 && ("""

content = re.sub(old_block, new_block, content)

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)
