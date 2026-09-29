const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://aqalfjxrzamtkrsxsvpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWxmanhyemFtdGtyc3hzdnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzU3ODUsImV4cCI6MjEwNTU1MTc4NX0.54dVvjyrH_mrPVyY_KldLkGkx9E_sU-8_V3wrDZ2F3s'
);

async function main() {
  const { error: e1 } = await supabase
    .from('profiles')
    .update({ image_url: '/pradeep.jpg' })
    .eq('owner_name', 'Pradeep');
  console.log('Update Pradeep profile image:', e1 || 'Success');

  const { error: e2 } = await supabase
    .from('profiles')
    .update({ image_url: '/jai.jpg' })
    .eq('owner_name', 'Jai');
  console.log('Update Jai profile image:', e2 || 'Success');
}
main();
