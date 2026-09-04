import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path?: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath;
  }
  return `${basePath}${cleanPath}`;
}

export function getImageUrl(photoId: string, w = 400, h = 300): string {
  if (!photoId) return "";
  if (photoId.startsWith("/")) {
    const isMenuOrBrand = photoId.startsWith("/menu-images/") || photoId.startsWith("/brand/");
    if (isMenuOrBrand) {
      // Strip any existing extension (.jpg, .png, .webp) and _thumb suffix
      const cleanPath = photoId.replace(/\.(jpe?g|png|webp)$/i, "").replace(/_thumb$/, "");
      if (w <= 360) {
        return getAssetPath(`${cleanPath}_thumb.webp`);
      }
      return getAssetPath(`${cleanPath}.webp`);
    }
    return getAssetPath(photoId);
  }
  return `https://images.unsplash.com/${photoId}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

export function isDrinkCategory(category: string): boolean {
  return category === "juices" || category === "drinks";
}
