"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ShieldCheck,
  ShieldAlert,
  Zap,
  CircleAlert,
  AlertTriangle,
  Gauge,
  Flame,
  Droplets,
  Wrench,
  Layers,
  Disc,
  Wind,
  Activity,
  Cog,
  Info,
  Thermometer,
  Wifi,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

type ModelKey = "300" | "400" | "race";

type StopRow = {
  label: string;
  sub: string;
  stock: number;
  upgrade: number;
  delta: string;
  pct: number;
  highlight?: boolean;
};

const STOPPING_DATA: StopRow[] = [
  {
    label: "60 → 0 km/h",
    sub: "Kuru asfalt, tek ısırış",
    stock: 14.8,
    upgrade: 11.2,
    delta: "-3.6 m",
    pct: 24.3,
  },
  {
    label: "100 → 0 km/h",
    sub: "Kuru asfalt, tek ısırış",
    stock: 42.5,
    upgrade: 33.8,
    delta: "-8.7 m",
    pct: 20.4,
  },
  {
    label: "100 → 0 km/h",
    sub: "Ardışık 5. frenleme — Brake Fade testi",
    stock: 53.2,
    upgrade: 34.5,
    delta: "-18.7 m",
    pct: 35.1,
    highlight: true,
  },
];

type Caliper = {
  id: string;
  brand: string;
  role: string;
  body: string;
  pistons: string;
  pitch: string;
  feel: string;
  use: string;
  stiffness: number;
  bite: number;
  mod: number;
  fade: number;
  note: string;
  image: string;
  editorPick?: boolean;
  videoId?: string;
};

const CALIPERS: Caliper[] = [
  {
    id: "zenith",
    brand: "RPD Zenith Radial 4P P100 + Axial 2P (Front + Rear)",
    role: "Editör Tercihi — Sokak + Hafta sonu pisti",
    body: "Dövme alüminyum + radyal ön / eksenel arka tam set",
    pistons: "Ön 4 × radyal P100 · Arka 2 × eksenel",
    pitch: "100 mm radyal — XMAX maşası için adaptör seti dahil",
    feel: "RPD'nin yarış serisi: Brembo'ya yakın rijitlik, sokak fiyatı",
    use: "Türkiye XMAX sahnesinin gözde komple fren seti — ön + arka aynı set",
    stiffness: 88,
    bite: 90,
    mod: 85,
    fade: 87,
    note: "RPD'nin XMAX'e özel hazırladığı tam set: ön radyal 4P P100 + arka 2P axial. Maşa adaptörleri, banjo civatalar ve pullar kit içinde. Türkiye pazarında en sık tercih edilen RPD üst seri yapılandırmasıdır.",
    image: "/brakes/rpd-zenith.svg",
    editorPick: true,
    videoId: "3DikleDh-CA",
  },
  {
    id: "m434",
    brand: "Brembo M4.34 / M4.32 Radial Monoblock",
    role: "Sokak + Otoban + Pist",
    body: "Tek parça döküm alüminyum (monoblok)",
    pistons: "4 × 34 mm veya 4 × 32 mm",
    pitch: "100 mm aks aralığı",
    feel: "Üst düzey rijitlik, kararlı ısıl direnç",
    use: "Agresif viraj, otoban, hafta sonu pisti",
    stiffness: 92,
    bite: 95,
    mod: 86,
    fade: 90,
    note: "Monoblok döküm sayesinde gövde esnemesi yok denecek kadar azdır — frenleme gücünün %100'ü diske aktarılır.",
    image: "/brakes/brembo-m4.svg",
  },
  {
    id: "gp4rx",
    brand: "Brembo GP4-RX Billet Radial",
    role: "Pist & Saf Yarış",
    body: "İki parçalı CNC işleme, nikel kaplama",
    pistons: "4 × 32 mm alüminyum",
    pitch: "100 mm",
    feel: "Kusursuz dozajlama, mükemmel geri bildirim",
    use: "Radikal pist günleri, üst düzey sürüş",
    stiffness: 98,
    bite: 92,
    mod: 100,
    fade: 95,
    note: "Bilet alüminyum gövde rakiplerine göre %40 daha hafif. Manet üzerindeki tüm milimetrik kuvveti diske kayıpsız çevirir.",
    image: "/brakes/brembo-gp4rx.svg",
  },
  {
    id: "blitz",
    brand: "RPD Forged Axial 'Blitz' 4P",
    role: "Şehir + Touring",
    body: "Dövme alüminyum alaşım (forged)",
    pistons: "4 × değişken çaplı",
    pitch: "Eksenel (axial) — adaptör gerekmez",
    feel: "Kararlı şehir içi durdurma",
    use: "Günlük komütör, yüksek güvenlikli sokak kurulumu",
    stiffness: 78,
    bite: 84,
    mod: 76,
    fade: 78,
    note: "Stok eksenel maşa bacaklarına direkt geçer. Fiyat/performans dengesi sınıfının en iyisi.",
    image: "/brakes/rpd-blitz.svg",
  },
  {
    id: "p234",
    brand: "Brembo P2 34G Axial (Arka)",
    role: "Arka — Dengeli Kontrol",
    body: "İki parçalı döküm alüminyum",
    pistons: "2 × 34 mm",
    pitch: "84 mm bağlantı",
    feel: "Kilitlenmeyi önleyici doğrusal his",
    use: "Genel sokak + kombine frenleme desteği",
    stiffness: 72,
    bite: 70,
    mod: 88,
    fade: 75,
    note: "Arka tekerlek için en doğru seçim — fazla agresif olmaması iki kişi sürüşte kilitlenme riskini bertaraf eder.",
    image: "/brakes/brembo-p2-34g.svg",
  },
];

type MasterCyl = {
  id: string;
  name: string;
  bore: string;
  target: string;
  profile: string;
  pair: string;
  pros: string[];
  cons: string[];
  sku: string;
  recommended: string[];
  warning?: boolean;
};

