import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://eivhzhntuzzufhphjmaf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpdmh6aG50dXp6dWZocGhqbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcyMzQzNDcsImV4cCI6MTk5MjgxMDM0N30.rdvR0rE56N_JTLAoYltbdPwDa5WT7HyNmbdih8hTaNs"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;