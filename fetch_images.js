const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://inqvyfirgvrhxniawlzq.supabase.co',
  'sb_publishable_MnSHb3hZOrlbjUQwcoBXTw_7yC1N8x6'
);

async function run() {
  const { data, error } = await supabase
    .from('events-past')
    .select('*')
    .ilike('title', '%Qiskit%');
  
  if (error) {
    console.error(error);
  } else {
    if (data.length > 0) {
      console.log(JSON.stringify(data[0].images, null, 2));
    } else {
      console.log("No qiskit events found");
    }
  }
}

run();
