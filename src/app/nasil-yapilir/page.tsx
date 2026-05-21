import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { GUIDES } from "@/data/guides";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nasıl Yapılır Rehberleri",
  description:
    "XMAX varyatör bakımı, antifriz değişimi ve sistem havasının alınması — adım adım Türkçe mekanik rehberler.",
  alternates: { canonical: "/nasil-yapilir" }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Nasıl Yapılır",
      item: `${SITE.url}/nasil-yapilir`
    }
  ]
};

const DIFFICULTY_LABEL = {
  kolay: "Kolay",
  orta: "Orta",
  ileri: "İleri"
} as const;

export default function HowToIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Nasıl Yapılır"
          title={
            <>
              Mekanik bilgi,
              <br className="hidden sm:block" />
              <span className="text-yamaha-300">adım adım.</span>
            </>
          }
          description="Her rehber: gerekli aletler, parça referansları, sıralı adımlar ve kritik uyarılar. Servise gitmeden bilmen gerekenler burada."
        />
      </section>

      <section className="container-x grid gap-4 py-12 md:grid-cols-2">
        {GUIDES.map((g, i) => (
          <Reveal key={g.slug} delay={i * 0.06}>
            <Link
              href={`/nasil-yapilir/${g.slug}`}
              className="panel gradient-border group flex h-full flex-col justify-between p-7 transition hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="chip">{DIFFICULTY_LABEL[g.difficulty]}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-carbon-300">
                    <Clock className="h-3 w-3" />
                    {g.durationMinutes} dk
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-carbon-300">
                    {g.steps.length} adım
                  </span>
                </div>
                <h2 className="mt-6 h-display text-2xl font-semibold leading-tight text-white">
                  {g.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  {g.excerpt}
                </p>
              </div>
              <div className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-yamaha-100">
                Rehberi aç
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
