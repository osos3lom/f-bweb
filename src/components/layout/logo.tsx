import React from "react";
import { getAssetPath } from "@/lib/utils";

export function BitrinaIcon({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={getAssetPath("/brand/logo_thumb.webp")}
      alt="قهوة بترينا - Bitrina Logo"
      width={size}
      height={size}
      decoding="async"
      // @ts-ignore
      fetchpriority="high"
      className={`object-contain ${className}`}
    />
  );
}

export function Logo({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className="flex items-center justify-center rounded-2xl p-1.5 shrink-0 border border-white/20 transition-transform duration-300 hover:scale-105 bg-white/95 shadow-md"
        style={{ width: compact ? 42 : 52, height: compact ? 42 : 52 }}
      >
        <img
          src={getAssetPath("/brand/logo_thumb.webp")}
          alt="قهوة بترينا - Bitrina"
          decoding="async"
          // @ts-ignore
          fetchpriority="high"
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <div
          className={`font-playfair font-bold leading-none tracking-wide ${
            light ? "text-white" : "text-[#2B1D16]"
          }`}
          style={{ fontSize: compact ? 17 : 21 }}
        >
          Bitrina{" "}
          <span className="font-cairo font-extrabold text-[#D4A359]" style={{ fontSize: compact ? 16 : 19 }}>
            | قهوة بترينا
          </span>
        </div>
        {!compact && (
          <div
            className={`font-poppins text-[10px] font-semibold tracking-widest uppercase mt-1 ${
              light ? "text-white/75" : "text-[#8C6D58]"
            }`}
          >
             Coffee & Lounge
          </div>
        )}
      </div>
    </div>
  );
}
