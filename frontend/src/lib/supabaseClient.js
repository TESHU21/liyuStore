import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aahhhdxsrgfkpslweary.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhaGhoZHhzcmdma3BzbHdlYXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjM5MjQsImV4cCI6MjA2NjQzOTkyNH0.RBEj9WlB24OU_whzV6MjSzeR9_yujxFOYViE5OH2lO8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
