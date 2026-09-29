const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://aqalfjxrzamtkrsxsvpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWxmanhyemFtdGtyc3hzdnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzU3ODUsImV4cCI6MjEwNTU1MTc4NX0.54dVvjyrH_mrPVyY_KldLkGkx9E_sU-8_V3wrDZ2F3s'
);

async function main() {
  // 1. Get an existing society_id
  const { data: swathi } = await supabase.from('talents').select('society_id').limit(1).single();
  const societyId = swathi ? swathi.society_id : '7654e20e-e251-4bba-b56d-def4e4a09709';

  // 2. Insert profile for Pradeep
  const { error: e1 } = await supabase
    .from('profiles')
    .upsert({ owner_name: 'Pradeep' });
  console.log('Insert Pradeep profile:', e1 || 'Success');

  // 3. Insert talent for Pradeep
  const { error: e2 } = await supabase
    .from('talents')
    .insert({
      title: 'Portrait Artist',
      description: 'I specialize in drawing and painting lifelike portraits. Whether you want a charcoal sketch or a vibrant watercolor painting of your loved ones or pets, I can create a timeless piece of art for you.',
      category: 'skill',
      is_paid: true,
      owner_name: 'Pradeep',
      tower: 'Green Block, DSR Rainbow Heights Apartment',
      skills: ['Portrait', 'Art', 'Drawing', 'Painting'],
      society_id: societyId
    });
  console.log('Insert Pradeep talent:', e2 || 'Success');
}

main();
