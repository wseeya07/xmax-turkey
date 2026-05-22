"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Beaker,
  CircleAlert,
  Cog,
  Droplets,
  FlaskConical,
  Flame,
  Gauge,
  GitBranch,
  Layers,
  ListOrdered,
  Snowflake,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TestTube,
  Thermometer,
  Wrench
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

type TabId = "yag" | "sanziman" | "kapasiteler" | "hatalar";

const TABS: { id: TabId; label: string; icon: typeof Droplets; eyebrow: string }[] = [
  { id: "yag", label: "Yağ Teknolojileri", icon: FlaskConical, eyebrow: "Lab Verileri" },
  { id: "sanziman", label: "Şanzıman & Antifriz", icon: Droplets, eyebrow: "Sıvı Mühendisliği" },
  { id: "kapasiteler", label: "Kapasiteler Tablosu", icon: Gauge, eyebrow: "Hızlı Referans" },
  { id: "hatalar", label: "Kritik Hatalar", icon: AlertTriangle, eyebrow: "Kırmızı Bayraklar" }
];

type OilLabData = {
  brand: string;
  variant: string;
  baseOil: string;
  density: string;
  kv40: string;
  kv100: string;
  vi: string;
  flash: string;
  pour: string;
  tbn: string;
  jaso: string;
  api: string;
};

const OIL_LAB: OilLabData[] = [
  {
    brand: "Yamalube 4S",
    variant: "10W-40 (OEM)",
    baseOil: "Yarı Sentetik (Grup II/III)",
    density: "~0.865",
    kv40: "~90.0",
    kv100: "~14.0",
    vi: "~150",
    flash: "~220",
    pour: "~-30",
    tbn: "~8.4",
    jaso: "MA2",
    api: "SG ve üzeri"
  },
  {
    brand: "Motul 7100",
    variant: "10W-40 (Ester)",
    baseOil: "%100 Sentetik (Grup V Ester)",
    density: "0.853",
    kv40: "85.8",
    kv100: "13.2",
    vi: "155",
    flash: "246",
    pour: "-30",
    tbn: "8.4",
    jaso: "MA2 (2023)",
    api: "SP"
  },
  {
    brand: "Motul 5100",
    variant: "10W-40 (Tech)",
    baseOil: "Technosynthese (Ester Takviyeli)",
    density: "0.862",
    kv40: "92.3",
    kv100: "13.9",
    vi: "154",
    flash: "228",
    pour: "-36",
    tbn: "7.5",
    jaso: "MA2 (2023)",
    api: "SP"
  },
  {
    brand: "Castrol Power 1 4T",
    variant: "10W-40 (TriZone)",
    baseOil: "Yarı Sentetik (Grup III/II)",
    density: "~0.860",
    kv40: "66.0",
    kv100: "13.5",
    vi: "145",
    flash: "—",
    pour: "—",
    tbn: "9.8",
    jaso: "MA2",
    api: "SL"
  },
  {
    brand: "Liqui Moly 4T Street",
    variant: "10W-40 (Grup III)",
    baseOil: "Sentetik Teknoloji (Grup III)",
    density: "0.860",
    kv40: "96.0",
    kv100: "14.6",
    vi: "158",
    flash: "238",
    pour: "-36",
    tbn: "7.0",
    jaso: "MA2",
    api: "SP"
  }
];

type AccentKey = "yamaha" | "cyan" | "violet" | "ember";

const OIL_PROFILES: {
  brand: string;
  accent: AccentKey;
  headline: string;
  body: string;
  bestFor: string;
  note: string;
}[] = [
  {
    brand: "Yamalube 4S 10W-40",
    accent: "yamaha",
    headline: "OEM Tolerans Uyumu",
    body:
      "Yamaha'nın tescilli markası; motorun orijinal toleranslarına ve malzeme uyumuna göre mineral + sentetik baz yağların dengeli harmanıdır. Katalitik konvertör ve egzoz arıtmasıyla tam uyumlu, standart sürüşte yeterli aşınma koruması sunar.",
    bestFor: "Servis garantisi, günlük şehir içi sürüş, OEM uyumu önceliği.",
    note: "Yarı sentetik yapı nedeniyle yüksek devirli otoban sürüşlerinde viskozite kararlılığını tam sentetiklere göre daha hızlı kaybedebilir."
  },
  {
    brand: "Motul 7100 10W-40",
    accent: "cyan",
    headline: "Ester Teknolojisi — Lab Şampiyonu",
    body:
      "%100 sentetik, tescilli Ester Teknolojisi. Düşük çekiş katsayılı ester molekülleri, motor içi sürtünme kayıplarını minimuma indirir. 246°C parlama noktası, güney kıyıların aşırı yaz sıcaklarında ve dur-kalk trafiğinde Noack buharlaşma kaybını neredeyse tamamen engeller.",
    bestFor: "Akdeniz/Ege yaz koşulları, yüksek devirli sürüş, performans amaçlı kullanım.",
    note: "API SP onayı; piston temizliği, oksidasyon kararlılığı ve kuruma direncinde en üst düzey laboratuvar verisi."
  },
  {
    brand: "Motul 5100 10W-40",
    accent: "violet",
    headline: "Technosynthese — Fiyat/Performans",
    body:
      "Ester katkıları ile güçlendirilmiş Technosynthese (yarı sentetik üstü patentli) formülasyon. Günlük rekreasyonel sürüş ve işe gidiş-geliş için mükemmel fiyat-performans dengesi. Pitting ve scuffing önleyici yüksek performans katık paketi içerir.",
    bestFor: "Günlük gidiş-geliş, dört mevsim dengeli kullanım.",
    note: "VI 154 ve -36°C akma noktası kış aylarında hızlı yağlama, kararlı film dayanımı sağlar."
  },
  {
    brand: "Castrol Power 1 4T 10W-40",
    accent: "ember",
    headline: "TriZone & Yüksek TBN Koruması",
    body:
      "\"Power Release Technology\" ve \"TriZone\" teknolojisiyle donatılmış yarı sentetik formülasyon. 9.8 mg KOH/g seviyesindeki yüksek TBN değeri, Türkiye'deki yakıt kalitesi dalgalanmalarından kaynaklanabilecek asidik yanma ürünlerini başarıyla nötralize ederek motor içi korozyonu önler.",
    bestFor: "Değişken yakıt kalitesi olan bölgeler, kısa yol uzunlukları, sık çalıştırma.",
    note: "VI 145; aşırı termal yükler altında viskozitenin tam sentetikler kadar kararlı kalmayabileceği unutulmamalıdır."
  },
  {
    brand: "Liqui Moly 4T Street 10W-40",
    accent: "cyan",
    headline: "Düşük Noack & Uzun Mesafe Filmi",
    body:
      "Grup III sentetik baz yağlarla formüle edilmiştir. 14.6 mm²/s kinematik viskozite (100°C) ve 158 VI; yüksek sıcaklıklarda rakiplerine göre daha kalın ve kararlı yağ filmi oluşturur. %10 Noack buharlaşma kaybı, uzun ömürde yağ eksiltme sorununu minimize eder.",
    bestFor: "Uzun mesafe, yoğun kurye kullanımı, ısıl yüke maruz motor.",
    note: "Olağanüstü motor temizliği ve düşük çamur oluşumu — yüksek kilometreli XMAX motorları için tercih edilir."
  }
];

