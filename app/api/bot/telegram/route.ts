import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 🌟 အရေးကြီးဆုံး: Vercel ကို Cache မလုပ်ဘဲ အမြဲ အရှင် အလုပ်လုပ်ခိုင်းခြင်း 🌟
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

// မင်းရဲ့ Bot Token နဲ့ Admin ID အမှန်
const BOT_TOKEN = "8916421457:AAE8spRRfqR5fc3MDeWPdpfQoPHsEXmwfp0"; 
const ADMIN_CHAT_ID = "1934339791"; 

export async function POST(request: Request) {
  try {
    const update = await request.json();

    if (update.message && update.message.text) {
      const text = update.message.text.trim();
      const chatId = update.message.chat.id.toString();

      // လုံခြုံရေး: Admin ID မဟုတ်ရင် ဘာမှ ပြန်မလုပ်ပေးဘူး
      if (chatId !== ADMIN_CHAT_ID) {
          return NextResponse.json({ ok: true }); 
      }

      // 1. /balance (Smile Coin လက်ကျန်စစ်ရန်)
      if (text === '/balance') {
        const { data: settings } = await supabase.from('bot_settings').select('coin_balance').eq('id', 1).single();
        const balance = settings?.coin_balance || "0";
        
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
      // 2. /setcookie (Cookie အသစ်ထည့်ရန်)
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
      // 3. /start (Bot အလုပ်လုပ်ကြောင်းပြရန်)
      else if (text === '/start') {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: chatId, 
                text: `🤖 <b>Paing Gyi Shop Admin Bot</b> အဆင်သင့် ဖြစ်ပါပြီ။\n\n- /balance (Coin လက်ကျန်စစ်ရန်)\n- /setcookie <cookie> (Cookie အသစ်ထည့်ရန်)`, 
                parse_mode: 'HTML' 
            })
        });
      }
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    // Error တက်ရင်တောင် Telegram ကို 200 OK ပြန်ပေးမှ Webhook က Error ပတ်လည် မရိုက်မှာပါ
    return NextResponse.json({ ok: true }); 
  }
}

// Vercel ပေါ်မှာ လင့်ခ်အလုပ်လုပ်/မလုပ် စမ်းသပ်ရန်
export async function GET() {
    return NextResponse.json({ message: "Paing Gyi Telegram Webhook is Active!" });
}