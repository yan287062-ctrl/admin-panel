import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Telegram & FazerCards Keys
const TELEGRAM_BOT_TOKEN = '8911924033:AAHoXq6poQPUBkOhT1nOLRr2ZmrCDbH_2lc'; 
const TELEGRAM_CHAT_ID = '1934339791'; 
const FAZER_API_KEY = 'fc_b3a25a567f875483c62dd761'; // 🌟 FazerCards API Key ထည့်ရန် 🌟

const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, player_id, zone_id, item_name, game_name, price } = body;

    // 1️⃣ FazerCards ဆီသို့ Auto Topup လှမ်းလုပ်ခြင်း
    // (မှတ်ချက်: FazerCards ၏ API Endpoint နှင့် Parameter အတိအကျကို မင်းရဲ့ API Docs အတိုင်း ပြင်ပေးနိုင်ပါသည်)
    const fazerResponse = await fetch('https://reseller.fazercards.com/api/v1/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FAZER_API_KEY}`
      },
      body: JSON.stringify({
        game: game_name,
        item: item_name,
        player_id: player_id,
        zone_id: zone_id || ''
      })
    });

    const fazerData = await fazerResponse.json();
    let statusMsg = '';
    let isSuccess = false;

    if (fazerData.ok || fazerData.success) {
      isSuccess = true;
      statusMsg = '✅ FazerCards တွင် အောင်မြင်စွာ ဝယ်ယူပြီးပါပြီ။ (Auto-Topup Success)';
      // Supabase တွင် Order Status ကို 'success' သို့ ပြောင်းမည်
      await supabase.from('orders').update({ status: 'success' }).eq('id', order_id);
    } else {
      statusMsg = `❌ ဝယ်ယူမှု ကျရှုံးပါသည်: ${fazerData.message || 'Unknown Error'}`;
      // ကျရှုံးပါက 'pending' အတိုင်း ပြန်ထားမည်
      await supabase.from('orders').update({ status: 'pending' }).eq('id', order_id);
    }

    // 2️⃣ Telegram သို့ Report ပို့ခြင်း
    const message = `
🆕 <b>Auto-Fill System Report</b> 🤖
━━━━━━━━━━━━━━━━━━
🎮 Game: ${game_name}
💎 Item: ${item_name}
💰 Price: ${price} Ks
🆔 ID: <code>${player_id}</code> ${zone_id ? `| Zone: <code>${zone_id}</code>` : ''}
🧾 Order ID: <code>${order_id}</code>
━━━━━━━━━━━━━━━━━━
📊 <b>Status:</b> ${statusMsg}
    `;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'HTML' })
    });

    if (isSuccess) {
      return NextResponse.json({ success: true, message: "FazerCards သို့ အော်ဒါဝင်ပြီး Telegram သို့ Report ပို့ပြီးပါပြီ ✅" });
    } else {
      return NextResponse.json({ success: false, message: statusMsg });
    }
    
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}