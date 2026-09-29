const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://aqalfjxrzamtkrsxsvpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWxmanhyemFtdGtyc3hzdnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzU3ODUsImV4cCI6MjEwNTU1MTc4NX0.54dVvjyrH_mrPVyY_KldLkGkx9E_sU-8_V3wrDZ2F3s'
);

const replacements = [
  { old: 'Ritesh', new: 'Rupesh' },
  { old: 'Manas', new: 'Hansh' },
  { old: 'Jai', new: 'Sujai' }
];

async function main() {
  for (const { old: oldName, new: newName } of replacements) {
    console.log(`Renaming ${oldName} to ${newName}...`);

    // 1. Update profiles
    const { error: e1 } = await supabase.from('profiles').update({ owner_name: newName }).eq('owner_name', oldName);
    if (e1) console.error('Profiles error:', e1);

    // 2. Update talents
    const { error: e2 } = await supabase.from('talents').update({ owner_name: newName }).eq('owner_name', oldName);
    if (e2) console.error('Talents error:', e2);
    
    // 3. Update events (creator_name)
    const { error: e3 } = await supabase.from('events').update({ creator_name: newName }).eq('creator_name', oldName);
    
    // 4. Update feed_posts (author_name)
    const { error: e4 } = await supabase.from('feed_posts').update({ author_name: newName }).eq('author_name', oldName);
    
    // 5. Update event_messages (sender_name)
    const { error: e5 } = await supabase.from('event_messages').update({ sender_name: newName }).eq('sender_name', oldName);
    
    console.log(`Done renaming ${oldName}.`);
  }
}

main();
