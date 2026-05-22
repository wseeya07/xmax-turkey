"use client";

import { useState } from "react";
import { 
  Wrench, 
  Droplet, 
  Flame, 
  Info,
  Calendar,
  AlertTriangle,
  Layers,
  Cpu,
  ShieldAlert,
  ChevronRight,
  TrendingDown,
  Activity,
  Award
} from "lucide-react";
import { MAINTENANCE_SCHEDULE } from "@/data/maintenance";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

// Physicochemical table data from PDF
const OIL_ANALYSIS = [
  {
    name: "Yamalube 4S 10W-40",
    base: "Yarı Sentetik (Grup II/III)",
    density: "~0.865 (15°C)",
    kin40: "~90.0",
    kin100: "~14.0",
    vi: "~150",
    flash: "~220°C",
    pour: "~-30°C",
    tbn: "~8.4",
    jaso: "MA2",
    api: "SG ve üzeri",
    character: "Yamaha'nın resmi tescilli markasıdır. Orijinal katalitik konvertör ve egzoz emisyon uyumluluğu mükemmeldir, ancak ağır yük altında diğer tam sentetik rakiplerine göre viskozite kaybı yaşayabilir."
  },
  {
    name: "Motul 7100 10W-40",
    base: "%100 Sentetik (Grup V Ester)",
    density: "0.853 (20°C)",
    kin40: "85.8",
    kin100: "13.2",
    vi: "155",
    flash: "246°C",
    pour: "-30°C",
    tbn: "8.4",
    jaso: "MA2 (2023)",
    api: "SP",
    character: "%100 sentetik Ester Teknolojisi sayesinde motor içi sürtünmeyi en aza indirir. 246°C parlama noktası, yoğun dur-kalk trafikte yağ eksiltmeyi (Noack buharlaşma kaybını) tamamen sıfırlar. En zorlu koşullar için üstün koruma sunar."
  },
  {
    name: "Motul 5100 10W-40",
    base: "Technosynthese (Ester Takviyeli)",
    density: "0.862 (20°C)",
    kin40: "92.3",
    kin100: "13.9",
    vi: "154",
    flash: "228°C",
    pour: "-36°C",
    tbn: "7.5",
    jaso: "MA2 (2023)",
    api: "SP",
    character: "Ester katkılı Technosynthese formülüyle harika bir fiyat/performans dengesi sunar. Dişli aşınmalarını (pitting) önler. -36°C akma noktasıyla kış aylarında soğuk marşta motorun anında yağlanmasını garanti eder."
  },
  {
    name: "Castrol Power 1 4T 10W-40",
    base: "Yarı Sentetik (Grup III/II)",
    density: "~0.860 (15°C)",
    kin40: "66.0",
    kin100: "13.5",
    vi: "145",
    flash: "Bilgi Yok",
    pour: "Bilgi Yok",
    tbn: "9.8",
    jaso: "MA2",
    api: "SL",
    character: "Power Release ve TriZone teknolojisiyle motor, debriyaj ve vites koruması sağlar. 40°C viskozitesi (66.0) çok düşüktür; bu da motor içi iç direnç kayıplarını azaltarak yakıt ekonomisi sağlar. 9.8 TBN değeriyle asidik atıkları mükemmel nötralize eder."
  },
  {
    name: "Liqui Moly 4T Street 10W-40",
    base: "Sentetik Teknoloji (Grup III)",
    density: "0.860 (15°C)",
    kin40: "96.0",
    kin100: "14.6",
    vi: "158",
    flash: "238°C",
    pour: "-36°C",
    tbn: "7.0",
    jaso: "MA2",
    api: "SP",
    character: "Alman mühendisliği ile üretilmiş yüksek performanslı yağdır. 100°C viskozitesi (14.6) en kalınıdır; bu da yaz sıcağında otoyolda yağ filminin aşırı incelmesini engeller. Düşük Noack kaybı ile yoğun kurye kullanımı ve uzun yol turları için idealdir."
  }
];

