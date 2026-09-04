"use client";

import React, { useState, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Check,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowLeft,
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
  onBackToCategories?: () => void;
}

export function InstagramReelCard({
  item,
  onSelect,
  index,
  totalItems,
  isEager = false,
  onNavigateNext,
  onNavigatePrev,
  onBackToCategories,
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
      className="relative w-full h-screen h-[100vh] min-h-[100vh] snap-start snap-always overflow-hidden bg-[#1C120D] text-white select-none flex-shrink-0 [touch-action:pan-y]"
    >
      {/* ── 1. Full Screen Media Backdrop ── */}
      <div
        className="absolute inset-0 z-0 bg-[#251812] cursor-pointer flex items-center justify-center overflow-hidden"
        onClick={handleMediaTap}
      >
        {/* Warm Ambient Spotlight Glow */}
        <div className="absolute inset-0 bg-radial from-[#7A4E31]/40 via-[#3B2319]/40 to-[#1C120D] opacity-90" />
        
        {/* Additional Warm Spotlight for Drink & Padded Items */}
        {isDrink && (
          <div className="absolute w-[80%] aspect-square rounded-full bg-radial from-[#D4A359]/35 via-[#7A4E31]/20 to-transparent blur-2xl pointer-events-none" />
        )}

        <img
          src={getImageUrl(item.photo, 800, 1000)}
          alt={getItemName(item, lang)}
          className={`w-full h-full transition-transform duration-700 brightness-[1.08] contrast-[1.02] hover:scale-105 ${
            isDrink ? "object-contain p-6 md:p-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] z-10" : "object-cover"
          }`}
          loading={isEager ? "eager" : "lazy"}
          decoding="async"
          // @ts-ignore
          fetchpriority={isEager ? "high" : "auto"}
        />

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



      {/* ── 3. Desktop Vertical Next/Prev Arrows ── */}
      <div className="hidden md:flex flex-col gap-2 absolute right-4 top-1/2 -translate-y-1/2 z-20">
        {onNavigatePrev && index > 0 && (
          <button
            onClick={onNavigatePrev}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#D4A359] hover:text-[#1C120D] transition-all duration-200 active:scale-90 shadow-lg"
            aria-label="Previous Post"
          >
            <ChevronUp size={18} />
          </button>
        )}
        {onNavigateNext && index < totalItems - 1 && (
          <button
            onClick={onNavigateNext}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#D4A359] hover:text-[#1C120D] transition-all duration-200 active:scale-90 shadow-lg"
            aria-label="Next Post"
          >
            <ChevronDown size={18} />
          </button>
        )}
      </div>

      {/* ── 4. Right Side Action Bar (Like & Details Icons) ── */}
      <div className="absolute right-3 bottom-[calc(13rem+env(safe-area-inset-bottom,0px))] md:bottom-44 z-30 flex flex-col items-center gap-4 pointer-events-auto">
        {/* 1. Like Button */}
        <div className="flex flex-col items-center gap-0.5">
          <button
            onClick={toggleLike}
            className={`w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/25 flex items-center justify-center transition-transform active:scale-125 shadow-lg ${
              liked ? "text-red-500 border-red-500/40" : "text-white hover:text-red-400"
            }`}
            aria-label="Like post"
          >
            <Heart size={24} className={liked ? "fill-red-500 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" : ""} />
          </button>
          <span className="font-poppins text-[11px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {likesCount}
          </span>
        </div>

        {/* 2. Details Modal Button */}
        <div className="flex flex-col items-center gap-0.5">
          <button
            onClick={() => onSelect(item)}
            className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:text-[#D4A359] transition-transform active:scale-110 shadow-lg"
            aria-label="View Details"
          >
            <MessageCircle size={22} />
          </button>
          <span className="font-poppins text-[10px] font-semibold text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {ar ? "تفاصيل" : "Details"}
          </span>
        </div>
      </div>

      {/* ── 5. Bottom Overlay (Caption, Title, Description, CTA Banner) ── */}
      <div className="absolute bottom-0 inset-x-0 z-20 px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] md:pb-6 pt-16 space-y-2.5 pointer-events-auto bg-gradient-to-t from-black/80 via-black/35 to-transparent">
        {/* Handle Header */}
        <div className="flex items-center gap-2">
          <span className="font-poppins font-bold text-xs text-white tracking-wide flex items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            @bitrina.lounge
          </span>
          <span className="w-3.5 h-3.5 rounded-full bg-[#D4A359] text-[#1C120D] flex items-center justify-center text-[9px] font-black">
            ✓
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[#D4A359] border border-white/15 font-medium">
            {ar ? "حي الزهراء، جدة" : "Al Zahra, Jeddah"}
          </span>
        </div>

        {/* Item Title & Price */}
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-playfair text-lg md:text-xl font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {getItemName(item, lang)}
          </h2>
          <div className="font-poppins text-base md:text-lg font-extrabold text-[#D4A359] shrink-0 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-[#D4A359]/40 drop-shadow-lg">
            {formatCurrency(item.price, lang)}
          </div>
        </div>

        {/* Description & Expandable Toggle */}
        <div className="space-y-0.5">
          <p
            onClick={() => setExpandedDesc(!expandedDesc)}
            className={`font-poppins text-xs text-white/90 leading-relaxed cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
              expandedDesc ? "" : "line-clamp-2"
            }`}
          >
            {getItemDesc(item, lang)}
          </p>
          {getItemDesc(item, lang).length > 70 && (
            <button
              onClick={() => setExpandedDesc(!expandedDesc)}
              className="text-[10px] font-semibold text-[#D4A359] hover:underline drop-shadow-sm"
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
            <span className="flex items-center gap-1">
              <span>
                {inCart
                  ? `${ar ? "في السلة" : "In Cart"} (${inCart.qty}) — `
                  : `${ar ? "أضف إلى الطلب" : "Add to Order"} • `}
              </span>
              {inCart
                ? formatCurrency(item.price * inCart.qty, lang)
                : formatCurrency(item.price, lang)}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
