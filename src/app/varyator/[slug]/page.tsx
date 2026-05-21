import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { VARIATOR_BRANDS } from "@/data/variators";
import { GENERATIONS } from "@/data/generations";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return VARIATOR_BRANDS.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const brand = VARIATOR_BRANDS.find((b) => b.slug === params.slug);
  if (!brand) return {};
  return {
    title: `${brand.name} XMAX Modifikasyonu`,
    description: `${brand.name} XMAX uyumu, baga ağırlığı önerileri, artı ve eksileri. ${brand.positioning}`,
    alternates: { canonical: `/varyator/${brand.slug}` }
  };
}

const TIER_LABEL: Record<string, string> = {
  ekonomik: "Giriş",
  orta: "Orta",
  premium: "Premium"
};

export default function VariatorBrandPage({ params }: { params: Params }) {
  const brand = VARIATOR_BRANDS.find((b) => b.slug === params.slug);
  if (!brand) return notFound();

  const fits = GENERATIONS.filter((g) => brand.fitsGenerations.includes(g.slug));

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: brand.name,
    brand: { "@type": "Brand", name: brand.name.split(" ")[0] },
    category: "Motorcycle CVT Variator",
    description: brand.positioning,
    url: `${SITE.url}/varyator/${brand.slug}`
  };

  return (
    <article className="container-x py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Link
        href="/varyator"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-yamaha-100"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Varyatör listesi
      </Link>

      <Reveal>
        <header className="mt-6 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="chip">{TIER_LABEL[brand.pricingTier]}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
              {brand.origin}
            </span>
          </div>
          <h1 className="mt-4 h-display text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
            {brand.name}
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200">
            {brand.positioning}
          </p>
        </header>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="glass p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
              Artıları
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-carbon-100">
              {brand.pros.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-yamaha-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="glass p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
              Eksileri
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-carbon-100">
              {brand.cons.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-carbon-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-4 glass p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
            Baga Ağırlığı
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                Stok
              </div>
              <div className="h-display text-2xl font-semibold text-white">
                {brand.rollerWeights.stock} g
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                Önerilen
              </div>
              <div className="h-display text-2xl font-semibold text-yamaha-200">
                {brand.rollerWeights.recommended.map((r) => `${r}g`).join(" · ")}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-carbon-200">
            {brand.rollerWeights.rangeNote}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="glass-quiet p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                Yay (Stok)
              </div>
              <div className="mt-1 text-sm text-white">{brand.springRate.stock}</div>
            </div>
            <div className="glass-quiet p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                Yay Opsiyonları
              </div>
              <div className="mt-1 text-sm text-white">
                {brand.springRate.options.join(" · ")}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {fits.length > 0 && (
        <Reveal>
          <div className="mt-4 glass p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
              Uyumlu Jenerasyonlar
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {fits.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/teknik-ozellikler/${g.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-carbon-100 transition hover:border-yamaha-400/40 hover:bg-yamaha-500/10"
                  >
                    {g.model} · {g.yearRange}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      <Reveal>
        <div className="mt-4 glass gradient-edge p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
            Kime tavsiye
          </div>
          <p className="mt-3 text-base leading-relaxed text-carbon-100">
            {brand.bestFor}
          </p>
        </div>
      </Reveal>
    </article>
  );
}
