import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { GENERATIONS } from "@/data/generations";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return GENERATIONS.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const g = GENERATIONS.find((x) => x.slug === params.slug);
  if (!g) return {};
  return {
    title: `${g.model} (${g.yearRange}) Teknik Özellikler`,
    description: `${g.model} jenerasyonu için motor, tork, beygir, ağırlık, parça kodları ve servis referansları.`,
    alternates: { canonical: `/teknik-ozellikler/${g.slug}` }
  };
}

export default function GenerationPage({ params }: { params: Params }) {
  const g = GENERATIONS.find((x) => x.slug === params.slug);
  if (!g) return notFound();

  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Motorcycle",
    name: g.model,
    vehicleModelDate: g.yearRange,
    brand: { "@type": "Brand", name: "Yamaha" },
    vehicleEngine: {
      "@type": "EngineSpecification",
      engineDisplacement: g.displacement,
      enginePower: {
        "@type": "QuantitativeValue",
        value: g.power.hp,
        unitText: "HP"
      }
    },
    weight: {
      "@type": "QuantitativeValue",
      value: g.weight.wet,
      unitText: "KGM"
    },
    url: `${SITE.url}/teknik-ozellikler/${g.slug}`
  };

  const specCells: { label: string; value: string }[] = [
    { label: "Motor", value: g.displacement },
    { label: "Beygir", value: `${g.power.hp} hp @ ${g.power.rpm} rpm` },
    { label: "Tork", value: `${g.torque.nm} Nm @ ${g.torque.rpm} rpm` },
    { label: "Ağırlık (ıslak)", value: `${g.weight.wet} kg` },
    { label: "Sele yüksekliği", value: `${g.seatHeight} mm` },
    { label: "Yakıt deposu", value: `${g.fuelTank} L` },
    ...(g.topSpeed ? [{ label: "Son hız (yaklaşık)", value: `${g.topSpeed} km/sa` }] : []),
    { label: "Emisyon", value: g.euro }
  ];

  const partRows: { label: string; value: string }[] = [
    { label: "Motor yağı", value: g.parts.engineOil },
    { label: "Final dişli yağı", value: g.parts.finalDrive },
    { label: "Antifriz", value: g.parts.coolant },
    { label: "Buji", value: g.parts.sparkPlug },
    { label: "Hava filtresi", value: g.parts.airFilter }
  ];

  return (
    <article className="container-x py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />

      <Link
        href="/teknik-ozellikler"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-yamaha-100"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Tüm jenerasyonlar
      </Link>

      <Reveal>
        <header className="mt-6 max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
            {g.yearRange} · {g.euro}
          </span>
          <h1 className="mt-4 h-display text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
            {g.model}
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200">
            {g.highlight}
          </p>
        </header>
      </Reveal>

      <Reveal>
        <div className="mt-10 panel gradient-border p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
            Motor & Şasi
          </div>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-4">
            {specCells.map((c) => (
              <div key={c.label} className="bg-ink-900 px-5 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                  {c.label}
                </dt>
                <dd className="mt-1.5 h-display text-lg font-semibold text-white">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-4 panel p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
            Servis Parçaları
          </div>
          <ul className="mt-4 divide-y divide-white/[0.05]">
            {partRows.map((r) => (
              <li
                key={r.label}
                className="grid grid-cols-[140px_1fr] gap-4 py-3 text-sm"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-carbon-300">
                  {r.label}
                </span>
                <span className="font-mono text-xs text-white">{r.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-4 panel p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
            İlgili Rehberler
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href="/periyodik-bakim"
              className="panel-quiet group flex items-center justify-between p-4 text-sm transition hover:bg-white/[0.05]"
            >
              <span>Periyodik bakım takvimi</span>
              <span className="text-yamaha-300 transition group-hover:text-yamaha-200">
                →
              </span>
            </Link>
            <Link
              href="/varyator"
              className="panel-quiet group flex items-center justify-between p-4 text-sm transition hover:bg-white/[0.05]"
            >
              <span>Bu modele uygun varyatörler</span>
              <span className="text-yamaha-300 transition group-hover:text-yamaha-200">
                →
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
