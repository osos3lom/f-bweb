"use client";

import React, { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Plus, Check } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { useLang, useCart } from "@/providers/app-provider";
import { getImageUrl, isDrinkCategory } from "@/lib/utils";
import { getItemName, getItemDesc, formatCurrency } from "@/lib/i18n-helpers";

export function InstagramCard({
  item,
  onSelect,
  isEager = false,
}: {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  isEager?: boolean;
}) {
  const { lang, ar } = useLang();
  const { cart, addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 80) + 45);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: getItemName(item, lang),
        text: getItemDesc(item, lang),
        url: window.location.href,
      }).catch(() => {});
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <article className="bg-white border border-[#E8DFC5] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(59,35,25,0.06)] transition-all duration-300">
      {/* Instagram Post Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F5EFE6]">
        <div className="flex items-center gap-3">
          {/* Avatar Ring */}
          <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-[#D4A359] via-[#3B2319] to-[#C89B3C]">
            <div className="w-9 h-9 rounded-full bg-[#1C120D] p-1 flex items-center justify-center border border-white overflow-hidden">
              <img src="/brand/logo.png" alt="Bitrina" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-poppins font-bold text-xs text-[#2B1D16] leading-tight">
              bitrina.lounge
            </span>
            <span className="text-[10px] text-[#9E8675]">
              {ar ? "حي الزهراء، جدة" : "Al Zahra, Jeddah"}
            </span>
          </div>
        </div>
        <button
          onClick={() => onSelect(item)}
          className="text-[#8C6D58] hover:text-[#3B2319] p-1 rounded-full active:bg-[#FAF6F0]"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Instagram Post Media Frame (1:1 Square) */}
      <div
        className="relative aspect-square w-full bg-[#FAF6F0] overflow-hidden cursor-pointer select-none"
        onDoubleClick={handleDoubleTap}
        onClick={() => onSelect(item)}
      >
        <img
          src={getImageUrl(item.photo, 400, 400)}
          alt={getItemName(item, lang)}
          className={`w-full h-full transition-transform duration-500 hover:scale-105 ${
            isDrink ? "object-contain p-6" : "object-cover"
          }`}
          loading={isEager ? "eager" : "lazy"}
        />

        {/* Post Badge */}
        {item.badge && (
          <span className="absolute top-3 end-3 font-poppins text-[10px] font-bold px-3 py-1 rounded-full bg-[#1C120D]/85 backdrop-blur-md text-[#D4A359] border border-[#D4A359]/40 shadow-md">
            {item.badge}
          </span>
        )}

        {/* Double Tap Heart Animation Popup */}
        {showHeartAnim && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 backdrop-blur-[1px] animate-in fade-in zoom-in duration-200">
            <Heart size={80} className="text-white fill-red-500 animate-bounce drop-shadow-xl" />
          </div>
        )}
      </div>

      {/* Instagram Action Bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLike}
            className="transition-transform active:scale-125 focus:outline-none"
            aria-label="Like"
          >
            <Heart
              size={22}
              className={liked ? "fill-red-500 text-red-500" : "text-[#2B1D16] hover:text-red-500"}
            />
          </button>
          <button
            onClick={() => onSelect(item)}
            className="text-[#2B1D16] hover:text-[#D4A359] transition-transform active:scale-110"
            aria-label="Comment / Details"
          >
            <MessageCircle size={22} />
          </button>
          <button
            onClick={handleShare}
            className="text-[#2B1D16] hover:text-[#D4A359] transition-transform active:scale-110 relative"
            aria-label="Share"
          >
            {copied ? <Check size={20} className="text-green-600" /> : <Share2 size={22} />}
          </button>
        </div>

        {/* Order / Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs transition-all duration-300 active:scale-95 shadow-md ${
            inCart
              ? "gradient-amber-gold text-[#3B2319] border border-[#B88339]/40"
              : "gradient-espresso-lounge text-white border border-[#D4A359]/30"
          }`}
        >
          <Plus size={15} />
          <span>{inCart ? `${ar ? "في السلة" : "In Cart"} (${inCart.qty})` : ar ? "إضافة" : "Add"}</span>
        </button>
      </div>

      {/* Instagram Caption & Price Section */}
      <div className="px-4 pb-4 space-y-1.5 text-xs text-[#2B1D16]">
        {/* Likes Count */}
        <div className="font-semibold text-[11px] text-[#3B2319] flex items-center gap-1">
          <span>{ar ? `أعجب بـ ${likesCount} زبوناً` : `Liked by ${likesCount} guests`}</span>
        </div>

        {/* Caption Title & Price Header */}
        <div className="flex items-baseline justify-between gap-2 pt-0.5">
          <div className="font-playfair font-extrabold text-base text-[#1C120D] leading-snug">
            <span className="font-bold text-[#D4A359] ms-1">bitrina.lounge</span>{" "}
            {getItemName(item, lang)}
          </div>
          <div className="font-poppins font-extrabold text-sm text-[#C89B3C] shrink-0">
            {formatCurrency(item.price, lang)}
          </div>
        </div>

        {/* Description */}
        <p className="font-poppins text-xs text-[#78675D] leading-relaxed line-clamp-2">
          {getItemDesc(item, lang)}
        </p>

        {/* View Details Link */}
        <button
          onClick={() => onSelect(item)}
          className="text-[11px] text-[#9E8675] hover:text-[#D4A359] font-medium pt-1 inline-block"
        >
          {ar ? "عرض التفاصيل الكاملة..." : "View full details..."}
        </button>
      </div>
    </article>
  );
}
