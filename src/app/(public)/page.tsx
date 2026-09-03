"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles, MapPin, Coffee, UtensilsCrossed } from "lucide-react";
import { useLang } from "@/providers/app-provider";
import { HeroSection } from "@/components/home/hero-section";
import { PopularPicks } from "@/components/home/popular-picks";
import { AboutSectionMobile } from "@/components/home/about-section";
import { DesktopHome } from "@/components/home/desktop-home";

export default function HomePage() {
  const { ar } = useLang();
  const reservationPhone = "0590393906";
  const whatsappUrl = `https://wa.me/966590393906?text=${encodeURIComponent(
    ar
      ? "مرحباً بترينا، أود الاستفسار وحجز طاولة في اللاونج."
      : "Hello Bitrina, I would like to inquire and reserve a lounge table."
  )}`;

  return (
    <>
      {/* Mobile view */}
      <div
        className="md:hidden flex flex-col min-h-full bg-[#FAF6F0] relative overflow-hidden pb-32"
        dir={ar ? "rtl" : "ltr"}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F3E0B5]/30 via-transparent to-transparent pointer-events-none z-0" />

        {/* Hero Section */}
        <HeroSection />

        {/* Main Mobile Content Container */}
        <div className="relative z-10 flex-1 px-5 py-7 flex flex-col gap-5">

          {/* Primary Action Card: View Menu */}
          <Link
            href="/menu"
            className="group relative w-full py-4 px-5 rounded-2xl font-bold text-white text-base flex items-center justify-between transition-all duration-300 active:scale-[0.98] shadow-[0_14px_32px_rgba(28,18,13,0.3)] gradient-espresso-lounge border border-[#D4A359]/50 overflow-hidden"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-[#D4A359]/30 shrink-0">
                <Coffee size={20} className="text-[#D4A359]" />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-sm font-bold text-white tracking-wide">{ar ? "تصفح قائمة الطعام" : "Explore Showcase Menu"}</span>
                <span className="text-[11px] text-white/70 font-normal">{ar ? "حلويات فاخرة · مأكولات · قهوة مختصة" : "Pastries · Gourmet Lounge ·  Coffee"}</span>
              </div>
            </div>

            {/* RTL-Correct Forward Arrow Badge */}
            <div className="w-9 h-9 rounded-full bg-[#D4A359]/20 flex items-center justify-center border border-[#D4A359]/40 shrink-0 relative z-10">
              <ArrowRight size={17} className="text-[#D4A359] rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </div>
          </Link>

          {/* Secondary Action Card: WhatsApp Table Reservation */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full py-4 px-5 rounded-2xl font-bold text-[#3B2319] text-base flex items-center justify-between transition-all duration-300 active:scale-[0.98] shadow-[0_10px_28px_rgba(212,163,89,0.25)] gradient-amber-gold border border-[#B88339]/40"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#3B2319]/10 flex items-center justify-center border border-[#3B2319]/20 shrink-0">
                <MessageSquare size={20} className="text-[#2E5E4E]" />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-sm font-bold text-[#3B2319]">{ar ? "حجز طاولة عبر الواتساب" : "Table Reservation via WhatsApp"}</span>
                <span className="text-[11px] text-[#5C3C2E] font-semibold tracking-wider">{reservationPhone}</span>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#3B2319] text-[#D4A359] shadow-xs">
              {ar ? "احجز الآن" : "Book Now"}
            </span>
          </a>

          {/* Luxury Feature Highlights Strip */}
          <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-white/80 border border-[#E8DFC5] backdrop-blur-xs text-center shadow-xs">
            <div className="flex flex-col items-center gap-1">
              <Sparkles size={15} className="text-[#D4A359]" />
              <span className="text-[10px] font-semibold text-[#3B2319]">{ar ? "جلسات لاونج" : "Luxury Lounge"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-[#E8DFC5]">
              <Coffee size={15} className="text-[#D4A359]" />
              <span className="text-[10px] font-semibold text-[#3B2319]">{ar ? "قهوة مختصة" : " Coffee"}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <UtensilsCrossed size={15} className="text-[#D4A359]" />
              <span className="text-[10px] font-semibold text-[#3B2319]">{ar ? "طبخ شرقي وغربي" : "Gourmet Dining"}</span>
            </div>
          </div>

          {/* Popular picks section */}
          <PopularPicks />

          {/* Bitrina Story: the vitrine */}
          <AboutSectionMobile />
        </div>
      </div>

      {/* Desktop view */}
      <DesktopHome />
    </>
  );
}
