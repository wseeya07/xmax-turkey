import type { Metadata } from "next";
import { ERROR_CODES, SYSTEM_LEGEND } from "@/data/error-codes";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "XMAX Hata Kodları Sözlüğü",
  description:
    "Yamaha XMAX için ECU, ABS, TCS ve Immobilizer hata kodlarının anlamları, olası sebepleri ve çözüm yolları.",
  alternates: { canonical: "/bilgi/hata-kodlari" }
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
      name: "Hata kodları",
      item: `${SITE.url}/bilgi/hata-kodlari`
    }
  ]
};

const SEVERITY_TONE: Record<string, string> = {
  kritik: "border-red-500/40 bg-red-500/10 text-red-200",
  yüksek: "border-yamaha-400/30 bg-yamaha-500/10 text-yamaha-100",
  orta: "border-white/[0.08] bg-white/[0.03] text-carbon-200"
};

export default function ErrorCodesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Hata kodları"
          title={
            <>
              Pano uyarıyor,{" "}
              <span className="text-electric">sebebi okunur.</span>
            </>
          }
          description="Yanıp sönen ECU lambası bir sayı dizisi söyler. ABS ve TCS uyarıları ayrı semboller verir. Aşağıdaki sözlük her birinin anlamını ve çözüm sırasını gösterir."
        />
      </section>

      <section className="container-x py-8">
        <div className="flex flex-wrap gap-2">
          {Object.entries(SYSTEM_LEGEND).map(([code, label]) => (
            <span key={code} className="chip">
              <span className="size-1.5 rounded-full bg-electric-cyan" />
              {code} — {label}
            </span>
          ))}
        </div>
      </section>

      <section className="container-x space-y-3 py-8">
        {ERROR_CODES.map((e, i) => (
          <Reveal key={e.code} delay={i * 0.03}>
            <article className="glass gradient-edge p-6 sm:p-7">
              <header className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-2xl font-semibold tracking-tightish text-white sm:text-3xl">
                  {e.code}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${SEVERITY_TONE[e.severity]}`}
                >
                  {e.severity}
                </span>
                <span className="chip">{e.system}</span>
                <h2 className="basis-full sm:basis-auto sm:flex-1 h-display text-lg font-semibold leading-tight text-white sm:text-xl">
                  {e.title}
                </h2>
              </header>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-carbon-200">
                {e.description}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="eyebrow">Olası sebepler</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-carbon-100">
                    {e.causes.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-electric-cyan" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="eyebrow">Çözüm sırası</div>
                  <ol className="mt-3 space-y-1.5 text-sm text-carbon-100">
                    {e.fixes.map((f, idx) => (
                      <li key={f} className="flex gap-2.5">
                        <span className="font-mono text-[11px] font-semibold text-electric-cyan">
                          0{idx + 1}
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