const FLUID_CAPACITIES = [
  {
    fluid: "Motor Yağı (Filter Değişimi ile)",
    x300: "1.50 Litre (Karter Toplam: 1.60 L) — *1.50 L üzerinde doldurmayın.",
    x250: "1.50 Litre (Karter Toplam: 1.70 L) — *1.50 L üzerinde doldurmayın.",
    spec: "SAE 10W-40 API SP, JASO MA2 / MB",
    interval: "5.000 km veya 1 Yıl",
    part: "Yamalube Scooter 4T 10W-40 / Orijinal Filtre: 1S7-E3440-00"
  },
  {
    fluid: "Final Dişli Kutusu (Şanzıman Yağı)",
    x300: "200 ml",
    x250: "250 ml",
    spec: "SAE 80W-90 API GL-4 Dişli Yağı",
    interval: "10.000 km veya 2 Yıl",
    part: "Yamalube Gear Case Lube GL-4"
  },
  {
    fluid: "Soğutma Sıvısı (Radyatör + Yedek Depo)",
    x300: "Toplam: ~1.28 L (Radyatör: 1.10 L / Yedek: Dahil)",
    x250: "Toplam: ~1.00 L (Radyatör: 800 ml / Yedek: Dahil)",
    spec: "Silikatsız OAT, 50% Antifriz + 50% Saf Su Karışımı",
    interval: "20.000 km veya 2 Yıl",
    part: "Liqui Moly Coolant Ready Mix 6924 / Tahliye Tapası: 5ST-E2615-00"
  }
];

