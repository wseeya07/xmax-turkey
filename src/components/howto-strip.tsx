import Link from "next/link";
import { ArrowUpRight, Clock, Wrench } from "lucide-react";
import { GUIDES } from "@/data/guides";
import { Reveal } from "@/components/reveal";

const DIFFICULTY_LABEL = {
  kolay: "Kolay",
  orta: "Orta",
  ileri: "İleri"
} as const;

export function HowToStrip() {
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow flex items-center gap-2">
              <Wrench className="h-3 w-3 text-electric-cyan" />
              Mekanik rehberler
            </div>
            <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Adım adım, <span className="text-electric">teorisiz mekanik.</span>
            </h2>
          </div>
          <Link
            href="/nasil-yapilir"
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-electric-cyan sm:self-end"
          >
            Tüm rehberler
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {GUIDES.map((g, i) => (
          <Reveal key={g.slug} delay={i * 0.06}>
            <Link
              href={`/nasil-yapilir/${g.slug}`}
              className="glass gradient-edge group relative flex h-full flex-col justify-between overflow-hidden p-8 transition hover:-translate-y-0.5"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yamaha-500/20 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="chip">{DIFFICULTY_LABEL[g.difficulty]}</span>
                  <span className="chip">
                    <Clock className="h-3 w-3 text-electric-cyan" />
                    {g.durationMinutes} dk
                  </span>
                  <span className="chip">{g.steps.length} adım</span>
                </div>
                <h3 className="mt-7 h-display text-3xl font-semibold leading-tight text-white">
                  {g.title}
                </h3>
                <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-carbon-200">
                  {g.excerpt}
                </p>

                <ol className="mt-7 space-y-2 text-xs">
                  {g.steps.slice(0, 3).map((s, idx) => (
                    <li key={s.title} className="flex items-start gap-3 text-carbon-200">
                      <span className="mt-px font-mono text-[10px] font-semibold text-electric-cyan">
                        0{idx + 1}
                      </span>
                      <span className="leading-relaxed">{s.title}</span>
                    </li>
                  ))}
                  {g.steps.length > 3 && (
                    <li className="ml-7 font-mono text-[10px] uppercase tracking-[0.18em] text-electric-cyan">
                      +{g.steps.length - 3} adım
                    </li>
                  )}
                </ol>
              </div>
              <div className="relative mt-9 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-electric-cyan">
                Rehberi aç
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
