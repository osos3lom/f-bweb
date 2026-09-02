"use client";

import React from "react";
import { RevenueChart, OrdersChart, CategoryPieChart } from "@/components/dashboard/analytics-charts";
import { StatCard } from "@/components/dashboard/stat-card";
import { DollarSign, ShoppingBag, TrendingUp, Award } from "lucide-react";
import { SarIcon } from "@/components/icons/sar-icon";

export default function DashboardAnalyticsPage() {
  return (
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div>
        <h1 className="font-playfair font-bold text-3xl text-[#2E5E4E]">Performance & Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Detailed breakdown of sales, popular categories, and order trends.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarSign size={20} />}
          label="Total Revenue (7d)"
          value={
            <span className="inline-flex items-baseline gap-1">
              <span>19,312</span>
              <SarIcon size="0.7em" />
            </span>
          }
          color="#2E5E4E"
        />
        <StatCard icon={<ShoppingBag size={20} />} label="Total Orders (7d)" value="339" color="#C89B3C" />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Avg Order Value"
          value={
            <span className="inline-flex items-baseline gap-1">
              <span>57</span>
              <SarIcon size="0.7em" />
            </span>
          }
          color="#758E67"
        />
        <StatCard icon={<Award size={20} />} label="Top Category" value="Grills (35%)" color="#4A3428" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Growth Chart */}
        <div className="bg-white rounded-2xl border border-[#E6DED2] p-6 shadow-sm space-y-4">
          <h2 className="font-playfair font-bold text-lg text-foreground">Revenue Trend (Last 7 Days)</h2>
          <RevenueChart />
        </div>

        {/* Daily Orders Bar Chart */}
        <div className="bg-white rounded-2xl border border-[#E6DED2] p-6 shadow-sm space-y-4">
          <h2 className="font-playfair font-bold text-lg text-foreground">Daily Order Volume</h2>
          <OrdersChart />
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl border border-[#E6DED2] p-6 shadow-sm space-y-4 max-w-xl">
        <h2 className="font-playfair font-bold text-lg text-foreground">Sales by Category</h2>
        <CategoryPieChart />
      </div>
    </div>
  );
}
