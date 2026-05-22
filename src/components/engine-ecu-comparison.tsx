import { Cpu, Zap, Smartphone, Sparkles, AlertTriangle, KeyRound } from "lucide-react";
import { ECU_BRANDS, ECU_LIMIT_REMOVAL } from "@/data/engine-ecus";
import { Reveal } from "@/components/reveal";

const TONE_MAP = {
  violet: {
    text: "text-electric-violet",
    border: "border-electric-violet/30",
    bg: "bg-electric-violet/10"
  },
  cyan: {
    text: "text-electric-cyan",
    border: "border-electric-cyan/30",
    bg: "bg-electric-cyan/10"
  }
} as const;

const LIMIT_ICONS = [Zap, AlertTriangle, KeyRound];

export function EngineEcuComparison() {
  return (
    <section className="relative py-24" id="ecu">
      <div className="container-x">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-yamaha-400/30 bg-yamaha-500/10 text-yamaha-200">
            <Cpu className="h-4 w-4" />
          </span>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
            Adım 3 · Ek Beyin · aRacer vs TuneBoss
          </div>
        </div>

        <Reveal>
          <div className="mt-5 max-w-3xl">
            <h2 className="h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Bore-up sonrası{" "}
              <span className="text-electric">stok ECU yetmez.</span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
              Orijinal beyin Euro 4/5 emisyonu ve tasarruf öncelikleriyle motorun
              gerçek potansiyelini kısıtlar. Artan hava kütlesini dengelemek,
              ateşleme haritasını ve enjektör süresini düzeltmek için bağımsız
              (standalone) ECU şarttır.
            </p>
          </div>
        </Reveal>

        {/* ECU brand cards */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {ECU_BRANDS.map((e, i) => {
            const tone = TONE_MAP[e.tone];
            return (
              <Reveal key={e.slug} delay={i * 0.05}>
                <article className="glass gradient-edge relative flex h-full flex-col overflow-hidden p-8">
                  <div
                    className={`pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full ${tone.bg} blur-3xl`}
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <span
                        className={`grid size-11 place-items-center rounded-xl border ${tone.border} ${tone.bg} ${tone.text}`}
                      >
                        <Cpu className="h-4 w-4" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                        {e.origin}
                      </span>
                    </div>

                    <h3 className="mt-6 h-display text-2xl font-semibold leading-tight text-white">
                      {e.name}
                    </h3>
                    <div className={`mt-1 font-mono text-[11px] uppercase tracking-[0.18em] ${tone.text}`}>
                      {e.models}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                      {e.positioning}
                    </p>

                    {/* Technical specs */}
                    <div className="mt-6 space-y-3">
                      <SpecRow icon={Cpu} label="İşlemci" value={e.mcu} />
                      <SpecRow icon={Sparkles} label="Harita boyutu" value={e.mappingDimension} />
                      <SpecRow icon={Zap} label="Ateşleme hassasiyeti" value={e.ignitionPrecision} />
                      <SpecRow icon={Smartphone} label="Uygulama" value={e.appExperience} />
                    </div>

                    {/* Race functions */}
                    <div className="mt-6">
                      <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${tone.text}`}>
                        Yarış / öne çıkan fonksiyonlar
                      </div>
                      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                        {e.raceFunctions.map((f) => (
                          <li
                            key={f}
                            className="flex gap-2 text-xs leading-relaxed text-carbon-100"
                          >
                            <span className={`mt-1.5 size-1 shrink-0 rounded-full ${e.tone === "violet" ? "bg-electric-violet" : "bg-electric-cyan"}`} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/30 p-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                        Kime
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-white">
                        {e.bestFor}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Limit removal cards */}
        <Reveal>
          <div className="mt-14 max-w-3xl">
            <div className="eyebrow">Devir limitinin kaldırılması</div>
            <h3 className="mt-2 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
              9000 RPM duvarı kalkar — ama bağlama göre.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-carbon-200">
              Orijinal ECU XMAX&apos;te 9000 RPM&apos;de keser. Bağımsız ECU bu sınırı
              donanım izin verdiği ölçüde 11000 RPM ve üzerine açar. Ancak
              etkisi motorun durumuna göre değişir.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ECU_LIMIT_REMOVAL.map((l, i) => {
            const Icon = LIMIT_ICONS[i];
            return (
              <Reveal key={l.label} delay={i * 0.05}>
                <div className="glass-quiet h-full p-6">
                  <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-yamaha-200">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h4 className="mt-4 h-display text-base font-semibold leading-tight text-white">
                    {l.label}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                    {l.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SpecRow({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Cpu;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3">
      <Icon className="h-3.5 w-3.5 shrink-0 text-carbon-300 mt-0.5" />
      <div className="min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-400">
          {label}
        </div>
        <div className="mt-0.5 text-xs leading-relaxed text-white">{value}</div>
      </div>
    </div>
  );
}
