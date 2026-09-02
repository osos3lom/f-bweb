"use client";

import React, { useState, useRef, useEffect } from "react";
import { MENU } from "@/data/menu";
import { CATEGORIES } from "@/data/categories";
import { MenuItem } from "@/types/menu";
import { useLang, useCart } from "@/providers/app-provider";
import { InstagramStories } from "./instagram-stories";
import { InstagramGridCard } from "./instagram-grid-card";
import { CategoryGridCard } from "./category-grid-card";
import { InstagramReelCard } from "./instagram-reel-card";
import { MenuSearch } from "./menu-search";
import { ItemModal } from "./item-modal";
import { getCategoryName } from "@/lib/i18n-helpers";
import { Grid, Sparkles, Instagram, Search, ArrowLeft, ArrowRight } from "lucide-react";

export function MenuList() {
  const { lang, toggleLang, ar, t } = useLang();
  const { addToCart } = useCart();
  const [activeCat, setActiveCat] = useState("daytime-offers");
  const [gridCategory, setGridCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [viewMode, setViewMode] = useState<"reels" | "grid">("grid");
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

  // Category change & launch reels handler
  const handleSelectCategory = (catId: string) => {
    setActiveCat(catId);
    setGridCategory(catId);
    setActiveReelIndex(0);
    setViewMode("reels");
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !e.changedTouches[0]) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const duration = Date.now() - touchStartRef.current.time;

    touchStartRef.current = null;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX > 60 && absX > absY * 1.3 && duration < 650) {
      setViewMode("grid");
    }
  };

  // Keyboard Up/Down arrow navigation for Reels & Mobile Nav toggle
  useEffect(() => {
    if (viewMode === "reels") {
      document.body.classList.add("hide-mobile-nav");
    } else {
      document.body.classList.remove("hide-mobile-nav");
    }
    return () => {
      document.body.classList.remove("hide-mobile-nav");
    };
  }, [viewMode]);

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
    <div className="relative w-full min-h-screen bg-[#1C120D] text-white overflow-hidden select-none flex flex-col items-center justify-center">
      {/* Background Ambient Luxury Glow */}
      <div className="absolute inset-0 bg-radial from-[#5A3A2B]/40 via-[#251812]/80 to-[#1C120D] pointer-events-none" />

      {/* Main Container Phone Canvas / Widescreen Container */}
      <div className="relative w-full max-w-md md:max-w-md h-[100dvh] md:h-[86vh] md:max-h-[850px] md:my-auto md:rounded-3xl md:border md:border-[#D4A359]/30 md:shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden bg-[#1C120D]">
        
        {/* ── 1. Top Glass Header Overlay (Floating Header) ── */}
        <header className={`absolute top-0 inset-x-0 z-30 pb-3 pt-3 px-4 transition-all ${
          viewMode === "reels"
            ? "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
            : "bg-[#1C120D] border-b border-[#D4A359]/30 shadow-md"
        }`}>
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
                  <span className="text-[10px] text-white/80 font-medium drop-shadow-md">
                    {ar ? "قائمة بترينا الرقمية • ريلز" : "Bitrina Reels Showcase"}
                  </span>
                </div>
              </div>

              {/* Right Header Actions */}
              <div className="flex items-center gap-1.5">
                {/* Search Toggle Button */}
                <button
                  onClick={() => setShowSearchModal(!showSearchModal)}
                  className="p-1.5 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all active:scale-95 shadow-md"
                  aria-label="Search Menu"
                >
                  <Search size={14} />
                </button>

                {/* Back to Categories Button (Only visible in Reels mode) */}
                {viewMode === "reels" && (
                  <button
                    onClick={() => setViewMode("grid")}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D4A359] border border-[#D4A359]/40 hover:bg-black/80 transition-all active:scale-95 shadow-md text-xs font-bold"
                    aria-label="Back to Categories"
                    title={ar ? "العودة لأقسام القائمة" : "Back to Categories"}
                  >
                    <Grid size={13} />
                    <span>{ar ? "الأقسام" : "Categories"}</span>
                  </button>
                )}

                {/* Language Switcher */}
                <button
                  onClick={toggleLang}
                  className="font-poppins text-xs font-bold px-2.5 py-1 rounded-full border border-[#D4A359]/50 bg-white/10 text-[#D4A359] transition-all active:scale-95 shadow-md"
                >
                  {t("nav.lang_toggle")}
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
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
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
                  onBackToCategories={() => setViewMode("grid")}
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
          /* Grid Scrollable View */
          <main
            className="w-full h-full pt-20 pb-24 overflow-y-auto bg-[#FAF6F0] text-[#2B1D16] px-0"
          >
            {allSearched && (
              <div className="font-poppins text-xs font-medium text-[#8C6D58] mb-4 px-4">
                {allSearched.length} {lang === "ar" ? "نتيجة بحث لـ" : "results for"} "{search}"
              </div>
            )}

            {allSearched ? (
              /* Search Results Item Grid */
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
                {allSearched.map((item, index) => (
                  <InstagramGridCard
                    key={item.id}
                    item={item}
                    onSelect={setSelectedItem}
                    isEager={index < 9}
                  />
                ))}
              </div>
            ) : gridCategory === null ? (
              /* Level 1: Menu Categories Grid (Side by side, zero gap, no rounded corners) */
              <div className="animate-in fade-in duration-300">
                <div className="mb-3 px-3 flex items-center justify-between">
                  <h2 className="font-playfair text-base font-bold text-[#3B2319]">
                    {ar ? "أقسام القائمة" : "Menu Categories"}
                  </h2>
                  <span className="text-xs text-[#8C6D58] font-medium">
                    {CATEGORIES.length} {ar ? "قسم" : "categories"}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
                  {CATEGORIES.map((cat) => {
                    const categoryItems = MENU.filter((item) => item.category === cat.id);
                    const coverPhoto = categoryItems[0]?.photo;
                    return (
                      <CategoryGridCard
                        key={cat.id}
                        category={cat}
                        itemCount={categoryItems.length}
                        coverPhoto={coverPhoto}
                        onSelect={(catId) => handleSelectCategory(catId)}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Level 2: Items in Selected Category with Back Button */
              (() => {
                const selectedCatObj = CATEGORIES.find((c) => c.id === gridCategory);
                const categoryItems = MENU.filter((item) => item.category === gridCategory);

                return (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    {/* Category Navigation Bar & Back Button */}
                    <div className="mb-3 px-3 flex items-center justify-between gap-2 pb-2 border-b border-[#E8DFC5]">
                      <button
                        onClick={() => setGridCategory(null)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C120D] text-[#D4A359] text-xs font-bold shadow-md hover:bg-[#3B2319] transition-all active:scale-95 cursor-pointer"
                      >
                        {ar ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                        <span>{ar ? "العودة للأقسام" : "Back to Categories"}</span>
                      </button>

                      {selectedCatObj && (
                        <div className="flex items-center gap-1.5 font-playfair font-bold text-sm text-[#3B2319]">
                          <span>{selectedCatObj.emoji}</span>
                          <span>{getCategoryName(selectedCatObj, lang)}</span>
                          <span className="text-xs text-[#8C6D58] font-normal">
                            ({categoryItems.length})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Category Items Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
                      {categoryItems.map((item, index) => (
                        <InstagramGridCard
                          key={item.id}
                          item={item}
                          onSelect={setSelectedItem}
                          isEager={index < 9}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()
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
