import type { Metadata } from "next";
import { TIRE_PRESSURE, TIRE_TIPS } from "@/data/tire-pressure";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "XMAX Lastik Basıncı Tablosu",
  description:
    "Yamaha XMAX 250, 300 ve Tech MAX modelleri için önerilen ön/arka lastik basıncı (tek kişi, çift kişi, yük). Soğuk değer.",
  alternates: { canonical: "/bilgi/lastik-basinci" }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Bilgi", item: `${SITE.url}/bilgi` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Lastik basıncı",
      item: `${SITE.url}/bilgi/lastik-basinci`
    }
  ]
};

export default function TirePressurePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Lastik basıncı"
          title={
            <>
              Soğuk değer,{" "}
              <span className="text-electric">doğru tutuş.</span>
            </>
          }
          description="Lastik basıncı XMAX'in en sık göz ardı edilen değişkeni. Doğru basınç jant sağlığını, viraj tutuşunu ve yakıt tüketimini etkiler."
        />
      </section>

      <section className="container-x py-10">
        <Reveal>
          <div className="glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    {[
                      "Model",
                      "Ön ölçü",
                      "Ön basınç (tek/çift)",
                      "Arka ölçü",
                      "Arka basınç (tek/çift)"
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIRE_PRESSURE.map((row) => (
                    <tr
                      key={row.model}
                      className="border-b border-white/[0.04] transition hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-5 font-semibold text-white">
                        {row.model}
                      </td>
                      <td className="px-5 py-5 font-mono text-xs text-carbon-100">
                        {row.size.front}
                      </td>
                      <td className="px-5 py-5">
                        <span className="font-mono text-sm text-white">
                          {row.front.solo.toFixed(2)}
                        </span>
                        <span className="font-mono text-xs text-carbon-300">
                          {" "}
                          /{" "}
                        </span>
                        <span className="font-mono text-sm text-electric-cyan">
                          {row.front.pillion.toFixed(2)}
                        </span>{" "}
                        <span className="font-mono text-[10px] text-carbon-400">
                          bar
                        </span>
                      </td>
                      <td className="px-5 py-5 font-mono text-xs text-carbon-100">
                        {row.size.rear}
                      </td>
                      <td className="px-5 py-5">
                        <span className="font-mono text-sm text-white">
                          {row.rear.solo.toFixed(2)}
                        </span>
                        <span className="font-mono text-xs text-carbon-300">
                          {" "}
                          /{" "}
                        </span>
                        <span className="font-mono text-sm text-electric-cyan">
                          {row.rear.pillion.toFixed(2)}
                        </span>{" "}
                        <span className="font-mono text-[10px] text-carbon-400">
                          bar
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-x py-12">
        <Reveal>
          <div className="eyebrow">İpuçları</div>
          <h2 className="mt-3 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Üç şey, kalanın kendiliğinden oturur.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TIRE_TIPS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <div className="glass-quiet p-6">
                <div className="eyebrow">Kural</div>
                <h3 className="mt-2 h-display text-lg font-semibold leading-tight text-white">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  {t.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
