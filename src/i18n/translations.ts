export type Lang = "ar" | "en";

export const translations = {
  ar: {
    // Navigation & App Shell
    "nav.home": "الرئيسية",
    "nav.menu": "المنيو",
    "nav.offers": "العروض",
    "nav.about": "من نحن",
    "nav.contact": "تواصل معنا",
    "nav.dashboard": "لوحة التحكم",
    "nav.order": "الطلب",
    "nav.info": "عن بترينا",
    "nav.lang_toggle": "EN",

    // Hero & Home Section
    "hero.tagline": "قهوة مختصة ولاونج",
    "hero.title": "أناقة الضيافة والمذاق",
    "hero.subtitle": "استمتع بتجربة قهوة بترينا المختصة، المأكولات والحلويات في قلب جدة",
    "hero.explore_menu": "المنيو",
    "hero.cta_menu": "المنيو",
    "hero.cta_offers": "العروض",
    "hero.location": "حي الزهراء، جدة",
    "hero.open_now": "مفتوح الآن",
    "hero.lounge_type": "جلسات كافيه ولاونج",

    // Showcase & Vitrine
    "showcase.title": "قائمة طعام وحلويات بترينا",
    "showcase.subtitle": "تصفح القائمة المختارة",
    "showcase.search_placeholder": "ابحث عن مشروبك أو طبقك المفضّل…",
    "showcase.popular": "الأكثر طلباً والعروض المميزة",
    "showcase.see_all": "عرض الكل",
    "showcase.tap_for_options": "تفاصيل الطلب",

    // Story & Info
    "about.title": "قصة بترينا",
    "about.heading": "تَعى خَبرك عَن بيتّرينا",
    "about.p1": "بيترّينا هي بذاتها خزانة ستي وستّك، يلي كان ممنوع حدا يدقرها، لإن عقولتهم: (فيها أشياء ثمينة)، بخافوا تنكسر",
    "about.p2": "لهيك اليوم، أنا وأنت صار عنا بيترّينا خاصة فينا، مليانة أشياء ثمينة، إيه وما بتنكسر\nبس مثل شو؟",
    "info.opening_hours": "ساعات العمل",
    "info.daily_hours": "مفتوح يومياً: 7:00 صباحاً – 1:00 صباحاً",
    "info.location_title": "الموقع",
    "info.location_address": "شارع خليل بيك العجان، حي الزهراء، جدة، المملكة العربية السعودية",
    "info.call_us": "اتصل ببترينا",

    // Cart & Order
    "cart.title": "طلبك الحالي",
    "cart.empty": "قائمة الطلب فارغة",
    "cart.total": "المجموع الكلي",
    "cart.checkout": "تأكيد وإرسال الطلب",
    "cart.order_sent": "تم إرسال طلبك!",
    "cart.thank_you": "سيصلك طلبك قريباً. شكراً لزيارتك بترينا كافيه ولاونج.",
    "cart.new_order": "طلب جديد",
    "cart.notes": "تعليمات خاصة (اختياري)",
    "cart.qty": "الكمية",
    "cart.add": "أضف للطلب",

    // Dashboard
    "dashboard.title": "لوحة تحكم بترينا",
    "dashboard.welcome": "أهلاً بك مجدداً! ملخص نشاط بترينا كافيه ولاونج اليوم.",
    "dashboard.add_item": "إضافة صنف جديد",
    "dashboard.revenue": "إجمالي المبيعات",
    "dashboard.items": "عدد الأصناف",
    "dashboard.categories": "التصنيفات",

    // Common Buttons & Labels
    "common.popular": "★ شائع",
    "common.new": "✦ جديد",
    "common.close": "إغلاق",
    "common.back": "رجوع",
  },
  en: {
    // Navigation & App Shell
    "nav.home": "Home",
    "nav.menu": "Menu",
    "nav.offers": "Offers",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.dashboard": "Dashboard",
    "nav.order": "Order",
    "nav.info": "About",
    "nav.lang_toggle": "عربي",

    // Hero & Home Section
    "hero.tagline": " Coffee & Lounge",
    "hero.title": "Artisanal Coffee & Dining",
    "hero.subtitle": "Experience Bitrina’s signature roasted coffee, artisanal vitrine pastries & luxury lounge dining in Jeddah",
    "hero.explore_menu": "Menu",
    "hero.cta_menu": "Menu",
    "hero.cta_offers": "Offers",
    "hero.location": "Al Zahra, Jeddah, KSA",
    "hero.open_now": "Open Now",
    "hero.lounge_type": "Café & Dining Lounge",

    // Showcase & Vitrine
    "showcase.title": "Bitrina Showcase Menu",
    "showcase.subtitle": "Curated Selection",
    "showcase.search_placeholder": "Search coffee, dishes or desserts…",
    "showcase.popular": "Popular & Special Offers",
    "showcase.see_all": "See all",
    "showcase.tap_for_options": "Tap for options",

    // Story & Info
    "about.title": "The Story of Bitrina",
    "about.heading": "Inspired by the Elegance of the Vitrine Showcase",
    "about.p1": "The name Bitrina stems from the artisanal 'Vitrine' glass display showcase—curating  coffee beans, exquisite pastries, and gourmet lounge meals with transparent elegance.",
    "about.p2": "Located in Al Zahra, Jeddah, Bitrina brings together coffee connoisseurs, food lovers, and lounge guests in a warm, sophisticated ambience.",
    "info.opening_hours": "Opening Hours",
    "info.daily_hours": "Open daily: 7:00 AM – 1:00 AM",
    "info.location_title": "Location",
    "info.location_address": "Khalil Beg Al Ajan St, Al Zahra, Jeddah, Saudi Arabia",
    "info.call_us": "Call Us",

    // Cart & Order
    "cart.title": "Your Order",
    "cart.empty": "Your order is empty",
    "cart.total": "Total",
    "cart.checkout": "Place Order",
    "cart.order_sent": "Order Sent!",
    "cart.thank_you": "Your order is being prepared. Thank you for visiting Bitrina Café & Lounge!",
    "cart.new_order": "New Order",
    "cart.notes": "Special instructions (optional)",
    "cart.qty": "Quantity",
    "cart.add": "Add to Order",

    // Dashboard
    "dashboard.title": "Bitrina Dashboard Overview",
    "dashboard.welcome": "Welcome back! Here is what's happening at Bitrina Café & Lounge today.",
    "dashboard.add_item": "Add Menu Item",
    "dashboard.revenue": "Total Revenue",
    "dashboard.items": "Menu Items",
    "dashboard.categories": "Categories",

    // Common Buttons & Labels
    "common.popular": "★ Popular",
    "common.new": "✦ New",
    "common.close": "Close",
    "common.back": "Back",
  },
};

export type TranslationKey = keyof typeof translations.ar;
