import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Aura & Gear",
  description:
    "Style that speaks, gear that performs. The studio and philosophy behind Aura & Gear.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 lg:py-28">
      <p className="label-tech text-mint">Our Story</p>
      <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] sm:text-6xl">
        Where luxury meets lifestyle.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Aura &amp; Gear builds technical athletic apparel for the next generation
        of performance. Founded in 2026, we sit at the intersection of
        architectural precision and editorial lightness — gear engineered to feel
        like a second skin, designed to look like nothing else on the pitch.
      </p>

      <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-line/40 sm:grid-cols-3">
        {[
          ["2026", "Founded"],
          ["7", "National kits"],
          ["2–3 days", "Aura delivery"],
        ].map(([stat, label]) => (
          <div key={label} className="bg-surface-lowest p-8">
            <p className="font-display text-3xl font-bold">{stat}</p>
            <p className="label-tech mt-2 text-outline">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">
            Precision engineering
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Every jersey is a meticulously crafted instrument of performance.
            AeroWeave yarns, laser-perforated ventilation, and minimal-seam
            construction deliver a friction-free experience for ninety minutes
            and beyond.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Athletic heritage</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            The World Cup 2026 Collection reimagines national identity through a
            disciplined, monochrome lens — letting the craft, the colour, and the
            crest command attention.
          </p>
        </div>
      </div>

      <Link
        href="/collection"
        className="label-tech mt-16 inline-block rounded-[2px] bg-primary px-7 py-4 text-white transition-colors hover:bg-inverse"
      >
        Explore the Collection
      </Link>
    </main>
  );
}
