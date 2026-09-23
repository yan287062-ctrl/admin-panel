// ဖိုင်လမ်းကြောင်း: app/api/bot_update/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // API ကို လုံခြုံအောင် Secret Code လေး စစ်မယ် (မင်းစိတ်ကြိုက် ပြင်လို့ရတယ်)
    if (data.secret !== "painggyi2026") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (data.action === "get_cookie") {
        const { data: settings } = await supabase.from('bot_settings').select('cookie').eq('id', 1).single();
        return NextResponse.json({ cookie: settings?.cookie || "" });
    }

    if (data.action === "update_cookie") {
        await supabase.from('bot_settings').update({ 
            cookie: data.cookie, 
            coin_balance: data.balance 
        }).eq('id', 1);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}