import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GENERATIONS } from "@/data/generations";
import { Reveal } from "@/components/reveal";

export function GenerationStrip() {
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="chip">
              <span className="size-1.5 rounded-full bg-yamaha-300" />
              Jenerasyonlar
            </span>
            <h2 className="mt-4 h-display text-balance text-3xl font-semibold leading-[1.05] text-white sm:text-4xl md:text-5xl">
              Her motora göre
              <br className="hidden sm:block" />
              <span className="text-yamaha-300">karşılaştırılabilir veri.</span>
            </h2>
          </div>
          <Link
            href="/teknik-ozellikler"
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-yamaha-100 sm:self-end"
          >
            Hepsini gör
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {GENERATIONS.map((g, i) => (
          <Reveal key={g.slug} delay={i * 0.05}>
            <Link
              href={`/teknik-ozellikler/${g.slug}`}
              className="panel gradient-border group flex h-full flex-col justify-between p-6 transition hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    {g.yearRange}
                  </span>
                  <span className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-yamaha-200">
                    {g.euro}
                  </span>
                </div>
                <h3 className="mt-5 h-display text-2xl font-semibold leading-tight text-white">
                  {g.model}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-carbon-300">
                  {g.highlight}
                </p>
              </div>

              <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/[0.05]">
                <SpecCell
                  label="Beygir"
                  value={`${g.power.hp}`}
                  unit="hp"
                />
                <SpecCell
                  label="Tork"
                  value={`${g.torque.nm}`}
                  unit="Nm"
                />
                <SpecCell
                  label="Ağırlık"
                  value={`${g.weight.wet}`}
                  unit="kg"
                />
              </dl>

              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-yamaha-100">
                Tam profil
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SpecCell({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-ink-900 px-3 py-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-400">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="h-display text-xl font-semibold text-white">{value}</span>
        <span className="font-mono text-[10px] text-carbon-300">{unit}</span>
      </div>
    </div>
  );
}