const ACCENT: Record<AccentKey, { ring: string; text: string; chip: string }> = {
  yamaha: {
    ring: "border-yamaha-400/30",
    text: "text-yamaha-200",
    chip: "bg-yamaha-500/15 text-yamaha-100 border-yamaha-400/30"
  },
  cyan: {
    ring: "border-electric-cyan/30",
    text: "text-electric-cyan",
    chip: "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30"
  },
  violet: {
    ring: "border-electric-violet/30",
    text: "text-electric-violet",
    chip: "bg-electric-violet/10 text-electric-violet border-electric-violet/30"
  },
  ember: {
    ring: "border-electric-ember/30",
    text: "text-electric-ember",
    chip: "bg-electric-ember/10 text-electric-ember border-electric-ember/30"
  }
};

const GEAR_OIL_STEPS = [
  {
    title: "Ön Hazırlık ve Sıcaklık Kontrolü",
    body:
      "Şanzıman yağının akışkanlığını artırmak ve dipte biriken mikro partikülleri askıda tutarak tahliye edebilmek için scooter kısa bir sürüşe çıkarılarak şanzıman sıcaklığı yükseltilir. Sürüş sonrasında araç düz bir zeminde orta sehpaya alınır."
  },
  {
    title: "Üst Dolum Tapa Cıvatasının Sökülmesi (Altın Kural)",
    body:
      "Tekerleğin sol arkasındaki aktarma bloğunda yer alan üst seviye/dolum tapa cıvatası uygun anahtar ile sökülür. Daima ilk olarak üst tapanın sökülmesi altın bir servis kuralıdır; alt tahliye sökülüp üst tapanın sıkışıp sökülememesi durumunda şanzıman yağsız kalır."
  },
  {
    title: "Yağın Tahliye Edilmesi",
    body:
      "Alt kısımda yer alan tahliye cıvatası sökülerek eski şanzıman yağı altındaki toplama kabına akıtılır. Tamamen süzülmesi için arka tekerlek hafifçe elle döndürülerek dişler arasındaki eski yağ da boşaltılır."
  },
  {
    title: "Mıknatıslı Tapa Temizliği ve Conta Değişimi",
    body:
      "Tahliye cıvatasının ucundaki mıknatıslı kısım (varsa) ve dişler üzerindeki metal çapakları fren balata temizleyici ile titizlikle temizlenir. Her iki cıvatanın altındaki bakır/alüminyum sızdırmazlık pulları yenileriyle değiştirilir."
  },
  {
    title: "Kapatma ve Hassas Dolum",
    body:
      "Alt tahliye cıvatası tork anahtarı ile 20 Nm değerinde sıkılır. Dişli kutusuna uygun bir yağ şırıngası kullanılarak XMAX 300 için 200 ml, XMAX 250 için 250 ml SAE 80W-90 API GL-4 dişli yağı doldurulur."
  },
  {
    title: "Montaj Sonu Kontrolleri",
    body:
      "Üst dolum cıvatası takılarak yine 20 Nm tork ile sıkılır. Sıkma işlemi bittikten sonra aktarma bloğundaki yağ kalıntıları temizlenir ve sızdırmazlık kontrolü yapılır."
  }
];

const COOLANT_STEPS = [
  {
    title: "Sistemin Boşaltılması",
    body:
      "Motor tamamen soğukken radyatör kapağı açılır. Su pompasının altındaki tahliye cıvatası ve radyatör tahliye tapası (Yamaha parça kodu: 5ST-E2615-00) sökülerek eski sıvı tamamen boşaltılır. Genleşme deposundaki eski sıvı bir şırınga ile çekilir."
  },
  {
    title: "Ön Dolum (%50 OAT + %50 Distile Su)",
    body:
      "Tahliye tapaları yerine takıldıktan sonra %50 silikatsız OAT antifriz ve %50 distile su karışımı, radyatörün doldurma ağzına kadar son derece yavaş bir şekilde doldurulur. Yavaş doldurma, havanın yukarı çıkabilmesi için gereklidir. Genleşme deposu \"Max\" çizgisine kadar tamamlanır."
  },
  {
    title: "Kapak Açık Çalıştırma ve Blipping",
    body:
      "Radyatör kapağı kesinlikle açık bırakılarak motor çalıştırılır. Rölantide ısınırken gaz elciği hafifçe 2-3 kez açılıp kapatılır (blip). Bu ani devir hareketleri, su pompası impeller hızını artırarak silindir kapağında ve hortumlarda sıkışmış inatçı hava ceplerini radyatör ağzına fırlatır."
  },
  {
    title: "Seviye Tamamlama ve Termostat Açılması",
    body:
      "Hava kabarcıkları yükseldikçe radyatördeki sıvı seviyesinin düştüğü gözlemlenir. Seviye düştükçe üzerine hazırlanan antifrizli karışımdan sürekli ekleme yapılır. Motor sıcaklığı termostat açılma derecesine ulaşıp radyatör hortumları tamamen ısındığında ve hava kabarcığı çıkışı durduğunda işlem tamamlanmıştır."
  },
  {
    title: "Sistemin Kapatılması ve Final Kontrol",
    body:
      "Radyatör kapağı yerine sıkıca kilitlenir. Motor stop edilip tamamen soğumaya bırakılır. Soğuma sonrasında büzüşen sıvı nedeniyle yedek depodan bir miktar sıvı çekilecektir; son olarak genleşme deposu seviyesi tekrar \"Max\" çizgisine tamamlanır."
  }
];

