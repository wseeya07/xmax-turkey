import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight, Gauge, Cog, Scale, ShieldAlert, Wrench, Layers, ShieldCheck, Thermometer, ShieldX, Check } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "XMAX Küresel CVT ve Arka Debriyaj Modifikasyon Rehberi",
  description: "Yamaha XMAX 250, 300 ve 400 modelleri için bölgesel atölye sırları, performans varyatörleri, debriyaj çanları ve özel şanzıman reçeteleri.",
  alternates: { canonical: "/performans/varyator" }
};

const GENERATIONS = [
  {
    group: "XMAX 250 (Eski Nesil)",
    years: "2005 - 2016",
    engine: "Majesty Tabanlı",
    rollerSize: "20 x 12 mm",
    rollerWeight: "11.0 g (8 Adet)",
    oemCode: "1C0-E7620-00",
    compatibility: "Daha sonraki Blue Core şanzıman yapısıyla tamamen uyumsuzdur."
  },
  {
    group: "XMAX 250 (Blue Core)",
    years: "2017 - Günümüz",
    engine: "GPD250 / B74",
    rollerSize: "23 x 18 mm",
    rollerWeight: "15.0 g / 17.0 g",
    oemCode: "B74-E7620-00",
    compatibility: "Mekanik olarak XMAX 300 varyatör grubuyla ortak şasi ve aks paylaşır."
  },
  {
    group: "XMAX 300 (Euro 4)",
    years: "2017 - 2020",
    engine: "CZD300 (H336E)",
    rollerSize: "23 x 18 mm",
    rollerWeight: "17.5 g (6 Adet)",
    oemCode: "B74-E7632-00",
    compatibility: "Euro 5 ve Euro 5+ jenerasyonlarıyla tamamen ortak mekanik altyapı."
  },
  {
    group: "XMAX 300 (Euro 5)",
    years: "2021 - 2024",
    engine: "CZD300 (H348E)",
    rollerSize: "23 x 18 mm",
    rollerWeight: "17.5 g (6 Adet)",
    oemCode: "B74-E7620-00",
    compatibility: "Euro 4 varyatör bileşenleriyle geriye dönük %100 uyumludur."
  },
  {
    group: "XMAX 300 (Euro 5+)",
    years: "2025 - Günümüz",
    engine: "CZD300 (H353E)",
    rollerSize: "23 x 18 mm",
    rollerWeight: "17.5 g (6 Adet)",
    oemCode: "B5X-E7641-00 (Kayış)",
    compatibility: "Euro 4 ve Euro 5 modellerinin performans varyatör kitlerini destekler."
  },
  {
    group: "XMAX 400 (Euro 3/4)",
    years: "2013 - 2020",
    engine: "YP400R (H330E/340E)",
    rollerSize: "25 x 15 mm",
    rollerWeight: "16.0 g / 17.0 g",
    oemCode: "5RU-17632-00",
    compatibility: "Majesty 400 tabanlı ağır aktarma. XMAX 250/300 ile hiçbir parçası uyumlu değildir."
  }
];

