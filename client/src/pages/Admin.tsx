import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import { 
  Plus, 
  Trash2, 
  Save, 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  XCircle,
  Star,
  Settings,
  LayoutGrid,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  price?: number;
  prices?: { sizeOrType: string; price: number }[];
  image: string;
  available?: boolean;
  popular?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

interface MenuData {
  settings?: {
    backgroundVideo?: string;
    restaurantName?: string;
    tagline?: string;
  };
  categories: Category[];
  items: MenuItem[];
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [menuData, setMenuData] = useState<MenuData>({ categories: [], items: [] });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'settings'>('menu');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('/api/menu');
        if (response.data && response.data.categories) {
          setMenuData(response.data);
          // Expand all by default
          const expanded: Record<string, boolean> = {};
          response.data.categories.forEach((c: Category) => expanded[c.id] = true);
          setExpandedCategories(expanded);
        }
      } catch (error) {
        toast.error('فشل تحميل البيانات');
      }
    };
    fetchMenu();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '01212') {
      setIsLoggedIn(true);
      toast.success('تم تسجيل الدخول بنجاح');
    } else {
      toast.error('كلمة مرور خاطئة');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post('/api/menu', {
        password: '01212',
        data: menuData
      });
      toast.success('تم حفظ التعديلات بنجاح');
    } catch (error) {
      toast.error('فشل حفظ التعديلات');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuData(prev => ({
      ...prev,
      items: prev.items.map(i => i.id === id ? { ...i, ...updates } : i)
    }));
  };

  const removeItem = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الصنف؟')) {
      setMenuData(prev => ({
        ...prev,
        items: prev.items.filter(i => i.id !== id)
      }));
    }
  };

  const addItem = (categoryId: string) => {
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: 'صنف جديد',
      category: categoryId,
      price: 0,
      image: '/images/piece_box.png',
      available: true
    };
    setMenuData(prev => ({
      ...prev,
      items: [newItem, ...prev.items]
    }));
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4 font-['Cairo',sans-serif]">
        <div className="w-full max-w-md bg-[#121212] border border-[#D4AF37]/30 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-[#D4AF37]" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">لوحة تحكم الأدمن</h2>
            <p className="text-gray-400">يرجى إدخال كلمة المرور للمتابعة</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full px-6 py-4 rounded-2xl bg-[#1a1a1a] border border-[#D4AF37]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-center text-xl tracking-widest"
              autoFocus
            />
            <button type="submit" className="w-full py-4 rounded-2xl bg-[#D4AF37] text-black font-black text-lg shadow-xl">دخول</button>
            <button type="button" onClick={() => setLocation('/')} className="w-full py-4 rounded-2xl bg-[#1a1a1a] border border-white/10 text-gray-400 font-bold flex items-center justify-center gap-2">
              <ArrowLeft className="w-5 h-5" /> العودة للموقع
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-gray-100 font-['Cairo',sans-serif]">
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#D4AF37]/20 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black text-[#D4AF37]">لوحة التحكم</h1>
            <nav className="flex bg-[#1a1a1a] rounded-full p-1">
              <button onClick={() => setActiveTab('menu')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${activeTab === 'menu' ? 'bg-[#D4AF37] text-black' : 'text-gray-400'}`}>
                المنيو
              </button>
              <button onClick={() => setActiveTab('settings')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-[#D4AF37] text-black' : 'text-gray-400'}`}>
                الإعدادات
              </button>
            </nav>
          </div>
          <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-600 text-white font-black shadow-lg hover:bg-emerald-700 disabled:opacity-50">
            <Save className="w-5 h-5" />
            <span>{loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'menu' ? (
          <div className="space-y-6">
            {menuData.categories.map(cat => (
              <div key={cat.id} className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <div 
                  className="bg-[#1a1a1a] px-6 py-4 flex items-center justify-between cursor-pointer border-b border-white/5"
                  onClick={() => toggleCategory(cat.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <h2 className="text-xl font-bold text-[#D4AF37]">{cat.name}</h2>
                    <span className="bg-black/50 text-gray-400 px-2 py-0.5 rounded text-xs">
                      {menuData.items.filter(i => i.category === cat.id).length} صنف
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); addItem(cat.id); }}
                      className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    {expandedCategories[cat.id] ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                  </div>
                </div>

                {expandedCategories[cat.id] && (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuData.items.filter(i => i.category === cat.id).map(item => (
                      <div key={item.id} className="bg-[#0f0f0f] border border-white/5 rounded-xl p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="w-16 h-16 rounded-lg bg-black overflow-hidden border border-white/10 flex-shrink-0">
                            <img src={`${import.meta.env.BASE_URL}${item.image.startsWith('/') ? item.image.slice(1) : item.image}`} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => updateItem(item.id, { available: !item.available })} className={`p-2 rounded-lg border ${item.available !== false ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                              {item.available !== false ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            </button>
                            <button onClick={() => updateItem(item.id, { popular: !item.popular })} className={`p-2 rounded-lg border ${item.popular ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-white/5 border-white/10 text-gray-500'}`}>
                              <Star className="w-4 h-4" fill={item.popular ? 'currentColor' : 'none'} />
                            </button>
                            <button onClick={() => removeItem(item.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={item.name} 
                            onChange={(e) => updateItem(item.id, { name: e.target.value })}
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#D4AF37] outline-none text-sm"
                            placeholder="اسم الصنف"
                          />
                          {item.prices ? (
                            <div className="space-y-1">
                              {item.prices.map((p, idx) => (
                                <div key={idx} className="flex gap-1">
                                  <input type="text" value={p.sizeOrType} onChange={(e) => {
                                    const newPrices = [...item.prices!];
                                    newPrices[idx].sizeOrType = e.target.value;
                                    updateItem(item.id, { prices: newPrices });
                                  }} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs" />
                                  <input type="number" value={p.price} onChange={(e) => {
                                    const newPrices = [...item.prices!];
                                    newPrices[idx].price = Number(e.target.value);
                                    updateItem(item.id, { prices: newPrices });
                                  }} className="w-16 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white text-xs" />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <input 
                              type="number" 
                              value={item.price || 0} 
                              onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#D4AF37] outline-none text-sm"
                              placeholder="السعر"
                            />
                          )}
                          <textarea 
                            value={item.description || ''} 
                            onChange={(e) => updateItem(item.id, { description: e.target.value })}
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#D4AF37] outline-none text-xs h-16 resize-none"
                            placeholder="الوصف"
                          />
                          <input 
                            type="text" 
                            value={item.image} 
                            onChange={(e) => updateItem(item.id, { image: e.target.value })}
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#D4AF37] outline-none text-[10px]"
                            placeholder="مسار الصورة"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-[#121212] border border-white/5 rounded-3xl p-8 space-y-8">
            <h2 className="text-2xl font-black text-[#D4AF37] flex items-center gap-2">
              <Settings className="w-6 h-6" /> إعدادات الموقع العامة
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-gray-400 block mb-2">رابط فيديو الخلفية</label>
                <input 
                  type="text" 
                  value={menuData.settings?.backgroundVideo || ''} 
                  onChange={(e) => setMenuData(prev => ({ ...prev, settings: { ...prev.settings, backgroundVideo: e.target.value } }))}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-400 block mb-2">اسم المطعم</label>
                <input 
                  type="text" 
                  value={menuData.settings?.restaurantName || ''} 
                  onChange={(e) => setMenuData(prev => ({ ...prev, settings: { ...prev.settings, restaurantName: e.target.value } }))}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-400 block mb-2">شعار المطعم (Tagline)</label>
                <input 
                  type="text" 
                  value={menuData.settings?.tagline || ''} 
                  onChange={(e) => setMenuData(prev => ({ ...prev, settings: { ...prev.settings, tagline: e.target.value } }))}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
