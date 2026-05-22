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
  Percent,
  CheckSquare,
  Square,
  RotateCcw,
  ShieldAlert,
  DollarSign,
  AlertCircle,
  Check,
  Activity,
  FileText,
  Layers
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

const EXPERTISE_CHECKLIST = [
  {
    category: "Motor & Transmisyon (10 Nokta)",
    items: [
      { id: 1, text: "Soğuk Çalıştırma Eksantrik Zincir Sesi (Rattle) Kontrolü" },
      { id: 2, text: "Supap Boşluğu 'Tıkırtı' (Tick) ve Silindir Kafası Gürültüsü" },
      { id: 3, text: "Motor Yağ Kapağı Sızdırmazlığı ve Yağ Köpürme/Tahin Testi" },
      { id: 4, text: "Egzoz Gazı Rengi ve Koku Teşhisi (Mavi Duman = Yağ Yakma)" },
      { id: 5, text: "Kuru Varyatör Debriyaj Tası Titreme/Kalkış Islık Sesi Kontrolü" },
      { id: 6, text: "Krank ve Varyatör Rulman Uğultusu (Boşluk/Aşınma Sesi)" },
      { id: 7, text: "Karter Birleşim Yüzeyleri, Keçeler ve Yağ Sızıntı Terlemeleri" },
      { id: 8, text: "Su Pompası Tahliye Deliği (Weep Hole) Sızıntı Teşhisi" },
      { id: 9, text: "Gaz Tepkisi ve Rölanti Kararlılığı (4000 rpm Geçiş Pürüzsüzlüğü)" },
      { id: 10, text: "Hava Filtresi ve PCV Hortumu Yağ Birikim (Overfill) İncelemesi" }
    ]
  },
  {
    category: "Şasi & Süspansiyon (10 Nokta)",
    items: [
      { id: 11, text: "Ön Amortisör Milleri Çizik ve Keçe Yağ Sızıntı/Toz Kapağı Kontrolü" },
      { id: 12, text: "Asimetrik Şasi Kaynakları ve Robotik Kaynak Karşılaştırması" },
      { id: 13, text: "Gidon Furş Takımı Sıkışma, Takılma veya Eksenel Boşluk Testi" },
      { id: 14, text: "Ön ve Arka Tekerlek İz Geometrisi ve Doğrusal Şasi Hizalaması" },
      { id: 15, text: "Motor Askı Burçları (Motor Takozları) Boşluk ve Çatlak Kontrolü" },
      { id: 16, text: "Arka Çift Amortisör Sönümleme Kararlılığı ve Ayar Kademe Testi" },
      { id: 17, text: "Orta ve Yan Sehpa Pim Aşınması, Gövdeye Çarpma ve Yay Mukavemeti" },
      { id: 18, text: "Jant Kenarı Flanş Eğrilikleri ve Darbe İncelemeleri" },
      { id: 19, text: "Salıncak Mili Burçları Eksenel Boşluk Kontrolü" },
      { id: 20, text: "Deniz Havası/Korozyon Kaynaklı Alt Şasi Derin Paslanma İncelemesi" }
    ]
  },
  {
    category: "Fren Sistemi (10 Nokta)",
    items: [
      { id: 21, text: "Ön Fren Disk Kalınlığı Ölçümü (Orijinal 4.5 mm, Aşınma Limiti 4.0 mm)" },
      { id: 22, text: "Arka Fren Disk Kalınlığı Ölçümü ve Aşınma Kanalları Kontrolü" },
      { id: 23, text: "Disk Yüzeyi Derin Dalgalanma, Çizik ve Isıl Mavi Renç Değişimi" },
      { id: 24, text: "Fren Kaliper Piston Keçeleri Hidrolik Kaçak Teşhisi" },
      { id: 25, text: "Ön ve Arka Fren Balata Kalınlık Limitleri (Min 1 mm Diş Kalınlığı)" },
      { id: 26, text: "Manet Sürüş Hissi: Süngerimsi Kararsızlık veya Hidrolik Hava Kontrolü" },
      { id: 27, text: "Fren Hidrolik Yağı Nem, Seviye ve Koyu Kahve Renk Değişimi" },
      { id: 28, text: "Ön/Arka ABS Sensör Boşlukları ve Sinyal Dişlisi Eğrilik Kontrolü" },
      { id: 29, text: "Fren Hidrolik Hortumları Çatlak, Yırtık ve Balon Yapma Testi" },
      { id: 30, text: "Sert Duruşlarda ABS Pompa Geri Bildirimi ve TCS Müdahale Testi" }
    ]
  },
  {
    category: "Elektrik & Elektronik (10 Nokta)",
    items: [
      { id: 31, text: "Smart Key Akıllı Anahtar Uzaklaşma Kilidi ve Topuz Kilitleme Testi" },
      { id: 32, text: "LCD/TFT Gösterge Paneli Piksel Kaybı, Buğulanma ve Buton Tepkileri" },
      { id: 33, text: "Far, Stop, Plaka Aydınlatma, Sinyal Grubu ve Yüksek Sinyal Konumu" },
      { id: 34, text: "Rölanti ve Devirli Akü Voltaj Testi (13.8V - 14.4V Barem)" },
      { id: 35, text: "Gizli DIAG Menüsü (d01-d61) Geçmiş Hata Kodları Analizi" },
      { id: 36, text: "Çekiş Kontrol Sistemi (TCS) Gidondan İptal/Aktivasyon Butonu Testi" },
      { id: 37, text: "Radyatör Soğutma Fanı Sıcaklık Devreye Girme/Otomatik Kapanma Testi" },
      { id: 38, text: "Konjektör (Regülatör) Isınma Durumu ve Akım Kararlılığı" },
      { id: 39, text: "Kablo Tesisatı Koruma Kılıfları Çatlakları ve Oksitlenme İncelemesi" },
      { id: 40, text: "Garmin Navigasyon / Y-Connect Bluetooth Eşleşme ve Sensör Verisi" }
    ]
  },
  {
    category: "Grenaj & Kaporta (5 Nokta)",
    items: [
      { id: 41, text: "Grenaj Birleşim Boşlukları Simetrisi ve Tırnak Kırığı Tespiti" },
      { id: 42, text: "Grenaj İç Yüzeylerinde Tel Zımba veya Havya Plastik Kaynak İzi" },
      { id: 43, text: "UV Işık Altında Vernik Altı Tozlar, Zımpara İzleri ve Boya Geçişleri" },
      { id: 44, text: "Sele Menteşe Pim Boşlukları ve Çift Noktadan Kilitleme Testi" },
      { id: 45, text: "Ön Cam Ayar Mekanizması Manuel Pim / Elektrikli Motor Akıcılığı" }
    ]
  },
  {
    category: "Yasal & Evrak Kontrolü (5 Nokta)",
    items: [
      { id: 46, text: "Gövde ve Blok Üzerindeki Şasi/Motor Numaralarının Ruhsat Eşleşmesi" },
      { id: 47, text: "Tramer 5664 Hasar Kaydı, Çarpma, Ağır Hasar ve KM Sorgusu" },
      { id: 48, text: "TÜVTÜRK Periyodik Muayene Geçerlilik ve Egzoz Emisyon Ölçümü" },
      { id: 49, text: "E-Devlet Üzerinde Rehin, Haciz, Hak Mahrumiyeti Kontrolü" },
      { id: 50, text: "6 Haneli Smart Key PIN Kodu Kartı ve Acil Durum Anahtarı Teslimi" }
    ]
  }
];

