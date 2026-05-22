import type { Metadata } from "next";
import {
  Activity,
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Bluetooth,
  CalendarRange,
  CircleDot,
  Compass,
  Droplets,
  Flame,
  Gauge,
  Mountain,
  ShieldAlert,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Sun,
  Table as TableIcon,
  Thermometer,
  Timer,
  Wind,
  Wrench
} from "lucide-react";
import { TIRE_PRESSURE, TIRE_TIPS } from "@/data/tire-pressure";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "XMAX Lastik Hava Basıncı Yönetimi ve Sürüş Güvenliği Analizi | XMAX Türkiye",
  description:
    "Yamaha XMAX 250 ve 300 için derinlemesine lastik basıncı rehberi: resmi Yamaha tablosu, 2017 öncesi/sonrası tarihsel gelişim, Gay-Lussac termodinamiği, soğuk ölçüm protokolü, Türkiye iklim matrisi, TPMS retrofit (Fobo Bike 2) ve metal supap zorunluluğu.",
  alternates: { canonical: "/bilgi/lastik-basinci" }
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
      name: "Lastik basıncı",
      item: `${SITE.url}/bilgi/lastik-basinci`
    }
  ]
};

type Severity = "critical" | "high" | "medium";

const SEVERITY_STYLES: Record<Severity, { label: string; chip: string }> = {
  critical: {
    label: "ÇOK YÜKSEK",
    chip:
      "border-rose-400/40 bg-rose-400/[0.08] text-rose-200"
  },
  high: {
    label: "YÜKSEK",
    chip:
      "border-amber-400/40 bg-amber-400/[0.08] text-amber-200"
  },
  medium: {
    label: "ORTA",
    chip:
      "border-electric-cyan/40 bg-electric-cyan/[0.08] text-electric-cyan"
  }
};

const HISTORICAL_ROWS = [
  {
    era: "2016 ve öncesi",
    note: "Çapraz katlı (bias-ply) karkas, yumuşak süspansiyon",
    soloFront: "28 psi",
    soloRear: "32 psi",
    pillionFront: "30 psi",
    pillionRear: "36 psi"
  },
  {
    era: "2017 ve sonrası",
    note: "Hafifletilmiş şasi, progresif amortisör, radyal karkas",
    soloFront: "29 psi",
    soloRear: "33 psi",
    pillionFront: "29 psi",
    pillionRear: "33 psi"
  }
];

const PROTOCOL_STEPS = [
  {
    icon: Timer,
    title: "Termal Stabilizasyon",
    body:
      "Motosiklet en az 3 saat hareketsiz beklemiş veya son sürüşten itibaren 1.6 km'den (1 mil) az yol almış olmalı. Karkas tamamen ortam sıcaklığına oturmadan ölçüm yapılamaz.",
    metric: "≥ 3 saat dinlenme"
  },
  {
    icon: Sun,
    title: "Doğru Ortam Seçimi",
    body:
      "Ölçüm doğrudan güneş ışığı almayan, gölgeli ve serin bir alanda yapılmalı. Isınmış asfalt zemine temas eden lastik, alt yarıdan ısı transferiyle yanıltıcı yüksek değer üretir.",
    metric: "Gölge + serin zemin"
  },
  {
    icon: Gauge,
    title: "Kalibre Edilmiş Ekipman",
    body:
      "Akaryakıt istasyonu pompaları yoğun kullanım altında sapma gösterir. Yanınızda kalibre, dijital veya kaliteli bir analog cep manometresi taşıyın.",
    metric: "Cep tipi dijital manometre"
  },
  {
    icon: Wind,
    title: "Supap Temizliği ve Bağlantı",
    body:
      "Supap kapağı sökülerek ağzındaki toz, çamur veya nem temizlenmeli. Manometre ucu supap miline 90° dik açıyla, sızdırmazlık sağlanacak şekilde tek seferde basılmalıdır.",
    metric: "Tek-tık, dik temas"
  },
  {
    icon: Activity,
    title: "Değerlendirme ve Ayar",
    body:
      "Okunan değer üretici standardıyla (29 psi ön / 33 psi arka) karşılaştırılır. Eksikse kompresörle hava eklenir, fazlaysa manometre tahliye pimiyle kontrollü olarak düşürülür.",
    metric: "29 / 33 psi hedef"
  },
  {
    icon: ShieldCheck,
    title: "Sızdırmazlık Teşhisi",
    body:
      "Ayar sonrası supap iğnesine sabunlu su damlatılır; kabarcık çıkıyorsa kaçak vardır. Orijinal plastik veya metal kapaklar sıkı şekilde kapatılarak iğne mekanizması koruma altına alınır.",
    metric: "Sabunlu su testi"
  }
];

