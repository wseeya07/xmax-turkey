import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GENERATIONS } from "@/data/generations";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Teknik Özellikler Veritabanı",
  description:
    "Yamaha XMAX 250, XMAX 300 ve Tech MAX jenerasyonlarının karşılaştırmalı teknik tablosu: tork, beygir, ağırlık, parça kodları.",
  alternates: { canonical: "/teknik-ozellikler" }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Teknik Özellikler",
      item: `${SITE.url}/teknik-ozellikler`
    }
  ]
};

export default function SpecsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Teknik Özellikler"
          title={
            <>
              Tüm jenerasyonlar,
              <br className="hidden sm:block" />
              <span className="text-yamaha-300">yan yana.</span>
            </>
          }
          description="XMAX 250'den Tech MAX'e — motor değerleri, ağırlık, parça kodları ve yıllar tek tabloda."
        />
      </section>

      <section className="container-x py-12">
        <Reveal>
          <div className="panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    {[
                      "Model",
                      "Yıllar",
                      "Motor",
                      "Beygir",
                      "Tork",
                      "Ağırlık",
                      "Sele",
                      "Euro"
                    ].map((h) => (
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
                  {GENERATIONS.map((g) => (
                    <tr
                      key={g.slug}
                      className="border-b border-white/[0.04] transition hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/teknik-ozellikler/${g.slug}`}
                          className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-yamaha-200"
                        >
                          {g.model}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-carbon-100">
                        {g.yearRange}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-carbon-100">
                        {g.displacement}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-yamaha-200">
                        {g.power.hp} hp
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-yamaha-200">
                        {g.torque.nm} Nm
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-carbon-100">
                        {g.weight.wet} kg
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-carbon-100">
                        {g.seatHeight} mm
                      </td>
                      <td className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                        {g.euro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {GENERATIONS.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.05}>
              <Link
                href={`/teknik-ozellikler/${g.slug}`}
                className="panel gradient-border group flex h-full flex-col justify-between p-6 transition hover:-translate-y-0.5"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    {g.yearRange}
                  </span>
                  <h3 className="mt-3 h-display text-2xl font-semibold leading-tight text-white">
                    {g.model}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-carbon-300">
                    {g.highlight}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-yamaha-100">
                  Tam profil
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
