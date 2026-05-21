"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Settings,
  ShieldCheck,
  Layers,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Gauge,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/cn";

// Types
type ModelType = "300cc" | "250cc" | "400cc";

// Constants & Data Sets
const SETUPS = [
  {
    id: 1,
    name: "Şehir İçi Canlılık",
    model: "XMAX 250 Blue Core",
    difficulty: "Orta",
    mechanicMust: "Torna ve Şim Ayarı",
    front: "Orijinal yanaklar torna ile 13.8° açısına çekilir, baga kanalları pürüzsüzleştirilir.",
    roller: "6 adet 13 gram yuvarlak NCY veya Dr. Pulley 13 gram sliding baga.",
    shim: "Sürücü burcu arkasına 0.5 mm çelik kasnak şimi eklenir.",
    rear: "Malossi Maxi Fly Clutch debriyaj veya orijinal balatalara karbon-kevlar çakılması. Soğutma kanallı orijinal çan.",
    springs: "Orijinal kontrast yayı, debriyaj küçük yayları Malossi Beyaz yay setiyle değiştirilir.",
    behavior: "Yoğun şehir trafiğinde kalkıştaki titremeyi keser. 50 yaş üstü sürücüler için en konforlu moddur."
  },
  {
    id: 2,
    name: "Uzun Yol Hız Kurulumu",
    model: "XMAX 250 Blue Core",
    difficulty: "Orta",
    mechanicMust: "Tork Anahtarı",
    front: "TDR Performance Pulley V.23 ön varyatör kiti.",
    roller: "Dr. Pulley 15 gram Sliding baga.",
    shim: "Uygulanmaz.",
    rear: "Malossi Maxi Fly System debriyaj ve çan seti.",
    springs: "Faito R90 veya TDR %10 sert tork yayı (Kontrast yayı).",
    behavior: "Yüksek süratlerde titreşimsiz seyir ve uzun yolda yakıt ekonomisi sunar."
  },
  {
    id: 3,
    name: "Konfor & Touring",
    model: "XMAX 300",
    difficulty: "Kolay",
    mechanicMust: "Kendin Yapabilirsin",
    front: "Orijinal varyatör grubu ve yanak geometrisi muhafaza edilir.",
    roller: "8 adet 17.0 gram Malossi HTRoll (23 x 18 mm) baga.",
    shim: "Uygulanmaz.",
    rear: "Orijinal debriyaj + Malossi Maxi Wing Clutch Bell.",
    springs: "Tamamen orijinal OEM kontrast ve debriyaj yayları.",
    behavior: "Avrupa turları ve uzun mesafeli otoban sürüşlerinde motoru yormayan orijinal sürüş karakterini korur."
  },
  {
    id: 4,
    name: "Agresif Sokak / Spor",
    model: "XMAX 300",
    difficulty: "Orta",
    mechanicMust: "Tork Anahtarı",
    front: "Malossi Multivar 2000 ön varyatör kiti.",
    roller: "8 adet 8.0 gramlık HTRoll bagalar.",
    shim: "Malossi burç arkasına 0.5 mm ön şim.",
    rear: "Malossi Maxi Fly System debriyaj grubu.",
    springs: "Malossi Sarı Kontrast Yayı.",
    behavior: "Şehir içinde agresif ara hızlanmalar ve ani gaz açmalarda mükemmel reaksiyon veren spor kurulum."
  },
  {
    id: 5,
    name: "Pist / Drag Limitleri",
    model: "XMAX 300",
    difficulty: "Zor",
    mechanicMust: "Profesyonel Atölye Şart",
    front: "Polini Hi-Speed 12-Roller varyatör (Kasnak yanakları 13.5°).",
    roller: "12 adet Polini 7.0 gram aramid-nylon baga.",
    shim: "Sürücü burcu arkasına 0.8 mm çelik şim.",
    rear: "Dr. Pulley HiT Kilitli Debriyaj + Malossi Maxi Wing Soğutmalı Çan.",
    springs: "Polini %10 sert kontrast yayı + kırmızı küçük yaylar.",
    behavior: "Sıfırdan kalkışta maksimum ivmelenme sağlayan ekstrem pist kurulumu."
  },
  {
    id: 6,
    name: "Şehir İçi Esneklik",
    model: "XMAX 400",
    difficulty: "Orta",
    mechanicMust: "Temiz İşçilik",
    front: "Orijinal varyatör grubu muhafaza edilir.",
    roller: "Dr. Pulley 15.0 gramlık kızaklı bagalar.",
    shim: "Uygulanmaz.",
    rear: "Malossi Maxi Fly Clutch debriyaj seti.",
    springs: "Orijinal kontrast yayı + Malossi Sarı debriyaj yayları.",
    behavior: "Ağır şasinin alt devirlerdeki sarsıntısını ve kavrama gecikmesini tamamen giderir."
  },
  {
    id: 7,
    name: "Otoban Gücü",
    model: "XMAX 400",
    difficulty: "Zor",
    mechanicMust: "Hassas Montaj",
    front: "Malossi Multivar 2000 ön varyatör kiti.",
    roller: "4 adet 10g ve 4 adet 12g baga (Karışık dizilim).",
    shim: "Kit içeriğindeki 2 adet 0.5 mm şim.",
    rear: "Malossi Maxi Fly System debriyaj ve çan kiti.",
    springs: "Kit içeriğinde yer alan Malossi Beyaz kontrast yayı.",
    behavior: "Otoyol sollamalarında şanzımanın anında vites küçültmesini sağlayarak kesintisiz güç sunar."
  }
];

