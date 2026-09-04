"use client";

import React, { useEffect, useRef, useState } from "react";
import { Clock, MapPin, ArrowUpRight, CornerDownRight, MessageSquare } from "lucide-react";
import { useLang } from "@/providers/app-provider";
import { getAssetPath } from "@/lib/utils";
import type { TranslationKey } from "@/i18n/translations";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Bitrina+Khalil+Beg+Al+Ajan+St+Al+Zahra+Jeddah";

/**
 * The three "precious things" on display, one per shelf of the vitrine.
 * `pos` is the object-position each photo needs so the wide shelf band lands on
 * its subject rather than on ceiling or floor.
 */
const SHELVES: { img: string; name: TranslationKey; note: TranslationKey; pos: string }[] = [
  { img: "/brand/mirror-arch.webp", name: "about.shelf1_name", note: "about.shelf1_note", pos: "center 35%" },
  { img: "/brand/interior-fountain.webp", name: "about.shelf2_name", note: "about.shelf2_note", pos: "center 78%" },
  { img: "/brand/outdoor-lounge.webp", name: "about.shelf3_name", note: "about.shelf3_note", pos: "center 45%" },
];

const WHATSAPP_NUMBER = "966590393906";

/**
 * Live open/closed state against Jeddah trading hours (07:00 to 01:00 next day),
 * evaluated in Asia/Riyadh so it stays correct wherever the guest is browsing from.
 * Returns null until mounted so server and client markup match.
 */
function useOpenNow() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const read = () => {
      const hour =
        Number(
          new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Riyadh",
            hour: "numeric",
            hour12: false,
          }).format(new Date())
        ) % 24;
      setOpen(hour >= 7 || hour < 1);
    };
    read();
    const id = setInterval(read, 60_000);
    return () => clearInterval(id);
  }, []);

  return open;
}

/** Section eyebrow: gold bead, label, then an engraved rule running to the edge. */
function Eyebrow() {
  const { t } = useLang();
  return (
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A359]" />
      <span className="font-poppins text-[10px] font-semibold uppercase tracking-[.28em] text-[#D4A359] whitespace-nowrap">
        {t("about.title")}
      </span>
      <span aria-hidden className="vitrine-rule h-px flex-1" />
    </div>
  );
}

/** The question the copy asks, set as a pull quote that the vitrine answers. */
function PullQuote({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <figure className={`border-s-2 border-[#D4A359] ${compact ? "mt-6 ps-4" : "mt-9 ps-5"}`}>
      <p
        className={`font-playfair gradient-text-gold italic font-bold leading-tight ${
          compact ? "text-xl" : "text-[28px]"
        }`}
      >
        {t("about.question")}
      </p>
      <figcaption className="mt-2 flex items-center gap-2 font-poppins text-[10px] font-semibold uppercase tracking-[.24em] text-white/55">
        <CornerDownRight size={12} className="text-[#D4A359] rtl:-scale-x-100" />
        {t("about.vitrine_label")}
      </figcaption>
    </figure>
  );
}

