const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://aqalfjxrzamtkrsxsvpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWxmanhyemFtdGtyc3hzdnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzU3ODUsImV4cCI6MjEwNTU1MTc4NX0.54dVvjyrH_mrPVyY_KldLkGkx9E_sU-8_V3wrDZ2F3s'
);

const replacements = [
  { old: 'Pradeep', new: 'Randeep' }
];

async function main() {
  for (const { old: oldName, new: newName } of replacements) {
    console.log(`Renaming ${oldName} to ${newName}...`);

    await supabase.from('profiles').update({ owner_name: newName }).eq('owner_name', oldName);
    await supabase.from('talents').update({ owner_name: newName }).eq('owner_name', oldName);
    await supabase.from('events').update({ creator_name: newName }).eq('creator_name', oldName);
    await supabase.from('feed_posts').update({ author_name: newName }).eq('author_name', oldName);
    await supabase.from('event_messages').update({ sender_name: newName }).eq('sender_name', oldName);
    
    console.log(`Done renaming ${oldName}.`);
  }
}

main();
