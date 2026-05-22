import { Cog, Wind, Droplets, Wrench } from "lucide-react";
import {
  CAMSHAFT_SPECS,
  CAM_SERIES_TIERS,
  PERFORMANCE_INJECTORS,
  THROTTLE_BODY_UPGRADE,
  PORT_POLISH
} from "@/data/engine-cams";
import { Reveal } from "@/components/reveal";

const TIER_TONE = {
  cyan: "text-electric-cyan border-electric-cyan/30 bg-electric-cyan/[0.06]",
  yamaha: "text-yamaha-200 border-yamaha-400/30 bg-yamaha-500/[0.08]",
  violet: "text-electric-violet border-electric-violet/40 bg-electric-violet/[0.08]"
} as const;

export function EngineCamThrottle() {
  return (
    <section className="relative py-24" id="kam-kelebek">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-cyan/40 to-transparent"
        aria-hidden
      />
      <div className="container-x">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
            <Cog className="h-4 w-4" />
          </span>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
            Adım 5 · Eksantrik · Throttle Body · Enjektör
          </div>
        </div>

        <Reveal>
          <div className="mt-5 max-w-3xl">
            <h2 className="h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Hacim büyür —{" "}
              <span className="text-electric">nefes açılmalı.</span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
              Silindir genişlediğinde motor üst devirde nefes alamazsa hacimsel
              verim (VE) çöker. Dereceli eksantrik mili, büyük subaplar, geniş
              throttle body ve yüksek debili enjektör — dördü birlikte
              kurgulanır.
            </p>
          </div>
        </Reveal>

        {/* Cam series tiers */}
        <Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {CAM_SERIES_TIERS.map((t, i) => (
              <Reveal key={t.tier} delay={i * 0.05}>
                <div className="glass-quiet h-full p-6">
                  <div
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${TIER_TONE[t.tone as keyof typeof TIER_TONE]}`}
                  >
                    {t.tier}
                  </div>
                  <h3 className="mt-4 h-display text-lg font-semibold leading-tight text-white">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Camshaft technical table */}
        <Reveal>
          <div className="mt-10 glass overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="eyebrow">Eksantrik mili teknik verileri</div>
              <h3 className="mt-2 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
                Lift × Durasyon — güç eğrisini şekillendiren iki sayı.
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-carbon-200">
                Lift subapın açılma yüksekliği, durasyon ise açık kalma süresi.
                Yüksek lift hava kütlesini artırır, yüksek durasyon ram etkisini
                kullanır ama overlap büyüdükçe düşük devir tork kaybı yaşanır.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead>
                  <tr className="border-y border-white/[0.06] bg-white/[0.02]">
                    {[
                      "Marka / Model",
                      "Emme Lift",
                      "Egzoz Lift",
                      "Emme Durasyon",
                      "Egzoz Durasyon",
                      "Kullanım"
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CAMSHAFT_SPECS.map((c) => (
                    <tr
                      key={`${c.brand}-${c.model}`}
                      className="border-b border-white/[0.04] last:border-0 transition hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-5">
                        <div className="font-semibold text-white">{c.brand}</div>
                        <div className="mt-0.5 font-mono text-[11px] text-carbon-300">
                          {c.model}
                        </div>
                        {c.partCode && (
                          <div className="mt-0.5 font-mono text-[10px] text-electric-cyan">
                            {c.partCode}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-electric-cyan">
                        {c.intakeLift}
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-electric-cyan">
                        {c.exhaustLift}
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-white">
                        {c.intakeDuration ?? "—"}
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-white">
                        {c.exhaustDuration ?? "—"}
                      </td>
                      <td className="max-w-[280px] px-6 py-5 text-xs leading-relaxed text-carbon-300">
                        {c.use}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Throttle body + Injector */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Throttle body */}
          <Reveal>
            <div className="glass gradient-edge p-7 h-full">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-lg border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
                  <Wind className="h-4 w-4" />
                </span>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                  Gaz kelebeği · Throttle body
                </div>
              </div>
              <h3 className="mt-5 h-display text-xl font-semibold leading-tight text-white">
                Venturi daralmasını ortadan kaldır.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-carbon-200">
                XMAX stok kelebek çapı 37–38 mm. Ataka Racing CNC kelebekler
                40–42 mm ölçülerde gelir; çift enjektör yuvalı versiyon ikincil
                enjektörü kelebek üstünden püskürtür.
              </p>
              <ul className="mt-5 space-y-3">
                {THROTTLE_BODY_UPGRADE.map((t) => (
                  <li
                    key={t.diameter}
                    className={`rounded-xl border px-4 py-3 ${
                      t.isStock
                        ? "border-white/[0.05] bg-white/[0.015]"
                        : "border-white/[0.08] bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-sm font-semibold ${
                          t.isStock ? "text-carbon-200" : "text-electric-cyan"
                        }`}
                      >
                        {t.diameter}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                        {t.label}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-carbon-200">
                      {t.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Injector */}
          <Reveal delay={0.05}>
            <div className="glass gradient-edge p-7 h-full">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-lg border border-electric-violet/30 bg-electric-violet/10 text-electric-violet">
                  <Droplets className="h-4 w-4" />
                </span>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-violet">
                  Performans enjektörleri
                </div>
              </div>
              <h3 className="mt-5 h-display text-xl font-semibold leading-tight text-white">
                Duty cycle %90&apos;ı aşmasın — yoksa enjektör soğumaz.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-carbon-200">
                Stok enjektörün maksimum açık kalma süresinde püskürttüğü yakıt
                bore-up sonrası yetersiz kalır. 12 delikli yüksek akışlı
                enjektörler yakıtı daha ince zerreciklere ayırır.
              </p>
              <ul className="mt-5 space-y-3">
                {PERFORMANCE_INJECTORS.map((i) => (
                  <li
                    key={i.flow}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold text-electric-violet">
                        {i.flow}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                        {i.brand}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-white">{i.fits}</p>
                    <p className="mt-1 text-xs leading-relaxed text-carbon-300">
                      {i.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Port-Polish */}
        <Reveal>
          <div className="mt-10 glass gradient-edge p-7 sm:p-10">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-yamaha-400/30 bg-yamaha-500/10 text-yamaha-200">
                <Wrench className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                  Atölye işçiliği
                </div>
                <h3 className="mt-2 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {PORT_POLISH.title}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-carbon-200">
                  {PORT_POLISH.body}
                </p>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {PORT_POLISH.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex gap-2 rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3 text-xs leading-relaxed text-carbon-100"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
