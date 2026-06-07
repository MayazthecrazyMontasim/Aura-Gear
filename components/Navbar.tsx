"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { SearchIcon, UserIcon, BagIcon } from "./icons";

const links = [
  { href: "/collection", label: "World Cup 2026" },
  { href: "/collection", label: "Collections" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === "/") return <HomeNav />;
  return <CenterNav />;
}

/* ---- Home: transparent, left wordmark + tagline, overlaid on the hero ---- */
function HomeNav() {
  const { count } = useCart();
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-16">
        <Link href="/" className="flex items-baseline gap-3 text-white">
          <span className="font-display text-xl font-bold tracking-tight">
            Aura &amp; Gear
          </span>
          <span className="hidden max-w-[180px] text-[9px] font-bold uppercase leading-[1.3] tracking-[0.18em] text-white/70 sm:block">
            Style that speaks, gear that performs
          </span>
        </Link>

        <div className="flex items-center gap-5 text-white">
          <button aria-label="Search" className="hidden sm:block">
            <SearchIcon className="h-5 w-5 transition-opacity hover:opacity-70" />
          </button>
          <Link href="/about" aria-label="Account" className="hidden sm:block">
            <UserIcon className="h-5 w-5 transition-opacity hover:opacity-70" />
          </Link>
          <Link href="/bag" aria-label="Bag" className="relative">
            <BagIcon className="h-5 w-5 transition-opacity hover:opacity-70" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-white px-1 text-[10px] font-bold text-ink">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

/* ---- Inner pages: sticky, centered wordmark, left links ---- */
function CenterNav() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-surface/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-16">
        <div className="flex flex-1 items-center gap-7">
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="label-tech md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="label-tech text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="font-display text-lg font-bold tracking-[0.18em] sm:text-xl"
        >
          AURA &amp; GEAR
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <button aria-label="Search" className="hidden sm:block">
            <SearchIcon className="h-5 w-5 text-ink transition-colors hover:text-mint" />
          </button>
          <Link href="/about" aria-label="Account" className="hidden sm:block">
            <UserIcon className="h-5 w-5 text-ink transition-colors hover:text-mint" />
          </Link>
          <Link href="/bag" aria-label="Bag" className="relative">
            <BagIcon className="h-5 w-5 text-ink transition-colors hover:text-mint" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line/60 bg-surface px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="label-tech block py-3 text-ink-soft"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
