import { createClient } from "@supabase/supabase-js";

const supabaseKey = "sb_publishable_MnSHb3hZOrlbjUQwcoBXTw_7yC1N8x6";
const supabaseUrl = "https://inqvyfirgvrhxniawlzq.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseKey);
