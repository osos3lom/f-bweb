import React from "react";
import { Instagram, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";

export function DesktopFooter() {
  return (
    <footer className="hidden md:block gradient-espresso-lounge py-14 text-white border-t border-[#D4A359]/20">
      <div className="site-container flex items-center justify-between">
        <Logo light />
        <div className="text-center text-xs leading-6 text-white/60">
          <p>© {new Date().getFullYear()} Bitrina Café & Lounge (قهوة بترينا). All rights reserved.</p>
          <p className="flex items-center justify-center gap-2 text-white/80 mt-1">
            <MapPin size={12} className="text-[#D4A359]" /> Al Zahra, Khalil Beg Al Ajan St, Jeddah, KSA
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/bitrina.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-[#D4A359] hover:text-[#1C120D] px-4 py-2 rounded-full text-xs font-medium transition-all border border-white/15"
            aria-label="Bitrina Instagram"
          >
            <Instagram size={15} />
            <span>@bitrina.sa</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
