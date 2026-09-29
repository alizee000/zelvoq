const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://aqalfjxrzamtkrsxsvpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWxmanhyemFtdGtyc3hzdnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzU3ODUsImV4cCI6MjEwNTU1MTc4NX0.54dVvjyrH_mrPVyY_KldLkGkx9E_sU-8_V3wrDZ2F3s'
);
async function main() {
  const { error: tErr } = await supabase.from('talents').insert([
    {
      title: 'Sony PlayStation 5 with 2 Controllers',
      description: 'Barely using it this month. Happy to lend it out for a weekend gaming session.',
      category: 'item',
      owner_name: 'Zeeshan Ali'
    },
    {
      title: 'Covered Parking Spot (B-Block)',
      description: 'Out of town for the week. Feel free to use my covered parking spot if you have guests.',
      category: 'space',
      owner_name: 'Sarah'
    }
  ]);
  console.log('Talents Insert:', tErr || 'Success');
  
  const { error: pErr } = await supabase.from('profiles').upsert([
    { owner_name: 'Sarah', flat_number: 'B-302', role: 'resident', image_url: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=400&auto=format&fit=crop' },
    { owner_name: 'Zeeshan Ali', flat_number: 'A-101', role: 'admin', image_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=400&auto=format&fit=crop' }
  ], { onConflict: 'owner_name' });
  console.log('Profiles Insert:', pErr || 'Success');
}
main();
