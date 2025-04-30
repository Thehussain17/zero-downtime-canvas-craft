
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sqcjlqeiojrfouethboe.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY2pscWVpb2pyZm91ZXRoYm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MDY1NjcsImV4cCI6MjA2MTQ4MjU2N30.qqVFQOgRnSYXqSGfhzCqHdeOCi6Td0vkGX2CT4wlPiM';

// Log a warning if environment variables are missing
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Missing Supabase URL or Anon Key. Please check your environment variables.');
  console.info('You must set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
