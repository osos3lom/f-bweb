"use client";

import React, { useState } from "react";
import { RESTAURANT } from "@/data/restaurant";

export default function DashboardSettingsPage() {
  const [name, setName] = useState(RESTAURANT.name);
  const [nameAr, setNameAr] = useState(RESTAURANT.nameAr);
  const [tagline, setTagline] = useState(RESTAURANT.tagline);
  const [phone, setPhone] = useState(RESTAURANT.phone);
  const [location, setLocation] = useState(RESTAURANT.location);
  const [hours, setHours] = useState(RESTAURANT.hours);
  const [instagram, setInstagram] = useState(RESTAURANT.social.instagram);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 font-poppins max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="font-playfair font-bold text-3xl text-[#2E5E4E]">Restaurant Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure general store details, phone numbers, and opening hours.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-semibold">
          ✓ Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-[#E6DED2] p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Restaurant Name (EN)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Restaurant Name (AR)</label>
            <input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] text-sm outline-none font-cairo"
              dir="rtl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Order Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Address / Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Opening Hours</label>
          <input
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Instagram URL</label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DED2] bg-[#F8F4EC] text-sm outline-none"
          />
        </div>

        <div className="pt-4 border-t border-[#E6DED2] flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#2E5E4E] text-white font-semibold text-sm shadow-md hover:bg-[#254d40] transition-all"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