const MASTER_CYLINDERS: MasterCyl[] = [
  {
    id: "rcs14",
    name: "Brembo RCS 14",
    bore: "14 mm",
    target: "Tek ön diskli XMAX 250 / 300 + arka tek kaliper",
    profile: "Dengeli, yumuşak ama güçlü ısırma. RCS Click sistemiyle 18/20 oranı arası mod değişimi.",
    pair: "M50, GP4-RS veya RPD Blitz 4P kaliper ile mükemmel",
    pros: ["Sokak için en geniş tolerans", "Katlanır CNC manet — düşmede kırılma yok", "Ergonomik mesafe ayarı"],
    cons: ["Pist yarışında 15 mm daha sert his sunar"],
    sku: "110A26310 (sağ) / 110A26370 (sol)",
    recommended: ["XMAX 250", "XMAX 300"],
  },
  {
    id: "rcs15",
    name: "Brembo RCS 15",
    bore: "15 mm",
    target: "Performans odaklı tek disk + büyük piston aftermarket kaliperler",
    profile: "Daha kısa manet, daha sert his. GP serisinde Bite Point ayar mekanizması mevcut.",
    pair: "Brembo GP4-RX veya büyük piston aftermarket kaliperler",
    pros: ["Anında, milisaniyelik tepki", "Pist için ideal", "Bite Point ayarlanabilir"],
    cons: ["Soğuk havada başlangıçta sert hisseder", "Yeni kullanıcı için yorucu"],
    sku: "110C74030",
    recommended: ["XMAX 300 Pist", "Agresif sokak"],
  },
  {
    id: "rcs17",
    name: "Brembo RCS 17 Corsa Corta",
    bore: "17 mm",
    target: "Çift diskli XMAX 400 — iki kalipere paralel hidrolik hacim",
    profile: "Üç farklı ısırma haritası (Normal / Sport / Race) Click mekanizmasıyla anında değişir.",
    pair: "Çift Brembo M4.32 Radial kaliper",
    pros: ["Çift kalipere yetecek deplasman", "Düşük parmak basıncıyla yüksek hidrolik basınç", "3 modlu Click"],
    cons: ["Tek diskli kuruluma kesinlikle uygun değil", "Premium fiyat segmenti"],
    sku: "110C74040",
    recommended: ["XMAX 400 çift disk"],
  },
  {
    id: "rcs19",
    name: "RCS 19 — UYARI",
    bore: "19 mm",
    target: "Tek diskli XMAX'te KESİNLİKLE KULLANMAYIN",
    profile: "Manet az hareket ettiğinde dahi aşırı hidrolik hacim göndererek 'duvara çarpma' hissi verir.",
    pair: "Yalnızca çok büyük piston alanlı yarış kaliperleri için",
    pros: ["Sadece radikal yarış sistemlerinde yeri var"],
    cons: ["Tek diskte tekerlek anında kilitlenir", "Dozajlama imkansız", "ABS bile koruyamayabilir"],
    sku: "—",
    recommended: [],
    warning: true,
  },
];

type HoseBrand = {
  name: string;
  origin: string;
  construction: string;
  pressure: string;
  burst: string;
  note: string;
  badge?: string;
  image: string;
};

const HOSE_BRANDS: HoseBrand[] = [
  {
    name: "HEL Performance",
    origin: "İngiltere (UK)",
    construction: "303/304 paslanmaz çelik hasır + Dupont PTFE Teflon iç boru + PVC dış kaplama",
    pressure: "290 BAR (4206 PSI) sürekli",
    burst: "870 BAR (12618 PSI) patlama",
    note: "Sektör standardı. Rekor presleme teknolojisi en uzun ömürlü.",
    badge: "Önerilen",
    image: "/brakes/hose-hel.svg",
  },
  {
    name: "Allegri",
    origin: "İtalya (ITA)",
    construction: "Modüler rekor sistemi — açı bağımsız montaj",
    pressure: "~280 BAR sürekli",
    burst: "~850 BAR patlama",
    note: "İtalyan zarafeti. Esnek açılı rekorları zor maşa hatlarında hayat kurtarır.",
    image: "/brakes/hose-allegri.svg",
  },
  {
    name: "TDR (Asya)",
    origin: "Tayland / Endonezya",
    construction: "Çelik örgü + PTFE — preslenmiş rekor uçlar",
    pressure: "~250 BAR sürekli",
    burst: "~800 BAR patlama",
    note: "Ekonomik. Rekor uzun ömür garantisi düşük; F/P odaklı kurulumlar için.",
    image: "/brakes/hose-tdr.svg",
  },
];

type PadCompound = {
  name: string;
  mu: number;
  compound: string;
  wetDry: string;
  use: string;
  color: string;
};

const PAD_COMPOUNDS: PadCompound[] = [
  {
    name: "EBC Double-H (HH Sintered)",
    mu: 0.55,
    compound: "Bakır alaşımlı sinterlenmiş metal",
    wetDry: "Islak ve kuru zeminde sabit",
    use: "En popüler performans balatası. Yüksek aşındırıcılık — sadece ısıl işlemli kaliteli diskle.",
    color: "from-electric-cyan to-yamaha-400",
  },
  {
    name: "Brembo XS Sintered",
    mu: 0.51,
    compound: "Maxi-scooter özel sinter karışım",
    wetDry: "Dinamik ağırlık transferi için optimize",
    use: "Sokak dozajlama stabilitesi açısından en tutarlı. SA serisi ön agresif, SP serisi arka için doğrusal.",
    color: "from-yamaha-400 to-electric-violet",
  },
  {
    name: "Galfer Sintered (G1375)",
    mu: 0.52,
    compound: "Isı modülasyonlu sinter",
    wetDry: "Isındıkça performansı artar",
    use: "Agresif sürüş tarzına ısınınca tam uyum sağlar. Soğukta biraz çekingen.",
    color: "from-electric-violet to-electric-ember",
  },
  {
    name: "EBC GPFAX (Pist)",
    mu: 0.58,
    compound: "Saf yarış sinter",
    wetDry: "Sadece kuru pist için kalibre",
    use: "Sadece pist. Sokakta soğukken yetersiz, ısındığında ultra agresif.",
    color: "from-electric-ember to-red-500",
  },
];

type Fluid = {
  name: string;
  dry: number;
  wet: number;
  use: string;
  color: string;
};

const FLUIDS: Fluid[] = [
  { name: "DOT 4", dry: 230, wet: 155, use: "Standart sokak. Nemi yavaş emer ama yüksek sıcaklık limiti düşük.", color: "bg-yamaha-500" },
  { name: "DOT 5.1", dry: 260, wet: 180, use: "Düşük viskozite. ABS valflerine milisaniyelik tepki. Vapor lock'a direnç maksimum.", color: "bg-electric-cyan" },
  { name: "Motul RBF 600", dry: 312, wet: 216, use: "Yarış DOT 4 — sokakta da güvenle kullanılır. 12 ayda bir yenilenmeli.", color: "bg-electric-violet" },
  { name: "Motul RBF 660", dry: 325, wet: 205, use: "XMAX 400 çift disk için ideal. Yüksek termal kütle dağılımı.", color: "bg-electric-ember" },
  { name: "Motul RBF 700 Racing", dry: 336, wet: 218, use: "Sadece pist. Higroskopik yapısı çok hızlı su emer — 6 ay maksimum ömür.", color: "bg-red-500" },
];

type Recipe = {
  title: string;
  subtitle: string;
  focus: string;
  parts: { group: string; part: string; spec: string; sku: string }[];
  fluid: string;
  totalCost: string;
  brakeFeel: string;
};

