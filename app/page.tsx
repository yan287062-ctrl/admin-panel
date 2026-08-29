'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase ချိတ်ဆက်ခြင်း
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState<'orders' | 'topups' | 'prices'>('orders');
  
  // အော်ဒါစာရင်း သိမ်းရန် State
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'painggyi123') {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Username or Password!");
    }
  };

  // Database မှ အော်ဒါများကို ဆွဲယူခြင်း
  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false }); // အသစ်ဆုံးကို အပေါ်မှာထားမည်
      
    if (data) setOrders(data);
    setLoadingOrders(false);
  };

  // Tab အပြောင်းအလဲဖြစ်တိုင်း (သို့) Login ဝင်တိုင်း Order များကို Fetch လုပ်မည်
  useEffect(() => {
    if (isLoggedIn && activeTab === 'orders') {
      fetchOrders();
    }
  }, [isLoggedIn, activeTab]);

  // အော်ဒါကို ပြီးစီးကြောင်း (Done) ပြောင်းခြင်း
  const markAsDone = async (id: string) => {
    await supabase.from('orders').update({ status: 'done' }).eq('id', id);
    fetchOrders(); // စာရင်းပြန်ရယူမည်
  };

  // အော်ဒါဖျက်ခြင်း
  const deleteOrder = async (id: string) => {
    const confirmDelete = window.confirm("ဒီအော်ဒါကို ဖျက်ပစ်မှာ သေချာပြီလား?");
    if (confirmDelete) {
      await supabase.from('orders').delete().eq('id', id);
      fetchOrders();
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1a0b2e 0%, #3a1c71 50%, #d76d77 100%)' }}>
        <div className="w-full max-w-[420px] rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Paing Gyi Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-xl py-3 px-4 text-white bg-white/10 border border-white/10 focus:outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl py-3 px-4 text-white bg-white/10 border border-white/10 focus:outline-none" />
            <button type="submit" className="w-full font-bold text-white py-3 rounded-xl bg-gradient-to-r from-blue-500 to-pink-500">Login</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b19] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-[#141627] p-4 rounded-2xl border border-white/5 flex flex-wrap gap-2 justify-between items-center">
          <h1 className="text-white font-bold text-sm">Paing Gyi Admin</h1>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'orders' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'bg-[#1c1e32] text-gray-400'}`}>Orders (စောင့်ဆိုင်းစာရင်း)</button>
            <button onClick={() => setActiveTab('prices')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'prices' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'bg-[#1c1e32] text-gray-400'}`}>Prices (ဈေးနှုန်းများ)</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-[#141627] rounded-2xl border border-white/5 p-6 min-h-[600px]">
          
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-lg font-bold">📦 လက်ရှိ အော်ဒါစာရင်းများ</h2>
                <button onClick={fetchOrders} className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg border border-blue-500/30 hover:bg-blue-500/40">🔄 Refresh</button>
              </div>

              {loadingOrders ? (
                <p className="text-gray-400 text-center mt-10">အော်ဒါများ ရှာဖွေနေပါသည်...</p>
              ) : orders.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">လက်ရှိတွင် အော်ဒါ အသစ်မရှိသေးပါ။</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-[#1c1e32] border border-white/10 p-5 rounded-2xl relative">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-pink-500 font-bold text-sm uppercase">{order.game_name}</h3>
                          <p className="text-white font-black text-lg mt-1">{order.item_name}</p>
                        </div>
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 'bg-green-500/20 text-green-400 border border-green-500/50'}`}>
                          {order.status === 'pending' ? '⏳ စောင့်ဆိုင်းဆဲ' : '✅ ပြီးစီး'}
                        </span>
                      </div>
                      
                      <div className="bg-[#0a0b14]/50 p-3 rounded-xl mb-4 text-sm">
                        <div className="flex justify-between mb-1"><span className="text-gray-400">ID:</span> <span className="text-white font-mono">{order.player_id}</span></div>
                        {order.zone_id && <div className="flex justify-between mb-1"><span className="text-gray-400">Zone:</span> <span className="text-white font-mono">{order.zone_id}</span></div>}
                        <div className="flex justify-between mt-2 pt-2 border-t border-white/5"><span className="text-gray-400">ကျသင့်ငွေ:</span> <span className="text-[#00f2fe] font-bold">{order.price.toLocaleString()} Ks</span></div>
                        <div className="flex justify-between mt-1"><span className="text-gray-400">အချိန်:</span> <span className="text-gray-500 text-xs">{new Date(order.created_at).toLocaleString()}</span></div>
                      </div>

                      <div className="flex gap-2">
                        {order.status === 'pending' && (
                          <button onClick={() => markAsDone(order.id)} className="flex-1 bg-green-600/90 hover:bg-green-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                            ✔️ ဖြည့်ပြီးပါပြီ
                          </button>
                        )}
                        <button onClick={() => deleteOrder(order.id)} className="px-4 bg-red-500/10 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs font-bold rounded-lg transition-colors">
                          ဖျက်မည်
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PRICES TAB (ယခင် Code မှ ဈေးနှုန်း Data အပြည့်အစုံသည် ဤနေရာတွင် ရှိနေပါမည်) */}
          {activeTab === 'prices' && (
            <div className="text-center mt-20 text-gray-500">
              <h2>(ယခင်အဆင့်တွင် ရေးခဲ့သော ဈေးနှုန်းပြောင်းသည့် မျက်နှာပြင် ဤနေရာတွင် ဆက်လက်အလုပ်လုပ်နေပါမည်)</h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
