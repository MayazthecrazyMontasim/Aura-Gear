"use client";

import Link from "next/link";
import { useCart, SHIPPING, type ShippingZone } from "@/providers/CartProvider";
import { taka } from "@/lib/format";
import { PlusIcon, MinusIcon } from "@/components/icons";

export default function BagPage() {
  const { items, count, subtotal, zone, shipping, total, setZone, setQty, removeItem } =
    useCart();

  return (
    <main className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 lg:px-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Shopping Bag
        </h1>
        <Link
          href="/collection"
          className="label-tech text-ink-soft underline-offset-4 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
      <p className="mt-2 text-sm text-ink-soft">
        {count} {count === 1 ? "item" : "items"}
      </p>

      {items.length === 0 ? (
        <div className="mt-16 rounded-lg bg-surface-low py-24 text-center">
          <p className="font-display text-xl font-semibold">Your bag is empty.</p>
          <p className="mt-2 text-sm text-ink-soft">
            Explore the World Cup 2026 Collection to get started.
          </p>
          <Link
            href="/collection"
            className="label-tech mt-6 inline-block rounded-[2px] bg-primary px-7 py-4 text-white transition-colors hover:bg-inverse"
          >
            Shop the Collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Items */}
          <div className="divide-y divide-line/50 border-y border-line/50">
            {items.map((item) => (
              <div key={item.key} className="flex gap-5 py-6">
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded bg-surface-low">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.country}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-display text-base font-semibold">
                        {item.country} Jersey
                      </h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        {item.edition} Version · {item.jerseyType} · Size{" "}
                        {item.size}
                      </p>
                      <span className="label-tech mt-3 inline-block rounded-full bg-mint-soft px-3 py-1 text-mint">
                        In Stock
                      </span>
                    </div>
                    <p className="font-display text-base font-semibold">
                      {taka(item.price * item.qty)}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center rounded-[2px] border border-line">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQty(item.key, item.qty - 1)}
                        className="grid h-9 w-9 place-items-center text-ink-soft hover:text-ink"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.qty}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQty(item.key, item.qty + 1)}
                        className="grid h-9 w-9 place-items-center text-ink-soft hover:text-ink"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="label-tech text-outline underline-offset-4 hover:text-ink hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-lg bg-surface-low p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-bold">Order Summary</h2>

            <p className="label-tech mt-6 text-outline">Shipping Location</p>
            <div className="mt-3 space-y-2">
              {(Object.keys(SHIPPING) as ShippingZone[]).map((z) => (
                <label
                  key={z}
                  className={`flex cursor-pointer items-center justify-between rounded-[2px] border px-4 py-3 text-sm transition-colors ${
                    zone === z
                      ? "border-primary bg-surface-lowest"
                      : "border-line hover:border-ink"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`grid h-4 w-4 place-items-center rounded-full border ${
                        zone === z ? "border-primary" : "border-outline"
                      }`}
                    >
                      {zone === z && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </span>
                    {SHIPPING[z].label}
                  </span>
                  <span className="text-ink-soft">{taka(SHIPPING[z].cost)}</span>
                  <input
                    type="radio"
                    name="zone"
                    className="sr-only"
                    checked={zone === z}
                    onChange={() => setZone(z)}
                  />
                </label>
              ))}
            </div>

            <dl className="mt-6 space-y-3 border-t border-line/60 pt-6 text-sm">
              <Row label="Subtotal" value={taka(subtotal)} />
              <Row label="Estimated Shipping" value={taka(shipping)} />
              <div className="flex justify-between text-ink-soft">
                <dt>Taxes</dt>
                <dd>Calculated at checkout</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-6">
              <span className="font-display text-lg font-bold">Total</span>
              <span className="font-display text-2xl font-bold">
                {taka(total)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block rounded-[2px] bg-primary py-4 text-center text-sm font-bold text-white transition-colors hover:bg-inverse"
            >
              Proceed to Checkout
            </Link>
            <p className="label-tech mt-4 text-center text-outline">
              Secure Checkout Powered by Aura
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
