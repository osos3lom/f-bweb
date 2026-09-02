import React from "react";
import { MenuItem, MenuCategory } from "@/types/menu";
import { Lang } from "@/i18n/translations";
import { SarIcon } from "@/components/icons/sar-icon";

/**
 * Returns localized name for a menu item (defaults to Arabic name in 'ar' mode).
 */
export function getItemName(item: MenuItem, lang: Lang): string {
  if (lang === "ar") {
    return item.nameAr || item.name;
  }
  return item.name || item.nameAr;
}

/**
 * Returns localized description for a menu item.
 */
export function getItemDesc(item: MenuItem, lang: Lang): string {
  if (lang === "ar") {
    return item.descAr || item.desc;
  }
  return item.desc || item.descAr;
}

/**
 * Returns localized name for a category.
 */
export function getCategoryName(category: MenuCategory, lang: Lang): string {
  if (lang === "ar") {
    return category.nameAr || category.name;
  }
  return category.name || category.nameAr;
}

/**
 * Formats currency amount in SAR using the official SAR symbol icon.
 */
export function formatCurrency(amount: number, lang: Lang = "ar"): React.ReactNode {
  const num = lang === "ar" ? Math.round(amount * 3.75) : Math.round(amount * 3.75);

  return (
    <span className="inline-flex items-baseline gap-1">
      <span>{num}</span>
      <SarIcon size="0.85em" className="self-center" />
    </span>
  );
}
