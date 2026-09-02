export interface Order {
  id: string;
  tableNumber: number;
  customerName?: string;
  items: {
    itemId: number;
    name: string;
    nameAr: string;
    qty: number;
    price: number;
    notes?: string;
  }[];
  total: number;
  status: "New" | "Preparing" | "Ready" | "Completed" | "Cancelled";
  createdAt: string;
  type: "Dine-in" | "Takeaway" | "Phone";
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-101",
    tableNumber: 4,
    items: [
      { itemId: 1, name: "Hummus", nameAr: "حمص", qty: 2, price: 4.0 },
      { itemId: 13, name: "Fattoush", nameAr: "فتوش", qty: 1, price: 5.0 },
      { itemId: 38, name: "Mixed Grill Plate", nameAr: "مشاوي مشكلة", qty: 2, price: 16.0 },
      { itemId: 55, name: "Minted Lemonade", nameAr: "ليموناضة بالنعنع", qty: 3, price: 4.0 },
    ],
    total: 59.0,
    status: "New",
    createdAt: "10 mins ago",
    type: "Dine-in",
  },
  {
    id: "ORD-102",
    tableNumber: 12,
    items: [
      { itemId: 22, name: "Chicken Shawarma", nameAr: "شاورما دجاج", qty: 3, price: 4.0, notes: "Extra garlic" },
      { itemId: 7, name: "French Fries", nameAr: "بطاطا مقلية", qty: 1, price: 3.0 },
      { itemId: 60, name: "Pepsi", nameAr: "بيبسي", qty: 3, price: 2.0 },
    ],
    total: 21.0,
    status: "Preparing",
    createdAt: "18 mins ago",
    type: "Dine-in",
  },
  {
    id: "ORD-103",
    tableNumber: 0,
    customerName: "Ahmad K.",
    items: [
      { itemId: 33, name: "Pepperoni Pizza", nameAr: "بيتزا بيبيروني", qty: 2, price: 10.0 },
      { itemId: 50, name: "Chocolate Fondant", nameAr: "فوندان شوكولاتة", qty: 1, price: 6.0 },
    ],
    total: 26.0,
    status: "Ready",
    createdAt: "25 mins ago",
    type: "Phone",
  },
  {
    id: "ORD-104",
    tableNumber: 8,
    items: [
      { itemId: 44, name: "Seafood Platter", nameAr: "طبق مأكولات بحرية", qty: 1, price: 50.0 },
      { itemId: 15, name: "Rocca Salad", nameAr: "سلطة الجرجير", qty: 1, price: 6.0 },
      { itemId: 62, name: "Sparkling Water", nameAr: "مياه فوارة", qty: 2, price: 2.5 },
    ],
    total: 61.0,
    status: "Completed",
    createdAt: "45 mins ago",
    type: "Dine-in",
  },
  {
    id: "ORD-105",
    tableNumber: 2,
    items: [
      { itemId: 29, name: "Cheese Burger", nameAr: "تشيزبرغر", qty: 2, price: 8.0 },
      { itemId: 8, name: "Spicy Potatoes", nameAr: "بطاطا حارة", qty: 1, price: 4.0 },
      { itemId: 61, name: "7Up", nameAr: "سفن أب", qty: 2, price: 2.0 },
    ],
    total: 24.0,
    status: "Completed",
    createdAt: "1 hour ago",
    type: "Dine-in",
  },
  {
    id: "ORD-106",
    tableNumber: 15,
    items: [
      { itemId: 36, name: "Shish Tawouk Plate", nameAr: "طبق شيش طاووق", qty: 1, price: 10.0 },
      { itemId: 14, name: "Tabbouleh", nameAr: "تبولة", qty: 1, price: 5.5 },
    ],
    total: 15.5,
    status: "Cancelled",
    createdAt: "1.5 hours ago",
    type: "Dine-in",
  },
];
