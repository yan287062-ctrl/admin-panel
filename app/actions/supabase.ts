'use server';

import { createClient } from '@supabase/supabase-js';

// Vercel Proxy လမ်းကြောင်းကို အသေသတ်မှတ်လိုက်ပါပြီ
const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function savePricesToDb(allItems: any[]) {
  try {
    // 🌟 Error ဖြေရှင်းရန်: ID တူနေသော အချက်အလက်များကို ဖယ်ထုတ်ပါမည် 🌟
    const uniqueItemsMap = new Map();
    
    allItems.forEach(item => {
      // ID ကို Key အနေနဲ့သုံးပြီး Duplicate ဖြစ်နေရင် နောက်ဆုံးတစ်ခုကိုပဲ ယူပါမယ်
      // 🌟 အသစ်ထည့်ထားသော base_usd ကိုပါ Database ထဲ သိမ်းရန် ပြင်ဆင်ထားပါသည် 🌟
      uniqueItemsMap.set(item.id, {
        id: item.id,
        category: item.category,
        name: item.name,
        bonus: item.bonus,
        price: Number(item.price) || 0,
        base_usd: Number(item.base_usd) || 0 
      });
    });

    const uniqueItems = Array.from(uniqueItemsMap.values());

    // Data များလွန်းပါက အပိုင်းလိုက် (၁၀၀ စီ) ခွဲပို့ရန်
    const chunkSize = 100;
    for (let i = 0; i < uniqueItems.length; i += chunkSize) {
      const chunk = uniqueItems.slice(i, i + chunkSize);
      const { error } = await supabase.from('game_prices').upsert(chunk, { onConflict: 'id' });
      
      if (error) return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Unknown error" };
  }
}