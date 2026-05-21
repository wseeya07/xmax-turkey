import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[60dvh] place-items-center py-24">
      <div className="max-w-xl text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-yamaha-300">
          404 — Sayfa bulunamadı
        </div>
        <h1 className="mt-4 h-display text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
          Aradığın sayfa rotaya çıkmamış.
        </h1>
        <p className="mt-3 text-base text-carbon-200">
          Belki link bozuktur, belki içerik henüz yayında değil. Aşağıdan bir
          dikey seç.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-yamaha-400 to-yamaha-600 px-5 py-3 text-sm font-semibold text-white shadow-glow"
          >
            Ana sayfa
          </Link>
          <Link
            href="/teknik-ozellikler"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white"
          >
            Teknik özellikler
          </Link>
        </div>
      </div>
    </section>
  );
}
