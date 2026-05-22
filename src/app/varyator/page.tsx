import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Gauge, AlertTriangle, Flame, Droplets } from "lucide-react";
import { VARIATOR_BRANDS } from "@/data/variators";
import { OEM_ROLLERS, SLIDING_ROLLER, MIXING_RULES } from "@/data/rollers";
import { Reveal } from "@/components/reveal";
import { CvtWorkshopTechniques } from "@/components/cvt-workshop-techniques";
import { CvtClutchSystem } from "@/components/cvt-clutch-system";
import { CvtSetupRecipes } from "@/components/cvt-setup-recipes";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Varyatör (CVT) — Modifikasyon Rehberi",
  description:
    "Yamaha XMAX 250, 300 ve 400 için varyatör ve debriyaj modifikasyon rehberi: Malossi, Polini, J.Costa ve TDR markaları, baga mühendisliği, Bubut Derajat ve Kerok Jalur atölye sırları, 7 setup reçetesi.",
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
      name: "Varyatör",
      item: `${SITE.url}/varyator`
    }
  ]
};

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

const TOC = [
  { href: "#markalar", label: "Markalar" },
  { href: "#baga-muhendisligi", label: "Baga mühendisliği" },
  { href: "#atolye-sirlari", label: "Atölye sırları" },
  { href: "#debriyaj", label: "Debriyaj" },
  { href: "#setuplar", label: "Setup reçeteleri" },
  { href: "#isi-yaglama", label: "Isı + yağlama" }
];

