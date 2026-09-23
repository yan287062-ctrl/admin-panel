import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

// 🌟 Telegram Bot အချက်အလက်များ 🌟
const BOT_TOKEN = "8916421457:AAGIW1kDmkLqX9c4MssARYS55Co-8aemWTU"; 
const ADMIN_CHAT_ID = "1934339791";

const BASE_URL = "https://www.smile.one/br";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// 🌟 မင်းရဲ့ bot5.py ထဲက MLBB Mapping အတိအကျ 🌟
const product_mapping: Record<string, string> = {
    '55 Diamonds': '1520',
    '165 Diamonds': '1521',
    '275 Diamonds': '1522',
    '565 Diamonds': '1523',
    '86 Diamonds': '1524',
    '172 Diamonds': '1525',
    '257 Diamonds': '1526',
    '343 Diamonds': '1527',
    '429 Diamonds': '1528',
    '514 Diamonds': '1529',
    '600 Diamonds': '1530',
    '705 Diamonds': '1531',
    '792 Diamonds': '1532',
    '878 Diamonds': '1533',
    '963 Diamonds': '1534',
    '1049 Diamonds': '1535',
    '1135 Diamonds': '1536',
    '1220 Diamonds': '1537',
    '1412 Diamonds': '1538',
    '1584 Diamonds': '1539',
    '1669 Diamonds': '1540',
    '1755 Diamonds': '1541',
    '1841 Diamonds': '1542',
    '2195 Diamonds': '1543',
    '2538 Diamonds': '1544',
    '2901 Diamonds': '1545',
    '3073 Diamonds': '1546',
    '3688 Diamonds': '1547',
    '3945 Diamonds': '1548',
    '4031 Diamonds': '1549',
    '4566 Diamonds': '1550',
    '5100 Diamonds': '1551',
    '5532 Diamonds': '1552',
    '6055 Diamonds': '1553',
    '6752 Diamonds': '1554',
    '7030 Diamonds': '1555',
    '7727 Diamonds': '1556',
    '9288 Diamonds': '1557',
    'Weekly Pass': '1558',
    'Weekly Pass x 2': '1559',
    'Weekly Pass x 3': '1560',
    'Weekly Pass x 4': '1561',
    'Weekly Pass x 5': '1562',
    'Twilight Pass': '1563',
    'Weekly Elite Bundle': '1564',
    'Monthly Epic Bundle': '1565'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order_id, player_id, zone_id, item_name, game_name } = body;

    if (!order_id || !player_id || !item_name) {
      return NextResponse.json({ success: false, message: "Missing required order details" }, { status: 400 });
    }

    const { data: settings, error: settingsError } = await supabase.from('bot_settings').select('cookie, coin_balance').eq('id', 1).single();
    if (settingsError || !settings || !settings.cookie) {
      return NextResponse.json({ success: false, message: "Smile.One Cookie is missing in Admin Settings" }, { status: 400 });
    }
    const COOKIE = settings.cookie;

    const HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "en-US,en;q=0.9",
        "Cookie": COOKIE,
        "X-Requested-With": "XMLHttpRequest"
    };

    const productId = product_mapping[item_name];

    if (!productId) {
        return NextResponse.json({ success: false, message: `Auto top-up unsupported for item: ${item_name}` });
    }

    // --- 1. Checkrole ---
    const checkRoleFormData = new URLSearchParams();
    checkRoleFormData.append('user_id', player_id);
    if (zone_id) checkRoleFormData.append('zone_id', zone_id);
    checkRoleFormData.append('pid', '29'); // MLBB PID

    const checkRoleRes = await fetch(`${BASE_URL}/customer/checkrole`, {
        method: 'POST',
        headers: { ...HEADERS, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: checkRoleFormData.toString()
    });
    
    let checkRoleData;
    try {
        checkRoleData = await checkRoleRes.json();
    } catch (e) {
        return NextResponse.json({ success: false, message: "Checkrole Failed. Cookie might be expired." });
    }

    if (checkRoleData.status !== 200) {
       return NextResponse.json({ success: false, message: "Account verification failed. Invalid ID or Zone." });
    }
    const accountName = checkRoleData.username;

    await delay(1000); 

    // --- 2. Create Order ---
    const createOrderFormData = new URLSearchParams();
    createOrderFormData.append('product_id', productId);
    createOrderFormData.append('user_id', player_id);
    if (zone_id) createOrderFormData.append('zone_id', zone_id);
    createOrderFormData.append('pay_channel', '196'); 
    createOrderFormData.append('pid', '29');
    createOrderFormData.append('amount', '1');

    const createOrderRes = await fetch(`${BASE_URL}/order/create`, {
        method: 'POST',
        headers: { ...HEADERS, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: createOrderFormData.toString()
    });
    
    let createOrderData;
    try {
       createOrderData = await createOrderRes.json();
    } catch (e) {
       return NextResponse.json({ success: false, message: "Failed to create order. Cookie might be expired." });
    }

    if (createOrderData.status !== 200 || !createOrderData.order_id) {
       return NextResponse.json({ success: false, message: "Order creation failed. " + (createOrderData.msg || "") });
    }
    const smileOrderId = createOrderData.order_id;
    const token = createOrderData.token;

    await delay(1000);

    // --- 3. Pay ---
    const payFormData = new URLSearchParams();
    payFormData.append('order_id', smileOrderId);
    payFormData.append('token', token);

    const payRes = await fetch(`${BASE_URL}/order/pay`, {
        method: 'POST',
        headers: { ...HEADERS, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: payFormData.toString()
    });
    const payData = await payRes.json();

    // ❌ ငွေပေးချေမှု မအောင်မြင်ပါက (Coin မလောက်ခြင်း စသည်)
    if (payData.status !== 200) {
        const errorCaption = `❌ <b>Auto Top-up Failed!</b>\n\n`
                           + `👤 <b>Account:</b> <code>${accountName}</code>\n`
                           + `🆔 <b>Game ID:</b> <code>${player_id} ${zone_id ? `(${zone_id})` : ''}</code>\n`
                           + `💎 <b>Item:</b> ${item_name}\n`
                           + `⚠️ <b>Reason:</b> Insufficient Smile Coins or expired session.\n`
                           + `<i>ကျေးဇူးပြု၍ Smile.One အကောင့်တွင် Coin လက်ကျန်ကို စစ်ဆေးပါ။</i>`;
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    chat_id: ADMIN_CHAT_ID, 
                    text: errorCaption, 
                    parse_mode: 'HTML' 
                })
            });
        } catch (tgError) {
            console.error("Failed to send Error Telegram receipt", tgError);
        }
        return NextResponse.json({ success: false, message: "Payment failed. Insufficient Smile Coins." });
    }

    // ✅ ငွေပေးချေမှု အောင်မြင်ပါက
    await supabase.from('orders').update({ status: 'success' }).eq('id', order_id);

    const deductedCoins = payData.amount || "N/A"; 
    const currentBalance = payData.balance || "N/A"; 

    // Coin Balance အသစ်ကို Database သို့ သိမ်းခြင်း
    if (currentBalance !== "N/A") {
      await supabase.from('bot_settings').update({ coin_balance: currentBalance.toString() }).eq('id', 1);
    }

    // --- 4. Telegram Success Receipt ---
    const receiptCaption = `✅ <b>Auto Top-up Successful!</b>\n\n`
                         + `👤 <b>Account:</b> <code>${accountName}</code>\n`
                         + `🆔 <b>Game ID:</b> <code>${player_id} ${zone_id ? `(${zone_id})` : ''}</code>\n`
                         + `🎮 <b>Game:</b> ${game_name || 'MLBB'}\n`
                         + `💎 <b>Item:</b> ${item_name}\n`
                         + `🪙 <b>Deducted:</b> ${deductedCoins} Smile Coins\n`
                         + `💰 <b>Balance:</b> ${currentBalance} Smile Coins\n\n`
                         + `🎉 <i>Order #${order_id} automatically processed via Vercel Bot!</i>`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: ADMIN_CHAT_ID, 
                text: receiptCaption, 
                parse_mode: 'HTML' 
            })
        });
    } catch (tgError) {
        console.error("Failed to send Telegram receipt", tgError);
    }

    return NextResponse.json({ success: true, message: `Auto top-up completed for ${accountName}!` });

  } catch (error: any) {
    console.error("Bot API Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}