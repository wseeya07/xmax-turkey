import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Flame,
  Gauge,
  AlertTriangle,
  Wrench,
  Cpu,
  Activity,
  Cog
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { EngineBoreUpTable } from "@/components/engine-bore-up-table";
import { EngineBrandComparison } from "@/components/engine-brand-comparison";
import { EngineEcuComparison } from "@/components/engine-ecu-comparison";
import { EngineAfrSystem } from "@/components/engine-afr-system";
import { EngineCamThrottle } from "@/components/engine-cam-throttle";
import { EngineSetupRecipes } from "@/components/engine-setup-recipes";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Motor Modifikasyon — Bore-up, ECU, Wideband ve Reçeteler",
  description:
    "Yamaha XMAX 250/300/400 için motor içi mekanik güç optimizasyonu: bore-up kit matematiği, TDR vs BRT vs S90 karşılaştırması, aRacer ve TuneBoss ECU, wideband AFR ve üç model için eksiksiz kurulum reçeteleri.",
  alternates: { canonical: "/motor-modifikasyon" }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Motor Modifikasyon",
      item: `${SITE.url}/motor-modifikasyon`
    }
  ]
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline:
    "Yamaha XMAX Motor Modifikasyon Teknik Rehberi — Bore-up, ECU, Wideband AFR ve Setup Reçeteleri",
  description:
    "Yamaha XMAX 250/300/400 için silindir bore-up matematiği, TDR/BRT/S90 silindir kitleri, aRacer ve TuneBoss bağımsız ECU sistemleri, Bosch LSU 4.9 wideband AFR montajı ve üç model için doğrulanmış kurulum reçeteleri.",
  author: { "@type": "Organization", name: SITE.name },
  publisher: { "@type": "Organization", name: SITE.name },
  mainEntityOfPage: `${SITE.url}/motor-modifikasyon`,
  about: [
    "Yamaha XMAX 250",
    "Yamaha XMAX 300",
    "Yamaha XMAX 400",
    "Motor modifikasyon",
    "Bore-up",
    "Wideband AFR",
    "aRacer",
    "Bintang Racing Team"
  ]
};

const TOC = [
  { href: "#bore-up", label: "Bore-up matematiği" },
  { href: "#markalar", label: "TDR · BRT · S90" },
  { href: "#ecu", label: "aRacer · TuneBoss" },
  { href: "#afr-wideband", label: "Wideband AFR" },
  { href: "#kam-kelebek", label: "Kam · Kelebek · Enjektör" },
  { href: "#receteler", label: "Reçeteler" }
];

const STAGES = [
  {
    id: "bore-up",
    badge: "Aşama 1 · Hacim",
    title: "Silindir-Piston · Bore-up",
    subtitle:
      "Strok sabit, çap büyür. 76 / 78 / 80 / 82 / 86 / 90 mm piston seçenekleri — XMAX 250'den 400+ cc'ye geçiş matematiği.",
    icon: Gauge,
    tone: "cyan"
  },
  {
    id: "markalar",
    badge: "Aşama 2 · Mühendislik",
    title: "Marka karşılaştırması",
    subtitle:
      "TDR seramik (ısı), BRT seramik (squish uyumu), S90 billet sleeved (mukavemet). Üç farklı yapı, üç farklı amaç.",
    icon: Flame,
    tone: "violet"
  },
  {
    id: "ecu",
    badge: "Aşama 3 · Beyin",
    title: "Bağımsız ECU",
    subtitle:
      "aRacer 4D haritalama + 0.25° CA hassasiyet ve yarış fonksiyonları, TuneBoss sokak konforu + OEM entegrasyon.",
    icon: Cpu,
    tone: "yamaha"
  },
  {
    id: "afr-wideband",
    badge: "Aşama 4 · Sigorta",
    title: "Wideband AFR",
    subtitle:
      "Bosch LSU 4.9 ile yanma odası gerçek AFR'si. 14.7 stoik · 12.8 WOT · ≥14.0 fakir kritik sınır.",
    icon: Activity,
    tone: "danger"
  },
  {
    id: "kam-kelebek",
    badge: "Aşama 5 · Nefes",
    title: "Kam · Throttle · Enjektör",
    subtitle:
      "Lift, durasyon, overlap. 40–42 mm CNC throttle body, 240–280 cc/dk 12-delikli enjektörler, port-polish.",
    icon: Cog,
    tone: "cyan"
  }
];

const STAGE_TONE: Record<string, string> = {
  cyan: "from-electric-cyan/30",
  violet: "from-electric-violet/30",
  yamaha: "from-yamaha-500/30",
  danger: "from-red-500/30"
};

const STAGE_ICON_TONE: Record<string, string> = {
  cyan: "border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan",
  violet:
    "border-electric-violet/30 bg-electric-violet/10 text-electric-violet",
  yamaha: "border-yamaha-400/30 bg-yamaha-500/10 text-yamaha-200",
  danger: "border-red-500/30 bg-red-500/10 text-red-300"
};