const COMPARISON_MATRIX = [
  { no: "1", target: "Günlük Trafik", throttle: "Canlı", launch: "~4200 RPM", cruise: "5500 - 6200 RPM", topSpeed: "Değişmez", maintenance: "15.000 km" },
  { no: "2", target: "Akıcı Otoban", throttle: "Doğrusal", launch: "~3500 RPM", cruise: "5000 - 5800 RPM", topSpeed: "+5 km/h", maintenance: "18.000 km" },
  { no: "3", target: "Uzun Yol", throttle: "Yumuşak", launch: "~3200 RPM", cruise: "4800 - 5500 RPM", topSpeed: "Değişmez", maintenance: "20.000 km" },
  { no: "4", target: "Sportif Cadde", throttle: "Çok Hızlı", launch: "~4600 RPM", cruise: "6000 - 6800 RPM", topSpeed: "+8 km/h", maintenance: "10.000 km" },
  { no: "5", target: "Pist", throttle: "Anlık", launch: "~5500 RPM", cruise: "7000 - 8200 RPM", topSpeed: "+15 km/h", maintenance: "3.000 km" },
  { no: "6", target: "X400 Şehir İçi", throttle: "Doğrusal", launch: "~3800 RPM", cruise: "5200 - 6000 RPM", topSpeed: "Değişmez", maintenance: "15.000 km" },
  { no: "7", target: "X400 Otoban", throttle: "Hızlı", launch: "~4000 RPM", cruise: "5500 - 6500 RPM", topSpeed: "+10 km/h", maintenance: "12.000 km" }
];

