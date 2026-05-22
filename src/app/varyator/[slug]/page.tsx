import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, AlertTriangle, ArrowUpRight } from "lucide-react";
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
    title: `${brand.name} — XMAX Varyatör`,
    description: `${brand.name} XMAX uyumu, mühendislik detayları, parça kodları ve önerilen kombinasyonlar. ${brand.positioning}`,
    alternates: { canonical: `/varyator/${brand.slug}` }
  };
}

const TIER_LABEL: Record<string, string> = {
  ekonomik: "Giriş",
  orta: "Orta",
  premium: "Premium"
};

const TIER_TONE: Record<string, string> = {
  ekonomik: "from-electric-cyan/30",
  orta: "from-yamaha-500/30",
  premium: "from-electric-violet/30"
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
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-electric-cyan"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Varyatör hub
      </Link>

      {/* Hero */}
      <Reveal>
        <header className="relative mt-6 overflow-hidden rounded-3xl glass-frost gradient-edge p-8 sm:p-12">
          <div
            className={`pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br ${TIER_TONE[brand.pricingTier]} via-transparent blur-3xl`}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">{TIER_LABEL[brand.pricingTier]}</span>
              <span className="chip">{brand.origin}</span>
            </div>
            <h1 className="mt-5 h-display text-balance text-[clamp(2.4rem,5.4vw,4.5rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              {brand.name}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-carbon-200 sm:text-lg">
              {brand.positioning}
            </p>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/[0.06] sm:grid-cols-3">
              <Cell label="Baga sayısı" value={String(brand.rollerCount)} />
              <Cell label="Baga ölçüsü" value={brand.rollerSize} />
              <Cell label="Kit ağırlığı" value={brand.kitWeight} />
            </dl>
          </div>
        </header>
      </Reveal>

      {/* Engineering */}
      <Reveal>
        <div className="mt-6 glass p-6 sm:p-8">
          <div className="eyebrow">Mühendislik detayları</div>
          <h2 className="mt-2 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Bu markayı diğerlerinden ayıran ne?
          </h2>
          <ul className="mt-6 space-y-2 text-sm leading-relaxed text-carbon-100">
            {brand.engineering.map((e) => (
              <li key={e} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-electric-cyan" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Pros / Cons */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="glass p-6">
            <div className="eyebrow !text-yamaha-200">Artıları</div>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-carbon-100">
              {brand.pros.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-yamaha-300" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="glass p-6">
            <div className="eyebrow">Eksileri</div>
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

      {/* Risk warning */}
      {brand.riskNote && (
        <Reveal>
          <div className="mt-4 glass gradient-edge p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-300">
                  Mühendislik uyarısı
                </div>
                <p className="mt-2 text-sm leading-relaxed text-carbon-100">
                  {brand.riskNote}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* Baga / yay */}
      <Reveal>
        <div className="mt-4 glass p-6">
          <div className="eyebrow">Baga ağırlığı</div>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            {brand.rollerWeights.stock > 0 && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                  Stok
                </div>
                <div className="h-display text-2xl font-semibold text-white">
                  {brand.rollerWeights.stock} g
                </div>
              </div>
            )}
            {brand.rollerWeights.recommended.length > 0 && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                  Önerilen
                </div>
                <div className="h-display text-2xl font-semibold text-electric-cyan">
                  {brand.rollerWeights.recommended.map((r) => `${r}g`).join(" · ")}
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-carbon-200">
            {brand.rollerWeights.rangeNote}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                Yay (stok)
              </div>
              <div className="mt-1 text-sm text-white">{brand.springRate.stock}</div>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                Yay opsiyonları
              </div>
              <div className="mt-1 text-sm text-white">
                {brand.springRate.options.join(" · ")}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Parça kodları */}
      <Reveal>
        <div className="mt-4 glass p-6">
          <div className="eyebrow">Parça kodları</div>
          <ul className="mt-4 divide-y divide-white/[0.05]">
            {brand.productCodes.map((p) => (
              <li
                key={`${p.model}-${p.code}`}
                className="grid grid-cols-[1fr_auto] gap-4 py-3"
              >
                <span className="text-sm text-carbon-100">{p.model}</span>
                <span className="font-mono text-sm text-electric-cyan">
                  {p.code}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Uyumlu jenerasyonlar */}
      {fits.length > 0 && (
        <Reveal>
          <div className="mt-4 glass p-6">
            <div className="eyebrow">Uyumlu jenerasyonlar</div>
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

      {/* Tavsiye */}
      <Reveal>
        <div className="mt-4 glass gradient-edge p-6">
          <div className="eyebrow">Kime tavsiye</div>
          <p className="mt-3 text-base leading-relaxed text-carbon-100">
            {brand.bestFor}
          </p>
          <Link
            href="/varyator#setuplar"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-electric-cyan"
          >
            Bu markayla setup reçeteleri
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>
    </article>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink-900/80 px-5 py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
        {label}
      </div>
      <div className="mt-1.5 font-mono text-sm text-white">{value}</div>
    </div>
  );
}
