'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase ချိတ်ဆက်ခြင်း
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// အစ်ကိုပေးထားသော ဈေးနှုန်း Data အပြည့်အစုံ
const initialGamePrices = {
  mlbb: [
    { id: 'mlbb_1', name: '55 Diamonds', price: 3461 }, { id: 'mlbb_2', name: '165 Diamonds', price: 10372 },
    { id: 'mlbb_3', name: '275 Diamonds', price: 16636 }, { id: 'mlbb_4', name: '565 Diamonds', price: 34160 },
    { id: 'mlbb_5', name: 'Weekly Pass', price: 6600 }, { id: 'mlbb_6', name: 'Weekly Pass x 2', price: 13200 },
    { id: 'mlbb_7', name: 'Weekly Pass x 3', price: 19800 }, { id: 'mlbb_8', name: 'Weekly Pass x 4', price: 26400 },
    { id: 'mlbb_9', name: 'Weekly Pass x 5', price: 33000 }, { id: 'mlbb_10', name: 'Twilight Pass', price: 35712 },
    { id: 'mlbb_11', name: 'Weekly Elite Bundle', price: 3461 }, { id: 'mlbb_12', name: 'Monthly Epic Bundle', price: 17434 },
    { id: 'mlbb_13', name: '86 Diamonds', price: 5457 }, { id: 'mlbb_14', name: '172 Diamonds', price: 10824 },
    { id: 'mlbb_15', name: '257 Diamonds', price: 15678 }, { id: 'mlbb_16', name: '343 Diamonds', price: 21134 },
    { id: 'mlbb_17', name: '429 Diamonds', price: 26502 }, { id: 'mlbb_18', name: '514 Diamonds', price: 31355 },
    { id: 'mlbb_19', name: '600 Diamonds', price: 36812 }, { id: 'mlbb_20', name: '705 Diamonds', price: 42588 },
    { id: 'mlbb_21', name: '792 Diamonds', price: 48045 }, { id: 'mlbb_22', name: '878 Diamonds', price: 53412 },
    { id: 'mlbb_23', name: '963 Diamonds', price: 58266 }, { id: 'mlbb_24', name: '1049 Diamonds', price: 63722 },
    { id: 'mlbb_25', name: '1135 Diamonds', price: 69090 }, { id: 'mlbb_26', name: '1220 Diamonds', price: 73943 },
    { id: 'mlbb_27', name: '1412 Diamonds', price: 85176 }, { id: 'mlbb_28', name: '1584 Diamonds', price: 96000 },
    { id: 'mlbb_29', name: '1669 Diamonds', price: 100854 }, { id: 'mlbb_30', name: '1755 Diamonds', price: 106310 },
    { id: 'mlbb_31', name: '1841 Diamonds', price: 111678 }, { id: 'mlbb_32', name: '2195 Diamonds', price: 128918 },
    { id: 'mlbb_33', name: '2538 Diamonds', price: 150052 }, { id: 'mlbb_34', name: '2901 Diamonds', price: 171506 },
    { id: 'mlbb_35', name: '3073 Diamonds', price: 182330 }, { id: 'mlbb_36', name: '3688 Diamonds', price: 215069 },
    { id: 'mlbb_37', name: '3945 Diamonds', price: 230747 }, { id: 'mlbb_38', name: '4031 Diamonds', price: 236204 },
    { id: 'mlbb_39', name: '4566 Diamonds', price: 268482 }, { id: 'mlbb_40', name: '5100 Diamonds', price: 300245 },
    { id: 'mlbb_41', name: '5532 Diamonds', price: 324734 }, { id: 'mlbb_42', name: '6055 Diamonds', price: 354812 },
    { id: 'mlbb_43', name: '6752 Diamonds', price: 398677 }, { id: 'mlbb_44', name: '7030 Diamonds', price: 415366 },
    { id: 'mlbb_45', name: '7727 Diamonds', price: 453651 }, { id: 'mlbb_46', name: '9288 Diamonds', price: 539360 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' })),
  
  mcgg: [
    { id: 'mcgg_1', name: '10', bonus: '+ 1 Diamonds', price: 900 }, { id: 'mcgg_2', name: '20', bonus: '+ 2 Diamonds', price: 1700 },
    { id: 'mcgg_3', name: '51', bonus: '+ 5 Diamonds', price: 4200 }, { id: 'mcgg_4', name: 'Double Dia(50+50)', bonus: 'No bonus', price: 4400 },
    { id: 'mcgg_5', name: '102', bonus: '+ 10 Diamonds', price: 8300 }, { id: 'mcgg_6', name: 'Weekly Card', bonus: 'No bonus', price: 8800 },
    { id: 'mcgg_7', name: 'Double Dia(150+150)', bonus: 'No bonus', price: 13000 }, { id: 'mcgg_8', name: '203', bonus: '+ 20 Diamonds', price: 16600 },
    { id: 'mcgg_9', name: 'Double Dia(250+250)', bonus: 'No bonus', price: 21500 }, { id: 'mcgg_10', name: '303', bonus: '+ 33 Diamonds', price: 24900 },
    { id: 'mcgg_11', name: '504', bonus: '+ 66 Diamonds', price: 41400 }, { id: 'mcgg_12', name: 'Double Dia(500+500)', bonus: 'No bonus', price: 43400 },
    { id: 'mcgg_13', name: '1007', bonus: '+ 156 Diamonds', price: 82900 }, { id: 'mcgg_14', name: '2015', bonus: '+ 383 Diamonds', price: 165700 },
    { id: 'mcgg_15', name: '5035', bonus: '+ 1007 Diamonds', price: 414100 }
  ],

  pubg: [
    { id: 'pubg_1', name: '60 UC', price: 4106 }, { id: 'pubg_2', name: '325 UC', price: 20529 },
    { id: 'pubg_3', name: '660 UC', price: 41059 }, { id: 'pubg_4', name: '985 UC', price: 61588 },
    { id: 'pubg_5', name: '1320 UC', price: 82118 }, { id: 'pubg_6', name: '1980 UC', price: 123177 },
    { id: 'pubg_7', name: '2310 UC', price: 143706 }, { id: 'pubg_8', name: '2640 UC', price: 164236 },
    { id: 'pubg_9', name: '3850 UC', price: 239512 }, { id: 'pubg_10', name: '4180 UC', price: 260041 },
    { id: 'pubg_11', name: '5900 UC', price: 367277 }, { id: 'pubg_12', name: '8100 UC', price: 504112 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' })),

  ucPack: [
    { id: 'ucp_1', name: 'First Purchase Pack', price: 4100 }, { id: 'ucp_2', name: 'Prime (1 Month)', price: 4100 },
    { id: 'ucp_3', name: 'Weekly Deal Pack 1', price: 4200 }, { id: 'ucp_4', name: 'Upgradable Firearm Materials Pack', price: 12300 },
    { id: 'ucp_5', name: 'Prime (3 Months)', price: 12300 }, { id: 'ucp_6', name: 'Weekly Mythic Emblem Value Pack', price: 12400 },
    { id: 'ucp_7', name: 'Weekly Deal Pack 2', price: 12400 }, { id: 'ucp_8', name: 'Mythic Emblem Pack', price: 20400 },
    { id: 'ucp_9', name: 'Prime (6 Months)', price: 24400 }, { id: 'ucp_10', name: 'Elite Pass LV1-50', price: 24800 },
    { id: 'ucp_11', name: 'Prime Plus (1 Month)', price: 40700 }, { id: 'ucp_12', name: 'Prime (12 Months)', price: 48800 },
    { id: 'ucp_13', name: 'Elite Pass LV1-100', price: 49700 }, { id: 'ucp_14', name: 'Prime Plus (3 Months)', price: 122000 },
    { id: 'ucp_15', name: 'Elite Pass Plus LV1-100', price: 123100 }, { id: 'ucp_16', name: 'Prime Plus (6 Months)', price: 243900 },
    { id: 'ucp_17', name: 'Prime Plus (12 Months)', price: 487800 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' })),

  telegram: [
    { id: 'tg_1', name: '50 Stars', price: 3552 }, { id: 'tg_2', name: '75 Stars', price: 5306 },
    { id: 'tg_3', name: '100 Stars', price: 7058 }, { id: 'tg_4', name: '150 Stars', price: 10587 },
    { id: 'tg_5', name: '250 Stars', price: 17645 }, { id: 'tg_6', name: '350 Stars', price: 24703 },
    { id: 'tg_7', name: '500 Stars', price: 35291 }, { id: 'tg_8', name: '750 Stars', price: 52936 },
    { id: 'tg_9', name: '1K Stars', price: 70582 }, { id: 'tg_10', name: '1.5K Stars', price: 105873 },
    { id: 'tg_11', name: '2.5K Stars', price: 176454 }, { id: 'tg_12', name: '5K Stars', price: 352908 },
    { id: 'tg_13', name: '10K Stars', price: 705816 }, { id: 'tg_14', name: '3 months premium', price: 56420 },
    { id: 'tg_15', name: '6 months premium', price: 75241 }, { id: 'tg_16', name: '12 months premium', price: 136412 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' })),

  heartopia: [
    { id: 'heart_1', name: '20 Heart Diamond', price: 2588 }, { id: 'heart_2', name: '60 Heart Diamond', price: 4895 },
    { id: 'heart_3', name: '300+20 Heart Diamond', price: 24846 }, { id: 'heart_4', name: '680+50 Heart Diamond', price: 55994 },
    { id: 'heart_5', name: '1280+90 Heart Diamond', price: 102297 }, { id: 'heart_6', name: '1980+150 Heart Diamond', price: 155703 },
    { id: 'heart_7', name: '3280+270 Heart Diamond', price: 253623 }, { id: 'heart_8', name: '6480+570 Heart Diamond', price: 498398 },
    { id: 'heart_9', name: 'GAMG Junior Membership', price: 2681 }, { id: 'heart_10', name: 'GAMG Formal Membership', price: 15057 },
    { id: 'heart_11', name: 'Fashionwave Gift Box', price: 24846 }, { id: 'heart_12', name: 'Fashionwave Gift Box Upgrade', price: 31102 },
    { id: 'heart_13', name: 'Premium Fashionwave Gift Box', price: 55994 }
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' })),

  smileCoin: [
    { id: 'smile_1', name: 'Brl 300', price: 25800 },
    { id: 'smile_2', name: 'Brl 1000', price: 83800 },
    { id: 'smile_3', name: 'Brl 5000', price: 419000 } 
  ]
};

export default function AdminPanel() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Tabs State
  const [activeTab, setActiveTab] = useState<'orders' | 'topups' | 'prices'>('orders');
  
  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Prices State
  const [gamePrices, setGamePrices] = useState(initialGamePrices);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Login Function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'painggyi123') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // ----- Orders Functions -----
  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setOrders(data);
    setLoadingOrders(false);
  };

  useEffect(() => {
    if (isLoggedIn && activeTab === 'orders') {
      fetchOrders();
    }
  }, [isLoggedIn, activeTab]);

  const markAsDone = async (id: string) => {
    await supabase.from('orders').update({ status: 'done' }).eq('id', id);
    fetchOrders();
  };

  const deleteOrder = async (id: string) => {
    const confirmDelete = window.confirm("ဒီအော်ဒါကို ဖျက်ပစ်မှာ သေချာပြီလား?");
    if (confirmDelete) {
      await supabase.from('orders').delete().eq('id', id);
      fetchOrders();
    }
  };

  // ----- Prices Functions -----
  const handlePriceChange = (category: keyof typeof gamePrices, id: string, newPrice: string) => {
    const numericPrice = Number(newPrice);
    if (!isNaN(numericPrice)) {
      setGamePrices(prev => ({
        ...prev,
        [category]: prev[category].map(item => 
          item.id === id ? { ...item, price: numericPrice } : item
        )
      }));
    }
  };

  const handleSavePrices = () => {
    console.log("Saved Prices:", gamePrices);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const categoryNames: Record<string, string> = {
    mlbb: 'Mobile Legends (MLBB)',
    mcgg: 'Magic Chess',
    pubg: 'PUBG Mobile',
    ucPack: 'UC Packs',
    telegram: 'Telegram Premium',
    heartopia: 'Heartopia',
    smileCoin: 'Smile Coin'
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0b2e 0%, #3a1c71 50%, #d76d77 100%)' }}>
        <div className="w-full max-w-[420px] rounded-3xl p-8 sm:p-10 relative z-10" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)' }}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Paing Gyi Admin</h1>
            <p className="text-gray-300 text-sm">Login to Admin Panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="text" placeholder="Admin Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none placeholder-gray-400" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none placeholder-gray-400" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
            {loginError && <p className="text-red-400 text-xs text-center font-medium">Invalid Username or Password!</p>}
            <button type="submit" className="w-full font-bold text-white text-sm py-3.5 rounded-xl shadow-lg" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)' }}>Login</button>
          </form>
        </div>
      </main>
    );
  }

  // Admin Dashboard
  return (
    <main className="min-h-screen bg-[#070b19] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header & Tabs */}
        <div className="bg-[#141627] p-4 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-white font-bold text-sm pl-2">Paing Gyi <span className="text-pink-500">Admin</span></h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'orders' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'bg-[#1c1e32] text-gray-400'}`}>Orders (စောင့်ဆိုင်းစာရင်း)</button>
            <button onClick={() => setActiveTab('prices')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'prices' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'bg-[#1c1e32] text-gray-400'}`}>Prices (ဈေးနှုန်းများ)</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-[#141627] rounded-[2rem] border border-white/5 p-6 shadow-2xl min-h-[600px]">
          
          {/* ----- ORDERS TAB ----- */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-lg font-bold">📦 လက်ရှိ အော်ဒါစာရင်းများ</h2>
                <button onClick={fetchOrders} className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg border border-blue-500/30 hover:bg-blue-500/40 transition-colors">🔄 Refresh</button>
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
                          <button onClick={() => markAsDone(order.id)} className="flex-1 bg-green-600/90 hover:bg-green-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">✔️ ဖြည့်ပြီးပါပြီ</button>
                        )}
                        <button onClick={() => deleteOrder(order.id)} className="px-4 bg-red-500/10 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs font-bold rounded-lg transition-colors">ဖျက်မည်</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ----- PRICES TAB (RESTORED) ----- */}
          {activeTab === 'prices' && (
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <h2 className="text-white text-lg font-bold">💰 ဈေးနှုန်းများ တိုက်ရိုက်ပြင်ဆင်ရန်</h2>
                <button onClick={handleSavePrices} className="bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg transition-colors">
                  Save Changes
                </button>
              </div>

              {saveSuccess && (
                <div className="bg-green-500/20 text-green-400 p-3 rounded-xl text-sm font-bold text-center mb-6">
                  ✅ ဈေးနှုန်းများကို အောင်မြင်စွာ မှတ်သားထားပါသည်။
                </div>
              )}

              <div className="space-y-4">
                {Object.entries(gamePrices).map(([categoryKey, items]) => (
                  <div key={categoryKey} className="bg-[#1c1e32] rounded-2xl border border-white/5 overflow-hidden">
                    <button 
                      onClick={() => setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey)}
                      className="w-full flex justify-between items-center p-5 bg-[#1c1e32] hover:bg-white/5 transition-colors focus:outline-none"
                    >
                      <h3 className="text-white font-bold text-base flex items-center gap-3">
                        <span className="text-pink-500 text-xl">🎮</span> 
                        {categoryNames[categoryKey] || categoryKey}
                      </h3>
                      <span className="text-gray-400 bg-black/20 px-3 py-1 rounded-full text-xs">
                        {items.length} items
                      </span>
                    </button>

                    {expandedCategory === categoryKey && (
                      <div className="p-5 border-t border-white/5 bg-[#0a0b14]/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {items.map((item) => (
                            <div key={item.id} className="bg-[#141627] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                              <div className="mb-3">
                                <h3 className="text-white font-bold text-xs">{item.name}</h3>
                                {'bonus' in item && item.bonus !== 'No bonus' && <span className="text-green-400 text-[10px]">{item.bonus}</span>}
                              </div>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">Ks</span>
                                <input 
                                  type="number"
                                  value={item.price}
                                  onChange={(e) => handlePriceChange(categoryKey as keyof typeof gamePrices, item.id, e.target.value)}
                                  className="w-full bg-[#070b19] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-white text-sm font-bold focus:border-blue-500 outline-none transition-colors"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
