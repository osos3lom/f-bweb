import React from "react";

export function CedarIcon({
  size = 32,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 60"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
    >
      <rect x="21" y="52" width="6" height="8" rx="2" />
      <polygon points="3,52 24,38 45,52" />
      <polygon points="7,43 24,29 41,43" />
      <polygon points="11,34 24,20 37,34" />
      <polygon points="15,25 24,13 33,25" />
      <polygon points="19,17 24,7 29,17" />
    </svg>
  );
}