/** Live trading-status pill, sat on the label line so it never squeezes the value. */
function StatusPill({ open }: { open: boolean }) {
  const { t } = useLang();
  return (
    <span
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-poppins text-[10px] font-semibold ${
        open
          ? "border-[#7FCFA6]/35 bg-[#7FCFA6]/10 text-[#9BE0BC]"
          : "border-white/15 bg-white/5 text-white/70"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${open ? "animate-pulse bg-[#7FCFA6]" : "bg-white/45"}`}
      />
      {open ? t("about.open_now") : t("about.closed_now")}
    </span>
  );
}

/** Hours and location, set on brass rails rather than in boxed cards. */
function InfoRail({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  const openNow = useOpenNow();
  const labelClass = "font-poppins text-[10px] uppercase tracking-[.2em] text-white/55";

  return (
    <ul className={`divide-y divide-white/10 border-y border-white/10 ${compact ? "mt-7" : "mt-10"}`}>
      <li className="flex items-start gap-4 py-4">
        <Clock size={16} className="mt-1 shrink-0 text-[#D4A359]" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className={labelClass}>{t("info.opening_hours")}</span>
            {openNow !== null && <StatusPill open={openNow} />}
          </div>
          <div className="mt-0.5 font-poppins text-sm text-white/90">{t("about.hours_value")}</div>
        </div>
      </li>

      <li>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 py-4"
        >
          <MapPin size={16} className="mt-1 shrink-0 text-[#D4A359]" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <span className={labelClass}>{t("info.location_title")}</span>
              <span className="flex shrink-0 items-center gap-1 font-poppins text-[11px] font-semibold text-[#D4A359] transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                {t("about.directions")}
                <ArrowUpRight size={13} className="rtl:-scale-x-100" />
              </span>
            </div>
            <div className="mt-0.5 font-poppins text-sm text-white/90">{t("about.district")}</div>
          </div>
        </a>
      </li>
    </ul>
  );
}

/** Closes the story with the one action the section should earn: a table. */
function ReserveCta({ compact = false }: { compact?: boolean }) {
  const { t, ar } = useLang();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    ar
      ? "مرحباً بترينا، أود الاستفسار وحجز طاولة في اللاونج."
      : "Hello Bitrina, I would like to inquire and reserve a lounge table."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-full border border-[#D4A359]/50 bg-[#D4A359]/10 px-6 font-poppins font-semibold text-[#F3E0B5] transition-colors hover:border-[#D4A359] hover:bg-[#D4A359] hover:text-[#3B2319] ${
        compact ? "mt-6 w-full justify-center py-3.5 text-[13px]" : "mt-9 py-3.5 text-sm"
      }`}
    >
      <MessageSquare size={16} className="text-[#D4A359] transition-colors group-hover:text-[#3B2319]" />
      {t("about.cta_reserve")}
      <ArrowUpRight size={15} className="rtl:-scale-x-100" />
    </a>
  );
}

/** Ambient backdrop shared by both breakpoints: facade photo, gold halo, grain. */
function Backdrop() {
  return (
    <>
      <img
        src={getAssetPath("/brand/exterior.webp")}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.15] blur-[2px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 80% 0%, rgba(212,163,89,0.20) 0%, transparent 62%), linear-gradient(180deg, rgba(28,18,13,0.86) 0%, rgba(28,18,13,0.97) 55%, #1C120D 100%)",
        }}
      />
      <div aria-hidden className="vitrine-grain pointer-events-none absolute inset-0" />
    </>
  );
}

