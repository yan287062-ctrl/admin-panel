import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

const BOT_TOKEN = "8916421457:AAE8spRRfqR5fc3MDeWPdpfQoPHsEXmwfp0";
const ADMIN_CHAT_ID = "1934339791";

export async function POST(request: Request) {
  try {
    const update = await request.json();

    if (update.message && update.message.text && update.message.chat.id.toString() === ADMIN_CHAT_ID) {
      const text = update.message.text.trim();
      const chatId = update.message.chat.id;

      if (text === '/balance') {
        const { data: settings } = await supabase.from('bot_settings').select('coin_balance').eq('id', 1).single();
        const balance = settings?.coin_balance || "Unknown";
        
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: chatId, 
                text: `🪙 <b>Smile Coin လက်ကျန်ငွေ:</b> ${balance} Coins`, 
                parse_mode: 'HTML' 
            })
        });
      }
      else if (text.startsWith('/setcookie ')) {
        const newCookie = text.replace('/setcookie ', '').trim();
        await supabase.from('bot_settings').update({ cookie: newCookie }).eq('id', 1);

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: chatId, 
                text: `✅ Cookie အသစ် Database သို့ အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!`
            })
        });
      }
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}