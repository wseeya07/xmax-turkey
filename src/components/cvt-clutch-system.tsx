import { Disc3, Snowflake, Wrench, Lock, Zap } from "lucide-react";
import { CLUTCHES, CONTRAST_SPRINGS } from "@/data/clutches";
import { Reveal } from "@/components/reveal";

const CATEGORY_ICON = {
  sokak: Disc3,
  ayarlanabilir: Wrench,
  kilitli: Lock,
  çan: Snowflake,
  yay: Zap
} as const;

const CATEGORY_LABEL = {
  sokak: "Sokak tipi",
  ayarlanabilir: "Ayarlanabilir",
  kilitli: "Kilitli (HiT)",
  çan: "Soğutmalı çan",
  yay: "Yay"
} as const;

export function CvtClutchSystem() {
  return (
    <section className="relative py-24" id="yol-3-debriyaj">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yamaha-400/40 to-transparent"
        aria-hidden
      />
      <div className="container-x">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl border border-yamaha-400/30 bg-yamaha-500/10 text-yamaha-200">
          <Lock className="h-4 w-4" />
        </span>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
          Yol 3 · Arka grup · Bağımsız uygulanabilir
        </div>
      </div>

      <Reveal>
        <div className="mt-5 max-w-3xl">
          <h2 className="h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
            Arka debriyaj —{" "}
            <span className="text-electric">ön varyatöre dokunmadan</span> kazanç.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
            Bu yol ön varyatörden bağımsız çalışır. Ön grup OEM kalsa bile;
            balata, çan ve kontrast yayı yükseltmesiyle{" "}
            <strong className="text-white">kaçırma sıfırlanır</strong>, ısı
            kontrol altına alınır, kavrama devri istenen RPM&apos;e çekilir.
            Yol 1 veya Yol 2 ile ayrıca kombine edilebilir.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {CLUTCHES.map((c, i) => {
          const Icon = CATEGORY_ICON[c.category];
          return (
            <Reveal key={c.slug} delay={i * 0.05}>
              <article className="glass gradient-edge relative flex h-full flex-col overflow-hidden p-7">
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-electric-violet/15 blur-3xl"
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-electric-cyan backdrop-blur-xl">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="chip">{CATEGORY_LABEL[c.category]}</span>
                  </div>

                  <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    {c.brand}
                  </div>
                  <h3 className="mt-1 h-display text-2xl font-semibold leading-tight text-white">
                    {c.product}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                    {c.positioning}
                  </p>

                  <ul className="mt-5 space-y-1.5 text-xs leading-relaxed text-carbon-200">
                    {c.engineering.map((e) => (
                      <li key={e} className="flex gap-2">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/30 p-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-yamaha-200">
                      Kazanç
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white">
                      {c.benefit}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.productCodes.map((p) => (
                      <span
                        key={p.code}
                        className="inline-flex items-baseline gap-2 rounded-md border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 font-mono text-[10px] text-carbon-200"
                      >
                        <span className="text-carbon-300">{p.model}</span>
                        <span className="text-electric-cyan">{p.code}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-10 glass p-7 sm:p-9">
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-electric-cyan" />
            <span className="eyebrow">Kontrast (tork) yayları</span>
          </div>
          <h3 className="mt-2 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Arka kasnağı kapatmaya çalışan yay.
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-carbon-200">
            Sert kontrast yayı kullanıldığında arka kasnağın açılması zorlaşır.
            Ön varyatörün kayışı dışarı itmesi için daha yüksek devir ve
            merkezkaç kuvveti gerekir — şanzıman uzun süre düşük viteste kalır,
            ara hızlanma olağanüstü agresifleşir.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.06]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    {["Marka", "Yay", "Sertlik (RPM)", "Etki", "Eşleştirme"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONTRAST_SPRINGS.map((s) => (
                    <tr
                      key={`${s.brand}-${s.name}`}
                      className="border-b border-white/[0.04] last:border-0"
                    >
                      <td className="px-5 py-4 font-semibold text-white">{s.brand}</td>
                      <td className="px-5 py-4 font-mono text-xs text-electric-cyan">
                        {s.name}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-yamaha-200">
                        ~{s.rpm}
                      </td>
                      <td className="max-w-[260px] px-5 py-4 text-xs leading-relaxed text-carbon-200">
                        {s.effect}
                      </td>
                      <td className="max-w-[220px] px-5 py-4 text-xs leading-relaxed text-carbon-300">
                        {s.pairing}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  );
}
