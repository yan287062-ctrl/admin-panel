'use server';

import { createClient } from '@supabase/supabase-js';

// Vercel Proxy လမ်းကြောင်းကို အသေသတ်မှတ်လိုက်ပါပြီ
const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function savePricesToDb(allItems: any[]) {
  try {
    const { error } = await supabase.from('game_prices').upsert(allItems, { onConflict: 'id' });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Unknown error" };
  }
}