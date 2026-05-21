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
            <span className="chip">
              <Wrench className="h-3 w-3 text-yamaha-300" />
              Nasıl Yapılır
            </span>
            <h2 className="mt-4 h-display text-balance text-3xl font-semibold leading-[1.05] text-white sm:text-4xl md:text-5xl">
              Adım adım,
              <br className="hidden sm:block" />
              <span className="text-yamaha-300">teorisiz mekanik.</span>
            </h2>
          </div>
          <Link
            href="/nasil-yapilir"
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-yamaha-100 sm:self-end"
          >
            Tüm rehberler
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {GUIDES.map((g, i) => (
          <Reveal key={g.slug} delay={i * 0.08}>
            <Link
              href={`/nasil-yapilir/${g.slug}`}
              className="panel gradient-border group flex h-full flex-col justify-between overflow-hidden p-7 transition hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="chip">{DIFFICULTY_LABEL[g.difficulty]}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-carbon-300">
                    <Clock className="h-3 w-3" />
                    {g.durationMinutes} dk
                  </span>
                </div>
                <h3 className="mt-6 h-display text-2xl font-semibold leading-tight text-white">
                  {g.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  {g.excerpt}
                </p>

                <ol className="mt-6 space-y-2 text-xs">
                  {g.steps.slice(0, 3).map((s, idx) => (
                    <li key={s.title} className="flex items-start gap-3 text-carbon-200">
                      <span className="mt-px font-mono text-[10px] font-semibold text-yamaha-300">
                        0{idx + 1}
                      </span>
                      <span className="leading-relaxed">{s.title}</span>
                    </li>
                  ))}
                  {g.steps.length > 3 && (
                    <li className="ml-7 font-mono text-[10px] uppercase tracking-[0.18em] text-yamaha-300">
                      +{g.steps.length - 3} adım
                    </li>
                  )}
                </ol>
              </div>
              <div className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-yamaha-100">
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
