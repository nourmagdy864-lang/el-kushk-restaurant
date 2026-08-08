import React, { useState } from 'react';
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
  UtensilsCrossed,
  ChefHat,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES, MENU_ITEMS, RESTAURANT_INFO, MenuItem } from '../data/menuData';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sizeOrType?: string;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ item: MenuItem; selectedPrice: number; sizeOrType?: string } | null>(null);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Filter items
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
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
        sizeOrType
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

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('السلة فارغة!');
      return;
    }
    setOrderCompleted(true);
    toast.success('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً');
    setTimeout(() => {
      setCart([]);
      setOrderCompleted(false);
      setIsCartOpen(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#070707] text-gray-100 flex flex-col font-['Cairo',sans-serif]">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#1a1a1a] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <span className="text-[#D4AF37] font-extrabold text-xl">ك</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-wider gold-gradient-text">
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
              href="tel:01000000000" 
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1c1c] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 text-sm font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>طلب سريع</span>
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

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#121212] via-[#0b0b0b] to-[#070707] border-b border-[#D4AF37]/15">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-bold mb-6">
            <Flame className="w-4 h-4" />
            <span>جودة المكونات سر الطعم الأصلي</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            استمتع بألذ أطباق <span className="gold-gradient-text">الحواوشي والبرجر والفرايز</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium">
            تخيل طعم اللحم الطازج المتبل بخلطة الكشك السرية، مع أشهى الأطباق والوجبات السريعة المحضرة بعناية لتناسب مزاجك.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative shadow-2xl">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#D4AF37]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن وجبتك المفضلة (حواوشي، تشيكن سماش، فرايز...)"
              className="w-full pr-12 pl-4 py-4 rounded-2xl bg-[#141414] border border-[#D4AF37]/40 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-base font-medium transition-all"
            />
          </div>
        </div>
      </section>

      {/* Main Menu Section */}
      <section className="py-12 flex-1 container mx-auto px-4">
        
        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start md:justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                  : 'bg-[#141414] text-gray-300 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#121212] rounded-2xl border border-[#D4AF37]/20">
            <UtensilsCrossed className="w-16 h-16 mx-auto text-[#D4AF37]/40 mb-4" />
            <h3 className="text-xl font-bold text-gray-300 mb-2">عذراً، لم نجد نتائج مطابقة</h3>
            <p className="text-gray-500">جرب البحث بكلمة أخرى أو تصفح الأقسام المختلفة.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => {
              const hasMultiplePrices = item.prices && item.prices.length > 0;
              const basePrice = item.price || (item.prices ? item.prices[0].price : 0);

              return (
                <div 
                  key={item.id}
                  className="group bg-[#121212] rounded-2xl overflow-hidden border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] flex flex-col justify-between"
                >
                  <div>
                    {/* Item Image with Badge */}
                    <div className="relative h-52 overflow-hidden bg-[#181818]">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80"></div>
                      
                      {item.badge && (
                        <span className="absolute top-3 right-3 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black text-xs font-black px-3 py-1 rounded-full shadow-lg">
                          {item.badge}
                        </span>
                      )}
                      {item.popular && !item.badge && (
                        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" />
                          <span>الأكثر طلباً</span>
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {item.description || 'مغذي ولذيذ محضر بطريقة مطعم الكشك الخاصة.'}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action */}
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
            })}
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
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-[#202020] text-gray-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400 font-semibold">سلة الطلبات فارغة حالياً</p>
                  <p className="text-gray-600 text-sm mt-1">اختر وجباتك المفضلة من المنيو لإضافتها.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/15">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
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
                ))
              )}
            </div>

            {/* Cart Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#D4AF37]/20 bg-[#161616] space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-gray-400">الإجمالي الكلي:</span>
                  <span className="text-[#D4AF37] font-black text-2xl">{totalPrice} ج.م</span>
                </div>

                {orderCompleted ? (
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-center flex items-center justify-center gap-2 font-bold animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>تم تأكيد طلبك بنجاح! شكراً لاختيارك الكشك</span>
                  </div>
                ) : (
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-extrabold text-base shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    تأكيد وإرسال الطلب
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
              <li><button onClick={() => setActiveCategory('hawaoshi')} className="hover:text-[#D4AF37] transition-colors">حواوشي بلدي وشرقي</button></li>
              <li><button onClick={() => setActiveCategory('chicken-burger')} className="hover:text-[#D4AF37] transition-colors">برجر فراخ كرسبي</button></li>
              <li><button onClick={() => setActiveCategory('smash-burger')} className="hover:text-[#D4AF37] transition-colors">تشيكن وسماش برجر</button></li>
              <li><button onClick={() => setActiveCategory('meals')} className="hover:text-[#D4AF37] transition-colors">الوجبات العائلية والفردية</button></li>
              <li><button onClick={() => setActiveCategory('crispy-box')} className="hover:text-[#D4AF37] transition-colors">بوكس كريسبى البطاطس والصوصات</button></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-lg font-bold text-[#D4AF37] mb-4">خدمة العملاء والتوصيل</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>الخط الساخن: 010XXXXXXXX</span>
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
