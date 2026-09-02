import React from "react";

export function StatCard({
  icon,
  label,
  value,
  color = "#2E5E4E",
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 md:p-5 border transition-all"
      style={{ background: "#fff", borderColor: "#E6DED2" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ background: `${color}18`, color }}
      >
        {icon}
      </div>
      <div className="font-playfair font-bold text-foreground text-2xl md:text-3xl">{value}</div>
      <div className="font-poppins text-xs md:text-sm text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
