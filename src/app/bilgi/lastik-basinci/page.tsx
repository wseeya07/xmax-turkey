"use client";

import { useState } from "react";
import { 
  Thermometer, 
  ShieldAlert, 
  Wrench, 
  Gauge, 
  AlertTriangle, 
  Info,
  CheckCircle2,
  Flame,
  ArrowRight,
  Compass,
  Cpu,
  Layers,
  Activity,
  TrendingDown
} from "lucide-react";
import { TIRE_PRESSURE } from "@/data/tire-pressure";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

// Matrix of pressure depending on condition
const PRESSURE_MATRIX = [
  {
    temp: "Aşırı Sıcak (>35°C)",
    road: "Kuru BSK Asfalt",
    load: "Tek veya Çift Kişi",
    front: "29 psi (2.00 bar)",
    rear: "33 psi (2.25 bar)",
    effect: "Yüksek asfalt sıcaklığında aşırı karkas genleşmesini önler, standart temas yüzeyini korur."
  },
  {
    temp: "Ilıman / Bahar (15°C - 25°C)",
    road: "Karışık Şehir İçi",
    load: "Tek veya Çift Kişi",
    front: "29 psi (2.00 bar)",
    rear: "33 psi (2.25 bar)",
    effect: "Optimum şasi geometrisi, kararlı viraj çizgisi ve dengeli aşınma karakteri sağlar."
  },
  {
    temp: "Aşırı Soğuk (<5°C)",
    road: "Islak / Nemli Sathi Kaplama",
    load: "Tek Sürücü (Hafif Yük)",
    front: "28 psi (1.93 bar)",
    rear: "31 psi (2.14 bar)",
    effect: "Kış lastiğinde (örn: Anlas Winter Grip 2) karkasın daha kolay esneyerek ısınmasını sağlar, tutuşu artırır."
  },
  {
    temp: "Aşırı Soğuk (<5°C)",
    road: "Karlı / Çamurlu Zemin",
    load: "Çift Kişi (Ağır Yük)",
    front: "29 psi (2.00 bar)",
    rear: "33 psi (2.25 bar)",
    effect: "Ağır yük altında jantın çukurlarda darbe almasını (pinch flat) engeller, stabiliteyi korur."
  },
  {
    temp: "Geçiş Mevsimleri",
    road: "Bozuk / Çukurlu Yol",
    load: "Tek veya Çift Kişi",
    front: "29 psi (2.00 bar)",
    rear: "33 psi (2.25 bar)",
    effect: "Jant eğrilmesini ve ön amortisör keçe hasarlarını önlemek için standart basınç korunmalıdır."
  }
];

const RED_FLAGS = [
  {
    title: "Lastik Yanağında Balon / Şişlik",
    cause: "Darbe nedeniyle karkas içindeki kord bezlerinin veya çelik tellerin kopması.",
    risk: "ÇOK YÜKSEK (Ani Yarılma ve Patlama Riski)",
    action: "Motosikletin sürülmesi kesinlikle yasaklanmalı, lastik derhal yenisiyle değiştirilmelidir."
  },
  {
    title: "Kılcal Çatlaklar (Ozon / Yaşlanma)",
    cause: "Lastik hamurunun ömrünü tamamlaması, UV ışınları ve kimyasal maruziyet.",
    risk: "YÜKSEK (Hamur Sertleşmesi ve Ani Kayma)",
    action: "Diş derinliği yeterli olsa bile lastik tutunma özelliğini kaybetmiştir; yeni tarihli (DOT) lastik takılmalıdır."
  },
  {
    title: "Testere Dişi Aşınma (Cupping)",
    cause: "Yanlış hava basıncı, bozuk amortisör sönümlemesi veya agresif frenleme.",
    risk: "ORTA (Gidonda Titreşim ve Kararsız Viraj)",
    action: "Amortisör hidrolikleri ve yayları kontrol edilmeli, lastik rotasyonu veya değişimi yapılmalıdır."
  },
  {
    title: "Supap Dibinde Mikro Yırtıklar",
    cause: "Kauçuk supabın yaşlanması veya TPMS sensörünün yarattığı merkezkaç bükülme.",
    risk: "ÇOK YÜKSEK (Sürüş Esnasında Ani Hava Boşalması)",
    action: "Lastik sökülmeli, supap derhal paslanmaz çelik/alüminyum metal supap ile değiştirilmelidir."
  },
  {
    title: "Haftalık 2 PSI'dan Fazla Basınç Kaybı",
    cause: "Lastik topuğunun janta tam oturamaması veya mikro çivi/vida girmesi.",
    risk: "YÜKSEK (Sürüş Esnasında Lastik Sönmesi)",
    action: "Lastik sökülerek jant topuk bölgesi temizlenmeli, batan cisim varsa mantar yama ile onarılmalıdır."
  },
  {
    title: "Lastik Merkezinde Düzleşme (Square Tire)",
    cause: "Yoğun otoyol kullanımı, dik sürüş ve aşırı yüksek basınç.",
    risk: "ORTA (Viraja Girişte Direnç ve Düşme Hissi)",
    action: "Lastik profil geometrisini kaybetmiştir; viraj emniyeti için lastik takımı yenilenmelidir."
  }
];

