import React from "react";

export function Badge({ type }: { type: "Popular" | "New" }) {
  return (
    <span
      className={`font-poppins text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
        type === "Popular"
          ? "gradient-amber-gold text-[#3B2319] shadow-xs"
          : "gradient-espresso-lounge text-white shadow-xs"
      }`}
    >
      {type === "Popular" ? "★ Popular" : "✦ New"}
    </span>
  );
}
