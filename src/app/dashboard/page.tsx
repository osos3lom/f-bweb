"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp, DollarSign, Package, Tag, Plus, Upload, Clock, Edit2, Eye, EyeOff, BarChart2
} from "lucide-react";
import { useDashboard } from "@/lib/menu-service";
import { StatCard } from "@/components/dashboard/stat-card";
import { MenuItemForm } from "@/components/dashboard/menu-item-form";
import { OrderCard } from "@/components/dashboard/order-card";
import { getImageUrl } from "@/lib/utils";
import { SarIcon } from "@/components/icons/sar-icon";

export default function DashboardOverviewPage() {
  const { menuItems, categories, orders, toggleAvailability, createMenuItem, updateOrderStatus } = useDashboard();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const stats = [
    { icon: <TrendingUp size={20} />, label: "Today's Orders", value: `${orders.length * 8 + 7}`, color: "#2E5E4E" },
    {
      icon: <DollarSign size={20} />,
      label: "Revenue",
      value: (
        <span className="inline-flex items-baseline gap-1">
          <span>18,187</span>
          <SarIcon size="0.7em" />
        </span>
      ),
      color: "#C89B3C",
    },
    { icon: <Package size={20} />, label: "Menu Items", value: `${menuItems.length}`, color: "#758E67" },
    { icon: <Tag size={20} />, label: "Categories", value: `${categories.length}`, color: "#4A3428" },
  ];

  const popularItems = menuItems.filter((m) => m.badge === "Popular").slice(0, 5);

  return (
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair font-bold text-3xl text-[#3B2319]">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here is what's happening at Bitrina Café & Lounge today.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl gradient-espresso-lounge text-white font-semibold text-sm shadow-md hover:opacity-95 transition-all self-start md:self-auto"
        >
          <Plus size={16} /> Add Menu Item
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} color={s.color} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-[#E6DED2] p-5 md:p-6 shadow-sm space-y-4">
        <h2 className="font-playfair font-semibold text-lg text-foreground">Quick Management</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#2E5E4E] text-white text-xs font-semibold hover:bg-[#254d40] transition-all"
          >
            <Plus size={15} /> Add Dish
          </button>
          <Link
            href="/dashboard/menu"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#758E67] text-white text-xs font-semibold hover:opacity-90 transition-all text-center"
          >
            <Upload size={15} /> Manage Items
          </Link>
          <Link
            href="/dashboard/menu"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#C89B3C] text-white text-xs font-semibold hover:opacity-90 transition-all text-center"
          >
            <Tag size={15} /> Categories
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#4A3428] text-white text-xs font-semibold hover:opacity-90 transition-all text-center"
          >
            <Clock size={15} /> Update Hours
          </Link>
        </div>
      </div>

      {/* Grid: Popular Items & Recent Live Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Dishes Bar */}
        <div className="bg-white rounded-2xl border border-[#E6DED2] p-5 md:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 size={18} className="text-primary" />
              <h2 className="font-playfair font-semibold text-lg text-foreground">Top Performing Items</h2>
            </div>
            <Link href="/dashboard/analytics" className="text-xs font-medium text-[#C89B3C] hover:underline">
              View Analytics
            </Link>
          </div>

          <div className="space-y-4 pt-2">
            {popularItems.map((item, i) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="font-bold text-xs text-muted-foreground w-5">#{i + 1}</span>
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted shrink-0">
                  <img
                    src={getImageUrl(item.photo, 40, 40)}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="truncate">{item.name}</span>
                    <span className="font-bold text-[#2E5E4E]">{45 - i * 7} orders</span>
                  </div>
                  <div className="h-1.5 rounded-full mt-1.5 bg-[#E6DED2] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#C89B3C]"
                      style={{ width: `${88 - i * 14}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair font-semibold text-lg text-foreground">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-xs font-medium text-[#C89B3C] hover:underline">
              View All Orders
            </Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 2).map((order) => (
              <OrderCard key={order.id} order={order} onStatusChange={updateOrderStatus} />
            ))}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <MenuItemForm
          onSave={createMenuItem}
          onClose={() => setIsAddOpen(false)}
        />
      )}
    </div>
  );
}
