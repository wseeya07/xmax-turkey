import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VARIATOR_BRANDS } from "@/data/variators";
import { Reveal } from "@/components/reveal";

const TIER_LABEL: Record<string, string> = {
  ekonomik: "Giriş",
  orta: "Orta",
  premium: "Premium"
};

const TIER_TONE: Record<string, string> = {
  ekonomik: "text-electric-cyan",
  orta: "text-yamaha-200",
  premium: "text-electric-violet"
};

export function VariatorTable() {
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">Performans · CVT</div>
            <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Üç marka, <span className="text-electric">üç karakter.</span>
            </h2>
          </div>
          <Link
            href="/varyator"
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-electric-cyan sm:self-end"
          >
            Tam karşılaştırma
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-12 glass overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  {["Marka", "Segment", "Stok baga", "Önerilen", "Yay opsiyon", "Karakter"].map((h) => (
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
                {VARIATOR_BRANDS.map((b) => (
                  <tr
                    key={b.slug}
                    className="group border-b border-white/[0.04] transition hover:bg-white/[0.025]"
                  >
                    <td className="px-6 py-5">
                      <Link
                        href={`/varyator/${b.slug}`}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] font-display text-base font-semibold ${TIER_TONE[b.pricingTier]}`}
                        >
                          {b.name.charAt(0)}
                        </span>
                        <div>
                          <div className="font-semibold text-white transition group-hover:text-electric-cyan">
                            {b.name}
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                            {b.origin}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`font-mono text-xs uppercase tracking-[0.22em] ${TIER_TONE[b.pricingTier]}`}>
                        {TIER_LABEL[b.pricingTier]}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-mono text-xs text-carbon-100">
                      {b.rollerWeights.stock} g
                    </td>
                    <td className="px-6 py-5 font-mono text-xs text-white">
                      {b.rollerWeights.recommended.map((r) => `${r}g`).join(" · ")}
                    </td>
                    <td className="px-6 py-5 font-mono text-xs text-carbon-200">
                      {b.springRate.options[0] ?? b.springRate.stock}
                    </td>
                    <td className="max-w-[280px] px-6 py-5 text-xs leading-relaxed text-carbon-200">
                      {b.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
