"use client";

import React, { useState, useRef, useEffect } from "react";
import { MENU } from "@/data/menu";
import { CATEGORIES } from "@/data/categories";
import { MenuItem } from "@/types/menu";
import { useLang, useCart } from "@/providers/app-provider";
import { InstagramStories } from "./instagram-stories";
import { InstagramCard } from "./instagram-card";
import { InstagramGridCard } from "./instagram-grid-card";
import { InstagramReelCard } from "./instagram-reel-card";
import { MenuSearch } from "./menu-search";
import { ItemModal } from "./item-modal";
import { getCategoryName } from "@/lib/i18n-helpers";
import { Grid, LayoutList, Sparkles, Instagram, Search, Film, Maximize2, Minimize2 } from "lucide-react";

export function MenuList() {
  const { lang, toggleLang, ar } = useLang();
  const { addToCart } = useCart();
  const [activeCat, setActiveCat] = useState("coffee");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [viewMode, setViewMode] = useState<"reels" | "grid" | "feed">("reels");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = MENU.filter((item) => {
    const catMatch = activeCat === "all" || item.category === activeCat;
    const searchMatch =
      search.trim() === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.nameAr && item.nameAr.includes(search));
    return catMatch && searchMatch;
  });

  const allSearched =
    search.trim() !== ""
      ? MENU.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            (item.nameAr && item.nameAr.includes(search))
        )
      : null;

  const displayItems = allSearched ?? filtered;
  const activeCategory = CATEGORIES.find((c) => c.id === activeCat);

  // Smooth scroll to a specific reel index
  const scrollToIndex = (idx: number) => {
    if (idx < 0 || idx >= displayItems.length) return;
    setActiveReelIndex(idx);
    const targetElement = containerRef.current?.children[idx] as HTMLElement;
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Category change handler
  const handleSelectCategory = (catId: string) => {
    setActiveCat(catId);
    setActiveReelIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  // Keyboard Up/Down arrow navigation for Reels
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "reels" || selectedItem) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(activeReelIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(activeReelIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, activeReelIndex, displayItems.length, selectedItem]);

  return (
    <div className="relative w-full min-h-screen bg-[#0D0805] text-white overflow-hidden select-none flex flex-col items-center justify-center">
      {/* Background Ambient Luxury Glow */}
      <div className="absolute inset-0 bg-radial from-[#3B2319]/30 via-[#1C120D]/80 to-[#0D0805] pointer-events-none" />

      {/* Main Container Phone Canvas / Widescreen Container */}
      <div className="relative w-full max-w-md md:max-w-md h-[100dvh] md:h-[86vh] md:max-h-[850px] md:my-auto md:rounded-3xl md:border md:border-[#D4A359]/30 md:shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden bg-[#0D0805]">
        
        {/* ── 1. Top Glass Header Overlay (Floating Header) ── */}
        <header className="absolute top-0 inset-x-0 z-30 bg-gradient-to-b from-black/90 via-black/60 to-transparent pb-3 pt-3 px-4 backdrop-blur-xs">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              {/* Left Brand Badge */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4A359] via-[#FAF6F0] to-[#3B2319] p-0.5 shadow-md">
                  <div className="w-full h-full rounded-full bg-[#1C120D] p-1 flex items-center justify-center border border-black">
                    <Instagram size={14} className="text-[#D4A359]" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-playfair font-extrabold text-sm text-white drop-shadow-md">
                      bitrina.sa
                    </span>
                    <Sparkles size={12} className="text-[#D4A359] fill-[#D4A359]" />
                  </div>
                  <span className="text-[10px] text-white/70 font-medium">
                    {ar ? "قائمة بترينا الرقمية • ريلز" : "Bitrina Reels Showcase"}
                  </span>
                </div>
              </div>

              {/* Right Header Actions */}
              <div className="flex items-center gap-1.5">
                {/* Search Toggle Button */}
                <button
                  onClick={() => setShowSearchModal(!showSearchModal)}
                  className="p-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/20 transition-all active:scale-95"
                  aria-label="Search Menu"
                >
                  <Search size={14} />
                </button>

                {/* View Switcher Pills */}
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/15">
                  <button
                    onClick={() => setViewMode("reels")}
                    className={`p-1.5 rounded-full transition-all ${
                      viewMode === "reels"
                        ? "bg-[#D4A359] text-[#1C120D] shadow-md"
                        : "text-white/70 hover:text-white"
                    }`}
                    aria-label="Reels Fullscreen View"
                    title="Reels / TikTok View"
                  >
                    <Film size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-full transition-all ${
                      viewMode === "grid"
                        ? "bg-[#D4A359] text-[#1C120D] shadow-md"
                        : "text-white/70 hover:text-white"
                    }`}
                    aria-label="Grid View"
                    title="Grid View"
                  >
                    <Grid size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode("feed")}
                    className={`p-1.5 rounded-full transition-all ${
                      viewMode === "feed"
                        ? "bg-[#D4A359] text-[#1C120D] shadow-md"
                        : "text-white/70 hover:text-white"
                    }`}
                    aria-label="Cards Feed View"
                    title="Classic Post Cards View"
                  >
                    <LayoutList size={14} />
                  </button>
                </div>

                {/* Language Switcher */}
                <button
                  onClick={toggleLang}
                  className="font-poppins text-xs font-bold px-2.5 py-1 rounded-full border border-[#D4A359]/50 bg-black/40 text-[#D4A359] backdrop-blur-md transition-all active:scale-95"
                >
                  {lang === "ar" ? "EN" : "عربي"}
                </button>
              </div>
            </div>

            {/* Search Drawer Modal */}
            {showSearchModal && (
              <div className="pt-2 pb-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <MenuSearch search={search} onSearchChange={setSearch} />
              </div>
            )}

            {/* Instagram Story Category Highlights Carousel */}
            {!allSearched && viewMode === "reels" && (
              <div className="pt-0.5">
                <InstagramStories
                  activeCat={activeCat}
                  onSelectCategory={handleSelectCategory}
                />
              </div>
            )}
          </div>
        </header>

        {/* ── 2. Main View Mode Content Frame ── */}
        {viewMode === "reels" ? (
          /* Full Screen Snap Scroll TikTok / Instagram Reels Feed */
          <main
            ref={containerRef}
            className="w-full h-full snap-y snap-mandatory scroll-smooth overflow-y-auto scrollbar-none"
          >
            {displayItems.length > 0 ? (
              displayItems.map((item, idx) => (
                <InstagramReelCard
                  key={item.id}
                  item={item}
                  index={idx}
                  totalItems={displayItems.length}
                  onSelect={setSelectedItem}
                  isEager={idx < 2}
                  onNavigateNext={() => scrollToIndex(idx + 1)}
                  onNavigatePrev={() => scrollToIndex(idx - 1)}
                />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/80">
                <div className="text-5xl mb-3">🎬</div>
                <h3 className="font-playfair text-xl font-bold text-[#D4A359] mb-1">
                  {ar ? "لم نجد أي أصناف" : "No Reels Found"}
                </h3>
                <p className="font-poppins text-xs text-white/60">
                  {ar ? "جرب تغيير كلمات البحث أو اختر قسماً آخر" : "Try searching another item or select a category above"}
                </p>
              </div>
            )}
          </main>
        ) : (
          /* Grid or Feed Scrollable View */
          <main className="w-full h-full pt-36 pb-24 px-4 overflow-y-auto bg-[#FAF6F0] text-[#2B1D16]">
            {allSearched && (
              <div className="font-poppins text-xs font-medium text-[#8C6D58] mb-4">
                {allSearched.length} {lang === "ar" ? "نتيجة بحث لـ" : "results for"} "{search}"
              </div>
            )}

            {viewMode === "feed" ? (
              <div className="flex flex-col gap-5">
                {displayItems.map((item, index) => (
                  <InstagramCard
                    key={item.id}
                    item={item}
                    onSelect={setSelectedItem}
                    isEager={index < 3}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {displayItems.map((item, index) => (
                  <InstagramGridCard
                    key={item.id}
                    item={item}
                    onSelect={setSelectedItem}
                    isEager={index < 9}
                  />
                ))}
              </div>
            )}
          </main>
        )}
      </div>

      {/* ── 3. Detail / Customization Item Modal ── */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAdd={(item, qty, notes) => {
            addToCart(item, qty, notes);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}
