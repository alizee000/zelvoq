import re

with open('src/app/(app)/knock-knocks/knock-knock-list-client.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { formatDistanceToNow } from "date-fns";', """function formatDistanceToNow(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}""")

content = content.replace('formatDistanceToNow(new Date(knock.created_at), { addSuffix: true })', 'formatDistanceToNow(new Date(knock.created_at))')

with open('src/app/(app)/knock-knocks/knock-knock-list-client.tsx', 'w') as f:
    f.write(content)
