import re

with open('src/app/(app)/add/page.tsx', 'r') as f:
    content = f.read()

old_categories = """  const categories = [
    { id: 'skill', label: 'Share a Skill', desc: 'Teach or offer services', icon: Star, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { id: 'item', label: 'Lend an Item', desc: 'Tools, books, appliances', icon: Package, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
    { id: 'space', label: 'Share Space', desc: 'Parking, storage, desks', icon: Key, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { id: 'deal', label: 'Group Buy', desc: 'Split bulk purchases', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { id: 'event', label: 'Host Event', desc: 'Meetups, games, classes', icon: Calendar, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
    { id: 'coown', label: 'Co-own Asset', desc: 'Fractional ownership', icon: PieChart, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
    { id: 'knock', label: 'Knock Knock', desc: 'Ask for quick help', icon: Hand, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
  ];"""

new_categories = """  const categories = [
    { id: 'knock', label: 'Knock Knock', desc: 'Ask for quick help', icon: Hand, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
    { id: 'skill', label: 'Share a Skill', desc: 'Teach or offer services', icon: Star, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { id: 'item', label: 'Lend an Item', desc: 'Tools, books, appliances', icon: Package, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
    { id: 'event', label: 'Host Event', desc: 'Meetups, games, classes', icon: Calendar, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
    { id: 'space', label: 'Share Space', desc: 'Parking, storage, desks', icon: Key, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { id: 'deal', label: 'Group Buy', desc: 'Split bulk purchases', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { id: 'coown', label: 'Co-own Asset', desc: 'Fractional ownership', icon: PieChart, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
  ];"""

if old_categories in content:
    content = content.replace(old_categories, new_categories)
    with open('src/app/(app)/add/page.tsx', 'w') as f:
        f.write(content)
    print("Successfully replaced.")
else:
    print("Could not find the target string to replace.")
