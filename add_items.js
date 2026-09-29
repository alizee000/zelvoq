const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://aqalfjxrzamtkrsxsvpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWxmanhyemFtdGtyc3hzdnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzU3ODUsImV4cCI6MjEwNTU1MTc4NX0.54dVvjyrH_mrPVyY_KldLkGkx9E_sU-8_V3wrDZ2F3s'
);

async function main() {
  const { data: swathi } = await supabase.from('talents').select('society_id').limit(1).single();
  const societyId = swathi ? swathi.society_id : '7654e20e-e251-4bba-b56d-def4e4a09709';

  const { error: e1 } = await supabase
    .from('talents')
    .insert({
      title: 'Bosch Heavy Duty Power Drill',
      description: 'I have a heavy duty Bosch power drill available to lend. Comes with a full set of masonry and wood drill bits. Perfect for hanging shelves or assembling furniture.',
      category: 'item',
      is_paid: false,
      owner_name: 'Ritesh',
      tower: 'Indigo Block, DSR Rainbow Heights Apartment',
      skills: ['Tools', 'Hardware', 'Drill'],
      society_id: societyId
    });
  console.log('Insert Drill item:', e1 || 'Success');

  const { error: e2 } = await supabase
    .from('talents')
    .insert({
      title: 'Covered Parking Spot (P2 - 104)',
      description: 'My covered parking spot in Basement 2 is available for rent during weekdays since I drive to work. Very close to the Red Block elevators.',
      category: 'space',
      is_paid: true,
      owner_name: 'Swathi',
      tower: 'Red Block, DSR Rainbow Heights Apartment',
      skills: ['Parking', 'Space', 'Vehicle'],
      society_id: societyId
    });
  console.log('Insert Parking space:', e2 || 'Success');
}

main();
