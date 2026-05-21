"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ArrowUpRight,
  Gauge,
  Cog,
  Scale,
  ShieldAlert,
  Wrench,
  Layers,
  ShieldCheck,
  Zap,
  Info,
  Check,
  AlertTriangle,
  Award
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

// Types
type ModelType = "300cc" | "250cc" | "400cc";

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
  // Simulator State
  const [selectedModel, setSelectedModel] = useState<ModelType>("300cc");
  const [selectedWeightMode, setSelectedWeightMode] = useState<string>("fp");

  // Brand Explorer State
  const [activeBrand, setActiveBrand] = useState<string>("malossi");

  // Setup Wizard State
  const [activeSetupId, setActiveSetupId] = useState<number>(4);

  // Model-specific weight options for Simulator
  const simulatorData = {
    "300cc": {
      name: "XMAX 300 (Euro 4/5/5+)",
      stock: "17.5 Gram (6 Adet)",
      options: [
        {
          id: "stock",
          weight: "17.5g (Stok)",
          title: "Standart / Konfor Karakteri",
          description: "Çevre emisyonu ve yakıt ekonomisi için idealdir. Ancak şehir içi dur-kalk trafiğinde ve ani sollama ihtiyaçlarında kalkış hantallığı ve debriyaj titremesi (silkeleme) hissettirir.",
          stats: { launch: 40, economy: 95, topSpeed: 85, comfort: 95 },
          pros: "Maksimum yakıt ekonomisi, düşük seyir devri, titreşimsiz uzun yol.",
          cons: "Kalkışta yığılma, sollamalarda devirlenme gecikmesi, kavrama titremesi."
        },
        {
          id: "fp",
          weight: "16.0g (-1.5g Modifikasyonu)",
          title: "🏆 En İdeal F/P Sokak Modu",
          description: "Stok varyatörünüzü değiştirmeden yapabileceğiniz en mantıklı yükseltmedir. Kalkıştaki silkeleme ve devir yığılması tamamen kaybolur, motor devirlenmesi tork bandına çok daha hızlı tırmanır.",
          stats: { launch: 75, economy: 90, topSpeed: 88, comfort: 90 },
          pros: "Debriyaj silkelemesini sıfırlar, ara hızlanmaları canlandırır, son hızı korur.",
          cons: "Uzun yolda seyir devri yaklaşık 300 RPM artar, yakıt tüketimi ihmal edilebilir düzeyde (%2) yükselir."
        },
        {
          id: "dynamic",
          weight: "15.0g (-2.5g Modifikasyonu)",
          title: "Atik Şehir İçi Canavarı",
          description: "Özellikle şehir içindeki stop-and-go kullanımda, rampa yukarı artçılı sürüşlerde ve ara hızlanmalarda olağanüstü gaz tepkisi sunar. Şanzıman sürekli tork zirvesinde kalır.",
          stats: { launch: 90, economy: 80, topSpeed: 82, comfort: 80 },
          pros: "Çok hızlı devirlenme, rampalarda kesinlikle bayılmama, agresif kalkış torku.",
          cons: "Uzun yolda yüksek devir çevirdiği için yakıt tüketimi %5 civarı artar, motor sesi yükselir."
        },
        {
          id: "race",
          weight: "13.0g - 14.0g (Agresif)",
          title: "Maksimum İvmelenme & Pist",
          description: "Stok şanzımanda limitleri zorlayan, motorun beygir gücü eğrisinin en tepesinde (6500-7000 RPM) kalkış yapmasını sağlayan agresif sokak/pist modifikasyonudur.",
          stats: { launch: 100, economy: 65, topSpeed: 75, comfort: 65 },
          pros: "Muazzam sıfırdan kalkış ivmesi, anlık sollama gücü, ön tekeri hafifletme eğilimi.",
          cons: "Çok yüksek yakıt tüketimi, kayış ve varyatör ömrünün hızla kısalması, otoyolda aşırı bağırma."
        }
      ]
    },
    "250cc": {
      name: "XMAX 250 (Blue Core)",
      stock: "15.0 Gram ( veya 17.0 Gram)",
      options: [
        {
          id: "stock",
          weight: "15.0g / 17.0g (Stok)",
          title: "Dengeli Şehir İçi",
          description: "Sakin ve yakıt tasarruflu sürüşler için kalibre edilmiştir. Ancak 250cc bloğun düşük torku sebebiyle kalkışta debriyaj tasında silkeleme yapmaya son derece meyillidir.",
          stats: { launch: 45, economy: 95, topSpeed: 80, comfort: 90 },
          pros: "Uzun kayış ömrü, optimum yakıt tüketimi.",
          cons: "Trafikte debriyaj titremesi, dik rampalarda yığılma."
        },
        {
          id: "fp",
          weight: "13.0g / 14.0g (-2.0g F/P Modu)",
          title: "🏆 Canlı Şehir içi & Rampacı",
          description: "250cc Blue Core kullanıcıları için en popüler sokak reçetesidir. Kalkış devrini torkun başladığı 4000 RPM üzerine taşıyarak kavramayı pürüzsüzleştirir.",
          stats: { launch: 80, economy: 88, topSpeed: 82, comfort: 85 },
          pros: "Kalkıştaki titremeyi keser, rampalarda iki kişi sürerken çekiş gücünü artırır.",
          cons: "Son hızda (top speed) 3-5 km/h kayıp riski olabilir (kasnak şimiyle dengelenmelidir)."
        }
      ]
    },
    "400cc": {
      name: "XMAX 400 (YP400R)",
      stock: "17.0 Gram (6 Adet)",
      options: [
        {
          id: "stock",
          weight: "17.0g (Stok)",
          title: "Yüksek Torklu Otoyol Karakteri",
          description: "400cc Majesty tabanlı bloğun yüksek torkunu koruyarak otoyolda çok düşük devirle yüksek hızlarda gitmesini sağlar. Ancak şehir içinde ağır şasiyi hareket ettirmek zordur.",
          stats: { launch: 50, economy: 85, topSpeed: 95, comfort: 90 },
          pros: "Mükemmel son hız stabilitesi, otoyolda düşük titreşim.",
          cons: "Kalkıştaki hantallık, dur-kalk trafiğinde debriyajın aşırı ısınması ve şişmesi."
        },
        {
          id: "fp",
          weight: "15.0g (-2.0g Modifikasyonu)",
          title: "🏆 En İyi F/P Şehir İçi Esneklik",
          description: "Ağır kasnak yapısına sahip XMAX 400&apos;ü hantallıktan kurtaran en etkili moddur. Kalkış devrini 800 RPM yukarı taşıyarak kavramayı hızlandırır.",
          stats: { launch: 80, economy: 80, topSpeed: 90, comfort: 85 },
          pros: "Debriyaj kaydırmasını engeller, ara hızlanmaları belirgin şekilde serileştirir.",
          cons: "CVT kutusu içi harareti artırır (soğutmalı debriyaj çanı ile kombine edilmelidir)."
        }
      ]
    }
  };

  const selectedSimulator = simulatorData[selectedModel];
  const activeOption = selectedSimulator.options.find(o => o.id === selectedWeightMode) || selectedSimulator.options[0];

  // Brand Data
  const brandData = {
    malossi: {
      title: "Malossi Multivar 2000",
      origin: "İtalya (ITA)",
      characteristic: "Tork ve Ara Hızlanma Odaklı — Dünya Standardı",
      philosophy: "Malossi, orijinal varyatörün 6 bagalı yapısını radikal bir kararla 8 bagalı sisteme dönüştürmüştür. Buradaki mühendislik amacı, merkezkaç kuvvetinin rampa yüzeylerine homojen yayılmasını sağlamak ve kayış üzerindeki titreşimleri sönümlemektir. 25x14.9 mm boyutlarındaki HTRoll bagalarla çalışır.",
      hubDetails: "Sürücü burcu (hub) alaşımlı çelikten imal edilmiş olup, sert krom kaplama ve elmas uçla taşlanmış yüzeye sahiptir. Bu sayede sürtünme katsayısı minimuma indirilmiştir.",
      pros: ["8 bagalı sistemle mükemmel balans ve sıfır titreşim", "Türkiye pazarında en geniş yedek parça ve baga desteği", "Yüksek torkla inanılmaz agresif ara hızlanmalar"],
      cons: ["Sert sarı debriyaj yayıyla yakıt tüketimini %5-10 artırır", "Yüksek devirde kalma eğilimi nedeniyle uzun yolda hafif bağırma"],
      featured: "Malossi Ventilvar 2000 (Sabit Yanak): Elmas uçla işlenmiş yanak açısı kayış tutunmasını artırırken, arka aerodinamik soğutma kanatları CVT hararetini düşürür."
    },
    polini: {
      title: "Polini Hi-Speed 12-Roller",
      origin: "İtalya (ITA)",
      characteristic: "Maksimum Pürüzsüzlük ve Milisaniyelik Gaz Tepkisi",
      philosophy: "Polini, şanzıman dengesi ve kesintisiz ivmelenme konusunda en uç mühendisliği sunar. Ağırlık dağılımını kusursuzlaştırmak için 12 bagalı bir varyatör tasarlamıştır. Son derece hafif (7 gram) aramid-nylon fiber alaşımlı bagalarla dönüş esnasındaki dairesel sapmayı sıfıra indirir.",
      hubDetails: "Patentli yağlama sistemine sahiptir. Kasnak burcu karbon benzeri elmas (DLC - Diamond Like Carbon) kaplamalı çelikten üretilmiştir. Burç içindeki geniş gres haznesi ve özel yay, gresin sürekli ve homojen dağılmasını sağlayarak aşınmayı %60 azaltır.",
      pros: ["12 baga ile mükemmel balans ve sıfır kaçıklık", "DLC kaplamalı burç sayesinde aşınmaya karşı olağanüstü ömür", "Gecikmesiz, doğrudan tekerleğe iletilen gaz tepkisi"],
      cons: ["12 baga ve özel burç yapısı nedeniyle yedek parça maliyeti yüksektir", "Montaj esnasında gres yağlama protokolüne aşırı hassasiyet gerektirir"],
      featured: "DLC Yağlama Sistemi: Kuru çalışan rakiplerine kıyasla burç sürtünmesini sıfırlayarak gaz tepkisini milisaniyeler seviyesine çeker."
    },
    jcosta: {
      title: "J.Costa Transverse PRO",
      origin: "İspanya (ESP)",
      characteristic: "Ezber Bozan Eksenel (Transversal) Güç İletimi",
      philosophy: "Geleneksel dairesel yuvarlanan baga hareketini tamamen reddeden, kendine özgü bir dikey eksenel çalışma sistemidir. Mermi şeklindeki yüksek mukavemetli plastik ağırlıklar, varyatör gövdesindeki dikey yuvalarda dışa doğru kayarak kasnağı doğrudan iter. Rampa sürtünmesi tamamen sıfırlanmıştır.",
      hubDetails: "Tamamen kuru çalışan transvers mermili gövde. Klasik rampa plakası bulunmaz, bu sayede şanzımandaki mekanik gürültü ve kayıp minimuma indirilmiştir.",
      pros: ["Rakiplerinden çok daha hızlı devirlenme (Instant RPM jump)", "Kusursuz doğrusal tork eğrisi ve debriyaj kaydırmasının sıfırlanması", "Varyatör ağırlığı doğrudan kasnağı ittiği için yüksek son hız (+10 km/h)"],
      cons: ["Çok sıkı kayış kontrolü gerektirir, kayışı sınırda çalıştırır", "Özel mermi ağırlıklarının ömrü kısadır ve yedek parça temini zordur"],
      featured: "Eksenel (Transversal) İtme: Geleneksel bagaların yarattığı rampa sürtünmesini tamamen yok ederek gücü doğrudan tekerleğe aktarır."
    },
    tdr: {
      title: "TDR CVT Performance Pulley V.23",
      origin: "Tayland / Endonezya (SEA)",
      characteristic: "Agresif Kalkış ve Yüksek Isı Transferi — F/P Canavarı",
      philosophy: "Güneydoğu Asya&apos;nın aşırı sıcak ve nemli ikliminde, debriyaj kaydırmasını önlemek ve kalkıştaki hantallığı gidermek amacıyla tasarlanmıştır. Ön varyatör kasnak yüzey açısı orijinal 14.0 dereceden dikleştirilerek 13.8 dereceye çekilmiştir.",
      hubDetails: "TDR Gold serisindeki altın sarısı teflon kaplama, rampa yataklarında bagaların sürtünmesini ve aşırı ısınmasını engeller.",
      pros: ["13.8° dikleştirilmiş açı sayesinde muazzam kalkış torku (kısa vites etkisi)", "Yüksek ısı iletim katsayısına sahip özel alüminyum alaşım", "Ekonomik bütçeyle en yüksek verimi sunan F/P odaklı yapı"],
      cons: ["Uzun ömürlülük açısından slider plastikleri İtalyan rakiplerine göre daha erken aşınır", "Çok yüksek hızlarda (top speed) stabilite sınırlıdır"],
      featured: "13.8 Derecelik Özel Kasnak Açısı: Kayışın alt devirlerde daha dipte kalmasını sağlayarak kalkışta zincir dişlisi küçültülmüş hissi verir."
    }
  };

  const currentBrand = brandData[activeBrand as keyof typeof brandData];

  // Setup recipes
  const currentSetup = SETUPS.find(s => s.id === activeSetupId) || SETUPS[3];

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
              Varyatör &amp; CVT <span className="text-electric">Mühendislik Laboratuvarı.</span>
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200">
              Yamaha XMAX motorlarında gücü yöneten en kritik ünite CVT şanzımandır. Burası kuru bir rapor sayfası değil; bizzat sürüş tarzınıza göre şanzımanınızı nasıl optimize edeceğinizi test edebileceğiniz **etkileşimli bir simülasyon ve mühendislik merkezidir.**
            </p>
          </header>
        </Reveal>

        {/* SECTION 1: INTERACTIVE ROLLER SIMULATOR */}
        <section className="mt-16 space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">Etkileşimli Asistan</span>
              <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
                1. Baga Ağırlığı &amp; Karakter Simülatörü
              </h2>
              <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
                Şanzıman varyatörünü değiştirmeden, sadece varyatör bagalarının (roller weights) ağırlığını değiştirerek motorunuzun karakterini nasıl tamamen değiştirebileceğinizi simüle edin. Aşağıdan modelinizi seçin ve ağırlık modlarına tıklayın:
              </p>
            </div>
          </Reveal>

          {/* Model Selector Tabs */}
          <Reveal delay={0.05}>
            <div className="flex gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto">
              {(["300cc", "250cc", "400cc"] as ModelType[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setSelectedModel(m);
                    setSelectedWeightMode("stock");
                  }}
                  className={cn(
                    "px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                    selectedModel === m
                      ? "bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/30"
                      : "text-carbon-300 hover:text-white border border-transparent"
                  )}
                >
                  {m === "300cc" ? "XMAX 300 (Euro 4/5/5+)" : m === "250cc" ? "XMAX 250 (Blue Core)" : "XMAX 400 (YP400R)"}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Simulator Layout */}
          <Reveal delay={0.08}>
            <div className="grid gap-6 lg:grid-cols-12 mt-6">
              {/* Left Side: Option Cards */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <span className="text-[10px] font-mono text-carbon-400 uppercase tracking-wider block">Karakter Seçenekleri (Stok Ağırlık: {selectedSimulator.stock})</span>
                {selectedSimulator.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedWeightMode(opt.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center",
                      selectedWeightMode === opt.id
                        ? "border-electric-cyan/40 bg-gradient-to-r from-electric-cyan/10 to-transparent shadow-ambient-blue"
                        : "border-white/[0.06] bg-white/[0.01] hover:border-white/20"
                    )}
                  >
                    <div>
                      <div className="text-xs font-mono text-electric-cyan font-semibold">{opt.weight}</div>
                      <div className="text-sm font-semibold text-white mt-0.5">{opt.title}</div>
                    </div>
                    <span className={cn(
                      "size-4 rounded-full border flex items-center justify-center text-[10px]",
                      selectedWeightMode === opt.id
                        ? "border-electric-cyan bg-electric-cyan text-ink-950 font-bold"
                        : "border-carbon-400"
                    )}>
                      {selectedWeightMode === opt.id && "✓"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Side: Simulation Results Dashboard */}
              <div className="lg:col-span-7 glass p-6 sm:p-8 flex flex-col justify-between rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Gauge className="size-48 text-electric-cyan" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                    <div>
                      <span className="text-[9px] font-mono text-electric-cyan uppercase tracking-widest block">Simüle Edilen Kurulum</span>
                      <h3 className="h-display text-xl font-bold text-white mt-1">{activeOption.title}</h3>
                    </div>
                    <div className="rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-carbon-300">
                      Öneri: {activeOption.weight}
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                    {activeOption.description}
                  </p>

                  {/* Visual Stats Bars */}
                  <div className="mt-6 space-y-3.5">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-carbon-300 mb-1">
                        <span>Kalkış &amp; Ara Hızlanma Atikliği</span>
                        <span className="text-white font-bold">{activeOption.stats.launch}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-all duration-500"
                          style={{ width: `${activeOption.stats.launch}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-carbon-300 mb-1">
                        <span>Yakıt Ekonomisi</span>
                        <span className="text-white font-bold">{activeOption.stats.economy}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-all duration-500"
                          style={{ width: `${activeOption.stats.economy}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-carbon-300 mb-1">
                        <span>Son Hıza Ulaşma Kolaylığı</span>
                        <span className="text-white font-bold">{activeOption.stats.topSpeed}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-all duration-500"
                          style={{ width: `${activeOption.stats.topSpeed}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-carbon-300 mb-1">
                        <span>Uzun Yol Seyir Konforu</span>
                        <span className="text-white font-bold">{activeOption.stats.comfort}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-all duration-500"
                          style={{ width: `${activeOption.stats.comfort}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 pt-4 border-t border-white/[0.06]">
                  <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-xl">
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">✓ Mekanik Avantajı</span>
                    <span className="text-xs text-carbon-200 mt-1 block leading-normal">{activeOption.pros}</span>
                  </div>
                  <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-xl">
                    <span className="text-[9px] font-mono text-red-400 uppercase tracking-wider block font-bold">✗ Maliyet / Dezavantaj</span>
                    <span className="text-xs text-carbon-200 mt-1 block leading-normal">{activeOption.cons}</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 2: INTERACTIVE BRAND EXPLORER */}
        <section className="mt-24 space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">Marka Karşılaştırma Laboratuvarı</span>
              <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
                2. Ön Varyatör Performans Devleri
              </h2>
              <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
                Her markanın şanzıman teorisi ve rampa açısı felsefesi tamamen farklıdır. Aşağıdan marka seçerek rampa geometrisini ve çalışma prensibini derinlemesine inceleyin:
              </p>
            </div>
          </Reveal>

          {/* Brand Buttons */}
          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-white/[0.08] pb-4">
              {[
                { id: "malossi", name: "Malossi Multivar" },
                { id: "polini", name: "Polini Hi-Speed" },
                { id: "jcosta", name: "J.Costa Axial" },
                { id: "tdr", name: "TDR Performance" }
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBrand(b.id)}
                  className={cn(
                    "px-4 py-3 text-xs font-semibold rounded-xl transition-all border text-center",
                    activeBrand === b.id
                      ? "bg-electric-cyan/15 text-electric-cyan border-electric-cyan/40 shadow-ambient-blue"
                      : "text-carbon-300 hover:text-white border-white/[0.06] bg-white/[0.015]"
                  )}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Brand Presentation */}
          <Reveal delay={0.08}>
            <div className="glass gradient-edge p-6 sm:p-8 rounded-2xl mt-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div>
                  <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-electric-cyan">
                    Menşei: {currentBrand.origin}
                  </span>
                  <h3 className="mt-2 h-display text-2xl font-semibold text-white">{currentBrand.title}</h3>
                </div>
                <div className="text-right text-xs font-mono text-carbon-300">
                  <span className="text-electric-cyan">Felsefe:</span> {currentBrand.characteristic}
                </div>
              </div>

              {/* Rampa & Hub Details Grid */}
              <div className="grid gap-6 md:grid-cols-2 mt-6">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-electric-cyan flex items-center gap-1.5 font-bold">
                    <Cog className="h-3.5 w-3.5" /> Tasarım Felsefesi &amp; Rampa Yapısı
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                    {currentBrand.philosophy}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-electric-cyan flex items-center gap-1.5 font-bold">
                    <Wrench className="h-3.5 w-3.5" /> Burç &amp; Malzeme Alaşımı
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                    {currentBrand.hubDetails}
                  </p>
                </div>
              </div>

              {/* Pros & Cons list */}
              <div className="grid gap-6 sm:grid-cols-2 mt-6 pt-6 border-t border-white/[0.06]">
                <div className="glass-quiet p-4 rounded-xl">
                  <h4 className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold">Mekanik Artıları (Pros)</h4>
                  <ul className="mt-3 space-y-2">
                    {currentBrand.pros.map((p, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-carbon-200 leading-normal">
                        <span className="text-emerald-400 shrink-0 font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-quiet p-4 rounded-xl">
                  <h4 className="font-mono text-[9px] uppercase tracking-widest text-red-400 font-bold">Mekanik Eksileri &amp; Bakım (Cons)</h4>
                  <ul className="mt-3 space-y-2">
                    {currentBrand.cons.map((c, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-carbon-200 leading-normal">
                        <span className="text-red-400 shrink-0 font-bold">✗</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Featured Accessory */}
              <div className="bg-electric-cyan/5 border border-electric-cyan/20 p-4 rounded-xl mt-6 flex gap-3">
                <Info className="h-5 w-5 text-electric-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-mono text-electric-cyan uppercase tracking-widest font-bold block">Öne Çıkan Parça Entegrasyonu</span>
                  <p className="mt-1 text-xs text-carbon-200 leading-relaxed">{currentBrand.featured}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 3: ARKA DEBRİYAJ ÜNİTESİ */}
        <section className="mt-24 space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">Kayıpsız Güç Aktarımı</span>
              <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
                3. Arka Debriyaj Ünitesi: Balatalar, Çanlar ve Yaylar
              </h2>
              <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
                Ön varyatör motor devrine göre şanzıman oranını değiştirirken, arka grup kayışın kaçırmasını engellemek ve tekerleğe kavrama gücü sağlamakla yükümlüdür:
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            {CLUTCHES.map((c, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="glass p-6 flex flex-col justify-between h-full border border-white/[0.06] hover:border-white/15 transition-all">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-carbon-300">
                        {c.type}
                      </span>
                      <span className="text-[10px] font-mono text-carbon-400">{c.compatibility}</span>
                    </div>
                    <h3 className="mt-4 h-display text-lg font-semibold text-white">{c.brand}</h3>
                    <p className="mt-1 text-[10px] text-carbon-400 font-mono">{c.code}</p>
                    <p className="mt-3 text-xs leading-relaxed text-carbon-200">{c.details}</p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.06] pt-4">
                    <span className="text-[10px] font-mono text-electric-cyan block uppercase tracking-wider font-bold">Mekanik Katkı:</span>
                    <p className="mt-1 text-xs text-white font-medium">{c.benefit}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECTION 4: ATÖLYE SIRLARI & KRONİK HATA UYARISI */}
        <section className="mt-24 space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">İleri Düzey Mekanik</span>
              <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
                4. Atölye Sırları ve İnce CVT Ayarları
              </h2>
              <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
                Hazır kiti takıp geçmek yerine şanzıman milimetrelerini ayarlayan Asya (Tayland/Endonezya) atölyelerinin gizli modifikasyon protokolleri:
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <Reveal delay={0.05}>
              <div className="glass p-6 border border-white/[0.06]">
                <h3 className="h-display text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono">01.</span>
                  Bubut Derajat (Kasnak Derecesi İşlemi)
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  Orijinal varyatör yanak açısı 14.0 derecedir. Torna tezgahında yanak açısı dikleştirilerek **13.8°** (şehir içi stop-and-go ve tork) veya **13.5°** (yarış/otoban, maksimum kayış sıkıştırma oranı ve yüksek son hız) seviyelerine çekilir. Kalkıştaki hafif zayıflık kasnak şimleri ile dengelenir.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass p-6 border border-white/[0.06]">
                <h3 className="h-display text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono">02.</span>
                  Kerok Jalur (Rampa Frezeleme)
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  Orijinal varyatörlerde baga rampalarının bittiği yerde bulunan güvenlik stoperleri (stoper duvarları), baganın daha yukarı çıkmasını ve dolayısıyla kayışın ön varyatörde en dış çepere ulaşmasını engeller. Baga kanallarının CNC frezeyle 1.5 ila 2.0 mm daha geriye doğru kazınması motorun iç aksamına dokunmadan **+10 km/h ila +15 km/h** temiz son hız sağlar.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass p-6 border border-white/[0.06]">
                <h3 className="h-display text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono">03.</span>
                  Şim (Shim Washer) İnce Ayarı
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  Varyatör burcu ile sabit yanak arasına yerleştirilen **0.5 mm ila 0.8 mm** kalınlığındaki çelik pullar, başlangıçta iki kasnak yanağını birbirinden uzaklaştırarak kayışın ön varyatör miline en yakın noktaya (dip noktaya) inmesini sağlar. Bu durum bisikletlerde en küçük ön vitese geçmekle aynı etkiye sahiptir; kalkış torku muazzam artar.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass p-6 border border-white/[0.06]">
                <h3 className="h-display text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono">04.</span>
                  CVT Isı &amp; Gres Yönetimi
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  CVT kutusundaki aşırı sıcaklık kayış genleşmesine, baga erimesine ve debriyaj balatalarının camlaşmasına (glazing) yol açar. Atölyelerde havalandırma süngeri çıkarılarak paslanmaz metal tel süzgeç montajı yapılır (+%40 hava akışı). Gres olarak sadece burç içine **0.5 - 1.0 gram** yüksek ısıya dayanıklı lityum sabunlu/polyurea gres (`Malossi MHR Grease - 7615375b`) sürülmeli, bagalar kuru bırakılmalıdır.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 flex gap-3 mt-6">
              <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-red-200">Hayati Atölye Hatası Uyarısı!</h4>
                <p className="mt-1 text-xs leading-relaxed text-carbon-200">
                  Amatör modifikasyoncular şanzıman şimi (pul) ararken parça kataloğunda &quot;Shim&quot; olarak geçen **B74-12168-R0** parça kodlu ürünü sipariş etmektedir. Ancak bu parça CVT şimi değil, motorun silindir kapağında yer alan **2.0 mm kalınlığındaki subap ayar şimidir (valve tappet shim).** Bu kalınlığın varyatör miline takılması durumunda krank somununun diş kapma payı kalmaz ve somun fırlayarak motor bloğunda yıkıcı mekanik hasarlara yol açar.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 5: INTERACTIVE SETUP WIZARD */}
        <section className="mt-24 space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">Şanzıman Reçeteleri</span>
              <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
                5. Model Bazlı Hazır Şanzıman Reçeteleri
              </h2>
              <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
                Farklı motor hacimleri ve sürüş tarzları için rüştünü ispatlamış şanzıman reçeteleri. Aşağıdan sürüş reçetesini seçin:
              </p>
            </div>
          </Reveal>

          {/* Setup Selector Tabs */}
          <Reveal delay={0.05}>
            <div className="flex gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto">
              {SETUPS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSetupId(s.id)}
                  className={cn(
                    "px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                    activeSetupId === s.id
                      ? "bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/30 shadow-ambient-blue"
                      : "text-carbon-300 hover:text-white border border-transparent"
                  )}
                >
                  Fikir #{s.id} - {s.name.split(" (")[0]}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Active Setup Dashboard */}
          <Reveal delay={0.08}>
            <div className="glass gradient-edge p-6 sm:p-8 rounded-2xl mt-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                <div>
                  <span className="text-[9px] font-mono text-electric-cyan uppercase tracking-widest block font-bold">Uygulanan Model</span>
                  <span className="text-sm text-white font-semibold">{currentSetup.model}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-carbon-400 uppercase tracking-widest block font-bold text-right">Reçete Adı</span>
                  <span className="text-sm text-white font-semibold block text-right">{currentSetup.name}</span>
                </div>
              </div>

              {/* Recipe Steps */}
              <div className="grid gap-6 md:grid-cols-3 mt-6">
                <div className="glass-quiet p-4 rounded-xl">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-electric-cyan font-bold block">1. ÖN VARYATÖR &amp; DERİCİLENDİRME</span>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">{currentSetup.front}</p>
                </div>

                <div className="glass-quiet p-4 rounded-xl">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-electric-cyan font-bold block">2. BAGA AĞIRLIĞI &amp; ŞİM SETUPLARI</span>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">{currentSetup.roller}</p>
                  <div className="mt-2 pt-2 border-t border-white/[0.04] text-[11px] font-mono text-carbon-300">
                    <span className="text-carbon-400">Şim:</span> {currentSetup.shim}
                  </div>
                </div>

                <div className="glass-quiet p-4 rounded-xl">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-electric-cyan font-bold block">3. ARKA DEBRİYAJ &amp; KONTRAST YAYLAR</span>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">{currentSetup.rear}</p>
                  <div className="mt-2 pt-2 border-t border-white/[0.04] text-[11px] font-mono text-carbon-300">
                    <span className="text-carbon-400">Yaylar:</span> {currentSetup.springs}
                  </div>
                </div>
              </div>

              {/* Summary of behavior */}
              <div className="mt-6 bg-electric-cyan/5 border border-electric-cyan/20 p-4 rounded-xl flex gap-3">
                <Zap className="h-5 w-5 text-electric-cyan shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <span className="text-[9px] font-mono text-electric-cyan uppercase tracking-widest font-bold block">Mekanik İvmelenme Karakteri</span>
                  <p className="mt-1 text-xs text-white font-medium leading-relaxed">{currentSetup.behavior}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 6: COMPARATIVE TABLE */}
        <section className="mt-24 space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">Performans Matrisi</span>
              <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
                6. Tüm Reçetelerin Karşılaştırmalı Analiz Matrisi
              </h2>
              <p className="text-sm text-carbon-200 leading-relaxed max-w-3xl">
                Geliştirilen şanzıman reçetelerinin sürüş verilerini ve ömür parametrelerini tek bir matris üzerinden hızlıca karşılaştırın:
              </p>
            </div>
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

        {/* SECTION 7: MÜHENDİSLİK ADVISORIES */}
        <section className="mt-24 space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">Mühendislik Tavsiyeleri</span>
              <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
                7. Sonuç ve Temel İlkeler
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-carbon-200 max-w-3xl">
                Yamaha XMAX şanzıman modifikasyonlarında uzun ömürlü ve sağlıklı güç aktarımı elde etmek için mutlaka uyulması gereken mühendislik ilkeleri:
              </p>
            </div>
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

        {/* SECTION 8: KRİTİK MONTAJ NOTU */}
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
