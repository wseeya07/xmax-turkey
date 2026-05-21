"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Award,
  Sparkles,
  Eye,
  BookOpen,
  HelpCircle
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

// Types
type ModelType = "300cc" | "250cc" | "400cc";

// Constants & Data Sets
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
    details: "Çift yaylı kilit mekanizması (debriyaj yayları + kilit yayları). Kavrama anında gövdeki özel kam ve itici miller yardımıyla pabuçları çana mekanik olarak kilitler.",
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
    difficulty: "Orta (Atölye Yardımı)",
    mechanicMust: "Torna ve Şim Ayarı Gerekir",
    front: "Orijinal yanaklar torna ile 13.8° açısına çekilir, baga kanalları pürüzsüzleştirilir (hafif kerok).",
    roller: "6 adet 13 gram yuvarlak NCY veya Dr. Pulley 13 gram sliding baga.",
    shim: "Sürücü burcu arkasına 0.5 mm çelik kasnak şimi eklenir.",
    rear: "Malossi Maxi Fly Clutch debriyaj veya orijinal balatalara karbon-kevlar çakılması. Soğutma kanallı orijinal çan.",
    springs: "Orijinal kontrast yayı korunur, debriyaj küçük yayları Malossi Beyaz yay setiyle değiştirilir (Kavrama: 3500 → 4200 RPM).",
    behavior: "Yoğun şehir trafiğinde motorun erken vites büyütüp yığılmasını engeller, kalkıştaki o gıcık silkeleme ve titremeyi tamamen keser. 50 yaş üstü sürücüler için en konforlu moddur."
  },
  {
    id: 2,
    name: "Otoban ve Uzun Yol Hız Kurulumu",
    model: "XMAX 250 Blue Core",
    difficulty: "Orta",
    mechanicMust: "Temiz Montaj / Tork Anahtarı",
    front: "TDR Performance Pulley V.23 ön varyatör kiti.",
    roller: "Dr. Pulley 15 gram Sliding baga (Geniş vites oranı ve düşük seyir devri için).",
    shim: "Uygulanmaz (Maksimum son hız odaklı).",
    rear: "Malossi Maxi Fly System debriyaj ve çan seti.",
    springs: "Faito R90 veya TDR %10 sert tork yayı (Kontrast yayı).",
    behavior: "Yüksek süratlerde titreşimsiz seyir ve uzun yolda yakıt ekonomisi sunar. Son hızda +5 km/h net artış sağlar."
  },
  {
    id: 3,
    name: "Otoyol Sürüşü ve Konfor (Commuter/Touring)",
    model: "XMAX 300 (Euro 4/5/5+)",
    difficulty: "Kolay",
    mechanicMust: "Kendin Yapabilirsin",
    front: "Orijinal varyatör grubu ve yanak geometrisi muhafaza edilir.",
    roller: "8 adet 17.0 gram Malossi HTRoll (23 x 18 mm) baga (Isıya ve aşınmaya son derece dayanıklı pürüzsüz malzeme).",
    shim: "Uygulanmaz.",
    rear: "Orijinal debriyaj + Malossi Maxi Wing Clutch Bell (1440 gram).",
    springs: "Tamamen orijinal OEM kontrast ve debriyaj yayları.",
    behavior: "Avrupa turları ve uzun mesafeli otoban sürüşlerinde motoru yormayan, titreşimsiz ve yakıt tasarruflu orijinal sürüş karakterini korur."
  },
  {
    id: 4,
    name: "Agresif Sokak / Spor Sürüş (İtalyan Tarzı)",
    model: "XMAX 300 (Euro 4/5/5+)",
    difficulty: "Orta",
    mechanicMust: "Tork Anahtarı (95 Nm)",
    front: "Malossi Multivar 2000 ön varyatör kiti (Kod: 5117861).",
    roller: "Kit içinden çıkan 8 adet 25 x 14.9 mm boyutlarında 8.0 gramlık HTRoll bagalar.",
    shim: "Malossi burç arkasına 0.5 mm ön şim.",
    rear: "Malossi Maxi Fly System debriyaj grubu.",
    springs: "Malossi Sarı Kontrast Yayı (1500 RPM arka tork yayı).",
    behavior: "Şehir içinde agresif ara hızlanmalar ve ani gaz açmalarda mükemmel reaksiyon veren, motoru sürekli tork zirvesinde tutan spor kurulum."
  },
  {
    id: 5,
    name: "Sınırları Zorlayan Yarış / Drag Setupı",
    model: "XMAX 300 (Tayland Halimax Tarzı)",
    difficulty: "Zor (CNC & İleri Mekanik)",
    mechanicMust: "Profesyonel Ar-Ge Atölyesi Şart",
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
    difficulty: "Orta",
    mechanicMust: "Debriyaj Temizliği Gerektirir",
    front: "Orijinal varyatör grubu muhafaza edilir.",
    roller: "Dr. Pulley 25 x 15 mm boyutlarında 15.0 gramlık kızaklı bagalar.",
    shim: "Uygulanmaz.",
    rear: "Malossi Maxi Fly Clutch debriyaj seti (Kod: 5212819).",
    springs: "Orijinal kontrast yayı + debriyaj pabuçlarına Malossi Sarı debriyaj yayları.",
    behavior: "Ağır şasinin alt devirlerdeki sarsıntısını ve kavrama gecikmesini tamamen giderir. Kalkış devrini 800 RPM yukarı taşır."
  },
  {
    id: 7,
    name: "Performanslı Otoban ve Touring Setupı",
    model: "XMAX 400 (Euro 3/4)",
    difficulty: "Zor (Hassas Montaj)",
    mechanicMust: "Torklama ve Havalandırma Kontrolü",
    front: "Malossi Multivar 2000 ön varyatör kiti (Kod: 5114148).",
    roller: "25 x 14.9 mm boyutunda 8 adet baga: Simetrik karıştırılmış 4 adet 10g ve 4 adet 12g baga.",
    shim: "Kit içeriğindeki 2 adet 0.5 mm kalınlığında şim burç arkasına yerleştirilir.",
    rear: "Malossi Maxi Fly System debriyaj ve çan kiti (160mm, 1664g - Kod: 5216331).",
    springs: "Kit içeriğinde yer alan Malossi Beyaz kontrast yayı.",
    behavior: "Rampalarda ve otoyol sollamalarında şanzımanın anında vites küçültmesini (downshift) sağlayarak kesintisiz ve akıcı otoban sürüşü sunar."
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
  // 1. Diagram Explorer Hotspot State
  const [selectedHotspot, setSelectedHotspot] = useState<string>("rollers");

  // 2. Simulator State
  const [selectedModel, setSelectedModel] = useState<ModelType>("300cc");
  const [selectedWeightMode, setSelectedWeightMode] = useState<string>("fp");

  // 3. Brand Explorer State
  const [activeBrand, setActiveBrand] = useState<string>("malossi");

  // 4. Setup Wizard State
  const [activeSetupId, setActiveSetupId] = useState<number>(1);

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
      stock: "15.0 Gram (veya 17.0 Gram)",
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
          description: "Ağır kasnak yapısına sahip XMAX 400'ü hantallıktan kurtaran en etkili moddur. Kalkış devrini 800 RPM yukarı taşıyarak kavramayı hızlandırır.",
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
      image: "/images/performans/malossi_multivar_render.png",
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
      image: "/images/performans/polini_hispeed_render.png",
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
      image: "/images/performans/jcosta_axial_render.png",
      philosophy: "Geleneksel dairesel yuvarlanan baga hareketini tamamen reddeden, kendine özgü bir dikey eksenel çalışma sistemidir. Mermi şeklindeki yüksek mukavemetli plastik ağırlıklar, varyatör gövdesindeki dikey yuvalarda dışa doğru kayarak kasnağı doğrudan iter. Rampa sürtünmesi tamamen sıfırlanmıştır.",
      hubDetails: "Tamamen kuru çalışan transvers mermili gövde. Klasik rampa plakası bulunmaz, bu sayede şanzımandaki mekanik gürültü ve kayıp minimuma indirilmiştir.",
      pros: ["Rakiplerinden çok daha hızlı devirlenme (Instant RPM jump)", "Kusursuz doğrusal tork eğrisi ve debriyaj kaydırmasının sıfırlanması", "Varyatör ağırlığı doğrudan kasnağı ittiği için yüksek son hız (+10 km/h)"],
      cons: ["Çok sıkı kayış kontrolü gerektirir, kayışı sınırda çalıştırır", "Özel mermi ağırlıklarının ömrü kısadır ve yedek parça temini zordur"],
      featured: "Eksenel (Transversal) İtme: Geleneksel bagaların yarattığı rampa sürtünmesini tamamen yok ederek gücü doğrudan tekerleğe aktarır."
    },
    tdr: {
      title: "TDR CVT Performance Pulley V.23",
      origin: "Tayland / Endonezya (SEA)",
      image: "/images/performans/tdr_performance_render.png",
      characteristic: "Agresif Kalkış ve Yüksek Isı Transferi — F/P Canavarı",
      philosophy: "Güneydoğu Asya'nın aşırı sıcak ve nemli ikliminde, debriyaj kaydırmasını önlemek ve kalkıştaki hantallığı gidermek amacıyla tasarlanmıştır. Ön varyatör kasnak yüzey açısı orijinal 14.0 dereceden dikleştirilerek 13.8 dereceye çekilmiştir.",
      hubDetails: "TDR Gold serisindeki altın sarısı teflon kaplama, rampa yataklarında bagaların sürtünmesini ve aşırı ısınmasını engeller.",
      pros: ["13.8° dikleştirilmiş açı sayesinde muazzam kalkış torku (kısa vites etkisi)", "Yüksek ısı iletim katsayısına sahip özel alüminyum alaşım", "Ekonomik bütçeyle en yüksek verimi sunan F/P odaklı yapı"],
      cons: ["Uzun ömürlülük açısından slider plastikleri İtalyan rakiplerine göre daha erken aşınır", "Çok yüksek hızlarda (top speed) stabilite sınırlıdır"],
      featured: "13.8 Derecelik Özel Kasnak Açısı: Kayışın alt devirlerde daha dipte kalmasını sağlayarak kalkışta zincir dişlisi küçültülmüş hissi verir."
    }
  };

  const currentBrand = brandData[activeBrand as keyof typeof brandData];

  // Hotspot details
  const hotspotData = {
    rollers: {
      title: "Baga & Ağırlık Sistemi (Roller Weights)",
      desc: "Ön varyatörün kalbi bagalardır. Motor devri arttıkça merkezkaç kuvvetiyle dışarı doğru fırlarlar ve varyatör yanağını iterek kayışın yukarı tırmanmasını (vites büyütmeyi) sağlarlar.",
      olderPersona: "💡 Sade Anlatım: Bisiklette ön vitesi büyütmek gibidir. Stok bagaları (örn. XMAX 300'de 17.5g) sadece 1.5g hafifletip 16g yaparsanız, şanzıman daha geç vites büyütür. Bu sayede motor torklu devirde kalkar, o sinir bozucu silkeleme/titreme tamamen yok olur ve gaz kolu aşırı canlı hissettirir!",
      danger: "Aşırı hafifletme (örn. 12g) motorun otoyolda çok bağırmasına ve yakıtın fırlamasına sebep olur. Denge şarttır."
    },
    pulleys: {
      title: "Ön Varyatör Yanak Açısı (Drive Sheaves)",
      desc: "Kayışın ön şanzımanda üzerinde döndüğü konik yanaklardır. Orijinal fabrika açısı 14.0 derecedir. Bu açı kayışın dengeli ama uyuşuk tırmanması için ayarlanmıştır.",
      olderPersona: "💡 Sade Anlatım: Eğer bu yanakların açısını torna işlemiyle (Bubut Derajat) 13.8 dereceye dikleştirirseniz, kayış başlangıçta daha aşağıda kalır. Bu da motorunuza kısa vites (örn. 1. vites) etkisi vererek rampa yukarı iki kişi çıkarken dahi motora muazzam bir tork kazandırır.",
      danger: "Hassas torna yapılmazsa balans bozulur ve krank mili kesilerek motor kullanılmaz hale gelebilir."
    },
    belt: {
      title: "Şanzıman Tahrik Kayışı (CVT Drive Belt)",
      desc: "Motor bloğunun gücünü doğrudan ön kasnaktan arka debriyaja ileten yegane organdır. Kevlar, kauçuk ve yüksek esnekliğe sahip iplik dokusundan imal edilir.",
      olderPersona: "💡 Sade Anlatım: Motorun gücünü tekerleğe götüren köprüdür. Performans varyatörü takıldığında şanzıman daha hızlı vites değiştirdiği için kayışa çok daha fazla yük biner. Bu yüzden 15.000 km'de bir mutlaka orijinal Yamaha (`B74-E7641-00`) veya güçlendirilmiş kevlar kayışlar kullanılmalıdır.",
      danger: "Kalitesiz taklit kayışlar otoyol sürüşünde hararetten dolayı koparak CVT kapağını parçalayabilir."
    },
    clutch: {
      title: "Arka Debriyaj & Kontrast Yay (Clutch System)",
      desc: "Gücün son halkasıdır. Ön varyatör ne kadar mükemmel olursa olsun, arka debriyaj pabuçları çanı tam kavrayamazsa veya kayış arka tarafta kaçırma (slipping) yaparsa güç ısıya dönüşür ve kaybolur.",
      olderPersona: "💡 Sade Anlatım: Debriyaj pabuçları dönme kuvvetiyle dışarı açılıp çana kilitlenir. Ortadaki devasa yay (kontrast yayı) ise kayışın arka kasnakta sıkı durmasını sağlar. Eğer kontrast yayını daha sert bir yayla (örn. Malossi Sarı Yay) değiştirirseniz kayış asla kaçırmaz ve motorunuz anında gaz yer.",
      danger: "Gereksiz aşırı sert kontrast yaylar şanzıman hararetini yükseltir ve son hızı (top speed) baltalar."
    }
  };

  const activeHotspot = hotspotData[selectedHotspot as keyof typeof hotspotData];

  // Setup recipes helper
  const currentSetup = SETUPS.find(s => s.id === activeSetupId) || SETUPS[0];

  return (
    <>
      <article className="container-x py-16 text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb - Highly Visible */}
        <Link
          href="/performans"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-yamaha-200 hover:text-electric-cyan transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Mühendislik Paneli
        </Link>

        {/* Dynamic Spatial Header */}
        <Reveal>
          <header className="mt-8 max-w-4xl border-b border-white/[0.08] pb-8">
            <span className="chip text-xs px-3.5 py-1.5 bg-electric-cyan/15 text-electric-cyan font-mono border border-electric-cyan/35 uppercase tracking-widest rounded-full">
              Sürekli Değişken Şanzıman (CVT) Rehberi
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-white via-carbon-100 to-electric-cyan bg-clip-text text-transparent">
              Varyatör & Şanzıman <span className="text-electric-cyan block sm:inline">Mühendislik Laboratuvarı.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-carbon-200 font-medium">
              XMAX motorunuzda sürüş keyfini, yakıtı ve ömrü belirleyen en kritik yer burasıdır. Bu sayfa kuru bir rapor sayfası değil; bizzat şanzımanınızı interaktif simülatörler ve 3D görsellerle tasarlayabileceğiniz **yaşayan bir modifikasyon merkezidir.**
            </p>
          </header>
        </Reveal>

        {/* SECTION 1: INTERACTIVE 3D EXPLORER SCHEMATIC */}
        <section className="mt-20 space-y-8">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan font-bold">1. Bölüm: İnteraktif Anatomi</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                CVT Şanzıman Nasıl Çalışır?
              </h2>
              <p className="text-base sm:text-lg text-carbon-200 leading-relaxed max-w-3xl">
                Bir 50 yaş XMAX kullanıcısı olarak, şanzımanı değiştirmeden önce parçaları görsel olarak tanıyalım. Aşağıdaki patlatılmış 3D şema görselindeki parçaların butonlarına tıklayarak mekanik görevlerini en sade dille okuyun:
              </p>
            </div>
          </Reveal>

          {/* Diagram Spatial Layout */}
          <Reveal delay={0.05}>
            <div className="grid gap-8 lg:grid-cols-12 mt-6">
              
              {/* Left Side: Massive 3D Image Showcase */}
              <div className="lg:col-span-7 glass border border-white/[0.08] p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-white/[0.02] to-transparent relative overflow-hidden flex flex-col justify-center items-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-electric-cyan/5 via-transparent to-transparent pointer-events-none" />
                
                {/* 3D Visual Frame */}
                <div className="w-full relative aspect-square max-w-[500px] transition-all duration-700 hover:scale-[1.03]">
                  <Image
                    src="/images/performans/xmax_cvt_schematic.png"
                    alt="Yamaha XMAX 3D CVT Schematic Render"
                    fill
                    priority
                    sizes="(max-w-768px) 100vw, 500px"
                    className="object-contain rounded-2xl drop-shadow-[0_0_35px_rgba(0,242,254,0.15)]"
                  />
                </div>
                
                {/* Spatial Overlay UI Buttons representing Hotspots */}
                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                  {[
                    { id: "rollers", label: "⚙️ 1. Bagalar" },
                    { id: "pulleys", label: "📐 2. Kasnaklar" },
                    { id: "belt", label: "🎗️ 3. Kayış" },
                    { id: "clutch", label: "🌀 4. Debriyaj" }
                  ].map((hot) => (
                    <button
                      key={hot.id}
                      onClick={() => setSelectedHotspot(hot.id)}
                      className={cn(
                        "py-3 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all border text-center whitespace-nowrap",
                        selectedHotspot === hot.id
                          ? "bg-electric-cyan text-ink-950 border-electric-cyan font-extrabold shadow-[0_0_20px_rgba(0,242,254,0.3)] scale-[1.05]"
                          : "text-carbon-300 hover:text-white border-white/[0.06] bg-white/[0.015]"
                      )}
                    >
                      {hot.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side: Informative Card Panel */}
              <div className="lg:col-span-5 glass p-6 sm:p-8 rounded-3xl border border-white/[0.08] flex flex-col justify-between relative overflow-hidden bg-gradient-to-r from-white/[0.02] to-transparent shadow-2xl">
                
                <div>
                  <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                    <span className="p-2.5 rounded-xl bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/20">
                      <HelpCircle className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest block font-bold">Seçilen Parçanın Görevi</span>
                      <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{activeHotspot.title}</h3>
                    </div>
                  </div>

                  <p className="mt-6 text-sm sm:text-base leading-relaxed text-carbon-200">
                    {activeHotspot.desc}
                  </p>

                  <div className="mt-6 bg-white/[0.02] border border-white/[0.04] p-5 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                      <Info className="size-16 text-electric-cyan" />
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-white font-medium">
                      {activeHotspot.olderPersona}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-red-500/20 pt-4 bg-red-500/[0.02] p-4 rounded-xl border border-red-500/10">
                  <span className="text-xs font-mono text-red-400 uppercase tracking-widest block font-bold flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 shrink-0" /> Kritik Aşınma & Hata Riski:
                  </span>
                  <p className="text-xs sm:text-sm text-red-200 mt-1.5 leading-normal">
                    {activeHotspot.danger}
                  </p>
                </div>

              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 2: THE ENHANCED ROLLER WEIGHT SIMULATOR */}
        <section className="mt-32 space-y-8">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan font-bold">2. Bölüm: Baga Gramaj Asistanı</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Baga Ağırlığı & Karakter Simülatörü
              </h2>
              <p className="text-base sm:text-lg text-carbon-200 leading-relaxed max-w-3xl">
                Orijinal varyatörünüze hiç dokunmadan, sadece varyatör bagalarının (ağırlıklarının) gramajını değiştirerek motorunuzun karakterini nasıl değiştirebileceğinizi simüle edin. Aşağıdan motor hacminizi seçin, ardından gramaj ayarlarına dokunarak sonuçları görün:
              </p>
            </div>
          </Reveal>

          {/* Model Selector Tabs */}
          <Reveal delay={0.05}>
            <div className="flex gap-2.5 border-b border-white/[0.08] pb-4 overflow-x-auto">
              {(["300cc", "250cc", "400cc"] as ModelType[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setSelectedModel(m);
                    setSelectedWeightMode("stock");
                  }}
                  className={cn(
                    "px-6 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap border",
                    selectedModel === m
                      ? "bg-electric-cyan/15 text-electric-cyan border-electric-cyan/40 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                      : "text-carbon-300 hover:text-white border-transparent bg-transparent"
                  )}
                >
                  {m === "300cc" ? "XMAX 300 (Euro 4/5/5+)" : m === "250cc" ? "XMAX 250 (Blue Core)" : "XMAX 400 (YP400R)"}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Simulator Panel */}
          <Reveal delay={0.08}>
            <div className="grid gap-8 lg:grid-cols-12 mt-6">
              
              {/* Left Side: Massive options stack */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="text-[10px] font-mono text-carbon-400 uppercase tracking-widest block font-bold">Karakteristik Ağırlık Seçenekleri (Stok: {selectedSimulator.stock})</span>
                {selectedSimulator.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedWeightMode(opt.id)}
                    className={cn(
                      "w-full text-left p-5 rounded-2xl border transition-all flex justify-between items-center group relative overflow-hidden",
                      selectedWeightMode === opt.id
                        ? "border-electric-cyan/45 bg-gradient-to-r from-electric-cyan/10 to-transparent shadow-[0_0_20px_rgba(0,242,254,0.08)] scale-[1.02]"
                        : "border-white/[0.06] bg-white/[0.01] hover:border-white/20"
                    )}
                  >
                    <div>
                      <span className="text-xs font-mono text-electric-cyan font-bold tracking-wider">{opt.weight}</span>
                      <h4 className="text-base sm:text-lg font-black text-white mt-1 group-hover:text-electric-cyan transition-colors">{opt.title}</h4>
                    </div>
                    <span className={cn(
                      "size-6 rounded-full border flex items-center justify-center text-xs font-extrabold transition-all",
                      selectedWeightMode === opt.id
                        ? "border-electric-cyan bg-electric-cyan text-ink-950 scale-110"
                        : "border-carbon-400"
                    )}>
                      {selectedWeightMode === opt.id ? "✓" : ""}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Side: Massive visual statistics dashboard */}
              <div className="lg:col-span-7 glass p-6 sm:p-8 rounded-3xl border border-white/[0.08] flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent shadow-2xl">
                
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Gauge className="size-48 text-electric-cyan" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest block font-bold">Seçilen Karakter</span>
                      <h3 className="text-xl sm:text-2xl font-black text-white mt-1">{activeOption.title}</h3>
                    </div>
                    <span className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 font-mono text-xs sm:text-sm text-electric-cyan font-bold">
                      Öneri: {activeOption.weight}
                    </span>
                  </div>

                  <p className="mt-6 text-sm sm:text-base leading-relaxed text-carbon-200">
                    {activeOption.description}
                  </p>

                  {/* Visual Stats Bars - Massive sized for 50+ age persona */}
                  <div className="mt-8 space-y-5">
                    <div>
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-carbon-200 mb-2">
                        <span>🚀 Kalkış & Rampada Çekiş Gücü</span>
                        <span className="text-white font-extrabold">{activeOption.stats.launch}%</span>
                      </div>
                      <div className="h-3 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-all duration-700"
                          style={{ width: `${activeOption.stats.launch}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-carbon-200 mb-2">
                        <span>⛽ Yakıt Tasarrufu (Ekonomi)</span>
                        <span className="text-white font-extrabold">{activeOption.stats.economy}%</span>
                      </div>
                      <div className="h-3 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-all duration-700"
                          style={{ width: `${activeOption.stats.economy}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-carbon-200 mb-2">
                        <span>🏁 Son Hıza (Top Speed) Ulaşma Limiti</span>
                        <span className="text-white font-extrabold">{activeOption.stats.topSpeed}%</span>
                      </div>
                      <div className="h-3 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-all duration-700"
                          style={{ width: `${activeOption.stats.topSpeed}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-carbon-200 mb-2">
                        <span>🤫 Sessizlik ve Uzun Yol Seyir Konforu</span>
                        <span className="text-white font-extrabold">{activeOption.stats.comfort}%</span>
                      </div>
                      <div className="h-3 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-all duration-700"
                          style={{ width: `${activeOption.stats.comfort}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 pt-4 border-t border-white/[0.06]">
                  <div className="bg-emerald-500/[0.02] border border-emerald-500/10 p-4 rounded-xl">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">✓ Net Mekanik Artısı</span>
                    <p className="text-xs sm:text-sm text-carbon-100 mt-1 leading-normal font-medium">{activeOption.pros}</p>
                  </div>
                  <div className="bg-red-500/[0.02] border border-red-500/10 p-4 rounded-xl">
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block font-bold">✗ Dikkat Edilecek Dezavantaj</span>
                    <p className="text-xs sm:text-sm text-carbon-100 mt-1 leading-normal font-medium">{activeOption.cons}</p>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 3: 3D PERSPECTIVE BRAND EXPLORER */}
        <section className="mt-32 space-y-8">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan font-bold">3. Bölüm: Marka Performans Devleri</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Performans Varyatör Markaları & Yanak Geometrileri
              </h2>
              <p className="text-base sm:text-lg text-carbon-200 leading-relaxed max-w-3xl">
                Orijinal varyatörün rampaları ve yanak açıları sınırlıdır. Dünya çapındaki performans devleri kendi şanzıman teorilerini sunarlar. Aşağıdan marka seçerek premium 3D görsellerini ve çalışma felsefelerini inceleyin:
              </p>
            </div>
          </Reveal>

          {/* Brand Buttons */}
          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-white/[0.08] pb-6">
              {[
                { id: "malossi", name: "Malossi Multivar (8 Baga)" },
                { id: "polini", name: "Polini Hi-Speed (12 Baga)" },
                { id: "jcosta", name: "J.Costa Transverse (Axial)" },
                { id: "tdr", name: "TDR Pulley (Teflon Gold)" }
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBrand(b.id)}
                  className={cn(
                    "px-4 py-4 text-xs sm:text-sm font-extrabold rounded-2xl transition-all border text-center",
                    activeBrand === b.id
                      ? "bg-electric-cyan/15 text-electric-cyan border-electric-cyan/45 shadow-[0_0_20px_rgba(0,242,254,0.15)] scale-[1.03]"
                      : "text-carbon-300 hover:text-white border-white/[0.06] bg-white/[0.015]"
                  )}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Brand Presentation with 3D Card Hover */}
          <Reveal delay={0.08}>
            <div className="glass border border-white/[0.08] p-6 sm:p-8 rounded-3xl mt-6 bg-gradient-to-r from-white/[0.02] to-transparent shadow-2xl">
              
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                
                {/* Brand Image Render - Interactive Perspective Tilt */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="w-full relative aspect-square max-w-[360px] rounded-2xl bg-gradient-to-tr from-white/[0.01] to-white/[0.05] border border-white/[0.08] p-4 flex justify-center items-center shadow-inner group transition-all duration-700 hover:scale-105 hover:rotate-1 hover:shadow-cyan-500/10">
                    <div className="absolute inset-0 bg-radial-gradient from-electric-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <Image
                      src={currentBrand.image}
                      alt={`${currentBrand.title} Performance Render`}
                      width={320}
                      height={320}
                      className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.06)]"
                    />
                  </div>
                </div>

                {/* Brand Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                    <div>
                      <span className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-xs uppercase tracking-wider text-electric-cyan font-bold">
                        Menşei: {currentBrand.origin}
                      </span>
                      <h3 className="mt-3 text-2xl sm:text-3xl font-black text-white">{currentBrand.title}</h3>
                    </div>
                    <div className="text-right text-sm font-mono text-carbon-300">
                      <span className="text-electric-cyan font-bold">Karakter:</span> {currentBrand.characteristic}
                    </div>
                  </div>

                  {/* Rampa & Material Grid */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-electric-cyan flex items-center gap-2 font-bold">
                        <Cog className="h-4 w-4 shrink-0 text-electric-cyan animate-spin-slow" /> Tasarım Felsefesi & Rampa Yapısı
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-carbon-200 font-medium">
                        {currentBrand.philosophy}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-electric-cyan flex items-center gap-2 font-bold">
                        <Wrench className="h-4 w-4 shrink-0 text-electric-cyan" /> Burç & Malzeme Alaşımı
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-carbon-200 font-medium">
                        {currentBrand.hubDetails}
                      </p>
                    </div>
                  </div>

                  {/* Pros & Cons list */}
                  <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-white/[0.06]">
                    <div className="bg-emerald-500/[0.02] border border-emerald-500/10 p-5 rounded-2xl">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">Mekanik Artıları (Pros)</h4>
                      <ul className="mt-3 space-y-2">
                        {currentBrand.pros.map((p, idx) => (
                          <li key={idx} className="flex gap-2.5 text-sm text-carbon-100 font-medium leading-normal">
                            <span className="text-emerald-400 shrink-0 font-extrabold">✓</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-500/[0.02] border border-red-500/10 p-5 rounded-2xl">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold">Göz Önünde Bulundurulacaklar (Cons)</h4>
                      <ul className="mt-3 space-y-2">
                        {currentBrand.cons.map((c, idx) => (
                          <li key={idx} className="flex gap-2.5 text-sm text-carbon-100 font-medium leading-normal">
                            <span className="text-red-400 shrink-0 font-extrabold">✗</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Featured Component Card */}
                  <div className="bg-electric-cyan/5 border border-electric-cyan/20 p-5 rounded-2xl flex gap-4">
                    <Info className="h-6 w-6 text-electric-cyan shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono text-electric-cyan uppercase tracking-widest font-extrabold block">Öne Çıkan Parça & İpuçları</span>
                      <p className="mt-2 text-sm text-carbon-200 leading-relaxed font-medium">{currentBrand.featured}</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </Reveal>
        </section>

        {/* SECTION 4: REÇETELER VE DEBRİYAJ SİSTELERİ */}
        <section className="mt-32 space-y-8">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan font-bold">4. Bölüm: Arka Debriyaj & Aktarım Gücü</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Kayıpsız Güç Aktarımı: Balatalar, Çanlar ve Yaylar
              </h2>
              <p className="text-base sm:text-lg text-carbon-200 leading-relaxed max-w-3xl">
                Ön varyatör ne kadar devirli çalışırsa çalışsın, arka debriyaj sistemi kayışı tam sıkıştıramaz ve kaçırırsa performansınız tamamen ısıya dönüşüp heba olur:
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            {CLUTCHES.map((c, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="glass p-6 sm:p-8 flex flex-col justify-between h-full border border-white/[0.06] hover:border-white/20 transition-all rounded-3xl bg-gradient-to-b from-white/[0.015] to-transparent shadow-xl">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-carbon-300 font-bold">
                        {c.type}
                      </span>
                      <span className="text-xs font-mono text-carbon-400">{c.compatibility}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-black text-white">{c.brand}</h3>
                    <p className="mt-1 text-[11px] text-electric-cyan font-mono">{c.code}</p>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-carbon-200 font-medium">{c.details}</p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.06] pt-4">
                    <span className="text-xs font-mono text-electric-cyan block uppercase tracking-widest font-extrabold">Mekanik Avantajı:</span>
                    <p className="mt-2 text-sm sm:text-base text-white font-semibold leading-relaxed">{c.benefit}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECTION 5: INTERACTIVE RECIPE CONFIGURATOR (REÇETE SİHİRBAZI) */}
        <section className="mt-32 space-y-8">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan font-bold">5. Bölüm: Kolay Kurulum Sihirbazı</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                XMAX Hazır Şanzıman Reçeteleri
              </h2>
              <p className="text-base sm:text-lg text-carbon-200 leading-relaxed max-w-3xl">
                Olayı basitleştirdik! Farklı modeller ve amaçlar için yıllardır test edilmiş rüştünü ispatlamış 7 özel hazır şanzıman reçetesi. Amacınıza uygun olanı seçerek adım adım gereken tüm mekanik işlemleri görün:
              </p>
            </div>
          </Reveal>

          {/* Setup Selector Grid */}
          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 border-b border-white/[0.08] pb-6 overflow-x-auto">
              {SETUPS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSetupId(s.id)}
                  className={cn(
                    "px-4 py-4 text-xs font-extrabold rounded-2xl transition-all border text-center whitespace-nowrap shrink-0",
                    activeSetupId === s.id
                      ? "bg-electric-cyan text-ink-950 border-electric-cyan shadow-[0_0_15px_rgba(0,242,254,0.25)] font-black scale-105"
                      : "text-carbon-300 hover:text-white border-white/[0.06] bg-white/[0.015]"
                  )}
                >
                  Kurulum #{s.id}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Configurator Recipe Card */}
          <Reveal delay={0.08}>
            <div className="glass border border-white/[0.08] p-6 sm:p-8 rounded-3xl mt-4 bg-gradient-to-b from-white/[0.02] to-transparent shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sparkles className="size-48 text-electric-cyan" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                <div>
                  <span className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest block font-bold">Uyumlu Olduğu Model</span>
                  <span className="text-base sm:text-lg text-white font-extrabold">{currentSetup.model}</span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-mono text-carbon-400 uppercase tracking-widest block font-bold">Reçete Amacı</span>
                  <span className="text-lg sm:text-xl text-white font-black">{currentSetup.name}</span>
                </div>
              </div>

              {/* Recipe Steps Breakdown */}
              <div className="grid gap-6 md:grid-cols-3 mt-8">
                
                <div className="bg-white/[0.015] border border-white/[0.04] p-5 rounded-2xl hover:border-white/10 transition-colors flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-electric-cyan font-bold block tracking-wider">🛠️ 1. ADIM: ÖN VARYATÖR & DIŞ KASNAK</span>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-carbon-100 font-medium">{currentSetup.front}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] font-mono text-carbon-400">
                    Kasnak Derecesi Ayarı
                  </div>
                </div>

                <div className="bg-white/[0.015] border border-white/[0.04] p-5 rounded-2xl hover:border-white/10 transition-colors flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-electric-cyan font-bold block tracking-wider">⚖️ 2. ADIM: BAGA VE ŞİM KURULUMU</span>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-carbon-100 font-medium">{currentSetup.roller}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] font-mono text-carbon-300 font-bold">
                    <span className="text-carbon-400 font-normal">Pul/Şim:</span> {currentSetup.shim}
                  </div>
                </div>

                <div className="bg-white/[0.015] border border-white/[0.04] p-5 rounded-2xl hover:border-white/10 transition-colors flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-electric-cyan font-bold block tracking-wider">🌀 3. ADIM: ARKA YAYLAR & DEBRİYAJ</span>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-carbon-100 font-medium">{currentSetup.rear}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] font-mono text-carbon-300 font-bold">
                    <span className="text-carbon-400 font-normal">Yay:</span> {currentSetup.springs}
                  </div>
                </div>

              </div>

              {/* Behavior & Advisory Details */}
              <div className="mt-8 grid gap-4 lg:grid-cols-12 pt-6 border-t border-white/[0.06]">
                <div className="lg:col-span-8 bg-electric-cyan/5 border border-electric-cyan/20 p-5 rounded-2xl flex gap-4">
                  <Zap className="h-6 w-6 text-electric-cyan shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="text-xs font-mono text-electric-cyan uppercase tracking-widest font-extrabold block">Kurulum Yapıldıktan Sonra Sürüş Karakteri Nasıl Olur?</span>
                    <p className="mt-2 text-sm sm:text-base text-white font-semibold leading-relaxed">{currentSetup.behavior}</p>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white/[0.02] border border-white/[0.08] p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-carbon-400 uppercase tracking-widest block font-bold">Montaj Zorluğu</span>
                    <span className="text-base sm:text-lg text-yellow-400 font-extrabold mt-1 block">{currentSetup.difficulty}</span>
                  </div>
                  <div className="mt-3 text-xs font-mono text-carbon-300">
                    <span className="text-carbon-400 font-normal">Gereklilik:</span> {currentSetup.mechanicMust}
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </section>

        {/* SECTION 6: COMPARATIVE TABLE OVERHAUL (Ages 50+ legibility) */}
        <section className="mt-32 space-y-8">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan font-bold">6. Bölüm: Hızlı Karşılaştırma Matrisi</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Reçetelerin Yan Yana Mukayesesi
              </h2>
              <p className="text-base sm:text-lg text-carbon-200 leading-relaxed max-w-3xl">
                Hangi kuruluma gideceğinizden emin değil misiniz? Tüm reçetelerin sürüş devirlerini, gaz reaksiyonlarını, tahmini son hız değişimlerini ve bakım sürelerini tek bir büyük matristen mukayese edin:
              </p>
            </div>
          </Reveal>

          {/* Desktop Table View */}
          <Reveal delay={0.05}>
            <div className="hidden lg:block overflow-x-auto rounded-3xl border border-white/[0.08] bg-ink-950/40 backdrop-blur-md">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.03] text-xs sm:text-sm font-mono uppercase tracking-widest text-electric-cyan">
                    <th className="px-6 py-5 font-bold">Reçete No</th>
                    <th className="px-6 py-5 font-bold">Hedeflenen Kullanım</th>
                    <th className="px-6 py-5 font-bold">Gaz Tepkisi</th>
                    <th className="px-6 py-5 font-bold">Kavrama Devri</th>
                    <th className="px-6 py-5 font-bold">Ortalama Seyir Devri</th>
                    <th className="px-6 py-5 font-bold">Son Hız Değişimi</th>
                    <th className="px-6 py-5 font-bold">Önerilen Kayış</th>
                    <th className="px-6 py-5 font-bold">Bakım Periyodu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-sm text-carbon-200 font-medium">
                  {COMPARISON_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-5 font-black text-white">{row.no}</td>
                      <td className="px-6 py-5 text-white">{row.target}</td>
                      <td className="px-6 py-5 font-extrabold text-electric-cyan">{row.throttle}</td>
                      <td className="px-6 py-5 font-mono text-white">{row.launch}</td>
                      <td className="px-6 py-5 font-mono">{row.cruise}</td>
                      <td className="px-6 py-5 font-bold text-white bg-white/[0.01]">{row.topSpeed}</td>
                      <td className="px-6 py-5">{row.belt}</td>
                      <td className="px-6 py-5 font-mono text-yellow-400 font-bold">{row.maintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Card Stack View (High Legibility, no side scrolls) */}
            <div className="lg:hidden space-y-4">
              {COMPARISON_MATRIX.map((row, idx) => (
                <div key={idx} className="glass p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-white/[0.015] to-transparent">
                  <div className="flex justify-between items-center border-b border-white/[0.06] pb-3 mb-3">
                    <span className="text-sm font-black text-white bg-electric-cyan/20 text-electric-cyan px-2.5 py-1 rounded-lg">{row.no}</span>
                    <span className="text-xs font-mono text-yellow-400 font-bold">Bakım: {row.maintenance}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                    <div>
                      <span className="text-[10px] font-mono text-carbon-400 block uppercase">Hedeflenen Kullanım:</span>
                      <span className="text-white font-bold block mt-0.5">{row.target}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-carbon-400 block uppercase">Gaz Tepkisi:</span>
                      <span className="text-electric-cyan font-black block mt-0.5">{row.throttle}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-carbon-400 block uppercase">Kavrama Devri:</span>
                      <span className="text-white font-mono block mt-0.5">{row.launch}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-carbon-400 block uppercase">Seyir Devri:</span>
                      <span className="text-white font-mono block mt-0.5">{row.cruise}</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-white/[0.04] flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-carbon-400 block uppercase">Son Hız Değişimi:</span>
                        <span className="text-white font-bold block mt-0.5">{row.topSpeed}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-carbon-400 block uppercase">Önerilen Kayış:</span>
                        <span className="text-white font-bold block mt-0.5">{row.belt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* SECTION 7: ATÖLYE SIRLARI & KRONİK HATA UYARISI */}
        <section className="mt-32 space-y-8">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan font-bold">7. Bölüm: İnce CVT Ayarları</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                İleri Düzey Atölye Sırları
              </h2>
              <p className="text-base sm:text-lg text-carbon-200 leading-relaxed max-w-3xl">
                Şanzımana hazır kit takıp geçmek yetmez! Asya (Tayland ve Endonezya) atölyelerinin XMAX CVT ömrünü ve kalkış performansını milimetrik düzeyde artıran gizli protokolleri:
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <Reveal delay={0.05}>
              <div className="glass p-6 sm:p-8 border border-white/[0.06] rounded-3xl bg-gradient-to-b from-white/[0.01] to-transparent shadow-lg">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono font-black">01.</span>
                  Bubut Derajat (Kasnak Derecesi Değiştirme)
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-carbon-200 font-medium">
                  Ön varyatör yanak açısı fabrikasyon olarak 14.0 derecedir. Torna tezgahında yanak açısı dikleştirilerek **13.8°** (özellikle şehir içi stop-and-go ve rampa torkunu canlandırmak için) veya **13.5°** (yarış tipi, kasnağın kayışı son limitine kadar sıkıştırması için) seviyelerine çekilir.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass p-6 sm:p-8 border border-white/[0.06] rounded-3xl bg-gradient-to-b from-white/[0.01] to-transparent shadow-lg">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono font-black">02.</span>
                  Kerok Jalur (Rampa Yollarını Frezeleme)
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-carbon-200 font-medium">
                  Stok varyatörlerde bagaların kaydığı kanalların (rampaların) bittiği yerde güvenlik sınır stoper duvarları bulunur. Bu stoperler baganın daha yukarı tırmanıp kayışı en dış çepere sıkıştırmasını engeller. Kanalların CNC frezeyle 1.5 - 2.0 mm geriye kazınması motora dokunmadan **+10 km/h ila +15 km/h** temiz son hız kazandırır.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass p-6 sm:p-8 border border-white/[0.06] rounded-3xl bg-gradient-to-b from-white/[0.01] to-transparent shadow-lg">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono font-black">03.</span>
                  Kasnak Şimi (Shim Washer) İnce Ayarı
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-carbon-200 font-medium">
                  Hareketli varyatör burcu ile sabit yanak arasına **0.5 mm ila 0.8 mm** kalınlığında çelik pul (şim) konur. Bu durum yanakları birbirinden uzaklaştırarak kayışın en dip noktaya (en küçük ön vitese) inmesini sağlar. Kalkış torkunuzu muazzam canlandırır.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass p-6 sm:p-8 border border-white/[0.06] rounded-3xl bg-gradient-to-b from-white/[0.01] to-transparent shadow-lg">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <span className="text-electric-cyan font-mono font-black">04.</span>
                  CVT Hararet, Hava Süngeri & Gres Yönetimi
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-carbon-200 font-medium">
                  Aşırı ısı kayışın gevşemesine, debriyajın kaçırmasına sebep olur. Atölyelerde şanzıman hava kapağındaki sünger sökülerek paslanmaz tel süzgeç takılır (hava akışı %40 artar). Gres olarak sadece burç yatağına **0.5 gram** yüksek ısıya dayanıklı polyurea gres (`Malossi MHR Grease - 7615375b`) sürülür, bagalar tamamen kuru bırakılır.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 flex gap-4 mt-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <AlertTriangle className="size-24 text-red-500" />
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-lg font-black text-red-200">⚠️ En Sık Yapılan Hayati Atölye Hatası!</h4>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-red-100 font-medium">
                  Bazı acemi modifiyeciler kasnak şimi (pul) ararken parça kataloğunda &ldquo;Şim&rdquo; olarak geçen **B74-12168-R0** parça kodlu ürünü almaktadır. Ancak bu parça CVT şimi değil, motorun silindir kapağında yer alan **2.0 mm kalınlığındaki subap ayar şimidir (valve tappet shim).** Bu aşırı kalın şimi varyatör miline takarsanız, krank somununun diş kapma payı kalmaz ve otoyolda giderken somun fırlayarak motor bloğunda binlerce liralık yıkıcı hasar açar!
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 8: MÜHENDİSLİK ADVISORIES (SONUÇLAR) */}
        <section className="mt-32 space-y-8">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan font-bold">8. Bölüm: Mühendislik Tavsiyeleri</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Mühendislik İlkeleri ve Altın Kurallar
              </h2>
              <p className="text-base sm:text-lg text-carbon-200 leading-relaxed max-w-3xl">
                Yamaha XMAX şanzıman modifikasyonlarında uzun ömürlü ve sağlıklı güç aktarımı elde etmek için mutlaka uyulması gereken mühendislik ilkeleri:
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <Reveal delay={0.05}>
              <div className="glass p-6 sm:p-8 h-full flex flex-col justify-between rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.01] to-transparent">
                <div>
                  <span className="grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-electric-cyan shadow-lg">
                    <Layers className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-white">
                    Şanzıman Dengesi Şarttır
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-carbon-200 font-medium">
                    Sadece ön varyatör bagalarını hafifletmek tek başına çözüm değildir. Ön varyatördeki hafifletme işlemi, mutlaka arka gruptaki kontrast yayının sertliği ile dengelenmelidir. Aksi takdirde kayış kaçırma yapar, aşırı yakıt tüketirsiniz ve motor bağırır ama gitmez.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass p-6 sm:p-8 h-full flex flex-col justify-between rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.01] to-transparent">
                <div>
                  <span className="grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-electric-cyan shadow-lg">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-white">
                    Kaliteli Malzeme Tercih Edin
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-carbon-200 font-medium">
                    Şanzıman içi sıcaklıklar otoyol sürüşlerinde ekstrem limitlere ulaşır. Kalitesiz alaşımlı taklit varyatörler veya kalitesiz bagalar aşırı ısıda erir. Bu nedenle, elmas taşlamalı burçlara sahip patentli İtalyan (Malossi, Polini) veya sertifikalı Asya (TDR) parçalarını tercih etmeniz sürüş güvenliği için hayatidir.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass p-6 sm:p-8 h-full flex flex-col justify-between rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.01] to-transparent">
                <div>
                  <span className="grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-electric-cyan shadow-lg">
                    <Wrench className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-white">
                    Hassas İşçilik ve Temizlik
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-carbon-200 font-medium">
                    Kanal kazıma (kerok) gibi torna işlemlerinin yalnızca CNC teknolojisi kullanılarak hassas biçimde yapılması gerekir. Manuel hatalı yapılan işlemler varyatörün balansını bozarak krank milinin kırılmasına yol açabilecek ağır motor hasarlarına zemin hazırlar. Kurulum yaparken temizlik ve mikron ayarları şanzıman ömrünü doğrudan belirler.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 9: KRİTİK MONTAJ NOTU (Tork anahtarı) */}
        <section className="mt-20">
          <Reveal>
            <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6 flex gap-4">
              <ShieldAlert className="h-8 w-8 text-yellow-500 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <h4 className="text-lg font-black text-yellow-200">🛑 Kritik Torklama ve Montaj Uyarısı!</h4>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-carbon-200 font-medium">
                  Varyatör somunları sıkılırken **kesinlikle havalı tabanca (darbeli tabanca) kullanılmamalıdır**. Havalı darbeli tabanca krank milinin yatak dişlerini geri dönüşü olmayan şekilde sıyırıp bozar. Birincil ön varyatör somunu mutlaka tork anahtarı (torque wrench) kullanılarak fabrika standardı olan **95 Nm** değerinde hassasça sıkılmalıdır.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

      </article>
    </>
  );
}
