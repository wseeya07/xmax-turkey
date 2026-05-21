import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VARIATOR_BRANDS, ROLLER_GUIDE } from "@/data/variators";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Varyatör Modifikasyonları",
  description:
    "Yamaha XMAX için Malossi, Spectro ve TDR varyatör karşılaştırması. Baga ağırlığı seçim mantığı, debriyaj yayı ve tork koni rehberleri.",
  alternates: { canonical: "/varyator" }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Varyatör Modifikasyonları",
      item: `${SITE.url}/varyator`
    }
  ]
};

const TIER_LABEL: Record<string, string> = {
  ekonomik: "Giriş",
  orta: "Orta",
  premium: "Premium"
};

export default function VariatorIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Varyatör"
          title={
            <>
              Doğru varyatör,{" "}
              <span className="text-yamaha-300">doğru karakter.</span>
            </>
          }
          description="XMAX'in CVT sistemi, varyatör seçimine çok hassastır. Marka karakteri, baga ağırlığı ve yay seti tek tek motor hissini değiştirir. Aşağıda üç ana marka — tek bakışta okunur şekilde — karşılaştırıldı."
        />
      </section>

      <section className="container-x py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {VARIATOR_BRANDS.map((b, i) => (
            <Reveal key={b.slug} delay={i * 0.05}>
              <Link
                href={`/varyator/${b.slug}`}
                className="glass gradient-edge group flex h-full flex-col justify-between p-7 transition hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="chip">{TIER_LABEL[b.pricingTier]}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                      {b.origin}
                    </span>
                  </div>
                  <h2 className="mt-6 h-display text-2xl font-semibold leading-tight text-white">
                    {b.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                    {b.positioning}
                  </p>
                  <ul className="mt-5 space-y-1.5 text-xs leading-relaxed text-carbon-300">
                    {b.pros.slice(0, 2).map((p) => (
                      <li key={p} className="flex gap-1.5">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-yamaha-400" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-yamaha-100">
                  Marka detayı
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <Reveal>
          <div className="glass p-8 sm:p-10">
            <span className="chip">
              <span className="size-1.5 rounded-full bg-yamaha-300" />
              Baga Ağırlığı Rehberi
            </span>
            <h2 className="mt-4 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Gramaj nasıl seçilir?
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-carbon-200">
              {ROLLER_GUIDE.intro}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {ROLLER_GUIDE.rules.map((r) => (
                <div key={r.title} className="glass-quiet p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
                    Kural
                  </div>
                  <h3 className="mt-2 h-display text-lg font-semibold leading-tight text-white">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                    {r.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
