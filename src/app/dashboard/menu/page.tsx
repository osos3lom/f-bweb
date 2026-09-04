"use client";

import React, { useState } from "react";
import { Plus, Edit2, Eye, EyeOff, Trash2, Search, Tag } from "lucide-react";
import { useDashboard } from "@/lib/menu-service";
import { MenuItem, MenuCategory } from "@/types/menu";
import { MenuItemForm } from "@/components/dashboard/menu-item-form";
import { getImageUrl } from "@/lib/utils";
import { formatCurrency } from "@/lib/i18n-helpers";

export default function DashboardMenuPage() {
  const {
    menuItems,
    categories,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
    createCategory,
    deleteCategory,
  } = useDashboard();

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newCatName, setNewCatName] = useState("");
  const [newCatAr, setNewCatAr] = useState("");
  const [newCatEmoji, setNewCatEmoji] = useState("🍽️");

  const filteredItems = menuItems.filter((item) => {
    const matchesCat = selectedCat === "all" || item.category === selectedCat;
    const matchesSearch =
      search.trim() === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.nameAr.includes(search);
    return matchesCat && matchesSearch;
  });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    createCategory({
      name: newCatName,
      nameAr: newCatAr || newCatName,
      emoji: newCatEmoji || "🍽️",
    });
    setNewCatName("");
    setNewCatAr("");
  };

  return (
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair font-bold text-3xl text-[#2E5E4E]">Menu Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add, update, or remove dishes and manage categories.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#2E5E4E] text-white font-semibold text-sm shadow-md hover:bg-[#254d40] transition-all self-start md:self-auto"
        >
          <Plus size={16} /> Add Menu Item
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white rounded-2xl border border-[#E6DED2] p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-80 bg-[#F8F4EC] px-3.5 py-2.5 rounded-xl border border-[#E6DED2]">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedCat === "all"
                ? "bg-[#2E5E4E] text-white shadow-sm"
                : "bg-[#F8F4EC] text-foreground border border-[#E6DED2]"
            }`}
          >
            All Items ({menuItems.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCat === c.id
                  ? "bg-[#2E5E4E] text-white shadow-sm"
                  : "bg-[#F8F4EC] text-foreground border border-[#E6DED2]"
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Items Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-4 shadow-sm flex flex-col justify-between transition-all ${
              item.available ? "border-[#E6DED2]" : "border-red-200 bg-red-50/20 opacity-75"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                <img
                  src={getImageUrl(item.photo, 64, 64)}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-semibold text-sm text-foreground truncate">{item.name}</h3>
                  <span className="font-bold text-xs text-[#C89B3C] shrink-0">{formatCurrency(item.price, "ar")}</span>
                </div>
                <div className="text-xs text-muted-foreground font-cairo text-right mt-0.5">{item.nameAr}</div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.desc}</p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-[#E6DED2] flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#F8F4EC] text-[#78675D]">
                {item.category}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                    item.available ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                  }`}
                  title={item.available ? "Hide from menu" : "Show on menu"}
                >
                  {item.available ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsFormOpen(true);
                  }}
                  className="p-2 rounded-lg bg-[#F8F4EC] text-foreground hover:bg-[#E6DED2] transition-all"
                  title="Edit Item"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete ${item.name}?`)) deleteMenuItem(item.id);
                  }}
                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                  title="Delete Item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Manager Section */}
      <div className="bg-white rounded-2xl border border-[#E6DED2] p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <Tag className="text-primary" size={20} />
          <h2 className="font-playfair font-bold text-xl text-[#2E5E4E]">Category Management</h2>
        </div>

        <form onSubmit={handleAddCategory} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Emoji (e.g. 🥙)"
            value={newCatEmoji}
            onChange={(e) => setNewCatEmoji(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] text-sm outline-none"
          />
          <input
            type="text"
            required
            placeholder="Category Name (EN)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] text-sm outline-none"
          />
          <input
            type="text"
            placeholder="Category Name (AR)"
            value={newCatAr}
            onChange={(e) => setNewCatAr(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] text-sm outline-none font-cairo"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#2E5E4E] text-white font-semibold text-sm hover:bg-[#254d40] transition-all"
          >
            Add Category
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-3 rounded-xl border border-[#E6DED2] bg-[#F8F4EC]"
            >
              <span className="text-xs font-semibold text-foreground">
                {cat.emoji} {cat.name}
              </span>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-muted-foreground hover:text-red-600 p-1"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <MenuItemForm
          initialData={editingItem}
          onSave={(data) => {
            if (editingItem) {
              updateMenuItem(editingItem.id, data);
            } else {
              createMenuItem(data);
            }
          }}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}