const CLIMATE_MATRIX = [
  {
    climate: "Aşırı Sıcak (> 35 °C)",
    surface: "Kuru BSK Asfalt",
    load: "Tek veya Çift Kişi",
    front: "29 psi (2.00 bar)",
    rear: "33 psi (2.25 bar)",
    behavior:
      "Yüksek asfalt sıcaklığında aşırı karkas genleşmesini önler; standart soğuk değer şasi karakterini korur.",
    icon: Flame,
    tone: "ember"
  },
  {
    climate: "Ilıman / Bahar (15 – 25 °C)",
    surface: "Karışık Şehir İçi",
    load: "Tek veya Çift Kişi",
    front: "29 psi (2.00 bar)",
    rear: "33 psi (2.25 bar)",
    behavior:
      "Optimum şasi geometrisi; kararlı viraj çizgisi, dengeli omuz-merkez aşınması.",
    icon: Sparkles,
    tone: "cyan"
  },
  {
    climate: "Aşırı Soğuk (< 5 °C)",
    surface: "Islak / Nemli Sathi Kaplama",
    load: "Tek Sürücü (hafif yük)",
    front: "28 psi (1.93 bar)",
    rear: "31 psi (2.14 bar)",
    behavior:
      "Karkasın daha kolay esneyerek ısınmasını sağlar; ıslak zeminde mekanik kilitlenmeyi artırır.",
    icon: Droplets,
    tone: "ice"
  },
  {
    climate: "Aşırı Soğuk (< 5 °C)",
    surface: "Karlı / Çamurlu Zemin",
    load: "Çift Kişi (ağır yük)",
    front: "29 psi (2.00 bar)",
    rear: "33 psi (2.25 bar)",
    behavior:
      "Ağır yük altında çukurlarda pinch flat'i engeller; düşük basınca inilmez, stabilite öncelikli.",
    icon: Snowflake,
    tone: "violet"
  },
  {
    climate: "Geçiş Mevsimleri",
    surface: "Bozuk / Çukurlu Yol",
    load: "Tek veya Çift Kişi",
    front: "29 psi (2.00 bar)",
    rear: "33 psi (2.25 bar)",
    behavior:
      "Jant eğrilmesi ve ön amortisör keçe hasarını önler; standart soğuk basınç koruma için referans alınır.",
    icon: Mountain,
    tone: "amber"
  }
] as const;

const UNDER_INFLATION = [
  {
    title: "Jant Darbesi Riski (Pinch Flat)",
    body:
      "24 psi ve altı ön basınçta keskin kenarlı çukurda lastik yanağı tamamen ezilir; janta sıkışır, ani patlama ve döküm alüminyum jantta çatlak görülür."
  },
  {
    title: "Wobble / Tank-Slapper",
    body:
      "Düşük ön basınç direksiyon açısını (trail) bozar. 50 – 80 km/s arası salınımlar (wobble), yüksek hızlarda gidonun rüzgâr ve rezonansla birleşip kontrol edilemez tokatlamalarına (tank-slapper) zemin hazırlar."
  },
  {
    title: "Yakıt Tüketimi ve Güç Kaybı",
    body:
      "Yuvarlanma direnci artar; varyatör, kayış ve debriyaja binen mekanik yük artar. Yakıt tüketimi %10'un üzerinde yükselirken son sürat kapasitesi düşer."
  },
  {
    title: "Düzensiz Aşınma (Cupping)",
    body:
      "Yük merkezden omuz bölgesine kayar. Omuzda düzensiz cupping deseni oluşur; virajda yatış kararlılığı bozulur, gidonda titreşim hissedilir."
  }
];

