const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://aqalfjxrzamtkrsxsvpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWxmanhyemFtdGtyc3hzdnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NzU3ODUsImV4cCI6MjEwNTU1MTc4NX0.54dVvjyrH_mrPVyY_KldLkGkx9E_sU-8_V3wrDZ2F3s'
);

async function main() {
  const { data: d1, error: e1 } = await supabase
    .from('talents')
    .update({ tower: 'Red Block, DSR Rainbow Heights Apartment' })
    .eq('owner_name', 'Swathi');
    
  console.log('Swathi Update:', e1 || 'Success');

  const { data: d2, error: e2 } = await supabase
    .from('talents')
    .update({ tower: 'Indigo Block, DSR Rainbow Heights Apartment' })
    .eq('owner_name', 'Ritesh');
    
  console.log('Ritesh Update:', e2 || 'Success');
}

main();
