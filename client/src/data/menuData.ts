export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  price?: number;
  prices?: { sizeOrType: string; price: number }[];
  image: string;
  badge?: string;
  popular?: boolean;
  available?: boolean;
  imageStyle?: { objectPosition: string };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: 'hawaoshi', name: 'حواوشي مصراوي', icon: '🫓' },
  { id: 'chicken-burger', name: 'برجر فراخ', icon: '🍔' },
  { id: 'smash-burger', name: 'سماش بيف', icon: '🔥' },
  { id: 'meals', name: 'الوجبات', icon: '🍱' },
  { id: 'fries', name: 'فرايز', icon: '🍟' },
  { id: 'crispy-box', name: 'بوكس كريسبى', icon: '📦' },
  { id: 'extras', name: 'إضافات', icon: '➕' },
];

// Initial items (fallback)
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'h-1',
    name: 'حواوشي لحمة ساده',
    category: 'hawaoshi',
    description: 'لحمة مفرومة طازجة بتوابل الكشك الأصلية في عيش بلدي مقرمش',
    price: 75,
    image: '/images/hawawshi.png',
    popular: true,
    available: true
  }
];

export const RESTAURANT_INFO = {
  name: 'مطعم الكشك',
  englishName: 'EL KUSHK',
  tagline: 'طعم بيكمل مزاجك',
  established: 'EST. 2018',
  phone: '01096543496',
  whatsapp: '201096543496',
  instagram: '@elkushk.eg',
  facebook: 'elkushk.eg',
  deliveryTime: 'خدمة توصيل سريعة'
};