const VARIATORS = [
  {
    name: "Malossi Multivar 2000",
    brand: "Malossi (İtalya)",
    code: "5117861 (300cc) / 5114148 (400cc)",
    rollers: "8 Adet (25 x 14.9 mm)",
    weight: "8.0 g (300cc) / 10.0g - 12.0g (400cc)",
    features: "Sinterlenmiş çelik burç yuvaları, yüksek silikon alaşımlı hareketli yanak.",
    description: "Standart 6 bagalı yapıyı radikal şekilde 8 bagalı sisteme dönüştürür. Amacı merkezkaç kuvvetini rampa yüzeylerine homojen dağıtarak titreşimi sönümlemek ve pürüzsüz vites geçişi sunmaktır. 400cc kiti çift ayar şimi (0.5mm) ile birlikte gelir."
  },
  {
    name: "Polini Hi-Speed 12-Roller",
    brand: "Polini (İtalya)",
    code: "241.741 (300cc)",
    rollers: "12 Adet (Özel Polini)",
    weight: "7.0 g (Aramid-Nylon)",
    features: "DLC (Diamond Like Carbon) kaplamalı çelik pin, entegre yaylı gres rezervuarı.",
    description: "12 adet son derece hafif baga ile dönüş esnasındaki dairesel kaçıklığı (runout) sıfıra indirir. Patentli dahili yağlama sisteminde yer alan yaylı mekanizma, burç yüzeyini sürekli yağlayarak aşınmayı %60 azaltır ve milisaniyelik gaz tepkisi sunar."
  },
  {
    name: "J.Costa Transverse PRO",
    brand: "J.Costa (İspanya)",
    code: "TM42 (250cc) / Özel (300cc)",
    rollers: "Mermi Tipi Özel Eksenel Ağırlıklar",
    weight: "Değişken Gramajlar",
    features: "Eksenel (dikey) ağırlık hareketi, sıfır rampa sürtünmesi.",
    description: "Geleneksel yuvarlak bagalar yerine mermi şeklindeki ağırlıkların dikey yuvalarda eksenel kaymasıyla çalışır. Sürtünme sıfıra yakındır ve motora anlık devir sıçraması (instant RPM jump) ile doğrusal tork eğrisi kazandırır. Sıkı kayış kontrolü gerektirir."
  },
  {
    name: "TDR Performance Pulley V.23",
    brand: "TDR (Tayland / Endonezya)",
    code: "33301-B7401-CPWSR",
    rollers: "6 Adet (23 x 18 mm)",
    weight: "İsteğe bağlı yedek baga setleri",
    features: "13.8° dikleştirilmiş kasnak açısı, yüksek ısı transferli alüminyum alaşım.",
    description: "Güneydoğu Asya&apos;nın nemli ve sıcak iklim koşulları için tasarlanmıştır. Orijinal 14 derecelik kasnak açısı 13.8 dereceye düşürülerek kayışın alt devirlerde daha dipte kalması (kısa vites) ve üst devirlerde dış çepere daha kolay tırmanması hedeflenmiştir."
  }
];

const CLUTCHES = [
  {
    type: "Ayarlanabilir Debriyaj",
    brand: "Malossi Maxi Delta Clutch",
    code: "M5211821 / M5211481",
    compatibility: "XMAX 300 / 400",
    details: "Patentli ayar sistemi ile debriyaj pabuçlarının yay ön yüklemesini (preload) ve geometrisini değiştirir. 3 ila 9 mikro ayar ve 27 farklı kombinasyon sunar.",
    benefit: "Motorun maksimum tork ürettiği devir bandında (peak torque RPM) kavramayı kilitleyerek sıfır kayıpla fırlama (launch) sağlar."
  },
  {
    type: "Sokak Tipi Debriyaj",
    brand: "Malossi Maxi Fly Clutch",
    code: "5217848B (300cc) / 5212819 (400cc)",
    compatibility: "XMAX 300 / 400",
    details: "Güçlendirilmiş sinterlenmiş metalik pabuç alaşımı. Fabrika çıkışı yaylara göre 500-800 RPM daha geç kavrama yapacak şekilde kalibre edilmiştir.",
    benefit: "Tak-çalıştır yapısıyla dur-kalk trafiğindeki kalkış hantallığını ve debriyaj titremesini kalıcı olarak giderir."
  },
  {
    type: "Kilitli Debriyaj Sistemi",
    brand: "Dr. Pulley HiT (High Thrust)",
    code: "HiT261301M1",
    compatibility: "XMAX 300",
    details: "Çift yaylı kilit mekanizması (debriyaj yayları + kilit yayları). Kavrama anında gövdedeki özel kam ve itici miller yardımıyla pabuçları çana mekanik olarak kilitler.",
    benefit: "Debriyajın yüksek tork altında çan içinde kaymasını (slipping) tamamen önler, sürtünme kaynaklı ısıyı ve balata camlaşmasını engeller. Güç iletimini %35 artırır."
  },
  {
    type: "Soğutmalı Çan (150 mm)",
    brand: "Malossi Maxi Wing Clutch Bell",
    code: "7717853b (300cc) / 7715582b (400cc)",
    compatibility: "XMAX 300 (1440g) / XMAX 400 (1664g)",
    details: "Dış çeperinde kaynakla birleştirilmiş patentli kanatlı soğutma halkasına (fin) sahiptir. Çan döndükçe sıcak havayı dışarı üfler.",
    benefit: "Debriyaj odasındaki ısıyı kritik düzeyde düşürür, yüksek hızlarda çanın ısıdan dolayı daireselliğini kaybedip eğrilmesini (warping) ve mavi lekelenmeyi engeller."
  }
];

