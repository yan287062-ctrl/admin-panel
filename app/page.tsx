'use client';

import { useState } from 'react';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'topups' | 'prices'>('prices');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // အစ်ကိုပေးထားသော ဈေးနှုန်း Mapping အပြည့်အစုံ (Category ခွဲထားသည်)
  const [gamePrices, setGamePrices] = useState({
    mlbb: [
      { id: 'mlbb_1', name: '55 Diamonds', price: 3461 }, { id: 'mlbb_2', name: '165 Diamonds', price: 10372 },
      { id: 'mlbb_3', name: '275 Diamonds', price: 16636 }, { id: 'mlbb_4', name: '565 Diamonds', price: 34160 },
      { id: 'mlbb_5', name: 'Weekly Pass', price: 6600 }, { id: 'mlbb_6', name: 'Weekly Pass x 2', price: 13200 },
      { id: 'mlbb_10', name: 'Twilight Pass', price: 35712 }, { id: 'mlbb_46', name: '9288 Diamonds', price: 539360 }
      // (နေရာမကျပ်စေရန် အဓိက Item အချို့သာ အရင်ပြထားပါသည်။ လိုအပ်လျှင် ထပ်ထည့်နိုင်ပါသည်။)
    ],
    magicChess: [
      { id: 'mcgg_1', name: '10', bonus: '+ 1 Diamonds', price: 900 },
      { id: 'mcgg_6', name: 'Weekly Card', bonus: 'No bonus', price: 8800 },
      { id: 'mcgg_15', name: '5035', bonus: '+ 1007 Diamonds', price: 414100 }
    ],
    pubg: [
      { id: 'pubg_1', name: '60 UC', price: 4106 }, { id: 'pubg_2', name: '325 UC', price: 20529 },
      { id: 'pubg_3', name: '660 UC', price: 41059 }, { id: 'pubg_12', name: '8100 UC', price: 504112 }
    ],
    ucPack: [
      { id: 'ucp_1', name: 'First Purchase Pack', price: 4100 },
      { id: 'ucp_10', name: 'Elite Pass LV1-50', price: 24800 },
      { id: 'ucp_17', name: 'Prime Plus (12 Months)', price: 487800 }
    ],
    telegram: [
      { id: 'tg_1', name: '50 Stars', price: 3552 }, { id: 'tg_7', name: '500 Stars', price: 35291 },
      { id: 'tg_14', name: '3 months premium', price: 56420 }
    ],
    heartopia: [
      { id: 'heart_1', name: '20 Heart Diamond', price: 2588 },
      { id: 'heart_9', name: 'GAMG Junior Membership', price: 2681 }
    ],
    smileCoin: [
      { id: 'smile_1', name: 'Brl 300', price: 25800 },
      { id: 'smile_2', name: 'Brl 1000', price: 83800 },
      { id: 'smile_3', name: 'Brl 5000', price: 419000 } // မှန်းထည့်ပေးထားပါသည်။
    ]
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'painggyi123') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

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
    console.log("Saved Prices Object:", gamePrices);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" 
            style={{ background: 'linear-gradient(135deg, #1a0b2e 0%, #3a1c71 50%, #d76d77 100%)' }}>
        <div className="w-full max-w-[420px] rounded-3xl p-8 sm:p-10 relative z-10"
             style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)' }}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Paing Gyi Admin</h1>
            <p className="text-gray-300 text-sm">Login to Admin Panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="text" placeholder="Admin Username" value={username} onChange={(e) => setUsername(e.target.value)} 
              className="w-full rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none placeholder-gray-400"
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} 
              className="w-full rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none placeholder-gray-400"
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
            {loginError && <p className="text-red-400 text-xs text-center font-medium">Invalid Username or Password!</p>}
            <button type="submit" className="w-full font-bold text-white text-sm py-3.5 rounded-xl shadow-lg"
              style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)' }}>
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b19] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Tabs */}
        <div className="bg-[#141627] p-4 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-white font-bold text-sm pl-2">Paing Gyi <span className="text-pink-500">Admin</span></h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'orders' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'bg-[#1c1e32] text-gray-400'}`}>Orders</button>
            <button onClick={() => setActiveTab('topups')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'topups' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'bg-[#1c1e32] text-gray-400'}`}>Topups</button>
            <button onClick={() => setActiveTab('prices')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'prices' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'bg-[#1c1e32] text-gray-400'}`}>Prices</button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="bg-[#141627] rounded-[2rem] border border-white/5 p-6 shadow-2xl min-h-[500px]">
          {activeTab === 'prices' && (
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <h2 className="text-white text-lg font-bold">💰 ဈေးနှုန်းများ တိုက်ရိုက်ပြင်ဆင်ရန်</h2>
                <button onClick={handleSavePrices} className="bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl">
                  Save Changes
                </button>
              </div>

              {saveSuccess && (
                <div className="bg-green-500/20 text-green-400 p-3 rounded-xl text-sm font-bold text-center mb-6">
                  ✅ ဈေးနှုန်းများကို အောင်မြင်စွာ မှတ်သားထားပါသည်။
                </div>
              )}

              {/* Game Categories Loop */}
              {Object.entries(gamePrices).map(([category, items]) => (
                <div key={category} className="mb-10">
                  <h3 className="text-xl font-bold text-pink-500 mb-4 uppercase tracking-wider border-l-4 border-pink-500 pl-3">
                    {category === 'mlbb' ? 'Mobile Legends' : category.toUpperCase()}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                      <div key={item.id} className="bg-[#1c1e32] p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                        <div className="mb-3">
                          <h3 className="text-white font-bold text-sm">{item.name}</h3>
                          {'bonus' in item && item.bonus !== 'No bonus' && <span className="text-green-400 text-[10px]">{item.bonus}</span>}
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Ks</span>
                          <input 
                            type="number"
                            value={item.price}
                            onChange={(e) => handlePriceChange(category as keyof typeof gamePrices, item.id, e.target.value)}
                            className="w-full bg-[#070b19] border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white text-sm font-bold focus:border-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