const RECIPES: Record<ModelKey, Recipe> = {
  "300": {
    title: "XMAX 250 / 300 — Günlük Sokak Yüksek Güvenlik",
    subtitle: "ABS korunur, şehir içi ani duruşta maksimum güvenlik, uzun ömür ve optimum fiyat/performans.",
    focus: "Kararlılık + Ergonomi + Bütçe",
    brakeFeel: "Yumuşak başlayıp doğrusal artan, parmak ucunda bite point hissedilir. ABS asla erken devreye girmez.",
    totalCost: "Orta segment — toplam yaklaşık 28.000 ₺ – 38.000 ₺ aralığı",
    fluid: "Motul RBF 600 DOT 4 (kuru: 312°C)",
    parts: [
      { group: "Ön Kaliper", part: "RPD Forged Axial 4P 'Blitz'", spec: "4 pistonlu, değişken çaplı, dövme alüminyum", sku: "71200-ALL77-4PLR" },
      { group: "Ön Disk", part: "RPD Front Floating Disc V2", spec: "300 mm Ø, 4.5 mm kalınlık, alüminyum göbek", sku: "71100-B7477-300F" },
      { group: "Arka Disk", part: "RPD Rear Disc Rotor", spec: "245 mm Ø, 4.0 mm kalınlık, karbon-çelik alaşım", sku: "71100-B7477-RS245" },
      { group: "Kaliper Braketi", part: "RPD CNC Ön Braket Seti", spec: "300 mm disk + Blitz uyumlu CNC alüminyum", sku: "RPD-AXL-300" },
      { group: "Sağ Master", part: "Brembo RCS 14", spec: "14 mm piston, ayarlanabilir, katlanır manet", sku: "110A26310" },
      { group: "Sol Master", part: "Brembo RCS 14", spec: "14 mm piston, arka tek kaliper için", sku: "110A26370" },
      { group: "Hortum Seti", part: "HEL Performance ABS Set", spec: "4 parçalı çelik örgü ABS uyumlu", sku: "HBK-1213GM" },
      { group: "Balatalar", part: "Brembo XS Sintered", spec: "Maxi-scooter kararlı sinter — ön + arka", sku: "07GR90XS / 07GR69XS" },
    ],
  },
  "400": {
    title: "XMAX 400 — Çift Disk Yüksek Performans Isı Yönetimi",
    subtitle: "Ağır şasiyi ve yüksek motor gücünü dizginleyen Brembo ağırlıklı profesyonel kurulum.",
    focus: "Termal Kütle + Çift Disk Hidroliği",
    brakeFeel: "İki kaliperin paralel ısırması viraj girişinde sıfır salınım. RCS 17'nin Click haritası ile mod değişimi anında.",
    totalCost: "Premium — toplam yaklaşık 65.000 ₺ – 85.000 ₺ aralığı",
    fluid: "Motul RBF 660 DOT 4 (kuru: 325°C)",
    parts: [
      { group: "Ön Kaliperler", part: "Brembo M4.32 Radial Monoblock (Çift)", spec: "4 × 32 mm pistonlu, 100 mm aks, monoblok", sku: "220A39710 (sol) / 220A39720 (sağ)" },
      { group: "Ön Diskler", part: "Brembo Serie Oro Floating (Çift)", spec: "267 mm Ø, 5.0 mm kalınlık, paslanmaz/alüminyum", sku: "78B408A9" },
      { group: "Arka Kaliper", part: "Brembo P2 34G Axial", spec: "2 × 34 mm, 84 mm bağlantı, titanyum gri", sku: "20B85580" },
      { group: "Arka Disk", part: "Brembo Serie Oro Fixed", spec: "267 mm Ø, 5.0 mm kalınlık, sabit çelik", sku: "68B407C4" },
      { group: "Kaliper Braketleri", part: "CNC Custom Eksenel→Radial 100 mm", spec: "7075-T6 alüminyum, mikron hassas işleme", sku: "CNC-XM400-R100" },
      { group: "Sağ Master", part: "Brembo RCS 17 Corsa Corta", spec: "17 mm piston, 3 modlu Click, çift kaliper uyumlu", sku: "110C74040" },
      { group: "Sol Master", part: "Brembo RCS 14", spec: "14 mm piston, tek arka kaliper için", sku: "110A26370" },
      { group: "Hortum Seti", part: "HEL Performance Custom ABS", spec: "Çift ön kaliper dağıtıcılı T-tipi 5'li set", sku: "HBK-XM400-ABS" },
      { group: "Balatalar", part: "Brembo SA (ön) / SP (arka)", spec: "Ön agresif sinter SA / arka doğrusal sinter SP", sku: "07BB03SA / 07044SP" },
    ],
  },
  race: {
    title: "XMAX 300 — Radikal Yarış & Pist",
    subtitle: "Tavizsiz fren gücü, milisaniyelik gecikmesiz tepki ve maksimum manet geri bildirimi.",
    focus: "Saf Yarış — Sokak Konforu Sıfır",
    brakeFeel: "Manet 2 mm hareket ettiği anda balatalar diske kilitlenir. Trail braking için cerrahi hassasiyet.",
    totalCost: "Üst premium — toplam yaklaşık 75.000 ₺+ (custom braket dahil)",
    fluid: "Motul RBF 700 DOT 4 Racing (kuru: 336°C)",
    parts: [
      { group: "Ön Kaliper", part: "Brembo GP4-RX Billet Radial", spec: "4 × 32 mm, CNC bilet alüminyum, nikel kaplama", sku: "220B01010 (100 mm pitch)" },
      { group: "Ön Disk", part: "RPD Front Floating Disc V2", spec: "300 mm Ø, yarış tipi CNC yüzer", sku: "71100-B7477-300F" },
      { group: "Arka Kaliper", part: "Brembo CNC Billet P4 24 mm", spec: "4 × 24 mm titanyum piston, CNC yarış arka", sku: "X206101" },
      { group: "Arka Disk", part: "RPD Rear Disc Rotor", spec: "245 mm Ø, ısı kanallı spor rotor", sku: "71100-B7477-RS245" },
      { group: "Kaliper Braketi", part: "LDS Radiation 100 mm Base", spec: "100 mm radial uyumlu CNC alüminyum", sku: "LDS-XM300-100" },
      { group: "Sağ Master", part: "Brembo RCS 15 Corsa Corta", spec: "15 mm piston, ayarlanabilir Bite Point", sku: "110C74030" },
      { group: "Sol Master", part: "Brembo RCS 14 Corsa Corta", spec: "14 mm piston, hassas ısırma noktası ayarı", sku: "110C74050" },
      { group: "Hortum Seti", part: "Allegri Örgü Direkt Hat", spec: "ABS bypass — sadece pist kullanımı için", sku: "ALG-XM300-RACE" },
      { group: "Ön Balatalar", part: "EBC GPFAX Sintered", spec: "Ultra yüksek µ, sadece yarış", sku: "GPFAX244" },
      { group: "Arka Balatalar", part: "EBC Double-H Sintered", spec: "Spor sokak/pist HH balata", sku: "FA123HH" },
    ],
  },
};

type TorqueRow = { joint: string; bolt: string; torque: string; note: string };

const TORQUE_TABLE: TorqueRow[] = [
  { joint: "Kaliper adaptörünün çatala bağlantısı", bolt: "M10 × 1.25", torque: "35 – 40 Nm", note: "Loctite 243 (orta mukavemet diş sabitleyici)" },
  { joint: "Radial kaliperin adaptöre bağlantısı", bolt: "M10 × 1.25 / 1.5", torque: "50 Nm", note: "Kuru montaj veya hafif tork gresi" },
  { joint: "Disk göbeği civataları", bolt: "M8 × 1.25", torque: "23 Nm", note: "Her değişimde yeni civata, çapraz sıkma" },
  { joint: "Kaliper hava alma rekorları", bolt: "M8 / M10", torque: "12 – 16 Nm", note: "Dişlerin sıyırılmamasına dikkat" },
  { joint: "Hidrolik hortum banjo civatası", bolt: "M10 × 1.00 / 1.25", torque: "23 – 26 Nm", note: "İki yana sıfır bakır/alüminyum pul" },
];

