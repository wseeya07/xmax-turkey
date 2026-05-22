import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Gauge,
  AlertTriangle,
  Flame,
  Droplets,
  CircleDot,
  Layers
} from "lucide-react";
import { VARIATOR_BRANDS } from "@/data/variators";
import { OEM_ROLLERS, SLIDING_ROLLER, MIXING_RULES } from "@/data/rollers";
import { Reveal } from "@/components/reveal";
import { CvtPathChooser } from "@/components/cvt-path-chooser";
import { CvtWorkshopTechniques } from "@/components/cvt-workshop-techniques";
import { CvtClutchSystem } from "@/components/cvt-clutch-system";
import { CvtSetupRecipes } from "@/components/cvt-setup-recipes";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Varyatör (CVT) — Modifikasyon Rehberi",
  description:
    "Yamaha XMAX için varyatör modifikasyonu iki yolda anlatılır: sadece baga (roller) değişimi (Yol 1) ve komple varyatör kiti (Yol 2 — Malossi, Polini, J.Costa, TDR Gold). 7 setup reçetesi, atölye sırları, debriyaj sistemi.",
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
  { href: "#uc-yol", label: "Üç yol" },
  { href: "#yol-1-baga", label: "Yol 1 · Baga" },
  { href: "#yol-2-kit", label: "Yol 2 · Komple kit" },
  { href: "#yol-3-debriyaj", label: "Yol 3 · Debriyaj" },
  { href: "#atolye-sirlari", label: "Atölye sırları" },
  { href: "#setuplar", label: "Reçeteler" }
];

