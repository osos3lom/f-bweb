import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(photoId: string, w = 400, h = 300): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (photoId.startsWith("/menu-images/")) {
    return `${basePath}${photoId}`;
  }
  return `https://images.unsplash.com/${photoId}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

export function isDrinkCategory(category: string): boolean {
  return category === "juices" || category === "drinks";
}
