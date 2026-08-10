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
  Package,
  Edit2
} from 'lucide-react';
import { toast } from 'sonner';
import { Category, MenuItem } from '../data/menuData';

export default function Admin() {
  const [location, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [menuData, setMenuData] = useState<{ categories: Category[], items: MenuItem[] }>({
    categories: [],
    items: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('/api/menu');
        if (response.data && response.data.items && response.data.items.length > 0) {
          setMenuData(response.data);
        } else {
          // Use fallback data if API returns empty
          import('../data/menuData').then(data => {
            setMenuData({
              categories: data.CATEGORIES,
              items: data.MENU_ITEMS
            });
          });
        }
      } catch (error) {
        toast.error('فشل تحميل البيانات، يتم استخدام البيانات الاحتياطية');
        import('../data/menuData').then(data => {
          setMenuData({
            categories: data.CATEGORIES,
            items: data.MENU_ITEMS
          });
        });
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

  const addItem = (categoryId: string) => {
    const newItem: MenuItem = {
      id: `new-${Date.now()}`,
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

  const removeItem = (id: string) => {
    setMenuData(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== id)
    }));
  };

  const updateItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuData(prev => ({
      ...prev,
      items: prev.items.map(i => i.id === id ? { ...i, ...updates } : i)
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
            <h1 className="text-2xl font-black gold-gradient-text">إدارة المنيو</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white font-black shadow-lg hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {menuData.categories.map(cat => (
          <div key={cat.id} className="mb-12">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#D4AF37]/20">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cat.icon}</span>
                <h2 className="text-2xl font-black text-[#D4AF37]">{cat.name}</h2>
              </div>
              <button
                onClick={() => addItem(cat.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all font-bold text-sm"
              >
                <Plus className="w-4 h-4" />
                إضافة صنف
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuData.items.filter(i => i.category === cat.id).map(item => (
                <div key={item.id} className="bg-[#121212] border border-white/5 rounded-3xl p-6 shadow-xl relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateItem(item.id, { available: !item.available })}
                        className={`p-2 rounded-lg border transition-all ${item.available !== false ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}
                        title={item.available !== false ? 'متوفر حالياً' : 'غير متوفر'}
                      >
                        {item.available !== false ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => updateItem(item.id, { popular: !item.popular })}
                        className={`p-2 rounded-lg border transition-all ${item.popular ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-white/5 border-white/10 text-gray-500'}`}
                        title="الأكثر طلباً"
                      >
                        <Star className="w-5 h-5" fill={item.popular ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">اسم الصنف</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, { name: e.target.value })}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-white focus:border-[#D4AF37] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">السعر (ج.م)</label>
                      <input
                        type="number"
                        value={item.price || 0}
                        onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-white focus:border-[#D4AF37] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">الوصف</label>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateItem(item.id, { description: e.target.value })}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-white focus:border-[#D4AF37] outline-none transition-all h-20 resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">مسار الصورة</label>
                      <div className="flex gap-2">
                        <div className="w-12 h-12 rounded-lg bg-black overflow-hidden border border-white/10 flex-shrink-0">
                          <img 
                            src={item.image.startsWith('/') ? `${import.meta.env.BASE_URL}${item.image.slice(1)}` : item.image} 
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                        <input
                          type="text"
                          value={item.image}
                          onChange={(e) => updateItem(item.id, { image: e.target.value })}
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-white focus:border-[#D4AF37] outline-none transition-all text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
