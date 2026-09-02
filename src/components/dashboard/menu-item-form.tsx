"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { CATEGORIES } from "@/data/categories";
import { SarIcon } from "@/components/icons/sar-icon";

export function MenuItemForm({
  initialData,
  onSave,
  onClose,
}: {
  initialData?: MenuItem | null;
  onSave: (data: Omit<MenuItem, "id">) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [nameAr, setNameAr] = useState(initialData?.nameAr || "");
  const [desc, setDesc] = useState(initialData?.desc || "");
  const [descAr, setDescAr] = useState(initialData?.descAr || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "5.00");
  const [category, setCategory] = useState(initialData?.category || "cold-mezze");
  const [badge, setBadge] = useState<"Popular" | "New" | "">(initialData?.badge || "");
  const [photo, setPhoto] = useState(initialData?.photo || "/menu-images/hummus.jpg");
  const [available, setAvailable] = useState(initialData ? initialData.available : true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      nameAr,
      desc,
      descAr,
      price: parseFloat(price) || 0,
      category,
      badge: badge ? (badge as "Popular" | "New") : undefined,
      photo,
      available,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-[#E6DED2] flex items-center justify-between bg-[#F8F4EC]">
          <h2 className="font-playfair font-bold text-xl text-[#2E5E4E]">
            {initialData ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 font-poppins text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Name (EN)</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] outline-none"
                placeholder="e.g. Hummus"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Name (AR)</label>
              <input
                required
                type="text"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] outline-none text-right font-cairo"
                placeholder="حمص"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Description (EN)</label>
              <textarea
                rows={2}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] outline-none resize-none"
                placeholder="Item description in English"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Description (AR)</label>
              <textarea
                rows={2}
                value={descAr}
                onChange={(e) => setDescAr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] outline-none resize-none text-right font-cairo"
                placeholder="وصف الطبق باللغة العربية"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1 inline-flex items-center gap-1">
                Price (<SarIcon size="0.85em" />)
              </label>
              <input
                required
                type="number"
                step="0.5"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Badge</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value as "Popular" | "New" | "")}
                className="w-full px-3 py-2 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] outline-none"
              >
                <option value="">None</option>
                <option value="Popular">Popular</option>
                <option value="New">New</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Image URL / Path</label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] outline-none"
              placeholder="/menu-images/hummus.jpg or Unsplash photo id"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="available"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="w-4 h-4 text-primary rounded border-gray-300"
            />
            <label htmlFor="available" className="text-xs font-medium text-foreground cursor-pointer">
              Available for customers to order
            </label>
          </div>

          <div className="pt-4 border-t border-[#E6DED2] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#E6DED2] font-semibold text-foreground hover:bg-[#F8F4EC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-semibold text-white bg-[#2E5E4E] hover:bg-[#254d40] shadow-md"
            >
              {initialData ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
