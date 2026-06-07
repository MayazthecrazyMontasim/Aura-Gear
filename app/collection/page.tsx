import type { Metadata } from "next";
import { products } from "@/lib/products";
import JerseyCard from "@/components/JerseyCard";

export const metadata: Metadata = {
  title: "The World Cup 2026 Collection — Aura & Gear",
  description:
    "Explore our meticulously crafted range of national team kits, developed for elite performance and technical minimalism.",
};

export default function CollectionPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-16 lg:py-20">
      {/* Header */}
      <p className="label-tech text-mint">Excellence Redefined</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-[1.05] sm:text-5xl">
        The World Cup 2026 Collection
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
        Precision engineering meets athletic heritage. Explore our meticulously
        crafted range of national team kits, developed for elite performance and
        technical minimalism.
      </p>

      {/* Filter bar */}
      <div className="mt-12 flex items-center justify-between border-y border-line/60 py-4">
        <span className="label-tech text-ink">All Nations</span>
        <div className="flex items-center gap-6">
          <span className="label-tech text-outline">Sort</span>
          <span className="label-tech text-outline">
            {products.length} Items
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
        {products.map((p) => (
          <JerseyCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
