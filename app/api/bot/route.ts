import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

const BOT_TOKEN = "8781192251:AAFFihM37XgyCKWZ6rKJHh0QLY3bkCQlpF8"; 
const ADMIN_CHAT_ID = "1934339791";

const BASE_URL = "https://www.smile.one/br";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// MLBB Mapping
const product_mapping: Record<string, string> = {
    '55 Diamonds': '1520', '165 Diamonds': '1521', '275 Diamonds': '1522',
    '565 Diamonds': '1523', '86 Diamonds': '1524', '172 Diamonds': '1525',
    '257 Diamonds': '1526', '343 Diamonds': '1527', '429 Diamonds': '1528',
    '514 Diamonds': '1529', '600 Diamonds': '1530', '705 Diamonds': '1531',
    '792 Diamonds': '1532', '878 Diamonds': '1533', '963 Diamonds': '1534',
    '1049 Diamonds': '1535', '1135 Diamonds': '1536', '1220 Diamonds': '1537',
    '1412 Diamonds': '1538', '1584 Diamonds': '1539', '1669 Diamonds': '1540',
    '1755 Diamonds': '1541', '1841 Diamonds': '1542', '2195 Diamonds': '1543',
    '2538 Diamonds': '1544', '2901 Diamonds': '1545', '3073 Diamonds': '1546',
    '3688 Diamonds': '1547', '3945 Diamonds': '1548', '4031 Diamonds': '1549',
    '4566 Diamonds': '1550', '5100 Diamonds': '1551', '5532 Diamonds': '1552',
    '6055 Diamonds': '1553', '6752 Diamonds': '1554', '7030 Diamonds': '1555',
    '7727 Diamonds': '1556', '9288 Diamonds': '1557', 'Weekly Pass': '1558',
    'Weekly Pass x 2': '1559', 'Weekly Pass x 3': '1560', 'Weekly Pass x 4': '1561',
    'Weekly Pass x 5': '1562', 'Twilight Pass': '1563', 'Weekly Elite Bundle': '1564',
    'Monthly Epic Bundle': '1565'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order_id, player_id, zone_id, item_name, game_name } = body;

    if (!order_id || !player_id || !item_name) {
      return NextResponse.json({ success: false, message: "Missing required order details" }, { status: 400 });
    }

    const { data: settings, error: settingsError } = await supabase.from('bot_settings').select('cookie').eq('id', 1).single();
    if (settingsError || !settings || !settings.cookie) {
      return NextResponse.json({ success: false, message: "Cookie is missing in Admin Settings" }, { status: 400 });
    }
    const COOKIE = settings.cookie;

    const productId = product_mapping[item_name];
    if (!productId) {
        return NextResponse.json({ success: false, message: `Auto top-up unsupported for item: ${item_name}` });
    }

    const HEADERS = {
        "User-Agent": "Mozilla/5.0",
        "Cookie": COOKIE,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Origin": "https://www.smile.one",
        "Referer": "https://www.smile.one/br/merchant/mobilelegends"
    };

    // --- 1. Checkrole ---
    let checkRoleBody = `user_id=${encodeURIComponent(player_id)}&pid=29`;
    if (zone_id) checkRoleBody += `&zone_id=${encodeURIComponent(zone_id)}`;

    const checkRoleRes = await fetch(`${BASE_URL}/customer/checkrole`, {
        method: 'POST',
        headers: HEADERS,
        body: checkRoleBody
    });
    
    let checkRoleData;
    let rawText = await checkRoleRes.text();
    try {
        checkRoleData = JSON.parse(rawText);
    } catch (e) {
        return NextResponse.json({ success: false, message: "Checkrole Failed. Cookie might be expired. Raw: " + rawText.substring(0, 50) });
    }

    if (checkRoleData.status !== 200) {
       return NextResponse.json({ success: false, message: "Account verification failed. Invalid ID." });
    }
    const accountName = checkRoleData.username;
    await delay(1000); 

    // --- 2. Create Order ---
    let createOrderBody = `product_id=${productId}&user_id=${encodeURIComponent(player_id)}&pay_channel=196&pid=29&amount=1`;
    if (zone_id) createOrderBody += `&zone_id=${encodeURIComponent(zone_id)}`;

    const createOrderRes = await fetch(`${BASE_URL}/order/create`, {
        method: 'POST',
        headers: HEADERS,
        body: createOrderBody
    });
    
    let createOrderData;
    try {
       createOrderData = await createOrderRes.json();
    } catch (e) {
       return NextResponse.json({ success: false, message: "Failed to create order." });
    }

    if (createOrderData.status !== 200 || !createOrderData.order_id) {
       return NextResponse.json({ success: false, message: "Order creation failed." });
    }
    const smileOrderId = createOrderData.order_id;
    const token = createOrderData.token;
    await delay(1000);

    // --- 3. Pay ---
    const payBody = `order_id=${smileOrderId}&token=${encodeURIComponent(token)}`;
    const payRes = await fetch(`${BASE_URL}/order/pay`, {
        method: 'POST',
        headers: HEADERS,
        body: payBody
    });
    const payData = await payRes.json();

    if (payData.status !== 200) {
        const errorCaption = `❌ <b>Auto Top-up Failed!</b>\n\n👤 <b>Account:</b> <code>${accountName}</code>\n💎 <b>Item:</b> ${item_name}\n⚠️ <b>Reason:</b> Insufficient Smile Coins or error.`;
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: errorCaption, parse_mode: 'HTML' })
        });
        return NextResponse.json({ success: false, message: "Payment failed. Insufficient Smile Coins." });
    }

    await supabase.from('orders').update({ status: 'success' }).eq('id', order_id);

    const deductedCoins = payData.amount || "N/A"; 
    const currentBalance = payData.balance || "N/A"; 

    if (currentBalance !== "N/A") {
      await supabase.from('bot_settings').update({ coin_balance: currentBalance.toString() }).eq('id', 1);
    }

    // --- 4. Telegram Success Receipt ---
    const receiptCaption = `✅ <b>Auto Top-up Successful!</b>\n\n`
                         + `👤 <b>Account:</b> <code>${accountName}</code>\n`
                         + `🆔 <b>Game ID:</b> <code>${player_id} ${zone_id ? `(${zone_id})` : ''}</code>\n`
                         + `💎 <b>Item:</b> ${item_name}\n`
                         + `🪙 <b>Deducted:</b> ${deductedCoins} Smile Coins\n`
                         + `💰 <b>Balance:</b> ${currentBalance} Smile Coins\n\n`
                         + `🎉 <i>Order #${order_id} automatically processed via Vercel!</i>`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: receiptCaption, parse_mode: 'HTML' })
    });

    return NextResponse.json({ success: true, message: `Auto top-up completed for ${accountName}!` });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}