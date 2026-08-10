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
  imageStyle?: { objectPosition: string };
}

export const CATEGORIES = [
  { id: 'hawaoshi', name: ', حواوشي مصراوي', icon: '🫓' },
  { id: 'chicken-burger', name: 'برجر فراخ', icon: '🍔' },
  { id: 'smash-burger', name: '  سماش بيف', icon: '🔥' },
  { id: 'meals', name: 'الوجبات', icon: '🍱' },
  { id: 'fries', name: 'فرايز', icon: '🍟' },
  { id: 'crispy-box', name: 'بوكس كريسبى', icon: '📦' },
  { id: 'extras', name: 'إضافات', icon: '➕' },
];



export const MENU_ITEMS: MenuItem[] = [
  // حواوشي (العنصر الأول: أعلى اليسار)
  {
    id: 'h-1',
    name: 'حواوشي لحمة ساده',
    category: 'hawaoshi',
    description: 'لحمة مفرومة طازجة بتوابل الكشك الأصلية في عيش بلدي مقرمش',
    price: 75,
    image: '/images/hawawshi.png',
    popular: true
  },
  {
    id: 'h-2',
    name: 'حواوشي لحمة دبل',
    category: 'hawaoshi',
    description: 'دبل لحمة مفرومة طازجة لمتعة مضاعفة في عيش بلدي',
    price: 90,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-3',
    name: 'حواوشي لحمة شيدر',
    category: 'hawaoshi',
    description: 'لحمة مفرومة مع طبقة غنية من جبنة الشيدر السائحة',
    price: 90,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-4',
    name: 'حواوشي لحمة موتزاريلا',
    category: 'hawaoshi',
    description: 'لحمة طازجة مغطاة بجبنة الموتزاريلا المطاطية السائحة',
    price: 90,
    image: '/images/hawawshi.png',
    popular: true
  },
  {
    id: 'h-5',
    name: 'حواوشي لحمة بيج تيستي',
    category: 'hawaoshi',
    description: 'مع صوص بيج تيستي المميز الخاص بالمطعم واللحم الطازج',
    price: 90,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-6',
    name: 'حواوشي بسطرمة شيدر',
    category: 'hawaoshi',
    description: 'بسطرمة أصلية مع جبنة شيدر غنية ومحمرة',
    price: 125,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-7',
    name: 'حواوشي لحمة رومي موتزاريلا',
    category: 'hawaoshi',
    description: 'مزيج فاخر من اللحمة والجبنة الرومي والموتزاريلا',
    price: 120,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-8',
    name: 'حواوشي سلامي موتزاريلا',
    category: 'hawaoshi',
    description: 'سلامي مدخن مع جبنة موتزاريلا سايحة',
    price: 125,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-9',
    name: 'حواوشي ميكس لحوم',
    category: 'hawaoshi',
    description: 'تشكيلة مميزة من ألذ اللحوم المدخنة والمفرومة والجبن',
    price: 130,
    image: '/images/hawawshi.png',
    badge: 'الأكثر طلباً'
  },
  {
    id: 'h-10',
    name: 'حواوشي سجق ساده',
    category: 'hawaoshi',
    description: 'سجق بلدي شرقي بخلطة التوابل الحارة في عيش بلدي',
    price: 80,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-11',
    name: 'حواوشي سجق دبل',
    category: 'hawaoshi',
    description: 'دبل سجق بلدي مشوي ومتبل بإتقان',
    price: 100,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-12',
    name: 'حواوشي سجق شيدر',
    category: 'hawaoshi',
    description: 'سجق بلدي مع جبنة شيدر مذابة',
    price: 95,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-13',
    name: 'حواوشي سجق موتزاريلا',
    category: 'hawaoshi',
    description: 'سجق شرقي مع جبنة موتزاريلا مطاطية',
    price: 95,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-14',
    name: 'حواوشي سجق ماشروم',
    category: 'hawaoshi',
    description: 'سجق بلدي مع قطع الماشروم الطازج',
    price: 95,
    image: '/images/hawawshi.png'
  },
  {
    id: 'h-15',
    name: 'حواوشي سجق بيج تيستي',
    category: 'hawaoshi',
    description: 'سجق مع صوص بيج تيستي المميز',
    price: 90,
    image: '/images/hawawshi.png'
  },

  // برجر فراخ (العنصر الثاني: وسط أعلى)
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
    popular: true
  },
  {
    id: 'cb-2',
    name: 'تشيكن رانش',
    category: 'chicken-burger',
    description: 'صدر دجاج مقرمش مع صوص الرانش الغني وجبنة الشيدر',
    prices: [
      { sizeOrType: 'سينجل', price: 85 },
      { sizeOrType: 'دبل', price: 120 }
    ],
    image: '/images/chicken_burger.png'
  },
  {
    id: 'cb-3',
    name: 'تشيكن هالوبينو',
    category: 'chicken-burger',
    description: 'دجاج كرسبي مع فلفل هالوبينو حار وصوص صب آيلاند',
    prices: [
      { sizeOrType: 'سينجل', price: 90 },
      { sizeOrType: 'دبل', price: 130 }
    ],
    image: '/images/chicken_burger.png'
  },
  {
    id: 'cb-4',
    name: 'تشيكن سموك',
    category: 'chicken-burger',
    description: 'دجاج كرسبي مع صوص باربكيو مدخن وشرائح بيبي بيف مدخن',
    prices: [
      { sizeOrType: 'سينجل', price: 115 },
      { sizeOrType: 'دبل', price: 145 }
    ],
    image: '/images/chicken_burger.png',
    badge: 'مميز'
  },
  {
    id: 'cb-5',
    name: 'تشيكن ماشروم',
    category: 'chicken-burger',
    description: 'دجاج كرسبي مع صوص الماشروم الكريمي الفاخر',
    prices: [
      { sizeOrType: 'سينجل', price: 115 },
      { sizeOrType: 'دبل', price: 155 }
    ],
    image: '/images/chicken_burger.png'
  },
  {
    id: 'cb-6',
    name: 'بيج ستيكس',
    category: 'chicken-burger',
    description: 'دجاج كرسبي ضخم مع موتزاريلا استيكس وصوصات خاصة',
    prices: [
      { sizeOrType: 'سينجل', price: 130 },
      { sizeOrType: 'دبل', price: 170 }
    ],
    image: '/images/chicken_burger.png'
  },
  {
    id: 'cb-7',
    name: 'تشيكن زينجر',
    category: 'chicken-burger',
    description: 'تتبيلة زينجر الحارة المقرمشة مع خس وصوص حار',
    prices: [
      { sizeOrType: 'سينجل', price: 90 },
      { sizeOrType: 'دبل', price: 140 }
    ],
    image: '/images/chicken_burger.png'
  },
  {
    id: 'cb-8',
    name: 'تشيكن سبيشيال',
    category: 'chicken-burger',
    description: 'وصفة الكشك الخاصة للدجاج المقرمش مع الجبن المضاعف',
    prices: [
      { sizeOrType: 'سينجل', price: 100 },
      { sizeOrType: 'دبل', price: 150 }
    ],
    image: '/images/chicken_burger.png',
    popular: true
  },

  // تشيكن سماش (العنصر الثالث: أعلى اليمين)
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
    popular: true
  },
  {
    id: 'sb-2',
    name: 'سماش تيستي',
    category: 'smash-burger',
    description: 'لحم سماش مع صوص بيج تيستي وجبنة شيدر غنية',
    prices: [
      { sizeOrType: 'سينجل', price: 110 },
      { sizeOrType: 'دبل', price: 140 },
      { sizeOrType: 'تربييل', price: 175 }
    ],
    image: '/images/smash_beef.png'
  },
  {
    id: 'sb-3',
    name: 'سماش ماشروم',
    category: 'smash-burger',
    description: 'لحم سماش مع قطع الماشروم الطازج وصوص الكريمة والجبن',
    prices: [
      { sizeOrType: 'سينجل', price: 110 },
      { sizeOrType: 'دبل', price: 145 },
      { sizeOrType: 'تربييل', price: 185 }
    ],
    image: '/images/smash_beef.png'
  },
  {
    id: 'sb-4',
    name: 'سماش سبيشيال',
    category: 'smash-burger',
    description: 'خلطة الكشك الخاصة للحم السماشي مع الإضافات الفاخرة',
    prices: [
      { sizeOrType: 'سينجل', price: 115 },
      { sizeOrType: 'دبل', price: 160 },
      { sizeOrType: 'تربييل', price: 195 }
    ],
    image: '/images/smash_beef.png',
    badge: 'الأكثر طلباً'
  },
  {
    id: 'sb-5',
    name: 'سماش هالوبينو',
    category: 'smash-burger',
    description: 'لحم سماش مع شرائح الهالوبينو الحارة وصوص الجبن الحار',
    prices: [
      { sizeOrType: 'سينجل', price: 100 },
      { sizeOrType: 'دبل', price: 140 },
      { sizeOrType: 'تربييل', price: 180 }
    ],
    image: '/images/smash_beef.png'
  },
  {
    id: 'sb-6',
    name: 'تشيز برجر',
    category: 'smash-burger',
    description: 'كلاسيك تشيز برجر بجبنة شيدر مزدوجة ولحم طازج',
    prices: [
      { sizeOrType: 'سينجل', price: 105 },
      { sizeOrType: 'دبل', price: 145 },
      { sizeOrType: 'تربييل', price: 185 }
    ],
    image: '/images/smash_beef.png'
  },
  {
    id: 'sb-7',
    name: 'سماش سموك',
    category: 'smash-burger',
    description: 'لحم سماش مع صوص الباربكيو المدخن وجبنة الشيدر',
    prices: [
      { sizeOrType: 'سينجل', price: 105 },
      { sizeOrType: 'دبل', price: 145 },
      { sizeOrType: 'تربييل', price: 185 }
    ],
    image: '/images/smash_beef.png'
  },

  // الوجبات (العنصر الثامن: أسفل اليسار - وجبات المشاوي والتشكيلات)
  {
    id: 'm-1',
    name: 'وجبه كريسي',
    category: 'meals',
    description: 'قطع دجاج كرسبي مقرمشة تقدم مع البطاطس المحمرة والخبز والثومية',
    price: 180,
    image: '/images/meals.png',
    popular: true
  },
  {
    id: 'm-2',
    name: 'وجبه دجاج ميكسيكي',
    category: 'meals',
    description: 'دجاج ميكسيكي بخلطة البهارات الخاصة مع صوص التورتيلا والبطاطس',
    price: 195,
    image: '/images/meals.png'
  },
  {
    id: 'm-3',
    name: 'وجبه شيش طاووق',
    category: 'meals',
    description: 'أسياب شيش طاووق مشوية على الفحم مع خضار وبطاطس',
    price: 200,
    image: '/images/meals.png'
  },
  {
    id: 'm-4',
    name: 'وجبه كفته',
    category: 'meals',
    description: 'أصابع كفته بلدي مشوية بخلطة الكشك السحرية مع أرز أو بطاطس',
    price: 220,
    image: '/images/meals.png'
  },
  {
    id: 'm-5',
    name: 'وجبه ميكس جريل',
    category: 'meals',
    description: 'تشكيلة فاخرة من المشاوي (كفته، شيش طاووق، وقطع دجاج)',
    price: 260,
    image: '/images/meals.png',
    badge: 'فاخر'
  },

  // فرايز (العنصر السادس والتاسع: البطاطس والصوصات)
  {
    id: 'f-1',
    name: 'فرينش فرايز',
    category: 'fries',
    description: 'بطاطس مقرمشة ذهبية اللون',
    price: 35,
    image: '/images/fries.png'
  },
  {
    id: 'f-2',
    name: 'تشيز فرايز',
    category: 'fries',
    description: 'بطاطس مقرمشة مغطاة بصوص الجبن السائح الغني',
    price: 55,
    image: '/images/fries.png',
    popular: true
  },
  {
    id: 'f-3',
    name: 'موسكو فرايز',
    category: 'fries',
    description: 'بطاطس مع خلطة صوصات خاصة وإضافات مميزة',
    price: 100,
    image: '/images/loaded_fries_2.png'
  },
  {
    id: 'f-4',
    name: 'طوكيو فرايز',
    category: 'fries',
    description: 'بطاطس بطابع آسيوي مع صوصات سبايسي ومايونيز ياباني',
    price: 110,
    image: '/images/loaded_fries_2.png'
  },
  {
    id: 'f-5',
    name: 'سموك فرايز',
    category: 'fries',
    description: 'بطاطس مع قطع بيبي بيف مدخن وصوص باربكيو وجبن',
    price: 100,
    image: '/images/loaded_fries_2.png'
  },
  {
    id: 'f-6',
    name: 'فرايز سبيشيال',
    category: 'fries',
    description: 'بطاطس الكشك الخاصة المليئة بالصوصات واللحم المفروم',
    price: 130,
    image: '/images/loaded_fries_2.png',
    badge: 'مميز'
  },
  {
    id: 'f-7',
    name: 'سلامي فرايز',
    category: 'fries',
    description: 'بطاطس مقرمشة مع شرائح السلامي المحمصة وجبن الشيدر',
    price: 100,
    image: '/images/loaded_fries_2.png'
  },

  // بوكس كريسبى (العنصر الخامس: يمين الوسط)
  {
    id: 'cbx-1',
    name: 'بوكس 2 قطعه',
    category: 'crispy-box',
    description: '2 قطعه كرسبي + 250 جرام بطاطس + صوص جبنه + 1 قطعه كيزر',
    price: 180,
    image: '/images/fries.png',
    popular: true
  },
  {
    id: 'cbx-2',
    name: 'بوكس 4 قطعه',
    category: 'crispy-box',
    description: '4 قطعه كرسبي + 400 جرام بطاطس + 2 صوص جبنه + 2 قطعه كيزر',
    price: 320,
    image: '/images/piece_box.png'
  },
  {
    id: 'cbx-3',
    name: 'بوكس 8 قطعه فاميلي',
    category: 'crispy-box',
    description: '8 قطعه كرسبي + 750 جرام بطاطس + 4 صوص مشكل + 4 قطعه كيزر',
    price: 550,
    image: '/images/piece_box.png',
    badge: 'عائلي كبير'
  },

  // إضافات
  {
    id: 'ex-1',
    name: 'إضافات صوص (صوص جبنه - رانش - كوكتيل - تيكساس)',
    category: 'extras',
    description: 'اختيارك من ألذ الصوصات الخاصة',
    price: 20,
    image: DISHES_IMG
  },
  {
    id: 'ex-2',
    name: 'إضافات كايزر (القطعه)',
    category: 'extras',
    description: 'قطعة خبز كيزر طازجة وطرية',
    price: 10,
    image: DISHES_IMG
  },
  {
    id: 'ex-3',
    name: 'إضافات هالوبينو (القطعه)',
    category: 'extras',
    description: 'شرائح فلفل هالوبينو حار منعش',
    price: 20,
    image: DISHES_IMG
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
