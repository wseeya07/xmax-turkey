"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { 
  ChevronLeft, 
  ArrowUpRight, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  Flame, 
  Layers, 
  AlertTriangle, 
  Check, 
  X, 
  Gauge, 
  Sliders, 
  AlertCircle
} from "lucide-react";

interface StageData {
  id: string;
  name: string;
  title: string;
  description: string;
  displacement250: string;
  displacement300: string;
  power250: string;
  power300: string;
  compression: string;
  revLimit: string;
  conrodRequired: boolean;
  crankcaseRequired: boolean;
  starterRequired: boolean;
  coolingRequired: boolean;
  hardwareNotes: string;
  recipe: {
    block: string;
    throttleBody: string;
    injector: string;
    camshaft: string;
    valves?: string;
    forcedInduction?: string;
  };
  electronics: {
    ecu: string;
    afr: string;
    notes: string;
  };
  maintenance: {
    oil: string;
    interval: string;
    plug: string;
    notes?: string;
  };
  warnings: string[];
}

const STAGES: StageData[] = [
  {
    id: "stage_1",
    name: "Stage 1",
    title: "Bolt-On Altyapı",
    description: "Motor bloğunun orijinal sınırlarını zorlamadan, geri dönüştürülebilir 'bolt-on' bileşenlerle silindir hacminin ve hava-yakıt emiş kapasitesinin artırılması.",
    displacement250: "~285 cc - 294 cc",
    displacement300: "Doğrudan Stage 2 önerilir",
    power250: "21.0 - 22.0 WHP",
    power300: "Stok (28 HP Krank / ~21 WHP)",
    compression: "11.2:1",
    revLimit: "9,000 RPM",
    conrodRequired: false,
    crankcaseRequired: false,
    starterRequired: false,
    coolingRequired: false,
    hardwareNotes: "Stok alt blok mukavemeti bu güç seviyesi için tamamen yeterlidir. Herhangi bir karter frezeleme gerektirmez.",
    recipe: {
      block: "76mm Seramik Blok (BRT / Fasstek) & Dövme Piston Kiti",
      throttleBody: "38mm Performans Gaz Kelebeği",
      injector: "180 cc/dk (12 Delikli Yüksek Akış)",
      camshaft: "Stok Eksantrik Mili veya BRT Stage 1 (Street)",
      valves: "Stok Supaplar & Supap Yayları"
    },
    electronics: {
      ecu: "Orijinal ECU (Piggyback veya Kısıtlı Yazılım Desteği ile)",
      afr: "Önerilmez (Stok O2 Sensörü Yetersiz Kalır)",
      notes: "Orijinal ECU bu hacimde bırakılırsa motor yüksek devirlerde aşırı fakir (lean) karışımda kalır, volumetrik verimlilik yetersizliğinden dolayı üst devirlerde 'breathing choke' yaşanır ve detonasyon riski oluşur."
    },
    maintenance: {
      oil: "10W-40 Tam Sentetik (Ester Katkılı)",
      interval: "2,000 km",
      plug: "NGK LMAR8A-9 (Stok Isı Derecesi)"
    },
    warnings: [
      "Fakir Karışım Riski: Silindir kapağı ve yazılım güncellenmezse, motor yüksek devirlerde aşırı fakirde kalarak piston eritebilir.",
      "Solunum Darboğazı: Stok eksantrik mili 294cc hacmi tam besleyemediği için üst devirlerde tork eğrisi aniden düşecektir."
    ]
  },
  {
    id: "stage_1_plus",
    name: "Stage 1+",
    title: "Elektronik & Kapak",
    description: "Stage 1 altyapısının eksiksiz bir bağımsız (standalone) ECU ve agresif dereceli eksantrik mili ile birleştirilerek gücün üst devirlere yayıldığı aşama.",
    displacement250: "294.4 cc (76mm)",
    displacement300: "Doğrudan Stage 2 önerilir",
    power250: "24.0 - 25.0 WHP",
    power300: "Stok (28 HP Krank / ~21 WHP)",
    compression: "11.5:1",
    revLimit: "9,800 RPM (Sert Yaylarla Güvenli)",
    conrodRequired: false,
    crankcaseRequired: false,
    starterRequired: false,
    coolingRequired: false,
    hardwareNotes: "Valvetrain elemanları güçlendirildiği için yüksek devirlerde supap yüzerliği (valve float) tamamen engellenir. Karter işlemi gerekmez.",
    recipe: {
      block: "76mm Seramik Blok (BRT / Fasstek) & Dövme Piston Kiti",
      throttleBody: "42mm Performans Tipi Throttle Body",
      injector: "240 cc/dk (12 Delikli)",
      camshaft: "BRT T2 veya TDR T02 Dereceli Eksantrik Mili",
      valves: "Sert Supap Yayları & Özel Alaşım Supap Pulları (Retainers)"
    },
    electronics: {
      ecu: "aRacer RC Mini X veya Tuneboss Standalone ECU",
      afr: "aRacer AF3 Geniş Bant AFR Modülü (Bosch LSU 4.9 Geniş Bant Sensör)",
      notes: "Şasi Dinamometresi (Dyno) üzerinde 20x17 (RPM x TPS%) çözünürlüğünde yakıt ve 20x9 ateşleme avansı haritalaması zorunludur. Hedef AFR tam gazda 12.8:1 - 13.0:1 olmalıdır."
    },
    maintenance: {
      oil: "10W-50 Tam Sentetik Ester",
      interval: "1,500 km",
      plug: "NGK Laser Iridium CR9EIX (1 Derece Soğuk Buji)"
    },
    warnings: [
      "Zorunlu Ayar: Bağımsız ECU ayarı dyno üzerinde profesyonelce yapılmalıdır, aksi halde motor stabil çalışmaz.",
      "Supap Yüzerliği Koruması: Dereceli egzantriğin agresif profili nedeniyle supapların pistona çarpmasını engellemek için sert supap yayları kullanılmalıdır."
    ]
  },
  {
    id: "stage_2",
    name: "Stage 2",
    title: "Bore-Up & Porting",
    description: "Blok limitlerinin fiziksel olarak zorlandığı, karterin frezelendiği ve silindir kapağının CNC ile işlendiği yüksek kompresyonlu cadde canavarı.",
    displacement250: "~310 cc (78mm)",
    displacement300: "~400 cc (82mm)",
    power250: "28.0 - 29.5 WHP",
    power300: "31.0 - 33.0 WHP",
    compression: "12.2:1",
    revLimit: "9,500 RPM",
    conrodRequired: false,
    crankcaseRequired: true,
    starterRequired: true,
    coolingRequired: true,
    hardwareNotes: "82mm silindir gömleğinin kartere sığması için karter ağzının CNC ile frezelenmesi zorunludur. Stok marş motoru yüksek kompresyonu çeviremez; yüksek torklu marş motoru ve alüminyum radyatör zorunludur.",
    recipe: {
      block: "XMAX 250: 78mm Seramik Blok / XMAX 300: 82mm S90 X-Pro Billet veya Athena Blok",
      throttleBody: "44mm Performans Throttle Body",
      injector: "280 cc/dk veya 320 cc/dk",
      camshaft: "BRT T2 / TDR T02 Dereceli Egzantrik",
      valves: "CNC Porting & Polishing, Büyük Çaplı Performans Supapları"
    },
    electronics: {
      ecu: "aRacer RC Mini X veya RC Super X Standalone ECU",
      afr: "aRacer AF3 Geniş Bant AFR Modülü (Kapalı Çevrim Otomatik Auto-Tune Aktif)",
      notes: "Büyük supaplar ve porting işlemi için hava akış eğrisi tamamen yeniden yazılmalı, rölanti hedefi manuel rölanti valfi ile 1600 RPM civarına sabitlenmelidir."
    },
    maintenance: {
      oil: "10W-50 / 15W-50 Tam Sentetik",
      interval: "1,200 km",
      plug: "NGK Laser Iridium CR9EIX"
    },
    warnings: [
      "Karter İşleme (Boring): Motor tamamen indirilip dağıtılarak CNC tezgahında karter ağzı dairesel olarak tıraşlanmalıdır. Gömlek inceltilerek yapılan karter işlemesiz kitler aşırı hararette ovalleşme riski taşır.",
      "Marş Kilitleme (Stall): Stok marş motoru (OEM B74-H1890-00), yüksek statik sıkıştırma basıncı karşısında kilitlenir. Güçlendirilmiş marş motoru şarttır."
    ]
  },
  {
    id: "stage_2_plus",
    name: "Stage 2+",
    title: "Bore-Up + Yarış Kapak",
    description: "Stage 2 ekstrem hacminin titanyum valvetrain bileşenleri ve en agresif yarış tipi egzantrik milleriyle birleştiği ekstrem devir kurulumu.",
    displacement250: "~310 cc (78mm)",
    displacement300: "~400 cc (82mm)",
    power250: "31.0 - 33.0 WHP",
    power300: "35.0 - 37.0 WHP",
    compression: "12.5:1",
    revLimit: "10,500 RPM",
    conrodRequired: false,
    crankcaseRequired: true,
    starterRequired: true,
    coolingRequired: true,
    hardwareNotes: "Stage 2 gereksinimlerinin tamamı geçerlidir. Valvetrain üzerindeki hareketli kütleyi azaltmak için havacılık sınıfı titanyum retainers kullanımı üst devir kararlılığı sağlar.",
    recipe: {
      block: "XMAX 250: 78mm Seramik Blok / XMAX 300: 82mm S90 Billet / Athena Blok",
      throttleBody: "44mm Performans Throttle Body",
      injector: "320 cc/dk Yüksek Akışlı Enjektör",
      camshaft: "BRT R-Type (Competition Racing) Yarış Eksantrik Mili veya Custom Stage 3",
      valves: "Büyük Supaplar, Çift Supap Yayları & Titanyum Supap Pulları (Titanium Retainers)"
    },
    electronics: {
      ecu: "aRacer RC Super Standalone ECU",
      afr: "aRacer AF3 Geniş Bant AFR Modülü (Bosch O2 Sensörü Hata Teşhis Aktif)",
      notes: "10,000 RPM üzeri devirler için avans haritası, detonasyonu önlemek adına özel olarak rötar (retard) yönünde milimetrik kalibre edilir."
    },
    maintenance: {
      oil: "15W-50 / 10W-60 Yarış Tipi Ester Tam Sentetik",
      interval: "1,000 km",
      plug: "NGK Laser Iridium CR9EIX veya daha soğuk buji"
    },
    warnings: [
      "Ekstrem Devir Aşıntısı: 10,500 RPM limit Blue Core motor için sınır sınırdır. Parça ömürleri kısalır ve düzenli mekanik denetim gerektirir.",
      "Yüksek Isı Yükü: Yağ sıcaklığı yakından izlenmeli, üst düzey su soğutma ve radyatör altyapısı eksiksiz olmalıdır."
    ]
  },
  {
    id: "stage_3",
    name: "Stage 3",
    title: "Extreme Stroker",
    description: "Hem silindir çapının (bore) hem de krank strokunun (stroke) artırıldığı, dövme çelik biyel kolunun kesinlikle zorunlu olduğu en üst sınır mekanik kurulum.",
    displacement250: "Stage 3 doğrudan XMAX 300 odaklıdır",
    displacement300: "430 cc - 440 cc",
    power250: "N/A",
    power300: "42.0 - 45.0 WHP",
    compression: "12.8:1 - 13.0:1",
    revLimit: "9,200 RPM",
    conrodRequired: true,
    crankcaseRequired: true,
    starterRequired: true,
    coolingRequired: true,
    hardwareNotes: "Pistonun artan kütlesi, strok artışı (+3.0mm ila +6.0mm) ve yüksek yanma basıncı nedeniyle döküm stok biyel kolunun kırılmasını önlemek için Dövme Çelik Biyel Kolu (Forged Connecting Rod) kullanımı ZORUNLUDUR.",
    recipe: {
      block: "82mm / 83mm (Athena Ekstrem Kit) & Dövme Piston",
      throttleBody: "44mm - 46mm TB",
      injector: "Dual Injector Setup veya 350 cc/dk - 450 cc/dk Ultra Yüksek Akışlı Tekli Enjektör",
      camshaft: "BRT R-Type / Custom Yarış Egzantriği",
      valves: "Ekstrem CNC Porting, Titanyum Büyük Supaplar, Bronz Supap Kılavuzları & UMA Racing / Custom Dövme Krank Mili (+3mm / +6mm)"
    },
    electronics: {
      ecu: "aRacer RC Super Standalone ECU (Çift enjektör kontrolör kartı ile)",
      afr: "aRacer AF3 Geniş Bant AFR Modülü (Yüksek sıcaklık koruması aktif)",
      notes: "Çift enjektör (Dual Injector) kurulumunda, birincil enjektör alt devirlerde çalışırken ikincil duşlama enjektörü yüksek devir/yük altında devreye girerek silindiri doyurur."
    },
    maintenance: {
      oil: "15W-50 / 20W-60 Tam Sentetik Yarış Yağı (Ester)",
      interval: "750 km",
      plug: "NGK Racing Spark Plug (CR10EK / R0409-10)"
    },
    warnings: [
      "Krank Kırılması ve Kol Çıkarma Riski: Döküm orijinal biyel kolu, 83mm pistonun ve artan strokun atalet kuvvetleri altında ortadan ikiye kırılarak motor bloğunu patlatır. Dövme Çelik Biyel Kolu (H-Profil veya I-Profil) takılması hayati zorunluluktur.",
      "Uyumsuz ATV Krank Uyarısı: Piyasada satılan Linhai 300 ATV krank milleri uyumsuzdur! Gevşek yatak toleransı, volan konikliği hatası, kama kesme ve supap piston çarpma riskleri barındırır.",
      "Soğutma ve Yağlama Revizyonu: Yüksek akışlı yağ pompası, pokhaomin +1.5mm büyük su pompası pervanesi, büyük radyatör ve yüksek debili yakıt pompası zorunludur."
    ]
  },
  {
    id: "stage_4",
    name: "Stage 4",
    title: "Pure Racing (Turbo/Supercharger)",
    description: "Dayanıklılık kaygılarının tamamen arka plana itildiği, tek amacın maksimum tekerlek beygir gücü ve drag sürelerini aşağı çekmek olduğu aşırı besleme kurulumu.",
    displacement250: "N/A",
    displacement300: "400 cc+ (Aşırı Beslemeli)",
    power250: "N/A",
    power300: "55.0 - 70.0+ WHP",
    compression: "10.0:1 - 10.5:1 (Turbo basıncı için düşürülür)",
    revLimit: "11,500+ RPM",
    conrodRequired: true,
    crankcaseRequired: true,
    starterRequired: true,
    coolingRequired: true,
    hardwareNotes: "Turboşarj veya mekanik Supercharger entegrasyonu. Tüm gövde cıvataları yüksek mukavemetli ARP saplamalarla değiştirilmelidir. Çift çıkışlı harici karter havalandırma (breather tank) eklenir.",
    recipe: {
      block: "82mm Forged Piston & Silindir Bloğu",
      throttleBody: "Custom Geniş Performans Throttle Body",
      injector: "Dual Shower Injector Setup (2x 350 cc/dk)",
      camshaft: "Custom Turbo Profil Egzantrik Mili",
      forcedInduction: "Garrett GT15 / IHI RHB31 Turboşarj veya Mekanik Kasnaklı Supercharger"
    },
    electronics: {
      ecu: "aRacer RC Super Pro Standalone ECU (Boost Control ve Basınç Haritalamalı)",
      afr: "aRacer AF3 Geniş Bant AFR Modülü (E85 / Metanol uyumlu)",
      notes: "Yüksek oktanlı yarış yakıtları, E85 (%85 Etanol) veya saf Metanol esasına göre haritalanır. AF3 wideband modülü alkol bazlı yakıtların kimyasal spektrumunu okur."
    },
    maintenance: {
      oil: "10W-60 Özel Yarış Yağı",
      interval: "100 km (Her yarış veya antrenman günü sonrası)",
      plug: "NGK Custom Racing Soğuk Buji",
      notes: "Belirli çalışma saatinden sonra motor tamamen indirilmeli ve alt blok bileşenleri mikro-çatlak testine tabi tutulmalıdır."
    },
    warnings: [
      "Saf Yarış Kurulumu: Asla günlük kullanıma uygun değildir. Olağanüstü bakım ve kısa parça ömrü gerektirir. Yalnızca yarış yakıtlarıyla çalışır.",
      "Gövde Saplamaları (ARP): Yanma odasındaki aşırı aşırı besleme basıncı (boost) kapağı kaldırıp contayı üflemesin diye orijinal cıvatalar ARP saplamalarla revize edilir."
    ]
  }
];

