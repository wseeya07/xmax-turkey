import { Activity, Flame, Gauge, Thermometer } from "lucide-react";
import {
  AFR_ZONES,
  WIDEBAND_VS_NARROWBAND,
  BUNG_MOUNT_RULES,
  AUTOTUNE_LOOP
} from "@/data/engine-afr";
import { Reveal } from "@/components/reveal";

const TONE_MAP = {
  cyan: "border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan",
  yamaha: "border-yamaha-400/30 bg-yamaha-500/10 text-yamaha-200",
  violet: "border-electric-violet/30 bg-electric-violet/10 text-electric-violet",
  danger: "border-red-500/30 bg-red-500/10 text-red-300"
} as const;

export function EngineAfrSystem() {
  return (
    <section className="relative py-24" id="afr-wideband">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
        aria-hidden
      />
      <div className="container-x">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300">
            <Activity className="h-4 w-4" />
          </span>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-300">
            Adım 4 · Wideband AFR · Yanma Odası Sigortası
          </div>
        </div>

        <Reveal>
          <div className="mt-5 max-w-3xl">
            <h2 className="h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Hava-yakıt oranı —{" "}
              <span className="text-electric">motor ömrünün eşiği.</span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
              Tek silindirli yüksek performans bir motorda yanma odasındaki AFR
              ömrü belirleyen tek parametredir. Fakir kalan motor erir, zengin
              kalan yer atar — ama bilinçli zengin{" "}
              <strong className="text-white">soğutucu olarak çalışır</strong>.
            </p>
          </div>
        </Reveal>

        {/* AFR Zones */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {AFR_ZONES.map((z, i) => (
            <Reveal key={z.band} delay={i * 0.05}>
              <article className="glass gradient-edge relative flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span
                    className={`grid size-10 place-items-center rounded-xl border ${TONE_MAP[z.tone]}`}
                  >
                    {z.tone === "danger" ? (
                      <Flame className="h-4 w-4" />
                    ) : z.tone === "violet" ? (
                      <Gauge className="h-4 w-4" />
                    ) : (
                      <Thermometer className="h-4 w-4" />
                    )}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    {z.lambda}
                  </span>
                </div>

                <h3 className="mt-6 h-display text-xl font-semibold leading-tight text-white">
                  {z.band}
                </h3>
                <div
                  className={`mt-2 font-mono text-2xl font-semibold ${
                    z.tone === "danger"
                      ? "text-red-300"
                      : z.tone === "violet"
                      ? "text-electric-violet"
                      : "text-electric-cyan"
                  }`}
                >
                  {z.ratio}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                  {z.use}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                  {z.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Narrowband vs Wideband */}
        <Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {WIDEBAND_VS_NARROWBAND.map((s, i) => (
              <div
                key={s.title}
                className={`glass gradient-edge p-7 ${i === 1 ? "ring-1 ring-electric-cyan/20" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`grid size-9 place-items-center rounded-lg border ${
                      i === 0
                        ? "border-white/[0.08] bg-white/[0.04] text-carbon-200"
                        : "border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan"
                    }`}
                  >
                    <Activity className="h-4 w-4" />
                  </span>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    {i === 0 ? "OEM · Dar bant" : "Performans · Geniş bant"}
                  </div>
                </div>
                <h3 className="mt-5 h-display text-xl font-semibold leading-tight text-white">
                  {s.title}
                </h3>
                <div className="mt-3 rounded-xl border border-white/[0.05] bg-black/30 px-4 py-3">
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-400">
                    Ölçüm aralığı
                  </div>
                  <div className="mt-1 font-mono text-xs text-white">
                    {s.measureRange}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                  {s.capability}
                </p>
                <div className="mt-4 border-t border-white/[0.05] pt-3 text-xs text-carbon-300">
                  <span className="font-mono uppercase tracking-wider text-carbon-400">
                    Kullanım ·{" "}
                  </span>
                  {s.use}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Bung mounting rules */}
        <Reveal>
          <div className="mt-14 max-w-3xl">
            <div className="eyebrow">Egzoz bung (sensör yuvası) kaynağı</div>
            <h3 className="mt-2 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Yanlış açıda kaynak = sensör birkaç dakikada çatlar.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-carbon-200">
              Bosch LSU 4.9&apos;un seramik gövdesi 600 °C&apos;de çalışır.
              Soğuk start&apos;ta egzozda biriken su yoğuşması sensör başına
              damlarsa termal şokla kırılır. Aşağıdaki dört kural uyulduğunda
              sensör 60.000 km+ ömür gösterir.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {BUNG_MOUNT_RULES.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.05}>
              <div className="glass-quiet h-full p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                  Kural · 0{i + 1}
                </div>
                <h4 className="mt-2 h-display text-base font-semibold leading-tight text-white">
                  {r.label}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                  {r.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Auto-tune loop */}
        <Reveal>
          <div className="mt-14 glass overflow-hidden">
            <div className="grid gap-px bg-white/[0.06] md:grid-cols-4">
              {AUTOTUNE_LOOP.map((step) => (
                <div key={step.step} className="bg-ink-900/80 p-6">
                  <div className="font-mono text-2xl font-semibold text-electric-cyan">
                    {step.step}
                  </div>
                  <h4 className="mt-3 h-display text-sm font-semibold leading-tight text-white">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-electric-cyan/[0.08] to-electric-violet/[0.08] px-6 py-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                Auto-Tune Döngüsü
              </div>
              <p className="mt-1 text-sm text-white">
                aRacer AF2 veya TuneBoss AFR modülü Bosch LSU 4.9&apos;dan
                gelen pompalama akımını CAN-Bus üzerinden ECU&apos;ya iletir.
                Mevsimsel sıcaklık, rakım ve yakıt oktan dalgalanmalarına karşı
                motor sürekli optimum karışımda kalır.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
