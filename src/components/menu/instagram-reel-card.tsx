"use client";

import React, { useState, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Check,
  Music2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Volume2,
  VolumeX,
} from "lucide-react";
import { MenuItem } from "@/types/menu";
import { useLang, useCart } from "@/providers/app-provider";
import { getImageUrl, isDrinkCategory } from "@/lib/utils";
import { getItemName, getItemDesc, formatCurrency } from "@/lib/i18n-helpers";

interface InstagramReelCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  index: number;
  totalItems: number;
  isEager?: boolean;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
}

export function InstagramReelCard({
  item,
  onSelect,
  index,
  totalItems,
  isEager = false,
  onNavigateNext,
  onNavigatePrev,
}: InstagramReelCardProps) {
  const { lang, ar } = useLang();
  const { cart, addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(
    Math.floor((item.price * 37 + index * 43) % 250) + 124
  );
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [heartAnimPos, setHeartAnimPos] = useState({ x: 50, y: 50 });
  const [copied, setCopied] = useState(false);
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const lastTapRef = useRef<number>(0);
  const inCart = cart.find((c) => c.item.id === item.id);
  const isDrink = isDrinkCategory(item.category);

  const toggleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    } else {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    }
  };

  const handleMediaTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      const rect = e.currentTarget.getBoundingClientRect();
      let clientX = rect.width / 2;
      let clientY = rect.height / 2;

      if ("touches" in e && e.touches[0]) {
        clientX = e.touches[0].clientX - rect.left;
        clientY = e.touches[0].clientY - rect.top;
      } else if ("clientX" in e) {
        clientX = (e as React.MouseEvent).clientX - rect.left;
        clientY = (e as React.MouseEvent).clientY - rect.top;
      }

      setHeartAnimPos({
        x: (clientX / rect.width) * 100,
        y: (clientY / rect.height) * 100,
      });

      if (!liked) {
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      }

      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 900);
    }
    lastTapRef.current = now;
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: getItemName(item, lang),
        text: getItemDesc(item, lang),
        url: window.location.href,
      }).catch(() => {});
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article
      data-reel-id={item.id}
      className="relative w-full h-full snap-start snap-always overflow-hidden bg-[#0D0805] text-white flex flex-col justify-between select-none"
    >
      {/* ── 1. Full Screen Media Backdrop ── */}
      <div
        className="absolute inset-0 z-0 bg-[#160D08] cursor-pointer"
        onClick={handleMediaTap}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-radial from-[#3B2319]/50 via-[#1C120D]/70 to-[#0D0805] opacity-90" />

        <img
          src={getImageUrl(item.photo, 800, 1000)}
          alt={getItemName(item, lang)}
          className={`w-full h-full transition-transform duration-700 hover:scale-105 ${
            isDrink ? "object-contain p-8 md:p-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]" : "object-cover"
          }`}
          loading={isEager ? "eager" : "lazy"}
        />

        {/* Multi-stage Luxury Gradient Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0805] via-[#0D0805]/40 to-transparent pointer-events-none opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0805]/85 via-transparent to-transparent pointer-events-none" />

        {/* Double Tap Heart Popup */}
        {showHeartAnim && (
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-30 animate-in zoom-in-50 fade-in duration-300"
            style={{ left: `${heartAnimPos.x}%`, top: `${heartAnimPos.y}%` }}
          >
            <div className="relative flex items-center justify-center">
              <Heart size={100} className="text-red-500 fill-red-500 drop-shadow-[0_0_35px_rgba(239,68,68,0.9)] animate-bounce" />
              <Sparkles size={36} className="absolute text-[#D4A359] fill-[#D4A359] -top-3 -right-3 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* ── 2. Top Bar (Reel Counter + Sound Indicator) ── */}
      <div className="relative z-20 pt-20 md:pt-16 px-4 flex items-center justify-between pointer-events-none">
        {/* Item Counter Badge */}
        <div className="pointer-events-auto flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-xs text-white/90 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#D4A359] animate-pulse" />
          <span className="font-poppins font-medium">
            {index + 1} / {totalItems}
          </span>
          {item.badge && (
            <span className="ms-1 font-bold px-2 py-0.5 rounded-full bg-[#D4A359] text-[#1C120D] text-[10px]">
              {item.badge}
            </span>
          )}
        </div>

        {/* Sound Toggle */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setSoundMuted(!soundMuted)}
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95 shadow-md"
            aria-label="Sound Toggle"
          >
            {soundMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#D4A359] animate-pulse" />}
          </button>
        </div>
      </div>

      {/* ── 3. Desktop Vertical Next/Prev Arrows ── */}
      <div className="hidden md:flex flex-col gap-2 absolute right-4 top-1/2 -translate-y-1/2 z-20">
        {onNavigatePrev && index > 0 && (
          <button
            onClick={onNavigatePrev}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#D4A359] hover:text-[#1C120D] transition-all duration-200 active:scale-90 shadow-lg"
            aria-label="Previous Post"
          >
            <ChevronUp size={18} />
          </button>
        )}
        {onNavigateNext && index < totalItems - 1 && (
          <button
            onClick={onNavigateNext}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#D4A359] hover:text-[#1C120D] transition-all duration-200 active:scale-90 shadow-lg"
            aria-label="Next Post"
          >
            <ChevronDown size={18} />
          </button>
        )}
      </div>

      {/* ── 4. Right Side Action Bar (TikTok / Reels Style) ── */}
      <div className="relative z-20 flex flex-col items-center gap-4 self-end me-4 mb-24 md:mb-16 pointer-events-auto">
        {/* Profile Avatar with Plus Badge */}
        <div className="relative group cursor-pointer" onClick={() => onSelect(item)}>
          <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#D4A359] via-[#FAF6F0] to-[#3B2319] shadow-lg">
            <div className="w-full h-full rounded-full bg-[#1C120D] overflow-hidden p-0.5 border border-black">
              <img src="/brand/logo.png" alt="Bitrina" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D4A359] text-[#1C120D] flex items-center justify-center shadow-md">
            <Plus size={10} className="stroke-[3]" />
          </div>
        </div>

        {/* Like Button */}
        <div className="flex flex-col items-center gap-0.5">
          <button
            onClick={toggleLike}
            className={`w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center transition-transform active:scale-125 shadow-md ${
              liked ? "text-red-500 border-red-500/40" : "text-white hover:text-red-400"
            }`}
            aria-label="Like post"
          >
            <Heart size={24} className={liked ? "fill-red-500 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" : ""} />
          </button>
          <span className="font-poppins text-[11px] font-semibold text-white/90 drop-shadow-md">
            {likesCount}
          </span>
        </div>

        {/* Comment / Details Button */}
        <div className="flex flex-col items-center gap-0.5">
          <button
            onClick={() => onSelect(item)}
            className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-[#D4A359] transition-transform active:scale-110 shadow-md"
            aria-label="View Details"
          >
            <MessageCircle size={22} />
          </button>
          <span className="font-poppins text-[10px] font-medium text-white/80 drop-shadow-md">
            {ar ? "تفاصيل" : "Details"}
          </span>
        </div>

        {/* Floating Quick Add to Cart CTA */}
        <div className="flex flex-col items-center gap-0.5">
          <button
            onClick={handleAddToCart}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
              justAdded
                ? "bg-green-500 text-white scale-110"
                : inCart
                ? "gradient-amber-gold text-[#1C120D] ring-2 ring-[#D4A359]"
                : "gradient-espresso-lounge text-white border border-[#D4A359]/60 hover:scale-105"
            }`}
            aria-label="Add to cart"
          >
            {justAdded ? (
              <Check size={22} className="stroke-[3] animate-in zoom-in" />
            ) : inCart ? (
              <span className="font-poppins font-black text-xs">{inCart.qty}</span>
            ) : (
              <ShoppingBag size={20} className="text-[#D4A359]" />
            )}
          </button>
          <span className="font-poppins text-[10px] font-bold text-[#D4A359] drop-shadow-md">
            {inCart ? (ar ? "في السلة" : "In Cart") : ar ? "إضافة" : "Order"}
          </span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center gap-0.5">
          <button
            onClick={handleShare}
            className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-[#D4A359] transition-transform active:scale-110 shadow-md relative"
            aria-label="Share"
          >
            {copied ? <Check size={20} className="text-green-400" /> : <Share2 size={20} />}
          </button>
          <span className="font-poppins text-[10px] font-medium text-white/80 drop-shadow-md">
            {copied ? (ar ? "تم النسخ" : "Copied") : ar ? "مشاركة" : "Share"}
          </span>
        </div>

        {/* TikTok Rotating Vinyl Disc */}
        <div
          className="mt-1 w-9 h-9 rounded-full bg-gradient-to-tr from-[#1C120D] via-[#3B2319] to-[#D4A359] p-0.5 shadow-lg animate-[spin_6s_linear_infinite] cursor-pointer"
          onClick={() => setSoundMuted(!soundMuted)}
        >
          <div className="w-full h-full rounded-full bg-black p-1.5 flex items-center justify-center border border-white/20">
            <Music2 size={13} className="text-[#D4A359]" />
          </div>
        </div>
      </div>

      {/* ── 5. Bottom Overlay (Caption, Title, Description, CTA Banner & Ticker) ── */}
      <div className="relative z-20 px-4 pb-24 md:pb-6 pt-4 space-y-2.5 pointer-events-auto bg-gradient-to-t from-black via-black/85 to-transparent">
        {/* Handle Header */}
        <div className="flex items-center gap-2">
          <span className="font-poppins font-bold text-xs text-white tracking-wide flex items-center gap-1">
            @bitrina.lounge
          </span>
          <span className="w-3.5 h-3.5 rounded-full bg-[#D4A359] text-[#1C120D] flex items-center justify-center text-[9px] font-black">
            ✓
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[#D4A359] border border-white/10 font-medium">
            {ar ? "حي الزهراء، جدة" : "Al Zahra, Jeddah"}
          </span>
        </div>

        {/* Item Title & Price */}
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-playfair text-lg md:text-xl font-black text-white leading-tight drop-shadow-md">
            {getItemName(item, lang)}
          </h2>
          <div className="font-poppins text-base md:text-lg font-extrabold text-[#D4A359] shrink-0 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-[#D4A359]/30 drop-shadow-lg">
            {formatCurrency(item.price, lang)}
          </div>
        </div>

        {/* Description & Expandable Toggle */}
        <div className="space-y-0.5">
          <p
            onClick={() => setExpandedDesc(!expandedDesc)}
            className={`font-poppins text-xs text-white/80 leading-relaxed cursor-pointer ${
              expandedDesc ? "" : "line-clamp-2"
            }`}
          >
            {getItemDesc(item, lang)}
          </p>
          {getItemDesc(item, lang).length > 70 && (
            <button
              onClick={() => setExpandedDesc(!expandedDesc)}
              className="text-[10px] font-semibold text-[#D4A359] hover:underline"
            >
              {expandedDesc ? (ar ? "عرض أقل" : "less") : (ar ? "قراءة المزيد..." : "more...")}
            </button>
          )}
        </div>

        {/* Primary Call to Action Button */}
        <div className="pt-0.5 flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3 px-5 rounded-xl font-poppins font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 shadow-xl ${
              inCart
                ? "gradient-amber-gold text-[#1C120D] border border-amber-300"
                : "gradient-espresso-lounge text-white border border-[#D4A359]/40 hover:border-[#D4A359]"
            }`}
          >
            <ShoppingBag size={16} className={inCart ? "text-[#1C120D]" : "text-[#D4A359]"} />
            <span>
              {inCart
                ? `${ar ? "في السلة" : "In Cart"} (${inCart.qty}) — ${formatCurrency(
                    item.price * inCart.qty,
                    lang
                  )}`
                : `${ar ? "أضف إلى الطلب" : "Add to Order"} • ${formatCurrency(
                    item.price,
                    lang
                  )}`}
            </span>
          </button>
        </div>

        {/* Music Marquee Sound Ticker */}
        <div className="flex items-center gap-2 text-[10px] text-white/70 overflow-hidden pt-0.5">
          <Music2 size={12} className="text-[#D4A359] shrink-0 animate-pulse" />
          <div className="whitespace-nowrap overflow-hidden relative w-full">
            <div className="inline-block animate-[marquee_14s_linear_infinite] font-poppins text-[10px]">
              {ar
                ? "🎵 صوت بترينا الأصلي - قهوة مختصة وحلويات فاخرة • جدة"
                : "🎵 Original Audio - Bitrina Specialty Coffee & Vitrine Lounge • Jeddah ✨"}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
