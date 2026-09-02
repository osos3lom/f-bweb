"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, CartItem } from "@/types/menu";
import { translations, TranslationKey, Lang } from "@/i18n/translations";

export type { Lang } from "@/i18n/translations";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, qty?: number, notes?: string) => void;
  updateQty: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  ar: boolean;
  dir: "rtl" | "ltr";
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const LangContext = createContext<LangContextType | undefined>(undefined);

const STORAGE_KEY = "bitrina_app_lang";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Default initial state to Arabic ("ar") as primary default language
  const [lang, setLangState] = useState<Lang>("ar");

  // Load language preference from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && (saved === "en" || saved === "ar")) {
        setLangState(saved);
      }
    } catch {
      // Ignore storage errors in SSR or restricted environments
    }
  }, []);

  // Synchronize document root direction (rtl / ltr) and lang attribute dynamically
  useEffect(() => {
    const isRtl = lang === "ar";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const addToCart = (item: MenuItem, qty = 1, notes = "") => {
    setCart((prev) => {
      const exists = prev.find((c) => c.item.id === item.id);
      if (exists) {
        return prev.map((c) =>
          c.item.id === item.id
            ? { ...c, qty: c.qty + qty, notes: notes || c.notes }
            : c
        );
      }
      return [...prev, { item, qty, notes }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((c) => c.item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleLang = () => {
    setLangState((prev) => {
      const next: Lang = prev === "ar" ? "en" : "ar";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore storage errors
    }
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const langDict = translations[lang] || translations.ar;
    let val = langDict[key] || translations.ar[key] || key;
    if (params) {
      Object.entries(params).forEach(([pKey, pVal]) => {
        val = val.replace(new RegExp(`{${pKey}}`, "g"), String(pVal));
      });
    }
    return val;
  };

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const cartTotal = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);

  return (
    <LangContext.Provider
      value={{
        lang,
        toggleLang,
        setLang,
        ar: lang === "ar",
        dir: lang === "ar" ? "rtl" : "ltr",
        t,
      }}
    >
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          updateQty,
          removeItem,
          clearCart,
          cartCount,
          cartTotal,
        }}
      >
        {children}
      </CartContext.Provider>
    </LangContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within an AppProvider");
  }
  return context;
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within an AppProvider");
  }
  return context;
}
