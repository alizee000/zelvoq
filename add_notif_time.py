import re

with open('src/components/layout/notifications-dropdown.tsx', 'r') as f:
    content = f.read()

# Add a helper function at the top
if 'function formatTime' not in content:
    content = content.replace('export function NotificationsDropdown', """function formatTime(dateString: string) {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' at ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '';
  }
}

export function NotificationsDropdown""")

# Add the time to the notification JSX
old_jsx = r'<p className="text-sm font-medium text-slate-800 leading-tight">\s*<span className="font-bold">\{notif\.author_name\}</span> \{notif\.content\}\s*</p>'

new_jsx = """<p className="text-sm font-medium text-slate-800 leading-tight">
                            <span className="font-bold">{notif.author_name}</span> {notif.content}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest" suppressHydrationWarning>
                            {formatTime(notif.created_at)}
                          </p>"""

content = re.sub(old_jsx, new_jsx, content)

with open('src/components/layout/notifications-dropdown.tsx', 'w') as f:
    f.write(content)