const OVER_INFLATION = [
  {
    title: "Temas Alanının Daralması",
    body:
      "36 psi ön / 42 psi arka gibi aşırı şişirme, profili dairesel kesitten sivri kesite çevirir. Viraj kayma riski ve fren mesafesi artar; ABS erken devreye girer."
  },
  {
    title: "Furş Yatağı ve Amortisör Hasarı",
    body:
      "Lastik birincil sönümleme görevini yapamaz. Tüm darbe enerjisi teleskopik çatallara ve arka amortisörlere iletilir; keçe patlaması ve gidon furş yatağı (steering stem) bozulması başlar."
  },
  {
    title: "TCS Kararsızlığı",
    body:
      "Çekiş Kontrol Sistemi, ön/arka tekerlek dönüş hızını milisaniyede karşılaştırır. Aşırı basınç arka tekerleğin dış çapını milimetrik artırır; ECU patinaj sanıp kuru zeminde ateşleme/yakıt keser."
  },
  {
    title: "Hızlı Merkez Aşınması",
    body:
      "Yük sadece merkez bandına biner. Diş ömrü kısa sürede tükenir; uzun otoyolda merkezde düzleşme (square tire) profili oluşur, virajda düşme hissi başlar."
  }
];

const FOBO_STEPS = [
  {
    title: "Yazılım Kurulumu ve Profil",
    body:
      "Telefona resmi FOBO TPMS uygulaması yüklenir; Bluetooth, konum ve internet aktif edilir. Kullanıcı kaydı sonrası FOBO BIKE 2 modeli seçilerek yeni motosiklet profili oluşturulur."
  },
  {
    title: "Pil Aktivasyonu ve O-Ring",
    body:
      "Sensör kapağı saat yönünün tersine açılır; CR1632 lityum pilin altındaki yalıtkan bant çıkarılır. Silikon O-ring yuvasına tam oturacak şekilde kapak yeniden sıkılır."
  },
  {
    title: "Kilit Somunu Montajı",
    body:
      "Hırsızlık ve gevşeme önleyici kilit somunu, çıkıntılı tarafı içe bakacak şekilde metal supap miline sonuna kadar vidalanır."
  },
  {
    title: "Eşleştirme ve Vidalama",
    body:
      "Uygulamadan önce ön, ardından arka tekerlek eşleştirilir. Komut gelince ilgili sensör supaba el gücüyle makul torkla vidalanır; sensör havayı sıkıştırıp ilk veriyi gönderir."
  },
  {
    title: "Kilit Somununu Sabitleme",
    body:
      "Sensör oturduktan sonra kilit somun saat yönünün tersine sensör gövdesine doğru çevrilir; anahtarla hafifçe sıkılarak titreşime karşı kilitlenir."
  },
  {
    title: "Mikro Kaçak Doğrulaması",
    body:
      "Supap-gövde birleşim noktasına sabun köpüğü ya da sızıntı spreyi uygulanır; en küçük kabarcık dahi sızdırma anlamına gelir, sensör yeniden oturtulur."
  }
];

const RED_FLAGS: Array<{
  title: string;
  cause: string;
  severity: Severity;
  consequence: string;
  action: string;
}> = [
  {
    title: "Lastik Yanağında Balon / Şişlik (Bubble)",
    cause: "Darbe sebebiyle karkas içindeki kord bezleri ve çelik tellerin kopması.",
    severity: "critical",
    consequence: "Ani yarılma ve patlama riski.",
    action:
      "Motosikletin sürülmesi kesinlikle yasaklanmalı; lastik aynı gün yenisiyle değiştirilmelidir."
  },
  {
    title: "Kılcal Çatlaklar (Ozon / Yaşlanma)",
    cause: "Lastik hamuru ömrünü tamamlamış; UV ışınları ve kimyasal maruziyet.",
    severity: "high",
    consequence: "Hamur sertleşmesi ve ani kayma.",
    action:
      "Diş derinliği yeterli olsa bile tutunma özelliği kaybedilmiştir; yeni DOT tarihli lastik takılmalıdır."
  },
  {
    title: "Testere Dişi Aşınma (Cupping)",
    cause: "Yanlış hava basıncı, sönümleme kaybı veya agresif frenleme.",
    severity: "medium",
    consequence: "Gidonda titreşim ve kararsız viraj.",
    action:
      "Amortisör hidroliği ve yayları kontrol edilmeli; lastik rotasyonu veya değişimi yapılmalıdır."
  },
  {
    title: "Supap Dibinde Mikro Yırtıklar",
    cause:
      "Kauçuk supabın yaşlanması veya TPMS sensörünün merkezkaç bükülmesi.",
    severity: "critical",
    consequence: "Sürüş esnasında ani hava boşalması.",
    action:
      "Lastik sökülmeli; supap derhal çelik / alüminyum metal supapla değiştirilmelidir."
  },
  {
    title: "Haftalık 2 PSI'dan Fazla Basınç Kaybı",
    cause: "Lastik topuğunun janta tam oturmaması veya mikro çivi batması.",
    severity: "high",
    consequence: "Sürüş esnasında lastik sönmesi.",
    action:
      "Lastik sökülerek jant topuk bölgesi temizlenmeli, batan kısım yamayla onarılmalıdır."
  },
  {
    title: "Lastik Merkezinde Düzleşme (Square Tire)",
    cause: "Uzun otoyol kullanımı, dik sürüş ve sürekli aşırı basınç.",
    severity: "medium",
    consequence: "Virajla girişte direnç ve düşme hissi.",
    action:
      "Profil geometrisi bozulmuştur; yüksek hız emniyeti için lastik takımı yenilenmelidir."
  }
];

