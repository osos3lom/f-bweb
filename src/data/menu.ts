import { MenuItem } from "@/types/menu";

export const MENU: MenuItem[] = [
  // Specialty Coffee
  { id: 101, name: "Bitrina Signature Latte", nameAr: "لاتيه بترينا التوقيع", desc: "Espresso with steamed oat milk, vanilla & amber honey dust", descAr: "إسبريسو مع حليب الشوفان ورغوة العسل الذهبي", price: 6.50, badge: "Popular", photo: "photo-1541167760496-1628856ab772", category: "coffee", available: true },
  { id: 102, name: "Spanish Latte (Hot/Iced)", nameAr: "سبانيش لاتيه", desc: "Rich espresso blended with sweetened condensed milk", descAr: "إسبريسو غني مع الحليب المحلى المكثف", price: 6.00, badge: "Popular", photo: "photo-1517701604599-bb29b565090c", category: "coffee", available: true },
  { id: 103, name: "Flat White", nameAr: "فلات وايت", desc: "Double shot ristretto topped with silky micro-foam", descAr: "جرعة مضاعفة ريستريتو مع رغوة مخملية", price: 5.50, photo: "photo-1577968897966-3d4325b36b61", category: "coffee", available: true },
  { id: 104, name: "V60 Drip Coffee", nameAr: "قهوة مقطرة V60", desc: "Single origin Ethiopian Yirgacheffe beans filtered to perfection", descAr: "حبوب بن إثيوبية فاخرة مقطرة بعناية", price: 7.00, badge: "New", photo: "photo-1495474472287-4d71bcdd2085", category: "coffee", available: true },
  { id: 105, name: "Cortado", nameAr: "كورتادو", desc: "Equal parts espresso & warm textured milk", descAr: "إسبريسو متوازن مع حليب دافئ", price: 5.00, photo: "photo-1534778101976-62847782c213", category: "coffee", available: true },
  { id: 106, name: "Iced Pistachio Latte", nameAr: "أيس بستاشيو لاتيه", desc: "Espresso over chilled milk & roasted pistachio cream", descAr: "إسبريسو مثلج مع كريمة الفستق الحلبي المحمص", price: 7.50, badge: "Popular", photo: "photo-1553909489-cd47e0907980", category: "coffee", available: true },

  // Tarwiqa Breakfast
  { id: 107, name: "Tarwiqa Share Platter", nameAr: "ترويقة بترينا لشخصين", desc: "Eggs, labneh with roasted garlic, foul moudammas, falafel & fresh bread", descAr: "فول، لبنة بالثوم، بيض، فلافل، زيتون ومناقيش طازجة", price: 18.00, badge: "Popular", photo: "photo-1533089860892-a7c6f0a88666", category: "tarwiqa", available: true },
  { id: 108, name: "Brioche Egg Roll", nameAr: "برويش ايلغ رول", desc: "Fluffy scrambled eggs, melted cheddar & sriracha mayo on toasted brioche", descAr: "بيض مخفوق مع جبنة شيدر وصوص سريراشا في خبز بريوش", price: 8.50, badge: "Popular", photo: "photo-1525351484163-7529414344d8", category: "tarwiqa", available: true },
  { id: 109, name: "Avocado Sourdough Toast", nameAr: "توست أفوكادو بالساوردو", desc: "Smashed avocado, poached eggs, feta & zaatar oil", descAr: "أفوكادو مهروس مع بيض مسبوك وجبنة فيتا وزيت الزعتر", price: 9.50, badge: "New", photo: "photo-1588137378633-dea1336ce1e2", category: "tarwiqa", available: true },

  // Cold Mezze
  { id: 1, name: "Hummus Vitrine", nameAr: "حمص البترينا", desc: "Creamy chickpea dip with extra virgin olive oil & roasted pine nuts", descAr: "حمص كريمي مع زيت الزيتون الصافي والصنوبر المحمص", price: 4.50, badge: "Popular", photo: "/menu-images/hummus.jpg", category: "cold-mezze", available: true },
  { id: 2, name: "Moutabbal", nameAr: "متبل باذنجان", desc: "Smoky eggplant dip with tahini & ruby pomegranate seeds", descAr: "باذنجان مدخن مع طحينية وحبات الرمان", price: 4.50, photo: "/menu-images/moutabbal.jpg", category: "cold-mezze", available: true },
  { id: 5, name: "Stuffed Vine Leaves", nameAr: "ورق عنب بالزيت", desc: "Grape leaves stuffed with rice, herbs & pomegranate molasses", descAr: "ورق عنب محشو بالأرز والأعشاب ودبس الرمان", price: 5.50, badge: "Popular", photo: "/menu-images/vine-leaves.jpg", category: "cold-mezze", available: true },

  // Hot Mezze
  { id: 8, name: "Batata Harra (Spicy Potatoes)", nameAr: "بطاطا حارة بالكزبرة", desc: "Crispy potato cubes tossed with garlic, coriander & chili paste", descAr: "مكعبات بطاطا مقرمشة مع الثوم والكزبرة والفلفل الحار", price: 5.00, badge: "Popular", photo: "/menu-images/spicy-potatoes.jpg", category: "hot-mezze", available: true },
  { id: 9, name: "Akawi Cheese Rolls", nameAr: "رقاقات جبنة عكاوي", desc: "Crispy golden rolls filled with melted Akawi & mozzarella", descAr: "رقاق مقرمش محشو بجبنة عكاوي وموزاريلا ذائبة", price: 5.50, photo: "/menu-images/cheese-rolls.jpg", category: "hot-mezze", available: true },

  // Fresh Salads
  { id: 13, name: "Bitrina Fattoush", nameAr: "فتوش البترينا", desc: "Crisp greens, pomegranate, sumac dressing & seasoned pita chips", descAr: "خضار طازجة مع حبات الرمان وسماق وخبز محمص", price: 6.00, badge: "Popular", photo: "/menu-images/fattoush.jpg", category: "salads", available: true },
  { id: 14, name: "Traditional Tabbouleh", nameAr: "تبولة لبنانية", desc: "Hand-chopped parsley, mint, tomatoes & extra virgin olive oil", descAr: "بقدونس مفروم طازج مع نعنع وطماطم وزيت زيتون", price: 6.00, photo: "/menu-images/tabbouleh.jpg", category: "salads", available: true },

  // Vitrine Mana'eesh
  { id: 17, name: "Zaatar & Olive Oil Manakish", nameAr: "منقوشة زعتر بري", desc: "Wild thyme & extra virgin olive oil on stone-baked flatbread", descAr: "زعتر بري وزيت زيتون على عجينة المحبز الحجري", price: 3.50, badge: "Popular", photo: "/menu-images/zaatar-mini.jpg", category: "manakish", available: true },
  { id: 18, name: "Four Cheese Manakish", nameAr: "منقوشة أجبان أربعة", desc: "Blend of Akawi, Kashkaval, Mozzarella & Halloumi", descAr: "مزج أربعة أنواع أجبان فاخرة ذائبة", price: 5.50, photo: "/menu-images/cheese-mini.jpg", category: "manakish", available: true },

  // Artisanal Sandwiches
  { id: 22, name: "Chicken Shawarma Brioche", nameAr: "شاورما دجاج بريوش", desc: "Slow-roasted chicken, garlic toum & wild pickles in toasted brioche", descAr: "شاورما دجاج مشوية مع ثومية ومخلل في خبز بريوش", price: 7.00, badge: "Popular", photo: "/menu-images/chicken-shawarma.jpg", category: "sandwiches", available: true },

  // Oriental Grills & Mains
  { id: 38, name: "Bitrina Royal Mixed Grill", nameAr: "مشاوي بترينا الملكية", desc: "Skewers of Shish Tawouk, Lamb Kafta, Tenderloin Beef & Lamb Chops", descAr: "مشاوي مشكلة من أسياخ كفتة، طاووق، أوصال لحم وريش ضأن", price: 24.00, badge: "Popular", photo: "/menu-images/mixed-grill-plate.jpg", category: "grills", available: true },
  { id: 36, name: "Shish Tawouk Platter", nameAr: "طبق شيش طاووق", desc: "Marinated chicken breast cubes grilled over charcoal with garlic paste & saffron rice", descAr: "مكعبات صدر دجاج متبل مشوي على الفحم مع ثومية وأرز", price: 15.00, photo: "/menu-images/shish-tawouk-plate.jpg", category: "grills", available: true },

  // Vitrine Desserts
  { id: 49, name: "Warm Knefeh Bitrina", nameAr: "كنافة نابلسية بالقطر", desc: "Melted cheese knefeh with orange blossom syrup & crushed pistachios", descAr: "كنافة دافئة بالجبن الذائب مع قطر ماء الزهر والفستق", price: 7.00, badge: "Popular", photo: "/menu-images/knefeh.jpg", category: "desserts", available: true },
  { id: 50, name: "French Toast & Salted Caramel", nameAr: "فرنش توست بالكراميل", desc: "Thick brioche soaked in vanilla custard with salted caramel & ice cream", descAr: "فرنش توست بريوش غني بالكراميل المملح والآيس كريم", price: 8.50, badge: "New", photo: "photo-1484723091479-0097771360da", category: "desserts", available: true },

  // Fresh Juices & Mocktails
  { id: 55, name: "Lemon Mint Sparkler", nameAr: "ليموناضة بالنعناع المنعش", desc: "Fresh lemon juice crushed with peppermint leaves & sparkling water", descAr: "ليمون طازج مع نعناع بري ومياه فوارة", price: 4.50, badge: "Popular", photo: "/menu-images/mintedlemonade.jpg", category: "juices", available: true },
  { id: 58, name: "Bitrina Tropical Mocktail", nameAr: "موكتيل بترينا الاستوائي", desc: "Blend of passion fruit, fresh mango, lime & crushed ice", descAr: "مزيج فواكه استوائية مع باشن فروت ومانجو طازج", price: 6.00, photo: "/menu-images/cocktailjuice.jpg", category: "juices", available: true },
];
