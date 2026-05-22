"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Coins,
  Gauge,
  Map,
  Thermometer,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Calendar,
  Wrench,
  ChevronDown,
  ArrowUpRight,
  Calculator,
  Compass,
  ArrowRight,
  Percent
} from "lucide-react";
import {
  RIDER_PROFILES,
  TAX_DATA,
  GEN_TIMELINE,
  CHRONIC_ISSUES,
  COMPARISON_MATRIX
} from "@/data/buying-guide";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

const PROFILE_ICONS: Record<string, any> = {
  "sehir-ici": Coins,
  "otoyol-artci": Gauge,
  "uzun-tur": Map,
  "kisin-konfor": Thermometer,
};

const PROFILE_COLORS: Record<string, string> = {
  "sehir-ici": "from-emerald-500/10 to-emerald-500/0 text-emerald-400 border-emerald-500/20",
  "otoyol-artci": "from-electric-cyan/10 to-electric-cyan/0 text-electric-cyan border-electric-cyan/20",
  "uzun-tur": "from-amber-500/10 to-amber-500/0 text-amber-400 border-amber-500/20",
  "kisin-konfor": "from-electric-violet/10 to-electric-violet/0 text-electric-violet border-electric-violet/20",
};

const SEVERITY_BADGES: Record<string, { label: string; bg: string; text: string }> = {
  dusuk: { label: "Düşük", bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-400" },
  orta: { label: "Orta", bg: "bg-amber-500/10 border-amber-500/20", text: "text-amber-400" },
  yuksek: { label: "Kritik", bg: "bg-rose-500/10 border-rose-500/20", text: "text-rose-400" },
};

function BuyingGuideContent() {
  const searchParams = useSearchParams();
  const [activeProfile, setActiveProfile] = useState("sehir-ici");
  const [activeGen, setActiveGen] = useState(3); // Default to 2018-2022 (Ara Kasa)
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [openIssues, setOpenIssues] = useState<Record<number, boolean>>({});

  // Sync with search parameter if it changes
  useEffect(() => {
    const profileParam = searchParams.get("profile");
    if (profileParam && RIDER_PROFILES.some((p) => p.slug === profileParam)) {
      setActiveProfile(profileParam);
    }
  }, [searchParams]);

  const selectedProfile = RIDER_PROFILES.find((p) => p.slug === activeProfile) ?? RIDER_PROFILES[0];
  const ProfileIcon = PROFILE_ICONS[selectedProfile.slug];
  const profileColorClass = PROFILE_COLORS[selectedProfile.slug];

  const toggleIssue = (index: number) => {
    setOpenIssues((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const matrixParameters = Object.keys(COMPARISON_MATRIX[0].specs);

  return (
    <>
      {/* Hero Section */}
      <section className="container-x pb-12 pt-16 sm:pt-24 relative overflow-hidden">
        <div 
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-electric-cyan/10 blur-3xl"
          aria-hidden
        />
        <SectionHeading
          eyebrow="Satın Alma Rehberi & Teknik Analiz"
          title={
            <>
              XMAX Karşılaştırma ve
              <br />
              <span className="text-electric">Satın Alma Rehberi</span>
            </>
          }
          description="Sürüş rotana, bütçene ve konfor beklentilerine en uygun XMAX modelini ve jenerasyonunu keşfet. Mühendislik verileri, kronik sorun çözümleri ve Türkiye'ye özel mali analizler bir arada."
        />
      </section>

      {/* 1. Rider Profile Advisor */}
      <section className="container-x py-12">
        <Reveal>
          <div className="glass p-6 sm:p-8 relative overflow-hidden">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="chip">Etkileşimli Danışman</span>
                <h3 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
                  Sürüş profilini seç, motorunu gör.
                </h3>
              </div>
              
              {/* Profile Tabs */}
              <div className="flex flex-wrap gap-2">
                {RIDER_PROFILES.map((p) => {
                  const Icon = PROFILE_ICONS[p.slug];
                  const isActive = p.slug === activeProfile;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setActiveProfile(p.slug)}
                      className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                        isActive
                          ? "border-yamaha-400/40 bg-gradient-to-b from-yamaha-500/15 to-transparent text-white"
                          : "border-white/[0.05] bg-white/[0.015] text-carbon-300 hover:border-white/15 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {p.title.split(" & ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Profile Result Display */}
            <div className="mt-8 border-t border-white/[0.06] pt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-carbon-400">
                    Önerilen Seçenek
                  </div>
                  <h4 className="mt-3 h-display text-3xl font-bold text-white sm:text-4xl">
                    {selectedProfile.recommendedModel}
                  </h4>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs text-yamaha-300">
                    <Calendar className="h-3.5 w-3.5" />
                    {selectedProfile.generationRange}
                  </div>
                  
                  <p className="mt-5 text-sm leading-relaxed text-carbon-200">
                    {selectedProfile.why}
                  </p>
                </div>

                <div className={`rounded-2xl border bg-gradient-to-r p-5 ${profileColorClass}`}>
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-[0.1em] text-white">Mali Analiz & Tasarruf</h5>
                      <p className="mt-1 text-xs leading-relaxed text-carbon-200">{selectedProfile.savingDetail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="glass-quiet p-6 flex flex-col justify-between">
                <div>
                  <h5 className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">Artıları & Eksileri</h5>
                  
                  {/* Pros */}
                  <div className="mt-5 space-y-3.5">
                    <div className="text-xs font-bold uppercase tracking-[0.1em] text-emerald-400">Öne Çıkan Artılar</div>
                    {selectedProfile.pros.map((pro, i) => (
                      <div key={i} className="flex gap-2.5 items-start text-xs leading-relaxed text-carbon-200">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>

                  <div className="my-6 border-t border-white/[0.05]" />

                  {/* Cons */}
                  <div className="space-y-3.5">
                    <div className="text-xs font-bold uppercase tracking-[0.1em] text-rose-400">Göz Önünde Bulundurulmalı</div>
                    {selectedProfile.cons.map((con, i) => (
                      <div key={i} className="flex gap-2.5 items-start text-xs leading-relaxed text-carbon-200">
                        <XCircle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-white/[0.05] pt-4 flex items-center justify-between text-xs">
                  <span className="text-carbon-300">Hedef Kitle:</span>
                  <span className="font-semibold text-white">{selectedProfile.bestFor}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. Turkey vs Europe Tax Section */}
      <section className="container-x py-12">
        <Reveal>
          <div className="glass p-6 sm:p-10 relative overflow-hidden">
            <div 
              className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl"
              aria-hidden
            />
            
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
              <div className="flex flex-col justify-between">
                <div>
                  <span className="chip">
                    <Calculator className="h-3 w-3 text-emerald-400" />
                    Mali Analiz
                  </span>
                  <h3 className="mt-4 h-display text-2xl font-semibold text-white sm:text-3xl">
                    Türkiye&apos;de 250 cc Barem Gerçeği
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                    {TAX_DATA.explain}
                  </p>
                </div>
                
                <div className="mt-8 space-y-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">Vergi Yükü Formülü</div>
                  {TAX_DATA.formulas.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-mono text-carbon-300 bg-white/[0.015] border border-white/[0.04] p-3 rounded-xl">
                      <Percent className="h-3.5 w-3.5 text-yamaha-400 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax Delta Grid */}
              <div className="flex flex-col gap-4 justify-center">
                {TAX_DATA.rates.map((r, idx) => {
                  const is300 = r.ccRange === "292 cc";
                  return (
                    <div key={idx} className={`glass-frost p-6 border transition-colors ${is300 ? "border-rose-500/20 bg-rose-500/[0.01]" : "border-emerald-500/20 bg-emerald-500/[0.01]"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-white h-display">{r.model}</h4>
                          <span className="font-mono text-xs text-carbon-300">{r.ccRange} Silindir Hacmi</span>
                        </div>
                        <span className={`chip ${is300 ? "text-rose-400 bg-rose-500/10 border-rose-500/20" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"}`}>
                          ÖTV %{r.otv}
                        </span>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-2 overflow-hidden rounded-xl bg-white/[0.04] p-px">
                        <div className="bg-ink-950/80 px-4 py-3 text-center">
                          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-carbon-400">KDV</div>
                          <div className="mt-1 font-mono text-sm font-semibold text-white">%{r.kdv}</div>
                        </div>
                        <div className="bg-ink-950/80 px-4 py-3 text-center">
                          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-carbon-400">Vergi Yükü</div>
                          <div className={`mt-1 font-mono text-sm font-bold ${is300 ? "text-rose-400" : "text-emerald-400"}`}>%{r.totalTaxLoad}</div>
                        </div>
                        <div className="bg-ink-950/80 px-4 py-3 text-center">
                          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-carbon-400">Yıllık MTV</div>
                          <div className="mt-1 font-mono text-sm font-semibold text-white">{r.annualMtv}</div>
                        </div>
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-carbon-300">
                        {r.marketImpact}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3. Generational Evolution Timeline */}
      <section className="container-x py-12">
        <Reveal>
          <div className="glass p-6 sm:p-10 relative overflow-hidden">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <span className="chip">Jenerasyonel Evrim</span>
                <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
                  Model Yılları & Teknolojik Evrim
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  XMAX ailesinin 2005 yılından bu yana geçirdiği 6 büyük görsel ve mekanik evrimi adım adım inceleyin.
                </p>
              </div>
            </div>

            {/* Timeline Steps Selector */}
            <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
              {GEN_TIMELINE.map((evt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveGen(idx)}
                  className={`group relative flex flex-col rounded-2xl border p-5 text-left transition ${
                    activeGen === idx
                      ? "border-yamaha-400/40 bg-gradient-to-r from-yamaha-500/10 to-transparent"
                      : "border-white/[0.05] bg-white/[0.015] hover:border-white/10"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400 group-hover:text-white transition-colors">
                    {evt.yearRange}
                  </span>
                  <h4 className="mt-2 h-display text-base font-semibold text-white group-hover:text-electric-cyan transition-colors">
                    {evt.title.split(" ve ")[0].split(" ve ")[0]}
                  </h4>
                  <span
                    className={`absolute bottom-4 right-4 size-2 rounded-full transition ${
                      activeGen === idx
                        ? "bg-electric-cyan shadow-[0_0_10px_1px_rgba(38,232,255,0.6)]"
                        : "bg-white/10"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Timeline Event Details */}
            <div className="mt-4 glass-quiet p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">Detaylı Analiz</span>
                    <h4 className="mt-2 h-display text-2xl font-semibold text-white">{GEN_TIMELINE[activeGen].title}</h4>
                    <p className="mt-3 text-sm font-medium text-electric-cyan">{GEN_TIMELINE[activeGen].headline}</p>
                    <p className="mt-4 text-xs leading-relaxed text-carbon-200">{GEN_TIMELINE[activeGen].details}</p>
                  </div>
                </div>

                <div className="border-t border-white/[0.05] pt-6 lg:border-t-0 lg:border-l lg:border-white/[0.05] lg:pt-0 lg:pl-8">
                  <h5 className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">Teknolojik Kırılmalar</h5>
                  <ul className="mt-4 space-y-3">
                    {GEN_TIMELINE[activeGen].highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-xs leading-relaxed text-carbon-200">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-yamaha-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 4. Complete Technical Specs Matrix */}
      <section className="container-x py-12">
        <Reveal>
          <div className="glass p-6 sm:p-10 relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="chip">Karşılaştırma Matrisi</span>
              <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
                Jenerasyonel Teknik Veri Matrisi
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                XMAX ailesinin evrimindeki kritik motor, şasi, süspansiyon ve lastik parametrelerini en ufak teknik detaya kadar yan yana inceleyin. Sütunların üzerine gelerek vurgulayabilirsiniz.
              </p>
            </div>

            {/* Interactive Grid Table */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                      <th className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-carbon-400 w-[240px]">
                        Teknik & Yapısal Parametre
                      </th>
                      {COMPARISON_MATRIX.map((col) => (
                        <th
                          key={col.slug}
                          onMouseEnter={() => setHoveredCol(col.slug)}
                          onMouseLeave={() => setHoveredCol(null)}
                          className={`px-5 py-4 transition-colors ${
                            hoveredCol === col.slug ? "bg-white/[0.04]" : ""
                          }`}
                        >
                          <div className="font-semibold text-white h-display text-sm">
                            {col.name}
                          </div>
                          <div className="mt-0.5 font-mono text-[9px] text-carbon-300">
                            {col.yearNote}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {matrixParameters.map((param) => (
                      <tr
                        key={param}
                        className="transition hover:bg-white/[0.015]"
                      >
                        <td className="px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.1em] text-carbon-300 font-medium">
                          {param}
                        </td>
                        {COMPARISON_MATRIX.map((col) => {
                          const val = col.specs[param];
                          const isHighlighted = param === "Maksimum Güç" || param === "Maksimum Tork" || param === "Silindir Hacmi";
                          return (
                            <td
                              key={col.slug}
                              onMouseEnter={() => setHoveredCol(col.slug)}
                              onMouseLeave={() => setHoveredCol(null)}
                              className={`px-5 py-3.5 font-mono text-xs transition-colors ${
                                hoveredCol === col.slug ? "bg-white/[0.03]" : ""
                              } ${isHighlighted ? "text-yamaha-200 font-semibold" : "text-carbon-200"}`}
                            >
                              {val}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 5. Chronic Issues Accordion Dashboard */}
      <section className="container-x py-12 mb-16">
        <Reveal>
          <div className="glass p-6 sm:p-10 relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="chip">Kronik Sorunlar</span>
              <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
                Kronik Sorunlar & Çözüm Merkezi
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                XMAX kullanıcılarının bildirdiği temel kronik problemleri, etkilenen jenerasyonları ve en etkili aftermarket veya yetkili servis çözüm yollarını şeffaflıkla paylaşıyoruz.
              </p>
            </div>

            {/* Accordion List */}
            <div className="mt-10 space-y-4">
              {CHRONIC_ISSUES.map((issue, idx) => {
                const isOpen = !!openIssues[idx];
                const badge = SEVERITY_BADGES[issue.severity];
                return (
                  <div
                    key={idx}
                    className={`glass-quiet overflow-hidden border transition-all duration-300 ${
                      isOpen
                        ? "border-white/15 bg-white/[0.03]"
                        : "border-white/[0.05] hover:border-white/10"
                    }`}
                  >
                    {/* Header */}
                    <button
                      type="button"
                      onClick={() => toggleIssue(idx)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left outline-none"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <span className={`chip shrink-0 ${badge.bg} ${badge.text}`}>
                          {badge.label} Önemi
                        </span>
                        <h4 className="text-base font-semibold text-white h-display">
                          {issue.title}
                        </h4>
                      </div>
                      
                      <ChevronDown
                        className={`h-5 w-5 text-carbon-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-yamaha-300" : ""
                        }`}
                      />
                    </button>

                    {/* Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[800px] border-t border-white/[0.05]" : "max-h-0"
                      }`}
                    >
                      <div className="p-6 space-y-6">
                        {/* Affected Generations and Symptoms */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="bg-ink-950/40 p-4 rounded-xl border border-white/[0.02]">
                            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-carbon-400">Etkilenen Jenerasyonlar</div>
                            <div className="mt-1 text-xs font-semibold text-white">{issue.generationsAffected}</div>
                          </div>
                          <div className="bg-ink-950/40 p-4 rounded-xl border border-white/[0.02]">
                            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-carbon-400">Belirtiler</div>
                            <div className="mt-1 text-xs text-carbon-200 leading-relaxed">{issue.symptom}</div>
                          </div>
                        </div>

                        {/* Remedies */}
                        <div className="grid gap-4 md:grid-cols-2 pt-2">
                          {/* Official Fix */}
                          <div className="flex gap-3">
                            <Info className="h-5 w-5 text-electric-cyan shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold uppercase tracking-[0.1em] text-electric-cyan">Yamaha / Distribütör Çözümü</h5>
                              <p className="mt-1.5 text-xs leading-relaxed text-carbon-200">{issue.officialFix}</p>
                            </div>
                          </div>

                          {/* Aftermarket / User Fix */}
                          <div className="flex gap-3">
                            <Wrench className="h-5 w-5 text-yamaha-300 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold uppercase tracking-[0.1em] text-yamaha-300">Aftermarket / Kullanıcı Çözümü</h5>
                              <p className="mt-1.5 text-xs leading-relaxed text-carbon-200">{issue.aftermarketFix}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default function BuyingGuidePage() {
  return (
    <Suspense fallback={<div className="container-x py-24 text-center text-carbon-300">Yükleniyor...</div>}>
      <BuyingGuideContent />
    </Suspense>
  );
}
