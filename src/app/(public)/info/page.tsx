"use client";

import React from "react";
import { Clock, MapPin, Phone, MessageSquare, Navigation, Instagram, Globe } from "lucide-react";
import { useLang } from "@/providers/app-provider";
import { Logo } from "@/components/layout/logo";
import { getImageUrl } from "@/lib/utils";

export default function InfoPage() {
  const { ar } = useLang();
  const hours = [{ day: ar ? "مفتوح يومياً" : "Open daily", time: "7:00 AM – 1:00 AM" }];

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ scrollbarWidth: "none" }} dir={ar ? "rtl" : "ltr"}>
      {/* Hero */}
      <div className="relative h-48 md:h-64 gradient-espresso-lounge overflow-hidden">
        <img
          src="/brand/interior-fountain.jpg"
          alt="Bitrina Café & Lounge Interior Fountain"
          className="w-full h-full object-cover opacity-75 mix-blend-overlay"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(28,18,13,0.4) 0%, rgba(28,18,13,0.85) 100%)" }}
        />
        <div className="absolute bottom-5 left-5 right-5 site-container">
          <Logo light />
        </div>
      </div>

      <div className="px-5 py-6 site-container flex flex-col gap-6 max-w-2xl">
        {/* About */}
        <div>
          <h2 className="font-playfair font-bold text-foreground text-xl md:text-2xl mb-2">
            {ar ? "تَعى خَبرك عَن بيتّرينا" : "About Bitrina Café & Lounge"}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
            {ar
              ? "بيترّينا هي بذاتها خزانة ستي وستّك، يلي كان ممنوع حدا يدقرها، لإن عقولتهم: (فيها أشياء ثمينة)، بخافوا تنكسر\n\nلهيك اليوم، أنا وأنت صار عنا بيترّينا خاصة فينا، مليانة أشياء ثمينة، إيه وما بتنكسر\nبس مثل شو؟"
              : "Bitrina stems from the artisanal 'Vitrine' glass display showcase—curating specialty coffee beans, exquisite pastries, and gourmet lounge meals with transparent elegance in Al Zahra, Jeddah."}
          </p>
        </div>

        {/* Hours */}
        <div className="rounded-2xl border border-[#E8DFC5] bg-white p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={15} className="text-[#D4A359]" />
            <h3 className="font-poppins font-semibold text-foreground text-sm">
              {ar ? "ساعات العمل" : "Opening Hours"}
            </h3>
          </div>
          <div className="flex flex-col gap-2.5">
            {hours.map((h, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-poppins text-sm text-foreground">{h.day}</span>
                <span className="font-poppins text-sm font-semibold text-[#D4A359]">
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="rounded-2xl border border-[#E8DFC5] bg-white p-4 flex gap-3 items-start">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 gradient-espresso-lounge">
            <MapPin size={16} className="text-[#D4A359]" />
          </div>
          <div>
            <div className="font-poppins font-semibold text-sm text-foreground">
              {ar ? "الموقع" : "Location"}
            </div>
            <div className="font-poppins text-sm text-muted-foreground mt-0.5">
              {ar ? "شارع خليل بيك العجان، حي الزهراء، جدة، المملكة العربية السعودية" : "Khalil Beg Al Ajan St, Al Zahra, Jeddah, Saudi Arabia"}
            </div>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Phone size={18} />, label: ar ? "اتصل ببترينا" : "Call Us", color: "#3B2319", href: "tel:+966126000000" },
            { icon: <MessageSquare size={18} />, label: "WhatsApp", color: "#25D366", href: "https://wa.me/966500000000" },
            { icon: <Navigation size={18} />, label: ar ? "الخريطة" : "Map", color: "#D4A359", href: "https://maps.google.com" },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl font-poppins text-xs font-semibold text-white transition-all active:scale-95 shadow-sm"
              style={{ background: btn.color }}
            >
              {btn.icon}
              {btn.label}
            </a>
          ))}
        </div>

        {/* Social */}
        <div className="flex items-center justify-center gap-6 pt-2">
          {[
            { icon: <Instagram size={20} />, label: "@bitrina.sa", href: "https://instagram.com/bitrina.sa" },
            { icon: <Globe size={20} />, label: "bitrina.sa", href: "https://bitrina.sa" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-[#3B2319] transition-colors"
            >
              {s.icon}
              <span className="font-poppins text-[10px]">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