const ROLLER_CHARACTER = [
  {
    title: "Hafif baga (-1g / -2g stoktan)",
    rpmBand: "6000 – 7000 RPM kalkış",
    detail:
      "Motor hızla beygir zirvesine tırmanır. Hızlanma agresif olur, dik rampada tırmanış kuvvetli. Yakıt tüketimi artar, uzun yolda devir yüksek kalır.",
    tone: "electric-cyan"
  },
  {
    title: "Ağır baga (+1g / +2g stoktan)",
    rpmBand: "5000 – 5800 RPM seyir",
    detail:
      "Varyatör erken açılır, erken upshift. Kalkışta yığılma olabilir ama otoyolda motor devri düşer — konfor + ekonomi.",
    tone: "yamaha-200"
  },
  {
    title: "Sliding (kayar) baga",
    rpmBand: "Geniş ratio bandı",
    detail:
      "Dr. Pulley sliding rollerlar yuvarlanmaz, kayar. Daha geç aşınır, flat spot yapmaz. Hem kalkışta hem son hızda kazanç sağlar.",
    tone: "electric-violet"
  }
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
                XMAX&apos;te CVT performansı{" "}
                <strong className="text-white">üç bağımsız yolda</strong>{" "}
                gelişir: ön varyatörde sadece baga değişimi, ön varyatörde komple
                kit, ya da ön gruba dokunmadan arka debriyaj yükseltmesi. Üçü
                birbirinden bağımsız uygulanabilir, kombine edilebilir.
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
                  body="Motor mili üzerinde döner. Baga (roller) ağırlığı + kasnak yanak açısı kayışın çapını belirler — vites oranını."
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

      {/* İKİ YOL */}
      <CvtPathChooser />

      {/* YOL 1 — SADECE BAGA DEĞİŞİMİ */}
      <section className="relative py-24" id="yol-1-baga">
        <div className="container-x">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
              <CircleDot className="h-4 w-4" />
            </span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
              Yol 1 · Entry · Sadece Baga
            </div>
          </div>

          <Reveal>
            <div className="mt-5 max-w-3xl">
              <h2 className="h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
                Stok varyatöre dokunma —{" "}
                <span className="text-electric">sadece bagayı değiştir.</span>
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
                Stok varyatör kasnağını ve geometrisini koruyup yalnızca roller
                weight değişimiyle motor karakterini ayarlama. En ucuz, en hızlı
                yol — 30 dakikada evde yapılır.
              </p>
            </div>
          </Reveal>

          {/* Karakter tablosu */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {ROLLER_CHARACTER.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="glass gradient-edge h-full p-6">
                  <div className={`font-mono text-[10px] uppercase tracking-[0.22em] text-${c.tone}`}>
                    {c.rpmBand}
                  </div>
                  <h3 className="mt-2 h-display text-lg font-semibold leading-tight text-white">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                    {c.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* OEM baga tablosu */}
          <Reveal>
            <div className="mt-12 glass overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="eyebrow">OEM baga referansı</div>
                <h3 className="mt-2 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  Modelin baga ölçüsünü ve ağırlığını bul.
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-carbon-200">
                  Stoktan -1g / -2g hafif gidersen agresifleşir, +1g / +2g ağır
                  gidersen ekonomi/konfor kazanır. Modelin ölçüsüne uymayan
                  baga takılmaz — 20×12, 23×18 ve 25×15 mm üç farklı yuva var.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-y border-white/[0.06] bg-white/[0.02]">
                      {["Model grubu", "Baga ölçü", "OEM ağırlık", "Parça kodu", "Kayış"].map((h) => (
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
                    {OEM_ROLLERS.map((r) => (
                      <tr key={r.modelGroup} className="border-b border-white/[0.04] last:border-0">
                        <td className="px-6 py-4 text-sm font-semibold text-white">
                          {r.modelGroup}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-electric-cyan">
                          {r.size}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-white">
                          {r.oemWeight}
                        </td>
                        <td className="px-6 py-4 font-mono text-[11px] text-carbon-200">
                          {r.partCode}
                        </td>
                        <td className="px-6 py-4 font-mono text-[11px] text-carbon-300">
                          {r.belt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* Sliding teknolojisi */}
          <Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {SLIDING_ROLLER.map((s) => (
                <div key={s.title} className="glass-quiet p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-violet">
                    Sliding teknoloji · Dr. Pulley
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
                <span className="eyebrow">Karıştırma kuralları (Mixing weights)</span>
              </div>
              <h3 className="mt-2 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
                Farklı gramda bagalar aynı varyatörde — atölye sırrı.
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

          {/* Yol 1 limiti */}
          <Reveal>
            <div className="mt-10 rounded-3xl border border-white/[0.08] bg-gradient-to-r from-yamaha-500/[0.06] to-transparent p-7 sm:p-9">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-yamaha-400/30 bg-yamaha-500/10 text-yamaha-200">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                    Yol 1&apos;in sınırı
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-white">
                    Baga değişimiyle motor karakteri değişir ama kasnak yanak
                    açısı (14°), rampa geometrisi ve baga sayısı OEM kalır.
                    Marka mühendislik avantajı için{" "}
                    <a
                      href="#yol-2-kit"
                      className="text-electric-cyan underline-offset-4 hover:underline"
                    >
                      Yol 2 (komple kit)
                    </a>
                    , debriyaj kaçırma / ısı problemi için{" "}
                    <a
                      href="#yol-3-debriyaj"
                      className="text-yamaha-200 underline-offset-4 hover:underline"
                    >
                      Yol 3 (arka grup)
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* YOL 2 — KOMPLE KİT */}
      <section className="relative py-24" id="yol-2-kit">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-violet/40 to-transparent"
          aria-hidden
        />
        <div className="container-x">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-electric-violet/30 bg-electric-violet/10 text-electric-violet">
              <Layers className="h-4 w-4" />
            </span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-violet">
              Yol 2 · Performans · Komple Kit
            </div>
          </div>

          <Reveal>
            <div className="mt-5 max-w-3xl">
              <h2 className="h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
                Marka mühendisliği,{" "}
                <span className="text-electric">yeni geometri.</span>
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
                Komple varyatör kiti tak — orijinalin yerine farklı bir kasnak +
                farklı baga sistemi gelir. 6 bagalı OEM yerine 8 baga (Malossi),
                12 baga (Polini), eksenel mermi (J.Costa) veya dikleştirilmiş
                kasnak açısı (TDR Gold). Her marka farklı bir mühendislik
                felsefesi taşır.
              </p>
            </div>
          </Reveal>

          {/* 4 marka tablosu */}
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

          {/* Marka karakter kısa açıklama */}
          <Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {VARIATOR_BRANDS.map((b, i) => (
                <Reveal key={`mini-${b.slug}`} delay={i * 0.04}>
                  <Link
                    href={`/varyator/${b.slug}`}
                    className="glass-quiet group flex h-full flex-col justify-between p-6 transition hover:border-white/15"
                  >
                    <div>
                      <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${TIER_TONE[b.pricingTier]}`}>
                        {b.origin}
                      </div>
                      <h3 className="mt-2 h-display text-xl font-semibold leading-tight text-white">
                        {b.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                        {b.positioning}
                      </p>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-electric-cyan">
                      Marka detayı
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Yol 2 uyarı */}
          <Reveal>
            <div className="mt-10 rounded-3xl border border-white/[0.08] bg-gradient-to-r from-electric-violet/[0.08] to-transparent p-7 sm:p-9">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-electric-violet/30 bg-electric-violet/10 text-electric-violet">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-violet">
                    Yol 2&apos;nin tamamlayıcısı: arka grup dengesi
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-white">
                    Komple ön kit + yanlış kontrast yayı = kayış kaçırma, yakıt
                    artışı, vites eğrisi tutarsızlığı. Yol 2&apos;den sonra
                    mutlaka{" "}
                    <a
                      href="#yol-3-debriyaj"
                      className="text-yamaha-200 underline-offset-4 hover:underline"
                    >
                      Yol 3 (arka debriyaj + kontrast yayı)
                    </a>{" "}
                    bölümünü oku — bağımsız da uygulanabilir.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* YOL 3 — ARKA DEBRIYAJ (bağımsız) */}
      <CvtClutchSystem />

      {/* Section divider */}
      <div className="container-x">
        <div className="divider-glow" />
      </div>

      {/* ORTAK BÖLÜMLER ETİKETİ */}
      <section className="container-x pt-16">
        <div className="text-center">
          <div className="eyebrow">Her üç yol için</div>
          <h2 className="mt-3 h-display text-balance text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-tighter-display tracking-tightest text-white">
            Atölye sırları, setup reçeteleri.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-carbon-300">
            Buradan sonrası üç yolu da kapsayan ileri seviye uygulamalar —
            torna işçiliği, frezeleme, şim ve 7 kanıtlanmış kombinasyon.
          </p>
        </div>
      </section>

      {/* ATÖLYE SIRLARI */}
      <CvtWorkshopTechniques />

      {/* SETUP REÇETELERİ */}
      <CvtSetupRecipes />

      {/* ISI + YAĞLAMA */}
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
                    sokak motorunda{" "}
                    <strong className="text-red-300">yapılmaz</strong>
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
                  Sadece bagayı hafifletmek tek başına çözüm değildir. Baga
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
