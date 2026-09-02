"use client";

import React, { useState } from "react";
import { useDashboard } from "@/lib/menu-service";
import { OrderCard } from "@/components/dashboard/order-card";
import { Order } from "@/data/mock-orders";

export default function DashboardOrdersPage() {
  const { orders, updateOrderStatus } = useDashboard();
  const [filter, setFilter] = useState<"All" | Order["status"]>("All");

  const filterTabs: ("All" | Order["status"])[] = ["All", "New", "Preparing", "Ready", "Completed", "Cancelled"];

  const filteredOrders = orders.filter((o) => filter === "All" || o.status === filter);

  return (
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div>
        <h1 className="font-playfair font-bold text-3xl text-[#2E5E4E]">Live Kitchen Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor active dine-in and phone orders in real-time.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              filter === tab
                ? "bg-[#2E5E4E] text-white shadow-sm"
                : "bg-white text-foreground border border-[#E6DED2] hover:bg-[#F8F4EC]"
            }`}
          >
            {tab} {tab !== "All" && `(${orders.filter((o) => o.status === tab).length})`}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} onStatusChange={updateOrderStatus} />
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#E6DED2] p-12 text-center text-muted-foreground">
          <div className="text-4xl mb-2">📦</div>
          <p className="text-sm">No orders in "{filter}" status right now.</p>
        </div>
      )}
    </div>
  );
}
