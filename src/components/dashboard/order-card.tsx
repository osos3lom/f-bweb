"use client";

import React from "react";
import { Order } from "@/data/mock-orders";
import { Clock, User } from "lucide-react";
import { SarIcon } from "@/components/icons/sar-icon";

export function OrderCard({
  order,
  onStatusChange,
}: {
  order: Order;
  onStatusChange: (id: string, status: Order["status"]) => void;
}) {
  const statusColors: Record<Order["status"], { bg: string; text: string }> = {
    New: { bg: "#EBF5FF", text: "#1E40AF" },
    Preparing: { bg: "#FEF3C7", text: "#92400E" },
    Ready: { bg: "#D1FAE5", text: "#065F46" },
    Completed: { bg: "#F3F4F6", text: "#374151" },
    Cancelled: { bg: "#FEE2E2", text: "#991B1B" },
  };

  const statuses: Order["status"][] = ["New", "Preparing", "Ready", "Completed", "Cancelled"];

  return (
    <div className="bg-white rounded-2xl border border-[#E6DED2] p-4 md:p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-playfair font-bold text-lg text-[#2E5E4E]">{order.id}</span>
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{ background: statusColors[order.status].bg, color: statusColors[order.status].text }}
          >
            {order.status}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={13} />
          {order.createdAt}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-medium text-foreground bg-[#F8F4EC] px-3 py-2 rounded-xl">
        <div className="flex items-center gap-2">
          {order.type === "Dine-in" ? (
            <span className="font-bold">Table #{order.tableNumber}</span>
          ) : (
            <span className="flex items-center gap-1">
              <User size={12} /> {order.customerName || "Takeaway"}
            </span>
          )}
        </div>
        <span className="font-bold text-[#C89B3C] text-sm inline-flex items-baseline gap-1">
          <span>{order.total}</span> <SarIcon size="0.85em" />
        </span>
      </div>

      <div className="space-y-1.5 text-xs">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-foreground">
            <span>
              {item.qty}x {item.name} <span className="font-cairo text-muted-foreground">({item.nameAr})</span>
            </span>
            <span className="text-muted-foreground inline-flex items-baseline gap-1">
              <span>{item.price * item.qty}</span> <SarIcon size="0.85em" />
            </span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#E6DED2] flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-xs text-muted-foreground shrink-0">Set status:</span>
        <div className="flex gap-1 shrink-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => onStatusChange(order.id, st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                order.status === st
                  ? "bg-[#2E5E4E] text-white shadow-sm"
                  : "bg-[#F8F4EC] text-foreground hover:bg-[#E6DED2]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
