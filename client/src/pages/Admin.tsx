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
  Edit2,
  Settings,
  Video,
  Image as ImageIcon
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

interface Settings {
  backgroundVideo?: string;
  restaurantName?: string;
  tagline?: string;
}

interface MenuData {
  settings?: Settings;
  categories: Category[];
  items: MenuItem[];
}

export default function Admin() {
  const [location, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [menuData, setMenuData] = useState<MenuData>({ categories: [], items: [] });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'settings'>('menu');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('/api/menu');
        if (response.data) {
          setMenuData(response.data);
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

  const addCategory = () => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: 'قسم جديد',
      icon: '➕',
      image: '/images/piece_box.png'
    };
    setMenuData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(c => c.id === id ? { ...c, ...updates } : c)
    }));
  };

  const removeCategory = (id: string) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id),
      items: prev.items.filter(i => i.category !== id)
    }));
  };

  const addItem = (categoryId: string) => {
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: 'صنف جديد',
      category: categoryId,
      description: 'وصف الصنف',
      price: 0,
      image: '/images/piece_box.png',
      available: true
    };
    setMenuData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const updateItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuData(prev => ({
      ...prev,
      items: prev.items.map(i => i.id === id ? { ...i, ...updates } : i)
    }));
  };

  const removeItem = (id: string) => {
    setMenuData(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== id)
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4 font-['Cairo',sans-serif]">
        <div className="w-full max-w-md bg-[#121212] border border-[#D4AF37]/30 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
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
              className="w-full px-6 py-4 rounded-2xl bg-[#1a1a1a] border border-[#D4AF37]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-center text-xl tracking-widest"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-black text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              دخول
            </button>
            <button
              type="button"
              onClick={() => setLocation('/')}
              className="w-full py-4 rounded-2xl bg-[#1a1a1a] border border-white/10 text-gray-400 font-bold hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للموقع
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-gray-100 font-['Cairo',sans-serif]">
      <header className="sticky top-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation('/')}
              className="p-2 rounded-xl bg-[#1a1a1a] border border-white/10 text-gray-400 hover:text-white transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-black gold-gradient-text">إدارة المطعم</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-2.5 rounded-full font-black transition-all ${activeTab === 'menu' ? 'bg-[#D4AF37] text-black' : 'bg-[#1a1a1a] text-gray-400'}`}
            >
              المنيو
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-2.5 rounded-full font-black transition-all ${activeTab === 'settings' ? 'bg-[#D4AF37] text-black' : 'bg-[#1a1a1a] text-gray-400'}`}
            >
              الإعدادات
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white font-black shadow-lg hover:bg-emerald-700 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'جاري الحفظ...' : 'حفظ'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'menu' ? (
          <div className="space-y-8">
            {/* Categories Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-[#D4AF37]">الأقسام</h2>
                <button
                  onClick={addCategory}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all font-bold"
                >
                  <Plus className="w-5 h-5" />
                  إضافة قسم
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuData.categories.map(cat => (
                  <div key={cat.id} className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <input
                        type="text"
                        value={cat.name}
                        onChange={(e) => updateCategory(cat.id, { name: e.target.value })}
                        className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#D4AF37] outline-none"
                      />
                      <button
                        onClick={() => removeCategory(cat.id)}
                        className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all ml-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">الأيقونة</label>
                      <input
                        type="text"
                        value={cat.icon}
                        onChange={(e) => updateCategory(cat.id, { icon: e.target.value })}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#D4AF37] outline-none text-center text-2xl"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">صورة القسم</label>
                      <div className="flex gap-2">
                        <div className="w-12 h-12 rounded-lg bg-black overflow-hidden border border-white/10">
                          <img src={`${import.meta.env.BASE_URL}${cat.image?.slice(1) || 'images/piece_box.png'}`} className="w-full h-full object-cover" alt="" />
                        </div>
                        <input
                          type="text"
                          value={cat.image || ''}
                          onChange={(e) => updateCategory(cat.id, { image: e.target.value })}
                          className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#D4AF37] outline-none text-xs"
                          placeholder="/images/..."
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {menuData.items.filter(i => i.category === cat.id).length} صنف
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items Section */}
            <div>
              <h2 className="text-3xl font-black text-[#D4AF37] mb-6">الأصناف</h2>
              {menuData.categories.map(cat => {
                const items = menuData.items.filter(i => i.category === cat.id);
                if (items.length === 0) return null;
                return (
                  <div key={cat.id} className="mb-8">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D4AF37]/20">
                      <h3 className="text-xl font-bold text-[#D4AF37]">{cat.icon} {cat.name}</h3>
                      <button
                        onClick={() => addItem(cat.id)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all font-bold text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        إضافة
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map(item => (
                        <div key={item.id} className="bg-[#121212] border border-white/5 rounded-xl p-4 space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateItem(item.id, { name: e.target.value })}
                              className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-2 py-1 text-white focus:border-[#D4AF37] outline-none text-sm"
                            />
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => updateItem(item.id, { available: !item.available })}
                              className={`p-1.5 rounded-lg border transition-all ${item.available !== false ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}
                            >
                              {item.available !== false ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => updateItem(item.id, { popular: !item.popular })}
                              className={`p-1.5 rounded-lg border transition-all ${item.popular ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-white/5 border-white/10 text-gray-500'}`}
                            >
                              <Star className="w-4 h-4" fill={item.popular ? 'currentColor' : 'none'} />
                            </button>
                          </div>

                          <div>
                            <label className="text-xs text-gray-500 block mb-1">السعر</label>
                            {item.prices ? (
                              <div className="space-y-1">
                                {item.prices.map((p, idx) => (
                                  <div key={idx} className="flex gap-1">
                                    <input
                                      type="text"
                                      value={p.sizeOrType}
                                      onChange={(e) => {
                                        const newPrices = [...item.prices!];
                                        newPrices[idx].sizeOrType = e.target.value;
                                        updateItem(item.id, { prices: newPrices });
                                      }}
                                      className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white focus:border-[#D4AF37] outline-none text-xs"
                                    />
                                    <input
                                      type="number"
                                      value={p.price}
                                      onChange={(e) => {
                                        const newPrices = [...item.prices!];
                                        newPrices[idx].price = Number(e.target.value);
                                        updateItem(item.id, { prices: newPrices });
                                      }}
                                      className="w-16 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-white focus:border-[#D4AF37] outline-none text-xs"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <input
                                type="number"
                                value={item.price || 0}
                                onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-2 py-1 text-white focus:border-[#D4AF37] outline-none text-sm"
                              />
                            )}
                          </div>

                          <div>
                            <label className="text-xs text-gray-500 block mb-1">الوصف</label>
                            <textarea
                              value={item.description || ''}
                              onChange={(e) => updateItem(item.id, { description: e.target.value })}
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-2 py-1 text-white focus:border-[#D4AF37] outline-none text-xs h-12 resize-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs text-gray-500 block mb-1">الصورة</label>
                            <div className="flex gap-1">
                              <div className="w-10 h-10 rounded-lg bg-black overflow-hidden border border-white/10 flex-shrink-0">
                                <img src={`${import.meta.env.BASE_URL}${item.image.slice(1)}`} className="w-full h-full object-cover" alt="" />
                              </div>
                              <input
                                type="text"
                                value={item.image}
                                onChange={(e) => updateItem(item.id, { image: e.target.value })}
                                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-2 py-1 text-white focus:border-[#D4AF37] outline-none text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black text-[#D4AF37] mb-6">إعدادات الموقع</h2>
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 space-y-6">
              <div>
                <label className="text-sm font-bold text-gray-300 block mb-2">رابط فيديو الخلفية</label>
                <input
                  type="text"
                  value={menuData.settings?.backgroundVideo || '/background.mp4'}
                  onChange={(e) => setMenuData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, backgroundVideo: e.target.value }
                  }))}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none transition-all"
                  placeholder="/background.mp4"
                />
                <p className="text-xs text-gray-500 mt-2">مثال: /background.mp4</p>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-300 block mb-2">اسم المطعم</label>
                <input
                  type="text"
                  value={menuData.settings?.restaurantName || 'مطعم الكشك'}
                  onChange={(e) => setMenuData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, restaurantName: e.target.value }
                  }))}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-300 block mb-2">الشعار</label>
                <input
                  type="text"
                  value={menuData.settings?.tagline || 'طعم بيكمل مزاجك'}
                  onChange={(e) => setMenuData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, tagline: e.target.value }
                  }))}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
