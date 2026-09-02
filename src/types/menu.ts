export interface MenuItem {
  id: number;
  name: string;
  nameAr: string;
  desc: string;
  descAr: string;
  price: number;
  badge?: "Popular" | "New";
  photo: string;
  category: string;
  available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameAr: string;
  emoji: string;
}

export interface CartItem {
  item: MenuItem;
  qty: number;
  notes: string;
}
