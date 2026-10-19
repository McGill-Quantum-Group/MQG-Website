import { createClient } from "@supabase/supabase-js";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucXZ5ZmlyZ3ZyaHhuaWF3bHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NjY2OTgsImV4cCI6MjA4NTQ0MjY5OH0.UAfeDCDklcRob9IBRHedQ7H0g4tFMMgtXT0EhtZ7plk";
const supabaseUrl = "https://inqvyfirgvrhxniawlzq.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseKey);