export default function TirePressurePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* HERO */}
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Lastik Hava Basıncı · Kapsamlı Rehber"
          title={
            <>
              Soğuk değerle ölç,{" "}
              <span className="text-electric">karkasla sür.</span>
            </>
          }
          description="Yamaha XMAX 250 ve 300, mass-scooter segmentinde günlük pratikliği ile arada sürat ve maksi şasi disiplinini birleştirir. Tek tekerlekli ve teleskopik mimari, yaysız kütleyi (unsprung mass) arka tekerleğe yığdığı için her psi sapması doğrudan sürüş güvenliğine yansır."
        />
        <Reveal delay={0.06}>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: Compass,
                label: "Mimari",
                value: "120/70-15 ön · 140/70-14 arka"
              },
              {
                icon: Thermometer,
                label: "Termal etki",
                value: "+0.3 – +0.5 bar (20→60 °C)"
              },
              {
                icon: CircleDot,
                label: "Soğuk standart",
                value: "29 psi / 33 psi · 2017+"
              }
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="glass-quiet flex items-center gap-3 p-4"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="eyebrow">{label}</div>
                  <div className="mt-1 font-mono text-sm text-white">
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ŞASİ GEOMETRİSİ */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="Şasi geometrisi"
          title={
            <>
              Yaysız kütle, sönümleme{" "}
              <span className="text-electric">hassasiyeti.</span>
            </>
          }
          description="XMAX'in arka salıncağındaki şanzıman + motor + diferansiyel kütle, klasik motosikletlere kıyasla yüksek yaysız kütle oranı doğurur. Bu, monoblok arka tekerleğin yol yüzeyine tutunmasını lastik basıncına ve karkas esnekliğine son derece bağımlı hale getirir."
        />
        <Reveal delay={0.05}>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="glass p-6">
              <div className="eyebrow">Ön aks</div>
              <div className="mt-3 font-mono text-2xl text-white">15"</div>
              <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                120/70-15 56P karkas. Daha geniş yanak hacmi, çukur darbelerinde
                ön süspansiyona ulaşan enerjiyi pre-filtreler. Düşük basınç burada
                trail açısını bozarak wobble eşiğini düşürür.
              </p>
            </div>
            <div className="glass p-6">
              <div className="eyebrow">Arka aks</div>
              <div className="mt-3 font-mono text-2xl text-white">14"</div>
              <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                140/70-14 62P karkas. Şanzıman ve diferansiyel kütlesi yaysız
                tarafa eklenir; bu yığılma her psi'lık sapmayı temas yüzeyi
                titreşimine çevirir.
              </p>
            </div>
            <div className="glass p-6">
              <div className="eyebrow">Mühendislik notu</div>
              <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                2017 sonrası modelde TCS, progresif amortisör ve hafifletilmiş
                şasi entegrasyonu için lastik basıncı tek karkas standardına
                indirildi: <span className="text-white">29 psi ön / 33 psi arka</span>.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* RESMİ YAMAHA TABLOSU */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="Resmi Yamaha basınç tablosu"
          title={
            <>
              El kitabı standardı,{" "}
              <span className="text-electric">soğuk değer.</span>
            </>
          }
          description="Yamaha Motor Corporation tarafından CZD300-A ve XMAX 250 / 300 kullanıcı el kitaplarında yayımlanan referans tablo. Tüm değerler lastik soğukken (en az 3 saat dinlenmiş) geçerlidir."
        />
        <Reveal delay={0.05}>
          <div className="glass mt-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    {[
                      "Model",
                      "Ön ölçü",
                      "Ön basınç (tek/çift)",
                      "Arka ölçü",
                      "Arka basınç (tek/çift)"
                    ].map((h) => (
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
                  {TIRE_PRESSURE.map((row) => (
                    <tr
                      key={row.model}
                      className="border-b border-white/[0.04] transition hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-5 font-semibold text-white">
                        {row.model}
                      </td>
                      <td className="px-5 py-5 font-mono text-xs text-carbon-100">
                        {row.size.front}
                      </td>
                      <td className="px-5 py-5">
                        <span className="font-mono text-sm text-white">
                          {row.front.solo.toFixed(2)}
                        </span>
                        <span className="font-mono text-xs text-carbon-300"> / </span>
                        <span className="font-mono text-sm text-electric-cyan">
                          {row.front.pillion.toFixed(2)}
                        </span>{" "}
                        <span className="font-mono text-[10px] text-carbon-400">bar</span>
                      </td>
                      <td className="px-5 py-5 font-mono text-xs text-carbon-100">
                        {row.size.rear}
                      </td>
                      <td className="px-5 py-5">
                        <span className="font-mono text-sm text-white">
                          {row.rear.solo.toFixed(2)}
                        </span>
                        <span className="font-mono text-xs text-carbon-300"> / </span>
                        <span className="font-mono text-sm text-electric-cyan">
                          {row.rear.pillion.toFixed(2)}
                        </span>{" "}
                        <span className="font-mono text-[10px] text-carbon-400">bar</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TARİHSEL GELİŞİM 2017 */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="Tarihsel gelişim"
          title={
            <>
              2017 öncesi vs.{" "}
              <span className="text-electric">2017 sonrası.</span>
            </>
          }
          description="Bias-ply karkastan radyal karkasa geçiş ve progresif amortisör entegrasyonu, çift sürücü için ayrı basınç tablosunu gereksiz kıldı. 2017'den itibaren tüm yük senaryolarında tek bir soğuk basınç standardı geçerlidir."
        />
        <Reveal delay={0.05}>
          <div className="glass mt-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    {[
                      "Dönem",
                      "Mühendislik notu",
                      "Tek · Ön / Arka",
                      "Çift · Ön / Arka"
                    ].map((h) => (
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
                  {HISTORICAL_ROWS.map((row) => (
                    <tr
                      key={row.era}
                      className="border-b border-white/[0.04] last:border-b-0"
                    >
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 font-semibold text-white">
                          <CalendarRange className="h-4 w-4 text-electric-cyan" />
                          {row.era}
                        </div>
                      </td>
                      <td className="px-5 py-5 text-xs leading-relaxed text-carbon-200">
                        {row.note}
                      </td>
                      <td className="px-5 py-5 font-mono text-sm text-white">
                        {row.soloFront}
                        <span className="text-carbon-300"> / </span>
                        {row.soloRear}
                      </td>
                      <td className="px-5 py-5 font-mono text-sm text-electric-cyan">
                        {row.pillionFront}
                        <span className="text-carbon-300"> / </span>
                        {row.pillionRear}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TERMODİNAMİK / GAY-LUSSAC */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="Termodinamik"
          title={
            <>
              Gay-Lussac Yasası ve{" "}
              <span className="text-electric">lastik içi basınç.</span>
            </>
          }
          description="Lastik içindeki hava ideal gaz yasalarına yakın davranır. Sabit hacim altında çalışan bir gazın mutlak sıcaklığı ile mutlak basıncı arasındaki ilişki doğrudan orantılıdır."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="glass-frost gradient-edge relative overflow-hidden rounded-3xl p-8">
              <div className="absolute inset-0 -z-10 grid-faint" />
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-electric-violet">
                  <Thermometer className="h-5 w-5" />
                </span>
                <div className="eyebrow">Formül</div>
              </div>
              <div className="mt-6 text-center font-display text-3xl text-white sm:text-5xl">
                <span className="font-mono">P</span>
                <sub className="font-mono text-electric-cyan">1</sub>
                <span className="px-2 text-carbon-300">/</span>
                <span className="font-mono">T</span>
                <sub className="font-mono text-electric-cyan">1</sub>
                <span className="px-3 text-electric-cyan">=</span>
                <span className="font-mono">P</span>
                <sub className="font-mono text-electric-violet">2</sub>
                <span className="px-2 text-carbon-300">/</span>
                <span className="font-mono">T</span>
                <sub className="font-mono text-electric-violet">2</sub>
              </div>
              <p className="mt-6 text-center text-sm leading-relaxed text-carbon-200">
                <span className="font-mono text-white">P</span> mutlak basınç
                (gauge + atmosfer),{" "}
                <span className="font-mono text-white">T</span> Kelvin cinsinden
                sıcaklık (
                <span className="font-mono">K = °C + 273.15</span>).
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="grid gap-3">
              <div className="glass-quiet p-5">
                <div className="flex items-center gap-2 text-electric-cyan">
                  <Thermometer className="h-4 w-4" />
                  <div className="eyebrow text-electric-cyan">
                    Ortam sıcaklığı
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-carbon-100">
                  Her <span className="font-mono text-white">10 °C</span>{" "}
                  değişimde lastik basıncı yaklaşık{" "}
                  <span className="font-mono text-white">0.1 bar</span> /{" "}
                  <span className="font-mono text-white">1.45 psi</span> oynar.
                </p>
              </div>
              <div className="glass-quiet p-5">
                <div className="flex items-center gap-2 text-electric-violet">
                  <Flame className="h-4 w-4" />
                  <div className="eyebrow text-electric-violet">
                    Sürüş içi ısınma
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-carbon-100">
                  Karkas <span className="font-mono text-white">20 °C</span>'den
                  yola <span className="font-mono text-white">55 – 60 °C</span>
                  'ye çıktığında basınç doğal olarak{" "}
                  <span className="font-mono text-white">+0.3 ila +0.5 bar</span>{" "}
                  (<span className="font-mono">+4.3 ila +7.2 psi</span>) yükselir.
                </p>
              </div>
              <div className="glass-quiet p-5">
                <div className="flex items-center gap-2 text-amber-300">
                  <AlertTriangle className="h-4 w-4" />
                  <div className="eyebrow text-amber-300">
                    Pratik sonuç
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-carbon-100">
                  Sıcak okumayı asla referans alma. Üretici tablosundaki tüm
                  değerler <span className="text-white">soğuk lastik</span>{" "}
                  içindir.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOĞUK LASTİK ÖLÇÜM PROTOKOLÜ */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="Adım adım protokol"
          title={
            <>
              Soğuk lastik basıncı{" "}
              <span className="text-electric">ölçüm protokolü.</span>
            </>
          }
          description="Doğru basıncın tespiti, üretici değerinin okunması kadar disiplin ister. Aşağıdaki altı adım, ölçüm hatasını fiziksel olarak ortadan kaldırır."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROTOCOL_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 0.05}>
                <div className="glass relative h-full overflow-hidden p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                      Adım {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 h-display text-lg font-semibold leading-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                    {step.body}
                  </p>
                  <div className="mt-5 border-t border-white/[0.06] pt-4">
                    <div className="eyebrow">Pratik hedef</div>
                    <div className="mt-1 font-mono text-xs text-electric-cyan">
                      {step.metric}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* TÜRKİYE YOL & İKLİM */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="Türkiye yol & iklim"
          title={
            <>
              BSK asfalt ve mıcır,{" "}
              <span className="text-electric">iki farklı disiplin.</span>
            </>
          }
          description="Karayolu ağı, Bitümlü Sıcak Karışım (BSK) asfalt ile sathi kaplama (mıcır) arasında dalgalanır. Yaz +40 °C asfalt yüzeyinin +60–70 °C'ye çıktığı koşullar ile −5 °C altı ıslak mıcır sürüşü iki farklı karkas davranışı gerektirir."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="glass relative h-full p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-electric-ember/30 bg-electric-ember/10 text-electric-ember">
                  <Sun className="h-5 w-5" />
                </span>
                <div>
                  <div className="eyebrow text-electric-ember">
                    BSK Asfalt · Yaz
                  </div>
                  <h3 className="mt-1 h-display text-lg font-semibold text-white">
                    Sıcak karışım, korunan basınç
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                İç Anadolu ve Güneydoğu'da yaz havası +40 °C'yi, asfalt yüzeyi
                +60–70 °C'yi aşar. Bu koşullarda{" "}
                <span className="text-white">29 psi ön / 33 psi arka</span>{" "}
                soğuk değerleri tavizsiz uygulanmalı; karkas aşırı
                genleşmemelidir. Hipotetik "ben düşürürüm" reflexi, dış çapı
                bozarak TCS okumasını da bozar.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="glass relative h-full p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
                  <Snowflake className="h-5 w-5" />
                </span>
                <div>
                  <div className="eyebrow text-electric-cyan">
                    Mıcır & Kış &lt; +5 °C
                  </div>
                  <h3 className="mt-1 h-display text-lg font-semibold text-white">
                    Esneyen karkas, mekanik kilit
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                +5 °C altı sıcaklıkta karkas çalışma sıcaklığına ulaşamaz.
                Anlas Winter Grip 2 gibi kış lastiği takılı tek sürücüde
                (örn. ~60 kg) arka basıncı{" "}
                <span className="text-white">33 → 31 psi</span> aralığına
                çekmek, temas yüzeyini mikron düzeyinde genişleterek mekanik
                kilitlenmeyi artırır.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BASINÇ SAPMALARI / EFFECTS GRID */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="Basınç sapmalarının sürüşe etkileri"
          title={
            <>
              Eksik ve aşırı basıncın{" "}
              <span className="text-electric">karşılaştırması.</span>
            </>
          }
          description="Yanlış basınç hem mekanik aşınmayı hem de sürüş güvenliğini eşit oranda tehdit eder. Aşağıdaki ızgara, ana risk kategorilerini karşılıklı olarak karşılaştırır."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="glass p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-rose-400/30 bg-rose-400/10 text-rose-300">
                  <ArrowDownLeft className="h-5 w-5" />
                </span>
                <div>
                  <div className="eyebrow text-rose-200">Eksik basınç</div>
                  <h3 className="mt-1 h-display text-lg font-semibold text-white">
                    Düşük hava — şasi ve süspansiyon
                  </h3>
                </div>
              </div>
              <ul className="mt-5 space-y-4">
                {UNDER_INFLATION.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-rose-200">
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-carbon-200">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="glass p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <div>
                  <div className="eyebrow text-amber-200">Aşırı basınç</div>
                  <h3 className="mt-1 h-display text-lg font-semibold text-white">
                    Yüksek hava — temas ve elektronik
                  </h3>
                </div>
              </div>
              <ul className="mt-5 space-y-4">
                {OVER_INFLATION.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-200">
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-carbon-200">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TPMS RETROFIT + METAL SUPAP UYARI */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="TPMS retrofit"
          title={
            <>
              Fobo Bike 2 entegrasyonu &{" "}
              <span className="text-electric">metal supap zorunluluğu.</span>
            </>
          }
          description="Lastik içindeki yavaş hava kaçaklarını (slow leak) manuel tespit etmek pratik değildir. Fobo Bike 2 harici TPMS sensörleri, Bluetooth 5.0 üzerinden mutlak basıncı okuyup atmosfer basıncına göre kalibre eder ve gerçek-zamanlı gösterge basıncını telefona yansıtır."
        />

        {/* CRITICAL WARNING */}
        <Reveal delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-rose-400/30 bg-gradient-to-br from-rose-500/[0.08] via-rose-500/[0.04] to-electric-violet/[0.06] p-6 backdrop-blur-2xl sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-rose-400/40 bg-rose-500/15 text-rose-200">
                <ShieldAlert className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-rose-200">
                  ! KRİTİK UYARI · IMPORTANT
                </div>
                <h3 className="mt-2 h-display text-xl font-semibold leading-tight text-white sm:text-2xl">
                  Çelik / alüminyum metal supap olmadan TPMS takma.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-100 sm:text-base">
                  Harici TPMS sensörü yaklaşık{" "}
                  <span className="text-white">10 g</span> ağırlığındadır. XMAX
                  gibi nispeten küçük tekerlek çapında, 100 km/s ve üzeri
                  hızlarda oluşan{" "}
                  <span className="text-rose-100">merkezkaç (santrifüj)</span>{" "}
                  kuvveti, esnek kauçuk supap üzerine ciddi bir bükme momenti
                  uygular. Standart kauçuk supap dipten yırtılır ve sürüş
                  esnasında ani hava kaybı yaşanır. Sensörü monte etmeden{" "}
                  <span className="text-white">önce</span> jantların kauçuk
                  supapları, 90° açılı veya düz{" "}
                  <span className="text-white">
                    paslanmaz çelik / alüminyum metal supaplarla
                  </span>{" "}
                  değiştirilmelidir.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Fobo Bike 2 — Working principle highlight */}
        <Reveal delay={0.08}>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="glass-quiet p-5">
              <div className="flex items-center gap-2 text-electric-violet">
                <Bluetooth className="h-4 w-4" />
                <div className="eyebrow text-electric-violet">Protokol</div>
              </div>
              <div className="mt-3 font-mono text-sm text-white">
                Bluetooth 5.0 · gerçek-zamanlı
              </div>
            </div>
            <div className="glass-quiet p-5">
              <div className="flex items-center gap-2 text-electric-cyan">
                <Gauge className="h-4 w-4" />
                <div className="eyebrow text-electric-cyan">Hassasiyet</div>
              </div>
              <div className="mt-3 font-mono text-sm text-white">
                Mutlak basınç − 101.3 kPa
              </div>
            </div>
            <div className="glass-quiet p-5">
              <div className="flex items-center gap-2 text-amber-300">
                <Mountain className="h-4 w-4" />
                <div className="eyebrow text-amber-300">Rakım toleransı</div>
              </div>
              <div className="mt-3 font-mono text-sm text-white">
                Atmosferik kompanzasyon
              </div>
            </div>
          </div>
        </Reveal>

        {/* Fobo Steps */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FOBO_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.04}>
              <div className="glass-quiet h-full p-5">
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-electric-violet">
                    <Wrench className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                    Kurulum {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h4 className="mt-4 h-display text-base font-semibold leading-tight text-white">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-carbon-200">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BASINÇ MATRİSİ */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="Sıcaklık, yük ve yol matrisi"
          title={
            <>
              Türkiye senaryolarına göre{" "}
              <span className="text-electric">basınç haritası.</span>
            </>
          }
          description="Tek bir 29/33 değeri tüm koşullara optimaldir; ancak ısı, yük ve yüzey kalitesi karkas davranışını farklı yönde etkiler. Aşağıdaki matris XMAX 250/300 için saha optimizasyonunu özetler."
        />
        <Reveal delay={0.05}>
          <div className="glass mt-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    {[
                      "Senaryo",
                      "Yüzey",
                      "Yük",
                      "Ön basınç",
                      "Arka basınç",
                      "Sürüş karakteri"
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300"
                      >
                        <span className="inline-flex items-center gap-2">
                          {h === "Senaryo" && <TableIcon className="h-3.5 w-3.5" />}
                          {h}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CLIMATE_MATRIX.map((row) => {
                    const Icon = row.icon;
                    return (
                      <tr
                        key={`${row.climate}-${row.surface}`}
                        className="border-b border-white/[0.04] last:border-b-0 align-top"
                      >
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 font-semibold text-white">
                            <Icon className="h-4 w-4 text-electric-cyan" />
                            <span className="text-xs">{row.climate}</span>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-xs text-carbon-200">
                          {row.surface}
                        </td>
                        <td className="px-5 py-5 text-xs text-carbon-200">
                          {row.load}
                        </td>
                        <td className="px-5 py-5 font-mono text-xs text-white">
                          {row.front}
                        </td>
                        <td className="px-5 py-5 font-mono text-xs text-electric-cyan">
                          {row.rear}
                        </td>
                        <td className="px-5 py-5 text-xs leading-relaxed text-carbon-100">
                          {row.behavior}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      {/* KIRMIZI BAYRAKLAR */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="Kırmızı bayraklar"
          title={
            <>
              Hemen müdahale gerektiren{" "}
              <span className="text-electric">tehlike belirtileri.</span>
            </>
          }
          description="Lastiğin fiziksel hasarı bazen yavaş gelişir, bazen tek bir darbeyle olur. Aşağıdaki altı belirtiden biri görüldüğünde sürüş geciktirilmeden durdurulmalı ve uygun protokol uygulanmalıdır."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {RED_FLAGS.map((flag, i) => {
            const sev = SEVERITY_STYLES[flag.severity];
            return (
              <Reveal key={flag.title} delay={i * 0.04}>
                <div className="glass relative h-full p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-rose-300">
                        <AlertTriangle className="h-5 w-5" />
                      </span>
                      <h3 className="h-display text-base font-semibold leading-tight text-white">
                        {flag.title}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${sev.chip}`}
                    >
                      {sev.label}
                    </span>
                  </div>
                  <dl className="mt-5 grid gap-3 text-sm">
                    <div>
                      <dt className="eyebrow">Olası Fiziksel Neden</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-carbon-200">
                        {flag.cause}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Sürüş Güvenliği Etkisi</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-carbon-200">
                        {flag.consequence}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Müdahale Protokolü</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-carbon-100">
                        {flag.action}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* QUICK TIPS — KEEP ORIGINAL */}
      <section className="container-x py-12">
        <Reveal>
          <div className="eyebrow">Hızlı kurallar</div>
          <h2 className="mt-3 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Üç şey, kalanın kendiliğinden oturur.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TIRE_TIPS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <div className="glass-quiet p-6">
                <div className="eyebrow">Kural</div>
                <h3 className="mt-2 h-display text-lg font-semibold leading-tight text-white">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  {t.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
