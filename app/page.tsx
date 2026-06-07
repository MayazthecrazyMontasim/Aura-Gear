import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero — players + "THE LAST DANCE" from the Stitch art; crisp HTML headline + buttons */}
      <section className="relative bg-[#08090b]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-home.png"
          alt="Aura & Gear — The Last Dance"
          className="block w-full select-none"
          draggable={false}
          fetchPriority="high"
        />

        <div className="absolute inset-x-0 bottom-0 top-[46%] flex flex-col items-center justify-center px-6 text-center">
          <p className="label-tech text-white/55">Established 2026</p>
          <h1 className="font-display mt-3 text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Where luxury meets lifestyle.
          </h1>
          <p className="mt-4 hidden max-w-md text-sm text-white/60 sm:block">
            Style that speaks, gear that performs.
          </p>

          <div className="mt-7 flex items-stretch">
            <Link
              href="/collection"
              className="label-tech flex items-center bg-white px-6 py-3.5 text-ink transition-colors hover:bg-surface-low sm:px-8 sm:py-4"
            >
              World Cup 2026 Collection
            </Link>
            <Link
              href="/about"
              className="label-tech flex items-center border border-l-0 border-white/35 px-6 py-3.5 text-white transition-colors hover:bg-white/10 sm:px-8 sm:py-4"
            >
              Brand Story
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
