'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { savePricesToDb } from './actions/supabase';

const supabaseUrl = 'https://painggyishop.vercel.app/api/supabase';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';
const supabase = createClient(supabaseUrl, supabaseKey);

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
  ].map(pkg => ({ ...pkg, bonus: 'No bonus' }))
};

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Update tabs to match the sidebar design (Dashboard added)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wallet' | 'mapping'>('dashboard'); 
  
  const [orders, setOrders] = useState<any[]>([]);
  const [walletTopups, setWalletTopups] = useState<any[]>([]);
  const [gamePrices, setGamePrices] = useState(initialGamePrices);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock data for Dashboard stats (In a real app, this would come from Supabase)
  const [stats, setStats] = useState({
    activeUsers: 142,
    totalSales: '8,450,000',
    pendingOrders: 0,
    totalUsers: 1250
  });

  const fetchRealPrices = async () => {
    try {
      const { data, error } = await supabase.from('game_prices').select('*');
      if (data && data.length > 0) {
        const updatedPrices = JSON.parse(JSON.stringify(initialGamePrices));
        data.forEach((dbItem: any) => {
          if (updatedPrices[dbItem.category]) {
            const index = updatedPrices[dbItem.category].findIndex((i: any) => i.id === dbItem.id);
            if (index !== -1) updatedPrices[dbItem.category][index].price = dbItem.price;
          }
        });
        setGamePrices(updatedPrices);
      }
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (data) {
        setOrders(data);
        // Update pending orders count for dashboard
        const pendingCount = data.filter(order => order.status === 'pending').length;
        setStats(prev => ({ ...prev, pendingOrders: pendingCount }));
      }
    } catch (err) {
      console.log("Order Fetch Error:", err);
    }
  };

  const fetchWalletTopups = async () => {
    try {
      const { data, error } = await supabase.from('wallet_history').select('*').order('created_at', { ascending: false });
      if (data) setWalletTopups(data);
    } catch (err) {
      console.log("Wallet Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
      fetchWalletTopups();
      fetchRealPrices();
    }
  }, [isLoggedIn]);

  const markAsDone = async (id: string) => {
    await supabase.from('orders').update({ status: 'done' }).eq('id', id);
    fetchOrders();
  };

  const deleteOrder = async (id: string) => {
    if (window.confirm("သေချာပြီလား? အော်ဒါကို ဖျက်ပစ်ပါမည်။")) {
      await supabase.from('orders').delete().eq('id', id);
      fetchOrders();
    }
  };

  const approveWalletTopup = async (id: string, email: string, amount: number) => {
    if (!window.confirm(`Email အကောင့် ${email} သို့ ငွေ ${amount} Ks ဖြည့်သွင်းပေးမည်မှာ သေချာပါသလား?`)) return;
    
    try {
      const { data: walletData, error: walletError } = await supabase
        .from('users_wallet')
        .select('balance')
        .eq('email', email)
        .single();
      
      let newBalance = amount;
      if (walletData) {
        newBalance += walletData.balance;
        await supabase.from('users_wallet').update({ balance: newBalance }).eq('email', email);
      } else {
        await supabase.from('users_wallet').insert([{ email: email, balance: newBalance }]);
      }
      
      await supabase.from('wallet_history').update({ status: 'done' }).eq('id', id);
      fetchWalletTopups();
      alert("✅ Wallet သို့ ငွေဖြည့်သွင်းခြင်း အောင်မြင်ပါသည်!");
    } catch (err: any) {
      alert("Error approving wallet: " + err.message);
    }
  };

  const deleteWalletTopup = async (id: string) => {
    if (window.confirm("သေချာပြီလား? ငွေဖြည့်မှတ်တမ်းကို ဖျက်ပစ်ပါမည်။")) {
      await supabase.from('wallet_history').delete().eq('id', id);
      fetchWalletTopups();
    }
  };

  const handleSavePrices = async () => {
    setIsSaving(true);
    const allItems: any[] = [];
    Object.entries(gamePrices).forEach(([cat, items]) => {
      (items as any[]).forEach(item => {
        allItems.push({
          id: item.id, 
          category: cat, 
          name: item.name, 
          bonus: item.bonus || 'No bonus', 
          price: Number(item.price) || 0 
        });
      });
    });

    try {
      const result = await savePricesToDb(allItems);
      if (!result.success) throw new Error(result.error);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: any) {
      alert("Error saving to database: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePriceChange = (category: keyof typeof gamePrices, id: string, newPrice: string) => {
    let sanitizedPrice = newPrice.replace(/^0+/, '');
    if (sanitizedPrice === '') {
      sanitizedPrice = ''; 
    }
    setGamePrices(prev => ({
      ...prev,
      [category]: prev[category].map(item => item.id === id ? { ...item, price: sanitizedPrice as any } : item)
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'painggyi123') setIsLoggedIn(true);
    else alert("Invalid login!");
  };

  const categoryNames: Record<string, string> = {
    mlbb: 'Mobile Legends (MLBB)', mcgg: 'Magic Chess', pubg: 'PUBG Mobile',
    ucPack: 'UC Packs', telegram: 'Telegram Premium', heartopia: 'Heartopia', smileCoin: 'Smile Coin'
  };

  // ==================== LOGIN SCREEN ====================
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-[#f0f2f5] font-sans">
        <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-2xl flex overflow-hidden min-h-[500px]">
          
          {/* LEFT: Login Form */}
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-white relative">
            <div className="max-w-xs mx-auto w-full">
              
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                  <img src="/painggyi-logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-[#f3f4f6] flex items-center justify-center"><span class="text-3xl">🎮</span></div>'; }} />
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-gray-800 mb-1">Welcome Back</h1>
                <p className="text-gray-500 text-xs font-medium">Please enter your admin details.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full rounded-xl py-3 pl-10 pr-4 text-gray-800 font-bold bg-[#f8fafc] border border-gray-100 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 text-sm" />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                </div>

                <div className="relative">
                  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-xl py-3 pl-10 pr-10 text-gray-800 font-bold bg-[#f8fafc] border border-gray-100 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 text-sm" />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                </div>

                <button type="submit" className="w-full font-bold text-white py-3 mt-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg text-sm">
                  Log In
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Image / Branding */}
          <div className="w-full md:w-1/2 bg-indigo-900 relative hidden md:block">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-black tracking-widest text-white mb-2">PAING GYI</h2>
              <h3 className="text-lg font-bold text-indigo-300">ADMIN PORTAL</h3>
            </div>
          </div>
          
        </div>
      </main>
    );
  }

  // ==================== ADMIN DASHBOARD (SIDEBAR DESIGN) ====================
  return (
    <main className="min-h-screen bg-[#f3f4f6] font-sans flex h-screen overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-indigo-700 text-white flex flex-col m-4 rounded-[30px] shadow-xl overflow-hidden relative z-20">
        
        {/* Logo Area */}
        <div className="p-8 flex items-center justify-center border-b border-indigo-600/50">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-md overflow-hidden">
               <img src="/painggyi-logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl">🎮</span>'; }} />
            </div>
            <h1 className="font-black text-sm tracking-widest uppercase">Paing Gyi</h1>
            <p className="text-indigo-300 text-[10px] font-bold tracking-widest uppercase">Admin</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'dashboard' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'orders' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Orders
            </div>
            {stats.pendingOrders > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{stats.pendingOrders}</span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab('wallet')} 
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'wallet' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            Wallet Topups
          </button>

          <button 
            onClick={() => setActiveTab('mapping')} 
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'mapping' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            Edit Prices
          </button>
        </div>

        {/* User Info / Logout Area at Bottom */}
        <div className="p-4 mt-auto">
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-5 py-3 bg-indigo-800 hover:bg-indigo-900 rounded-2xl text-sm font-bold transition-colors">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
             Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <div className="h-20 flex items-center justify-between px-8 bg-transparent">
           <h2 className="text-2xl font-black text-gray-800 capitalize tracking-tight">
             {activeTab === 'mapping' ? 'Edit Game Prices' : activeTab}
           </h2>
           
           <div className="flex items-center gap-4">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </button>
              <div className="h-10 w-10 bg-indigo-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                <span className="text-indigo-700 font-black text-sm">AD</span>
              </div>
           </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          
          {/* ================= TAB 1: DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-[24px] shadow-lg text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <span className="bg-white/20 px-2 py-1 rounded-lg text-xs font-bold">+12%</span>
                  </div>
                  <h3 className="text-indigo-100 text-sm font-bold mb-1">Active Users (Live)</h3>
                  <p className="text-3xl font-black">{stats.activeUsers}</p>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                  </div>
                  <h3 className="text-gray-400 text-sm font-bold mb-1">Total Sales</h3>
                  <p className="text-3xl font-black text-gray-800">{stats.totalSales} <span className="text-sm text-gray-400">Ks</span></p>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-10 -mt-10 z-0"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                    </div>
                    <h3 className="text-gray-400 text-sm font-bold mb-1">Pending Orders</h3>
                    <p className="text-3xl font-black text-gray-800">{stats.pendingOrders}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                  </div>
                  <h3 className="text-gray-400 text-sm font-bold mb-1">Total Users</h3>
                  <p className="text-3xl font-black text-gray-800">{stats.totalUsers}</p>
                </div>
              </div>

              {/* Big Chart Area (Placeholder for UI) */}
              <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 min-h-[300px] flex flex-col justify-center items-center relative overflow-hidden">
                 <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                 <div className="text-center z-10">
                   <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                   </div>
                   <h3 className="text-lg font-bold text-gray-800 mb-2">Detailed Analytics Coming Soon</h3>
                   <p className="text-gray-500 text-sm max-w-sm">Connect with Google Analytics or Vercel Analytics to see live traffic, visitor maps, and conversion rates here.</p>
                   <button className="mt-6 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-indigo-700">Setup Analytics</button>
                 </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: ORDERS ================= */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 min-h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Recent Transactions</h3>
                <button onClick={fetchOrders} className="text-xs bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold hover:bg-gray-200">🔄 Refresh</button>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all bg-gray-50/50">
                    
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs uppercase">
                        {order.game_name.substring(0, 3)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{order.item_name}</h4>
                        <p className="text-xs text-gray-500 mt-1 font-medium">ID: {order.player_id} {order.zone_id ? `| Zone: ${order.zone_id}` : ''}</p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-1 mb-4 md:mb-0">
                      <span className="font-black text-indigo-600">{order.price.toLocaleString()} Ks</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{order.payment_method}</span>
                    </div>

                    <div className="flex items-center gap-3">
                       {order.status === 'pending' ? (
                         <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-lg uppercase">Pending</span>
                       ) : (
                         <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-lg uppercase">Done</span>
                       )}

                       {order.slip_url && (
                         <a href={order.slip_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300" title="View Screenshot">
                           🖼️
                         </a>
                       )}
                       
                       {order.status === 'pending' && (
                         <button onClick={() => markAsDone(order.id)} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" title="Mark as Done">
                           ✔️
                         </button>
                       )}
                       
                       <button onClick={() => deleteOrder(order.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="Delete">
                         🗑️
                       </button>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && <div className="text-center text-gray-400 font-bold py-10">No orders yet</div>}
              </div>
            </div>
          )}

          {/* ================= TAB 3: WALLET TOPUPS ================= */}
          {activeTab === 'wallet' && (
            <div className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 min-h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Wallet Top-up Requests</h3>
                <button onClick={fetchWalletTopups} className="text-xs bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold hover:bg-gray-200">🔄 Refresh</button>
              </div>
              
              <div className="space-y-4">
                {walletTopups.map((topup) => (
                  <div key={topup.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all bg-gray-50/50">
                    
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{topup.email}</h4>
                        <p className="text-xs text-gray-500 mt-1 font-medium">{new Date(topup.created_at).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-1 mb-4 md:mb-0">
                      <span className="font-black text-indigo-600">{Number(topup.amount).toLocaleString()} Ks</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{topup.type || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                       {topup.status === 'pending' ? (
                         <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-lg uppercase">Pending</span>
                       ) : (
                         <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-lg uppercase">Approved</span>
                       )}

                       {topup.slip_url && (
                         <a href={topup.slip_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300" title="View Screenshot">
                           🖼️
                         </a>
                       )}
                       
                       {topup.status === 'pending' && (
                         <button onClick={() => approveWalletTopup(topup.id, topup.email, topup.amount)} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" title="Approve">
                           ✔️
                         </button>
                       )}
                       
                       <button onClick={() => deleteWalletTopup(topup.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="Delete">
                         🗑️
                       </button>
                    </div>

                  </div>
                ))}
                {walletTopups.length === 0 && <div className="text-center text-gray-400 font-bold py-10">No wallet requests yet</div>}
              </div>
            </div>
          )}

          {/* ================= TAB 4: MAPPING (EDIT PRICES) ================= */}
          {activeTab === 'mapping' && (
            <div className="bg-white rounded-[30px] p-6 md:p-8 shadow-sm border border-gray-100 min-h-full">
              
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-500 text-sm font-medium">Update prices for all games. Changes reflect instantly.</p>
                <button onClick={handleSavePrices} disabled={isSaving} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${isSaving ? 'bg-gray-200 text-gray-500' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                  {isSaving ? 'Saving...' : 'Save All Changes'}
                </button>
              </div>

              {saveSuccess && <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-xl text-sm font-bold text-center mb-6">✅ Prices saved successfully!</div>}

              <div className="space-y-4">
                {Object.entries(gamePrices).map(([categoryKey, items]) => (
                  <div key={categoryKey} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                    <button onClick={() => setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey)} className="w-full flex justify-between items-center p-5 bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xs uppercase">{categoryKey.substring(0,2)}</div>
                        <h3 className="text-gray-800 font-bold text-sm uppercase tracking-wide">{categoryNames[categoryKey] || categoryKey}</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-200">{items.length} items</span>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === categoryKey ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </button>

                    {expandedCategory === categoryKey && (
                      <div className="p-6 border-t border-gray-100 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {(items as any[]).map((item) => (
                            <div key={item.id} className="p-4 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors bg-gray-50/30">
                              <h3 className="text-gray-800 font-bold text-xs mb-1 uppercase">{item.name}</h3>
                              <p className="text-gray-400 font-medium text-[10px] mb-4 uppercase">{item.bonus || 'No bonus'}</p>
                              
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">Ks</span>
                                <input 
                                  type="text" 
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  value={item.price === 0 ? '' : item.price} 
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    handlePriceChange(categoryKey as keyof typeof gamePrices, item.id, value);
                                  }} 
                                  className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-3 text-gray-800 text-sm font-black focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" 
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