export function MekanikDashboard() {
  const [activeModel, setActiveModel] = useState<"250" | "300">("300");
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(2); // Default to Stage 2

  const activeStage = STAGES[selectedStageIndex];
  
  // Calculate relative HP for display visual bar
  const getHpValue = (stage: StageData, model: "250" | "300") => {
    const powerStr = model === "250" ? stage.power250 : stage.power300;
    if (powerStr.includes("N/A") || powerStr.includes("Stok")) {
      return model === "250" ? 15 : 21; // Baseline
    }
    const match = powerStr.match(/(\d+\.\d+|\d+)\s*-\s*(\d+\.\d+|\d+)/);
    if (match) {
      return (parseFloat(match[1]) + parseFloat(match[2])) / 2;
    }
    const singleMatch = powerStr.match(/(\d+\.\d+|\d+)/);
    return singleMatch ? parseFloat(singleMatch[1]) : 20;
  };

  const currentHp = getHpValue(activeStage, activeModel);
  const maxHp = 70;
  const hpPercent = Math.min((currentHp / maxHp) * 100, 100);

  const displayDisplacement = activeModel === "250" ? activeStage.displacement250 : activeStage.displacement300;
  const displayPower = activeModel === "250" ? activeStage.power250 : activeStage.power300;

  return (
    <div className="space-y-8">
      {/* Top Controls: Model Switch & Stage Selector */}
      <div className="grid gap-6 lg:grid-cols-12 items-center">
        {/* Model Toggle */}
        <div className="lg:col-span-4 flex items-center justify-between p-1.5 rounded-2xl border border-white/[0.06] bg-ink-950/80 backdrop-blur-xl">
          <button
            onClick={() => {
              setActiveModel("250");
              // If index is stage 3 or 4, move back to stage 2 since those are 300 only
              if (selectedStageIndex > 3) setSelectedStageIndex(3);
            }}
            className={`flex-1 py-3 text-center text-sm font-semibold tracking-wider uppercase rounded-xl transition ${
              activeModel === "250" 
                ? "bg-gradient-to-b from-yamaha-400 to-yamaha-700 text-white shadow-ambient-blue" 
                : "text-carbon-400 hover:text-white"
            }`}
          >
            XMAX 250 Blue Core
          </button>
          <button
            onClick={() => setActiveModel("300")}
            className={`flex-1 py-3 text-center text-sm font-semibold tracking-wider uppercase rounded-xl transition ${
              activeModel === "300" 
                ? "bg-gradient-to-b from-yamaha-400 to-yamaha-700 text-white shadow-ambient-blue" 
                : "text-carbon-400 hover:text-white"
            }`}
          >
            XMAX 300 Blue Core
          </button>
        </div>

        {/* Stage Nodes Slider / Navigator */}
        <div className="lg:col-span-8 overflow-x-auto scrollbar-none py-2">
          <div className="flex items-center gap-2 min-w-[560px]">
            {STAGES.map((stage, idx) => {
              const isSelected = selectedStageIndex === idx;
              const isUnavailable = activeModel === "250" && idx > 3;

              return (
                <button
                  key={stage.id}
                  disabled={isUnavailable}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`flex-1 py-3 px-4 rounded-xl border transition-all text-left relative overflow-hidden ${
                    isUnavailable 
                      ? "opacity-30 cursor-not-allowed border-white/[0.02] bg-white/[0.01]" 
                      : isSelected 
                      ? "border-electric-cyan/40 bg-electric-cyan/[0.06] shadow-[0_0_15px_rgba(38,232,255,0.08)]" 
                      : "border-white/[0.06] bg-white/[0.015] hover:border-white/15 hover:bg-white/[0.035]"
                  }`}
                >
                  {isSelected && (
                    <motion.div 
                      layoutId="activeStageBorder" 
                      className="absolute inset-0 border border-electric-cyan rounded-xl pointer-events-none" 
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="font-mono text-[9px] uppercase tracking-widest text-carbon-400">
                    {stage.name}
                  </div>
                  <div className={`text-xs font-bold truncate ${isSelected ? "text-electric-cyan" : "text-white"}`}>
                    {stage.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Side: Summary, Power Output, Hardware Checklist */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Stage Info Card */}
          <div className="glass gradient-edge p-6 space-y-6">
            <div>
              <span className="chip border-electric-cyan/20 bg-electric-cyan/5 text-electric-cyan">
                {activeStage.name} — {activeStage.title}
              </span>
              <h3 className="mt-4 h-display text-2xl font-semibold text-white">
                Mekanik Hedefler
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-carbon-200">
                {activeStage.description}
              </p>
            </div>

            {/* Dyno Power Display */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-electric-cyan" />
                  <span className="font-mono text-xs text-carbon-300 uppercase tracking-wider">Tahmini Teker Gücü (WHP)</span>
                </div>
                <div className="font-mono text-lg font-bold text-white">
                  {displayPower}
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${hpPercent}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yamaha-400 to-electric-cyan rounded-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/[0.06] font-mono text-[11px]">
                <div>
                  <span className="text-carbon-400 block uppercase tracking-wider">Sıkıştırma</span>
                  <span className="text-white font-bold text-sm">{activeStage.compression}</span>
                </div>
                <div>
                  <span className="text-carbon-400 block uppercase tracking-wider">Devir Sınırı</span>
                  <span className="text-white font-bold text-sm">{activeStage.revLimit}</span>
                </div>
              </div>
            </div>

            {/* Hardware Checklist Notes */}
            <div className="text-xs text-carbon-300 border-l-2 border-yamaha-400 pl-3 italic">
              <strong>Motor Hacmi:</strong> {displayDisplacement} <br />
              <strong>Blok Notu:</strong> {activeStage.hardwareNotes}
            </div>
          </div>

          {/* Critical Hardware Checklist */}
          <div className="glass gradient-edge p-6 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-carbon-300 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-yamaha-300" />
              Kritik Donanım Gereksinimleri
            </h4>

            <div className="grid gap-3 pt-2">
              {[
                { label: "Dövme Çelik Biyel Kolu", value: activeStage.conrodRequired, desc: "Tensile kuvvetler karşısında kol kırılmasını önler." },
                { label: "Karter CNC İşleme (Boring)", value: activeStage.crankcaseRequired, desc: "Büyük çaplı gömleğin karter bloğuna girmesini sağlar." },
                { label: "Yükseltilmiş Marş Motoru", value: activeStage.starterRequired, desc: "Yüksek kompresyonda marş kilitlemesini (stall) önler." },
                { label: "Soğutma & Yağlama Revizyonu", value: activeStage.coolingRequired, desc: "Büyük radyatör ve yüksek debili devirdaim/yağ pompası." }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition ${
                    item.value 
                      ? "border-red-500/20 bg-red-500/[0.02]" 
                      : "border-white/[0.04] bg-white/[0.01] opacity-75"
                  }`}
                >
                  <div className="mt-0.5">
                    {item.value ? (
                      <div className="p-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                        <AlertTriangle className="h-3.5 w-3.5" />
                      </div>
                    ) : (
                      <div className="p-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{item.label}</span>
                      <span className={`text-[9px] uppercase tracking-wider font-mono px-1.5 py-0.2 rounded ${
                        item.value ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                      }`}>
                        {item.value ? "ZORUNLU" : "STANDART YETERLİ"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-carbon-300 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Recipe, Electronics, Maintenance, Warnings */}
        <div className="lg:col-span-7 space-y-6">
          {/* Detailed Recipe Card */}
          <div className="glass gradient-edge p-6 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-carbon-300 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-yamaha-300" />
              Mekanik Bileşen ve Donanım Reçetesi
            </h4>

            <div className="grid gap-4 mt-4 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-ink-950/40 border border-white/[0.04] gap-2">
                <span className="text-carbon-400">Silindir & Piston Kiti:</span>
                <span className="text-white font-semibold text-right sm:max-w-[70%]">{activeStage.recipe.block}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-ink-950/40 border border-white/[0.04] gap-2">
                <span className="text-carbon-400">Performans Gaz Kelebeği:</span>
                <span className="text-electric-cyan font-bold">{activeStage.recipe.throttleBody}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-ink-950/40 border border-white/[0.04] gap-2">
                <span className="text-carbon-400">Enjektör Debisi:</span>
                <span className="text-white font-semibold">{activeStage.recipe.injector}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-ink-950/40 border border-white/[0.04] gap-2">
                <span className="text-carbon-400">Eksantrik Mili (Camshaft):</span>
                <span className="text-white font-semibold text-right sm:max-w-[70%]">{activeStage.recipe.camshaft}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-ink-950/40 border border-white/[0.04] gap-2">
                <span className="text-carbon-400">Valvetrain & Supaplar:</span>
                <span className="text-white font-semibold text-right sm:max-w-[70%]">{activeStage.recipe.valves}</span>
              </div>
              {activeStage.recipe.forcedInduction && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-electric-violet/30 bg-electric-violet/[0.04] gap-2">
                  <span className="text-electric-violet font-semibold">Aşırı Besleme (Boost):</span>
                  <span className="text-white font-bold">{activeStage.recipe.forcedInduction}</span>
                </div>
              )}
            </div>
          </div>

          {/* Electronics & ECU Tuning */}
          <div className="glass gradient-edge p-6 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-carbon-300 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-yamaha-300" />
              Elektronik Yönetim ve ECU Kalibrasyonu
            </h4>

            <div className="space-y-3 pt-2 text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-3 rounded-xl bg-ink-950/40 border border-white/[0.04]">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-carbon-400 block mb-1">Elektronik Kontrol Ünitesi</span>
                  <span className="text-white font-semibold text-xs leading-tight block">{activeStage.electronics.ecu}</span>
                </div>
                <div className="p-3 rounded-xl bg-ink-950/40 border border-white/[0.04]">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-carbon-400 block mb-1">Geniş Bant Genişliği</span>
                  <span className="text-electric-cyan font-semibold text-xs leading-tight block">{activeStage.electronics.afr}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.015] text-xs text-carbon-200 leading-relaxed">
                <strong className="text-white block mb-1">Mühendislik & Haritalama Notu:</strong>
                {activeStage.electronics.notes}
              </div>
            </div>
          </div>

          {/* Maintenance Protocols */}
          <div className="glass gradient-edge p-6 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-carbon-300 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-yamaha-300" />
              Bakım Protokolleri & Motor Yaşam Süresi
            </h4>

            <div className="grid gap-4 sm:grid-cols-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-ink-950/40 border border-white/[0.04] text-center">
                <span className="text-carbon-400 block text-[9px] uppercase tracking-widest mb-1.5">Önerilen Viskozite</span>
                <span className="text-white font-bold text-sm block">{activeStage.maintenance.oil}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-ink-950/40 border border-white/[0.04] text-center">
                <span className="text-carbon-400 block text-[9px] uppercase tracking-widest mb-1.5">Yağ Değişim Aralığı</span>
                <span className="text-electric-cyan font-bold text-sm block">{activeStage.maintenance.interval}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-ink-950/40 border border-white/[0.04] text-center">
                <span className="text-carbon-400 block text-[9px] uppercase tracking-widest mb-1.5">Buji Konfigürasyonu</span>
                <span className="text-white font-bold text-sm block">{activeStage.maintenance.plug}</span>
              </div>
            </div>
          </div>

          {/* Metallurgy Warnings */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 space-y-4">
            <h4 className="text-sm font-semibold text-red-200 flex items-center gap-2">
              <Flame className="h-5 w-5 text-red-400" />
              Kritik Güvenlik & Mühendislik Uyarıları (Kara Liste)
            </h4>

            <ul className="space-y-3 text-xs leading-relaxed text-carbon-200">
              {activeStage.warnings.map((w, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="text-red-400 mt-0.5">■</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Special Block: ATV vs OEM Crank Comparison Matrix */}
      {selectedStageIndex >= 4 && (
        <Reveal>
          <div className="glass gradient-edge p-6 border-red-500/20 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <h4 className="h-display text-lg font-semibold text-white">Stroker Krank Mili Mühendislik Matrisi</h4>
              </div>
              <p className="mt-1 text-xs text-carbon-300">
                Stage 3 ekstrem stroker setups hazırlarken, piyasadaki ucuz ATV krank millerinin kullanılması boyutsal farklar nedeniyle catastrophic (yıkıcı) motor kilitlenmelerine neden olur.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
              <table className="w-full text-left text-xs font-mono min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02] text-carbon-400">
                    <th className="px-4 py-3">Teknik Boyut</th>
                    <th className="px-4 py-3">Yamaha OEM XMAX 300</th>
                    <th className="px-4 py-3 text-red-400">Linhai 300 ATV Krangı (Uyumsuz)</th>
                    <th className="px-4 py-3 text-emerald-400">UMA / Custom Forged Stroker</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-white">
                  <tr>
                    <td className="px-4 py-3 text-carbon-300">Ana Muylu Çapı</td>
                    <td className="px-4 py-3">Hassas Tolerans (Stok)</td>
                    <td className="px-4 py-3 text-red-400">Gevşek yatak toleransı (Yağ basınç kaybı)</td>
                    <td className="px-4 py-3 text-emerald-400">Hassas Mikron Taşlanmış</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-carbon-300">Volan Konikliği</td>
                    <td className="px-4 py-3">Kusursuz Oturum</td>
                    <td className="px-4 py-3 text-red-400">Hatalı Koniklik (Kama kesme riski)</td>
                    <td className="px-4 py-3 text-emerald-400">CNC Hassas İşlenmiş</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-carbon-300">Biyel Kolu Malzemesi</td>
                    <td className="px-4 py-3">Döküm Standart Alaşım</td>
                    <td className="px-4 py-3 text-red-400">Düşük Kalite Döküm Demir (Kırılma)</td>
                    <td className="px-4 py-3 text-emerald-400">Dövme Çelik H-Profil (Ekstrem Dayanım)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-carbon-300">Krank Pimi Eksen Ofseti</td>
                    <td className="px-4 py-3">Standart Eksen</td>
                    <td className="px-4 py-3 text-red-400">Hatalı Ofset (Piston supap çarpma riski)</td>
                    <td className="px-4 py-3 text-emerald-400">Hassas Hizalanmış Yüksek Mukavemet</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-carbon-300">Toplam Krank Eksen Boyu</td>
                    <td className="px-4 py-3">Kartere Kusursuz Sığar</td>
                    <td className="px-4 py-3 text-red-400">Eksenel Boşluk Hatası (Kapağa Sığmaz)</td>
                    <td className="px-4 py-3 text-emerald-400">Karter Kapaklarına Uyumlu Boyut</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