const SETUPS = [
  {
    id: 1,
    name: "Günlük Şehir İçi Canlılık (Stop-and-Go)",
    model: "XMAX 250 Blue Core",
    front: "Orijinal yanaklar torna ile 13.8° açısına çekilir, baga kanalları pürüzsüzleştirilir (hafif kerok).",
    roller: "6 adet 13 gram yuvarlak NCY veya Dr. Pulley 13 gram sliding baga.",
    shim: "Sürücü burcu arkasına 0.5 mm çelik kasnak şimi eklenir.",
    rear: "Malossi Maxi Fly Clutch debriyaj veya orijinal balatalara karbon-kevlar çakılması. Soğutma kanallı orijinal çan.",
    springs: "Orijinal kontrast yayı korunur, debriyaj küçük yayları Malossi Beyaz yay setiyle değiştirilir (Kavrama: 3500 → 4200 RPM).",
    behavior: "Yoğun şehir trafiğinde motorun erken vites büyütüp yığılmasını engeller, debriyaj silkelemesini tamamen keser."
  },
  {
    id: 2,
    name: "Otoban ve Uzun Yol Hız Kurulumu",
    model: "XMAX 250 Blue Core",
    front: "TDR Performance Pulley V.23 ön varyatör kiti.",
    roller: "Dr. Pulley 15 gram Sliding baga (Geniş vites oranı ve düşük seyir devri için).",
    shim: "Uygulanmaz (Maksimum son hız odaklı).",
    rear: "Malossi Maxi Fly System debriyaj ve çan seti.",
    springs: "Faito R90 veya TDR %10 sert tork yayı (Kontrast yayı).",
    behavior: "Yüksek süratlerde titreşimsiz seyir ve uzun yolda yakıt ekonomisi sunar. Son hızda +5 km/h artış sağlar."
  },
  {
    id: 3,
    name: "Otoyol Sürüşü ve Konfor (Commuter/Touring)",
    model: "XMAX 300 (Euro 4/5/5+)",
    front: "Orijinal varyatör grubu ve yanak geometrisi muhafaza edilir.",
    roller: "8 adet 17.0 gram Malossi HTRoll (23 x 18 mm) baga (Isıya ve aşınmaya son derece dayanıklı pürüzsüz malzeme).",
    shim: "Uygulanmaz.",
    rear: "Orijinal debriyaj + Malossi Maxi Wing Clutch Bell (1440 gram).",
    springs: "Tamamen orijinal OEM kontrast ve debriyaj yayları.",
    behavior: "Avrupa turları ve uzun mesafeli otoban sürüşlerinde motoru yormayan, titreşimsiz ve yakıt tasarruflu orijinal sürüş karakteri."
  },
  {
    id: 4,
    name: "Agresif Sokak / Spor Sürüş (İtalyan Tarzı)",
    model: "XMAX 300 (Euro 4/5/5+)",
    front: "Malossi Multivar 2000 ön varyatör kiti (Kod: 5117861).",
    roller: "Kit içinden çıkan 8 adet 25 x 14.9 mm boyutlarında 8.0 gramlık HTRoll bagalar.",
    shim: "Malossi burç arkasına 0.5 mm ön şim.",
    rear: "Malossi Maxi Fly System debriyaj grubu.",
    springs: "Malossi Sarı Kontrast Yayı (1500 RPM arka tork yayı).",
    behavior: "Şehir içinde agresif ara hızlanmalar ve ani gaz açmalarda mükemmel reaksiyon veren doğrusal tork eğrisi."
  },
  {
    id: 5,
    name: "Sınırları Zorlayan Yarış / Drag Setupı",
    model: "XMAX 300 (Tayland Halimax Tarzı)",
    front: "Polini Hi-Speed 12-Roller varyatör (Kod: 241.741). Kasnak yanakları 13.5° açısına çekilir ve kanallar sonuna kadar frezelenir.",
    roller: "12 adet Polini 7.0 gram özel aramid-nylon baga.",
    shim: "Sürücü burcu arkasına 0.8 mm çelik şim.",
    rear: "Dr. Pulley HiT Kilitli Debriyaj (HiT261301M1) + Malossi Maxi Wing Soğutmalı Çan.",
    springs: "Polini %10 sert kontrast yayı + debriyaj üzerinde en sert kırmızı küçük yaylar. Kavrama devri: 5500 RPM.",
    behavior: "Sıfırdan kalkışta ön tekerleği kaldırma eğilimi gösteren pist kurulumu. Maksimum ivmelenme ve +15 km/h son hız artışı."
  },
  {
    id: 6,
    name: "Günlük Şehir İçi Esneklik Kurulumu",
    model: "XMAX 400 (Euro 3/4)",
    front: "Orijinal varyatör grubu muhafaza edilir.",
    roller: "Dr. Pulley 25 x 15 mm boyutlarında 15.0 gramlık kızaklı bagalar.",
    shim: "Uygulanmaz.",
    rear: "Malossi Maxi Fly Clutch debriyaj seti (Kod: 5212819).",
    springs: "Orijinal kontrast yayı + debriyaj pabuçlarına Malossi Sarı debriyaj yayları.",
    behavior: "Ağır şasinin alt devirlerdeki sarsıntısını ve kavrama gecikmesini giderir. Kalkış devrini 800 RPM yukarı taşır."
  },
  {
    id: 7,
    name: "Performanslı Otoban ve Touring Setupı",
    model: "XMAX 400 (Euro 3/4)",
    front: "Malossi Multivar 2000 ön varyatör kiti (Kod: 5114148).",
    roller: "25 x 14.9 mm boyutunda 8 adet baga: Simetrik karıştırılmış 4 adet 10g ve 4 adet 12g baga.",
    shim: "Kit içeriğindeki 2 adet 0.5 mm kalınlığında şim burç arkasına yerleştirilir.",
    rear: "Malossi Maxi Fly System debriyaj ve çan kiti (160mm, 1664g - Kod: 5216331).",
    springs: "Kit içeriğinde yer alan Malossi Beyaz kontrast yayı.",
    behavior: "Rampalarda ve otoyol sollamalarında şanzımanın anında vites küçültmesini (downshift) sağlayarak kesintisiz güç sunar."
  }
];