export default function VariatorHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-24">
        <div className="absolute inset-0 grid-faint" aria-hidden />
        <div
          className="pointer-events-none absolute -top-40 left-1/3 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-yamaha-500/20 blur-[140px]"
          aria-hidden
        />
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <span className="chip">
                <Gauge className="h-3 w-3 text-electric-cyan" />
                CVT · Sürekli Değişken Şanzıman
              </span>
              <h1 className="mt-6 h-display text-balance text-[clamp(2.5rem,6.5vw,5rem)] font-semibold leading-tighter-display tracking-tightest text-white">
                <span className="text-fade">Motorun gücünü</span>
                <br />
                <span className="text-fade">tekerleğe ileten</span>
                <br />
                <span className="text-electric">en kritik organ.</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-carbon-200 sm:text-lg">
                XMAX&apos;in motor karakterini, tork eğrisini ve son hızını fabrika
                ayarı değil — varyatör, baga, debriyaj ve kontrast yayı birlikte
                belirler. Yamaha emisyon ve ekonomi için kalibre ediyor; gerçek
                güç bandına ulaşmak ayarla geliyor.
              </p>

              <nav className="mt-8 flex flex-wrap gap-2">
                {TOC.map((t) => (
                  <a
                    key={t.href}
                    href={t.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs font-medium text-carbon-200 backdrop-blur-xl transition hover:border-white/15 hover:text-white"
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="glass-frost gradient-edge relative overflow-hidden p-6">
              <div className="eyebrow">Sistem anatomisi</div>
              <div className="mt-4 grid gap-3">
                <Anatomy
                  step="01"
                  title="Ön varyatör (drive pulley)"
                  body="Motor mili üzerinde döner. Baga (roller) ağırlığı + kasnak yanak açısı kayışın çapını belirler — yani vites oranını."
                />
                <Anatomy
                  step="02"
                  title="Kayış (drive belt)"
                  body="Ön ve arka kasnak arasında gücü iletir. Aşınma ve sıcaklık limiti kritik."
                />
                <Anatomy
                  step="03"
                  title="Arka debriyaj + kontrast yayı"
                  body="Balata, çan, kontrast yayı. Devir yükselince balata çana yapışır, gücü arka tekerleğe aktarır."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKALAR */}
      <section className="container-x py-24" id="markalar">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow">Performans markaları</div>
            <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Dört marka,{" "}
              <span className="text-electric">dört felsefe.</span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
              İtalya, İspanya ve Güneydoğu Asya&apos;nın CVT mühendislik okulları —
              aynı problemi farklı çözüyor. Baga sayısı, geometri, yağlama,
              kasnak açısı tercihleri marka karakterini belirliyor.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    {[
                      "Marka",
                      "Menşei",
                      "Baga sayısı / ölçü",
                      "Kit ağırlık",
                      "Segment",
                      "Karakter"
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300"
                      >
                        {h}
                      </th>
                    ))}
                    <th className="px-5 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {VARIATOR_BRANDS.map((b) => (
                    <tr
                      key={b.slug}
                      className="group border-b border-white/[0.04] transition hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
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
                              {b.productCodes[0]?.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 font-mono text-xs text-carbon-100">
                        {b.origin}
                      </td>
                      <td className="px-5 py-5 font-mono text-xs text-white">
                        {b.rollerCount} × {b.rollerSize}
                      </td>
                      <td className="px-5 py-5 font-mono text-xs text-carbon-200">
                        {b.kitWeight}
                      </td>
                      <td className="px-5 py-5">
                        <span
                          className={`font-mono text-xs uppercase tracking-[0.22em] ${TIER_TONE[b.pricingTier]}`}
                        >
                          {TIER_LABEL[b.pricingTier]}
                        </span>
                      </td>
                      <td className="max-w-[280px] px-5 py-5 text-xs leading-relaxed text-carbon-200">
                        {b.bestFor}
                      </td>
                      <td className="px-5 py-5">
                        <Link
                          href={`/varyator/${b.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-electric-cyan"
                        >
                          Aç
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      {/* BAGA MÜHENDİSLİĞİ */}
      <section className="container-x py-24" id="baga-muhendisligi">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div>
              <div className="eyebrow">Roller weight</div>
              <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
                Baga{" "}
                <span className="text-electric">mühendisliği.</span>
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
                Vites değişiminin ne zaman gerçekleştiğini varyatör bagalarının
                kütlesi belirler. Merkezkaç kuvveti formülü:
              </p>
              <div className="mt-5 rounded-2xl border border-white/[0.06] bg-black/40 px-5 py-4 font-mono text-sm text-electric-cyan">
                F<sub>c</sub> = m · ω² · r
              </div>
              <p className="mt-3 text-xs leading-relaxed text-carbon-300">
                m: baga kütlesi · ω: varyatörün açısal hızı (motor devri) · r: baganın dönme eksenine mesafesi
              </p>
              <p className="mt-5 text-sm leading-relaxed text-carbon-200">
                Kütle azaldıkça aynı kuvvete ulaşmak için motor daha yüksek
                devire çıkmak zorundadır → hafif baga = agresif kalkış. Kütle
                arttıkça erken upshift olur → ağır baga = ekonomi/konfor.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="glass gradient-edge overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      {["Model grubu", "Baga ölçü", "OEM ağırlık", "Parça kodu", "Kayış"].map((h) => (
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
                    {OEM_ROLLERS.map((r) => (
                      <tr
                        key={r.modelGroup}
                        className="border-b border-white/[0.04] last:border-0"
                      >
                        <td className="px-5 py-4 text-sm font-semibold text-white">
                          {r.modelGroup}
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-electric-cyan">
                          {r.size}
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-white">
                          {r.oemWeight}
                        </td>
                        <td className="px-5 py-4 font-mono text-[11px] text-carbon-200">
                          {r.partCode}
                        </td>
                        <td className="px-5 py-4 font-mono text-[11px] text-carbon-300">
                          {r.belt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Sliding teknolojisi */}
        <Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {SLIDING_ROLLER.map((s) => (
              <div key={s.title} className="glass-quiet p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                  Dr. Pulley sliding
                </div>
                <h3 className="mt-2 h-display text-lg font-semibold leading-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mixing rules */}
        <Reveal>
          <div className="mt-10 glass p-7 sm:p-9">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-yamaha-200" />
              <span className="eyebrow">Mixing weights</span>
            </div>
            <h3 className="mt-2 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Karışım kuralları
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-carbon-200">
              {MIXING_RULES.intro}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {MIXING_RULES.rules.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                    Kural
                  </div>
                  <h4 className="mt-2 h-display text-base font-semibold leading-tight text-white">
                    {r.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ATÖLYE SIRLARI */}
      <CvtWorkshopTechniques />

      {/* DEBRIYAJ */}
      <CvtClutchSystem />

      {/* SETUP REÇETELERİ */}
      <CvtSetupRecipes />

      {/* ISI + YAĞLAMA UYARILARI */}
      <section className="container-x py-24" id="isi-yaglama">
        <Reveal>
          <div className="glass-frost gradient-edge relative overflow-hidden p-10 sm:p-16">
            <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-red-500/15 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-electric-ember" />
                  <span className="eyebrow !text-electric-ember">Isı yönetimi</span>
                </div>
                <h2 className="mt-3 h-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  CVT odası aşırı ısınırsa şanzıman düşer.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                  Kayış yumuşar, bagalar erir, debriyaj balatası camlaşır. Asya
                  atölyelerinin standart prosedürü:
                </p>
                <ul className="mt-5 space-y-2 text-sm text-carbon-100">
                  <li className="flex gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                    Sünger filtre yerine metal tel süzgeç → hava akışı +%40
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                    YP250 fan yanağı entegrasyonu eski blok için
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-red-400" />
                    Kapağa direkt delik açmak yağmurda kayış suyla kaplanır,
                    sokak motorunda <strong className="text-red-300">yapılmaz</strong>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-electric-cyan" />
                  <span className="eyebrow">Yağlama protokolü</span>
                </div>
                <h2 className="mt-3 h-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Yanlış gres şanzımanı yok eder.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                  Standart rulman gresi yüksek sıcaklıkta sıvılaşır, varyatör
                  yanaklarına akar, kayış yağlanır, aktarım çöker.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-carbon-100">
                  <li className="flex gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                    Lityum sabunlu / poliüre / teflon katkılı CVT gresleri
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                    Referans: Malossi 7.1 MHR Grease (Kod 7615375b)
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                    Burç kanalına 0.5–1.0 g — fazlası mutlaka silinmeli
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="container-x pb-24">
        <Reveal>
          <div className="glass gradient-edge relative overflow-hidden p-10 sm:p-14">
            <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-yamaha-500/30 blur-3xl" />
            <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="eyebrow">Sonuç</div>
                <h2 className="mt-3 h-display text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Dengeyi koru — varyatör tek başına çalışmaz.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-carbon-200">
                  Sadece ön bagayı hafifletmek tek başına çözüm değildir. Baga
                  hafifletme mutlaka kontrast yayı sertliğiyle ve debriyaj
                  ayarıyla dengelenmelidir. Aksi halde kayış kaçırma, vites
                  eğrisi tutarsızlığı ve yakıt tüketimi artışı kaçınılmazdır.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/teknik-ozellikler"
                  className="group inline-flex items-center justify-between rounded-2xl bg-gradient-to-b from-yamaha-400 to-yamaha-700 px-5 py-4 text-sm font-semibold text-white shadow-ambient-blue transition hover:from-yamaha-300 hover:to-yamaha-600"
                >
                  Modelimi belirle
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/nasil-yapilir/varyator-bakimi-ve-temizligi"
                  className="inline-flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/15"
                >
                  Varyatör söküm rehberi
                  <ArrowUpRight className="h-4 w-4 text-yamaha-300" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Anatomy({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-yamaha-400/30 bg-gradient-to-b from-yamaha-500/20 to-yamaha-700/10 font-mono text-xs font-semibold text-yamaha-100">
        {step}
      </span>
      <div>
        <div className="font-semibold text-white">{title}</div>
        <p className="mt-1 text-xs leading-relaxed text-carbon-200">{body}</p>
      </div>
    </div>
  );
}
