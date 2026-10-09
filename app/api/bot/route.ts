import { NextResponse } from 'next/server';

// 🌟 မင်းရဲ့ Telegram Bot Token နဲ့ Chat ID ကို ဒီမှာ အစားထိုးပါ 🌟
const TELEGRAM_BOT_TOKEN = '8911924033:AAHoXq6poQPUBkOhT1nOLRr2ZmrCDbH_2lc'; 
const TELEGRAM_CHAT_ID = '1934339791'; 

export async function POST(req: Request) {
  try {
    // Admin Panel က ပို့လိုက်တဲ့ အော်ဒါ Data တွေကို လက်ခံယူခြင်း
    const body = await req.json();
    const { order_id, player_id, zone_id, item_name, game_name } = body;

    // Telegram သို့ ပို့မည့် စာသား Format အလှဆင်ခြင်း
    const message = `
🆕 <b>New Auto-Fill Request</b> 🤖
━━━━━━━━━━━━━━━━━━
🎮 Game: ${game_name || 'N/A'}
💎 Item: ${item_name || 'N/A'}
🆔 ID: <code>${player_id || 'N/A'}</code>
🌐 Zone: ${zone_id ? `<code>${zone_id}</code>` : 'N/A'}
🧾 Order ID: <code>${order_id}</code>
━━━━━━━━━━━━━━━━━━
    `;

    // Telegram API သို့ လှမ်းပို့ခြင်း
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const tgResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!tgResponse.ok) {
      const errorData = await tgResponse.json();
      console.error("Telegram Error:", errorData);
      throw new Error('Telegram သို့ ပို့ရာတွင် အခက်အခဲရှိနေပါသည်။');
    }

    // အောင်မြင်ကြောင်း Admin Panel သို့ ပြန်အကြောင်းကြားခြင်း
    return NextResponse.json({ success: true, message: "Telegram Bot ထံသို့ အော်ဒါ အောင်မြင်စွာ ပို့ပြီးပါပြီ! ✅" });
    
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}