/** One lit shelf of the cabinet, with its museum placard. */
function Shelf({ index }: { index: number }) {
  const { t } = useLang();
  const shelf = SHELVES[index];

  return (
    <figure className="group relative h-[204px] overflow-hidden border-b border-[#D4A359]/15 last:border-b-0">
      <img
        src={getAssetPath(shelf.img)}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover saturate-[.8] brightness-[.7] transition-[transform,filter] duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:saturate-100 group-hover:brightness-95"
        style={{ objectPosition: shelf.pos }}
      />
      {/* Veil so the placard stays legible over any photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#120B07] via-[#120B07]/55 to-transparent"
      />
      {/* Shelf lip, and the light strip tucked underneath it */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F3E0B5]/70 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: "radial-gradient(ellipse at top, rgba(243,224,181,0.30) 0%, transparent 70%)",
        }}
      />

      <figcaption className="absolute bottom-6 start-7 end-7">
        <div className="translate-y-1 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <span className="font-poppins text-[10px] font-bold tracking-[.3em] text-[#D4A359]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-1 font-playfair text-xl font-bold leading-tight text-[#F3E0B5]">
            {t(shelf.name)}
          </h3>
          <p className="mt-1 max-w-md font-poppins text-[12.5px] leading-relaxed text-white/80">
            {t(shelf.note)}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/* ─── Desktop ─────────────────────────────────────────────────────────── */

export function AboutSectionDesktop() {
  const { t } = useLang();

  return (
    <section id="about" className="relative overflow-hidden bg-[#1C120D] py-28 text-white">
      <Backdrop />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-12 items-start gap-x-14">
          {/* The story */}
          <div className="col-span-5 pt-4">
            <Eyebrow />

            <h2 className="gradient-text-gold mt-6 font-playfair text-[44px] font-bold leading-[1.15]">
              {t("about.heading")}
            </h2>

            <p className="mt-7 font-poppins text-[15px] leading-[1.9] text-white/85">
              {t("about.p1")}
            </p>
            <p className="mt-4 font-poppins text-[15px] leading-[1.9] text-white/75">
              {t("about.p2")}
            </p>

            <PullQuote />
            <InfoRail />
            <ReserveCta />
          </div>

          {/* The vitrine */}
          <div className="col-span-7">
            <div className="vitrine-case relative rounded-[30px] p-3.5">
              <div className="relative overflow-hidden rounded-[20px] border border-[#D4A359]/25 bg-[#120B07]">
                {SHELVES.map((shelf, i) => (
                  <Shelf key={shelf.img} index={i} />
                ))}
              </div>

              {/* Glass: the seam between the two doors, then the specular sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-3.5 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D4A359]/35 to-transparent"
              />
              <span
                aria-hidden
                className="vitrine-sheen pointer-events-none absolute inset-3.5 rounded-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Mobile ──────────────────────────────────────────────────────────── */

export function AboutSectionMobile() {
  const { t } = useLang();
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Direction-agnostic active-shelf tracking; scrollLeft is unreliable under RTL.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.getAttribute("data-shelf")));
          }
        });
      },
      { root: rail, threshold: 0.6 }
    );

    rail.querySelectorAll("[data-shelf]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-mobile"
      className="relative -mx-5 w-[calc(100%+2.5rem)] mt-0 overflow-hidden rounded-none bg-[#1C120D] px-5 py-9 text-white shadow-[0_30px_60px_-25px_rgba(28,18,13,0.75)]"
    >
      <Backdrop />

      <div className="relative z-10">
        <Eyebrow />

        <h2 className="gradient-text-gold mt-5 font-playfair text-[27px] font-bold leading-[1.25]">
          {t("about.heading")}
        </h2>

        <p className="mt-4 font-poppins text-[13.5px] leading-[1.9] text-white/85">
          {t("about.p1")}
        </p>
        <p className="mt-3 font-poppins text-[13.5px] leading-[1.9] text-white/75">
          {t("about.p2")}
        </p>

        <PullQuote compact />

        {/* The vitrine, as sliding glass doors you swipe through */}
        <div className="vitrine-case relative mt-6 rounded-[24px] p-2.5">
          <div
            ref={railRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-2.5 overflow-x-auto rounded-[16px]"
            style={{ scrollbarWidth: "none" }}
          >
            {SHELVES.map((shelf, i) => (
              <figure
                key={shelf.img}
                data-shelf={i}
                className="relative aspect-4/5 w-[80%] shrink-0 snap-start overflow-hidden rounded-[15px] bg-[#120B07]"
              >
                <img
                  src={getAssetPath(shelf.img)}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover saturate-[.85] brightness-[.72]"
                  style={{ objectPosition: shelf.pos }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#120B07] via-[#120B07]/45 to-transparent"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F3E0B5]/70 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <span className="font-poppins text-[9px] font-bold tracking-[.3em] text-[#D4A359]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-playfair text-base font-bold leading-tight text-[#F3E0B5]">
                    {t(shelf.name)}
                  </h3>
                  <p className="mt-1 font-poppins text-[11.5px] leading-snug text-white/80">
                    {t(shelf.note)}
                  </p>
                </figcaption>
              </figure>
            ))}
            <div aria-hidden className="w-[24%] shrink-0" />
          </div>

          <span
            aria-hidden
            className="vitrine-sheen pointer-events-none absolute inset-2.5 rounded-[15px]"
          />
        </div>

        {/* Museum-style counter instead of generic carousel dots */}
        <div className="mt-3 flex items-center justify-between px-1">
          {/* dir="ltr" isolates the counter so RTL bidi does not reorder "01 / 03" */}
          <span
            dir="ltr"
            className="font-poppins text-[10px] font-bold tracking-[.3em] text-[#D4A359]"
          >
            {String(active + 1).padStart(2, "0")}
            <span className="text-white/40"> / {String(SHELVES.length).padStart(2, "0")}</span>
          </span>
          <div className="flex items-center gap-1.5">
            {SHELVES.map((shelf, i) => (
              <span
                key={shelf.img}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? "w-5 bg-[#D4A359]" : "w-1 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        <InfoRail compact />
        <ReserveCta compact />
      </div>
    </section>
  );
}