function BuyingGuideContent() {
  const searchParams = useSearchParams();
  const [activeProfile, setActiveProfile] = useState("sehir-ici");
  const [activeGen, setActiveGen] = useState(3); // Default to 2018-2022 (Ara Kasa)
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [openIssues, setOpenIssues] = useState<Record<number, boolean>>({});
  const [activeEkspertizTab, setActiveEkspertizTab] = useState("sasi-akustik");
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheckItem = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetCheckedItems = () => {
    setCheckedItems({});
  };

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

      {/* 5. 2. El Ekspertiz ve Sahtekarlık Teşhisi */}
      <section className="container-x py-12">
        <Reveal>
          <div className="glass p-6 sm:p-10 relative overflow-hidden">
            <div 
              className="pointer-events-none absolute -top-40 right-1/2 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-yamaha-500/10 blur-3xl"
              aria-hidden
            />
            
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="chip">2. El Ekspertiz Kılavuzu</span>
                <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
                  2. El Ekspertiz ve Sahtekarlık Teşhisi
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  XMAX satın alırken dolandırıcılıktan ve gizli kusurlardan korunmak için profesyonel teşhis yöntemlerini, orijinal parça toleranslarını ve gösterge hata menülerini kullanın.
                </p>
              </div>

              {/* Submenu tabs */}
              <div className="flex flex-wrap gap-2 shrink-0">
                {[
                  { id: "sasi-akustik", label: "Şasi & Akustik", icon: Activity },
                  { id: "km-asinma", label: "Km & Disk Analizi", icon: Gauge },
                  { id: "diag-modu", label: "OBD-siz DIAG", icon: Wrench },
                  { id: "checklist", label: "50-Maddelik Çizelge", icon: CheckSquare },
                  { id: "bakim-maliyetleri", label: "Bakım Maliyetleri", icon: DollarSign },
                  { id: "kirmizi-bayraklar", label: "5 Kırmızı Bayrak", icon: ShieldAlert }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeEkspertizTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveEkspertizTab(tab.id)}
                      className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold transition ${
                        isActive
                          ? "border-electric-cyan/40 bg-gradient-to-b from-electric-cyan/15 to-transparent text-white"
                          : "border-white/[0.05] bg-white/[0.015] text-carbon-300 hover:border-white/15 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Contents */}
            <div className="mt-10 border-t border-white/[0.06] pt-8">
              
              {/* Tab 1: Şasi & Akustik */}
              {activeEkspertizTab === "sasi-akustik" && (
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white h-display flex items-center gap-2">
                        <span className="size-2 rounded-full bg-electric-cyan" />
                        Şasi Geometrisi ve Mikro Boya Teşhisi
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                        XMAX şasisi, ön kısımda çift kelepçeli amortisör yapısıyla son derece rijit tasarlanmıştır. Ancak ciddi kazalardan sonra şasinin geometrik bütünlüğü bozulabilir. Şasi kontrolünü şu 3 adıma göre yapın:
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="glass-quiet p-5 border-white/[0.03] hover:border-white/[0.08] transition">
                        <h4 className="text-xs font-semibold text-white uppercase tracking-wider">1. Robotik vs Asimetrik Kaynak Teşhisi</h4>
                        <p className="mt-2 text-xs text-carbon-300 leading-relaxed">
                          Sele altı bagaj kutusunu sökerek şasi borularına ulaşın. Orijinal Yamaha robotik dairesel kaynakları düzgün pul pul dizilimli (TIG kaynağı kalitesinde) ve simetriktir. Sonradan elle yapılan tamir kaynakları ise kaba, asimetrik, cüruflu ve taşlanmış olur.
                        </p>
                      </div>

                      <div className="glass-quiet p-5 border-white/[0.03] hover:border-white/[0.08] transition">
                        <h4 className="text-xs font-semibold text-white uppercase tracking-wider">2. Grenaj Altı Havya ve Plastik Kaynakları</h4>
                        <p className="mt-2 text-xs text-carbon-300 leading-relaxed">
                          Grenaj birleşim yerlerinin iç yüzeylerini kontrol edin. Kaza sonrasında dıştan görünmeyen ama içten havya, tel zımba veya plastik zip tie eritilerek yapıştırılmış gizli tamirleri yakalayın. Tırnak kırıkları sürüş esnasında 60-80 km/s hızlarda varyatör rüzgarıyla ses yapar.
                        </p>
                      </div>

                      <div className="glass-quiet p-5 border-white/[0.03] hover:border-white/[0.08] transition">
                        <h4 className="text-xs font-semibold text-white uppercase tracking-wider">3. UV (Morötesi) Işık Altında Boya Geçişleri</h4>
                        <p className="mt-2 text-xs text-carbon-300 leading-relaxed">
                          Yüzeydeki kılcal boya geçişlerini ve vernik altına hapsolmuş mikro tozları yakalamak için morötesi (UV) fener kullanın. Lokal boyalı alanlar UV ışık altında koyu mor lekelere dönüşürken, fabrikasyon boya tamamen homojen bir yansıma verir.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 lg:border-l lg:border-white/[0.05] lg:pl-8">
                    <div>
                      <h3 className="text-lg font-bold text-white h-display flex items-center gap-2">
                        <span className="size-2 rounded-full bg-yamaha-400" />
                        Akustik Motor Teşhisi (Soğuk Çalıştırma)
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                        Motor bloğunun mekanik sağlığı en iyi motor tamamen soğukken (en az 4 saat beklemiş) marşa basıldığında anlaşılır. Isınmış motor yatak boşluğu ve zincir seslerini geçici olarak gizler.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="glass-quiet p-5 border-white/[0.03]">
                        <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          1. Supap Boşluk Sesi (Tick-Tick):
                        </h4>
                        <p className="mt-2 text-xs text-carbon-300 leading-relaxed">
                          Rölantide üst kapaktan gelen çok ince, metalik dikiş makinesi tarzı ritmik 'tık-tık' sesi supap boşluğunun (clearance) arttığının işaretidir. Aşırı yüksek metalik vuruş sesi ise aşınmış kam millerini gösterir.
                        </p>
                      </div>

                      <div className="glass-quiet p-5 border-white/[0.03]">
                        <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                          2. Eksantrik Zincir Sesi (Rattle) & Gevşek Kam Cıvatası:
                        </h4>
                        <p className="mt-2 text-xs text-carbon-300 leading-relaxed">
                          Soğuk çalıştırmada ilk 2 saniye gelen metalik hışırtı / sürtünme sesi hidrolik gergideki basınç kaybından ötürü normal kabul edilebilir. Ancak motor ısındığında da devam eden zincir şıkırtısı, zincir ömrünün dolduğunu gösterir. <strong className="text-rose-400">KRİTİK UYARI:</strong> 2023+ kasalarda silindir kapağının sol üst kısmından gelen düzensiz takırtılar, gevşeyen eksantrik dişlisi cıvatalarının habercisidir. Göz ardı edilirse motor kitlenir.
                        </p>
                      </div>

                      <div className="glass-quiet p-5 border-white/[0.03]">
                        <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-electric-cyan" />
                          3. Motor Yağ Eksiltme Sınırı:
                        </h4>
                        <p className="mt-2 text-xs text-carbon-300 leading-relaxed">
                          XMAX motor blokları yüksek devir çevirdiğinde yağ buharı PCV valfi üzerinden emişe gider. Sağlıklı bir XMAX bloğu için yağ tüketim limiti <strong className="text-white">3.000 km sürüşte maksimum 700 ml</strong>&apos;dir. Bundan fazlası sekman aşınmasına veya subap keçesi kaçaklarına işaret eder.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Km & Disk Analizi */}
              {activeEkspertizTab === "km-asinma" && (
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="glass-frost p-6 border-emerald-500/10 bg-emerald-500/[0.01]">
                      <h3 className="text-lg font-bold text-white h-display flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-emerald-400" />
                        Kilometre Aşınma İndeksi ve Disk Formülü
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                        Göstergedeki kilometre saatlerinin geri çekilmesi (odometer rollback) en yaygın sahtekarlıktır. Ancak mekanik metal aşınması asla yalan söylemez. Ön disk orijinal kalınlığı üzerinden kilometre tahmini yapabilirsiniz.
                      </p>
                      
                      <div className="mt-6 rounded-xl bg-ink-950/80 p-5 border border-white/[0.04]">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-carbon-400">Metalik Aşınma Teşhis Formülü</div>
                        <div className="mt-2 text-base font-mono font-bold text-emerald-400">
                          Δt = t_yeni - t_mevcut
                        </div>
                        <ul className="mt-3 space-y-2 text-xs text-carbon-300">
                          <li>• Orijinal Ön Disk Kalınlığı (t_yeni): <strong className="text-white">4.5 mm</strong></li>
                          <li>• Aşınma Aşırı Risk Sınırı (t_limit): <strong className="text-white">4.0 mm</strong></li>
                          <li>• Aşınma Farkı (Δt) <strong className="text-rose-400">≥ 0.3 mm</strong> iken gösterge <strong className="text-rose-400">&lt; 15.000 km</strong> ise kilometre <strong className="text-rose-400">kesinlikle geri çekilmiştir!</strong> (Normal şartlarda disk 15.000 km&apos;de bu kadar aşınamaz).</li>
                        </ul>
                      </div>
                    </div>

                    <div className="glass-frost p-6 border-yamaha-500/10 bg-white/[0.01]">
                      <h3 className="text-lg font-bold text-white h-display flex items-center gap-2">
                        <Layers className="h-5 w-5 text-yamaha-300" />
                        Ergonomik Yıpranma ve Km Tahmin Matrisi
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                        Motosikletin sürekli sürücüyle temas eden fiziksel noktaları kilometrenin gerçekliği konusunda doğrudan ipucu verir. Aşağıdaki matrisi referans alın:
                      </p>

                      <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06] bg-ink-950/40">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                              <th className="px-4 py-2.5 font-semibold text-white">Bölge</th>
                              <th className="px-4 py-2.5 font-semibold text-white">0 - 15K Km</th>
                              <th className="px-4 py-2.5 font-semibold text-white">20K - 40K Km</th>
                              <th className="px-4 py-2.5 font-semibold text-white">50K+ Km</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.04] text-carbon-300">
                            <tr>
                              <td className="px-4 py-2 font-medium text-white">Gidon Elcikleri</td>
                              <td className="px-4 py-2 text-emerald-400">Pürüzsüz / Mat</td>
                              <td className="px-4 py-2 text-amber-400">Hafif Parlama</td>
                              <td className="px-4 py-2 text-rose-400">Tırtık Kaybı / Aşırı Aşınma</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 font-medium text-white">Sele Dolgusu</td>
                              <td className="px-4 py-2 text-emerald-400">Sert & Diri</td>
                              <td className="px-4 py-2 text-amber-400">Hafif Çökme</td>
                              <td className="px-4 py-2 text-rose-400">Sol dikiş aşınması / Sünger çökmesi</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 font-medium text-white">Ayak Basamak Kauçuğu</td>
                              <td className="px-4 py-2 text-emerald-400">Derin kanallar diri</td>
                              <td className="px-4 py-2 text-amber-400">Kenarlarda düzleşme</td>
                              <td className="px-4 py-2 text-rose-400">Metal taban görünmesi / Erime</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 font-medium text-white">Orta Sehpa Tabanı</td>
                              <td className="px-4 py-2 text-emerald-400">Boya çiziksiz</td>
                              <td className="px-4 py-2 text-amber-400">Boya kalkmış / Hafif pas</td>
                              <td className="px-4 py-2 text-rose-400">Derin metal erimesi / Eğrilik</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: OBD-siz DIAG Modu */}
              {activeEkspertizTab === "diag-modu" && (
                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white h-display flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-electric-cyan" />
                        Göstergeden Gizli DIAG Moduna Giriş Protokolü
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                        XMAX, yetkili servise gitmeden veya OBD arıza tespit cihazı bağlamadan kendi göstergesi üzerinden geçmiş arızaları okuma ve silme yeteneğine sahiptir. Bu gizli menüye girmek için aşağıdaki adımları sırasıyla uygulayın:
                      </p>
                    </div>

                    <div className="relative border-l-2 border-electric-cyan/20 pl-6 space-y-6">
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 flex size-4 items-center justify-center rounded-full bg-electric-cyan text-[10px] font-bold text-ink-950">1</span>
                        <h4 className="text-xs font-semibold text-white">Başlangıç Hazırlığı</h4>
                        <p className="mt-1 text-xs text-carbon-300">Smart Key topuzunun tamamen kapalı (OFF) ve gidon kilidinin açık olduğundan emin olun.</p>
                      </div>

                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 flex size-4 items-center justify-center rounded-full bg-electric-cyan text-[10px] font-bold text-ink-950">2</span>
                        <h4 className="text-xs font-semibold text-white">Select + Reset Kombinasyonu</h4>
                        <p className="mt-1 text-xs text-carbon-300">Gösterge panelindeki <strong className="text-white">SELECT ve RESET</strong> butonlarına aynı anda basın ve parmağınızı çekmeyin.</p>
                      </div>

                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 flex size-4 items-center justify-center rounded-full bg-electric-cyan text-[10px] font-bold text-ink-950">3</span>
                        <h4 className="text-xs font-semibold text-white">Gücü Açın</h4>
                        <p className="mt-1 text-xs text-carbon-300">Butonlara basılı tutarken Smart Key topuzunu <strong className="text-white">ON</strong> konumuna getirin.</p>
                      </div>

                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 flex size-4 items-center justify-center rounded-full bg-electric-cyan text-[10px] font-bold text-ink-950">4</span>
                        <h4 className="text-xs font-semibold text-white">Giriş Beklemesi (8 Saniye)</h4>
                        <p className="mt-1 text-xs text-carbon-300">Kadranda ışıklar yandıktan sonra butonları <strong className="text-white">en az 8 saniye</strong> daha basılı tutmaya devam edin. Ekranda &apos;DIAG&apos; yazısı belirdiğinde menüye girmiş olursunuz.</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-frost p-6 border-white/[0.04] bg-white/[0.005] flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-yamaha-300">DIAG Menüsü & Lamba Sıfırlama</h4>
                      
                      <div className="mt-4 space-y-3.5 text-xs text-carbon-300 leading-relaxed">
                        <p>
                          <strong className="text-white">d01 - d61 Hata Menüleri:</strong> SELECT tuşuna basarak parametreler arasında geçiş yapabilirsiniz. d01-d60 arası canlı sensör değerlerini (gaz kelebeği voltajı vb.) gösterirken, <strong className="text-white">d61</strong> geçmişte kaydedilmiş hata kodlarını listeler. Burada arıza kodları varsa motor geçmişte elektronik sorun yaşamıştır.
                        </p>
                        <p>
                          <strong className="text-white">d62 Hata Silme:</strong> d61 ekranındayken RESET tuşuna basılı tutarak tüm geçmiş hata kayıtlarını hafızadan temizleyebilirsiniz.
                        </p>
                        <p>
                          <strong className="text-white">Oil & V-Belt Trip Sıfırlama:</strong> Yağ veya kayış servis lambası yanıp sönüyorsa, göstergeyi TRIP moduna getirin. <strong className="text-white">TRIP</strong> butonuna 3 saniye basılı tutun (rakamlar yanıp sönmeye başlayacaktır), ardından butonu bırakıp tekrar <strong className="text-white">15 saniye boyunca</strong> basılı tutarak trip değerini sıfırlayabilirsiniz.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider">Kritik Akü Uyarısı</h5>
                        <p className="mt-1 text-[11px] text-carbon-200">
                          DIAG menüsündeyken motor beyni (ECU) sürekli açık kaldığından aküyü hızlı tüketir. Kontrol işlemlerini 5 dakikadan kısa sürede bitirin veya aküye bir şarj koruma cihazı bağlayın.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: 50-Maddelik İnteraktif Çizelge */}
              {activeEkspertizTab === "checklist" && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white h-display flex items-center gap-2">
                        <CheckSquare className="h-5 w-5 text-electric-cyan" />
                        50 Maddelik İnteraktif Ekspertiz Kontrol Çizelgesi
                      </h3>
                      <p className="mt-1 text-xs text-carbon-300">
                        Satın alacağınız XMAX motosikletin başında her kontrol ettiğiniz noktayı işaretleyin.
                      </p>
                    </div>

                    {/* Progress details */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="font-mono text-lg font-bold text-electric-cyan">
                          {Object.values(checkedItems).filter(Boolean).length} / 50
                        </span>
                        <span className="text-[10px] text-carbon-400 block uppercase font-mono">Tamamlanma Oranı</span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={resetCheckedItems}
                        className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs font-semibold text-carbon-300 hover:border-white/15 hover:text-white transition"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Sıfırla
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04] p-px border border-white/[0.03]">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-all duration-300"
                      style={{ width: `${(Object.values(checkedItems).filter(Boolean).length / 50) * 100}%` }}
                    />
                  </div>

                  {/* Checklist Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {EXPERTISE_CHECKLIST.map((categoryGroup, catIdx) => (
                      <div key={catIdx} className="glass-quiet p-6 border-white/[0.03] flex flex-col justify-between">
                        <div>
                          <h4 className="font-mono text-[10px] uppercase tracking-wider text-yamaha-300 border-b border-white/[0.06] pb-2 mb-4 font-bold">
                            {categoryGroup.category}
                          </h4>
                          
                          <div className="space-y-3">
                            {categoryGroup.items.map((item) => {
                              const isChecked = !!checkedItems[item.id];
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => toggleCheckItem(item.id)}
                                  className="w-full flex items-start gap-3 text-left transition group text-xs text-carbon-200 hover:text-white"
                                >
                                  <span className="mt-0.5 shrink-0 transition group-hover:scale-110">
                                    {isChecked ? (
                                      <CheckSquare className="h-4 w-4 text-electric-cyan" />
                                    ) : (
                                      <Square className="h-4 w-4 text-carbon-400 group-hover:text-carbon-200" />
                                    )}
                                  </span>
                                  <span className={`leading-relaxed ${isChecked ? "line-through text-carbon-400" : ""}`}>
                                    {item.text}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Bakım Maliyetleri */}
              {activeEkspertizTab === "bakim-maliyetleri" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white h-display flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-emerald-400" />
                      Kilometreye Göre Ağır Bakım ve Ortalama Parça Maliyetleri (2026)
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                      2. El XMAX alırken satıcının &quot;tüm bakımları tam&quot; ifadesini sorgulamak için aşağıdaki periyodik kilometre ağır bakım gerekliliklerini ve 2026 yılı Türkiye pazarı yaklaşık orijinal parça + işçilik maliyetlerini referans alın:
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    
                    {/* 10.000 KM */}
                    <div className="glass-frost p-6 border-white/[0.04] bg-white/[0.005]">
                      <div className="font-mono text-sm font-bold text-electric-cyan uppercase">10.000 KM Bakımı</div>
                      <div className="mt-1 font-mono text-xs text-carbon-400">Küçük/Ara Periyot</div>
                      
                      <ul className="mt-4 space-y-2 text-xs text-carbon-300 border-b border-white/[0.05] pb-4 mb-4">
                        <li>• Motor Yağı Değişimi</li>
                        <li>• Hava Filtreleri Temizliği</li>
                        <li>• Buji Kontrol / Değişim</li>
                        <li>• Varyatör Toz Tahliyesi</li>
                      </ul>
                      
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-carbon-400">Tahmini Maliyet (TL)</div>
                        <div className="mt-1 font-mono text-lg font-bold text-white">3.500 TL - 5.000 TL</div>
                      </div>
                    </div>

                    {/* 20.000 KM */}
                    <div className="glass-frost p-6 border-amber-500/10 bg-amber-500/[0.005]">
                      <div className="font-mono text-sm font-bold text-amber-400 uppercase">20.000 KM Bakımı</div>
                      <div className="mt-1 font-mono text-xs text-carbon-400">Orta/Ağır Periyot</div>
                      
                      <ul className="mt-4 space-y-2 text-xs text-carbon-300 border-b border-white/[0.05] pb-4 mb-4">
                        <li>• Şanzıman (Final Gear) Yağı</li>
                        <li>• Motor Yağı + Yağ Filtresi</li>
                        <li>• Varyatör Bagaları (Slider)</li>
                        <li>• Varyatör V-Belt Kayış Değişimi</li>
                      </ul>
                      
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-carbon-400">Tahmini Maliyet (TL)</div>
                        <div className="mt-1 font-mono text-lg font-bold text-white">8.500 TL - 12.000 TL</div>
                      </div>
                    </div>

                    {/* 40.000 KM */}
                    <div className="glass-frost p-6 border-rose-500/10 bg-rose-500/[0.005]">
                      <div className="font-mono text-sm font-bold text-rose-400 uppercase">40.000 KM Bakımı</div>
                      <div className="mt-1 font-mono text-xs text-carbon-400">Tam Ağır Periyot</div>
                      
                      <ul className="mt-4 space-y-2 text-xs text-carbon-300 border-b border-white/[0.05] pb-4 mb-4">
                        <li>• Süspansiyon Yağ Değişimi</li>
                        <li>• Antifriz/Soğutucu Yenileme</li>
                        <li>• Buji + Tüm Filtre Değişimleri</li>
                        <li>• Komple Debriyaj Set Kontrolü</li>
                        <li>• Supap Ayarı (Valve Clearance)</li>
                      </ul>
                      
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-carbon-400">Tahmini Maliyet (TL)</div>
                        <div className="mt-1 font-mono text-lg font-bold text-white">16.000 TL - 22.000 TL</div>
                      </div>
                    </div>

                    {/* 60.000 KM+ */}
                    <div className="glass-frost p-6 border-electric-violet/10 bg-electric-violet/[0.005]">
                      <div className="font-mono text-sm font-bold text-electric-violet uppercase">60.000 KM+ Bakımı</div>
                      <div className="mt-1 font-mono text-xs text-carbon-400">Ömürlük / Revizyon</div>
                      
                      <ul className="mt-4 space-y-2 text-xs text-carbon-300 border-b border-white/[0.05] pb-4 mb-4">
                        <li>• Eksantrik Zincir Değişimi</li>
                        <li>• Su Pompası Conta Set Değişimi</li>
                        <li>• Fren Diskleri Ön/Arka Değişim</li>
                        <li>• Tüm Şasi/Salıncak Burçları</li>
                      </ul>
                      
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-carbon-400">Tahmini Maliyet (TL)</div>
                        <div className="mt-1 font-mono text-lg font-bold text-white">25.000 TL - 35.000 TL+</div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab 6: 5 Kırmızı Bayrak */}
              {activeEkspertizTab === "kirmizi-bayraklar" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white h-display flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-rose-400" />
                      Asla Satın Alınmayacak 5 Kırmızı Bayrak (Dealbreakers)
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                      Ekspertiz sırasında aşağıdaki 5 durumdan herhangi birini tespit ederseniz, pazarlığı anında sonlandırın ve motordan uzaklaşın. Bu kusurların düzeltilmesi ekonomik olarak mantıksızdır:
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                    
                    {/* Bayrak 1 */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-5">
                      <div className="font-mono text-xs font-bold text-rose-400">1. Şasi Isıl İşlemi</div>
                      <h4 className="mt-2 text-sm font-semibold text-white">Doğrultulmuş Şasi</h4>
                      <p className="mt-2 text-[11px] leading-relaxed text-carbon-300">
                        Bükülen şasi demirinin tavlanarak ısı ile doğrultulması şasinin metal yorgunluğu direncini sıfıra indirir. Bir sonraki sert çukurda şasi aniden ikiye bölünebilir.
                      </p>
                    </div>

                    {/* Bayrak 2 */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-5">
                      <div className="font-mono text-xs font-bold text-rose-400">2. Ruhsatsız Motor Değişimi</div>
                      <h4 className="mt-2 text-sm font-semibold text-white">Farklı Blok No</h4>
                      <p className="mt-2 text-[11px] leading-relaxed text-carbon-300">
                        Motor bloğu üzerindeki numara ile ruhsattaki numaranın uyuşmaması durumunda motor yasal olarak hurda veya çalıntı statüsündedir. Muayeneden geçmez ve noter satışı yapılamaz.
                      </p>
                    </div>

                    {/* Bayrak 3 */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-5">
                      <div className="font-mono text-xs font-bold text-rose-400">3. Sürekli Mavi Duman</div>
                      <h4 className="mt-2 text-sm font-semibold text-white">Ağır Yağ Yakma</h4>
                      <p className="mt-2 text-[11px] leading-relaxed text-carbon-300">
                        Egzozdan rölantide dahi kesilmeyen mavi renkli yağ dumanı ve yanık kokusu gelmesi, silindirin çizildiğini ve piston sekman grubunun tamamen bittiğini gösterir. Komple motor rektifiyesi gerektirir.
                      </p>
                    </div>

                    {/* Bayrak 4 */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-5">
                      <div className="font-mono text-xs font-bold text-rose-400">4. Kilitli Eksantrik Dişlisi</div>
                      <h4 className="mt-2 text-sm font-semibold text-white">Kronik Cıvata Gevşemesi</h4>
                      <p className="mt-2 text-[11px] leading-relaxed text-carbon-300">
                        2023+ kasalarda eksantrik dişli cıvatasının gevşeyerek silindir kapağına sürtüp talaş dökmesi ve motorun kilitlenmesi. Yağ kanallarını tıkayıp yatak sardırır, blok tamir edilemez hale gelir.
                      </p>
                    </div>

                    {/* Bayrak 5 */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-5">
                      <div className="font-mono text-xs font-bold text-rose-400">5. Nem Almış Beyin (ECU)</div>
                      <h4 className="mt-2 text-sm font-semibold text-white">Oksitli Kablo Grubu</h4>
                      <p className="mt-2 text-[11px] leading-relaxed text-carbon-300">
                        Tesisatta nem veya sel maruziyeti sonucu oluşan oksitlenme. Zamanla sensörlerin kararsız sinyal üretmesine, yolda giderken stop etmeye veya TCS&apos;nin saçmalamasına neden olur. Çözümü tesisat değişimidir.
                      </p>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </Reveal>
      </section>

      {/* 6. Chronic Issues Accordion Dashboard */}
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
