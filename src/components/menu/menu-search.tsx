"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { useLang } from "@/providers/app-provider";

export function MenuSearch({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) {
  const { t } = useLang();

  return (
    <div
      className="flex items-center gap-2 px-3.5 py-3 rounded-full bg-white border border-[#E8DFC5] shadow-xs"
    >
      <Search size={15} className="text-[#9E8675] shrink-0" />
      <input
        className="flex-1 bg-transparent font-poppins text-sm text-[#2B1D16] placeholder-[#9E8675] outline-none"
        placeholder={t("showcase.search_placeholder")}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {search && (
        <button onClick={() => onSearchChange("")} aria-label="Clear search">
          <X size={13} className="text-[#9E8675]" />
        </button>
      )}
    </div>
  );
}