export default function BrakePerformancePage() {
  const [caliperId, setCaliperId] = useState<string>(CALIPERS[0].id);
  const [masterId, setMasterId] = useState<string>(MASTER_CYLINDERS[0].id);
  const [recipeKey, setRecipeKey] = useState<ModelKey>("300");
  const [speed, setSpeed] = useState<number>(100);

  const caliper = useMemo(() => CALIPERS.find((c) => c.id === caliperId)!, [caliperId]);
  const master = useMemo(() => MASTER_CYLINDERS.find((m) => m.id === masterId)!, [masterId]);
  const recipe = RECIPES[recipeKey];

  const mass = 260;
  const v = (speed * 1000) / 3600;
  const energyKJ = (0.5 * mass * v * v) / 1000;
  const stockStop = Math.max(4, (speed * speed) / 240);
  const upgradeStop = stockStop * 0.78;

  return (
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
          <span className="chip">
            <Disc className="size-3.5 text-electric-cyan" />
            Fren Mühendisliği &amp; Hidrolik Laboratuvar
          </span>
          <h1 className="mt-4 h-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Durdurmak,{" "}
            <span className="text-electric">hızlanmaktan daha mühendisliktir.</span>
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
            XMAX 250/300/400 stok fren sistemi, agresif sokak, otoban ve pist kullanımında
            <strong className="text-white"> brake fade</strong>,{" "}
            <strong className="text-white">vapor lock</strong> ve hortum genleşmesi nedeniyle hızla
            limite ulaşır. RPD ve Brembo radyal dönüşüm kitleri sisteme yüksek rijitlik, kararlı
            hidrolik basınç ve milimetrik dozajlama kazandırır — stok ile arasındaki fark, 100&apos;den
            sıfıra ardışık beşinci frenlemede{" "}
            <strong className="text-electric-cyan">18.7 metreye</strong> kadar açılır.
          </p>
        </header>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Durma mesafesi", v: "−35.1%", s: "Ardışık 5. frenleme, 100→0" },
            { k: "Hortum genleşmesi", v: "0", s: "PTFE + paslanmaz örgü, 290 BAR" },
            { k: "Disk işletim ısısı", v: "350°C+", s: "Floating disk ile çarpılma yok" },
            { k: "Manet hissi", v: "Cerrahi", s: "Radial RCS — doğrusal basınç" },
          ].map((s) => (
            <div key={s.k} className="glass p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-carbon-300">
                {s.k}
              </div>
              <div className="mt-2 h-display text-2xl font-semibold text-white">{s.v}</div>
              <div className="mt-1 text-[11px] text-carbon-300">{s.s}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <section className="mt-24 space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
              Bölüm 01 — Termodinamik
            </span>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Brake Fade nedir, manetin neden boşa düştüğünü anlamak.
            </h2>
            <p className="text-sm leading-relaxed text-carbon-200 max-w-3xl">
              Yüksek hızdan ani duruş esnasında kinetik enerji ısıya dönüşür. Bu ısı kısa sürede
              350°C üzerine çıkar ve iki farklı süreçle frenin gücünü yutar:
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="glass gradient-edge p-7 h-full">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-electric-ember/10 text-electric-ember">
                  <Flame className="size-5" />
                </span>
                <h3 className="h-display text-xl font-semibold text-white">
                  Pad Fade — Sürtünme Kaybı
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                Stok organik/yarı-sinter balatalar aşırı ısındığında bağlayıcı reçineler{" "}
                <strong className="text-white">gazlaşır</strong>. Bu gazlar balata yüzeyi ile disk
                arasında mikroskobik bir yastık oluşturur. Sürtünme katsayısı (µ) dramatik düşer —
                sürücü maneti maksimumla sıksa bile araç yavaşlamaz.
              </p>
              <div className="mt-5 rounded-xl border border-electric-ember/15 bg-electric-ember/[0.04] p-3 text-xs text-carbon-200">
                <strong className="text-electric-ember">Çözüm:</strong> Sinterlenmiş bakır alaşımlı
                balatalar (EBC HH, Brembo XS) gazlaşmaz ve ısındıkça µ artar.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass gradient-edge p-7 h-full">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-yamaha-500/10 text-yamaha-300">
                  <Droplets className="size-5" />
                </span>
                <h3 className="h-display text-xl font-semibold text-white">
                  Vapor Lock — Buhar Kilidi
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                Kaliperde biriken ısı, hidrolik sıvıyı kaynama noktasına getirir. Sıvı içinde{" "}
                <strong className="text-white">sıkıştırılabilir gaz kabarcıkları</strong> oluşur,
                aynı anda kauçuk hortum radyal olarak şişer. Merkez silindirden gönderilen hacim
                pistonu itmek yerine hortumu genişletir → manette{" "}
                <strong className="text-white">süngerimsi boşluk</strong>.
              </p>
              <div className="mt-5 rounded-xl border border-yamaha-500/15 bg-yamaha-500/[0.04] p-3 text-xs text-carbon-200">
                <strong className="text-yamaha-200">Çözüm:</strong> Paslanmaz örgülü PTFE hortumlar
                (HEL, Allegri) 290 BAR&apos;a kadar sıfır esneme + DOT 5.1 yüksek kaynama noktası.
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass p-6 sm:p-8 mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
                  Etkileşimli — Kinetik Enerji Hesaplayıcı
                </span>
                <h3 className="mt-1 h-display text-lg font-semibold text-white">
                  E = ½ m v² — frenleme anında diske aktarılan ısı yükü
                </h3>
              </div>
              <span className="rounded border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-carbon-300">
                m = 260 kg (sürücü dahil)
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-12 mt-6">
              <div className="lg:col-span-5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-electric-cyan font-bold block">
                  Sürat seçimi
                </label>
                <div className="mt-3 text-5xl font-display font-semibold tracking-tightest text-white">
                  {speed}
                  <span className="ml-1 text-base font-mono text-carbon-300">km/h</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={180}
                  step={5}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="mt-5 w-full accent-electric-cyan"
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-carbon-400">
                  <span>40</span><span>110</span><span>180</span>
                </div>
              </div>
              <div className="lg:col-span-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
                  <div className="font-mono text-[10px] uppercase text-carbon-400">Kinetik Enerji</div>
                  <div className="mt-2 h-display text-2xl font-semibold text-white">
                    {energyKJ.toFixed(1)} <span className="text-sm text-carbon-300">kJ</span>
                  </div>
                  <div className="mt-1 text-[11px] text-carbon-300">Diske aktarılan ısı yükü</div>
                </div>
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4">
                  <div className="font-mono text-[10px] uppercase text-red-400">Stok Sistem</div>
                  <div className="mt-2 h-display text-2xl font-semibold text-white">
                    {stockStop.toFixed(1)} <span className="text-sm text-carbon-300">m</span>
                  </div>
                  <div className="mt-1 text-[11px] text-carbon-300">Durma mesafesi (kuru asfalt)</div>
                </div>
                <div className="rounded-xl border border-electric-cyan/30 bg-electric-cyan/[0.05] p-4">
                  <div className="font-mono text-[10px] uppercase text-electric-cyan">Yükseltilmiş</div>
                  <div className="mt-2 h-display text-2xl font-semibold text-white">
                    {upgradeStop.toFixed(1)} <span className="text-sm text-carbon-300">m</span>
                  </div>
                  <div className="mt-1 text-[11px] text-carbon-300">RPD/Brembo + sinter + çelik hortum</div>
                </div>
              </div>
            </div>
            <p className="mt-5 text-[11px] text-carbon-400 font-mono">
              * Yaklaşık değerler. Kuru zemin, sürücü + scooter ortalama 260 kg, ABS aktif.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 space-y-4">
            <h3 className="h-display text-lg font-semibold text-white">
              Saha ölçüm — Durma mesafesi karşılaştırması
            </h3>
            <div className="space-y-3">
              {STOPPING_DATA.map((row) => (
                <div
                  key={row.label + row.sub}
                  className={cn(
                    "rounded-2xl border p-4 sm:p-5",
                    row.highlight
                      ? "border-electric-cyan/30 bg-electric-cyan/[0.04]"
                      : "border-white/[0.06] bg-white/[0.015]",
                  )}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <div className="h-display text-base font-semibold text-white">{row.label}</div>
                      <div className="text-[11px] text-carbon-300">{row.sub}</div>
                    </div>
                    <div className="flex items-baseline gap-3 font-mono">
                      <span className="text-[10px] uppercase text-carbon-400">İyileşme</span>
                      <span className="text-electric-cyan font-semibold">
                        −%{row.pct} <span className="text-carbon-300">({row.delta})</span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-carbon-300">
                        <span>Stok</span>
                        <span className="text-white">{row.stock} m</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
                        <div
                          className="h-full bg-gradient-to-r from-red-500/80 to-electric-ember/80"
                          style={{ width: `${(row.stock / 55) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="hidden sm:block h-6 w-px bg-white/10" />
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-carbon-300">
                        <span>RPD / Brembo</span>
                        <span className="text-white">{row.upgrade} m</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
                        <div
                          className="h-full bg-gradient-to-r from-electric-cyan to-yamaha-400"
                          style={{ width: `${(row.upgrade / 55) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24 space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
              Bölüm 02 — Etkileşimli Kaliper Karşılaştırma
            </span>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Brembo M4 / GP4-RX / RPD Blitz / P2 34G — hangi kaliper, hangi sürüş için?
            </h2>
            <p className="text-sm leading-relaxed text-carbon-200 max-w-3xl">
              Kaliper seçimi sadece piston sayısı değildir — gövde imalat yöntemi (döküm vs monoblok
              vs CNC bilet), piston çapı ve aks aralığı dozajlama hissini doğrudan belirler. Aşağıdaki
              karşılaştırma laboratuvarında her birini incele:
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 border-b border-white/[0.08] pb-4">
            {CALIPERS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCaliperId(c.id)}
                className={cn(
                  "relative px-3 py-3 text-xs font-semibold rounded-xl transition-all border text-center leading-tight",
                  caliperId === c.id
                    ? "bg-electric-cyan/15 text-electric-cyan border-electric-cyan/40 shadow-ambient-blue"
                    : "text-carbon-300 hover:text-white border-white/[0.06] bg-white/[0.015]",
                )}
              >
                {c.editorPick && (
                  <span className="absolute -top-1.5 -right-1.5 rounded-full bg-electric-cyan text-ink-950 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider font-bold">
                    ★
                  </span>
                )}
                {c.id === "zenith"
                  ? "RPD Zenith"
                  : c.brand.split(" ").slice(0, 2).join(" ")}
                <span className="block mt-1 text-[9px] font-mono text-carbon-400 uppercase tracking-widest">
                  {c.role}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass gradient-edge p-6 sm:p-8 mt-4">
            {caliper.editorPick && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-electric-cyan/40 bg-electric-cyan/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-electric-cyan">
                <span aria-hidden>★</span> Editör Tercihi — Türkiye&apos;de en sık tercih edilen RPD seti
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start">
              {/* Left: Image */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={caliper.image}
                  alt={`${caliper.brand} ürün görseli`}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-electric-cyan/0 via-electric-cyan/0 to-electric-cyan/10"
                  aria-hidden
                />
              </div>

              {/* Right: Details */}
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
                  <div>
                    <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-electric-cyan">
                      {caliper.role}
                    </span>
                    <h3 className="mt-3 h-display text-2xl font-semibold text-white leading-tight">
                      {caliper.brand}
                    </h3>
                    <p className="mt-2 text-xs text-carbon-300 leading-relaxed">{caliper.note}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 mt-5">
                  <div className="glass-quiet p-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-electric-cyan font-bold block">
                      Gövde
                    </span>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-carbon-200">{caliper.body}</p>
                  </div>
                  <div className="glass-quiet p-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-electric-cyan font-bold block">
                      Piston
                    </span>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-carbon-200">{caliper.pistons}</p>
                  </div>
                  <div className="glass-quiet p-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-electric-cyan font-bold block">
                      Aks
                    </span>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-carbon-200">{caliper.pitch}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2.5 pt-4 border-t border-white/[0.06]">
                  {[
                    { k: "Gövde Rijitliği", v: caliper.stiffness },
                    { k: "Isırma Gücü", v: caliper.bite },
                    { k: "Dozajlama Hassasiyeti", v: caliper.mod },
                    { k: "Fade Direnci", v: caliper.fade },
                  ].map((m) => (
                    <div key={m.k}>
                      <div className="flex justify-between text-[10px] font-mono text-carbon-300 mb-1">
                        <span>{m.k}</span>
                        <span className="text-white font-bold">{m.v}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-all duration-500"
                          style={{ width: `${m.v}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-electric-cyan/20 bg-electric-cyan/[0.04] p-3 flex gap-2">
                  <Info className="h-4 w-4 text-electric-cyan shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-carbon-200">
                    <strong className="text-electric-cyan">En uygun:</strong> {caliper.use}. {caliper.feel}.
                  </p>
                </div>
              </div>
            </div>

            {/* YouTube embed only when caliper has a videoId */}
            {caliper.videoId && (
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="grid size-7 place-items-center rounded-lg bg-red-500/10 text-red-400">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-carbon-300 font-bold">
                    Saha videosu — RPD Zenith XMAX kurulumu
                  </span>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${caliper.videoId}?rel=0`}
                    title={`${caliper.brand} — saha videosu`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-carbon-300">
                  XMAX&apos;e gerçek kurulum referansı. Set içerisinde radyal ön kaliper, eksenel arka
                  kaliper, maşa adaptörleri ve montaj donanımları bulunur.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <section className="mt-24 space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
              Bölüm 03 — Master Silindir Mühendisliği
            </span>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              RCS 14 / 15 / 17 / 19 — yanlış piston çapı = patlamış manet hissi.
            </h2>
            <p className="text-sm leading-relaxed text-carbon-200 max-w-3xl">
              Hidrolik basınç <strong className="text-white">P = F / A</strong>. Manete uyguladığınız
              kuvvet kaliper toplam piston hacmine doğru orantılı olarak iletilir. Yanlış piston çapı
              ya sünger his ya da duvar hissi yaratır — XMAX modeline göre doğru seçim:
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-white/[0.08] pb-4">
            {MASTER_CYLINDERS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMasterId(m.id)}
                className={cn(
                  "px-3 py-3 text-xs font-semibold rounded-xl transition-all border text-center",
                  masterId === m.id
                    ? m.warning
                      ? "bg-red-500/15 text-red-300 border-red-500/40"
                      : "bg-electric-cyan/15 text-electric-cyan border-electric-cyan/40 shadow-ambient-blue"
                    : "text-carbon-300 hover:text-white border-white/[0.06] bg-white/[0.015]",
                )}
              >
                {m.name.replace("Brembo ", "")}
                <span className="block mt-0.5 text-[10px] font-mono text-carbon-400">{m.bore}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className={cn(
              "glass gradient-edge p-6 sm:p-8 mt-4",
              master.warning && "border-red-500/30",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
              <div>
                {master.warning && (
                  <span className="inline-flex items-center gap-1.5 rounded border border-red-500/40 bg-red-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-red-300 mb-2">
                    <ShieldAlert className="h-3 w-3" /> Tek diskte yasak
                  </span>
                )}
                <h3 className="h-display text-2xl font-semibold text-white">
                  {master.name}{" "}
                  <span className="text-sm font-mono text-electric-cyan">({master.bore} bore)</span>
                </h3>
                <p className="mt-1 text-xs text-carbon-300">{master.target}</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono text-carbon-400 uppercase tracking-widest block">
                  SKU
                </span>
                <span className="text-xs text-white font-mono">{master.sku}</span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-carbon-200">{master.profile}</p>
            <p className="mt-2 text-xs text-electric-cyan font-mono">
              <strong>Eşleşme:</strong> {master.pair}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 mt-6 pt-6 border-t border-white/[0.06]">
              <div className="glass-quiet p-4">
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
                  Avantajları
                </h4>
                <ul className="mt-3 space-y-2">
                  {master.pros.map((p) => (
                    <li key={p} className="flex gap-2 text-xs text-carbon-200">
                      <span className="text-emerald-400 shrink-0 font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-quiet p-4">
                <h4
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-widest font-bold",
                    master.warning ? "text-red-400" : "text-yamaha-300",
                  )}
                >
                  {master.warning ? "Risk Profili" : "Dezavantajları"}
                </h4>
                <ul className="mt-3 space-y-2">
                  {master.cons.map((c) => (
                    <li key={c} className="flex gap-2 text-xs text-carbon-200">
                      <span
                        className={cn(
                          "shrink-0 font-bold",
                          master.warning ? "text-red-400" : "text-yamaha-300",
                        )}
                      >
                        ✗
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24 space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
              Bölüm 04 — Disk Teknolojisi
            </span>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Floating disk — ısındığında çarpılmayan diskin sırrı.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: Disc,
              tint: "bg-electric-cyan/10 text-electric-cyan",
              title: "RPD Front Floating Disc V2",
              sku: "71100-B7477-300F",
              image: "/brakes/rpd-front-disc.svg",
              alt: "RPD Front Floating Disc V2 300 mm",
              desc: (
                <>
                  300 mm Ø yüzer disk · 4.5 mm kalınlık. Sürtünme yüzeyi ısıl işlemli paslanmaz çelik,
                  göbek uçak sınıfı alüminyum alaşım. <strong className="text-white">Bobbins</strong>{" "}
                  adı verilen yüzer pimler diski radyal serbestlikte tutar — ısı ile genleştiğinde
                  bükülmez.
                </>
              ),
              footerLeft: "Stok",
              footerRight: "267 mm → 300 mm (+33 mm)",
            },
            {
              icon: Wind,
              tint: "bg-electric-violet/10 text-electric-violet",
              title: "Brembo Serie Oro Floating",
              sku: "78B408A9 (XMAX 400 çift)",
              image: "/brakes/brembo-serie-oro.svg",
              alt: "Brembo Serie Oro Floating disk",
              desc: (
                <>
                  267 mm Ø · 5.0 mm kalınlık. Stok çapı korurken malzeme ve floating yapı sayesinde
                  termal kapasiteyi <strong className="text-white">3 katına</strong> çıkarır.
                  XMAX 400 çift disk sistemi için ABS pulu-uyumlu, dengeli ısı tahliyesi.
                </>
              ),
              footerLeft: "Stok",
              footerRight: "Aynı çap, yarış sınıfı malzeme",
            },
            {
              icon: Activity,
              tint: "bg-electric-ember/10 text-electric-ember",
              title: "RPD Rear Disc Rotor",
              sku: "71100-B7477-RS245",
              image: "/brakes/rpd-rear-disc.svg",
              alt: "RPD Rear Disc Rotor 245 mm",
              desc: (
                <>
                  245 mm Ø · 4.0 mm kalınlık · karbon-çelik alaşım. İki kişi ve yüklü seyahatlerde
                  arka frenin şişmesini engeller. Tornado tasarımlı kanallar balata tozunu tahliye
                  ederken havayı diskin içine yönlendirir.
                </>
              ),
              footerLeft: "Aşınma direnci",
              footerRight: "+%40 balata ömrü",
            },
          ].map((d, i) => (
            <Reveal key={d.title} delay={0.05 + i * 0.05}>
              <div className="glass h-full overflow-hidden flex flex-col">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent border-b border-white/[0.06]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.image}
                    alt={d.alt}
                    className="absolute inset-0 w-full h-full object-contain"
                    loading="lazy"
                  />
                  <span
                    className={cn(
                      "absolute top-3 left-3 grid size-9 place-items-center rounded-xl border border-white/[0.08] backdrop-blur-md",
                      d.tint,
                    )}
                  >
                    <d.icon className="size-4" />
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="h-display text-lg font-semibold text-white">{d.title}</h3>
                  <p className="mt-1 text-[10px] font-mono text-carbon-400">{d.sku}</p>
                  <p className="mt-3 text-xs leading-relaxed text-carbon-200">{d.desc}</p>
                  <div className="mt-auto pt-4 border-t border-white/[0.06] flex justify-between text-[11px] font-mono">
                    <span className="text-carbon-300">{d.footerLeft}</span>
                    <span className="text-electric-cyan">{d.footerRight}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.04] p-5 flex gap-3">
            <CircleAlert className="h-6 w-6 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-yellow-200">ABS Sensör Hizalama</h4>
              <p className="mt-1 text-xs leading-relaxed text-carbon-200">
                Disk çapı büyütüldüğünde ABS okuyucu pulun (grid ring) diş aralığı ve sensör mesafesi
                korunmalıdır. Sensör ile pul arası boşluk{" "}
                <strong className="text-yellow-200">0.8 mm – 1.2 mm</strong> aralığında olmalıdır.
                Aksi halde ABS arıza kodu vererek devre dışı kalır.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24 space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
              Bölüm 05 — Hidrolik İletim
            </span>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Çelik örgü hortumlar &amp; Yamaha ABS jumper hava alma prosedürü.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {HOSE_BRANDS.map((h, i) => (
            <Reveal key={h.name} delay={i * 0.06}>
              <div className="glass gradient-edge h-full overflow-hidden flex flex-col">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent border-b border-white/[0.06]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={h.image}
                    alt={`${h.name} çelik örgü fren hortumu`}
                    className="absolute inset-0 w-full h-full object-contain"
                    loading="lazy"
                  />
                  {h.badge && (
                    <span className="absolute top-3 right-3 rounded-full border border-electric-cyan/40 bg-electric-cyan/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-electric-cyan backdrop-blur-md">
                      {h.badge}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="h-display text-lg font-semibold text-white">{h.name}</h3>
                  <p className="mt-1 text-[10px] font-mono text-carbon-400">{h.origin}</p>
                  <p className="mt-4 text-xs leading-relaxed text-carbon-200">{h.construction}</p>
                  <div className="mt-5 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div>
                      <span className="text-carbon-400 block">Sürekli basınç</span>
                      <span className="text-white">{h.pressure}</span>
                    </div>
                    <div>
                      <span className="text-carbon-400 block">Patlama basıncı</span>
                      <span className="text-white">{h.burst}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-[11px] italic text-carbon-300 leading-relaxed">{h.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="glass p-6 sm:p-8 mt-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-yamaha-500/10 text-yamaha-300">
                <Wifi className="size-5" />
              </span>
              <h3 className="h-display text-xl font-semibold text-white">
                Yamaha ABS Jumper Kablo Yöntemi — modülatör içi mikro hava tahliyesi
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-carbon-200">
              ABS modülatörü içindeki mikro elektro-valflerde ve geri dönüş pompası odacıklarında
              kalan hava kabarcıkları, klasik pompalama ile sistemden atılamaz. Yamaha servis
              teşhis yazılımı olmadan atölyelerde uygulanan en güvenilir manuel prosedür:
            </p>

            <ol className="mt-6 space-y-3">
              {[
                "Klasik yöntemle (manet sık, kaliper rekorunu aç/kapa) ana hatlardaki kaba hava tamamen boşaltılır ve manette geçici basınç oluşturulur.",
                "ABS modülatör soketinin koruyucu kapağı çıkarılır. Konnektör içindeki iki kritik terminal (genellikle mavi tel ile siyah telin bağlandığı pinler) bir jumper kablosu veya ataş yardımıyla köprülenir.",
                "Ön ve arka fren manetleri aynı anda sonuna kadar sıkıca tutulur.",
                "Kontak anahtarı 'ON' konumuna alınır. ABS modülatör motoru ~5-10 saniye sesli çalışarak hidrolik sıvıyı dahili valfler arasında sirküle eder.",
                "Bu sirkülasyon valf odacıklarındaki gizli hava kabarcıklarını ana hatta iter. Kontak kapatılır, jumper sökülür.",
                "Son adım: kaliper rekorlarından vakum pompası veya manuel yöntemle hava tekrar alınır. Kabarcıksız, temiz sıvı gelene kadar tekrar edilir.",
              ].map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-electric-cyan/10 font-mono text-xs font-bold text-electric-cyan">
                    {i + 1}
                  </span>
                  <span className="text-xs leading-relaxed text-carbon-200">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="mt-24 space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
              Bölüm 06 — Balata Compound Mühendisliği
            </span>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Sürtünme katsayısı (µ), aşınma ve ısı dayanım dengesi.
            </h2>
            <p className="text-sm leading-relaxed text-carbon-200 max-w-3xl">
              Balata bileşimi sistemin sürtünme katsayısını, aşınma hızını ve termal limitini
              belirler. Sert sinter balatalar yumuşak stok diskte dairesel oyuklar (scoring)
              yaratır — performans balatası mutlaka kaliteli ısıl işlemli diskle eşleştirilmelidir.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAD_COMPOUNDS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className="glass p-5 h-full flex flex-col">
                <h3 className="h-display text-base font-semibold text-white leading-tight">
                  {p.name}
                </h3>
                <p className="mt-1 text-[10px] font-mono text-carbon-400">{p.compound}</p>

                <div className="mt-5">
                  <div className="flex justify-between text-[10px] font-mono text-carbon-300 mb-1.5">
                    <span>Sürtünme µ</span>
                    <span className="text-white font-bold">{p.mu.toFixed(2)}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className={cn("h-full bg-gradient-to-r", p.color)}
                      style={{ width: `${(p.mu / 0.6) * 100}%` }}
                    />
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-carbon-300 leading-relaxed">{p.wetDry}</p>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200 border-t border-white/[0.06] pt-3">
                  {p.use}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 flex gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-emerald-200">
                İdeal kombinasyon: RPD 300 mm Floating + Brembo XS veya EBC HH
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-carbon-200">
                Yüzer disk yapısı sinter balatanın uyguladığı yüksek termal yük altında diskin
                serbestçe genleşmesini sağlar (bükülme yok). Paslanmaz çelik alaşım yüzey ise sinter
                balatanın aşındırıcı gücüne karşı sınıfının en iyi direncini gösterir.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24 space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
              Bölüm 07 — Hidrolik Sıvı Termal Karakteristik
            </span>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              DOT 4 vs DOT 5.1 — ve yarış sıvılarının kaynama noktası savaşı.
            </h2>
            <p className="text-sm leading-relaxed text-carbon-200 max-w-3xl">
              <strong className="text-white">DOT 5 (silikon) ASLA kullanılmaz</strong> — sistem
              contalarını eritir. DOT 4 ve DOT 5.1 glikol-eter bazlıdır ve birbirine karıştırılabilir.
              Kuru ve ıslak kaynama noktası karşılaştırması:
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="glass p-6 sm:p-8">
            <div className="space-y-5">
              {FLUIDS.map((f) => (
                <div key={f.name} className="grid gap-3 sm:grid-cols-[180px_1fr_auto] sm:items-center">
                  <div>
                    <div className="h-display text-sm font-semibold text-white">{f.name}</div>
                    <div className="text-[10px] font-mono text-carbon-400">Kuru / Islak (°C)</div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-carbon-300 mb-1">
                        <span>Kuru kaynama</span>
                        <span className="text-white font-bold">{f.dry}°C</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className={cn("h-full opacity-90", f.color)}
                          style={{ width: `${(f.dry / 340) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-carbon-300 mb-1">
                        <span>Islak (nem %3.7)</span>
                        <span className="text-white font-bold">{f.wet}°C</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className={cn("h-full opacity-50", f.color)}
                          style={{ width: `${(f.wet / 340) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-carbon-300 leading-relaxed sm:max-w-[220px]">
                    {f.use}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 flex gap-3">
              <Thermometer className="h-5 w-5 text-electric-cyan shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-carbon-200">
                <strong className="text-electric-cyan">Bakım kuralı:</strong> Glikol-eter bazlı tüm
                fren hidrolikleri higroskopiktir — nem emer. Yarış ve agresif sokak kurulumlarında
                yılda bir defa, normal sürüşte ise iki yılda bir komple sıvı değişimi şarttır.
                Hazne maksimum çizgisinin hemen altında tutulur — ısınınca genleşme payı kalmalıdır.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24 space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
              Bölüm 08 — Model Bazlı Komple Fren Reçeteleri
            </span>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Parça parça SKU&apos;ları, ölçüleri ve hidrolik dengesi kurulmuş üç eksiksiz kurulum.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto">
            {([
              { id: "300" as const, label: "XMAX 250/300 Sokak" },
              { id: "400" as const, label: "XMAX 400 Çift Disk" },
              { id: "race" as const, label: "XMAX 300 Pist" },
            ]).map((t) => (
              <button
                key={t.id}
                onClick={() => setRecipeKey(t.id)}
                className={cn(
                  "px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                  recipeKey === t.id
                    ? "bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/30 shadow-ambient-blue"
                    : "text-carbon-300 hover:text-white border border-transparent",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass gradient-edge p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
              <div>
                <span className="text-[9px] font-mono text-electric-cyan uppercase tracking-widest block font-bold">
                  Reçete Adı
                </span>
                <h3 className="mt-1 h-display text-xl font-semibold text-white">{recipe.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-carbon-200 max-w-2xl">
                  {recipe.subtitle}
                </p>
              </div>
              <div className="text-right">
                <div className="rounded border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-electric-cyan">
                  Odak: {recipe.focus}
                </div>
                <div className="mt-2 text-[10px] font-mono text-carbon-300">
                  {recipe.totalCost}
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-white/[0.06]">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-electric-cyan">
                    <th className="px-4 py-3">Bileşen</th>
                    <th className="px-4 py-3">Parça</th>
                    <th className="px-4 py-3">Teknik</th>
                    <th className="px-4 py-3">SKU</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs text-carbon-200">
                  {recipe.parts.map((p) => (
                    <tr key={p.group + p.part} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-carbon-300">
                        {p.group}
                      </td>
                      <td className="px-4 py-3 font-semibold text-white">{p.part}</td>
                      <td className="px-4 py-3">{p.spec}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-electric-cyan">{p.sku}</td>
                    </tr>
                  ))}
                  <tr className="bg-electric-cyan/[0.04]">
                    <td className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-electric-cyan">
                      Hidrolik
                    </td>
                    <td colSpan={3} className="px-4 py-3 text-white font-semibold">
                      {recipe.fluid}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl border border-electric-cyan/20 bg-electric-cyan/[0.04] p-4 flex gap-3">
              <Zap className="h-5 w-5 text-electric-cyan shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-mono text-electric-cyan uppercase tracking-widest font-bold block">
                  Kurulum sonrası manet karakteri
                </span>
                <p className="mt-1 text-xs text-white font-medium leading-relaxed">
                  {recipe.brakeFeel}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24 space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
              Bölüm 09 — Montaj Mühendisliği
            </span>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Kritik tork değerleri ve montaj toleransları.
            </h2>
            <p className="text-sm leading-relaxed text-carbon-200 max-w-3xl">
              CNC kaliper braketleri (adaptörler) uçak sınıfı{" "}
              <strong className="text-white">7075-T6 veya 6061-T8</strong> alüminyumdan işlenmiş
              olmalıdır. Yetersiz rijitlikteki döküm braketler yüksek tork altında bükülerek kaliper
              eksenini kaçırır, balatalar düzensiz aşınır ve ani fren gücü kayıpları yaşanır.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-ink-950/40 backdrop-blur-md">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-electric-cyan">
                  <th className="px-4 py-4">Bağlantı Noktası</th>
                  <th className="px-4 py-4">Civata Tipi</th>
                  <th className="px-4 py-4">Sıkma Torku</th>
                  <th className="px-4 py-4">Notlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs text-carbon-200">
                {TORQUE_TABLE.map((row) => (
                  <tr key={row.joint} className="hover:bg-white/[0.01]">
                    <td className="px-4 py-4 font-semibold text-white">{row.joint}</td>
                    <td className="px-4 py-4 font-mono">{row.bolt}</td>
                    <td className="px-4 py-4 font-mono text-electric-cyan font-semibold">
                      {row.torque}
                    </td>
                    <td className="px-4 py-4">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <div className="glass p-5">
              <div className="flex items-center gap-2">
                <Cog className="h-4 w-4 text-electric-cyan" />
                <h4 className="text-sm font-semibold text-white">Kaliper hizalama toleransı</h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                Kaliper diskin merkez hattına simetrik yerleştirilmeli. İki yandaki piston çıkış
                farkı maksimum <strong className="text-white">0.6 mm</strong>. Disk dış çapı ile
                kaliper iç köprüsü arası nominal boşluk{" "}
                <strong className="text-white">2.5 mm</strong>.
              </p>
            </div>
            <div className="glass p-5">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-electric-cyan" />
                <h4 className="text-sm font-semibold text-white">Banjo civata pulları</h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                Her hidrolik hortum montajında banjo civatasının iki yanına mutlaka{" "}
                <strong className="text-white">sıfır bakır veya alüminyum pul</strong> konulmalıdır.
                Tekrar kullanılmış ezilmiş pul = uzun vadede sızıntı.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24 space-y-6">
        <Reveal>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan">
              Bölüm 10 — Kurulum Sonrası
            </span>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Bedding-in (rodaj) ve sürüş güvenliği önerileri.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 h-full">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
                <h4 className="text-sm font-semibold text-emerald-200">
                  Sinterlenmiş balata bedding-in protokolü
                </h4>
              </div>
              <ol className="mt-4 space-y-2 text-xs leading-relaxed text-carbon-200 list-decimal list-inside marker:text-emerald-400 marker:font-mono">
                <li>Yeni disk + balata montajından sonra ilk 100 km boyunca sert frenleme yok.</li>
                <li>Orta şiddette ardışık 8-10 frenleme: 70 km/h → 20 km/h, sonra tam durmadan.</li>
                <li>Disk ile balatanın aşamalı uyumu için bu döngü iki kez tekrarlanır.</li>
                <li>İlk 200 km sonunda µ tam stabilize olur, durdurma gücü %20 daha artar.</li>
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-yamaha-500/20 bg-yamaha-500/[0.04] p-6 h-full">
              <div className="flex items-center gap-3">
                <Wrench className="h-6 w-6 text-yamaha-300" />
                <h4 className="text-sm font-semibold text-yamaha-200">
                  Hidrolik hazne montaj kuralları
                </h4>
              </div>
              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-carbon-200">
                <li>
                  <strong className="text-white">Diyafram montajı:</strong> Kıvrılmadan, düzgün
                  oturmalı — dış nemin sıvıyla temasını tamamen keser.
                </li>
                <li>
                  <strong className="text-white">Maksimum çizgi:</strong> Asla tam doldurma.
                  Genleşme payı kalmazsa kaliper kendi kendine kilitlenebilir.
                </li>
                <li>
                  <strong className="text-white">Minimum çizgi:</strong> Altına düşürme — sert
                  frenlemede sistem hava emer.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5 flex gap-3 mt-6">
            <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-red-200">Hayati kurulum uyarısı</h4>
              <p className="mt-1 text-xs leading-relaxed text-carbon-200">
                Eksenel maşa bacaklarına radyal Brembo kaliper bağlanırken{" "}
                <strong className="text-red-200">
                  döküm veya düşük kalite alüminyum braket
                </strong>{" "}
                kullanılmamalıdır. Yüksek tork altında bükülür, kaliper ekseni kaçar, balata
                düzensiz aşınır ve frenleme sırasında pulsasyon → ani güç kaybı yaşanır. Sadece CNC
                işlenmiş, sertifikalı 7075-T6 / 6061-T8 alaşım braketler kullanın.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24">
        <Reveal>
          <div className="glass p-8 sm:p-12 relative overflow-hidden">
            <div
              className="pointer-events-none absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-electric-cyan/10 blur-[120px]"
              aria-hidden
            />
            <div className="pointer-events-none absolute -bottom-20 left-0 h-[300px] w-[300px] rounded-full bg-electric-violet/10 blur-[120px]" aria-hidden />
            <div className="relative">
              <span className="chip">
                <Gauge className="size-3.5 text-electric-cyan" />
                Sonuç
              </span>
              <h2 className="mt-4 h-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Fren, sürüşün <span className="text-electric">en sessiz performans bileşenidir.</span>
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-carbon-200">
                Motor modifikasyonu duyulur, varyatör hissedilir — fren sistemi sadece bir saniye
                lazım olduğunda fark edilir. Doğru kaliper-master-hortum-balata-hidrolik dengesi
                kurulduğunda XMAX, 100&apos;den sıfıra ardışık beşinci frenlemede dahi ilk
                frenlemedeki performansını korur. Bu sayfadaki reçeteler, doğru tork değerleri ve
                ABS jumper prosedürüyle birleştiğinde sürücünüze cerrahi hassasiyette bir durma
                kontrolü sunar.
              </p>
              <p className="mt-3 text-xs text-carbon-300 font-mono">
                Mühendislik notları PDF kütüphane referansı + sokak/pist deneyimi sentezidir.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
