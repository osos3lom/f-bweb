"use client";

import React from "react";
import { MapPin, Coffee } from "lucide-react";
import { useLang } from "@/providers/app-provider";

export function InfoChips() {
  const { t } = useLang();

  return (
    <div className="gradient-espresso-lounge flex items-center justify-center gap-4 py-3 px-4 border-y border-[#D4A359]/20">
      <div className="flex items-center gap-1.5 text-white/90">
        <div className="w-2 h-2 rounded-full bg-[#D4A359] animate-pulse" />
        <span className="font-poppins text-xs font-medium">{t("hero.open_now")}</span>
      </div>
      <div className="w-px h-3 bg-white/20" />
      <div className="flex items-center gap-1 text-white/90">
        <MapPin size={11} className="text-[#D4A359]" />
        <span className="font-poppins text-xs">{t("hero.location")}</span>
      </div>
      <div className="w-px h-3 bg-white/20" />
      <div className="flex items-center gap-1 text-white/90">
        <Coffee size={11} className="text-[#D4A359]" />
        <span className="font-poppins text-xs">{t("hero.lounge_type")}</span>
      </div>
    </div>
  );
}
