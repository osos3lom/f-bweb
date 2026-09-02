"use client";

import React, { createContext, useContext, useState } from "react";
import { MenuItem, MenuCategory } from "@/types/menu";
import { MENU } from "@/data/menu";
import { CATEGORIES } from "@/data/categories";
import { MOCK_ORDERS, Order } from "@/data/mock-orders";

interface DashboardContextType {
  menuItems: MenuItem[];
  categories: MenuCategory[];
  orders: Order[];
  createMenuItem: (data: Omit<MenuItem, "id">) => MenuItem;
  updateMenuItem: (id: number, data: Partial<MenuItem>) => void;
  deleteMenuItem: (id: number) => void;
  toggleAvailability: (id: number) => void;
  createCategory: (data: Omit<MenuCategory, "id">) => void;
  updateCategory: (id: string, data: Partial<MenuCategory>) => void;
  deleteCategory: (id: string) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU);
  const [categories, setCategories] = useState<MenuCategory[]>(CATEGORIES);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const createMenuItem = (data: Omit<MenuItem, "id">): MenuItem => {
    const newId = Math.max(0, ...menuItems.map((m) => m.id)) + 1;
    const newItem: MenuItem = { ...data, id: newId };
    setMenuItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateMenuItem = (id: number, data: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleAvailability = (id: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const createCategory = (data: Omit<MenuCategory, "id">) => {
    const id = data.name.toLowerCase().replace(/\s+/g, "-");
    setCategories((prev) => [...prev, { ...data, id }]);
  };

  const updateCategory = (id: string, data: Partial<MenuCategory>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...data } : cat))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status } : ord))
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        menuItems,
        categories,
        orders,
        createMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleAvailability,
        createCategory,
        updateCategory,
        deleteCategory,
        updateOrderStatus,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
