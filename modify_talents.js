const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://aqalfjxrzamtkrsxsvpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWxmanhyemFtdGtyc3hzdnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzU3ODUsImV4cCI6MjEwNTU1MTc4NX0.54dVvjyrH_mrPVyY_KldLkGkx9E_sU-8_V3wrDZ2F3s'
);
async function main() {
  // 1. Delete all talents except Ritesh and Swathi
  const { data: d1, error: e1 } = await supabase
    .from('talents')
    .delete()
    .not('owner_name', 'in', '("Ritesh","Swathi")');
  console.log('Delete others:', e1 || 'Success');

  // 2. Insert profile for Jai
  const { data: d2, error: e2 } = await supabase
    .from('profiles')
    .upsert({ owner_name: 'Jai' });
  console.log('Insert Jai profile:', e2 || 'Success');

  // 3. Get Swathi's society_id
  const { data: swathi } = await supabase.from('talents').select('society_id').eq('owner_name', 'Swathi').limit(1).single();
  const societyId = swathi ? swathi.society_id : '7654e20e-e251-4bba-b56d-def4e4a09709';

  // 4. Insert Jai's talent
  const { data: d3, error: e3 } = await supabase
    .from('talents')
    .insert({
      title: 'Chess Player & Coach',
      description: 'I am an avid chess player and love to teach kids and adults the fundamentals of the game. Open for friendly matches or coaching sessions over the weekend!',
      category: 'skill',
      is_paid: false,
      owner_name: 'Jai',
      tower: 'Blue Block, DSR Rainbow Heights Apartment',
      skills: ['Chess', 'Strategy', 'Board Games'],
      society_id: societyId
    });
  console.log('Insert Jai talent:', e3 || 'Success');
}
main();
