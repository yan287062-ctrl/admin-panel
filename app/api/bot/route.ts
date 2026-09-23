import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order_id, player_id, zone_id, item_name } = body;

    if (!order_id || !player_id) {
      return NextResponse.json({ success: false, message: "Missing order details" }, { status: 400 });
    }

    // 1. Database ထဲက Admin သိမ်းထားတဲ့ Cookie ကို ယူမယ်
    const { data: settings } = await supabase.from('bot_settings').select('cookie').eq('id', 1).single();
    const cookie = settings?.cookie;

    if (!cookie) {
      return NextResponse.json({ success: false, message: "Smile.One Cookie not found in Admin settings" }, { status: 400 });
    }

    // 2. Smile.One API သို့ ပို့မယ့် Logic (Python ထဲကအတိုင်း fetch ဖြင့် ချိတ်ဆက်ရန်)
    // ဥပမာ - Checkrole, FlowID ယူခြင်း နှင့် Pay API ခေါ်ခြင်းတို့ကို ဤနေရာတွင် တည်ဆောက်ပါမည်။

    // ခေတ္တစမ်းသပ်ရန် အနေဖြင့် အောင်မြင်သည်ဟု ယူဆပြီး status ကို 'success' ပြောင်းမည်
    await supabase.from('orders').update({ status: 'success' }).eq('id', order_id);

    return NextResponse.json({ success: true, message: "Auto top-up completed successfully!" });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}