const CAPACITY_TABLE = [
  {
    fluid: "Motor Yağı",
    model: "XMAX 300 (Tüm Yıllar)",
    drain: "1.50 L (Filtresiz)",
    total: "1.60 L (Filtreli) — Sahada 1.50 L önerilir",
    spec: "SAE 10W-40 · API SP · JASO MB",
    interval: "5.000 km / 1 Yıl",
    code: "Yamalube Scooter 4T 10W-40 (LUB-10W40-AP-12)"
  },
  {
    fluid: "Motor Yağı",
    model: "XMAX 250 (Blue Core)",
    drain: "1.50 L",
    total: "1.70 L (Toplam)",
    spec: "SAE 10W-40 · API SP · JASO MB",
    interval: "5.000 km / 1 Yıl",
    code: "Yamalube Scooter 4T 10W-40"
  },
  {
    fluid: "Yağ Filtresi",
    model: "XMAX 250 / 300",
    drain: "—",
    total: "Kağıt Mikro-Eleman",
    spec: "OEM Kartuş",
    interval: "Her yağ değişiminde",
    code: "1S7-E3440-00-00"
  },
  {
    fluid: "Final Dişli Yağı",
    model: "XMAX 300 (Tüm Yıllar)",
    drain: "200 ml",
    total: "200 ml",
    spec: "SAE 80W-90 · API GL-4",
    interval: "10.000 km / 2 Yıl",
    code: "Yamalube Gear Case Lube GL-4"
  },
  {
    fluid: "Final Dişli Yağı",
    model: "XMAX 250 (Blue Core)",
    drain: "250 ml",
    total: "250 ml",
    spec: "SAE 80W-90 · API GL-4",
    interval: "10.000 km / 2 Yıl",
    code: "Yamalube Gear Case Lube GL-4"
  },
  {
    fluid: "Soğutma Sıvısı",
    model: "XMAX 300 (Tüm Yıllar)",
    drain: "Radyatör: 1.10 L",
    total: "~1.28 L (Yedek Depo Dahil)",
    spec: "Silikatsız OAT %50 + Distile Su %50",
    interval: "20.000 km / 2 Yıl",
    code: "Liqui Moly Coolant Ready Mix 6924 · Tahliye: 5ST-E2615-00"
  },
  {
    fluid: "Soğutma Sıvısı",
    model: "XMAX 250 (Blue Core)",
    drain: "Radyatör: 800 ml",
    total: "~1.00 L (Yedek Depo Dahil)",
    spec: "Silikatsız OAT %50 + Distile Su %50",
    interval: "20.000 km / 2 Yıl",
    code: "Liqui Moly Coolant Ready Mix 6924"
  }
];

const RED_FLAGS = [
  {
    icon: Droplets,
    title: "Kırmızı Bayrak 1 — 1500 ml Üzerinde Aşırı Yağ Dolumu",
    mechanism:
      "Karter hacminin daralmasıyla krank milinin yağı köpürtmesi (aerasyon). Yağ pompasının köpüklü yağ basması sonucu hidrolik basınç düşüşü ve biyel kolu yataklarının sarması.",
    damage:
      "Aşırı yağın PCV valfinden hava kutusuna dolması, hava filtresinin tıkanması, NGK LMAR8A-9 bujisinin yağlanarak körelmesi ve rölanti düzensizliği."
  },
  {
    icon: Wrench,
    title: "Kırmızı Bayrak 2 — Yağ Filtresi Kapağı Cıvatalarının Aşırı Sıkılması",
    mechanism:
      "Karter tapa torku olan 20 Nm değerinin, yağ filtresi kapağının narin M6 cıvatalarına da uygulanması.",
    damage:
      "M6 çelik cıvataların alüminyum motor bloğu içinde kırılarak dişleri sıyırması. Bu durum yağ sızıntılarına ve bloğun sökülerek kılavuz çekilmesini gerektiren pahalı servis operasyonlarına yol açar. Doğru tork değeri filtre kapağı için tam olarak 10 Nm'dir."
  },
  {
    icon: Cog,
    title: "Kırmızı Bayrak 3 — Şanzımanda Standart Motor Yağı Kullanımı",
    mechanism:
      "EP (Extreme Pressure) katkıları içermeyen motor yağının helis dişlilerin yüksek kesme kuvvetleri altında çalışması.",
    damage:
      "Sınır yağlama filminin yırtılmasıyla dişlilerin tepe noktalarında mikro kaynaklanmaların başlaması, karıncalanma (pitting), dişlerin dökülmesi ve şanzımandan kalıcı uğultu seslerinin gelmesi."
  },
  {
    icon: Snowflake,
    title: "Kırmızı Bayrak 4 — Silikat İçeren Geleneksel Mavi/Yeşil Antifriz",
    mechanism:
      "Silikat tuzlarının yüksek devirli su pompası içinde kristalleşerek çökmesi.",
    damage:
      "Sert silis kristallerinin su pompasının seramik mekanik salmastrasını aşındırarak sızdırmazlığı bozması. Sıvının öncelikle weep hole'dan akması, ardından kartere sızarak yağı bozması ve tüm yatakların sarması."
  },
  {
    icon: TestTube,
    title: "Kırmızı Bayrak 5 — Antifriz Karışımı veya Şebeke Suyu Kullanımı",
    mechanism:
      "OAT (Organik) antifriz ile geleneksel inorganik antifrizlerin karıştırılması ve sisteme kireçli şebeke suyu doldurulması.",
    damage:
      "Kimyasal reaksiyon sonucu soğutma sisteminde çamurlaşma ve jöle benzeri asidik tortu oluşumu. Kireç birikintileriyle radyatörün tıkanması, sistemin ısı transfer yeteneğini kaybederek silindir kapak contasını yakması ve alüminyum silindir kapağının çarpılması."
  }
];

