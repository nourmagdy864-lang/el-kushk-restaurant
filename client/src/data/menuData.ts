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
  },
  {
    id: 'h-2',
    name: 'حواوشي لحمة دبل',
    category: 'hawaoshi',
    description: 'دبل لحمة مفرومة طازجة لمتعة مضاعفة في عيش بلدي',
    price: 90,
    image: '/images/hawawshi.png',
    available: true
  },
  {
    id: 'cb-1',
    name: 'تشيكن كلاسيك',
    category: 'chicken-burger',
    description: 'دجاج كرسبي مقرمش مع خس، طماطم، وصوص الكشك الخاص في خبز كيزر طري',
    prices: [
      { sizeOrType: 'سينجل', price: 80 },
      { sizeOrType: 'دبل', price: 120 }
    ],
    image: '/images/chicken_burger.png',
    popular: true,
    available: true
  },
  {
    id: 'sb-1',
    name: 'سماش',
    category: 'smash-burger',
    description: 'لحم بقرى سماش طازج مع جبنة شيدر مذابة وصوص خاص',
    prices: [
      { sizeOrType: 'سينجل', price: 90 },
      { sizeOrType: 'دبل', price: 130 },
      { sizeOrType: 'تربييل', price: 170 }
    ],
    image: '/images/smash_beef.png',
    popular: true,
    available: true
  },
  {
    id: 'm-1',
    name: 'وجبه كريسي',
    category: 'meals',
    description: 'قطع دجاج كرسبي مقرمشة تقدم مع البطاطس المحمرة والخبز والثومية',
    price: 180,
    image: '/images/meals.png',
    popular: true,
    available: true
  },
  {
    id: 'f-1',
    name: 'فرينش فرايز',
    category: 'fries',
    description: 'بطاطس مقرمشة ذهبية اللون',
    price: 35,
    image: '/images/fries.png',
    available: true
  },
  {
    id: 'cbx-2',
    name: 'بوكس 4 قطعه',
    category: 'crispy-box',
    description: '4 قطعه كرسبي + 400 جرام بطاطس + 2 صوص جبنه + 2 قطعه كيزر',
    price: 320,
    image: '/images/piece_box.png',
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
