import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

// 🌟 Bot Token နဲ့ Admin ID
const BOT_TOKEN = "8916421457:AAE8spRRfqR5fc3MDeWPdpfQoPHsEXmwfp0"; 
const ADMIN_CHAT_ID = "1934339791"; 

// 🌟 Cloudflare ကို ကျော်ဖို့ Headers အပြည့်အစုံနဲ့ ပြင်ထားတဲ့ Function 🌟
async function fetchSmileBalance(cookie: string): Promise<string | null> {
    try {
        const response = await fetch("https://www.smile.one/br/smilecoin/record", {
            method: 'GET',
            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "max-age=0",
                "Connection": "keep-alive",
                "Sec-Ch-Ua": '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": '"Windows"',
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
                "Cookie": cookie
            }
        });
        const html = await response.text();
        
        // Console မှာ စစ်ဆေးနိုင်ရန်
        console.log("Smile.One HTML Snippet:", html.substring(0, 150)); 

        const match = html.match(/<span class="currency">([\d,.]+)<\/span>/);
        if (match && match[1]) {
            return match[1]; 
        }
        return null; 
    } catch (e) {
        console.error("Fetch Error:", e);
        return null;
    }
}

export async function POST(request: Request) {
  try {
    const update = await request.json();

    if (update.message && update.message.text) {
      const text = update.message.text.trim();
      const chatId = update.message.chat.id.toString();

      if (chatId !== ADMIN_CHAT_ID) {
          return NextResponse.json({ ok: true }); 
      }

      // 1. /balance
      if (text === '/balance') {
        const { data: settings } = await supabase.from('bot_settings').select('coin_balance, cookie').eq('id', 1).single();
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
      // 2. /setcookie
      else if (text.startsWith('/setcookie ')) {
        const newCookie = text.replace('/setcookie ', '').trim();
        
        // Telegram ကို "စစ်ဆေးနေပါသည်" လို့ အရင်ပို့မယ်
        const msgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: chatId, 
                text: `⏳ Cookie အသစ်အား စစ်ဆေးနေပါသည်...`
            })
        });
        const msgData = await msgRes.json();
        const messageId = msgData.result.message_id;

        // Balance လှမ်းဆွဲမယ် (Cloudflare ကျော်မယ့် Headers နဲ့)
        const currentBalance = await fetchSmileBalance(newCookie);
        let activityStatus = "Active ✅";
        let finalBalance = currentBalance;

        if (!currentBalance) {
            activityStatus = "Expired / Invalid ❌";
            finalBalance = "N/A";
        }

        const balanceToSave: string = (finalBalance && finalBalance !== "N/A") ? finalBalance.replace(/,/g, '') : "0";

        // Database ထဲမှာ Update လုပ်မယ်
        await supabase.from('bot_settings').update({ 
            cookie: newCookie, 
            coin_balance: balanceToSave 
        }).eq('id', 1);

        // စာသားကို Edit လုပ်မယ်
        const replyText = `✅ <b>Cookie Updated Successfully!</b>\n\n`
                        + `📊 <b>Activity:</b> ${activityStatus}\n`
                        + `🪙 <b>Current Balance:</b> ${finalBalance} Smile Coins`;

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: chatId, 
                message_id: messageId,
                text: replyText,
                parse_mode: 'HTML'
            })
        });
      }
      // 3. /start
      else if (text === '/start') {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: chatId, 
                text: `🤖 <b>Paing Gyi Shop Admin Bot</b> အဆင်သင့် ဖြစ်ပါပြီ。\n\n- /balance (Coin လက်ကျန်စစ်ရန်)\n- /setcookie <cookie> (Cookie အသစ်ထည့်ရန်)`, 
                parse_mode: 'HTML' 
            })
        });
      }
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ ok: true }); 
  }
}

export async function GET() {
    return NextResponse.json({ message: "Paing Gyi Telegram Webhook is Active!" });
}