export function MaintenanceLab() {
  const [tab, setTab] = useState<TabId>("yag");

  return (
    <>
      <Reveal>
        <div className="max-w-3xl">
          <span className="chip">
            <Beaker className="h-3.5 w-3.5" />
            Sıvı Mühendisliği Laboratuvarı
          </span>
          <h2 className="mt-4 h-display text-[clamp(1.8rem,3.8vw,2.6rem)] font-semibold leading-tight text-white">
            Türkiye iklim koşullarında <span className="text-electric-cyan">Yamaha XMAX</span> sıvı bakım rehberi.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-carbon-200">
            Blue Core motor mimarisi yüksek termal verim ve minimum mekanik sürtünme esasına dayanır. Türkiye&apos;nin coğrafi çeşitliliği
            (Akdeniz/Ege sıcakları → Doğu Anadolu kışı → Marmara dur-kalk trafiği) yağın hem soğuk akışkanlığını hem yüksek sıcaklık film
            mukavemetini sınırlandırır. Aşağıdaki interaktif panel, beş büyük markanın fizikokimyasal verilerini, JASO/PCV
            mühendisliğini, dişli ve antifriz prosedürlerini tek noktada sunar.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 glass-frost p-2 sm:p-3">
          <div role="tablist" className="flex flex-wrap gap-2">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "group flex min-w-[200px] flex-1 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all",
                    active
                      ? "border-electric-cyan/40 bg-gradient-to-r from-electric-cyan/15 via-electric-cyan/5 to-transparent shadow-ambient-blue"
                      : "border-transparent bg-white/[0.015] hover:border-white/[0.08] hover:bg-white/[0.04]"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl border",
                      active
                        ? "border-electric-cyan/40 bg-electric-cyan/10 text-electric-cyan"
                        : "border-white/[0.08] bg-white/[0.03] text-carbon-200 group-hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block font-mono text-[9px] uppercase tracking-[0.22em]",
                        active ? "text-electric-cyan" : "text-carbon-400"
                      )}
                    >
                      {t.eyebrow}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-white">{t.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="mt-10">
        {tab === "yag" && <OilTab />}
        {tab === "sanziman" && <TransmissionTab />}
        {tab === "kapasiteler" && <CapacityTab />}
        {tab === "hatalar" && <RedFlagsTab />}
      </div>
    </>
  );
}