export default function EngineModificationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-24">
        <div className="absolute inset-0 grid-faint" aria-hidden />
        <div
          className="pointer-events-none absolute -top-40 right-1/4 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-electric-violet/20 blur-[140px]"
          aria-hidden
        />
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <span className="chip">
                <Wrench className="h-3 w-3 text-electric-violet" />
                Motor Modifikasyon · Bore-up &amp; ECU
              </span>
              <h1 className="mt-6 h-display text-balance text-[clamp(2.5rem,6.5vw,5rem)] font-semibold leading-tighter-display tracking-tightest text-white">
                <span className="text-fade">Hacim büyür,</span>
                <br />
                <span className="text-fade">beyin akıllanır,</span>
                <br />
                <span className="text-electric">motor uyanır.</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-carbon-200">
                XMAX&apos;te motor içi mekanik güç optimizasyonu beş aşamada
                ilerler: silindir hacmi, marka mühendisliği, bağımsız ECU,
                wideband AFR sigortası ve nefes açma. Bu sayfa beş aşamayı
                eksiksiz anlatır, sonunda XMAX 250 → 294 cc, XMAX 300 → 400 cc
                ve XMAX 400 → 424 cc için üç doğrulanmış reçete verir.
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
              <div className="eyebrow">Sigorta paragrafı</div>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-carbon-100">
                <p>
                  Stok ECU, bore-up sonrası enjektör Pulse Width&apos;i
                  ölçeklendiremez. Bağımsız ECU{" "}
                  <strong className="text-white">olmadan</strong> silindir
                  hacmi büyütülürse motor fakir karışıma düşer ve birkaç
                  dakikada erir.
                </p>
                <p className="text-carbon-300">
                  Yük altında AFR ≥ 14.0:1 → silindir içi 930 °C eşiği aşılır
                  → buji elektrotu erir, piston tepesi delinir.
                </p>
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/[0.05] px-4 py-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-red-300">
                    <AlertTriangle className="h-3 w-3" />
                    Doğru sıra
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-white">
                    Önce ECU + wideband, sonra silindir, sonra harita. Bu
                    sıralama bozulursa motor erimesi kaçınılmazdır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 STAGES CHOOSER */}
      <section className="container-x py-20" id="bes-asama">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow">Beş aşama</div>
            <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              XMAX&apos;te motor güç optimizasyonu{" "}
              <span className="text-electric">beş aşamadan</span> geçer.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
              Beş aşama birbiriyle bağımlıdır — birini atlamak motor erimesine
              yol açar. Her aşamanın bölümü aşağıda detaylanmıştır;
              hızlıca atlamak için kart başlıklarını kullan.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <a
                href={`#${s.id}`}
                className="glass gradient-edge group relative flex h-full flex-col overflow-hidden p-6 transition hover:-translate-y-0.5"
              >
                <div
                  className={`pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br ${STAGE_TONE[s.tone]} via-transparent blur-3xl`}
                />
                <div className="relative">
                  <span
                    className={`grid size-10 place-items-center rounded-xl border ${STAGE_ICON_TONE[s.tone]}`}
                  >
                    <s.icon className="h-4 w-4" />
                  </span>
                  <div className="mt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-300">
                    {s.badge}
                  </div>
                  <h3 className="mt-2 h-display text-lg font-semibold leading-tight text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                    {s.subtitle}
                  </p>
                </div>
                <div className="relative mt-5 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-electric-cyan">
                  Bölüme atla
                  <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 1. BORE-UP */}
      <EngineBoreUpTable />

      {/* 2. MARKA */}
      <EngineBrandComparison />

      {/* 3. ECU */}
      <EngineEcuComparison />

      {/* 4. AFR / WIDEBAND */}
      <EngineAfrSystem />

      {/* 5. KAM + KELEBEK + ENJEKTÖR */}
      <EngineCamThrottle />

      {/* Divider before recipes */}
      <div className="container-x">
        <div className="divider-glow" />
      </div>

      {/* RECIPES */}
      <EngineSetupRecipes />

      {/* FINAL CTA */}
      <section className="container-x pb-24">
        <Reveal>
          <div className="glass gradient-edge relative overflow-hidden p-10 sm:p-14">
            <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-electric-violet/25 blur-3xl" />
            <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="eyebrow">Sonuç</div>
                <h2 className="mt-3 h-display text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Motor + varyatör — ikisi birlikte düşünülür.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-carbon-200">
                  Bore-up motor varyatöre dokunmadan çalıştırılırsa kalkış
                  yumuşar, kazanılan güç aktarılamaz. Motor modifikasyon mutlaka
                  CVT setup&apos;ı + arka debriyaj dengesi ile birlikte
                  kurgulanır. Aksi halde 400 cc&apos;lik motor 300 cc gibi
                  davranır.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/varyator"
                  className="group inline-flex items-center justify-between rounded-2xl bg-gradient-to-b from-yamaha-400 to-yamaha-700 px-5 py-4 text-sm font-semibold text-white shadow-ambient-blue transition hover:from-yamaha-300 hover:to-yamaha-600"
                >
                  Varyatör rehberine geç
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/teknik-ozellikler"
                  className="inline-flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/15"
                >
                  Modelimi belirle
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
