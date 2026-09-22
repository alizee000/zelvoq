sed -i '' 's|import { format } from "date-fns";||g' src/app/\(app\)/events/page.tsx
sed -i '' "s|format(new Date(event.event_date), 'MMM')|new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })|g" src/app/\(app\)/events/page.tsx
sed -i '' "s|format(new Date(event.event_date), 'd')|new Date(event.event_date).getDate()|g" src/app/\(app\)/events/page.tsx

sed -i '' 's|import { format } from "date-fns";||g' src/app/\(app\)/events/\[id\]/page.tsx
sed -i '' "s|format(new Date(event.event_date), 'MMM d, h:mm a')|new Date(event.event_date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })|g" src/app/\(app\)/events/\[id\]/page.tsx
