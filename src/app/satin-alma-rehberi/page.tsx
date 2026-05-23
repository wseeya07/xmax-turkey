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
    category: "Motor & Mekanik (10 Nokta)",
    items: [
      { id: 1, text: "Soğuk Blokta Marş: Motor tamamen soğukken tek marşta sorunsuz ve sarsıntısız çalışma kontrolü." },
      { id: 2, text: "Üst Kapak Sesi: Supaplardan gelen ritmik metalik vuruntuların (tick-tick-tick) kontrolü." },
      { id: 3, text: "Eksantrik Gergisi Sesi: Motorun sağ yanından gelen düzensiz metalik şıkırtıların tespiti." },
      { id: 4, text: "Eksantrik Vidaları: Üst kapak sol köşesinden gelen ağır darbe/takırtı sesleri (Civata gevşeme riski)." },
      { id: 5, text: "Arka Varyatör Rulmanı: Tekerlek elle döndürülürken varyatör kutusundan gelen uğultu/sürtünme kontrolü." },
      { id: 6, text: "Silindir Taban Contası: Silindir bloğu ile karter birleşim hattında yağ terlemesi veya sızıntısı." },
      { id: 7, text: "Silindir Kapağı Contası: Kapağın birleşim noktalarında kompresyon kaçağı veya antifriz/yağ kaçağı." },
      { id: 8, text: "Yağ Süzgeci Durumu: Alt tapa üzerindeki metal telli yağ süzgecinin temizliği, yırtılma ve tıkanıklığı." },
      { id: 9, text: "Egzoz Gazı Rengi: Motor ısındıktan sonra egzozdan mavi veya yoğun gri duman atılmaması (Yağ yakma)." },
      { id: 10, text: "Devirdaim Pompa Sızıntısı: Su pompasının altındaki weep hole (tahliye deliği) su/yağ damlatma kontrolü." }
    ]
  },
  {
    category: "Şasi & Geometri (10 Nokta)",
    items: [
      { id: 11, text: "Furş Yatağı Kaynakları: Gidon boynu furş yatağı çevresindeki orijinal robotik kaynak bütünlüğü." },
      { id: 12, text: "Şasi Alt Boruları: Grenaj altındaki çelik borularda yamulma, ezilme, pres veya kaynak tamiri kontrolü." },
      { id: 13, text: "Motor Askı Takozları: Blok bağlantı askı takozlarında çatlama, sertleşme and eksen kayması tespiti." },
      { id: 14, text: "Amortisör Milleri: Ön amortisör krom bacaklarında mikro çizik, korozyon and eksenel eğrilik taraması." },
      { id: 15, text: "Amortisör Keçeleri: Ön amortisör keçe diplerinde yağ halkası oluşumu and sızdırma kontrolü." },
      { id: 16, text: "Gidon Eğriliği: Gidonun sağa and sola tam dönüş açılarındaki milimetrik simetri kontrolü." },
      { id: 17, text: "Arka Maşa Boşluğu: Salıncak (arka maşa) burçlarında eksenel boşluk and oynamanın elle kontrolü." },
      { id: 18, text: "Jant Yalpalama: Tekerlekler serbest dönerken flanş darbesi, eksenel salıntı and yalpa kontrolü." },
      { id: 19, text: "Arka Amortisör Milleri: Çift arka amortisörde yağ sızıntısı and sönümleme kaybı kontrolü." },
      { id: 20, text: "Orta Sehpa Ekseni: Sehpa kapatıldığında gövdeye tam paralel durması and darbe emici kauçuk takozu." }
    ]
  },
  {
    category: "Fren & ABS (10 Nokta)",
    items: [
      { id: 21, text: "Ön Disk Kalınlığı: Ön disk kalınlığının mikrometre veya kumpasla ölçümü (Orijinal 4.5 mm, aşınma sınırı 4.0 mm)." },
      { id: 22, text: "Arka Disk Kalınlığı: Arka disk yüzeyindeki aşınma kanalları, fatura derinliği and dalgalanma kontrolü." },
      { id: 23, text: "Fren Balatası Kalınlığı: Balata sürtünme malzemesi kalınlığının kontrolü (Limit minimum 2 mm)." },
      { id: 24, text: "Fren Hidrolik Seviyesi: Rezervuar pencerelerinde hidrolik seviyesi, rengi (koyu kahve olmamalı) and nemi." },
      { id: 25, text: "ABS Sensör Kabloları: Ön and arka hız sensörü kablo kılıflarında sürtünme, aşınma and yırtık kontrolü." },
      { id: 26, text: "ABS Okuyucu Diskleri: Tone ring (sinyal halkası) dişlerinde kırılma, eğrilik veya çamur/toz birikimi." },
      { id: 27, text: "Fren Hortumları: Hidrolik fren hortumlarında kılcal çatlak, yırtık veya rakor diplerinde sızıntı." },
      { id: 28, text: "Kaliper Pistonları: Kaliper pistonlarının sıkışmadan rahatça ileri-geri hareket etmesi and balata boşluğu." },
      { id: 29, text: "ABS Modülü Rekorları: ABS hidrolik modül girişlerindeki metal rekorların sızdırmazlığı and oksit kontrolü." },
      { id: 30, text: "Fren Müşürleri: Ön/arka fren kolları sıkıldığında stop lambasının yanma kararlılığı and müşür sesi." }
    ]
  },
  {
    category: "Elektrik & Elektronik (10 Nokta)",
    items: [
      { id: 31, text: "Akü Boşta Voltajı: Multimetre ile kontak kapalıyken akü voltajı ölçümü (Minimum 12.5 V olmalıdır)." },
      { id: 32, text: "Şarj Voltajı: Motor çalışırken and devir çevirirken kutup başı şarj voltajı (13.8 V - 14.8 V aralığı)." },
      { id: 33, text: "Marş Akımı Çekişi: Marş anında akü voltajının 9.6 V seviyesinin altına düşmemesi (akü sağlık kontrolü)." },
      { id: 34, text: "Smart Key İletişimi: Anahtarsız çalıştırma sisteminin algılama mesafesi, topuz kilitleme and pil uyarısı." },
      { id: 35, text: "Sele Kilidi Motoru: Sele açma butonuna basıldığında elektro-mekanik kilit mekanizmasının açılma hızı." },
      { id: 36, text: "Sonradan Çekilen Tesisat: Sis farı, alarm, çakmaklık eklentilerinde röle, sigorta and izole kablo kullanımı." },
      { id: 37, text: "Gösterge Selamlaması: Kontak ilk açıldığında tüm ikaz ışıklarının (ABS, motor arıza vb.) yanıp sönmesi." },
      { id: 38, text: "Far and Sinyal Grubu: Orijinal LED farlarda titreme/kırpışma and sinyal rölesinin ritmik hızı." },
      { id: 39, text: "Yan Sehpa Müşürü: Yan sehpa açıkken marşın engellenmesi and motor çalışırken açıldığında stop etme." },
      { id: 40, text: "Rad Fanı Çalışması: Motor harareti yükseldiğinde radyatör fanının ses çıkarmadan devreye girmesi." }
    ]
  },
  {
    category: "Kaporta & Kozmetik (5 Nokta)",
    items: [
      { id: 41, text: "Grenaj UV Analizi: UV ışık altında panellerin orijinal vernik/boya yansıma simetrisi (Boyalı parça tespiti)." },
      { id: 42, text: "Plastik Onarımlar: Panel içlerinde havya and kelepçe (zip tie) ile yapılmış plastik kaynak izlerinin aranması." },
      { id: 43, text: "Panel Boşlukları: Grenaj birleşim çizgilerindeki (tüm gövdede) milimetrik simetri and boşluk kontrolü." },
      { id: 44, text: "Cam Kızak Mekanizması: Ayarlanabilir ön siperlik camı kızaklarının pürüzsüz çalışması and boşluk durumu." },
      { id: 45, text: "Sele Kilidi Menteşesi: Sele menteşesinde eksenel boşluk, kırılma, yırtılma and sele kapanma hizası." }
    ]
  },
  {
    category: "Yasal & Evrak (5 Nokta)",
    items: [
      { id: 46, text: "Şasi No Doğrulaması: Gidon boynu altındaki 17 haneli şasi numarasının ruhsatla tam eşleşmesi." },
      { id: 47, text: "Motor No Doğrulaması: Blok üzerindeki motor numarasının okunabilirliği, kazınma olmaması and ruhsat eşleşmesi." },
      { id: 48, text: "TRAMER Hasar Kaydı: SMS 5664 üzerinden and şasi numarasıyla e-Devlet/SBM portallarından detaylı hasar sorgusu." },
      { id: 49, text: "Tescil Durumu: e-Devlet üzerinden aktif rehin, haciz, hak mahrumiyeti veya çekme belgesi sorgusu." },
      { id: 50, text: "Yedek Anahtar: Orijinal 6 haneli akıllı anahtar PIN kod kartı, yedek anahtar and acil mekanik anahtarı." }
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
  const [diskThickness, setDiskThickness] = useState(4.5);
  const [odometer, setOdometer] = useState(10000);

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
                          Rölantide üst kapaktan gelen çok ince, metalik dikiş makinesi tarzı ritmik &quot;tık-tık&quot; sesi supap boşluğunun (clearance) arttığının işaretidir. Aşırı yüksek metalik vuruş sesi ise aşınmış kam millerini gösterir.
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
                    <div className="glass-frost p-6 border-emerald-500/10 bg-emerald-500/[0.01] flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white h-display flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-emerald-400" />
                          Kilometre Aşınma İndeksi &amp; Km Sahtekarlığı Hesaplayıcı
                        </h3>
                        <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                          Göstergedeki kilometre saatlerinin geri çekilmesi (odometer rollback) en yaygın sahtekarlıktır. Ancak mekanik metal aşınması asla yalan söylemez. Aşağıdaki araç ile disk kalınlığını ve kilometreyi girip risk analizi yapabilirsiniz.
                        </p>

                        {/* Interactive Calculator Inputs */}
                        <div className="mt-6 space-y-5">
                          <div>
                            <div className="flex justify-between text-xs font-mono mb-2">
                              <span className="text-carbon-300">Ölçülen Ön Disk Kalınlığı:</span>
                              <span className="text-emerald-400 font-bold">{diskThickness.toFixed(1)} mm</span>
                            </div>
                            <input
                              type="range"
                              min="3.5"
                              max="4.5"
                              step="0.1"
                              value={diskThickness}
                              onChange={(e) => setDiskThickness(parseFloat(e.target.value))}
                              className="w-full h-1 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-emerald-400"
                            />
                            <div className="flex justify-between text-[10px] text-carbon-400 font-mono mt-1">
                              <span>3.5 mm (Aşırı Aşınmış)</span>
                              <span>4.0 mm (Sınır)</span>
                              <span>4.5 mm (Yeni/Sıfır)</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-mono mb-2">
                              <span className="text-carbon-300">Gösterge Kilometresi:</span>
                              <span className="text-emerald-400 font-bold">{odometer.toLocaleString("tr-TR")} km</span>
                            </div>
                            <input
                              type="range"
                              min="1000"
                              max="80000"
                              step="1000"
                              value={odometer}
                              onChange={(e) => setOdometer(parseInt(e.target.value))}
                              className="w-full h-1 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-emerald-400"
                            />
                            <div className="flex justify-between text-[10px] text-carbon-400 font-mono mt-1">
                              <span>1.000 km</span>
                              <span>40.000 km</span>
                              <span>80.000 km+</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Calculator Analysis Output */}
                      <div className="mt-6 rounded-xl bg-black/40 p-5 border border-white/[0.04]">
                        <div className="font-mono text-[9px] uppercase tracking-wider text-carbon-400">Metalik Aşınma Analiz Raporu</div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                          <div className="bg-white/[0.02] p-2 rounded-lg">
                            <span className="text-[9px] text-carbon-400 block font-mono">HESAPLANAN AŞINMA</span>
                            <span className="text-sm font-mono font-bold text-white">{(4.5 - diskThickness).toFixed(2)} mm</span>
                          </div>
                          <div className="bg-white/[0.02] p-2 rounded-lg">
                            <span className="text-[9px] text-carbon-400 block font-mono">DİSK DURUMU</span>
                            <span className={`text-sm font-mono font-bold ${diskThickness < 4.0 ? "text-rose-400" : "text-emerald-400"}`}>
                              {diskThickness < 4.0 ? "LİMİT DIŞI" : "GÜVENLİ"}
                            </span>
                          </div>
                        </div>

                        {/* Decision banners */}
                        {(4.5 - diskThickness) >= 0.3 && odometer < 15000 ? (
                          <div className="mt-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3.5 flex gap-2.5">
                            <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider">KİLOMETRE SAHTEKARLIĞI RİSKİ!</h5>
                              <p className="mt-1 text-[11px] leading-relaxed text-carbon-200">
                                <strong className="text-white">KRİTİK UYARI:</strong> Orijinal ön disk kalınlığı {(4.5 - diskThickness).toFixed(2)} mm aşınmıştır. 15.000 km altındaki bir motorda bu seviyede aşınma gerçekleşemez. Kilometre en az 2 kat geri çekilmiş olabilir!
                              </p>
                            </div>
                          </div>
                        ) : diskThickness < 4.0 ? (
                          <div className="mt-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3.5 flex gap-2.5">
                            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider">DİSK GÜVENLİK SINIRI AŞILDI!</h5>
                              <p className="mt-1 text-[11px] leading-relaxed text-carbon-200">
                                Disk kalınlığı emniyet limiti olan <strong className="text-white">4.0 mm</strong> altına inmiştir. Frenaj esnasında diskin kırılma riski vardır. Derhal yenisiyle değiştirilmesi gerekir. (Tahmini parça maliyeti: 3.000 TL).
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3.5 flex gap-2.5">
                            <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">KM UYUMLU / DÜŞÜK RİSK</h5>
                              <p className="mt-1 text-[11px] leading-relaxed text-carbon-200">
                                Ölçülen aşınma miktarı ve beyan edilen kilometre değerleri birbiriyle tutarlı görünüyor. Mekanik açıdan şüpheli bir kilometre durumu tespit edilmemiştir.
                              </p>
                            </div>
                          </div>
                        )}
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
                <div className="space-y-6">
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

                  {/* ABS Diagnostics Section */}
                  <div className="mt-8 border-t border-white/[0.06] pt-8">
                    <h3 className="text-lg font-bold text-white h-display flex items-center gap-2 mb-6">
                      <ShieldAlert className="h-5 w-5 text-electric-cyan" />
                      ABS İkaz Lambası &amp; Manuel Test Konnektörü Teşhisi
                    </h3>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="glass-frost p-6 border-white/[0.04] bg-white/[0.005]">
                        <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          ABS İkaz Lambası Sürüş Davranış Analizi
                        </h4>
                        <div className="mt-4 space-y-4 text-xs text-carbon-300">
                          <div className="p-3 bg-white/[0.015] border border-white/[0.04] rounded-xl">
                            <strong className="text-white block mb-1">Kontak Açıldığında Sabit Yanma:</strong>
                            Motosiklet ilk çalıştırıldığında ABS lambası yanar. Tekerlek hız sensörleri kendini test etmek için <strong className="text-white">10 km/h</strong> hıza ulaşana kadar lambayı açık tutar. Bu hız aşıldığında sönmelidir.
                          </div>
                          <div className="p-3 bg-white/[0.015] border border-white/[0.04] rounded-xl">
                            <strong className="text-white block mb-1">Sürüş Esnasında Sürekli Yanması:</strong>
                            ABS tamamen devre dışıdır. En yaygın sebepleri: Ön/arka hız sensör kablosunun kopması, okuyucu tone ring dişlerinin çamurla dolması/eğrilmesi, ABS sigortasının atması veya ABS hidrolik ünitesinin arızalanmasıdır.
                          </div>
                          <div className="p-3 bg-white/[0.015] border border-white/[0.04] rounded-xl">
                            <strong className="text-white block mb-1">Sürüş Esnasında Yanıp Sönmesi:</strong>
                            ABS beyni aktif ancak ön ve arka tekerlek arasında hız uyumsuzluğu algılıyor. Motor orta sehpada çalıştırılıp arka tekerlek döndürüldüğünde (veya tek teker - wheelie yapıldığında) sistem arıza moduna geçerek yanıp söner. Fren müşürünün hatalı ayarı da bunu tetikler.
                          </div>
                        </div>
                      </div>

                      <div className="glass-frost p-6 border-white/[0.04] bg-white/[0.005] flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-electric-cyan" />
                            Gizli ABS Manuel Test Konnektör Protokolü
                          </h4>
                          <div className="mt-4 space-y-3 text-xs text-carbon-300 leading-relaxed">
                            <p>
                              Yamaha, ABS hata kodlarını harici bilgisayar bağlamadan okumak için ön panel kapağının arkasına gök mavisi (Sky Blue) bir test kablosu konumlandırmıştır.
                            </p>
                            <div className="bg-ink-950/80 p-4 border border-white/[0.04] rounded-xl font-mono text-[11px] text-electric-cyan space-y-1">
                              <div>1. Kontağı kapatın (OFF).</div>
                              <div>2. Gök mavisi test kablosunu bir jumper tel yardımıyla şasiye (Siyah/Şasi toprağı) köprüleyin.</div>
                              <div>3. Kontağı açın (ON) ve marşa basmayın.</div>
                              <div>4. ABS ikaz ışığı ritmik olarak yanıp sönmeye başlayacaktır. Uzun yanmalar onlar basamağını, kısa yanmalar birler basamağını belirtir (Örn: 2 uzun 1 kısa = Kod 21 ABS Hidrolik Valf Hatası).</div>
                            </div>
                            <p className="mt-2 text-[11px]">
                              <strong className="text-rose-400">Önemli Voltaj Kuralı:</strong> XMAX motorlarına rölesiz olarak doğrudan aküden çekilen LED sis farı veya alarm gibi eklentiler marşa basıldığında anlık voltaj dalgalanması yaratarak ABS beyninde <strong className="text-white">Kod 46 (Düşük Voltaj)</strong> arıza kodunu kaydettirir.
                            </p>
                          </div>
                        </div>
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
                    <div className="glass-frost p-6 border-white/[0.04] bg-white/[0.005] flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-sm font-bold text-electric-cyan uppercase">10.000 KM Bakımı</div>
                        <div className="mt-1 font-mono text-xs text-carbon-400">Ara Periyodik Servis</div>
                        
                        <ul className="mt-4 space-y-2 text-xs text-carbon-300 border-b border-white/[0.05] pb-4 mb-4">
                          <li>• Motor Yağı (1.5 L) &amp; Şanzıman Yağı</li>
                          <li>• Orijinal Kağıt Filtre &amp; Süzgeç Temizliği</li>
                          <li>• B74-E5407-00 (Varyatör Hava Filtresi)</li>
                          <li>• 1S7-E3440-00 (Yamaha Yağ Filtresi)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-carbon-400">Sabit Servis Ücreti</div>
                        <div className="mt-1 font-mono text-base font-bold text-white">3.500 TL</div>
                      </div>
                    </div>

                    {/* 20.000 KM */}
                    <div className="glass-frost p-6 border-amber-500/10 bg-amber-500/[0.005] flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-sm font-bold text-amber-400 uppercase">20.000 KM Bakımı</div>
                        <div className="mt-1 font-mono text-xs text-carbon-400">Birinci Ağır Bakım</div>
                        
                        <ul className="mt-4 space-y-2 text-xs text-carbon-300 border-b border-white/[0.05] pb-4 mb-4">
                          <li>• B5X-E7641-00 (V-Belt Tahrik Kayışı)</li>
                          <li>• Varyatör Bagaları (Slider) &amp; Kızaklar</li>
                          <li>• Standart Buji &amp; Tüm Filtre Setleri</li>
                          <li>• KIT-YP300-SER5 (Ağır Bakım Seti)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-carbon-400">Sabit Servis Ücreti</div>
                        <div className="mt-1 font-mono text-base font-bold text-white">9.500 TL</div>
                      </div>
                    </div>

                    {/* 40.000 KM */}
                    <div className="glass-frost p-6 border-rose-500/10 bg-rose-500/[0.005] flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-sm font-bold text-rose-400 uppercase">40.000 KM Bakımı</div>
                        <div className="mt-1 font-mono text-xs text-carbon-400">Tam Aktarma Revizyonu</div>
                        
                        <ul className="mt-4 space-y-2 text-xs text-carbon-300 border-b border-white/[0.05] pb-4 mb-4">
                          <li>• B74-E6620-00 (Arka Debriyaj Balatası)</li>
                          <li>• B74-F582U-00 (Orijinal Ön Fren Diski)</li>
                          <li>• Fren Hidroliği &amp; Soğutma Antifrizi</li>
                          <li>• Sübap Boşluğu (Clearance) Ayarı</li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-carbon-400">Sabit Servis Ücreti</div>
                        <div className="mt-1 font-mono text-base font-bold text-white">22.000 TL</div>
                      </div>
                    </div>

                    {/* 60.000 KM+ */}
                    <div className="glass-frost p-6 border-electric-violet/10 bg-electric-violet/[0.005] flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-sm font-bold text-electric-violet uppercase">60.000 KM+ Bakımı</div>
                        <div className="mt-1 font-mono text-xs text-carbon-400">Komple Motor Revizyonu</div>
                        
                        <ul className="mt-4 space-y-2 text-xs text-carbon-300 border-b border-white/[0.05] pb-4 mb-4">
                          <li>• Eksantrik Zinciri &amp; Gergi Değişimi</li>
                          <li>• Piston-Segman Aşınma &amp; Silindir Rektefiye</li>
                          <li>• Su Pompası Seramik Keçe &amp; Conta Seti</li>
                          <li>• Varyatör Şaftı Rulmanlarının Yenilenmesi</li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-carbon-400">Sabit Servis Ücreti</div>
                        <div className="mt-1 font-mono text-base font-bold text-white">35.000 TL</div>
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
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-5 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-xs font-bold text-rose-400">1. Şasi Isıl İşlemi</div>
                        <h4 className="mt-2 text-sm font-semibold text-white">Doğrultulmuş Şasi</h4>
                        <p className="mt-2 text-[11px] leading-relaxed text-carbon-300">
                          Bükülen ön furş yatağı veya şasi borularının ısıl işlemle doğrultulması metal yorgunluğunu aşırı artırır. Gidon yalpalaması (wobble) riski yaratır ve sürüş esnasında şasinin aniden ikiye bölünme riski vardır.
                        </p>
                      </div>
                    </div>

                    {/* Bayrak 2 */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-5 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-xs font-bold text-rose-400">2. Ruhsatsız Motor Değişimi</div>
                        <h4 className="mt-2 text-sm font-semibold text-white">Blok No Uyuşmazlığı</h4>
                        <p className="mt-2 text-[11px] leading-relaxed text-carbon-300">
                          Motor numarası ile ruhsat numarasının eşleşmemesi durumunda motor yasal olarak çalıntı veya kayıtsız statüsündedir. Noter satışı anında bloke olur ve TÜVTÜRK muayenesinden kesinlikle geçemez.
                        </p>
                      </div>
                    </div>

                    {/* Bayrak 3 */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-5 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-xs font-bold text-rose-400">3. Sürekli Mavi Duman</div>
                        <h4 className="mt-2 text-sm font-semibold text-white">Ağır Yağ Yakma</h4>
                        <p className="mt-2 text-[11px] leading-relaxed text-carbon-300">
                          Egzozdan rölantide dahi kesilmeyen mavi/gri duman gelmesi silindir duvarlarının çizildiğini, sekmanların bittiğini veya subap keçelerinin aşındığını gösterir. Komple motor rektifiyesi gerektiren çok pahalı bir hasardır.
                        </p>
                      </div>
                    </div>

                    {/* Bayrak 4 */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-5 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-xs font-bold text-rose-400">4. ABS Modül Hasarı (Kod 21)</div>
                        <h4 className="mt-2 text-sm font-semibold text-white">ABS Beyin Arızası</h4>
                        <p className="mt-2 text-[11px] leading-relaxed text-carbon-300">
                          ABS uyarı lambasının 10 km/h sonrasında da yanık kalması, modülün su alması veya sis farı gibi eklentilerin rölesiz bağlanmasıyla oluşan voltaj darbeleriyle beynin yanması. Değişimi son derece pahalı bir parçadır.
                        </p>
                      </div>
                    </div>

                    {/* Bayrak 5 */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-5 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-xs font-bold text-rose-400">5. Gevşek Eksantrik Cıvatası</div>
                        <h4 className="mt-2 text-sm font-semibold text-white">Dişli Cıvata Vuruntusu</h4>
                        <p className="mt-2 text-[11px] leading-relaxed text-carbon-300">
                          Özellikle 2023+ XMAX 250 modellerinde silindir kapağının sol üst kısmından gelen düzensiz metalik takırtı sesleri. Eksantrik dişli sabitleme cıvatasının gevşediğini gösterir. Zamanında sıkılmazsa motor kitlenir and parçalanır.
                        </p>
                      </div>
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
