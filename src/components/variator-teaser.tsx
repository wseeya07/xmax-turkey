import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { VARIATOR_BRANDS } from "@/data/variators";
import { Reveal } from "@/components/reveal";

const TIER_LABEL: Record<string, string> = {
  ekonomik: "Giriş",
  orta: "Orta",
  premium: "Premium"
};

export function VariatorTeaser() {
  return (
    <section className="relative py-24">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="chip">
                <Sparkles className="h-3 w-3 text-yamaha-300" />
                Varyatör Karşılaştırması
              </span>
              <h2 className="mt-4 h-display text-balance text-3xl font-semibold leading-[1.05] text-white sm:text-4xl md:text-5xl">
                Üç marka,
                <br className="hidden sm:block" />
                <span className="text-yamaha-300">üç farklı sürüş karakteri.</span>
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-carbon-200">
                Hangi varyatör ne için? Baga ağırlığı seçimi, fiyat segmenti ve
                karakter farkı yan yana — tek bakışta okunur.
              </p>
            </div>
            <Link
              href="/varyator"
              className="inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-yamaha-100 sm:self-end"
            >
              Tam karşılaştırma
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {VARIATOR_BRANDS.map((b, i) => (
            <Reveal key={b.slug} delay={i * 0.06}>
              <Link
                href={`/varyator/${b.slug}`}
                className="panel gradient-border group flex h-full flex-col justify-between overflow-hidden p-7 transition hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="chip">{TIER_LABEL[b.pricingTier]}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                      {b.origin}
                    </span>
                  </div>
                  <h3 className="mt-7 h-display text-2xl font-semibold leading-tight text-white">
                    {b.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                    {b.positioning}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-2">
                    <Stat label="Stok Baga" value={`${b.rollerWeights.stock} g`} />
                    <Stat
                      label="Önerilen"
                      value={b.rollerWeights.recommended.map((r) => `${r}g`).join(" · ")}
                    />
                  </dl>

                  <div className="mt-5 text-xs leading-relaxed text-carbon-300">
                    {b.rollerWeights.rangeNote}
                  </div>
                </div>

                <div className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-yamaha-100">
                  Markayı incele
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
        {label}
      </div>
      <div className="mt-1 font-mono text-sm text-white">{value}</div>
    </div>
  );
}
