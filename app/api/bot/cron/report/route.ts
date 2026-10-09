import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const TELEGRAM_BOT_TOKEN = '8911924033:AAHoXq6poQPUBkOhT1nOLRr2ZmrCDbH_2lc'; 
const TELEGRAM_CHAT_ID = '1934339791'; 

const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: Request) {
  try {
    // ယနေ့အတွက် အချိန်သတ်မှတ်ခြင်း (Start of Today)
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

    // ယနေ့ရောင်းရသော အော်ဒါများကို ဆွဲထုတ်ခြင်း ('done' နှင့် 'success' သာ)
    const { data: orders } = await supabase
      .from('orders')
      .select('price, status, created_at')
      .gte('created_at', startOfToday)
      .in('status', ['done', 'success']);

    let totalSales = 0;
    let totalOrders = 0;

    if (orders) {
      totalOrders = orders.length;
      totalSales = orders.reduce((sum, order) => sum + (Number(order.price) || 0), 0);
    }

    const message = `
📈 <b>Daily Sales Report (Paing Gyi Shop)</b>
📅 Date: ${now.toLocaleDateString('en-GB', { timeZone: 'Asia/Yangon' })}
━━━━━━━━━━━━━━━━━━
🛍️ <b>Total Orders:</b> ${totalOrders} မှု
💰 <b>Total Revenue:</b> ${totalSales.toLocaleString()} Ks
━━━━━━━━━━━━━━━━━━
<i>*This is an automated daily report.*</i>
    `;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'HTML' })
    });

    return NextResponse.json({ success: true, message: "Daily report sent!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}