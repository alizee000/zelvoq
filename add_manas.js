const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://aqalfjxrzamtkrsxsvpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWxmanhyemFtdGtyc3hzdnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzU3ODUsImV4cCI6MjEwNTU1MTc4NX0.54dVvjyrH_mrPVyY_KldLkGkx9E_sU-8_V3wrDZ2F3s'
);

async function main() {
  // 1. Get an existing society_id
  const { data: swathi } = await supabase.from('talents').select('society_id').limit(1).single();
  const societyId = swathi ? swathi.society_id : '7654e20e-e251-4bba-b56d-def4e4a09709';

  // 2. Insert profile for Manas
  const { error: e1 } = await supabase
    .from('profiles')
    .upsert({ owner_name: 'Manas', image_url: '/manas.jpg' });
  console.log('Insert Manas profile:', e1 || 'Success');

  // 3. Insert talent for Manas
  const { error: e2 } = await supabase
    .from('talents')
    .insert({
      title: 'Bike Rider & Enthusiast',
      description: 'I love riding my Harley Davidson across the scenic routes on weekends. If you are looking for a riding buddy, tips on motorcycle maintenance, or just want to chat about bikes, hit me up!',
      category: 'skill',
      is_paid: false,
      owner_name: 'Manas',
      tower: 'Yellow Block, DSR Rainbow Heights Apartment',
      skills: ['Motorcycle', 'Riding', 'Harley Davidson', 'Travel'],
      society_id: societyId
    });
  console.log('Insert Manas talent:', e2 || 'Success');
}

main();