export default function VariatorPerformancePage() {
  const [selectedModel, setSelectedModel] = useState<ModelType>("300cc");
  const [selectedWeightMode, setSelectedWeightMode] = useState<string>("fp");
  const [activeBrand, setActiveBrand] = useState<string>("malossi");
  const [activeSetupId, setActiveSetupId] = useState<number>(1);

  // Model-specific weight options for Simulator
  const simulatorData = {
    "300cc": {
      name: "XMAX 300",
      stock: "17.5 Gram (Stok)",
      options: [
        {
          id: "stock",
          weight: "17.5g",
          title: "Standart Konfor",
          description: "Çevre emisyonu ve maksimum ekonomi odaklı. Şehir içi dur-kalk trafiğinde ve ani sollamalarda kalkış hantallığı ve debriyaj titremesi hissettirebilir.",
          traits: {
            launch: "Sakin ve biraz hantal",
            economy: "Maksimum tasarruf",
            highway: "Düşük devir, çok sessiz"
          },
          pros: ["Optimum yakıt tüketimi", "Düşük seyir devri ve titreşimsizlik"],
          cons: ["Kalkışta yığılma hissi", "Kavrama titremesi (silkeleme) potansiyeli"]
        },
        {
          id: "fp",
          weight: "16.0g",
          title: "En İdeal F/P Sokak Modu",
          description: "Stok varyatörünüzü değiştirmeden yapabileceğiniz en mantıklı yükseltmedir. Titreme kaybolur, motor devirlenmesi tork bandına hızlı tırmanır.",
          traits: {
            launch: "Canlı ve pürüzsüz",
            economy: "İhmal edilebilir artış (~%2)",
            highway: "Biraz daha devirli ama stabil"
          },
          pros: ["Debriyaj silkelemesini tamamen keser", "Ara hızlanmaları hissedilir ölçüde canlandırır"],
          cons: ["Seyir devri yaklaşık 300 RPM artar"]
        },
        {
          id: "dynamic",
          weight: "15.0g",
          title: "Atik Şehir İçi",
          description: "Özellikle sıkışık trafikte, rampalarda ve artçılı sürüşlerde olağanüstü gaz tepkisi sunar. Şanzıman sürekli tetikte bekler.",
          traits: {
            launch: "Çok hızlı (Agresif)",
            economy: "Fark edilir artış (~%5)",
            highway: "Yüksek devir, daha gürültülü"
          },
          pros: ["Rampalarda asla bayılmama", "Sıfırdan çok kuvvetli kalkış"],
          cons: ["Uzun yolda yüksek motor sesi", "Yakıt tüketiminde net artış"]
        }
      ]
    },
    "250cc": {
      name: "XMAX 250",
      stock: "15.0g / 17.0g",
      options: [
        {
          id: "stock",
          weight: "15.0g / 17.0g",
          title: "Dengeli Şehir İçi",
          description: "Sakin sürüşler için kalibre edilmiştir. Düşük motor hacmi sebebiyle kalkışta debriyaj tasında silkeleme yapmaya meyillidir.",
          traits: {
            launch: "Yavaş ve titremeli",
            economy: "Mükemmel",
            highway: "Sakin"
          },
          pros: ["Uzun kayış ömrü", "Düşük yakıt tüketimi"],
          cons: ["Trafikte kronik debriyaj titremesi"]
        },
        {
          id: "fp",
          weight: "13.0g / 14.0g",
          title: "Canlı & Rampacı",
          description: "Kalkış devrini torkun başladığı seviyeye taşıyarak kavramayı pürüzsüzleştirir. Şehir içi için çok popülerdir.",
          traits: {
            launch: "Güçlü ve seri",
            economy: "Hafif artış",
            highway: "Kabul edilebilir devir"
          },
          pros: ["Kalkıştaki titremeyi keser", "Artçılı rampa çekişini güçlendirir"],
          cons: ["Son hızda ufak limit kayıpları olabilir"]
        }
      ]
    },
    "400cc": {
      name: "XMAX 400",
      stock: "17.0 Gram",
      options: [
        {
          id: "stock",
          weight: "17.0g",
          title: "Otoyol Karakteri",
          description: "Yüksek torku koruyarak otoyolda çok düşük devirle yüksek hızlarda gitmesini sağlar. Şehir içinde ağır şasiyi hareket ettirmek zorlaşır.",
          traits: {
            launch: "Hantal",
            economy: "Otoyolda mükemmel",
            highway: "Düşük titreşim, yüksek konfor"
          },
          pros: ["Otoyol stabilitesi", "Uzun yolda yüksek konfor"],
          cons: ["Dur-kalk trafiğinde hararet", "Kalkış hantallığı"]
        },
        {
          id: "fp",
          weight: "15.0g",
          title: "Şehir İçi Esneklik",
          description: "Ağır kasnak yapısına sahip XMAX 400'ü hantallıktan kurtarır. Kalkış devrini yukarı taşıyarak ara hızlanmaları keskinleştirir.",
          traits: {
            launch: "Seri ve canlı",
            economy: "Hafif artış",
            highway: "Bir tık devirli"
          },
          pros: ["Ara hızlanmaları belirgin şekilde serileştirir", "Ağır şasi dezavantajını gizler"],
          cons: ["CVT içi ısıyı artırabilir (Soğutmalı çan önerilir)"]
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
      characteristic: "8 Bagalı Devrim ve Maksimum Ara Hızlanma",
      philosophy: "Orijinal 6 bagalı yapıyı radikal bir kararla 8 bagalı sisteme dönüştürür. Amaç, merkezkaç kuvvetinin rampa yüzeylerine homojen yayılmasını sağlamak ve kayış üzerindeki titreşimleri tamamen sönümlemektir.",
      hubDetails: "Sürücü burcu (hub) alaşımlı çelikten imal edilmiş olup, elmas uçla taşlanmış yüzeye sahiptir. Sürtünme minimuma indirilir.",
      pros: ["8 baga ile mükemmel balans", "Türkiye'de çok yaygın yedek parça"],
      cons: ["Yakıt tüketimi diğer markalara göre biraz daha fazla artabilir"]
    },
    polini: {
      title: "Polini Hi-Speed",
      origin: "İtalya (ITA)",
      characteristic: "12 Bagalı Kusursuz Titreşimsizlik",
      philosophy: "Ağırlık dağılımını kusursuzlaştırmak için 12 adet ufak (7g) aramid baga kullanır. Dönüş esnasındaki dairesel sapmayı sıfıra indirir.",
      hubDetails: "Patentli DLC (Diamond Like Carbon) kaplamalı çelik burç ve içi gres hazneli yaylı sistem barındırır. Aşınmayı inanılmaz seviyede geciktirir.",
      pros: ["DLC kaplama sayesinde milisaniyelik gaz tepkisi", "12 baga ile sıfır kaçıklık"],
      cons: ["Yedek parçası (12'li baga takımı) pahalı ve temini zor olabilir"]
    },
    jcosta: {
      title: "J.Costa Transverse",
      origin: "İspanya (ESP)",
      characteristic: "Eksenel (Axial) İtme Sistemi",
      philosophy: "Geleneksel yuvarlanan baga hareketini reddeder. Mermi şeklindeki plastik ağırlıklar dikey eksende dışa doğru kayarak kasnağı doğrudan iter. Rampa sürtünmesi sıfırdır.",
      hubDetails: "Tamamen kuru çalışır. Klasik rampa plakası bulunmadığından şanzımandaki mekanik gürültü azalır.",
      pros: ["Rakipsiz, anlık gaz tepkisi (Instant jump)", "Doğrudan itme gücüyle yüksek son hız artışı"],
      cons: ["Kayış ömrünü kısaltabilir", "Mermi ağırlıkların değişimi sık yapılmalıdır"]
    },
    tdr: {
      title: "TDR Performance V.23",
      origin: "Endonezya (SEA)",
      characteristic: "Dik Açılı (13.8°) Agresif Kalkış",
      philosophy: "Asya'nın sıcak iklimine uygun, ağır trafiği yarmak için tasarlanmıştır. Ön varyatör yanak açısı orijinal 14.0 dereceden dikleştirilerek 13.8 dereceye çekilmiştir (kısa vites etkisi).",
      hubDetails: "Altın sarısı teflon kaplama, rampa yataklarında bagaların aşırı ısınmasını engeller.",
      pros: ["Dikleştirilmiş yanak açısı ile muazzam rampacı", "Maliyet/Performans oranında çok başarılı"],
      cons: ["Son hız limitlerinde (top speed) stabilite Avrupalı rakiplere göre düşüktür"]
    }
  };

  const currentBrand = brandData[activeBrand as keyof typeof brandData];
  const currentSetup = SETUPS.find(s => s.id === activeSetupId) || SETUPS[0];

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans selection:bg-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        <Link
          href="/performans"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Performans Ana Menü
        </Link>

        {/* Clean Text-focused Header */}
        <header className="mt-12 max-w-4xl border-b border-slate-200 pb-12">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-800 mb-6">
            Mühendislik Kılavuzu
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Varyatör ve Şanzıman Laboratuvarı.
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 font-medium">
            Motorunuzun yola aktardığı gücü, ivmelenme hissiyatını ve yakıt karakterini tamamen değiştirecek, sadece profesyonel ustalardan ve bölgesel Asya/Avrupa ekollerinden derlenmiş saf mekanik bilgiler.
          </p>
        </header>

        {/* SECTION 1: ANATOMY (4 Cards Grid) */}
        <section className="mt-20">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">1. Temel Parçalar ve Görevleri</h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">CVT sisteminde hiçbir parçayı tek başına düşünmemelisiniz. Her biri birbiriyle uyumlu çalışmak zorundadır.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { 
                icon: <Settings className="h-6 w-6 text-blue-600" />, 
                title: "Ön Bagalar (Roller Weights)", 
                desc: "Merkezkaç kuvvetiyle dışa fırlayıp kasnağı iten ağırlıklar.", 
                tip: "Bagaları hafifletmek motorun daha devirli (agresif) kalkmasını sağlar, ama otoyolda motoru bağırtır." 
              },
              { 
                icon: <Activity className="h-6 w-6 text-emerald-600" />, 
                title: "Ön Kasnak Yanakları", 
                desc: "Kayışın üzerinde tırmandığı konik metal yüzey (Orijinal açı: 14.0°).", 
                tip: "Yanak açısı torna ile 13.8 dereceye dikleştirilirse (Asya stili), motor 'kısa vites' etkisiyle rampaları çok daha güçlü tırmanır." 
              },
              { 
                icon: <Layers className="h-6 w-6 text-purple-600" />, 
                title: "Kevlar Kayış (Drive Belt)", 
                desc: "Motorun ürettiği beygir gücünü doğrudan arka tekere taşıyan köprü.", 
                tip: "Performans varyatörleri şanzımanı daha sert çalıştırdığı için kayışa binen yük artar. Her zaman kaliteli veya OEM kayış kullanın." 
              },
              { 
                icon: <ShieldCheck className="h-6 w-6 text-rose-600" />, 
                title: "Arka Debriyaj & Kontrast Yayı", 
                desc: "Gücün tekerleğe kilitlendiği son nokta ve kayışın sıkılığını belirleyen büyük yay.", 
                tip: "Ön bagaları hafiflettiyseniz, kayışın arka tarafta kaçırmaması için kontrast yayını da orantılı olarak sertleştirmeniz (Örn: Malossi Sarı) şarttır." 
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center border border-slate-100 mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">{item.desc}</p>
                <div className="mt-5 bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Mekanik Sır</span>
                  <p className="text-sm sm:text-base text-slate-700 font-medium">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: BAGA SIMULATOR (Text-Based) */}
        <section className="mt-24">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">2. Baga Gramaj Karakter Simülatörü</h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl">Varyatör kitine para harcamadan önce, sadece baga ağırlıklarıyla oynayarak motor karakterini nasıl değiştirebileceğinizi inceleyin.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50">
              {(["300cc", "250cc", "400cc"] as ModelType[]).map((m) => (
                <button
                  key={m}
                  onClick={() => { setSelectedModel(m); setSelectedWeightMode("stock"); }}
                  className={cn(
                    "px-8 py-5 text-sm sm:text-base font-bold whitespace-nowrap transition-colors border-b-2",
                    selectedModel === m
                      ? "bg-white text-blue-700 border-blue-600"
                      : "text-slate-500 hover:text-slate-700 border-transparent"
                  )}
                >
                  XMAX {m.replace("cc", "")}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 border-r border-slate-200 bg-slate-50/50 p-6 sm:p-8 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">Ağırlık Seçenekleri</span>
                {selectedSimulator.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedWeightMode(opt.id)}
                    className={cn(
                      "w-full text-left p-5 rounded-2xl border transition-all relative",
                      selectedWeightMode === opt.id
                        ? "bg-white border-blue-200 shadow-md shadow-blue-900/5 ring-1 ring-blue-600"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-bold text-blue-600">{opt.weight}</span>
                        <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">{opt.title}</h4>
                      </div>
                      {selectedWeightMode === opt.id && <ChevronRightIcon className="text-blue-600 w-6 h-6" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 bg-white flex flex-col justify-center">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Gauge className="w-8 h-8 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{activeOption.title}</h3>
                    <p className="mt-2 text-base sm:text-lg text-slate-600 leading-relaxed">{activeOption.description}</p>
                  </div>
                </div>

                <div className="mt-10 grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Kalkış Karakteri</span>
                    <span className="text-slate-900 font-bold mt-1 block">{activeOption.traits.launch}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Yakıt Tüketimi</span>
                    <span className="text-slate-900 font-bold mt-1 block">{activeOption.traits.economy}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Otoyol Hissi</span>
                    <span className="text-slate-900 font-bold mt-1 block">{activeOption.traits.highway}</span>
                  </div>
                </div>

                <div className="mt-10 grid sm:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                  <div>
                    <h4 className="text-sm font-bold text-emerald-700 flex items-center gap-2 uppercase tracking-wider mb-3">
                      <CheckCircle2 className="w-5 h-5" /> Mekanik Artılar
                    </h4>
                    <ul className="space-y-2">
                      {activeOption.pros.map((p, i) => (
                        <li key={i} className="text-slate-700 font-medium text-sm sm:text-base flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-rose-700 flex items-center gap-2 uppercase tracking-wider mb-3">
                      <XCircle className="w-5 h-5" /> Uyarılar & Eksiler
                    </h4>
                    <ul className="space-y-2">
                      {activeOption.cons.map((c, i) => (
                        <li key={i} className="text-slate-700 font-medium text-sm sm:text-base flex items-start gap-2">
                          <span className="text-rose-500 mt-1">•</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BRAND EXPLORER (Text Tabs) */}
        <section className="mt-24">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">3. Performans Markalarının Felsefeleri</h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl">Piyasadaki dev markaların her biri farklı bir mühendislik teorisine dayanır. Hangi markanın sizin sürüş tarzınıza hitap ettiğini inceleyin.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 flex flex-col gap-3">
              {[
                { id: "malossi", name: "Malossi Multivar", subtitle: "Tork & Ara Hızlanma" },
                { id: "polini", name: "Polini Hi-Speed", subtitle: "Milisaniyelik Tepki" },
                { id: "jcosta", name: "J.Costa Transverse", subtitle: "Maksimum Eksenel İtme" },
                { id: "tdr", name: "TDR Performance", subtitle: "Agresif Asya Ekolü" }
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBrand(b.id)}
                  className={cn(
                    "text-left p-5 rounded-2xl transition-all border",
                    activeBrand === b.id
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                      : "bg-white border-slate-200 hover:border-slate-400 text-slate-600"
                  )}
                >
                  <span className="block text-lg font-extrabold">{b.name}</span>
                  <span className={cn("block text-sm font-medium mt-1", activeBrand === b.id ? "text-slate-300" : "text-slate-500")}>{b.subtitle}</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <span className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 mb-6">
                Menşei: {currentBrand.origin}
              </span>
              
              <h3 className="text-3xl font-black text-slate-900">{currentBrand.title}</h3>
              <p className="text-lg font-bold text-blue-600 mt-2">{currentBrand.characteristic}</p>

              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Mühendislik Teorisi</h4>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">{currentBrand.philosophy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Burç (Hub) Detayları</h4>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">{currentBrand.hubDetails}</p>
                </div>
              </div>

              <div className="mt-10 grid sm:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                  <span className="text-emerald-800 font-bold block mb-3 uppercase text-xs tracking-wider">Avantajlar</span>
                  <ul className="space-y-2">
                    {currentBrand.pros.map((p, i) => (
                      <li key={i} className="text-emerald-900 font-medium text-sm flex items-start gap-2">
                        <span className="text-emerald-600 mt-0.5">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
                  <span className="text-rose-800 font-bold block mb-3 uppercase text-xs tracking-wider">Dezavantajlar</span>
                  <ul className="space-y-2">
                    {currentBrand.cons.map((c, i) => (
                      <li key={i} className="text-rose-900 font-medium text-sm flex items-start gap-2">
                        <span className="text-rose-500 mt-0.5">✕</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SETUP CONFIGURATOR (Text Based Wizard) */}
        <section className="mt-24">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">4. Hazır Şanzıman Reçeteleri</h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl">Amacınıza en uygun kanıtlanmış reçeteyi seçin ve ustanızdan doğrudan bu işlemleri yapmasını isteyin.</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
            {SETUPS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSetupId(s.id)}
                className={cn(
                  "px-6 py-4 rounded-xl font-bold whitespace-nowrap border transition-all flex-shrink-0",
                  activeSetupId === s.id
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="mt-4 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <div className="flex flex-wrap justify-between items-end gap-6 border-b border-slate-200 pb-6 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Model / Platform</span>
                <span className="text-xl font-extrabold text-slate-900">{currentSetup.model}</span>
              </div>
              <div className="flex gap-4">
                <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">Zorluk</span>
                  <span className="font-bold">{currentSetup.difficulty}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-4 py-2 hidden sm:block">
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">Gereksinim</span>
                  <span className="font-bold">{currentSetup.mechanicMust}</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold mb-4">1</div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Ön Varyatör Modülü</h4>
                <p className="text-slate-700 font-medium leading-relaxed">{currentSetup.front}</p>
              </div>
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold mb-4">2</div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Baga & Şim</h4>
                <p className="text-slate-700 font-medium leading-relaxed">{currentSetup.roller}</p>
                <p className="mt-3 pt-3 border-t border-slate-200 text-sm font-bold text-slate-500">Pul/Şim: <span className="text-slate-900">{currentSetup.shim}</span></p>
              </div>
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold mb-4">3</div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Debriyaj & Yaylar</h4>
                <p className="text-slate-700 font-medium leading-relaxed">{currentSetup.rear}</p>
                <p className="mt-3 pt-3 border-t border-slate-200 text-sm font-bold text-slate-500">Yay: <span className="text-slate-900">{currentSetup.springs}</span></p>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100 flex gap-4">
              <TrendingUp className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-blue-900 mb-1">Sürüş Karakteri Nasıl Olur?</h4>
                <p className="text-blue-800 font-medium leading-relaxed text-lg">{currentSetup.behavior}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: MATRIX (Clean Table) */}
        <section className="mt-24">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">5. Hızlı Karşılaştırma Matrisi</h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">Tüm reçetelerin teknik değerlerinin yan yana basitçe okunabileceği özet tablo.</p>
          </div>

          <div className="hidden lg:block bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Reçete</th>
                  <th className="px-6 py-4">Hedef</th>
                  <th className="px-6 py-4">Gaz Tepkisi</th>
                  <th className="px-6 py-4">Kavrama Devri</th>
                  <th className="px-6 py-4">Son Hız (Max)</th>
                  <th className="px-6 py-4">Bakım Periyodu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-black text-slate-900">#{row.no}</td>
                    <td className="px-6 py-4">{row.target}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{row.throttle}</td>
                    <td className="px-6 py-4">{row.launch}</td>
                    <td className="px-6 py-4 font-bold">{row.topSpeed}</td>
                    <td className="px-6 py-4 text-slate-500">{row.maintenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stack */}
          <div className="lg:hidden space-y-4">
            {COMPARISON_MATRIX.map((row, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between border-b border-slate-100 pb-3 mb-3">
                  <span className="font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">#{row.no} {row.target}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                  <div><span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Tepki</span><span className="text-blue-600 font-bold">{row.throttle}</span></div>
                  <div><span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Kavrama</span><span className="text-slate-900">{row.launch}</span></div>
                  <div><span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Son Hız</span><span className="text-slate-900 font-bold">{row.topSpeed}</span></div>
                  <div><span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Bakım</span><span className="text-slate-500">{row.maintenance}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: WARNING */}
        <section className="mt-24">
          <div className="bg-rose-50 border-l-4 border-rose-500 rounded-r-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start">
            <AlertTriangle className="w-10 h-10 text-rose-500 shrink-0" />
            <div>
              <h4 className="text-xl font-black text-rose-900">Kritik Atölye ve Montaj Uyarısı!</h4>
              <p className="mt-2 text-base sm:text-lg leading-relaxed text-rose-800 font-medium">
                Varyatör somunları sıkılırken <strong className="font-black">kesinlikle havalı tabanca (darbeli tabanca) kullanılmamalıdır.</strong> Krank milinin dişleri geri dönüşü olmayan şekilde bozulabilir. Birincil ön varyatör somunu mutlaka tork anahtarı (torque wrench) kullanılarak fabrika standardı olan <strong className="font-black">95 Nm</strong> değerinde hassasça sıkılmalıdır.
              </p>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}

// Icon helper
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
