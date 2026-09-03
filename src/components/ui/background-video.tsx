"use client";

import React, { useEffect, useRef } from "react";

interface BackgroundVideoProps {
  src: string;
  className?: string;
}

export function BackgroundVideo({ src, className }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly enforce DOM properties required for iOS Safari background autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const attemptPlay = () => {
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay was prevented (e.g. Low Power Mode on iOS).
            // Touch listeners below will trigger playback on first user touch.
          });
        }
      }
    };

    attemptPlay();

    // iOS Low Power Mode fallback: start video on first touch/interaction
    const handleTouchOrClick = () => {
      attemptPlay();
    };

    window.addEventListener("touchstart", handleTouchOrClick, { passive: true });
    window.addEventListener("pointerdown", handleTouchOrClick, { passive: true });
    window.addEventListener("click", handleTouchOrClick, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchOrClick);
      window.removeEventListener("pointerdown", handleTouchOrClick);
      window.removeEventListener("click", handleTouchOrClick);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      // @ts-ignore
      webkit-playsinline="true"
      preload="auto"
      aria-hidden="true"
      className={className || "absolute inset-0 w-full h-full object-cover scale-100 opacity-100"}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
