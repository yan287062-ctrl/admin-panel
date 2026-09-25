'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { savePricesToDb } from './actions/supabase';

const supabaseUrl = 'https://admin.painggyishop.cyou/api/supabase';
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

const getGameLogo = (gameName: string) => {
  const name = gameName?.toLowerCase() || '';
  if (name.includes('mobile legends') || name.includes('mlbb') || name.includes('mob')) return '/mlbb.png';
  if (name.includes('magic chess') || name.includes('mcgg') || name.includes('mag')) return '/mcgg.png';
  if (name.includes('pubg') || name.includes('uc')) return '/pubg.png';
  if (name.includes('telegram') || name.includes('tel')) return '/telegram.png';
  if (name.includes('heartopia')) return '/heartopia.png';
  if (name.includes('smile') || name.includes('brl') || name.includes('smi')) return '/smilecoin.png';
  return '/default-game.png';
};

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wallet' | 'users' | 'mapping' | 'bot' | 'announcements'>('dashboard'); 
  
  const [orders, setOrders] = useState<any[]>([]);
  const [walletTopups, setWalletTopups] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [gamePrices, setGamePrices] = useState(initialGamePrices);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 🌟 Bot Settings States 🌟
  const [botCookie, setBotCookie] = useState('');
  const [smileCoin, setSmileCoin] = useState('Loading...');

  // Search, Filter & Pagination States
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderPage, setOrderPage] = useState(1);
  
  const [walletSearch, setWalletSearch] = useState('');
  const [walletStatusFilter, setWalletStatusFilter] = useState('all');
  const [walletPage, setWalletPage] = useState(1);

  const [userSearch, setUserSearch] = useState('');
  const [userPage, setUserPage] = useState(1);

  const itemsPerPage = 10;

  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [annType, setAnnType] = useState('promo');
  const [isSendingAnn, setIsSendingAnn] = useState(false);

  const [stats, setStats] = useState({
    todaySales: 0,
    monthSales: 0,
    totalSales: 0,
    pendingOrders: 0,
    totalWalletAmount: 0,
    topGame: 'N/A',
    completionRate: 0,
    doneOrdersCount: 0,
    totalOrdersCount: 0
  });

  const fetchRealPrices = async () => {
    try {
      const { data } = await supabase.from('game_prices').select('*');
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
      const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (data) {
        setOrders(data);
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        
        let tSales = 0, mSales = 0, allSales = 0, pCount = 0, dCount = 0;
        const gameCounts: Record<string, number> = {};

        data.forEach(order => {
          const orderDate = new Date(order.created_at).getTime();
          if (order.status === 'pending') pCount++;
          else if (order.status === 'done' || order.status === 'success') { 
            dCount++;
            const price = Number(order.price) || 0;
            allSales += price;
            if (orderDate >= startOfToday) tSales += price;
            if (orderDate >= startOfMonth) mSales += price;
            const gameName = order.game_name || 'Unknown';
            gameCounts[gameName] = (gameCounts[gameName] || 0) + 1;
          }
        });

        let popularGame = "N/A", maxSells = 0;
        Object.entries(gameCounts).forEach(([name, count]) => {
          if (count > maxSells) { maxSells = count; popularGame = name; }
        });

        const rate = data.length > 0 ? Math.round((dCount / data.length) * 100) : 0;
        setStats(prev => ({ ...prev, todaySales: tSales, monthSales: mSales, totalSales: allSales, pendingOrders: pCount, topGame: popularGame, completionRate: rate, doneOrdersCount: dCount, totalOrdersCount: data.length }));
      }
    } catch (err) {
      console.log("Order Fetch Error:", err);
    }
  };

  const fetchWalletTopups = async () => {
    try {
      const { data } = await supabase.from('wallet_history').select('*').order('created_at', { ascending: false });
      if (data) {
        setWalletTopups(data);
        const totalWallet = data.filter(topup => topup.status === 'done').reduce((sum, topup) => sum + (Number(topup.amount) || 0), 0);
        setStats(prev => ({ ...prev, totalWalletAmount: totalWallet }));
      }
    } catch (err) {
      console.log("Wallet Fetch Error:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await supabase.from('users_wallet').select('*').order('balance', { ascending: false });
      if (data) setUsersList(data);
    } catch (err) {
      console.log("Users Fetch Error:", err);
    }
  };

  // 🌟 Fetch Bot Settings 🌟
  const fetchBotSettings = async () => {
    try {
      const { data } = await supabase.from('bot_settings').select('*').eq('id', 1).single();
      if (data) {
        setBotCookie(data.cookie || '');
        setSmileCoin(data.coin_balance || '0');
      }
    } catch (err) {
      console.log("Bot settings not found or empty.");
    }
  };

  // 🌟 Save Bot Cookie 🌟
  const saveBotCookie = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase.from('bot_settings').upsert({ 
        id: 1, 
        cookie: botCookie, 
        updated_at: new Date() 
      });
      if (error) throw error;
      alert("✅ Cookie Saved! Auto Bot will now use this cookie.");
    } catch (err: any) {
      alert("Error saving cookie: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders(); 
      fetchWalletTopups(); 
      fetchRealPrices(); 
      fetchUsers();
      fetchBotSettings();
    }
  }, [isLoggedIn]);

  // 🌟 1. Approve Order for Auto Topup (Bot Trigger API ခေါ်ခြင်း) 🌟
  const approveOrderForBot = async (order: any) => {
    try {
      await supabase.from('orders').update({ status: 'approved' }).eq('id', order.id);
      fetchOrders();
      
      alert("⏳ Bot သို့ အော်ဒါပို့နေပါသည်... ကျေးဇူးပြု၍ ခေတ္တစောင့်ပါ။");

      const response = await fetch('/api/bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: order.id,
          player_id: order.player_id,
          zone_id: order.zone_id,
          item_name: order.item_name,
          game_name: order.game_name
        })
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ " + result.message);
      } else {
        alert("❌ Bot Error: " + result.message);
        await supabase.from('orders').update({ status: 'pending' }).eq('id', order.id);
      }
      fetchOrders(); 
      
    } catch (err: any) {
      alert("Error triggering bot: " + err.message);
      await supabase.from('orders').update({ status: 'pending' }).eq('id', order.id);
      fetchOrders();
    }
  };

  // 🌟 2. Mark as Done Manually 🌟
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

  // 1-Click Refund System
  const refundOrder = async (order: any) => {
    if (!order.user_email) {
      alert("ဒီအော်ဒါက Email မပါတဲ့အတွက် Wallet ထဲ ငွေပြန်အမ်းလို့ မရပါ။");
      return;
    }
    if (window.confirm(`အော်ဒါကို Cancel လုပ်ပြီး ${order.user_email} ရဲ့ Wallet သို့ ငွေ ${order.price} Ks ပြန်အမ်းမည်မှာ သေချာပါသလား?`)) {
      try {
        await supabase.from('orders').update({ status: 'refunded' }).eq('id', order.id);
        const { data: walletData } = await supabase.from('users_wallet').select('balance').eq('email', order.user_email).single();
        let newBalance = Number(order.price) || 0;
        if (walletData) {
          newBalance += Number(walletData.balance);
          await supabase.from('users_wallet').update({ balance: newBalance }).eq('email', order.user_email);
        } else {
          await supabase.from('users_wallet').insert([{ email: order.user_email, balance: newBalance }]);
        }
        alert("✅ ငွေပြန်အမ်းခြင်း (Refund) အောင်မြင်ပါသည်!");
        fetchOrders();
        fetchUsers();
      } catch (err: any) {
        alert("Error refunding: " + err.message);
      }
    }
  };

  const approveWalletTopup = async (id: string, email: string, amount: number) => {
    if (!window.confirm(`Email အကောင့် ${email} သို့ ငွေ ${amount} Ks ဖြည့်သွင်းပေးမည်မှာ သေချာပါသလား?`)) return;
    try {
      const { data: walletData } = await supabase.from('users_wallet').select('balance').eq('email', email).single();
      let newBalance = amount;
      if (walletData) {
        newBalance += walletData.balance;
        await supabase.from('users_wallet').update({ balance: newBalance }).eq('email', email);
      } else {
        await supabase.from('users_wallet').insert([{ email: email, balance: newBalance }]);
      }
      await supabase.from('wallet_history').update({ status: 'done' }).eq('id', id);
      fetchWalletTopups();
      fetchUsers();
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

  // CSV Export Logic
  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) return alert("ထုတ်ယူစရာ ဒေတာမရှိပါ။");
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(val => `"${val}"`).join(',')).join('\n');
    const blob = new Blob([headers + '\n' + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  // ----------------------------------------------------
  // FILTERING & PAGINATION LOGIC 
  // ----------------------------------------------------
  const filteredOrders = orders.filter(o => {
    const matchSearch = (o.user_email || '').toLowerCase().includes(orderSearch.toLowerCase()) || 
                        (o.player_id || '').toLowerCase().includes(orderSearch.toLowerCase()) ||
                        (o.item_name || '').toLowerCase().includes(orderSearch.toLowerCase());
    const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchSearch && matchStatus;
  });
  const paginatedOrders = filteredOrders.slice((orderPage - 1) * itemsPerPage, orderPage * itemsPerPage);
  const totalOrderPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const filteredWalletTopups = walletTopups.filter(w => {
    const matchSearch = (w.email || '').toLowerCase().includes(walletSearch.toLowerCase());
    const matchStatus = walletStatusFilter === 'all' || w.status === walletStatusFilter;
    return matchSearch && matchStatus;
  });
  const paginatedWallet = filteredWalletTopups.slice((walletPage - 1) * itemsPerPage, walletPage * itemsPerPage);
  const totalWalletPages = Math.ceil(filteredWalletTopups.length / itemsPerPage);

  const filteredUsers = usersList.filter(u => (u.email || '').toLowerCase().includes(userSearch.toLowerCase()));
  const paginatedUsers = filteredUsers.slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage);
  const totalUserPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleSavePrices = async () => {
    setIsSaving(true);
    const allItems: any[] = [];
    Object.entries(gamePrices).forEach(([cat, items]) => {
      (items as any[]).forEach(item => {
        allItems.push({ id: item.id, category: cat, name: item.name, bonus: item.bonus || 'No bonus', price: Number(item.price) || 0 });
      });
    });
    try {
      const result = await savePricesToDb(allItems);
      if (!result.success) throw new Error(result.error);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: any) {
      alert("Error saving: " + error.message);
    } finally { setIsSaving(false); }
  };

  const handlePriceChange = (category: keyof typeof gamePrices, id: string, newPrice: string) => {
    let sanitizedPrice = newPrice.replace(/^0+/, '');
    if (sanitizedPrice === '') sanitizedPrice = ''; 
    setGamePrices(prev => ({ ...prev, [category]: prev[category].map(item => item.id === id ? { ...item, price: sanitizedPrice as any } : item) }));
  };

  const handleSendAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annMessage) return alert("ခေါင်းစဉ်နှင့် စာသား ထည့်ပါ။");
    setIsSendingAnn(true);
    try {
      const { error } = await supabase.from('announcements').insert([{ title: annTitle, message: annMessage, type: annType }]);
      if (error) throw error;
      alert("✅ ကြေငြာချက် ပေးပို့ပြီးပါပြီ!");
      setAnnTitle(''); setAnnMessage('');
    } catch (err: any) { alert("Error: " + err.message); } finally { setIsSendingAnn(false); }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'painggyi123') setIsLoggedIn(true);
    else alert("Invalid login!");
  };

  const categoryNames: Record<string, string> = { mlbb: 'Mobile Legends (MLBB)', mcgg: 'Magic Chess', pubg: 'PUBG Mobile', ucPack: 'UC Packs', telegram: 'Telegram Premium', heartopia: 'Heartopia', smileCoin: 'Smile Coin' };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-[#f0f2f5] font-sans">
        <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-2xl flex overflow-hidden min-h-[500px]">
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

  return (
    <main className="min-h-screen bg-[#f3f4f6] font-sans flex h-screen overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-indigo-700 text-white flex flex-col m-4 rounded-[30px] shadow-xl overflow-hidden relative z-20 shrink-0">
        <div className="p-8 flex items-center justify-center border-b border-indigo-600/50">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-md overflow-hidden">
               <img src="/painggyi-logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl">🎮</span>'; }} />
            </div>
            <h1 className="font-black text-sm tracking-widest uppercase">Paing Gyi</h1>
            <p className="text-indigo-300 text-[10px] font-bold tracking-widest uppercase">Admin</p>
          </div>
        </div>

        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'dashboard' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012-2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Dashboard
          </button>
          
          <button onClick={() => {setActiveTab('orders'); setOrderPage(1);}} className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'orders' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Orders
            </div>
            {stats.pendingOrders > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{stats.pendingOrders}</span>}
          </button>

          <button onClick={() => {setActiveTab('wallet'); setWalletPage(1);}} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'wallet' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            Wallet Topups
          </button>

          <button onClick={() => {setActiveTab('users'); setUserPage(1);}} className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'users' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              Users
            </div>
            <span className="bg-indigo-500/50 text-white text-[10px] px-2 py-0.5 rounded-full">{usersList.length}</span>
          </button>

          <button onClick={() => setActiveTab('mapping')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'mapping' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            Edit Prices
          </button>

          <button onClick={() => setActiveTab('bot')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'bot' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            Bot & Cookie
          </button>

          <button onClick={() => setActiveTab('announcements')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === 'announcements' ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:bg-indigo-600/50'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            Broadcast
          </button>
        </div>

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
        <div className="h-20 flex items-center justify-between px-8 bg-transparent shrink-0">
           <h2 className="text-2xl font-black text-gray-800 capitalize tracking-tight">
             {activeTab === 'mapping' ? 'Edit Game Prices' : activeTab === 'announcements' ? 'Broadcast Message' : activeTab}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-[24px] shadow-lg text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                  </div>
                 <h3 className="text-indigo-100 text-sm font-bold mb-1">Today's Sales</h3>
                  <p className="text-3xl font-black">{stats.todaySales.toLocaleString()} <span className="text-sm font-medium">Ks</span></p>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  </div>
                  <h3 className="text-gray-400 text-sm font-bold mb-1">This Month</h3>
                  <p className="text-3xl font-black text-gray-800">{stats.monthSales.toLocaleString()} <span className="text-sm text-gray-400 font-medium">Ks</span></p>
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
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    </div>
                  </div>
                  <h3 className="text-gray-400 text-sm font-bold mb-1">Wallet Topups</h3>
                  <p className="text-3xl font-black text-gray-800">{stats.totalWalletAmount.toLocaleString()} <span className="text-sm text-gray-400 font-medium">Ks</span></p>
                </div>
              </div>
              
              <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 mt-6">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                  Business Analytics
                </h3>
                
                {/* 🌟 ဤနေရာတွင် grid-cols-4 ဖြင့် ပြောင်းလဲရေးသားထားသည် 🌟 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Order Completion Rate</h4>
                    <div className="flex items-end gap-2 mb-2">
                       <span className="text-4xl font-black text-indigo-600">{stats.completionRate}%</span>
                       <span className="text-xs font-bold text-gray-400 mb-1">of total orders</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
                      <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${stats.completionRate}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 font-medium">Done: {stats.doneOrdersCount} / Total: {stats.totalOrdersCount}</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center items-center text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Top Selling Game</h4>
                    <p className="text-2xl font-black text-gray-800 capitalize">{stats.topGame}</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">All-Time Revenue</h4>
                    <p className="text-3xl font-black text-green-600 mb-1">{stats.totalSales.toLocaleString()} <span className="text-sm font-medium">Ks</span></p>
                    <p className="text-xs text-gray-400 font-medium mt-2">Total gross revenue from all completed orders.</p>
                  </div>
                  
                  {/* 🌟 အသစ်ထည့်ထားသော Registered Users ကတ် 🌟 */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                      </div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Registered Users</h4>
                    </div>
                    <p className="text-4xl font-black text-indigo-600 mb-1">{usersList.length}</p>
                    <p className="text-xs text-gray-400 font-medium mt-2">Total accounts opened on the website.</p>
                  </div>
                  {/* 🌟 ပြီးပါပြီ 🌟 */}
                  
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: ORDERS ================= */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 min-h-full flex flex-col">
              
              <div className="flex flex-col xl:flex-row gap-4 mb-6 items-center justify-between">
                <div className="flex items-center gap-4 w-full xl:w-auto">
                   <h3 className="font-bold text-gray-800 shrink-0">Recent Transactions</h3>
                   <button onClick={fetchOrders} className="text-xs bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold hover:bg-gray-200 shrink-0">🔄 Refresh</button>
                   <button onClick={() => downloadCSV(filteredOrders, 'orders_export.csv')} className="text-xs bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold hover:bg-green-200 shrink-0 flex items-center gap-1">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Export
                   </button>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
                   <input 
                     type="text" 
                     placeholder="Search Email, ID or Item..." 
                     value={orderSearch} 
                     onChange={e => {setOrderSearch(e.target.value); setOrderPage(1);}} 
                     className="px-4 py-2 rounded-xl border border-gray-200 text-sm w-full sm:w-64 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                   />
                   <select 
                     value={orderStatusFilter} 
                     onChange={e => {setOrderStatusFilter(e.target.value); setOrderPage(1);}} 
                     className="px-4 py-2 rounded-xl border border-gray-200 text-sm w-full sm:w-auto focus:outline-none focus:border-indigo-500"
                   >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved (Bot)</option>
                      <option value="done">Done</option>
                      <option value="success">Success (Bot)</option>
                      <option value="refunded">Refunded</option>
                   </select>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                {paginatedOrders.map((order) => (
                  <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all bg-gray-50/50">
                    
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                        {(() => {
                          const logoSrc = getGameLogo(order.game_name);
                          if (logoSrc === '/default-game.png') {
                            return <span className="text-indigo-600 font-black text-xs uppercase">{(order.game_name || 'UNK').substring(0, 3)}</span>;
                          }
                          return (
                            <img src={logoSrc} alt={order.game_name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class="text-indigo-600 font-black text-xs uppercase">${(order.game_name || 'UNK').substring(0, 3)}</span>`; }} />
                          );
                        })()}
                      </div>

                      <div className="truncate pr-4">
                        <h4 className="font-bold text-gray-800 text-sm truncate">{order.item_name}</h4>
                        <p className="text-xs text-gray-500 mt-1 font-medium truncate">
                          <span className="text-indigo-500 font-bold">{order.user_email || 'Guest User'}</span> &bull; ID: {order.player_id} {order.zone_id ? `| Zone: ${order.zone_id}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-1 mb-4 md:mb-0 shrink-0">
                      <span className={`font-black ${order.status === 'refunded' ? 'text-gray-400 line-through' : 'text-indigo-600'}`}>{order.price.toLocaleString()} Ks</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{order.payment_method}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                       {order.status === 'pending' && <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-lg uppercase">Pending</span>}
                       {order.status === 'approved' && <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-lg uppercase">Approved (Bot)</span>}
                       {(order.status === 'done' || order.status === 'success') && <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-lg uppercase">Success</span>}
                       {order.status === 'refunded' && <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded-lg uppercase">Refunded</span>}

                       {order.slip_url && (
                         <a href={order.slip_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300" title="View Screenshot">🖼️</a>
                       )}
                       
                       {order.status === 'pending' && (
                         <div className="flex gap-2">
                           <button onClick={() => approveOrderForBot(order)} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm text-xs font-bold" title="Approve for Bot Auto Topup">🤖 Auto Fill</button>
                           <button onClick={() => markAsDone(order.id)} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600" title="Mark as Done (Manual)">✔️</button>
                         </div>
                       )}
                       
                       {order.status !== 'refunded' && (
                         <button onClick={() => refundOrder(order)} className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200" title="Refund to Wallet">🔙</button>
                       )}

                       <button onClick={() => deleteOrder(order.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="Delete">🗑️</button>
                    </div>
                  </div>
                ))}
                {paginatedOrders.length === 0 && <div className="text-center text-gray-400 font-bold py-10">No orders found</div>}
              </div>

              {totalOrderPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button onClick={() => setOrderPage(p => Math.max(1, p - 1))} disabled={orderPage === 1} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm disabled:opacity-50">Prev</button>
                  <span className="text-sm font-bold text-gray-600">Page {orderPage} of {totalOrderPages}</span>
                  <button onClick={() => setOrderPage(p => Math.min(totalOrderPages, p + 1))} disabled={orderPage === totalOrderPages} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm disabled:opacity-50">Next</button>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: WALLET TOPUPS ================= */}
          {activeTab === 'wallet' && (
            <div className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 min-h-full flex flex-col">
              
              <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                   <h3 className="font-bold text-gray-800 shrink-0">Wallet Top-up Requests</h3>
                   <button onClick={fetchWalletTopups} className="text-xs bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold hover:bg-gray-200 shrink-0">🔄 Refresh</button>
                   <button onClick={() => downloadCSV(filteredWalletTopups, 'wallet_export.csv')} className="text-xs bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold hover:bg-green-200 shrink-0 flex items-center gap-1">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Export
                   </button>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                   <input 
                     type="text" 
                     placeholder="Search Email..." 
                     value={walletSearch} 
                     onChange={e => {setWalletSearch(e.target.value); setWalletPage(1);}} 
                     className="px-4 py-2 rounded-xl border border-gray-200 text-sm w-full sm:w-64 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                   />
                   <select 
                     value={walletStatusFilter} 
                     onChange={e => {setWalletStatusFilter(e.target.value); setWalletPage(1);}} 
                     className="px-4 py-2 rounded-xl border border-gray-200 text-sm w-full sm:w-auto focus:outline-none focus:border-indigo-500"
                   >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="done">Approved</option>
                   </select>
                </div>
              </div>
              
              <div className="space-y-4 flex-1">
                {paginatedWallet.map((topup) => (
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
                         <a href={topup.slip_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300" title="View Screenshot">🖼️</a>
                       )}
                       {topup.status === 'pending' && (
                         <button onClick={() => approveWalletTopup(topup.id, topup.email, topup.amount)} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" title="Approve">✔️</button>
                       )}
                       <button onClick={() => deleteWalletTopup(topup.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="Delete">🗑️</button>
                    </div>
                  </div>
                ))}
                {paginatedWallet.length === 0 && <div className="text-center text-gray-400 font-bold py-10">No wallet requests found</div>}
              </div>

              {totalWalletPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button onClick={() => setWalletPage(p => Math.max(1, p - 1))} disabled={walletPage === 1} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm disabled:opacity-50">Prev</button>
                  <span className="text-sm font-bold text-gray-600">Page {walletPage} of {totalWalletPages}</span>
                  <button onClick={() => setWalletPage(p => Math.min(totalWalletPages, p + 1))} disabled={walletPage === totalWalletPages} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm disabled:opacity-50">Next</button>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: USERS LIST ================= */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 min-h-full flex flex-col">
              
              <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                <div>
                   <h3 className="font-bold text-gray-800 text-lg">Registered Users</h3>
                   <p className="text-xs text-gray-500 mt-1 font-medium">Total: {filteredUsers.length} Accounts</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                   <input 
                     type="text" 
                     placeholder="Search User Email..." 
                     value={userSearch} 
                     onChange={e => {setUserSearch(e.target.value); setUserPage(1);}} 
                     className="px-4 py-2 rounded-xl border border-gray-200 text-sm w-full md:w-64 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                   />
                   <button onClick={fetchUsers} className="text-xs bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold hover:bg-gray-200 shrink-0">🔄 Refresh</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 content-start">
                {paginatedUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all bg-gray-50/50">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      </div>
                      <div className="truncate">
                        <h4 className="font-bold text-gray-800 text-sm truncate" title={user.email}>{user.email}</h4>
                        <p className="text-xs text-gray-500 font-medium">User</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block font-black text-indigo-600">{Number(user.balance).toLocaleString()} Ks</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Wallet Balance</span>
                    </div>
                  </div>
                ))}
                {paginatedUsers.length === 0 && <div className="col-span-full text-center text-gray-400 font-bold py-10">No users found</div>}
              </div>

              {totalUserPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button onClick={() => setUserPage(p => Math.max(1, p - 1))} disabled={userPage === 1} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm disabled:opacity-50">Prev</button>
                  <span className="text-sm font-bold text-gray-600">Page {userPage} of {totalUserPages}</span>
                  <button onClick={() => setUserPage(p => Math.min(totalUserPages, p + 1))} disabled={userPage === totalUserPages} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm disabled:opacity-50">Next</button>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 5: MAPPING (EDIT PRICES) ================= */}
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

          {/* ================= TAB 6: BOT SETTINGS (NEW) ================= */}
          {activeTab === 'bot' && (
            <div className="bg-white rounded-[30px] p-6 md:p-8 shadow-sm border border-gray-100 min-h-full">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-gray-800 mb-2">Bot Settings & Cookie</h3>
                <p className="text-gray-500 text-sm">Manage your Smile.One cookie and monitor coin balance. Database syncing ensures auto top-up works flawlessly.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm">🪙</div>
                  <h4 className="text-indigo-900 font-bold mb-1">Smile Coin Balance</h4>
                  <p className="text-3xl font-black text-indigo-600">{smileCoin}</p>
                  <p className="text-xs text-indigo-400 mt-2">Updated automatically</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Smile.One Cookie String</label>
                <textarea
                  value={botCookie}
                  onChange={(e) => setBotCookie(e.target.value)}
                  rows={6}
                  placeholder="Paste your active Smile.One cookie here..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm resize-none mb-4"
                ></textarea>
                <button
                  onClick={saveBotCookie}
                  disabled={isSaving}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md w-full md:w-auto ${isSaving ? 'bg-gray-200 text-gray-500' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  {isSaving ? 'Saving...' : 'Save Cookie to Database'}
                </button>
              </div>
            </div>
          )}

          {/* ================= TAB 7: BROADCAST / ANNOUNCEMENTS ================= */}
          {activeTab === 'announcements' && (
            <div className="bg-white rounded-[30px] p-6 md:p-8 shadow-sm border border-gray-100 min-h-full">
              <div className="max-w-2xl mx-auto mt-4">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-2">Send Broadcast Message</h3>
                  <p className="text-gray-500 text-sm">Send a notification directly to the inbox of all users.</p>
                </div>

                <form onSubmit={handleSendAnnouncement} className="space-y-5 bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message Title</label>
                    <input 
                      type="text" 
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      placeholder="E.g., Weekend Special Promo! 🔥"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message Type</label>
                    <div className="flex gap-4">
                      <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${annType === 'promo' ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'}`}>
                        <input type="radio" name="type" value="promo" checked={annType === 'promo'} onChange={() => setAnnType('promo')} className="hidden" />
                        <span className="text-lg">🎁</span>
                        <span className="font-bold text-sm">Promotion</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${annType === 'system' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'}`}>
                        <input type="radio" name="type" value="system" checked={annType === 'system'} onChange={() => setAnnType('system')} className="hidden" />
                        <span className="text-lg">ℹ️</span>
                        <span className="font-bold text-sm">System Update</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Detailed Message</label>
                    <textarea 
                      value={annMessage}
                      onChange={(e) => setAnnMessage(e.target.value)}
                      placeholder="Write the full details of your announcement here..."
                      rows={5}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm resize-none"
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSendingAnn}
                    className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${isSendingAnn ? 'bg-indigo-400 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-0.5'}`}
                  >
                    {isSendingAnn ? 'Sending...' : 'Send Broadcast Now'}
                    {!isSendingAnn && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>}
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}