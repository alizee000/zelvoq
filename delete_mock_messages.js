const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://aqalfjxrzamtkrsxsvpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWxmanhyemFtdGtyc3hzdnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzU3ODUsImV4cCI6MjEwNTU1MTc4NX0.54dVvjyrH_mrPVyY_KldLkGkx9E_sU-8_V3wrDZ2F3s'
);
async function main() {
  const { data: messages } = await supabase.from('event_messages').select('*');
  console.log('Event messages:', messages);
  
  const { data: feed } = await supabase.from('feed_posts').select('*').eq('type', 'chat');
  console.log('Feed chats count:', feed ? feed.length : 0);
  
  // Just delete all event messages since they are mock
  if (messages && messages.length > 0) {
    const { error } = await supabase.from('event_messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log('Deleted event messages error:', error || 'Success');
  }
}
main();
