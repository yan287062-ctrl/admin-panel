'use client';

import { useState } from 'react';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'topups' | 'prices'>('orders');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'painggyi123') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#070b19] flex items-center justify-center p-4 font-sans relative overflow-hidden">
        
        {/* Background Glow Effects (Optional for extra premium look) */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px]"></div>

        <div className="w-full max-w-[400px] bg-[#141627] rounded-[2.5rem] p-8 sm:p-10 border border-white/5 shadow-2xl relative z-10">
          
          {/* Logo Area */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#0a0b14] border border-white/10 shadow-[0_0_20px_rgba(236,72,153,0.2)] overflow-hidden">
             {/* Logo နေရာတွင် အစ်ကို့ Logo ထည့်နိုင်ပါသည်။ လောလောဆယ် စာသားနှင့် ပုံစံဖန်တီးထားပါသည်။ */}
             <div className="text-center leading-tight">
                <span className="text-pink-500 font-black text-sm block">Paing Gyi</span>
                <span className="text-yellow-400 font-bold text-[10px] block">Admin</span>
             </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-gray-400 text-sm">Login to Admin Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div className="relative flex items-center">
              <svg className="absolute left-4 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <input 
                type="text" 
                placeholder="Admin Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full bg-[#1c1e32] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center">
              <svg className="absolute left-4 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-[#1c1e32] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {loginError && <p className="text-red-500 text-xs text-center font-medium mt-2">Invalid Username or Password!</p>}

            {/* Login Button (Gradient) */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:opacity-90 text-white font-bold text-sm py-3.5 rounded-2xl shadow-[0_4px_15px_rgba(59,130,246,0.3)] transition-all mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  // --- Admin Panel ဝင်ပြီးသား မျက်နှာပြင် (Tabs များ) ---
  return (
    <main className="min-h-screen bg-[#070b19] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header & Tabs */}
        <div className="bg-[#141627] p-4 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-white font-bold text-sm pl-2">Paing Gyi <span className="text-pink-500">Admin</span></h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'orders' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg' : 'bg-[#1c1e32] text-gray-400 hover:text-white'}`}>
              စောင့်ဆိုင်းစာရင်း
            </button>
            <button onClick={() => setActiveTab('topups')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'topups' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg' : 'bg-[#1c1e32] text-gray-400 hover:text-white'}`}>
              ငွေဖြည့်တောင်းဆိုမှုများ
            </button>
            <button onClick={() => setActiveTab('prices')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'prices' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg' : 'bg-[#1c1e32] text-gray-400 hover:text-white'}`}>
              ဈေးနှုန်းပြင်ဆင်ရန်
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-all ml-2">
              Logout
            </button>
          </div>
        </div>

        {/* Empty Content Areas for Tabs */}
        <div className="bg-[#141627] rounded-[2rem] border border-white/5 p-8 shadow-2xl min-h-[500px] flex items-center justify-center">

          {activeTab === 'orders' && (
            <div className="text-center">
              <div className="text-4xl mb-4">📦</div>
              <h2 className="text-white text-lg font-bold mb-2">စောင့်ဆိုင်းစာရင်း</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">ဒီနေရာမှာ User တွေ ဝယ်ယူထားတဲ့ ဂိမ်း Package (ဥပမာ- Diamonds, UC) စာရင်းတွေ ပေါ်လာပါမယ်။</p>
            </div>
          )}

          {activeTab === 'topups' && (
            <div className="text-center">
              <div className="text-4xl mb-4">💳</div>
              <h2 className="text-white text-lg font-bold mb-2">ငွေဖြည့်တောင်းဆိုမှုများ</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">ဒီနေရာမှာ Wallet ထဲ ငွေဖြည့်ဖို့ တောင်းဆိုထားတဲ့ Screenshot တွေနဲ့ အချက်အလက်တွေ ပေါ်လာပါမယ်။</p>
            </div>
          )}

          {activeTab === 'prices' && (
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h2 className="text-white text-lg font-bold mb-2">ဈေးနှုန်းပြင်ဆင်ရန်</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">ဒီနေရာမှာ ဂိမ်း Item တွေရဲ့ ဈေးနှုန်းတွေကို Admin က ဝင်ရောက်ပြင်ဆင်လို့ ရပါမယ်။</p>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