export default function TirePressurePage() {
  const [activeTab, setActiveTab] = useState<"standard" | "matrix" | "fobo" | "redflags">("standard");

  return (
    <>
      {/* Dynamic SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "Yamaha XMAX 250 ve 300 Jenerasyonlarında Lastik Hava Basıncı Yönetimi ve Sürüş Güvenliği Analizi",
            "description": "XMAX 250, 300 ve Tech MAX modelleri için Gay-Lussac termodinamik yasası, soğuk basınç ölçüm protokolleri, kış/yaz optimizasyonu ve TPMS metal supap zorunluluğu detayları.",
            "inLanguage": "tr-TR"
          })
        }}
      />

      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Lastik ve Güvenlik Mühendisliği"
          title={
            <>
              XMAX Lastik Basınç Yönetimi{" "}
              <br className="hidden sm:block" />
              <span className="text-electric">ve Sürüş Güvenliği Analizi</span>
            </>
          }
          description="Yamaha XMAX şasi geometrisinin, arka salıncak (unit swingarm) mimarisinden ötürü lastik hava basıncına hassasiyeti son derece yüksektir. Sıcaklık dalgalanmaları, yük durumları ve güvenlik protokollerini içeren kapsamlı mühendislik rehberi."
        />
      </section>

      {/* Navigation Tabs */}
      <section className="container-x pb-8">
        <div className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-4">
          {[
            { id: "standard", label: "Standartlar & Termodinamik", icon: Gauge },
            { id: "matrix", label: "Durumsal Basınç Matrisi", icon: Layers },
            { id: "fobo", label: "TPMS & Supap Güvenliği", icon: Cpu },
            { id: "redflags", label: "Kırmızı Bayraklar", icon: ShieldAlert }
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

      {/* Content Sections based on Active Tab */}
      <section className="container-x pb-24">
        {activeTab === "standard" && (
          <div className="space-y-12">
            {/* 1. Technical Table & Historical Context */}
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
                <div className="glass p-6 sm:p-8">
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-electric-cyan">
                      <Gauge className="h-4 w-4" />
                    </span>
                    <h3 className="h-display text-xl font-semibold text-white">Resmi Yamaha El Kitabı Basınç Standartları (2017+)</h3>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                    2017 yılından itibaren yenilenen hafifletilmiş şasi ve geliştirilen süspansiyon geometrisi, motosikletin yükünden (tek kişi veya artçılı/yüklü) bağımsız olarak ön tekerleğin her zaman <strong className="text-white">29 psi (2.00 bar)</strong>, arka tekerleğin ise <strong className="text-white">33 psi (2.25 bar)</strong> basınçta tutulmasını zorunlu kılmıştır.
                  </p>

                  <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.01]">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.06] bg-white/[0.02] font-mono text-[9px] uppercase tracking-[0.15em] text-carbon-400">
                          <th className="px-4 py-3">Model Jenerasyonu</th>
                          <th className="px-4 py-3">Ön Lastik & Basınç</th>
                          <th className="px-4 py-3">Arka Lastik & Basınç</th>
                          <th className="px-4 py-3">Maksimum Yük Sınırı</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04] font-mono text-carbon-200">
                        {TIRE_PRESSURE.filter(r => r.model !== "XMAX 400").map((row) => (
                          <tr key={row.model} className="hover:bg-white/[0.01]">
                            <td className="px-4 py-4 font-semibold text-white">{row.model} (2017+)</td>
                            <td className="px-4 py-4">{row.size.front} <br/><span className="text-electric-cyan font-bold">29 psi (2.00 bar)</span></td>
                            <td className="px-4 py-4">{row.size.rear} <br/><span className="text-electric-cyan font-bold">33 psi (2.25 bar)</span></td>
                            <td className="px-4 py-4 text-xs">161 - 167 kg</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5 rounded-xl border border-white/[0.04] bg-white/[0.015] p-4 text-xs leading-relaxed text-carbon-300">
                    <span className="font-bold text-white uppercase tracking-[0.1em] text-[10px] block mb-1">Tarihsel Not:</span>
                    2016 ve öncesi XMAX kasalarında tek kişi kullanımında 28 psi ön ve 32 psi arka, artçılı kullanımda ise 30 psi ön ve 36 psi arka gibi değişken basınç protokolleri uygulanmaktaydı. Ancak modern radyal ve bias-ply karkas yapıları ile amortisör sönümleme eğrilerinin uyumu nedeniyle 2017 sonrasında basınç yükten bağımsız olarak sabitlenmiştir.
                  </div>
                </div>

                {/* Thermodynamic & Gay-Lussac */}
                <div className="glass-quiet p-6 sm:p-8 flex flex-col justify-between border-electric-cyan/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-electric-violet">
                        <Flame className="h-4 w-4" />
                      </span>
                      <h3 className="h-display text-xl font-semibold text-white">Termodinamik & Gaz Yasaları Etkisi</h3>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                      Lastik içindeki hava, ideal gaz yasalarına göre hareket eder. Sabit hacim altında çalışan bir gazın basıncı ile mutlak sıcaklığı arasındaki doğrudan ilişki <strong className="text-white">Gay-Lussac Yasası</strong> ile açıklanır:
                    </p>

                    {/* Formula box */}
                    <div className="my-6 rounded-xl border border-white/[0.06] bg-black/40 p-5 text-center font-mono">
                      <div className="text-lg text-electric-cyan font-bold">
                        P₁ / T₁ = P₂ / T₂
                      </div>
                      <div className="mt-3 text-[10px] text-carbon-300 leading-relaxed">
                        Burada mutlak sıcaklık T (Kelvin) = °C + 273.15&apos;tir.
                        <br />
                        Fiziksel kural gereği, dış sıcaklıktaki her <strong className="text-white">10°C&apos;lik değişim</strong> lastik basıncında yaklaşık <strong className="text-white">0.1 bar (1.45 psi)</strong> sapmaya yol açar.
                      </div>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-carbon-300">
                      Sürüş esnasındaki mekanik esneme (fleks) ve asfaltla olan sürtünme nedeniyle lastik içi sıcaklık kısa sürede <strong className="text-white">20°C&apos;den 55°C-60°C</strong> seviyelerine fırlar. Bu durum sürüş esnasında basınçta doğal bir <strong className="text-electric-cyan">+0.3 ila +0.5 bar (+4.3 ila +7.2 psi) artış</strong> yaratır.
                    </p>
                  </div>

                  <div className="mt-6 rounded-xl border border-rose-500/10 bg-rose-500/[0.02] p-4 text-xs leading-relaxed text-rose-300">
                    <span className="font-bold text-white uppercase tracking-[0.1em] text-[10px] block mb-1">Hayati Uyarı:</span>
                    Lastik sıcakken (sürüşten hemen sonra) ölçüm yapılırsa yanıltıcı şekilde yüksek değer okunur. Sıcak lastikten hava tahliye edilmesi durumunda, lastik soğuduğunda basınç kritik seviyelerin altına düşer ve wobble tetikler. Basınç ayarı kesinlikle soğuk lastikle yapılmalıdır.
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 2. Step-by-Step Measurement Protocol */}
            <Reveal>
              <div className="glass p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-electric-cyan">
                    <Wrench className="h-4 w-4" />
                  </span>
                  <h3 className="h-display text-xl font-semibold text-white">Adım Adım Soğuk Lastik Basıncı Ölçüm Protokolü</h3>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      step: "01",
                      title: "Termal Stabilizasyon",
                      body: "Motosikletin en az 3 saattir tamamen hareketsiz kalmış olması veya 1.6 kilometreden (1 mil) daha az sürülmüş olması gerekir."
                    },
                    {
                      step: "02",
                      title: "Doğru Ortam Seçimi",
                      body: "Ölçümün doğrudan güneş ışığı almayan, gölgede yapılması gerekir. Güneş altında bekleyen lastiğin yanak sıcaklığı sapma yaratır."
                    },
                    {
                      step: "03",
                      title: "Kalibre Ekipman",
                      body: "Akaryakıt istasyonlarındaki pompalar yerine hassas, kalibre edilmiş dijital veya analog el tipi manometre kullanılması önerilir."
                    },
                    {
                      step: "04",
                      title: "Supap Temizliği",
                      body: "Supap kapağını açıp supap ağzındaki çamur, toz veya nemi temizleyin. Manometre ucunu dik açıyla supaba sıkıca bastırın."
                    },
                    {
                      step: "05",
                      title: "Basınç Ayarı",
                      body: "Ön tekerlek için tam 29 psi (2.00 bar), arka tekerlek için 33 psi (2.25 bar) hedeflenmeli, fazla hava varsa tahliye pimiyle düşürülmelidir."
                    },
                    {
                      step: "06",
                      title: "Sızdırmazlık Testi",
                      body: "Supap iğnesinin (iç mekanizma) sızdırmazlığı kontrol edilmeli ve yabancı maddelerin supaba girmesini engellemek için kapak sıkıca kapatılmalıdır."
                    }
                  ].map((s) => (
                    <div key={s.step} className="glass-quiet p-6 border-white/[0.03]">
                      <div className="font-mono text-2xl font-bold text-electric-cyan/40">{s.step}</div>
                      <h4 className="mt-2 text-sm font-semibold text-white h-display">{s.title}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-carbon-200">{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* 3. Pressure Deviation Effects (Low vs High) */}
            <Reveal>
              <div className="glass p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-electric-cyan">
                    <ShieldAlert className="h-4 w-4" />
                  </span>
                  <h3 className="h-display text-xl font-semibold text-white">Hatalı Lastik Basıncının Şasi ve Sürüş Güvenliğine Etkileri</h3>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {/* Low Pressure */}
                  <div className="rounded-2xl border border-rose-500/10 bg-rose-500/[0.01] p-6">
                    <h4 className="text-base font-bold text-rose-400 h-display uppercase tracking-[0.05em] flex items-center gap-2">
                      <TrendingDown className="h-4 w-4" />
                      Eksik Basınç (Düşük Hava) Riskleri
                    </h4>
                    
                    <ul className="mt-5 space-y-4 text-xs text-carbon-200 leading-relaxed">
                      <li className="flex gap-2">
                        <strong className="text-white shrink-0">Jant Darbesi (Pinch Flat):</strong>
                        Düşük basınçlı ön tekerleğin çukurlara girildiğinde ezilerek jant flanşı ile engel arasında sıkışıp anında patlaması ve jantın eğrilmesi.
                      </li>
                      <li className="flex gap-2">
                        <strong className="text-white shrink-0">Gidon Wobble ve Tank-Slapper:</strong>
                        50-80 km/h arası hızlarda gidonun anlamsızca sallanması (wobble) veya yüksek hızlarda kontrol edilemeyen gidon tokatlaması (tank-slapper) riski.
                      </li>
                      <li className="flex gap-2">
                        <strong className="text-white shrink-0">%10 Yakıt Artışı ve Güç Kaybı:</strong>
                        Lastik yuvarlanma direncinin artmasıyla motorun yaysız kütle üzerindeki yükünün artması, performans kaybı ve aşırı yakıt sarfiyatı.
                      </li>
                      <li className="flex gap-2">
                        <strong className="text-white shrink-0">Düzensiz Aşınma (Cupping):</strong>
                        Lastiğin iki yanından anormal aşınması, karkasın yan omuzlarında ısınma sonucu kepeksi dökülme ve yanal kaymalar.
                      </li>
                    </ul>
                  </div>

                  {/* High Pressure */}
                  <div className="rounded-2xl border border-amber-500/10 bg-amber-500/[0.01] p-6">
                    <h4 className="text-base font-bold text-amber-400 h-display uppercase tracking-[0.05em] flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Aşırı Basınç (Yüksek Hava) Riskleri
                    </h4>

                    <ul className="mt-5 space-y-4 text-xs text-carbon-200 leading-relaxed">
                      <li className="flex gap-2">
                        <strong className="text-white shrink-0">Temas Alanının Daralması:</strong>
                        Lastik sırtının sivrileşmesiyle yol temas yüzeyinin (contact patch) dramatik ölçüde daralması, virajda ani tutuş kayıpları ve ABS&apos;nin zamansız devreye girmesi.
                      </li>
                      <li className="flex gap-2">
                        <strong className="text-white shrink-0">Süspansiyon ve Furş Hasarı:</strong>
                        Yol darbelerinin süspansiyon yerine doğrudan şasiye iletilmesi, teleskobik çatal keçe patlamaları ve gidon furş yatağı (steering stem bearings) bilyalarının aşınması.
                      </li>
                      <li className="flex gap-2">
                        <strong className="text-white shrink-0">Çekiş Kontrol (TCS) Kararsızlığı:</strong>
                        Aşırı şişirilmiş arka lastiğin çapının milimetrik değişmesiyle, TCS sensörünün arka tekerleğin gereksiz patinaja düştüğünü sanarak motor gücünü zamansız kesmesi.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {activeTab === "matrix" && (
          <Reveal>
            <div className="glass p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-electric-cyan">
                  <Layers className="h-4 w-4" />
                </span>
                <h3 className="h-display text-xl font-semibold text-white">Sıcaklık, Yük ve Yol Koşullarına Göre Optimize Basınç Matrisi</h3>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                Türkiye coğrafyasının getirdiği büyük iklim çeşitliliği (yaz sıcağında +40°C, kışın sıfırın altındaki dereceler) ve yol kaplamaları (BSK Asfalt, sathi kaplama mıcır) lastiğin esnekliğini doğrudan etkiler. İşte durumsal optimizasyon matrisi:
              </p>

              <div className="mt-8 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.01]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[750px] text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/[0.06] bg-white/[0.03] font-mono text-[9px] uppercase tracking-[0.15em] text-carbon-400">
                        <th className="px-5 py-4">Sıcaklık Grubu</th>
                        <th className="px-5 py-4">Yol Tipi</th>
                        <th className="px-5 py-4">Yük Durumu</th>
                        <th className="px-5 py-4">Önerilen Basınç (Ön / Arka)</th>
                        <th className="px-5 py-4">Mühendislik Etkisi ve Detay</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04] text-carbon-200">
                      {PRESSURE_MATRIX.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                          <td className="px-5 py-4 font-semibold text-white">{row.temp}</td>
                          <td className="px-5 py-4 font-mono text-carbon-300">{row.road}</td>
                          <td className="px-5 py-4 font-mono text-carbon-300">{row.load}</td>
                          <td className="px-5 py-4 font-mono font-bold text-electric-cyan">{row.front} / {row.rear}</td>
                          <td className="px-5 py-4 text-xs leading-relaxed text-carbon-200">{row.effect}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/[0.04] bg-white/[0.015] p-5 text-xs leading-relaxed text-carbon-300">
                <span className="font-bold text-white uppercase tracking-[0.1em] text-[10px] block mb-1">Mühendislik Tavsiyesi:</span>
                Kış aylarında (<strong className="text-white">+5°C altı</strong>) kışlık vakumlu lastikler tercih edildiğinde, karkasın (lastik gövdesinin) yeterli esnekliğe ulaşıp ısınması için tek sürücü hafif yükte basınçların <strong className="text-white">1 psi düşürülmesi (28/31 psi)</strong> yanal tutuşu mükemmelleştirir.
              </div>
            </div>
          </Reveal>
        )}

        {activeTab === "fobo" && (
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="glass p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-electric-cyan">
                    <Cpu className="h-4 w-4" />
                  </span>
                  <h3 className="h-display text-xl font-semibold text-white">TPMS Entegrasyonu & Fobo Bike 2 Kurulumu</h3>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                  Lastik basıncındaki yavaş kaçakları (slow leak) sürüş esnasında manuel olarak tespit etmek neredeyse imkansızdır. XMAX şasisi için en güvenilir TPMS (Lastik Basınç Takip Sistemi) entegrasyonu Bluetooth 5.0 tabanlı <strong className="text-white">Fobo Bike 2</strong> ile sağlanır.
                </p>

                <div className="mt-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-white">Adım Adım Entegrasyon Protokolü:</h4>
                  {[
                    { step: "1", text: "Akıllı telefona resmi \"FOBO TPMS\" uygulamasını kurup Bluetooth/GPS izinlerini aktif edin ve yeni motosiklet profili oluşturun." },
                    { step: "2", text: "Sensör dış kapağını açarak CR1632 lityum pil altındaki şeffaf yalıtkan koruma bandını çekip çıkarın. O-ring contanın yuvaya oturduğunu doğrulayın." },
                    { step: "3", text: "Supap miline öncelikle kutudan çıkan pirinç kilit somununu (lock-nut) sonuna kadar vidalayın." },
                    { step: "4", text: "FOBO sensörünü supap miline dik açıyla, hava kaçırma sesi kesilene kadar hızlıca vidalayarak oturtun." },
                    { step: "5", text: "Kilit somununu özel anahtarıyla sensörün altına doğru ters yönde sıkıştırarak sabitleyin (hırsızlık ve gevşeme koruması)." },
                    { step: "6", text: "Bağlantı noktalarına sabunlu su sıkarak mikro hava kaçaklarının olmadığını (baloncuk testi) gözle kontrol edin." }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3 text-xs leading-relaxed text-carbon-200">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-electric-cyan/10 font-mono text-[10px] font-bold text-electric-cyan">
                        {item.step}
                      </span>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Steel Valve Warning */}
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-6 sm:p-8">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
                    <h3 className="h-display text-base font-bold text-white uppercase tracking-[0.05em]">Çok Kritik Metal Supap Zorunluluğu</h3>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-rose-200">
                    Fobo Bike 2 veya benzeri harici TPMS sensörleri yaklaşık <strong className="text-white">10 gram</strong> ağırlığa sahiptir. 
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-rose-200">
                    Motosiklet yüksek hızlara (örn: otoyolda 110-130 km/h) ulaştığında, tekerleğin dönme hızı nedeniyle sensörün üzerindeki merkezkaç (santrifüj) kuvveti katlanarak artar. Bu kuvvet, <strong className="text-white font-bold underline">orijinal esnek kauçuk supapların aşırı bükülmesine ve zamanla dipten yırtılarak ani hava boşalmasına</strong> sebep olur.
                  </p>

                  <div className="mt-5 border-t border-rose-500/20 pt-4 text-xs font-semibold text-white">
                    ⚠️ TEKNİK ŞART: TPMS sensörü takılmadan önce, tekerlek supapları kesinlikle 90 derece açılı, paslanmaz çelik veya alüminyum metal supaplar ile değiştirilmelidir.
                  </div>
                </div>

                <div className="glass p-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-white flex items-center gap-2">
                    <Compass className="h-4 w-4 text-electric-cyan" />
                    Fobo Bike 2 Çalışma Prensibi
                  </h4>
                  <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                    Sensör, dahili otomotiv sınıfı barometrik çip ile mutlak vakuma karşı basınç ölçümü yapar. Ortam basıncını (101.3 kPa) çıkartarak gösterge paneli ve telefona net lastik basıncını anlık aktarır. Bluetooth 5.0 ile telefon cebinizdeyken dahi ani kaçaklarda kask içi interkoma sesli uyarı gönderir.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {activeTab === "redflags" && (
          <Reveal>
            <div className="glass p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-rose-400">
                  <ShieldAlert className="h-4 w-4" />
                </span>
                <h3 className="h-display text-xl font-semibold text-white">Kırmızı Bayraklar: Hemen Müdahale Gerektiren Tehlike Belirtileri</h3>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                Lastiklerin fiziksel kondisyonundaki bazı deformasyonlar, ani kontrol kayıplarına yol açabilecek büyük risklerin habercisidir. Aşağıdaki belirtilerden biri tespit edildiğinde derhal teknik müdahale yapılmalıdır:
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {RED_FLAGS.map((flag, idx) => (
                  <div key={idx} className="glass-quiet border-rose-500/10 hover:border-rose-500/20 p-6 transition-all duration-300">
                    <div className="flex items-start gap-2.5">
                      <span className="grid size-6 place-items-center rounded-md bg-rose-500/10 text-rose-400 text-xs font-bold font-mono">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-white h-display">{flag.title}</h4>
                    </div>

                    <div className="mt-4 space-y-2 text-xs leading-relaxed">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-carbon-400 block">Fiziksel Neden</span>
                        <p className="text-carbon-200">{flag.cause}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-rose-400 block">Sürüş Güvenliği Riski</span>
                        <p className="font-semibold text-rose-300">{flag.risk}</p>
                      </div>
                      <div className="border-t border-white/[0.05] pt-2">
                        <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-electric-cyan block">Teknisyen Müdahale Protokolü</span>
                        <p className="text-carbon-100">{flag.action}</p>
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
