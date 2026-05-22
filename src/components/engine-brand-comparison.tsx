import { Boxes, ShieldCheck, AlertTriangle } from "lucide-react";
import { ENGINE_KIT_BRANDS, SEGMENT_LABEL, SEGMENT_TONE } from "@/data/engine-kits";
import { Reveal } from "@/components/reveal";

export function EngineBrandComparison() {
  return (
    <section className="relative py-24" id="markalar">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-violet/40 to-transparent"
        aria-hidden
      />
      <div className="container-x">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-electric-violet/30 bg-electric-violet/10 text-electric-violet">
            <Boxes className="h-4 w-4" />
          </span>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-violet">
            Adım 2 · Marka Savaşları · TDR · BRT · S90
          </div>
        </div>

        <Reveal>
          <div className="mt-5 max-w-3xl">
            <h2 className="h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Üç felsefe,{" "}
              <span className="text-electric">üç farklı silindir.</span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
              Uzak Doğu performans atölyelerinde üç büyük marka öne çıkar. Aynı
              hacmi farklı yapı, ağırlık ve termal mimariyle elde ederler —
              hangisinin senin kullanımına uyduğu bu farklara bakarak çözülür.
            </p>
          </div>
        </Reveal>

        {/* Brand cards */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {ENGINE_KIT_BRANDS.map((b, i) => (
            <Reveal key={b.slug} delay={i * 0.05}>
              <article className="glass gradient-edge group relative flex h-full flex-col overflow-hidden p-7">
                <div
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-electric-violet/15 blur-3xl"
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid size-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] font-display text-base font-semibold ${SEGMENT_TONE[b.segment]}`}
                    >
                      {b.name.charAt(0)}
                    </span>
                    <span
                      className={`rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] ${SEGMENT_TONE[b.segment]}`}
                    >
                      {SEGMENT_LABEL[b.segment]}
                    </span>
                  </div>

                  <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    {b.origin}
                  </div>
                  <h3 className="mt-1 h-display text-2xl font-semibold leading-tight text-white">
                    {b.name}
                  </h3>
                  <div className="mt-1 font-mono text-[11px] text-carbon-300">
                    {b.partCode}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                    {b.positioning}
                  </p>

                  {/* Spec grid */}
                  <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.06]">
                    <Spec label="Gövde" value={b.bodyMaterial} />
                    <Spec label="Gömlek" value={b.sleeveTech} />
                    <Spec label="Ağırlık" value={b.weightCharacter} />
                    <Spec label="Isı Dağıtım" value={b.thermalDissipation} />
                    <Spec label="Deformasyon" value={b.deformationResistance} full />
                  </dl>

                  {/* Pros / Cons */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                        <ShieldCheck className="h-3 w-3" />
                        Artı
                      </div>
                      <ul className="mt-2 space-y-1.5">
                        {b.pros.map((p) => (
                          <li
                            key={p}
                            className="flex gap-2 text-xs leading-relaxed text-carbon-100"
                          >
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                        <AlertTriangle className="h-3 w-3" />
                        Eksi
                      </div>
                      <ul className="mt-2 space-y-1.5">
                        {b.cons.map((c) => (
                          <li
                            key={c}
                            className="flex gap-2 text-xs leading-relaxed text-carbon-200"
                          >
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-yamaha-200" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/30 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                      En iyi kullanım
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white">
                      {b.bestUse}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spec({
  label,
  value,
  full = false
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={`bg-ink-900/80 px-4 py-3 ${full ? "col-span-2" : ""}`}>
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-400">
        {label}
      </div>
      <div className="mt-1 text-xs text-white leading-snug">{value}</div>
    </div>
  );
}
