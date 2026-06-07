"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, SHIPPING } from "@/providers/CartProvider";
import { taka2 } from "@/lib/format";
import { ArrowLeft, ArrowRight, LockIcon } from "@/components/icons";

type Payment = "cod" | "bkash";

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, zone, clear } = useCart();
  const [payment, setPayment] = useState<Payment>("cod");
  const [placed, setPlaced] = useState(false);
  const [orderNo] = useState(
    () => "AG-" + Math.floor(100000 + Math.random() * 900000),
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlaced(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-[640px] px-5 py-28 text-center sm:px-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint-soft text-2xl text-mint">
          ✓
        </div>
        <h1 className="font-display mt-6 text-3xl font-bold">Order Confirmed</h1>
        <p className="mt-3 text-ink-soft">
          Thank you. Your order{" "}
          <span className="font-semibold text-ink">{orderNo}</span> has been
          placed and will arrive in signature Aura packaging within 2–3 business
          days.
        </p>
        <Link
          href="/collection"
          className="label-tech mt-8 inline-block rounded-[2px] bg-primary px-7 py-4 text-white transition-colors hover:bg-inverse"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-[640px] px-5 py-28 text-center sm:px-8">
        <h1 className="font-display text-3xl font-bold">Your bag is empty.</h1>
        <p className="mt-3 text-ink-soft">
          Add a jersey before heading to checkout.
        </p>
        <Link
          href="/collection"
          className="label-tech mt-8 inline-block rounded-[2px] bg-primary px-7 py-4 text-white transition-colors hover:bg-inverse"
        >
          Shop the Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-16">
      <Link
        href="/bag"
        className="label-tech inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Bag
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          <section>
            <h2 className="font-display text-2xl font-bold">
              Contact Information
            </h2>
            <Field id="email" label="Email Address" type="email" required />
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold">Delivery Details</h2>
            <Field id="name" label="Full Name" required />
            <Field id="phone" label="Contact Number / Phone Number" required />
            <Field id="address" label="Full Address" required />
            <Field id="city" label="City" required />
            <Field id="notes" label="Additional Notes (optional)" textarea />
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold">Payment</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
              <LockIcon className="h-4 w-4 text-mint" />
              All transactions are secure and encrypted.
            </p>

            <div className="mt-5 space-y-3">
              <PaymentOption
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
                title="Cash on Delivery"
                desc="Available strictly for orders inside Dhaka."
              />
              <PaymentOption
                checked={payment === "bkash"}
                onChange={() => setPayment("bkash")}
                title="bKash (Send Money)"
                desc="For orders outside of Dhaka. Please send to 017XXXXXXXX."
              />
            </div>
          </section>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-primary py-5 text-sm font-bold text-white transition-colors hover:bg-inverse"
          >
            Complete Order <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Summary */}
        <aside className="h-fit rounded-lg bg-surface-low p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4 border-b border-line/60 pb-6">
            {items.map((item) => (
              <div key={item.key} className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-surface-lowest">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.country}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.country} Jersey</p>
                  <p className="text-xs text-ink-soft">
                    {item.edition} · {item.jerseyType} · {item.size}
                    {item.qty > 1 ? ` · ×${item.qty}` : ""}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  {taka2(item.price * item.qty)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-b border-line/60 py-5">
            <input
              placeholder="Gift card or discount code"
              className="w-full bg-transparent text-sm outline-none placeholder:text-outline"
            />
            <button
              type="button"
              className="label-tech text-ink-soft hover:text-ink"
            >
              Apply
            </button>
          </div>

          <dl className="space-y-3 py-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd className="font-medium">{taka2(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">
                Shipping · {SHIPPING[zone].label}
              </dt>
              <dd className="font-medium">{taka2(shipping)}</dd>
            </div>
          </dl>

          <div className="flex items-center justify-between border-t border-line/60 pt-6">
            <span className="font-display text-xl font-bold">Total</span>
            <span className="font-display text-2xl font-bold">
              {taka2(total)}
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  textarea,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <div className="mt-6">
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          placeholder={label}
          className="w-full resize-none border-b border-line bg-transparent pb-2 text-sm outline-none transition-colors placeholder:text-ink-soft focus:border-primary"
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          placeholder={label}
          className="w-full border-b border-line bg-transparent pb-2 text-sm outline-none transition-colors placeholder:text-ink-soft focus:border-primary"
        />
      )}
    </div>
  );
}

function PaymentOption({
  checked,
  onChange,
  title,
  desc,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  desc: string;
}) {
  return (
    <label
      className={`flex cursor-pointer gap-3 rounded-[2px] border px-4 py-4 transition-colors ${
        checked ? "border-primary bg-surface-low" : "border-line hover:border-ink"
      }`}
    >
      <span
        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
          checked ? "border-primary" : "border-outline"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-primary" />}
      </span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-0.5 block text-sm text-ink-soft">{desc}</span>
      </span>
      <input
        type="radio"
        name="payment"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
}
