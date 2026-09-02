"use client";

import React from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const revenueData = [
  { day: "Mon", revenue: 420, orders: 28 },
  { day: "Tue", revenue: 580, orders: 36 },
  { day: "Wed", revenue: 510, orders: 32 },
  { day: "Thu", revenue: 690, orders: 45 },
  { day: "Fri", revenue: 890, orders: 58 },
  { day: "Sat", revenue: 1120, orders: 74 },
  { day: "Sun", revenue: 940, orders: 62 },
];

const categoryData = [
  { name: "Grills", value: 35, color: "#2E5E4E" },
  { name: "Mezze", value: 25, color: "#C89B3C" },
  { name: "Sandwiches", value: 20, color: "#758E67" },
  { name: "Juices", value: 12, color: "#4A3428" },
  { name: "Desserts", value: 8, color: "#9B8A7A" },
];

export function RevenueChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2E5E4E" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2E5E4E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6DED2" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#78675D" }} />
          <YAxis tick={{ fontSize: 12, fill: "#78675D" }} />
          <Tooltip
            contentStyle={{ borderRadius: 12, borderColor: "#E6DED2", background: "#fff" }}
            formatter={(value: any) => [`$${value}`, "Revenue"]}
          />
          <Area type="monotone" dataKey="revenue" stroke="#2E5E4E" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OrdersChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6DED2" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#78675D" }} />
          <YAxis tick={{ fontSize: 12, fill: "#78675D" }} />
          <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#E6DED2", background: "#fff" }} />
          <Bar dataKey="orders" fill="#C89B3C" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryPieChart() {
  return (
    <div className="h-64 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#E6DED2", background: "#fff" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
