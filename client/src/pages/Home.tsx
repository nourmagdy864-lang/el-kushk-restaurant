import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Star, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Flame,
  ArrowRight,
  MessageCircle,
  User,
  MapPinned
} from 'lucide-react';
import { CATEGORIES, MENU_ITEMS, RESTAURANT_INFO, MenuItem } from '../data/menuData';
import { toast } from 'sonner';
import { useLocation } from 'wouter';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sizeOrType?: string;
  imageStyle?: { objectPosition: string };
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState(CATEGORIES);
  const [backgroundVideo, setBackgroundVideo] = useState('/background.mp4');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('/api/menu');
        if (response.data && response.data.items && response.data.items.length > 0) {
          setMenuItems(response.data.items);
          setCategories(response.data.categories);
          if (response.data.settings?.backgroundVideo) {
            setBackgroundVideo(response.data.settings.backgroundVideo);
          }
        } else {
          // Fallback to embedded data if API fails or returns empty
          const fallbackData = await import('../data/menuData');
          setMenuItems(fallbackData.MENU_ITEMS);
        }
      } catch (error) {
        console.error('Failed to fetch menu:', error);
        // Fallback to static data
        import('../data/menuData').then(data => {
          setMenuItems(data.MENU_ITEMS);
        });
      }
    };
    fetchMenu();
  }, []);

  // Customer Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  const filteredItems = menuItems.filter(item => {
    const isAvailable = item.available !== false;
    const matchesCategory = !activeCategory || item.category === activeCategory;
    const matchesSearch = !searchQuery || 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return isAvailable && matchesCategory && matchesSearch;
  });

  const addToCart = (item: MenuItem, price: number, sizeOrType?: string) => {
    const cartItemId = `${item.id}-${sizeOrType || 'default'}`;
    setCart(prev => {
      const existing = prev.find(i => i.id === cartItemId);
      if (existing) {
        return prev.map(i => i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        id: cartItemId,
        name: `${item.name}${sizeOrType ? ` (${sizeOrType})` : ''}`,
        price,
        quantity: 1,
        image: item.image,
        sizeOrType,
        imageStyle: item.imageStyle
      }];
    });
    toast.success(`تم إضافة "${item.name}" إلى السلة بنجاح`);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.id !== cartItemId));
    toast.info('تم حذف العنصر من السلة');
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('السلة فارغة!');
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      toast.error('يرجى إدخال الاسم، رقم الهاتف، والعنوان بالتفصيل');
      return;
    }

    const orderText = cart.map(i => `• ${i.name} × ${i.quantity} = ${i.price * i.quantity} ج.م`).join('\n');
    
    const message = `🔔 *طلب جديد من موقع مطعم الكشك* 🔔\n\n` +
      `👤 *اسم العميل:* ${customerName}\n` +
      `📞 *رقم الهاتـف:* ${customerPhone}\n` +
      `📍 *العنوان:* ${customerAddress}\n` +
      `${customerNotes ? `📝 *ملاحظات:* ${customerNotes}\n` : ''}\n` +
      `🛒 *تفاصيل الأوردر:*\n${orderText}\n\n` +
      `💰 *الإجمالي الكلي:* *${totalPrice} ج.م*`;

    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    
    setOrderCompleted(true);
    toast.success('جاري توجيهك إلى واتساب المطعم لإتمام الطلب...');
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setCart([]);
      setOrderCompleted(false);
      setShowCheckoutForm(false);
      setIsCartOpen(false);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
      setCustomerNotes('');
    }, 1500);
  };

  const selectedCategoryObj = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#070707] text-gray-100 flex flex-col font-['Cairo',sans-serif]">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveCategory(null)}>
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#1a1a1a] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <span className="text-[#D4AF37] font-extrabold text-xl">ك</span>
            </div>
            <div>
              <h1 
                className="text-xl md:text-2xl font-black tracking-wider gold-gradient-text hover:opacity-80 transition-opacity cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setLocation("/admin");
                }}
              >
                {RESTAURANT_INFO.name}
              </h1>
              <p className="text-xs text-[#D4AF37]/80 tracking-widest uppercase font-semibold">
                {RESTAURANT_INFO.tagline} • {RESTAURANT_INFO.established}
              </p>
            </div>
          </div>

          {/* Quick Actions / Navigation */}
          <div className="flex items-center gap-4">
            <a 
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`} 
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-300 text-sm font-bold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">السلة</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-[#070707] animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Prominent Video Background */}
      <section className="relative py-24 md:py-36 overflow-hidden border-b border-[#D4AF37]/20 flex items-center justify-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.65] contrast-110 scale-105"
          >
            <source src={`${import.meta.env.BASE_URL}${backgroundVideo.startsWith('/') ? backgroundVideo.slice(1) : backgroundVideo}`} type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو
          </video>
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/60 to-[#070707]/50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-sm font-bold mb-4 backdrop-blur-md shadow-lg">
            <Flame className="w-4 h-4" />
            <span>جودة المكونات سر الطعم الأصلي</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight drop-shadow-xl text-white">
            استمتع بألذ أطباق <span className="gold-gradient-text">الكشك</span>
          </h2>
          <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium drop-shadow-md">
            اختر القسم الذي تحبه واستعرض أشهى الأطباق المجهزة خصيصاً لتناسب مزاجك.
          </p>

          {/* Global Search Bar */}
          <div className="max-w-xl mx-auto relative shadow-2xl">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#D4AF37]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أي طبق في المنيو..."
              className="w-full pr-12 pl-4 py-4 rounded-2xl bg-[#141414]/90 backdrop-blur-md border border-[#D4AF37]/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 text-base font-medium transition-all shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Main Content: Categories View or Selected Category Items View */}
      <section className="py-12 flex-1 container mx-auto px-4">
        
        {searchQuery ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-[#D4AF37]">نتائج البحث عن: "{searchQuery}"</h3>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/30 text-sm font-bold text-gray-300 hover:text-[#D4AF37]"
              >
                مسح البحث
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => renderItemCard(item, addToCart))}
            </div>
          </div>
        ) : activeCategory === null ? (
          <div>
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-100 mb-2">أقسام المنيو الرئيسية</h3>
              <p className="text-gray-400 text-sm">اضغط على أي قسم لتصفح محتوياته والأطباق الخاصة به</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {categories.map(cat => {
                const count = menuItems.filter(i => i.category === cat.id).length;
                const repItem = menuItems.find(i => i.category === cat.id);

                return (
                  <div
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="group relative h-64 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)] flex flex-col justify-end p-6 bg-black"
                  >
                    {repItem && (
                      <div className="absolute inset-0 overflow-hidden">
                        <img 
                          src={repItem.image.startsWith('/') ? `${import.meta.env.BASE_URL}${repItem.image.slice(1)}` : repItem.image} 
                          alt={cat.name} 
                          style={{
                            objectPosition: repItem.imageStyle?.objectPosition || 'center',
                            transform: 'scale(2.5)',
                            transformOrigin: repItem.imageStyle?.objectPosition || 'center'
                          }}
                          className="w-full h-full object-cover group-hover:scale-[2.7] transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent"></div>
                      </div>
                    )}

                    <div className="relative z-10">
                      <div className="text-3xl mb-2">{cat.icon}</div>
                      <h4 className="text-2xl font-black text-white group-hover:text-[#D4AF37] transition-colors mb-1">
                        {cat.name}
                      </h4>
                      <p className="text-gray-300 text-xs font-semibold flex items-center justify-between">
                        <span>{count} صنف متاح</span>
                        <span className="flex items-center gap-1 text-[#D4AF37] group-hover:translate-x-[-4px] transition-transform">
                          <span>استعرض القسم</span>
                          <ArrowRight className="w-4 h-4 rotate-180" />
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D4AF37]/20">
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141414] border border-[#D4AF37]/30 text-[#D4AF37] font-bold text-sm hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة لجميع الأقسام</span>
              </button>
              
              <h3 className="text-2xl md:text-3xl font-black gold-gradient-text">
                {selectedCategoryObj?.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => renderItemCard(item, addToCart))}
            </div>
          </div>
        )}

      </section>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-all animate-fadeIn">
          <div className="w-full max-w-md bg-[#121212] border-r border-[#D4AF37]/30 h-full flex flex-col shadow-2xl">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#161616]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#D4AF37]" />
                <h2 className="text-xl font-bold text-gray-100">سلة الطلبات</h2>
              </div>
              <button 
                onClick={() => { setIsCartOpen(false); setShowCheckoutForm(false); }}
                className="w-9 h-9 rounded-full bg-[#202020] text-gray-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400 font-semibold">سلة الطلبات فارغة حالياً</p>
                  <p className="text-gray-600 text-sm mt-1">اختر وجباتك المفضلة من الأقسام لإضافتها.</p>
                </div>
              ) : !showCheckoutForm ? (
                <>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/15">
                        <div className="w-16 h-16 rounded-lg overflow-hidden relative flex-shrink-0 bg-black">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{
                              objectPosition: item.imageStyle?.objectPosition || 'center',
                              transform: 'scale(2.5)',
                              transformOrigin: item.imageStyle?.objectPosition || 'center'
                            }}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-gray-200">{item.name}</h4>
                          <span className="text-[#D4AF37] font-black text-sm">{item.price * item.quantity} ج.م</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#121212] px-2 py-1 rounded-lg border border-[#D4AF37]/25">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-bold px-1 text-[#D4AF37]">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Customer Checkout Form */
                <form id="checkout-form" onSubmit={handleWhatsAppCheckout} className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20">
                    <h3 className="text-lg font-bold text-[#D4AF37]">بيانات التوصيل</h3>
                    <button 
                      type="button" 
                      onClick={() => setShowCheckoutForm(false)}
                      className="text-xs text-gray-400 hover:text-white underline"
                    >
                      العودة للسلة
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">الاسم الكامل *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input 
                        type="text"
                        required
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        placeholder="أدخل اسمك الكريم"
                        className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">رقم الهاتف (للتواصل) *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input 
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        placeholder="010xxxxxxxx"
                        className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">عنوان التوصيل بالتفصيل *</label>
                    <div className="relative">
                      <div className="absolute top-3 right-3 pointer-events-none text-gray-500">
                        <MapPinned className="w-4 h-4" />
                      </div>
                      <textarea 
                        required
                        rows={3}
                        value={customerAddress}
                        onChange={e => setCustomerAddress(e.target.value)}
                        placeholder="المنطقة، الشارع، رقم العلبة/العمارة، الدور..."
                        className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37] resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">ملاحظات إضافية (اختياري)</label>
                    <input 
                      type="text"
                      value={customerNotes}
                      onChange={e => setCustomerNotes(e.target.value)}
                      placeholder="بدون بصل، زيادة صوص..."
                      className="w-full px-3 py-2.5 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#D4AF37]/20 bg-[#161616] space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-gray-400">الإجمالي الكلي:</span>
                  <span className="text-[#D4AF37] font-black text-2xl">{totalPrice} ج.م</span>
                </div>

                {orderCompleted ? (
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-center flex items-center justify-center gap-2 font-bold animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>جاري التوجيه إلى واتساب المطعم...</span>
                  </div>
                ) : !showCheckoutForm ? (
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-extrabold text-base shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>إكمال الطلب وإدخال البيانات</span>
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-extrabold text-base shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>تأكيد وإرسال الطلب عبر الواتساب</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0b0b0b] border-t border-[#D4AF37]/20 pt-12 pb-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-[#1a1a1a] flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold">ك</span>
              </div>
              <h2 className="text-xl font-bold gold-gradient-text">{RESTAURANT_INFO.name}</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {RESTAURANT_INFO.tagline}. نقدم ألذ أنواع الحواوشي، برجر الفراخ، وتشيكن سماش بأعلى معايير الجودة والنظافة.
            </p>
            <div className="flex items-center gap-4 text-[#D4AF37]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-[#161616] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-[#161616] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#D4AF37] mb-4">أقسام المنيو</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }} className="hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-lg font-bold text-[#D4AF37] mb-4">خدمة العملاء والطلب</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>رقم الواتساب للطلبات: {RESTAURANT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>مواعيد العمل: يومياً من 12 ظهراً حتى 3 صباحاً</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>{RESTAURANT_INFO.deliveryTime}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="container mx-auto px-4 border-t border-[#D4AF37]/10 pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name} ({RESTAURANT_INFO.englishName}). جميع الحقوق محفوظة.</p>
        </div>
      </footer>

    </div>
  );
}

function renderItemCard(item: MenuItem, addToCart: (item: MenuItem, price: number, sizeOrType?: string) => void) {
  const hasMultiplePrices = item.prices && item.prices.length > 0;
  const objPos = item.imageStyle?.objectPosition || 'center';

  return (
    <div 
      key={item.id}
      className="group bg-[#121212] rounded-2xl overflow-hidden border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] flex flex-col justify-between"
    >
      <div>
        <div className="relative h-52 overflow-hidden bg-black">
          <img 
            src={item.image.startsWith('/') ? `${import.meta.env.BASE_URL}${item.image.slice(1)}` : item.image} 
            alt={item.name}
            style={{
              objectPosition: objPos,
              transform: 'scale(2.5)',
              transformOrigin: objPos
            }}
            className="w-full h-full object-cover group-hover:scale-[2.7] transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80 pointer-events-none"></div>
          
          {item.badge && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black text-xs font-black px-3 py-1 rounded-full shadow-lg z-10">
              {item.badge}
            </span>
          )}
          {item.popular && !item.badge && (
            <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
              <Star className="w-3 h-3 fill-white" />
              <span>الأكثر طلباً</span>
            </span>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-[#D4AF37] transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {item.description || 'مغذي ولذيذ محضر بطريقة مطعم الكشك الخاصة.'}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto border-t border-[#D4AF37]/10 flex flex-col gap-3">
        {hasMultiplePrices ? (
          <div className="flex flex-col gap-2 pt-2">
            <div className="text-xs text-[#D4AF37] font-bold">الأسعار حسب الحجم:</div>
            <div className="grid grid-cols-2 gap-2">
              {item.prices!.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => addToCart(item, p.price, p.sizeOrType)}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#1a1a1a] border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-xs font-bold"
                >
                  <span className="text-gray-300">{p.sizeOrType}</span>
                  <span className="text-[#D4AF37] font-black">{p.price} ج.م</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-black text-[#D4AF37]">
              {item.price} <span className="text-xs text-gray-400 font-normal">جنيهاً</span>
            </span>
            <button
              onClick={() => addToCart(item, item.price!)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>أضف للسلة</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
