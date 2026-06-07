"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Product, Edition } from "@/lib/products";
import { sizeGuide, PRICING } from "@/lib/products";
import { taka } from "@/lib/format";
import { useCart } from "@/providers/CartProvider";
import {
  ArrowLeft,
  ChevronDown,
  TruckIcon,
} from "@/components/icons";

type JerseyType = "Home" | "Away";

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState("M");
  const [jerseyType, setJerseyType] = useState<JerseyType>("Home");
  const [edition, setEdition] = useState<Edition>("Player");
  const [added, setAdded] = useState(false);
  const [openFit, setOpenFit] = useState(true);
  const [openFabric, setOpenFabric] = useState(false);
  const sizeGuideRef = useRef<HTMLDivElement>(null);

  const { price, regular } = PRICING[edition];
  const discountPct = Math.round((1 - price / regular) * 100);
  const image =
    jerseyType === "Home" ? product.image : `/jerseys/${product.slug}-away.png`;

  function handleAdd() {
    addItem({
      slug: product.slug,
      country: product.country,
      name: product.name,
      edition,
      jerseyType,
      size,
      price,
      image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-16">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-6">
        <Link
          href="/collection"
          className="label-tech inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Collection
        </Link>
        <nav className="label-tech text-outline">
          World Cup 2026 / Collections / Player Editions /{" "}
          <span className="text-ink">{product.country}</span>
        </nav>
      </div>

      <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-14">
        {/* Media gallery: 7 cols */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-lg border border-line/50 bg-white p-6 sm:p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={image}
              src={image}
              alt={`${product.country} World Cup 2026 ${jerseyType} jersey`}
              className="mx-auto aspect-[4/5] w-full object-contain"
            />
          </div>
          {product.gallery.length > 0 && (
            <div
              className={`mt-4 grid gap-4 ${
                product.gallery.length === 1 ? "grid-cols-2" : "grid-cols-2"
              }`}
            >
              {product.gallery.map((src) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-lg border border-line/50 bg-white p-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${product.country} jersey alternate view`}
                    loading="lazy"
                    className="aspect-square w-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info panel: 5 cols */}
        <div className="lg:col-span-5">
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            {product.name}
          </h1>

          {/* Size */}
          <div className="mt-8 flex items-center justify-between">
            <span className="label-tech text-ink">Select Size</span>
            <button
              type="button"
              onClick={() =>
                sizeGuideRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }
              className="label-tech text-outline underline-offset-4 hover:underline"
            >
              Size Guide
            </button>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-[2px] border py-3 text-sm font-semibold transition-colors ${
                  size === s
                    ? "border-primary bg-primary text-white"
                    : "border-line text-ink hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Jersey version */}
          <Toggle
            label="Jersey Version"
            options={["Home", "Away"]}
            value={jerseyType}
            onChange={(v) => setJerseyType(v as JerseyType)}
          />

          {/* Edition */}
          <Toggle
            label="Jersey Edition"
            options={["Player", "Fan"]}
            value={edition}
            onChange={(v) => setEdition(v as Edition)}
          />

          {/* Price */}
          <div className="mt-8 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-3xl font-bold">{taka(price)}</span>
            <span className="text-lg text-outline line-through">
              {taka(regular)}
            </span>
            <span className="label-tech rounded-full bg-mint-soft px-3 py-1 text-mint">
              Save {discountPct}%
            </span>
          </div>

          {/* Add to bag */}
          <button
            onClick={handleAdd}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-[2px] bg-primary py-4 text-sm font-bold text-white transition-colors hover:bg-inverse"
          >
            {added ? "Added to Bag ✓" : "Add to Bag"}
          </button>

          {/* Accordions */}
          <div className="mt-10 border-t border-line/50">
            <Accordion
              title="The Aura Fit"
              open={openFit}
              onToggle={() => setOpenFit((v) => !v)}
            >
              {edition === "Player" ? (
                <p>
                  Designed for the elite. The Player Edition features an
                  authentic, sculpted fit that sits close to the body,
                  minimizing distractions and maximizing aerodynamic efficiency.
                  Woven with minimal seams for a friction-free experience that
                  feels like a second skin.
                </p>
              ) : (
                <p>
                  Built for the stands. The Fan Edition offers a relaxed,
                  comfortable cut in the same signature Aura fabric — everyday
                  wearable, match-day ready.
                </p>
              )}
            </Accordion>
            <Accordion
              title="Fabric Technology"
              open={openFabric}
              onToggle={() => setOpenFabric((v) => !v)}
            >
              <p>
                Engineered with AeroWeave moisture-wicking yarns and
                laser-perforated ventilation zones. Recycled performance polyester
                keeps you dry, cool, and unrestricted through ninety minutes and
                beyond.
              </p>
            </Accordion>
          </div>

          {/* Size guide table */}
          <div ref={sizeGuideRef} className="mt-10 scroll-mt-24">
            <span className="label-tech text-ink">Size Guide</span>
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line/40 text-sm">
              <SizeTable title="Fan Version" rows={sizeGuide.fan} />
              <SizeTable title="Player Version" rows={sizeGuide.player} />
            </div>
            <p className="mt-3 text-xs text-outline">
              Measurements are body chest (in) for fit reference. Sizes run true
              to the Aura Fit chart.
            </p>
          </div>

          {/* Delivery */}
          <div className="mt-8 flex items-start gap-3 rounded-lg bg-surface-low p-4">
            <TruckIcon className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
            <div>
              <p className="text-sm font-semibold">Fast Delivery Service</p>
              <p className="mt-0.5 text-sm text-ink-soft">
                Delivered in signature Aura packaging within 2–3 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Toggle({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-6">
      <span className="label-tech text-ink">{label}</span>
      <div className="mt-3 grid grid-cols-2 gap-2 rounded-[2px] bg-surface-low p-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-[2px] py-2.5 text-sm font-semibold transition-colors ${
              value === o
                ? "bg-surface-lowest text-ink shadow-sm"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-line/50">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-base font-semibold">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-ink-soft transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-5 text-sm leading-relaxed text-ink-soft">
          {children}
        </div>
      )}
    </div>
  );
}

function SizeTable({
  title,
  rows,
}: {
  title: string;
  rows: { size: string; chestIn: number; lengthIn: number }[];
}) {
  return (
    <div className="bg-surface-lowest p-4">
      <p className="label-tech text-outline">{title}</p>
      <table className="mt-3 w-full text-xs">
        <thead>
          <tr className="text-outline">
            <th className="pb-2 text-left font-medium">Size</th>
            <th className="pb-2 text-right font-medium">Chest</th>
            <th className="pb-2 text-right font-medium">Length</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.size} className="border-t border-line/40">
              <td className="py-1.5 font-semibold text-ink">{r.size}</td>
              <td className="py-1.5 text-right text-ink-soft">{r.chestIn}″</td>
              <td className="py-1.5 text-right text-ink-soft">{r.lengthIn}″</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
