import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Clock, AlertTriangle, Lightbulb } from "lucide-react";
import { GUIDES } from "@/data/guides";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const g = GUIDES.find((x) => x.slug === params.slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.excerpt,
    alternates: { canonical: `/nasil-yapilir/${g.slug}` }
  };
}

const DIFFICULTY_LABEL = {
  kolay: "Kolay",
  orta: "Orta",
  ileri: "İleri"
} as const;

export default function GuidePage({ params }: { params: Params }) {
  const g = GUIDES.find((x) => x.slug === params.slug);
  if (!g) return notFound();

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: g.title,
    description: g.excerpt,
    totalTime: `PT${g.durationMinutes}M`,
    tool: g.tools.map((t) => ({ "@type": "HowToTool", name: t })),
    supply: g.parts.map((p) => ({ "@type": "HowToSupply", name: p })),
    step: g.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body
    })),
    url: `${SITE.url}/nasil-yapilir/${g.slug}`
  };

  return (
    <article className="container-x py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <Link
        href="/nasil-yapilir"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-yamaha-100"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Tüm rehberler
      </Link>

      <Reveal>
        <header className="mt-6 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="chip">{DIFFICULTY_LABEL[g.difficulty]}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-carbon-300">
              <Clock className="h-3 w-3" />
              {g.durationMinutes} dk
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-carbon-300">
              {g.steps.length} adım
            </span>
          </div>
          <h1 className="mt-4 h-display text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
            {g.title}
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200">
            {g.excerpt}
          </p>
        </header>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="glass p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
              Aletler
            </div>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-carbon-100">
              {g.tools.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-yamaha-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="glass p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
              Parçalar
            </div>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-carbon-100">
              {g.parts.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-yamaha-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <section className="mt-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
          Adımlar
        </div>
        <ol className="mt-6 space-y-4">
          {g.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <li className="glass gradient-edge p-6 sm:p-7">
                <div className="flex items-start gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-yamaha-400/30 bg-gradient-to-b from-yamaha-500/20 to-yamaha-700/10 font-mono text-sm font-semibold text-yamaha-100">
                    0{i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="h-display text-xl font-semibold leading-tight text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-carbon-100">
                      {s.body}
                    </p>
                    {s.tip && (
                      <div className="mt-4 flex gap-3 rounded-xl border border-yamaha-400/30 bg-yamaha-500/10 p-4 text-sm leading-relaxed text-yamaha-50">
                        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yamaha-200" />
                        <span>
                          <span className="font-semibold text-yamaha-100">İpucu — </span>
                          {s.tip}
                        </span>
                      </div>
                    )}
                    {s.warning && (
                      <div className="mt-4 flex gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm leading-relaxed text-red-50">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                        <span>
                          <span className="font-semibold text-red-200">Uyarı — </span>
                          {s.warning}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    </article>
  );
}
