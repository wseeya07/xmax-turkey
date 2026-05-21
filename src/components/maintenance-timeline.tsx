import Link from "next/link";
import { ArrowUpRight, Timer } from "lucide-react";
import { MAINTENANCE_SCHEDULE } from "@/data/maintenance";
import { Reveal } from "@/components/reveal";

export function MaintenanceTimeline() {
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow flex items-center gap-2">
              <Timer className="h-3 w-3 text-electric-cyan" />
              Bakım
            </div>
            <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Kilometre değil,{" "}
              <span className="text-electric">bir plan.</span>
            </h2>
          </div>
          <Link
            href="/periyodik-bakim"
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-electric-cyan sm:self-end"
          >
            Tam takvim
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-12 glass relative overflow-hidden p-6 sm:p-10">
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-yamaha-400/40 to-transparent"
            aria-hidden
          />
          <ol className="relative grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {MAINTENANCE_SCHEDULE.map((stop, i) => (
              <li key={stop.km} className="relative">
                <div className="absolute left-5 top-5 size-2 rounded-full bg-electric-cyan shadow-[0_0_10px_2px_rgba(38,232,255,0.6)] sm:left-6" />
                <div className="pl-10 sm:pl-12">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                    {stop.label}
                  </div>
                  <div className="mt-1 h-display text-2xl font-semibold leading-tight text-white">
                    {stop.km.toLocaleString("tr-TR")}{" "}
                    <span className="text-carbon-300 text-base">km</span>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-carbon-200">
                    {stop.items.slice(0, 3).map((it) => (
                      <li key={it.task} className="flex gap-1.5">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                        <span>{it.task}</span>
                      </li>
                    ))}
                    {stop.items.length > 3 && (
                      <li className="font-mono text-[10px] uppercase tracking-[0.18em] text-electric-cyan">
                        +{stop.items.length - 3} kalem
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