function OilTab() {
  return (
    <div className="space-y-16">
      <Reveal>
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric-cyan">
            Bölüm 1 · Laboratuvar Karşılaştırması
          </span>
          <h3 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
            Genişletilmiş Motor Yağı Analizi & Laboratuvar Tablosu
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-carbon-200">
            Türkiye genel iklim koşullarında <strong className="text-white">10W-40</strong>, yıl boyunca en kararlı yağ filmini sunan ve
            mekanik aşınmayı en aza indiren viskozite sınıfı olarak kabul edilir. Aşağıda Türkiye pazarında bulunabilen beş popüler
            markanın TDS (teknik veri sayfası) çerçevesinde fizikokimyasal parametreleri verilmiştir.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-ink-950/40 backdrop-blur-md">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-electric-cyan">
                <th className="px-4 py-4">Fizikokimyasal Parametre</th>
                {OIL_LAB.map((o) => (
                  <th key={o.brand} className="px-4 py-4">
                    <div className="text-white">{o.brand}</div>
                    <div className="text-[10px] font-normal text-carbon-300">{o.variant}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-xs text-carbon-200">
              <LabRow label="Baz Yağ Sınıfı" cells={OIL_LAB.map((o) => o.baseOil)} />
              <LabRow label="Yoğunluk @15/20°C (g/ml)" cells={OIL_LAB.map((o) => o.density)} mono />
              <LabRow label="Kinematik Visk. @40°C (mm²/s)" cells={OIL_LAB.map((o) => o.kv40)} mono />
              <LabRow label="Kinematik Visk. @100°C (mm²/s)" cells={OIL_LAB.map((o) => o.kv100)} mono />
              <LabRow label="Viskozite İndeksi (VI)" cells={OIL_LAB.map((o) => o.vi)} mono accent />
              <LabRow label="Parlama Noktası (°C)" cells={OIL_LAB.map((o) => o.flash)} mono />
              <LabRow label="Akma Noktası (°C)" cells={OIL_LAB.map((o) => o.pour)} mono />
              <LabRow label="TBN (mg KOH/g)" cells={OIL_LAB.map((o) => o.tbn)} mono accent />
              <LabRow label="JASO Standardı" cells={OIL_LAB.map((o) => o.jaso)} />
              <LabRow label="API Sınıflandırması" cells={OIL_LAB.map((o) => o.api)} />
            </tbody>
          </table>
        </div>
      </Reveal>

      <div className="space-y-4">
        <Reveal>
          <h4 className="h-display text-xl font-semibold text-white">Marka Bazlı Kimyasal & Performans Profili</h4>
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-2">
          {OIL_PROFILES.map((p, i) => {
            const a = ACCENT[p.accent];
            return (
              <Reveal key={p.brand} delay={i * 0.04}>
                <article className={cn("glass gradient-edge h-full border p-6 sm:p-7", a.ring)}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h5 className="h-display text-lg font-semibold text-white">{p.brand}</h5>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]",
                        a.chip
                      )}
                    >
                      {p.headline}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-carbon-100">{p.body}</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-400">
                        İdeal Senaryo
                      </span>
                      <p className="mt-1 text-xs leading-relaxed text-carbon-200">{p.bestFor}</p>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
                      <span
                        className={cn(
                          "font-mono text-[9px] uppercase tracking-[0.22em]",
                          a.text
                        )}
                      >
                        Mühendislik Notu
                      </span>
                      <p className="mt-1 text-xs leading-relaxed text-carbon-200">{p.note}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric-violet">
              Bölüm 2 · Mühendislik Analizi
            </span>
            <h3 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
              JASO MB / MA2 Standartları ve Kuru Tip Santrifüj Debriyaj
            </h3>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal delay={0.04}>
            <article className="glass gradient-edge h-full p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
                  <GitBranch className="h-4 w-4" />
                </span>
                <h4 className="h-display text-lg font-semibold text-white">JASO T903: DFI &amp; SFI Sınıflandırması</h4>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-carbon-100">
                <li>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-300">
                    JASO MA / MA2 (Yüksek Sürtünmeli)
                  </span>
                  <p className="mt-1 text-carbon-200">
                    DFI ≥ 1.45 ve SFI ≥ 1.15 limitleri ile tanımlanır. Islak tip çok diskli debriyaja sahip manuel vites motosikletlerde
                    balatanın yüksek yük altında kaymasını önler.
                  </p>
                </li>
                <li>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                    JASO MB (Düşük Sürtünmeli)
                  </span>
                  <p className="mt-1 text-carbon-200">
                    DFI 0.5–1.45 ve SFI 0.5–1.15 aralığında sınırlandırılmıştır. Organik molibden bileşikleri gibi özel sürtünme
                    düzenleyici (friction modifier) katıklar içerir.
                  </p>
                </li>
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="glass gradient-edge h-full p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-electric-violet/30 bg-electric-violet/10 text-electric-violet">
                  <Cog className="h-4 w-4" />
                </span>
                <h4 className="h-display text-lg font-semibold text-white">XMAX Mimarisi: Kuru Tip Santrifüj Debriyaj</h4>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-carbon-100">
                Yamaha XMAX 250/300&apos;de krank mili ve silindir grubu motor yağı ile yağlanırken; kavrama sistemi{" "}
                <strong className="text-white">kuru tip santrifüj debriyaj</strong> ve kayış tahrikli CVT ünitesinden oluşur. Motor yağı
                aktarma organlarına veya debriyaj balatalarına <em>hiçbir şekilde temas etmez</em>.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                Bu mekanik mimari nedeniyle XMAX için teorik olarak en doğru tercih{" "}
                <strong className="text-electric-violet">JASO MB</strong>&apos;dir; piston-silindir ve supap mekanizmasındaki parazitik
                sürtünme kayıplarını azaltır. Ancak Türkiye pazarında JASO MB ürün bulunabilirliği kısıtlıdır —{" "}
                <strong className="text-white">JASO MA2 kullanımı motora zarar vermez</strong>, sadece yakıt ekonomisini ve gaz
                tepkisini bir miktar düşürür.
              </p>
            </article>
          </Reveal>
        </div>
      </div>

      <div className="space-y-6">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric-ember">
              Bölüm 3 · PCV &amp; Aşırı Dolum Dinamiği
            </span>
            <h3 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
              Karter Havalandırma (PCV) Sistemi ve Yağ Tüketimi İlişkisi
            </h3>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="glass gradient-edge p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-carbon-100">
              Blue Core motor bloklarında piston eteğinin asimetrik yapısı ve silindir gömleğinin dış yüzeyindeki demir pürüzler (ferrous
              spines) karter içi sürtünmeyi azaltmak için tasarlanmıştır. Yüksek devirli sürüşte piston segmanlarından kartere kaçan
              basınçlı gazlar (blow-by) ve krank milinin yüksek hızdaki dönüşü karter içinde yoğun bir{" "}
              <strong className="text-white">yağ buharı (mist)</strong> ve pozitif basınç yaratır. PCV sistemi bu basıncı tahliye etmek
              için yağ buharını hava filtresi kutusuna yönlendirir.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <PcvCard
                icon={Droplets}
                accent="cyan"
                title="Overfill (Aşırı Dolum) Dinamiği"
                body="XMAX 300 ve Blue Core 250 motorlarının periyodik yağ değişim kapasitesi net olarak 1500 ml'dir. Kullanıcı el kitaplarında filtre değişimiyle birlikte kapasite 1.60 L olarak belirtilse de, karter yapısı ve motor içinde kalan süzülmeyen yağ göz önüne alındığında, sisteme 1500 ml'den fazla yağ konulması aşırı dolumdur (overfill)."
              />
              <PcvCard
                icon={Sparkles}
                accent="violet"
                title="Aerasyon ve Köpürme"
                body="Yağ seviyesi üst sınırın üzerine çıktığında, krank milinin karşı ağırlıkları karterdeki durağan yağ yüzeyine çarparak yağı çırpar; yağ köpürmesi (aeration) başlar. Köpüren yağın hacmi genişler ve PCV sistemi üzerindeki yağ ayırıcı (separator) bu aşırı köpüklü buharı süzemez hale gelir."
              />
              <PcvCard
                icon={Flame}
                accent="ember"
                title="Hava Kutusu & Buji Kirlenmesi"
                body="Süzülemeyen motor yağı PCV hattı üzerinden doğrudan hava filtresi kutusuna pompalanır. Yağa doyan filtre motorun nefes alışını zorlar ve yanma odasına emilerek yakılır. Egzozdan mavi duman çıkar, NGK LMAR8A-9 bujisi yağlanarak körelir, motor rölantide düzensiz çalışır."
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function LabRow({
  label,
  cells,
  mono = false,
  accent = false
}: {
  label: string;
  cells: string[];
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <tr className="transition-colors hover:bg-white/[0.015]">
      <td className="px-4 py-3.5 font-medium text-white">{label}</td>
      {cells.map((c, i) => (
        <td
          key={i}
          className={cn(
            "px-4 py-3.5",
            mono && "font-mono",
            accent && "font-medium text-electric-cyan"
          )}
        >
          {c}
        </td>
      ))}
    </tr>
  );
}

function PcvCard({
  icon: Icon,
  title,
  body,
  accent
}: {
  icon: typeof Droplets;
  title: string;
  body: string;
  accent: "cyan" | "violet" | "ember";
}) {
  const map = {
    cyan: "border-electric-cyan/30 text-electric-cyan bg-electric-cyan/10",
    violet: "border-electric-violet/30 text-electric-violet bg-electric-violet/10",
    ember: "border-electric-ember/30 text-electric-ember bg-electric-ember/10"
  };
  return (
    <div className="glass-quiet p-5">
      <span className={cn("grid size-9 place-items-center rounded-lg border", map[accent])}>
        <Icon className="h-4 w-4" />
      </span>
      <h5 className="mt-4 h-display text-base font-semibold text-white">{title}</h5>
      <p className="mt-2 text-xs leading-relaxed text-carbon-200">{body}</p>
    </div>
  );
}

function TransmissionTab() {
  return (
    <div className="space-y-16">
      <Reveal>
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric-cyan">
            Bölüm 4 · Final Dişli Kutusu (Şanzıman)
          </span>
          <h3 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
            SAE 80W-90 API GL-4 ve EP Katık Mühendisliği
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-carbon-200">
            Yamaha XMAX şanzıman mimarisinde motor karteri ile arka tekerlek miline hareket ileten nihai dişli kutusu (final gear box)
            tamamen bağımsız bir ünitedir. Motor yağı yanma gazları ve kurumla; şanzıman yağı ise helis ve düz dişlilerin temas ettiği
            noktalardaki yüksek mekanik kesme (shear) kuvvetleri ve aşırı yüksek temas basınçları (Hertzian pressure) altında çalışır —
            çalışma karakteri ve kimyasal ihtiyacı tamamen farklıdır.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal delay={0.04}>
          <article className="glass gradient-edge h-full p-6 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <h4 className="h-display text-lg font-semibold text-white">Extreme Pressure (EP) Katıkları</h4>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-carbon-100">
              API GL-4 sınıfı dişli yağları <strong className="text-white">kükürt-fosfor bazlı aşırı basınç (EP)</strong> katıkları
              içerir. Bu katıklar dişlilerin birbiri üzerine bindiği aşırı yük anlarında yüksek sıcaklıkla aktif hale gelerek metal
              yüzeylerde mikroskobik, fedakar bir koruyucu film tabakası oluşturur.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="glass gradient-edge h-full p-6 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-electric-ember/30 bg-electric-ember/10 text-electric-ember">
                <CircleAlert className="h-4 w-4" />
              </span>
              <h4 className="h-display text-lg font-semibold text-white">Pitting (Karıncalanma) Önleme</h4>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-carbon-100">
              Motor yağlarında EP katkıları bulunmaz veya çok düşük düzeydedir. Şanzımanda motor yağı kullanıldığında ani hızlanmalarda
              metal-metal teması gerçekleşir; dişli yüzeylerinde mikroskobik kaynaklanmalar, karıncalanma (pitting), diş aşınması ve
              kalıcı uğultu sesleri başlar.
            </p>
          </article>
        </Reveal>
      </div>

      <Reveal>
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-yamaha-300">
            6 Adımlı Şanzıman Yağ Değişim Prosedürü
          </span>
          <p className="mt-2 text-sm leading-relaxed text-carbon-200">
            Atölye ortamında uygulanan profesyonel sıra. <strong className="text-white">Üst dolum tapasının her zaman ilk sökülmesi</strong>{" "}
            altın bir servis kuralıdır; aksi halde alt tahliye söküldükten sonra üst tapa sıkışırsa şanzıman yağsız kalır.
          </p>
        </div>
      </Reveal>

      <ol className="grid gap-4 md:grid-cols-2">
        {GEAR_OIL_STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.04}>
            <li className="glass gradient-edge h-full p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-yamaha-400/30 bg-gradient-to-b from-yamaha-500/20 to-yamaha-700/10 font-mono text-sm font-semibold text-yamaha-100">
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <h5 className="h-display text-base font-semibold leading-tight text-white">{s.title}</h5>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-100">{s.body}</p>
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <div className="space-y-6">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric-violet">
              Bölüm 5 · Soğutma Sıvısı &amp; Su Pompası
            </span>
            <h3 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
              Silikatsız OAT Antifriz Zorunluluğu &amp; Seramik Mekanik Salmastra Koruması
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-carbon-200">
              XMAX su pompası mili, yüksek devirlerde sızdırmazlığı sağlamak amacıyla{" "}
              <strong className="text-white">seramikten imal edilmiş hassas bir mekanik salmastra</strong> ve kauçuk elastomer contalar
              ile korunmaktadır. Japon ve Asya menşeili motor üreticileri, soğutma sistemlerinde kesinlikle{" "}
              <strong className="text-electric-violet">silikat ve fosfat içermeyen Organik Asit Teknolojisi (OAT)</strong> veya Hibrit OAT
              (HOAT) bazlı antifriz kullanılmasını şart koşar.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          <Reveal delay={0.04}>
            <article className="glass-quiet p-5">
              <span className="grid size-9 place-items-center rounded-lg border border-electric-violet/30 bg-electric-violet/10 text-electric-violet">
                <Beaker className="h-4 w-4" />
              </span>
              <h5 className="mt-4 h-display text-base font-semibold text-white">Aşındırıcı Etki</h5>
              <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                Geleneksel mavi/yeşil antifrizlerdeki silikat tuzları zamanla sistem içinde çökerek mikroskobik sert kristaller (silis
                kumu benzeri yapılar) oluşturur.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="glass-quiet p-5">
              <span className="grid size-9 place-items-center rounded-lg border border-electric-ember/30 bg-electric-ember/10 text-electric-ember">
                <CircleAlert className="h-4 w-4" />
              </span>
              <h5 className="mt-4 h-display text-base font-semibold text-white">Salmastra Aşınması</h5>
              <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                Bu sert kristaller yüksek hızda dönen su pompası milindeki seramik salmastranın arasına girerek yüzeyleri zımpara gibi
                aşındırır.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.12}>
            <article className="glass-quiet p-5">
              <span className="grid size-9 place-items-center rounded-lg border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
                <Droplets className="h-4 w-4" />
              </span>
              <h5 className="mt-4 h-display text-base font-semibold text-white">Sızıntı &amp; Karter Karışımı</h5>
              <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                Aşınan salmastra sızdırmazlık özelliğini kaybeder; soğutma sıvısı önce weep hole&apos;dan dışarı sızar. Zamanında müdahale
                edilmezse kartere geçerek yağı sütlü/gri renge büründürür (yağ-su emülsiyonu) ve tüm motor yataklarını sarar.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-2xl border border-electric-cyan/20 bg-electric-cyan/5 p-5">
            <div className="flex gap-3">
              <Thermometer className="h-5 w-5 shrink-0 text-electric-cyan" />
              <p className="text-sm leading-relaxed text-carbon-100">
                <strong className="text-white">Sadece distile (saf) su kullanın.</strong> Antifriz seyreltmesinde kesinlikle çeşme veya
                kuyu suyu kullanılmamalıdır. Sert kalsiyum ve magnezyum içeren şebeke suları, radyatörün kılcal alüminyum kanallarında
                kireç taşı (CaCO₃) tabakası oluşturarak ısı transferini engeller ve motorun kronik olarak hararet yapmasına yol açar.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="space-y-6">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric-cyan">
              5 Adımlı Soğutma Sistemi Havasını Alma (Air Bleeding) Prosedürü
            </span>
            <p className="mt-2 text-sm leading-relaxed text-carbon-200">
              Soğutma sıvısı değişimi veya hortum bakımları sonrasında sistemde kalan hava kabarcıkları, silindir kapağı su ceketlerinde
              lokal aşırı sıcaklık bölgeleri (hot spots) oluşturarak conta yanmasına ve kapağın çarpılmasına neden olur.
            </p>
          </div>
        </Reveal>

        <ol className="grid gap-4 md:grid-cols-2">
          {COOLANT_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <li className="glass gradient-edge h-full p-6">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-electric-cyan/30 bg-electric-cyan/10 font-mono text-sm font-semibold text-electric-cyan">
                    0{i + 1}
                  </span>
                  <div className="min-w-0">
                    <h5 className="h-display text-base font-semibold leading-tight text-white">{s.title}</h5>
                    <p className="mt-2 text-xs leading-relaxed text-carbon-100">{s.body}</p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}

function CapacityTab() {
  return (
    <div className="space-y-10">
      <Reveal>
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric-cyan">
            Bölüm 6 · Hızlı Referans
          </span>
          <h3 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
            Sıvı Bakım Kapasiteleri Tablosu — XMAX 250 / 300
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-carbon-200">
            Motor yağı, yağ filtresi, final dişli yağı ve soğutma sıvısı için tahliye/toplam kapasiteler, viskozite sınıfı, değişim
            periyodu ve orijinal Yamaha parça kodlarını içeren eksiksiz referans tablosu.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-ink-950/40 backdrop-blur-md">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-electric-cyan">
                <th className="px-4 py-4">Sıvı &amp; Bakım Elemanı</th>
                <th className="px-4 py-4">Araç Uyumluluğu</th>
                <th className="px-4 py-4">Periyodik Değişim</th>
                <th className="px-4 py-4">Toplam Kuru Kapasite</th>
                <th className="px-4 py-4">Önerilen Sınıf &amp; Viskozite</th>
                <th className="px-4 py-4">Değişim Periyodu</th>
                <th className="px-4 py-4">Orijinal Parça Kodu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-xs text-carbon-200">
              {CAPACITY_TABLE.map((row, i) => (
                <tr key={i} className="transition-colors hover:bg-white/[0.015]">
                  <td className="px-4 py-4 font-semibold text-white">{row.fluid}</td>
                  <td className="px-4 py-4">{row.model}</td>
                  <td className="px-4 py-4 font-mono text-electric-cyan">{row.drain}</td>
                  <td className="px-4 py-4 font-mono">{row.total}</td>
                  <td className="px-4 py-4">{row.spec}</td>
                  <td className="px-4 py-4 font-mono text-white">{row.interval}</td>
                  <td className="px-4 py-4 font-mono text-carbon-300">{row.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        <Reveal delay={0.04}>
          <article className="glass-quiet p-5">
            <span className="grid size-9 place-items-center rounded-lg border border-yamaha-400/30 bg-yamaha-500/10 text-yamaha-200">
              <Droplets className="h-4 w-4" />
            </span>
            <h5 className="mt-4 h-display text-base font-semibold text-white">Motor Yağı Net Kapasite</h5>
            <p className="mt-2 text-xs leading-relaxed text-carbon-200">
              Sahada uygulamada filtre değişimiyle birlikte XMAX 300 için <strong className="text-white">1.50 L</strong>, XMAX 250 için{" "}
              <strong className="text-white">1.50 L</strong> dolum esastır. El kitabındaki 1.60–1.70 L değeri toplam kuru kapasitedir ve
              sökülmüş motora referanstır.
            </p>
          </article>
        </Reveal>
        <Reveal delay={0.08}>
          <article className="glass-quiet p-5">
            <span className="grid size-9 place-items-center rounded-lg border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
              <Wrench className="h-4 w-4" />
            </span>
            <h5 className="mt-4 h-display text-base font-semibold text-white">Yağ Filtresi Kapağı Torku</h5>
            <p className="mt-2 text-xs leading-relaxed text-carbon-200">
              Karter tapa torku 20 Nm&apos;dir. Yağ filtresi kapağı M6 cıvataları için doğru tork değeri tam olarak{" "}
              <strong className="text-white">10 Nm</strong>&apos;dir; bu sınır aşıldığında çelik cıvatalar alüminyum bloğun içinde kırılır.
            </p>
          </article>
        </Reveal>
        <Reveal delay={0.12}>
          <article className="glass-quiet p-5">
            <span className="grid size-9 place-items-center rounded-lg border border-electric-violet/30 bg-electric-violet/10 text-electric-violet">
              <Thermometer className="h-4 w-4" />
            </span>
            <h5 className="mt-4 h-display text-base font-semibold text-white">Antifriz Karışımı</h5>
            <p className="mt-2 text-xs leading-relaxed text-carbon-200">
              %50 silikatsız OAT antifriz + %50 distile su. Hazır karışım ürün tercihi:{" "}
              <strong className="text-white">Liqui Moly Coolant Ready Mix 6924</strong>. Radyatör tahliye tapası parça kodu:{" "}
              <strong className="text-white">5ST-E2615-00</strong>.
            </p>
          </article>
        </Reveal>
      </div>
    </div>
  );
}

function RedFlagsTab() {
  return (
    <div className="space-y-10">
      <Reveal>
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric-ember">
            Bölüm 7 · Hatalı Uygulama Sonuçları
          </span>
          <h3 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">Sıvı Bakım Kırmızı Bayrakları</h3>
          <p className="mt-3 text-sm leading-relaxed text-carbon-200">
            Motosiklet servis ortamında en sık yapılan beş kritik hata ve bunların yol açtığı ciddi mekanik hasarlar. Aşağıdaki uyarılar
            laboratuvar/saha verisi temelli, geri dönüşü olmayan sonuçları kapsar.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4">
        {RED_FLAGS.map((rf, i) => {
          const Icon = rf.icon;
          return (
            <Reveal key={rf.title} delay={i * 0.04}>
              <article className="glass gradient-edge border border-red-500/20 bg-red-500/[0.025] p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h4 className="h-display text-lg font-semibold leading-tight text-white">{rf.title}</h4>
                      <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-red-200">
                        Kritik
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
                        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-electric-cyan">
                          Mekanik Sonuç
                        </span>
                        <p className="mt-1.5 text-xs leading-relaxed text-carbon-100">{rf.mechanism}</p>
                      </div>
                      <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4">
                        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-red-300">Oluşan Hasar</span>
                        <p className="mt-1.5 text-xs leading-relaxed text-carbon-100">{rf.damage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="glass gradient-edge p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-yamaha-400/30 bg-yamaha-500/10 text-yamaha-200">
              <ListOrdered className="h-4 w-4" />
            </span>
            <div>
              <h4 className="h-display text-lg font-semibold text-white">Özet: Üç Altın Tork Değeri</h4>
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-carbon-100 sm:grid-cols-3">
                <li className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                    Karter Tahliye Tapası
                  </span>
                  <span className="mt-1 block text-xl font-semibold text-white">20 Nm</span>
                </li>
                <li className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                    Yağ Filtresi Kapağı
                  </span>
                  <span className="mt-1 block text-xl font-semibold text-white">10 Nm</span>
                </li>
                <li className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                    Şanzıman Dolum/Tahliye
                  </span>
                  <span className="mt-1 block text-xl font-semibold text-white">20 Nm</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <div className="flex gap-3">
            <ShieldAlert className="h-6 w-6 shrink-0 text-yellow-400" />
            <div>
              <h4 className="text-sm font-semibold text-yellow-100">Bujide Erken Uyarı: NGK LMAR8A-9</h4>
              <p className="mt-1 text-xs leading-relaxed text-carbon-100">
                Aşırı yağ dolumu veya tıkalı PCV sisteminin ilk somut belirtisi <strong className="text-white">NGK LMAR8A-9</strong>{" "}
                bujisinin elektrotunun yağlanmasıdır. Egzozdan mavi duman, rölantide düzensizlik veya zor marş alma şikayetinde önce yağ
                seviyesi ve buji elektrot rengi kontrol edilmelidir.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="glass gradient-edge p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-electric-violet/30 bg-electric-violet/10 text-electric-violet">
              <Layers className="h-4 w-4" />
            </span>
            <div>
              <h4 className="h-display text-lg font-semibold text-white">Mühendislik Sonuç</h4>
              <p className="mt-2 text-sm leading-relaxed text-carbon-100">
                Yamaha XMAX&apos;in dayanıklılığı; doğru viskozite sınıfı (10W-40), doğru JASO standardı (MB ideal, MA2 güvenli), doğru kapasite
                (1500 ml net motor yağı), doğru dişli yağı (SAE 80W-90 API GL-4) ve doğru antifriz teknolojisi (silikatsız OAT + distile
                su) kullanımının kümülatif sonucudur. Tek bir parametredeki sapma — örneğin silikatlı antifriz veya 100 ml fazla yağ —
                motor ömrünü on binlerce kilometre kısaltabilir.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
