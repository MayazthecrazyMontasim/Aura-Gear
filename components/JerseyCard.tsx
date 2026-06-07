import Link from "next/link";
import type { Product } from "@/lib/products";

export default function JerseyCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group block hover-aura"
    >
      <div className="relative aspect-square overflow-hidden rounded border border-line/50 bg-white p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={`${product.country} World Cup 2026 jersey`}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-display text-base font-semibold tracking-tight text-ink">
          {product.country}
        </h3>
        <p className="label-tech mt-1.5 text-outline">Player / Fan Jersey</p>
      </div>
    </Link>
  );
}
