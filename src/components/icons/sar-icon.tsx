import React from "react";

export function SarIcon({
  className = "",
  size = "1em",
}: {
  className?: string;
  size?: string | number;
}) {
  const dimension = typeof size === "number" ? `${size}px` : size;

  return (
    <span
      className={`inline-block bg-current align-baseline shrink-0 ${className}`}
      style={{
        maskImage: "url('/brand/sar-symbol.png')",
        WebkitMaskImage: "url('/brand/sar-symbol.png')",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        width: dimension,
        height: dimension,
      }}
      aria-label="SAR"
      role="img"
    />
  );
}