const COMPARISON_MATRIX = [
  { no: "Reçete 1", target: "Günlük / Yoğun Trafik", throttle: "Orta - Hızlı", launch: "~4200 RPM", cruise: "5500 - 6200 RPM", topSpeed: "Değişmez", belt: "OEM Standart", maintenance: "15.000 km" },
  { no: "Reçete 2", target: "Akıcı Otoban / Tur", throttle: "Doğrusal", launch: "~3500 RPM", cruise: "5000 - 5800 RPM", topSpeed: "+5 km/h", belt: "TDR Reinforced", maintenance: "18.000 km" },
  { no: "Reçete 3", target: "Uzun Yol / Ekonomi", throttle: "Yumuşak", launch: "~3200 RPM", cruise: "4800 - 5500 RPM", topSpeed: "Değişmez", belt: "OEM B5X Belt", maintenance: "20.000 km" },
  { no: "Reçete 4", target: "Sportif Cadde Kullanımı", throttle: "Çok Hızlı", launch: "~4600 RPM", cruise: "6000 - 6800 RPM", topSpeed: "+8 km/h", belt: "Malossi Kevlar", maintenance: "10.000 km" },
  { no: "Reçete 5", target: "Pist / Maksimum Güç", throttle: "Anlık (Instant)", launch: "~5500 RPM", cruise: "7000 - 8200 RPM", topSpeed: "+15 km/h", belt: "Polini/Gates Kevlar", maintenance: "3.000 km" },
  { no: "Reçete 6", target: "XMAX 400 Şehir İçi", throttle: "Doğrusal", launch: "~3800 RPM", cruise: "5200 - 6000 RPM", topSpeed: "Değişmez", belt: "OEM Standart", maintenance: "15.000 km" },
  { no: "Reçete 7", target: "XMAX 400 Otoban Gücü", throttle: "Hızlı", launch: "~4000 RPM", cruise: "5500 - 6500 RPM", topSpeed: "+10 km/h", belt: "Malossi X K Belt", maintenance: "12.000 km" }
];

