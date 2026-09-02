"use client";

import React from "react";
import { Logo } from "@/components/layout/logo";
import { useLang } from "@/providers/app-provider";
import { getAssetPath } from "@/lib/utils";

export function HeroSection() {
  const { toggleLang, t } = useLang();

  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between bg-[#1C120D]">
      {/* Clean Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-100 opacity-100"
      >
        <source src={getAssetPath("/brand/hero-bg.mp4")} type="video/mp4" />
      </video>

      {/* Subtle top gradient for header legibility */}
      <div
        className="absolute inset-x-0 top-0 h-32 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Subtle bottom gradient for text & CTAs legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-72 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(28,18,13,0.85) 0%, rgba(28,18,13,0.3) 60%, transparent 100%)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-8">
        <Logo light />
        <button
          onClick={toggleLang}
          className="font-poppins text-[11px] font-semibold px-3.5 py-1.5 rounded-full text-white border border-[#D4A359]/40 transition-all active:scale-95 shadow-xs"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(10px)" }}
        >
          {t("nav.lang_toggle")}
        </button>
      </div>

      {/* Centered Cover / Logo Emblem */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-12 text-center">
        <div className="max-w-[280px] w-full transition-transform hover:scale-105">
          <img
            src={getAssetPath("/brand/logo.png")}
            alt="قهوة بترينا - Bitrina Logo"
            className="w-full h-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>
    </section>
  );
}
