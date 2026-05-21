import type { Metadata } from "next";
import { MAINTENANCE_SCHEDULE } from "@/data/maintenance";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Periyodik Bakım Planlayıcı",
  description:
    "Yamaha XMAX için kilometre bazlı bakım kalemleri: 1.000, 5.000, 10.000, 20.000 ve 40.000 km bakım planı, yağ ve filtre değişim periyotları.",
  alternates: { canonical: "/periyodik-bakim" }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Periyodik Bakım",
      item: `${SITE.url}/periyodik-bakim`
    }
  ]
};

const PRIORITY_TONE = {
  kritik: "border-yamaha-400/40 bg-yamaha-500/10 text-yamaha-100",
  yüksek: "border-white/10 bg-white/[0.04] text-carbon-100",
  normal: "border-white/[0.06] bg-white/[0.02] text-carbon-200"
} as const;

export default function MaintenancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Periyodik Bakım"
          title={
            <>
              Kilometre bazlı,
              <br className="hidden sm:block" />
              <span className="text-yamaha-300">tahmin değil, plan.</span>
            </>
          }
          description="XMAX'in servis aralıklarını sadeleştirdik. Her duraktaki bakım kalemleri, parça referansları ve önemli notlar tek sayfada."
        />
      </section>

      <section className="container-x space-y-6 py-12">
        {MAINTENANCE_SCHEDULE.map((stop, i) => (
          <Reveal key={stop.km} delay={i * 0.04}>
            <article className="glass gradient-edge p-6 sm:p-8">
              <header className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
                    {stop.label}
                  </div>
                  <h2 className="mt-2 h-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    {stop.km.toLocaleString("tr-TR")}{" "}
                    <span className="text-carbon-300">km</span>
                  </h2>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-carbon-300">
                  {stop.items.length} bakım kalemi
                </span>
              </header>

              {stop.note && (
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-carbon-200">
                  {stop.note}
                </p>
              )}

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {stop.items.map((it) => (
                  <li
                    key={it.task}
                    className={`rounded-xl border px-4 py-3 ${PRIORITY_TONE[it.priority]}`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">
                        {it.task}
                      </h3>
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-300">
                        {it.priority}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-carbon-200">
                      {it.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
