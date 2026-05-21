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
            <span className="chip">
              <Timer className="h-3 w-3 text-yamaha-300" />
              Bakım Takvimi
            </span>
            <h2 className="mt-4 h-display text-balance text-3xl font-semibold leading-[1.05] text-white sm:text-4xl md:text-5xl">
              Kilometre değil,
              <br className="hidden sm:block" />
              <span className="text-yamaha-300">bir plan.</span>
            </h2>
          </div>
          <Link
            href="/periyodik-bakim"
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-yamaha-100 sm:self-end"
          >
            Planlayıcıyı aç
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 panel p-6 sm:p-8">
          <div className="relative">
            <div
              className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-yamaha-500/40 to-transparent"
              aria-hidden
            />
            <ol className="relative grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {MAINTENANCE_SCHEDULE.map((stop, i) => (
                <li key={stop.km} className="flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-full border border-yamaha-400/30 bg-gradient-to-b from-yamaha-500/20 to-yamaha-700/10 font-mono text-[11px] font-semibold text-yamaha-100">
                      0{i + 1}
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                        {stop.label}
                      </div>
                      <div className="h-display text-xl font-semibold text-white">
                        {stop.km.toLocaleString("tr-TR")} km
                      </div>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-carbon-200">
                    {stop.items.slice(0, 3).map((it) => (
                      <li key={it.task} className="flex gap-1.5">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-yamaha-400" />
                        <span>{it.task}</span>
                      </li>
                    ))}
                    {stop.items.length > 3 && (
                      <li className="font-mono text-[10px] uppercase tracking-[0.18em] text-yamaha-300">
                        +{stop.items.length - 3} kalem
                      </li>
                    )}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