const FLUID_RED_FLAGS = [
  {
    title: "Kırmızı Bayrak 1: Motor Yağının 1500 ml Üzerinde Doldurulması (Aşırı Dolum)",
    result: "Karter hacminin daralmasıyla krank milinin yağı köpürtmesi (aerasyon). Yağ pompasının köpüklü yağ basması sonucu hidrolik basınç düşer, supap ve biyel yatakları sarar.",
    symptom: "Aşırı yağın PCV valfi üzerinden hava kutusuna dolması, hava filtresinin tıkanması, bujinin yağlanıp körelmesi (LMAR8A-9), rölanti kararsızlığı ve mavi egzoz dumanı."
  },
  {
    title: "Kırmızı Bayrak 2: Yağ Filtresi Kapağı Cıvatalarının Aşırı Sıkılması",
    result: "Karter tapa torku olan 20 Nm değerinin, filtre kapağının narin M6 cıvatalarına uygulanması sonucu dişlerin sıyrılması.",
    symptom: "Cıvatanın karter bloğu içinde kırılarak yağ sızdırması ve bloğun sökülerek helikoil (kılavuz) diş açılmasını gerektiren 10.000 TL+ tutarında maliyetli servis operasyonu. Tork değeri tam 10 Nm olmalıdır."
  },
  {
    title: "Kırmızı Bayrak 3: Şanzıman (Final Dişli) Kutusunda Standart Motor Yağı Kullanımı",
    result: "Helis dişlilerin maruz kaldığı yüksek mekanik kesme (shear) kuvvetlerine karşı koruma sağlayan EP (Extreme Pressure) kükürt-fosfor katkılarının motor yağında olmaması.",
    symptom: "Sınır yağlama filminin yırtılmasıyla şanzımanda karıncalanma (pitting), dişlilerin aşınması ve şanzımandan gelen kalıcı ve yüksek bir uğultu sesi."
  },
  {
    title: "Kırmızı Bayrak 4: Silikat İçeren (Geleneksel Mavi/Yeşil) Antifriz Kullanımı",
    result: "Silikat tuzlarının yüksek devirli su pompası mekanik salmastrasında kristalleşerek seramik yüzeyi aşındırması.",
    symptom: "Mekanik seramik salmastranın sızdırmazlığını yitirmesi, su pompasının altındaki weep hole (gözetleme deliği) deliğinden dışarı antifriz sızması, zamanında müdahale edilmezse suyun kartere kaçarak yağla karışması (süt-kahve kıvamı köpük)."
  },
  {
    title: "Kırmızı Bayrak 5: Çeşme Suyu Kullanımı ve Farklı Tip Antifrizlerin Karıştırılması",
    result: "Çeşme suyundaki kireç ve minerallerin alüminyum radyatör kanallarında kireç taşı (CaCO3) tabakası oluşturarak ısı transferini engellemesi. Asidik tortu birikimi.",
    symptom: "Farklı kimyadaki antifrizlerin (OAT ve Silikatlı) reaksiyona girerek çamurlaşması ve radyatörü tıkaması; silindir kapak contası yakma ve motorun sürekli hararet yapması."
  }
];

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState<"intervals" | "oils" | "gear" | "coolant" | "capacities" | "redflags">("intervals");

  const PRIORITY_TONE = {
    kritik: "border-yamaha-400/40 bg-yamaha-500/10 text-yamaha-100",
    yüksek: "border-white/10 bg-white/[0.04] text-carbon-100",
    normal: "border-white/[0.06] bg-white/[0.02] text-carbon-200"
  } as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "Laboratuvar Standartlarında Yamaha XMAX 250/300 Sıvı Bakım ve Mühendislik Rehberi",
            "description": "XMAX motor yağı, dişli yağı, silikatsız antifriz standartları, PCV dinamikleri, su pompası hava alma adımları ve laboratuvar yağ test analizleri.",
            "inLanguage": "tr-TR"
          })
        }}
      />

      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Sıvı Bakımı & Mühendislik Rehberi"
          title={
            <>
              XMAX Periyodik Bakım ve
              <br className="hidden sm:block" />
              <span className="text-yamaha-300">Sıvı Teknolojileri Analizi</span>
            </>
          }
          description="Sıradan bir bakım takviminin ötesine geçin. XMAX motor yağının laboratuvar test verileri, şanzıman dişli kutusu EP katkıları, silikatsız soğutma sıvısı teknolojisi ve kritik tork limitleri bir arada."
        />
      </section>

      {/* Tabs Menu */}
      <section className="container-x pb-8">
        <div className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-4">
          {[
            { id: "intervals", label: "Kilometre Planı", icon: Calendar },
            { id: "oils", label: "Yağ Laboratuvarı & PCV", icon: Droplet },
            { id: "gear", label: "Şanzıman (Final Gear)", icon: Wrench },
            { id: "coolant", label: "Soğutma & Hava Alma", icon: Flame },
            { id: "capacities", label: "Kapasiteler Tablosu", icon: Layers },
            { id: "redflags", label: "Kritik Sıvı Hataları", icon: ShieldAlert }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                  isActive
                    ? "border-yamaha-400/40 bg-gradient-to-b from-yamaha-500/15 to-transparent text-white"
                    : "border-white/[0.05] bg-white/[0.015] text-carbon-300 hover:border-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="container-x pb-24">
        {/* TAB 1: Kilometer Intervals */}
        {activeTab === "intervals" && (
          <div className="space-y-6">
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
                    <p className="mt-4 max-w-3xl text-xs leading-relaxed text-carbon-200">
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
          </div>
        )}

        {/* TAB 2: Oils & PCV */}
        {activeTab === "oils" && (
          <div className="space-y-12">
            <Reveal>
              <div className="glass p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-yamaha-300">
                    <Droplet className="h-4 w-4" />
                  </span>
                  <h3 className="h-display text-xl font-semibold text-white">Motor Yağı Fizikokimyasal Karşılaştırma Matrisi</h3>
                </div>

                <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.01]">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px] text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/[0.06] bg-white/[0.03] font-mono text-[9px] uppercase tracking-[0.15em] text-carbon-400">
                          <th className="px-4 py-3">Fizikokimyasal Parametreler</th>
                          <th className="px-4 py-3">Yamalube 4S 10W-40</th>
                          <th className="px-4 py-3">Motul 7100 10W-40</th>
                          <th className="px-4 py-3">Motul 5100 10W-40</th>
                          <th className="px-4 py-3">Castrol Power 1 4T</th>
                          <th className="px-4 py-3">Liqui Moly 4T Street</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04] font-mono text-carbon-200">
                        <tr>
                          <td className="px-4 py-3.5 font-bold text-white">Baz Yağ Sınıfı</td>
                          <td className="px-4 py-3.5">Yarı Sentetik (Grup II/III)</td>
                          <td className="px-4 py-3.5 text-electric-cyan font-bold">%100 Sentetik (Grup V Ester)</td>
                          <td className="px-4 py-3.5">Technosynthese (Ester)</td>
                          <td className="px-4 py-3.5">Yarı Sentetik (Grup III/II)</td>
                          <td className="px-4 py-3.5">Sentetik Teknoloji (Grup III)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5 font-bold text-white">Yoğunluk (g/ml)</td>
                          <td className="px-4 py-3.5">~0.865 (@15°C)</td>
                          <td className="px-4 py-3.5">0.853 (@20°C)</td>
                          <td className="px-4 py-3.5">0.862 (@20°C)</td>
                          <td className="px-4 py-3.5">~0.860 (@15°C)</td>
                          <td className="px-4 py-3.5">0.860 (@15°C)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5 font-bold text-white">Kinematik Visk. @40°C (mm²/s)</td>
                          <td className="px-4 py-3.5">~90.0</td>
                          <td className="px-4 py-3.5">85.8</td>
                          <td className="px-4 py-3.5">92.3</td>
                          <td className="px-4 py-3.5">66.0 (En Düşük)</td>
                          <td className="px-4 py-3.5">96.0</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5 font-bold text-white">Kinematik Visk. @100°C (mm²/s)</td>
                          <td className="px-4 py-3.5">~14.0</td>
                          <td className="px-4 py-3.5">13.2</td>
                          <td className="px-4 py-3.5">13.9</td>
                          <td className="px-4 py-3.5">13.5</td>
                          <td className="px-4 py-3.5">14.6 (En Kalın)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5 font-bold text-white">Viskozite İndeksi (VI)</td>
                          <td className="px-4 py-3.5">~150</td>
                          <td className="px-4 py-3.5">155</td>
                          <td className="px-4 py-3.5">154</td>
                          <td className="px-4 py-3.5">145</td>
                          <td className="px-4 py-3.5">158</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5 font-bold text-white">Parlama Noktası (Flash Point)</td>
                          <td className="px-4 py-3.5">~220°C</td>
                          <td className="px-4 py-3.5 text-electric-cyan font-bold">246°C (En Yüksek)</td>
                          <td className="px-4 py-3.5">228°C</td>
                          <td className="px-4 py-3.5">Bilgi Yok</td>
                          <td className="px-4 py-3.5">238°C</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5 font-bold text-white">Akma Noktası (Pour Point)</td>
                          <td className="px-4 py-3.5">~-30°C</td>
                          <td className="px-4 py-3.5">-30°C</td>
                          <td className="px-4 py-3.5">-36°C (En Akıcı)</td>
                          <td className="px-4 py-3.5">Bilgi Yok</td>
                          <td className="px-4 py-3.5">-36°C (En Akıcı)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5 font-bold text-white">TBN Değeri (mg KOH/g)</td>
                          <td className="px-4 py-3.5">~8.4</td>
                          <td className="px-4 py-3.5">8.4</td>
                          <td className="px-4 py-3.5">7.5</td>
                          <td className="px-4 py-3.5 text-electric-cyan font-bold">9.8 (Üstün Nötralizasyon)</td>
                          <td className="px-4 py-3.5">7.0</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5 font-bold text-white">JASO / API Sınıfı</td>
                          <td className="px-4 py-3.5">MA2 / SG+</td>
                          <td className="px-4 py-3.5">MA2 / SP</td>
                          <td className="px-4 py-3.5">MA2 / SP</td>
                          <td className="px-4 py-3.5">MA2 / SL</td>
                          <td className="px-4 py-3.5">MA2 / SP</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {OIL_ANALYSIS.map((o) => (
                    <div key={o.name} className="glass-quiet p-6 border-white/[0.03]">
                      <div className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-[0.1em] text-yamaha-300">
                        <Award className="h-3 w-3" />
                        {o.base}
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-white h-display">{o.name}</h4>
                      <p className="mt-3 text-xs leading-relaxed text-carbon-200">{o.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* JASO MA2 vs MB & PCV Overfill */}
            <Reveal>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="glass p-6 sm:p-8">
                  <h3 className="h-display text-lg font-semibold text-white flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-electric-cyan" />
                    JASO MB vs MA2 Mühendislik Analizi
                  </h3>
                  <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                    JASO T903 standardı, motosikletlerin ıslak/kuru debriyaj yapılarına göre sürtünme sınırlarını belirler. Islak debriyajlı vitesli motorlarda debriyaj kaçırmasını önlemek için yüksek sürtünmeli <strong className="text-white">JASO MA/MA2</strong> (DFI &gt;= 1.45) zorunludur.
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                    Ancak Yamaha XMAX serisinde debriyaj kuru tiptir ve motor yağından tamamen yalıtılmış bir şanzıman ünitesiyle çalışır. Yani motor yağı, debriyaj plakalarına asla temas etmez.
                  </p>
                  <div className="mt-4 rounded-xl border border-white/[0.04] bg-white/[0.015] p-4 text-xs leading-relaxed text-carbon-300">
                    Teorik olarak XMAX bloğunda düşük sürtünme indeksli ve molibden katkılı <strong className="text-white">JASO MB</strong> yağ kullanımı motor içi sürtünmeyi düşürerek yakıt tasarrufu sağlar. Ancak Türkiye&apos;de bu yağların bulunabilirliği kısıtlıdır. Yetkili servis standartlarında JASO MA2 yağların motor bloğuna ve yataklarına hiçbir zararı yoktur, tamamen güvenlidir.
                  </div>
                </div>

                <div className="glass p-6 sm:p-8 border-rose-500/10 bg-rose-500/[0.01]">
                  <h3 className="h-display text-lg font-semibold text-white flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-rose-400" />
                    Karter Havalandırma (PCV) & Overfill Riski
                  </h3>
                  <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                    XMAX 300 ve 250 motorlarında, periyodik yağ değişimi esnasında (yağ filtresi dahil) net doldurulması gereken hacim tam olarak <strong className="text-white">1500 ml (1.50 Litre)</strong>&apos;dir. Toplam kuru karter hacmi 1600-1700 ml olsa dahi, sahada yağ değişiminde karterde bir miktar tortu ve süzülmeyen yağ kalır.
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-rose-300">
                    Gereksiz yere <strong className="text-white font-bold">1.50 L üzerinde</strong> (örn: 1600 ml kovayı tamamen boşaltmak) yağ dolumu yapmak karter hacmini daraltır. Dönen krank mili, yüksek seviyedeki yağa çarparak havayla karıştırır ve yağı köpürtür (aerasyon). Köpüklü yağı basan yağ pompası basınç kaybeder, bu da supap kilitlenmesi ve biyel yatağı aşınmalarına yol açar.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* TAB 3: Transmission (Final Gear) */}
        {activeTab === "gear" && (
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="glass p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-yamaha-300">
                    <Wrench className="h-4 w-4" />
                  </span>
                  <h3 className="h-display text-xl font-semibold text-white">Final Dişli Kutusu (Şanzıman) Yağ Yönetimi</h3>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                  XMAX şanzıman mimarisinde, helis ve düz dişlilerin yüksek devirlerde maruz kaldığı ağır yükleri absorbe etmesi için bağımsız bir reduktör hücresi bulunur. Yamaha kitapçıklarında motor yağı muadilleri belirtilse de, şanzımanın mutlak korunması için <strong className="text-white">SAE 80W-90 API GL-4</strong> standardı dişli yağlarının kullanılması elzemdir.
                </p>

                <div className="mt-5 space-y-3.5 text-xs text-carbon-200 leading-relaxed">
                  <div className="flex gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-yamaha-400 shrink-0" />
                    <span><strong className="text-white">EP (Extreme Pressure) Katkıları:</strong> GL-4 yağlarında bulunan kükürt-fosfor katkıları, dişli dişlerinin birbirine bastığı mikro noktalarda aşırı ısınmayla bir film tabakası oluşturarak metalin metale sürtünüp karıncalanmasını (pitting) engeller.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-yamaha-400 shrink-0" />
                    <span><strong className="text-white">Uğultu Önleme:</strong> Standart motor yağı şanzımanda kullanıldığında shear (kesme) direncini kaybederek incelir ve dişlilerde aşınmayla birlikte geri dönüşü olmayan yüksek bir uğultu sesine yol açar.</span>
                  </div>
                </div>

                {/* Change Steps */}
                <h4 className="mt-8 text-xs font-bold uppercase tracking-[0.1em] text-white">Adım Adım Dişli Yağı Değişim Prosedürü:</h4>
                <div className="mt-4 space-y-4">
                  {[
                    { step: "1", text: "Şanzıman yağının akışkanlığını artırmak ve dipteki aşınma partiküllerini askıda tutmak için scooter ile kısa bir sürüş yapıp motoru orta sehpaya alın." },
                    { step: "2", text: "Arka tekerleğin sol tarafında bulunan ÜST dolum tapasını (fill bolt) uygun anahtarla sökün. (Öncelikle üst tapanın sökülmesi güvenlik kuralıdır; alt tapa söküldükten sonra üst tapa sıkışmışsa şanzıman yağsız kalır)." },
                    { step: "3", text: "Alt tahliye tapasını (drain bolt) gevşeterek eski dişli yağını kabın içine tamamen boşaltın. Yağ süzülürken arka tekerleği elinizle hafifçe döndürün." },
                    { step: "4", text: "Tahliye tapasının ucundaki mıknatıslı kısmı (varsa) biriken çapaklardan temizleyin ve bakır/alüminyum sızdırmazlık pulunu yenisiyle değiştirin." },
                    { step: "5", text: "Alt tapayı geri takıp tam 20 Nm torkla sıkın. Şanzıman dolum şırıngası yardımıyla XMAX 300 için 200 ml, XMAX 250 için ise 250 ml SAE 80W-90 GL-4 yağı doldurun." },
                    { step: "6", text: "Üst dolum tapasını 20 Nm torkla sıkarak kapatın. Kapağın çevresini balata spreyiyle temizleyip yağ sızıntısı kontrolü yapın." }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3 text-xs leading-relaxed text-carbon-200">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-yamaha-500/10 font-mono text-[10px] font-bold text-yamaha-300">
                        {item.step}
                      </span>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-quiet p-6 sm:p-8 flex flex-col justify-between border-rose-500/10">
                <div>
                  <h3 className="h-display text-lg font-bold text-white uppercase tracking-[0.05em] flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-rose-400" />
                    Şanzıman Hacim Limitleri
                  </h3>
                  <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06] bg-black/40">
                    <table className="w-full text-left text-xs font-mono">
                      <tbody>
                        <tr className="border-b border-white/[0.04]">
                          <td className="px-4 py-3 text-carbon-400">XMAX 300 Hacim</td>
                          <td className="px-4 py-3 text-white font-bold">200 ml</td>
                        </tr>
                        <tr className="border-b border-white/[0.04]">
                          <td className="px-4 py-3 text-carbon-400">XMAX 250 Hacim</td>
                          <td className="px-4 py-3 text-white font-bold">250 ml</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-carbon-400">Sıkma Torku</td>
                          <td className="px-4 py-3 text-electric-cyan font-bold">20 Nm (Her İki Tapa)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-rose-200">
                    Aşırı şanzıman yağı dolumu reduktör içi basıncı artırarak şanzıman keçelerinin patlamasına ve tekerlek milinden dışarı, fren diskine doğru yağ kaçmasına neden olabilir. Bu durum hayati frenleme zaafiyeti yaratır!
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* TAB 4: Cooling System & Air Bleeding */}
        {activeTab === "coolant" && (
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="glass p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-electric-violet">
                    <Flame className="h-4 w-4" />
                  </span>
                  <h3 className="h-display text-xl font-semibold text-white">Soğutma Antifriz Teknolojisi & Salmastra Koruması</h3>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                  XMAX motorları yüksek sıkıştırma oranına sahiptir ve bu da silindir kapağında yoğun bir termal yük oluşturur. Bu ısının tahliyesinde kesinlikle <strong className="text-white">Silikatsız (Silicate-Free) ve Fosfatsız OAT (Organik Asit)</strong> veya HOAT bazlı antifrizler kullanılmalıdır.
                </p>

                <div className="mt-5 space-y-4 text-xs text-carbon-200 leading-relaxed">
                  <div className="flex gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-electric-violet shrink-0" />
                    <span><strong className="text-white">Mekanik Salmastra Yıpranması:</strong> Geleneksel mavi veya yeşil antifrizlerdeki silikat molekülleri, su pompası mili üzerindeki mekanik seramik salmastrada (ceramic mechanical seal) birikerek kristalleşir. Bu kristaller zımpara etkisi yaratarak seramik yüzeyi aşındırır, su pompasının altındaki weephole deliğinden kartere su kaçmasına sebep olur.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-electric-violet shrink-0" />
                    <span><strong className="text-white">Distile (Saf) Su Zorunluluğu:</strong> Antifriz seyreltilmesinde çeşme suyu kesinlikle kullanılmamalıdır. Çeşme suyundaki mineraller radyatör kanallarında kireç taşı (CaCO3) oluşturarak ısı transferini engeller ve hararete yol açar.</span>
                  </div>
                </div>

                {/* Air Bleeding Steps */}
                <h4 className="mt-8 text-xs font-bold uppercase tracking-[0.1em] text-white">Soğutma Sistemi Havasını Alma (Air Bleeding) Prosedürü:</h4>
                <div className="mt-4 space-y-4">
                  {[
                    { step: "1", text: "Motor soğukken radyatör kapağını açın. Su pompasının altındaki tahliye vidasını (Yamaha parça kodu: 5ST-E2615-00) sökerek eski sıvıyı tamamen boşaltın. Genleşme deposundaki eski sıvıyı şırınga yardımıyla çekin." },
                    { step: "2", text: "Tahliye vidasını 10 Nm torkla sıkarak kapatın. Radyatör boğazından yavaşça %50 silikatsız OAT antifriz ve %50 distile su hazır karışımını (örn: Liqui Moly Ready Mix) radyatör boğazına kadar doldurun. Genleşme deposunu \"Max\" çizgisine kadar doldurun." },
                    { step: "3", text: "Radyatör kapağı KESİNLİKLE AÇIK bırakılarak motoru rölantide çalıştırın. Motor rölantide çalışırken gaz elciğini hafifçe 2-3 kez açıp kapatarak (blipping) sistemdeki büyük hava kabarcıklarının radyatör boğazından dışarı atılmasını sağlayın." },
                    { step: "4", text: "Motor ısındıkça termostat açılacak ve radyatördeki sıvı seviyesi aniden düşecektir. Seviye düştükçe radyatör boğazına soğutma sıvısı eklemeye devam edin. Radyatör boğazından artık hiç hava kabarcığı çıkmayıp sıvı sabitlendiğinde kapağı sıkıca kapatın." },
                    { step: "5", text: "Motoru stop edip tamamen soğumaya bırakın. Soğuma esnasında sistem genleşme deposundan vakumla su çekecektir. Genleşme deposundaki sıvı seviyesini kontrol edip eksikse tekrar \"Max\" çizgisine kadar tamamlayın." }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3 text-xs leading-relaxed text-carbon-200">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-electric-violet/10 font-mono text-[10px] font-bold text-electric-violet">
                        {item.step}
                      </span>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-quiet p-6 sm:p-8 flex flex-col justify-between border-rose-500/10">
                <div>
                  <h3 className="h-display text-lg font-bold text-white uppercase tracking-[0.05em] flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-rose-400" />
                    Hava Alma Neden Hayatidir?
                  </h3>
                  <p className="mt-4 text-xs leading-relaxed text-rose-200">
                    Silindir kapağı su ceketlerinde biriken ufak bir hava kabarcığı (hava cebi) bile su devridaimini bloke eder. Termostat açılsa dahi radyatör fanı havayı soğutamaz. Bu durum silindir kapak contasının yanmasına (15.000 TL+ tamir faturası) ve motor bloğunun aşırı ısınmayla kilitlenmesine neden olabilir!
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* TAB 5: Capacities Table */}
        {activeTab === "capacities" && (
          <Reveal>
            <div className="glass p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-electric-cyan">
                  <Layers className="h-4 w-4" />
                </span>
                <h3 className="h-display text-xl font-semibold text-white">Sıvı Bakımı Hızlı Referans Tablosu</h3>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                Yamaha XMAX 250 ve 300 modellerinde kullanılması gereken orijinal parça kodları, sıvı viskoziteleri ve tahliye hacimlerini gösteren mühendislik referans tablosu:
              </p>

              <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.01]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/[0.06] bg-white/[0.03] font-mono text-[9px] uppercase tracking-[0.15em] text-carbon-400">
                        <th className="px-5 py-4">Sıvı ve Bakım Kalemi</th>
                        <th className="px-5 py-4">XMAX 300 Hacimleri</th>
                        <th className="px-5 py-4">XMAX 250 Hacimleri</th>
                        <th className="px-5 py-4">Önerilen Sınıf & Viskozite</th>
                        <th className="px-5 py-4">Değişim Periyodu</th>
                        <th className="px-5 py-4">Orijinal Ürün & Parça Kodu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04] text-carbon-200">
                      {FLUID_CAPACITIES.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                          <td className="px-5 py-4 font-semibold text-white">{row.fluid}</td>
                          <td className="px-5 py-4 font-mono text-carbon-300">{row.x300}</td>
                          <td className="px-5 py-4 font-mono text-carbon-300">{row.x250}</td>
                          <td className="px-5 py-4 font-mono text-electric-cyan font-bold">{row.spec}</td>
                          <td className="px-5 py-4 text-carbon-300">{row.interval}</td>
                          <td className="px-5 py-4 text-xs font-mono leading-relaxed text-carbon-200">{row.part}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* TAB 6: Fluid Red Flags */}
        {activeTab === "redflags" && (
          <Reveal>
            <div className="glass p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-rose-400">
                  <ShieldAlert className="h-4 w-4" />
                </span>
                <h3 className="h-display text-xl font-semibold text-white">Sıvı Bakım Kırmızı Bayrakları (Hatalı Uygulama Sonuçları)</h3>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                Motosiklet sıvı bakımlarında yapılan basit ve hatalı uygulamalar, XMAX motorlarında kalıcı ve yüksek maliyetli mekanik hasarlara zemin hazırlar. İşte asla yapılmaması gerekenler:
              </p>

              <div className="mt-8 space-y-6">
                {FLUID_RED_FLAGS.map((flag, idx) => (
                  <div key={idx} className="glass-quiet border-l-2 border-l-rose-500 border border-white/[0.03] p-6">
                    <h4 className="text-sm font-semibold text-white h-display flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                      {flag.title}
                    </h4>
                    
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-carbon-400 block mb-1">Mekanik Hasar ve Sonuç</span>
                        <p className="text-rose-200 leading-relaxed">{flag.result}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-amber-400 block mb-1">Gözlemlenebilir Belirtiler</span>
                        <p className="text-carbon-200 leading-relaxed">{flag.symptom}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