export default function VariatorPerformancePage() {
  return (
    <>
      <article className="container-x py-16">
        <Link
          href="/performans"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-electric-cyan"
        >
          <ChevronLeft className="h-4 w-4" />
          Performans Paneli
        </Link>

        <Reveal>
          <header className="mt-6 max-w-3xl">
            <span className="chip">CVT &amp; Aktarma Organları</span>
            <h1 className="mt-4 h-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              XMAX CVT Mühendisliği ve <span className="text-electric">Performans Kılavuzu.</span>
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200">
              Yamaha XMAX serisinde (250, 300, 400) motor karakterini arka tekerleğe aktaran en kritik ünite Sürekli Değişken Şanzıman (CVT) sistemidir. Emisyon ve ekonomi kaygılarıyla kısıtlanmış stok şanzımanı, doğru mekanik ayarlar ve doğru performans bileşenleriyle birleştirerek bambaşka bir sürüş makinesine dönüştürebilirsiniz.
            </p>
          </header>
        </Reveal>

        {/* SECTION 1: Jenerasyonlar ve Uyumluluk */}
        <section className="mt-16 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              1. Jenerasyonlara Göre Şanzıman Yapısı ve Uyumluluk
            </h2>
            <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
              Her jenerasyonel geçiş; mil çaplarında, varyatör kapak tasarımlarında ve baga yuvalarında yapısal değişiklikleri beraberinde getirmiştir. Hatalı montajların ve ağır hasarların önüne geçmek için öncelikle jenerasyonel sınırları bilmek şarttır.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-ink-950/40 backdrop-blur-md">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-electric-cyan">
                    <th className="px-5 py-4">Model Grubu</th>
                    <th className="px-5 py-4">Model Yılları</th>
                    <th className="px-5 py-4">Motor Kodu</th>
                    <th className="px-5 py-4">Baga Ölçüsü</th>
                    <th className="px-5 py-4">OEM Ağırlık</th>
                    <th className="px-5 py-4">OEM Parça Kodu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs text-carbon-200">
                  {GENERATIONS.map((gen, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-5 py-4 font-semibold text-white">{gen.group}</td>
                      <td className="px-5 py-4 font-mono">{gen.years}</td>
                      <td className="px-5 py-4">{gen.engine}</td>
                      <td className="px-5 py-4 font-mono">{gen.rollerSize}</td>
                      <td className="px-5 py-4 font-mono">{gen.rollerWeight}</td>
                      <td className="px-5 py-4 font-mono text-[11px] text-carbon-300">{gen.oemCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* SECTION 2: Ön Varyatör Performans Kılavuzu */}
        <section className="mt-20 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              2. Öne Çıkan Performans Varyatörleri ve Rampaları
            </h2>
            <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
              Performans varyatörleri; kasnak yanak açılarını değiştirerek, baga rampalarını uzatarak ve hareketli yanağın ağırlığını azaltarak motorun tork bandına çok daha hızlı ulaşmasını sağlar.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            {VARIATORS.map((v, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="glass gradient-edge p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-electric-cyan">
                        {v.brand}
                      </span>
                      <span className="text-[10px] font-mono text-carbon-400">{v.code}</span>
                    </div>
                    <h3 className="mt-4 h-display text-xl font-semibold text-white">{v.name}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-carbon-200">{v.description}</p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.06] pt-4 grid grid-cols-2 gap-2 text-[10px] font-mono text-carbon-300">
                    <div><span className="text-electric-cyan">Baga Düzeni:</span> {v.rollers}</div>
                    <div><span className="text-electric-cyan">Kit Ağırlığı:</span> {v.weight}</div>
                    <div className="col-span-2 mt-1"><span className="text-carbon-400">Teknik Özellik:</span> {v.features}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 mt-6">
              <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-electric-cyan" />
                Malossi Ventilvar 2000 Sabit Yanak (Kod: 6118260B)
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                Performans varyatörünü tamamlayan en kritik parça, hareketli yanağın karşısında duran sabit yanak kasnağıdır. Elmas uçla işlenmiş yanak açısı kayışın tutunma alanını genişletirken, arka kısmında yer alan patentli aerodinamik soğutma kanatları sayesinde şanzıman kutusu içerisindeki sıcaklığı kritik derecede düşürerek kayışın ve bagaların erimesini engeller.
              </p>
            </div>
          </Reveal>
        </section>

        {/* SECTION 3: Arka Debriyaj Ünitesi */}
        <section className="mt-20 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              3. Arka Debriyaj Ünitesi: Balatalar, Çanlar ve Yaylar
            </h2>
            <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
              Ön varyatör motorun gücünü mekanik avantaja dönüştürürken, arka debriyaj ünitesi bu gücü kayıpsız bir şekilde tekerleğe aktarmakla yükümlüdür. Debriyaj kaçırması, ısınması ve titremesi en sık karşılaşılan kronik aktarma sorunlarıdır.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            {CLUTCHES.map((c, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="glass p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-carbon-300">
                        {c.type}
                      </span>
                      <span className="text-[10px] font-mono text-carbon-400">{c.compatibility}</span>
                    </div>
                    <h3 className="mt-4 h-display text-lg font-semibold text-white">{c.brand}</h3>
                    <p className="mt-2 text-[11px] text-carbon-400 font-mono">{c.code}</p>
                    <p className="mt-3 text-xs leading-relaxed text-carbon-200">{c.details}</p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.06] pt-4">
                    <span className="text-[10px] font-mono text-electric-cyan block uppercase tracking-wider">Performans Katkısı:</span>
                    <p className="mt-1 text-xs text-white font-medium">{c.benefit}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECTION 4: Baga Mühendisliği ve Kombinasyonları */}
        <section className="mt-20 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              4. Baga Mühendisliği ve Kombinasyonları
            </h2>
            <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
              Aktarma organlarında vites oranının ne zaman ve hangi devirde değişeceğini (shift curve) belirleyen birincil bileşen varyatör bagalarının (roller weight) ağırlığıdır.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <Reveal delay={0.05}>
              <div className="glass p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                    <Scale className="h-4 w-4" />
                  </span>
                  <h3 className="mt-5 h-display text-lg font-semibold text-white">
                    Hafif vs. Ağır Baga Seçimi
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                    Baga kütlesi azaltıldığında, varyatörün açılması için motorun daha yüksek devire (RPM) tırmanması gerekir. Hafif bagalar kalkışta agresif hızlanma ve rampa tırmanış gücü sağlarken, uzun yolda yüksek devir çevrilmesine sebep olur. Ağır bagalar ise erken vites büyüterek otoyol yakıt ekonomisi sunar.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                    <Cog className="h-4 w-4" />
                  </span>
                  <h3 className="mt-5 h-display text-lg font-semibold text-white">
                    Dr. Pulley Sliding Teknolojisi
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                    Köşeli kızaklı tasarımı sayesinde rampa üzerinde yuvarlanmaz, kayarak hareket ederler. Geniş temas yüzeyiyle aşınmaları çok geç olur. Girintili yapısı kalkışta kayışın mil eksenine daha fazla inmesini (kısa 1. vites), tam açıldığında ise kasnak dışına daha fazla tırmanmasını (uzun overdrive vitesi) sağlar.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                    <Layers className="h-4 w-4" />
                  </span>
                  <h3 className="mt-5 h-display text-lg font-semibold text-white">
                    Baga Karıştırma (Mixing) Kuralları
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                    Ara devir karakterini ayarlamak için farklı gramajlar karıştırılabilir fakat statik/dinamik balans için dizilim dairesel simetrik olmalıdır (Örn: 14g - 16g - 14g - 16g). Asla yan yana iki aynı ağırlık konulmamalı ve bagalar arasındaki ağırlık farkı **2.0 gramı kesinlikle aşmamalıdır.**
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 5: Atölye Sırları & İnce CVT Ayarları */}
        <section className="mt-20 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              5. İnce İnce CVT Ayarları ve Atölye Sırları
            </h2>
            <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
              Asya pazarlarındaki performans atölyelerini ayıran en büyük fark, hazır performans kitlerini doğrudan takmak yerine, bu kitleri milimetrik torna ve CNC işlemleriyle modifiye etmeleridir.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <Reveal delay={0.05}>
              <div className="glass p-6">
                <h3 className="h-display text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono">01.</span>
                  Bubut Derajat (Kasnak Derecesi Torna İşlemi)
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  Orijinal varyatör yanak açısı 14.0 derecedir. Torna tezgahında yanak açısı dikleştirilerek **13.8°** (şehir içi stop-and-go ve tork) veya **13.5°** (yarış/otoban, maksimum kayış sıkıştırma oranı ve yüksek son hız) seviyelerine çekilir. Kalkıştaki hafif zayıflık kasnak şimleri ile dengelenir.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass p-6">
                <h3 className="h-display text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono">02.</span>
                  Kerok Jalur (Baga Rampalarının CNC Frezelenmesi)
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  Orijinal varyatörlerde baga rampalarının bittiği yerde bulunan güvenlik stoperleri (stoper duvarları), baganın daha yukarı çıkmasını ve dolayısıyla kayışın en dış çepere ulaşmasını engeller. Baga kanallarının CNC frezeyle 1.5 ila 2.0 mm daha geriye doğru kazınması motorun iç aksamına dokunmadan **+10 km/h ila +15 km/h** temiz son hız sağlar.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass p-6">
                <h3 className="h-display text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono">03.</span>
                  Şim (Shim Washer / Ring Pulley) Uygulamaları
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  Varyatör burcu ile sabit yanak arasına yerleştirilen **0.5 mm ila 0.8 mm** kalınlığındaki çelik pullar, başlangıçta iki kasnak yanağını birbirinden uzaklaştırarak kayışın ön varyatör miline en yakın noktaya (dip noktaya) inmesini sağlar. Bu durum bisikletlerde en küçük ön vitese geçmekle aynı etkiye sahiptir; kalkış torku muazzam artar.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass p-6">
                <h3 className="h-display text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono">04.</span>
                  CVT Isı Yönetimi ve Havalandırma
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  CVT kutusundaki aşırı sıcaklık kayış genleşmesine, baga erimesine ve debriyaj balatalarının camlaşmasına (glazing) yol açar. Atölyelerde uygulanan en yaygın yöntem, CVT kapağındaki sünger filtreyi çıkararak yüksek geçirgenlikli paslanmaz metal tel süzgeç montajıdır (+%40 hava akışı). Şanzıman kapağını delmek ise yağmurlu sürüşte kayış kaymasına sebep olduğundan sokak motorlarında önerilmez.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 flex gap-3 mt-6">
              <ShieldAlert className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-red-200">Hayati Atölye Hatası Uyarısı!</h4>
                <p className="mt-1 text-xs leading-relaxed text-carbon-200">
                  Amatör modifikasyoncular şanzıman şimi (pul) ararken parça kataloğunda &quot;Shim&quot; olarak geçen **B74-12168-R0** parça kodlu ürünü sipariş etmektedir. Ancak bu parça CVT şimi değil, motorun silindir kapağında yer alan **2.0 mm kalınlığındaki subap ayar şimidir (valve tappet shim).** Bu kalınlığın varyatör miline takılması durumunda krank somununun diş kapma payı kalmaz ve somun fırlayarak motor bloğunda yıkıcı mekanik hasarlara yol açar.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 6: Model Bazlı Setuplar (Reçeteler) */}
        <section className="mt-20 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              6. Model Bazlı Sokak ve Yarış Reçeteleri
            </h2>
            <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
              Farklı sürüş hedefleri ve motor hacimleri için dünyanın en iyi yarış liglerinden ve İtalya caddelerinden derlenmiş, rüştünü ispatlamış şanzıman reçeteleri.
            </p>
          </Reveal>

          <div className="space-y-6 mt-8">
            {SETUPS.map((setup) => (
              <Reveal key={setup.id}>
                <div className="glass gradient-edge p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                    <div>
                      <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-electric-cyan">
                        Reçete #{setup.id} - {setup.model}
                      </span>
                      <h3 className="mt-2 h-display text-xl font-semibold text-white">
                        {setup.name}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="glass-quiet p-4 rounded-xl">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-electric-cyan block">Ön Varyatör &amp; Yanak</span>
                      <p className="mt-2 text-xs leading-relaxed text-carbon-200">{setup.front}</p>
                    </div>
                    <div className="glass-quiet p-4 rounded-xl">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-electric-cyan block">Baga Seçimi &amp; Şim</span>
                      <p className="mt-2 text-xs leading-relaxed text-carbon-200">{setup.roller}</p>
                      {setup.shim !== "Uygulanmaz." && <p className="mt-1 text-[11px] font-mono text-carbon-300"><span className="text-carbon-400">Şim:</span> {setup.shim}</p>}
                    </div>
                    <div className="glass-quiet p-4 rounded-xl md:col-span-2 lg:col-span-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-electric-cyan block">Arka Debriyaj &amp; Yaylar</span>
                      <p className="mt-2 text-xs leading-relaxed text-carbon-200">{setup.rear}</p>
                      <p className="mt-1 text-[11px] font-mono text-carbon-300"><span className="text-carbon-400">Yaylar:</span> {setup.springs}</p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-white/[0.04] pt-4 flex gap-2 items-center text-xs">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-carbon-400">Karakteristik Davranış:</span>
                    <span className="text-white font-medium">{setup.behavior}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECTION 7: Karşılaştırmalı Analiz Matrisi */}
        <section className="mt-20 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              7. Tüm Reçetelerin Karşılaştırmalı Analiz Matrisi
            </h2>
            <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
              Aşağıdaki matris, yukarıda detaylandırılan farklı hedeflere yönelik modifikasyon reçetelerinin performans çıktılarını ve bakım gereksinimlerini karşılaştırmalı olarak sunmaktadır.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-ink-950/40 backdrop-blur-md">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-electric-cyan">
                    <th className="px-4 py-4">Reçete</th>
                    <th className="px-4 py-4">Hedeflenen Kullanım</th>
                    <th className="px-4 py-4">Gaz Tepkisi</th>
                    <th className="px-4 py-4">Kavrama Devri</th>
                    <th className="px-4 py-4">Ortalama Sürüş</th>
                    <th className="px-4 py-4">Top Speed Değişimi</th>
                    <th className="px-4 py-4">Önerilen Kayış</th>
                    <th className="px-4 py-4">Bakım Periyodu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs text-carbon-200">
                  {COMPARISON_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-4 font-semibold text-white">{row.no}</td>
                      <td className="px-4 py-4">{row.target}</td>
                      <td className="px-4 py-4 font-medium text-electric-cyan">{row.throttle}</td>
                      <td className="px-4 py-4 font-mono">{row.launch}</td>
                      <td className="px-4 py-4 font-mono">{row.cruise}</td>
                      <td className="px-4 py-4 font-mono text-white font-medium">{row.topSpeed}</td>
                      <td className="px-4 py-4">{row.belt}</td>
                      <td className="px-4 py-4 font-mono font-medium text-carbon-300">{row.maintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* SECTION 8: Mühendislik & Akıllı Ayar İlkeleri */}
        <section className="mt-20 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              8. Sonuç ve Mühendislik Tavsiyeleri
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-carbon-200 max-w-3xl">
              Yamaha XMAX serisinde gerçekleştirilecek CVT modifikasyonları, tamamen kullanıcının sürüş karakteri, kullanım coğrafyası ve bütçesiyle uyumlu olmalıdır. Yapılan mekanik analizler ve bölgesel atölye deneyimleri doğrultusunda şu temel mühendislik ilkeleri göz önünde bulundurulmalıdır:
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <Reveal delay={0.05}>
              <div className="glass p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                    <Layers className="h-4 w-4" />
                  </span>
                  <h3 className="mt-5 h-display text-lg font-semibold text-white">
                    Aktarma Organlarında Dengenin Korunması
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                    Sadece ön varyatörün hafifletilmesi tek başına verimli bir çözüm sunmaz. Ön varyatördeki baga hafifletme işlemi, mutlaka arka gruptaki kontrast yayının sertliği ile dengelenmelidir. Denge kurulmadığı takdirde vites değişim eğrisinde tutarsızlıklar, kayış kaçırmaları ve aşırı yakıt tüketimi meydana gelecektir.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <h3 className="mt-5 h-display text-lg font-semibold text-white">
                    Malzeme Mühendisliği ve Aşınma Direnci
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                    Şanzıman içi sıcaklıkların otoyol sürüşlerinde ekstrem limitlere ulaştığı bilinmektedir. Bu nedenle, kalitesiz alaşımlı taklit varyatörler yerine elmas taşlamalı burçlara sahip, DLC kaplamalı veya patentli havalandırma kanatlı İtalyan/Tayvan menşeili performans parçalarının tercih edilmesi sürüş güvenliği açısından son derece önemlidir.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                    <Wrench className="h-4 w-4" />
                  </span>
                  <h3 className="mt-5 h-display text-lg font-semibold text-white">
                    Hassas Atölye İşçiliği
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                    Torna ve kanal kazıma (bubut/kerok) gibi geri dönüşü olmayan mekanik müdahalelerin yalnızca bu konuda uzmanlaşmış Ar-Ge merkezlerinde, CNC teknolojisi kullanılarak mikron hassasiyetinde yapılması gerekir. Hatalı yapılan manuel işlemler varyatörün balansını bozarak krank milinin kesilmesine yol açabilecek ağır motor hasarlarına zemin hazırlar. Sürücülerin, motor kapaklarındaki supap şimleri ile şanzıman pullarını karıştırmaması gibi temel montaj hassasiyetlerine dikkat etmesi şanzıman ömrünü doğrudan belirler.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 9: Kritik Montaj Uyarısı */}
        <section className="mt-16">
          <Reveal>
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex gap-3">
              <ShieldAlert className="h-6 w-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-yellow-200">Kritik Torklama ve Montaj Notu!</h4>
                <p className="mt-1 text-xs leading-relaxed text-carbon-200">
                  Varyatör somunları sıkılırken **kesinlikle havalı tabanca kullanılmamalıdır**. Krank milinin dişleri geri dönüşü olmayan şekilde zarar görebilir veya aşırı sıkılmadan dolayı kasnak çatlayabilir. Birincil kasnak somunu tork anahtarı kullanılarak **95 Nm** değerinde sıkılmalı, somunda fabrika verisi yeni kilit pulu tercih edilmelidir.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </article>
    </>
  );
}
