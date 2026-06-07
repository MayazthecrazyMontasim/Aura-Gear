import Link from "next/link";
import { ArrowRight } from "./icons";

const cols = [
  { title: "Company", links: ["Our Mission", "Sustainability"] },
  { title: "Support", links: ["Contact"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.6fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              Aura &amp; Gear
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Style that speaks, Gear that performs.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="label-tech text-outline">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="/about"
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="label-tech text-outline">Newsletter</h4>
            <p className="mt-5 text-sm text-ink-soft">
              Join the archive list for early access.
            </p>
            <form
              action="#"
              className="mt-4 flex items-center border-b border-line pb-2"
            >
              <input
                type="email"
                required
                placeholder="email address"
                className="w-full bg-transparent text-sm outline-none placeholder:text-outline"
              />
              <button aria-label="Subscribe" type="submit">
                <ArrowRight className="h-5 w-5 text-ink" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line/50 pt-8 text-xs text-outline sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Aura &amp; Gear. All rights reserved.
            Precision Engineered.
          </p>
          <div className="flex gap-4">
            <Link href="#" aria-label="Instagram" className="hover:text-ink">
              <Dot />
            </Link>
            <Link href="#" aria-label="X" className="hover:text-ink">
              <Dot />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Dot() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="7" fillOpacity="0.25" />
    </svg>
  );
}
