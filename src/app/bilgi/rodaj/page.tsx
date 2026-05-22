"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Atom,
  Check,
  ChevronRight,
  CircleDot,
  Cog,
  Droplets,
  FlaskConical,
  Flame,
  Gauge,
  Layers,
  Microscope,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Thermometer,
  Timer,
  Wind,
  Wrench,
  X,
  Zap
} from "lucide-react";
import { cn } from "@/lib/cn";

type ModelKey = "250" | "300";

type Tone = "cyan" | "amber" | "emerald" | "rose";

interface RpmZone {
  label: string;
  from: number;
  to: number;
  tone: Tone;
  description: string;
}

interface Phase {
  id: string;
  index: number;
  km: string;
  kmFrom: number;
  kmTo: number;
  title: string;
  tagline: string;
  tone: Tone;
  icon: typeof Gauge;
  rpmSafe: [number, number];
  rpmCeiling: number;
  throttle: string;
  goal: string;
  mechanics: string;
  dos: string[];
  donts: string[];
}

interface ModelSpec {
  key: ModelKey;
  name: string;
  displacement: string;
  bore: string;
  stroke: string;
  compression: string;
  engineOil: string;
  gearOil: string;
  recommendedOil: string;
  rpmRedline: number;
  rpmBreakInCeiling: number;
  signature: string;
}

interface Concept {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Microscope;
  tone: Tone;
  summary: string;
  detail: string;
  metric: { label: string; value: string };
}

interface Mistake {
  id: string;
  title: string;
  icon: typeof AlertTriangle;
  consequence: string;
  chain: string[];
}

const TONE_STYLES: Record<
  Tone,
  {
    text: string;
    accent: string;
    bgSoft: string;
    border: string;
    ring: string;
    bar: string;
    chip: string;
    glow: string;
  }
> = {
  cyan: {
    text: "text-electric-cyan",
    accent: "from-cyan-400/80 via-cyan-300/40 to-transparent",
    bgSoft: "bg-cyan-400/[0.06]",
    border: "border-cyan-400/30",
    ring: "ring-cyan-400/30",
    bar: "bg-gradient-to-r from-cyan-400 to-sky-300",
    chip: "bg-cyan-400/10 text-cyan-200 border-cyan-400/25",
    glow: "shadow-[0_0_60px_-15px_rgba(34,211,238,0.45)]"
  },
  amber: {
    text: "text-amber-300",
    accent: "from-amber-400/80 via-amber-300/40 to-transparent",
    bgSoft: "bg-amber-400/[0.07]",
    border: "border-amber-400/35",
    ring: "ring-amber-400/30",
    bar: "bg-gradient-to-r from-amber-400 to-orange-400",
    chip: "bg-amber-400/10 text-amber-200 border-amber-400/30",
    glow: "shadow-[0_0_60px_-15px_rgba(245,158,11,0.45)]"
  },
  emerald: {
    text: "text-emerald-300",
    accent: "from-emerald-400/80 via-emerald-300/40 to-transparent",
    bgSoft: "bg-emerald-400/[0.06]",
    border: "border-emerald-400/30",
    ring: "ring-emerald-400/30",
    bar: "bg-gradient-to-r from-emerald-400 to-teal-300",
    chip: "bg-emerald-400/10 text-emerald-200 border-emerald-400/25",
    glow: "shadow-[0_0_60px_-15px_rgba(16,185,129,0.45)]"
  },
  rose: {
    text: "text-rose-300",
    accent: "from-rose-400/80 via-rose-300/40 to-transparent",
    bgSoft: "bg-rose-500/[0.07]",
    border: "border-rose-500/40",
    ring: "ring-rose-400/35",
    bar: "bg-gradient-to-r from-rose-500 to-orange-400",
    chip: "bg-rose-500/10 text-rose-200 border-rose-500/30",
    glow: "shadow-[0_0_60px_-15px_rgba(244,63,94,0.45)]"
  }
};

const PHASES: Phase[] = [
  {
    id: "p1",
    index: 1,
    km: "0 – 150 km",
    kmFrom: 0,
    kmTo: 150,
    title: "İlk Alışma & Silikon Arındırma",
    tagline: "Lastik mumu, fren rodajı, ilk termal döngü.",
    tone: "cyan",
    icon: CircleDot,
    rpmSafe: [2500, 4000],
    rpmCeiling: 4000,
    throttle: "Yarım gazdan az — yumuşak açış",
    goal:
      "Lastik koruyucu mum/silikon tabakasının aşındırılması, CVT V-Belt kalıp ayırıcı kimyasalının temizlenmesi ve yeni fren disk/balata yüzey pürüzlülük profilinin eşitlenmesi.",
    mechanics:
      "Dunlop Scoot Smart muadili OEM lastiklerin üretim kalıbından çıkarken kullanılan koruyucu mum, lastik hamurunun pürüzlü tutunma karakterine kavuşmasını engeller. Aynı zamanda yeni V-Belt'in yanak açıları varyatör kasnak yanaklarıyla mikroskopik düzeyde henüz örtüşmez; sert kalkış 'hourglassing' (bölgesel daralma) yaratır.",
    dos: [
      "Maks. 4000 RPM, yumuşak gaz tepkileri",
      "Kademeli ve kısa süreli kompresyonlu frenler",
      "Lastik hamurunu kademeli ısıt — dik açı yok",
      "Düz, kuru asfaltta dingin sürüş"
    ],
    donts: [
      "Sert kalkış (hard launch) — kayışı camlaştırır",
      "Sert ve uzun frenleme — balata reçinesi sıvanır",
      "Islak zeminde yatış denemesi",
      "Ani serpme manevra"
    ]
  },
  {
    id: "p2",
    index: 2,
    km: "150 – 500 km",
    kmFrom: 150,
    kmTo: 500,
    title: "Altın Devir & Değişken Yük",
    tagline: "Segman alıştırma — silisyum kristallerine plato.",
    tone: "cyan",
    icon: Activity,
    rpmSafe: [3000, 4500],
    rpmCeiling: 4500,
    throttle: "Değişken — yarım gaza kadar dalgalı",
    goal:
      "Piston segmanlarının DiASil silindirdeki silisyum kristal tepelerine oturarak 'plato yüzeyi' oluşturması. Bu aşama rodajın metalurjik çekirdeğidir.",
    mechanics:
      "Segmanları silindir duvarına bastıran asıl kuvvet, mekanik yay tansiyonu değil yanma odasındaki kompresyon gaz basıncıdır (P_gas). Sabit düşük devirde yanma basıncı düşük kalır, segmanlar bastırılamaz; kurum ve yağ mikroskopik vadileri doldurarak silindiri camlaştırır (glazing). 'Değişken Devir & Değişken Yük' bu basıncı dalgalandırır, silis kristalleri pürüzsüzce işlenir.",
    dos: [
      "3000 – 4500 RPM aralığında dalgalı sürüş",
      "Gaz kes, motor freniyle yavaşla (vakum etkisi)",
      "Sert + tatlı ivmelenme karıştır",
      "Hafif yükte kısa rampalardan istifade et"
    ],
    donts: [
      "Otoyolda sabit 90 km/s ile gitmek",
      "Üçte üç gazdan fazla açmak",
      "Tam kapalı şehir trafiğinde sürünmek",
      "Arkaya artçı yolcu almak"
    ]
  },
  {
    id: "p3",
    index: 3,
    km: "500 – 1000 km",
    kmFrom: 500,
    kmTo: 1000,
    title: "Kademeli Yük Artışı & Termal Döngü",
    tagline: "İç streslerin tahliyesi, plato yüzey cilası.",
    tone: "cyan",
    icon: Thermometer,
    rpmSafe: [3500, 5000],
    rpmCeiling: 5000,
    throttle: "Üçte iki gaza kadar — kademeli",
    goal:
      "Termal döngü (thermal cycling) ile dövme alüminyum piston ve dövme krank milindeki imalat artığı iç streslerin moleküler düzeyde dengelenmesi. Plato yüzeyinin son cilası.",
    mechanics:
      "Yeni dökülmüş, işlenmiş ve birleştirilmiş metal alaşımlarda iç residual stress vardır. Motorun 90-100°C çalışma sıcaklığına çıkıp, ardından tamamen ortam sıcaklığına soğuması bu stresleri kademeli giderir. 20-30 dakikalık periyotlar + tam soğuma; piston ovalleşmesini ve kalıcı deformasyonu engeller.",
    dos: [
      "20-30 dk sürüş + tam soğuma seansları",
      "Kısa süreli 5000 RPM denemeleri",
      "Dinamik şehir içi sürüş ve sürekli devir değişimi",
      "Kompresyonlu (motor freni) yavaşlama"
    ],
    donts: [
      "3 saatlik kesintisiz otoyol",
      "Hâlâ sabit otoyol hızı — glazing riski sürer",
      "Rölantide saatlerce çalıştırma",
      "Tam gaz / top speed denemeleri"
    ]
  },
  {
    id: "p4",
    index: 4,
    km: "1000 km — KRİTİK BAKIM",
    kmFrom: 1000,
    kmTo: 1000,
    title: "Büyük Detoks & Sıvı Değişimi",
    tagline: "Çapakları tahliye et, motorun ilk doğum servisi.",
    tone: "amber",
    icon: Wrench,
    rpmSafe: [0, 0],
    rpmCeiling: 0,
    throttle: "Servis aşaması — sürüş yok",
    goal:
      "Rodaj sürecinde silindir, krank yatağı, eksantrik ve şanzıman dişlilerinden dökülen mikro/makro metal çapaklarının tüm yağ devresinden tahliyesi.",
    mechanics:
      "Mikro metal tozları motor yağında askıda kalıp pompa vasıtasıyla silindir duvarına, krank yataklarına ve eksantrik miline geri sirküle olur — bu klasik bir 'abrasive wear' (zımpara aşınması) etkisidir. Şanzıman dişlileri ise motor bloğuna kıyasla çok daha iri çapaklar döker, rulman bilyelerini ve dişli profillerini çizer.",
    dos: [
      "Motor yağı değişimi (XMAX 250: 1.2 L · XMAX 300: 1.5 L)",
      "Yağ filtresi değişimi — opsiyonel değil, zorunlu",
      "Final dişli (şanzıman) yağı (250: 250 mL · 300: 200 mL)",
      "Hava filtresi + buji kontrol, fren hidroliği seviyesi"
    ],
    donts: [
      "Sadece yağı boşaltıp filtreyi atlamak",
      "Şanzıman yağını 'sonra hallederim' demek",
      "Aynı mineral yağı tekrar koymak (artık yarı/tam sentetiğe geçiş)",
      "Karteri aşırı doldurmak — buji kirlenmesi"
    ]
  },
  {
    id: "p5",
    index: 5,
    km: "1000 – 1600 km",
    kmFrom: 1000,
    kmTo: 1600,
    title: "Nihai Güç Sınırı & Otoyol Adaptasyonu",
    tagline: "Tam devir kademeli açılır — top speed hâlâ erken.",
    tone: "emerald",
    icon: Zap,
    rpmSafe: [3500, 5400],
    rpmCeiling: 5400,
    throttle: "Üçte üç ile 3/4 gaz arası",
    goal:
      "Motor bileşenlerinin yüksek devirlere ısıl adaptasyonu; tam devir aralığının kademeli açılması ve 1600 km sonrası tam sentetik yağa geçiş hazırlığı.",
    mechanics:
      "1000 km bakımı yapılmış olsa da metalurjik alışma süreci 1600 km'ye kadar kademeli sürer. Bu pencerede yüksek devirler kademeli olarak tanıtılır; aksi takdirde henüz tam pürüzsüzleşmemiş mikro çıkıntılarda anlık kesme gerilmesi yağ filmini yırtar ve 'scuffing' (metal-metal kaynaşma) oluşur.",
    dos: [
      "Maks. 5400 RPM, kademeli RPM artışı",
      "Kısa süreli yüksek devir denemeleri",
      "Otoyola yumuşak entegrasyon — uzun düz parça hâlâ değişken",
      "1600 km'de tam sentetik yağa geçiş planı"
    ],
    donts: [
      "1001. km'de tam gaz / top speed denemek",
      "Hâlâ sabit hız (cruise) modu",
      "Uzun süreli redline'a tırmanmak",
      "Şanzıman bakımını atlayıp tam yüklü kalkış"
    ]
  }
];

const MODELS: ModelSpec[] = [
  {
    key: "250",
    name: "XMAX 250 Blue Core",
    displacement: "249.7 cc",
    bore: "70.0 mm",
    stroke: "64.9 mm",
    compression: "10.5 : 1",
    engineOil: "1.2 L (filtre dahil)",
    gearOil: "250 mL",
    recommendedOil: "10W-40 · Mineral / Yarı Sentetik",
    rpmRedline: 8500,
    rpmBreakInCeiling: 5400,
    signature: "Daha kısa strok · daha hızlı segman hızı · termal stabilite önceliği."
  },
  {
    key: "300",
    name: "XMAX 300 Blue Core",
    displacement: "292 cc",
    bore: "70.0 mm",
    stroke: "75.9 mm",
    compression: "10.9 : 1",
    engineOil: "1.5 L (filtre dahil)",
    gearOil: "200 mL",
    recommendedOil: "10W-40 · Mineral / Yarı Sentetik",
    rpmRedline: 8000,
    rpmBreakInCeiling: 5400,
    signature: "Uzun strok · yüksek kompresyon · segman arkası gaz basıncı daha çabuk doyar."
  }
];

const RPM_ZONES_BREAK_IN: RpmZone[] = [
  {
    label: "Rölanti — Tehlikeli Sürünme",
    from: 0,
    to: 2000,
    tone: "rose",
    description: "Yağ pompası düşük basınç, hotspot riski."
  },
  {
    label: "Güvenli Alıştırma Bandı",
    from: 2500,
    to: 4500,
    tone: "cyan",
    description: "Değişken devir + değişken yük — segman oturma penceresi."
  },
  {
    label: "Genişletilmiş Bant (500+ km)",
    from: 4500,
    to: 5400,
    tone: "amber",
    description: "Kısa süreli, kademeli denemeler için."
  },
  {
    label: "Kırmızı Çizgi — Rodaj Bitmeden Yasak",
    from: 5400,
    to: 8500,
    tone: "rose",
    description: "1600 km'den önce yağ filmi yırtılabilir (scuffing)."
  }
];

const CONCEPTS: Concept[] = [
  {
    id: "honing",
    title: "Honlama & Segman Parlaması",
    subtitle: "DiASil 'exposure' yüzey bitirme — silisyum kristal platosu",
    icon: Layers,
    tone: "cyan",
    summary:
      "Geleneksel honlama yerine 0.1 – 1.0 μm derinlikte alüminyum aşındırılır; %20 silis kristali yüzeye çıkar.",
    detail:
      "Sabit düşük devirde yanma basıncı yetersiz kalır, segmanlar silis tepelerini düzgün tıraşlayamaz. Kurum ve yağ silindirin mikroskopik vadilerine dolar, yüksek sıcaklıkta pişer ve yüzey adeta camsı bir tabakayla kaplanır — 'glazing'. Bu kalıcıdır: yağ tutma yeteneği yok olur, motor sürekli yağ eksiltir ve kompresyon kaybeder.",
    metric: { label: "Yüzey aşınma derinliği", value: "0.1 – 1.0 μm" }
  },
  {
    id: "thermal",
    title: "Termal Döngü",
    subtitle: "Moleküler boyutsal stabilite — iç stres tahliyesi",
    icon: Thermometer,
    tone: "amber",
    summary:
      "Motorun 90-100°C çalışma sıcaklığı ile ortam sıcaklığı arasında kontrollü genleşme-büzülme döngüleri.",
    detail:
      "Yeni dökülmüş alaşımlarda iç residual stress vardır. 20-30 dk sürüş + tam soğuma çevrimi dövme piston ve krank milinin moleküler düzeyde dengelenmesini sağlar. İlk 500 km'yi kesintisiz uzun yolda yapmak piston ovalleşmesi ve kalıcı deformasyon riski oluşturur.",
    metric: { label: "Hedef döngü", value: "20-30 dk · tam soğuma" }
  },
  {
    id: "vacuum",
    title: "Motor Freni & Vakum Etkisi",
    subtitle: "Silindirde negatif basınç — çapak tahliyesi + soğutma",
    icon: Wind,
    tone: "emerald",
    summary:
      "Gaz kolu kapalıyken silindirde oluşan güçlü vakum üç işi aynı anda yapar: tahliye, dinlendirme, soğutma.",
    detail:
      "Vakum, segman alıştırmasından kopan mikro metal ve silis tozlarını emerek egzozdan dışarı atar — kartere inmesini engeller. Segman arkasındaki gaz basıncı anlık sıfırlanır, plato yüzeyi 'dinlenir'. Karterden yukarı çekilen taze yağ silindiri ve segmanları soğutur. Motor freni rodajın mikroskobik bakım operasyonudur.",
    metric: { label: "Etki", value: "tahliye · dinlenme · soğutma" }
  },
  {
    id: "oil",
    title: "İlk Yağ — Neden Mineral / Yarı Sentetik?",
    subtitle: "Kontrollü mikro aşınma — tam sentetik henüz erken",
    icon: Droplets,
    tone: "rose",
    summary:
      "Tam sentetik yağ kopmaz moleküler film oluşturur — bu rodajda işimize gelmez.",
    detail:
      "Sentetik yağdaki ester bazlı + moly-friction modifier katkılar, segmanların silis kristalleriyle sürtünüp plato oluşturmasını engeller. İlk 1000 km için Yamalube 10W-40 mineral veya yarı sentetik; 1000 km bakımından sonra ara faz; 1600 km sonrası tam sentetiğe kalıcı geçiş yapılır.",
    metric: { label: "İlk yağ", value: "10W-40 mineral / yarı sentetik" }
  }
];

const MISTAKES: Mistake[] = [
  {
    id: "idle",
    title: "Rölantide saatlerce çalıştırmak",
    icon: Flame,
    consequence:
      "Piston eteğindeki 20 μm reçine kaplama erir, silindire sıvanır — SEIZURE (kilitlenme) zemini.",
    chain: [
      "Yağ pompası düşük basınçta → splash lubrication yetersiz",
      "Araç hareketsiz → radyatörde hava akışı yok → lokal hotspot",
      "Piston eteğindeki reçine kaplama erir → silindire sıvanır",
      "Mekanik kilitlenme veya kalıcı kompresyon kaybı"
    ]
  },
  {
    id: "topspeed",
    title: "1001. km'de hemen top speed denemek",
    icon: Zap,
    consequence:
      "Pürüzsüzleşmemiş mikro çıkıntılarda yağ filmi yırtılır → metal-metal scuffing → kalıcı hasar.",
    chain: [
      "1000 km bakımı ≠ metalurjik alışmanın bitmesi",
      "Pürüzsüzleşmemiş silis tepeleri anlık kesme gerilmesi alır",
      "Yağ filmi yırtılır → metal-metal 'scuffing'",
      "Kompresyon kaybı kalıcı, garanti dışı arıza"
    ]
  },
  {
    id: "gearoil",
    title: "Şanzıman yağı değişimini atlamak",
    icon: Cog,
    consequence:
      "Şanzıman dişli çapakları rulman bilyelerini ve dişli profillerini çizer — geri dönüşsüz aşınma.",
    chain: [
      "Sıfır dişliler ilk dönüşlerinde motora kıyasla iri çapaklar döker",
      "Çapaklar şanzıman içinde dolaşır, bilyeleri zımparalar",
      "Rulmanlarda mikro pitting + dişli profili erozyonu",
      "5-10 bin km içinde şanzıman seslenmeye başlar"
    ]
  }
];

const RPM_AXIS_MAX = 8500;

function rpmToPct(rpm: number): number {
  return Math.min(100, Math.max(0, (rpm / RPM_AXIS_MAX) * 100));
}

export default function RodajPage() {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [activeModel, setActiveModel] = useState<ModelKey>("300");
  const [openConcept, setOpenConcept] = useState<string | null>("honing");

  const phase = PHASES[activePhaseIdx];
  const model = useMemo(
    () => MODELS.find((m) => m.key === activeModel) ?? MODELS[1],
    [activeModel]
  );
  const phaseTone = TONE_STYLES[phase.tone];

  return (
    <main className="relative isolate overflow-hidden bg-[#030712] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh] bg-grid-fine opacity-[0.35]"
        style={{
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, #000 30%, transparent 75%)"
        }}
      />

      {/* HERO */}
      <section className="container-x relative pb-16 pt-20 sm:pt-28">
        <div className="flex flex-col items-start gap-6">
          <Link
            href="/bilgi"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-carbon-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:text-cyan-200"
          >
            <ChevronRight className="h-3 w-3 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Bilgi merkezi
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="chip border-cyan-400/30 bg-cyan-400/[0.07] text-cyan-200">
              <Atom className="h-3.5 w-3.5" />
              Metalurjik analiz
            </span>
            <span className="chip border-white/[0.07] text-carbon-200">
              <Sparkles className="h-3.5 w-3.5" /> Bilimsel rodaj kılavuzu
            </span>
            <span className="chip border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" /> 1600 km kronolojik plan
            </span>
          </div>

          <h1 className="h-display max-w-5xl text-balance text-5xl font-semibold leading-[0.95] tracking-tightest sm:text-6xl lg:text-[5.5rem]">
            Rodaj —{" "}
            <span className="text-electric">kulaktan dolma</span> değil,{" "}
            <span className="text-electric">mühendislik</span>.
          </h1>

          <p className="max-w-3xl text-balance text-base leading-relaxed text-carbon-200 sm:text-lg">
            Yamaha XMAX 250 ve XMAX 300 Blue Core motorlarının DiASil
            (Die-casting Aluminum-Silicon) silindiri, %20 oranında homojen
            silisyum kristali barındıran hiperötektik bir alaşımdır. Bu
            kılavuz; segman alıştırma (ring seating), termal döngü ve motor
            freni vakumunun mikroskopik etkilerini operasyonel bir aksiyon
            planına çevirir.
          </p>

          <div className="grid w-full grid-cols-2 gap-3 pt-4 sm:grid-cols-4 sm:gap-4">
            <HeroStat
              icon={Microscope}
              tone="cyan"
              value="0.5 μm"
              label="Ortalama yüzey aşınma derinliği"
            />
            <HeroStat
              icon={Gauge}
              tone="emerald"
              value="5400 RPM"
              label="1600 km'ye kadar maks. devir"
            />
            <HeroStat
              icon={Timer}
              tone="amber"
              value="1000 km"
              label="Kritik ilk bakım eşiği"
            />
            <HeroStat
              icon={FlaskConical}
              tone="rose"
              value="10W-40"
              label="Mineral / yarı sentetik rodaj yağı"
            />
          </div>
        </div>
      </section>

      {/* PHASE TIMELINE */}
      <section className="container-x pb-20 pt-4">
        <SectionEyebrow
          eyebrow="İnteraktif yol haritası"
          title="5 aşama · 1600 km · tek kronolojik plan"
          description="Aşamaya tıkla — o pencerede ne yapman ve neden yapman gerektiğini gör."
        />

        <div className="mt-10">
          {/* Timeline rail */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />
            <div className="relative grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-3">
              {PHASES.map((p, i) => {
                const tone = TONE_STYLES[p.tone];
                const active = i === activePhaseIdx;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePhaseIdx(i)}
                    className={cn(
                      "group relative flex flex-col items-start gap-3 rounded-2xl border bg-white/[0.02] p-4 text-left transition-all duration-300 hover:-translate-y-0.5",
                      active
                        ? cn("border-white/[0.18] bg-white/[0.05]", tone.glow)
                        : "border-white/[0.06] hover:border-white/[0.12]"
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={cn(
                          "grid size-10 place-items-center rounded-xl border transition-all duration-300",
                          active
                            ? cn(tone.bgSoft, tone.border, tone.text)
                            : "border-white/[0.07] bg-white/[0.025] text-carbon-300 group-hover:text-white"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span
                        className={cn(
                          "rounded-md border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] transition-all duration-300",
                          active
                            ? cn(tone.border, tone.text, tone.bgSoft)
                            : "border-white/[0.07] bg-white/[0.025] text-carbon-300"
                        )}
                      >
                        AŞ-{String(p.index).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <div
                        className={cn(
                          "font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300",
                          active ? tone.text : "text-carbon-300"
                        )}
                      >
                        {p.km}
                      </div>
                      <div className="mt-1.5 text-sm font-semibold leading-tight text-white">
                        {p.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active phase detail */}
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
            <div
              className={cn(
                "glass-frost relative overflow-hidden p-7 sm:p-9 transition-all duration-500",
                phaseTone.glow
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl opacity-60",
                  phaseTone.bgSoft
                )}
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl border",
                      phaseTone.border,
                      phaseTone.bgSoft,
                      phaseTone.text
                    )}
                  >
                    <phase.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", phaseTone.text)}>
                      Aşama {phase.index} · {phase.km}
                    </div>
                    <h3 className="h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
                      {phase.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-5 text-base leading-relaxed text-carbon-100">
                  {phase.tagline}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <KvBox
                    label="Maks. devir"
                    value={phase.rpmCeiling > 0 ? `${phase.rpmCeiling} RPM` : "—"}
                    tone={phase.tone}
                  />
                  <KvBox
                    label="Güvenli bant"
                    value={
                      phase.rpmSafe[0] === 0
                        ? "Servis"
                        : `${phase.rpmSafe[0]} – ${phase.rpmSafe[1]} RPM`
                    }
                    tone={phase.tone}
                  />
                  <KvBox label="Gaz limiti" value={phase.throttle} tone={phase.tone} />
                </div>

                <div className="mt-7 rounded-2xl border border-white/[0.07] bg-black/30 p-5">
                  <div className="flex items-center gap-2">
                    <Microscope className={cn("h-4 w-4", phaseTone.text)} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                      Mekanik gerekçe
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-carbon-100">
                    {phase.mechanics}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className={cn("h-4 w-4", phaseTone.text)} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                      Mühendislik hedefi
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-carbon-100">
                    {phase.goal}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <DosCard items={phase.dos} tone="emerald" />
              <DontsCard items={phase.donts} />
            </div>
          </div>
        </div>
      </section>

      {/* MODEL SIMULATOR */}
      <section className="container-x py-20">
        <SectionEyebrow
          eyebrow="Devir simülatörü"
          title="Modelini seç — güvenli bandı oku."
          description="XMAX 250 ile 300 farklı strok ve kompresyona sahip; rodajda kullanılacak devir bantları aynı, mekanik gerekçeler farklı."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          {/* Model selector */}
          <div className="glass-frost p-6 sm:p-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
              Motor seçimi
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl border border-white/[0.07] bg-black/30 p-1.5">
              {MODELS.map((m) => {
                const active = m.key === activeModel;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setActiveModel(m.key)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-left transition-all duration-300",
                      active
                        ? "bg-gradient-to-br from-cyan-400/20 to-cyan-400/[0.05] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-cyan-400/30"
                        : "text-carbon-200 hover:bg-white/[0.03] hover:text-white"
                    )}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                      Yamaha
                    </div>
                    <div className="h-display text-2xl font-semibold leading-tight">
                      XMAX {m.key}
                    </div>
                    <div className="mt-1 text-[11px] text-carbon-300">
                      {m.displacement}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-3">
              <SpecRow label="Bore × Stroke" value={`${model.bore} × ${model.stroke}`} />
              <SpecRow label="Kompresyon oranı" value={model.compression} />
              <SpecRow label="Karter yağı" value={model.engineOil} />
              <SpecRow label="Şanzıman yağı" value={model.gearOil} />
              <SpecRow label="Rodaj yağı tipi" value={model.recommendedOil} />
              <SpecRow label="Üretici redline" value={`${model.rpmRedline} RPM`} />
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.07] bg-black/30 p-4">
              <div className="flex items-center gap-2">
                <Settings2 className="h-3.5 w-3.5 text-cyan-300" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                  Motor karakteri
                </span>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-carbon-100">
                {model.signature}
              </p>
            </div>
          </div>

          {/* Gauge */}
          <div className="glass-frost p-6 sm:p-7">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                  Devir bantları · 0 – {RPM_AXIS_MAX} RPM
                </div>
                <h3 className="h-display mt-1 text-2xl font-semibold leading-tight text-white">
                  XMAX {activeModel} · Rodaj penceresi
                </h3>
              </div>
              <div className={cn("rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em]", TONE_STYLES[phase.tone].chip)}>
                Aktif: AŞ-{String(phase.index).padStart(2, "0")}
              </div>
            </div>

            {/* Bar */}
            <div className="mt-7">
              <div className="relative h-12 w-full overflow-hidden rounded-xl border border-white/[0.07] bg-black/50">
                {RPM_ZONES_BREAK_IN.map((z) => {
                  const left = rpmToPct(z.from);
                  const width = rpmToPct(z.to) - rpmToPct(z.from);
                  const t = TONE_STYLES[z.tone];
                  return (
                    <div
                      key={z.label}
                      className={cn(
                        "absolute top-0 h-full opacity-90 transition-all duration-500",
                        t.bar
                      )}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      aria-label={z.label}
                    />
                  );
                })}
                {/* Phase marker band */}
                {phase.rpmSafe[1] > 0 && (
                  <div
                    className="pointer-events-none absolute inset-y-0 border-x-2 border-white/80 bg-white/10 transition-all duration-500"
                    style={{
                      left: `${rpmToPct(phase.rpmSafe[0])}%`,
                      width: `${rpmToPct(phase.rpmSafe[1]) - rpmToPct(phase.rpmSafe[0])}%`
                    }}
                  />
                )}
                {/* Redline marker */}
                <div
                  className="pointer-events-none absolute inset-y-0 w-0.5 bg-rose-500"
                  style={{ left: `${rpmToPct(model.rpmBreakInCeiling)}%` }}
                />
              </div>

              {/* axis */}
              <div className="mt-2 flex justify-between font-mono text-[10px] text-carbon-300">
                {[0, 2000, 4000, 5400, 6500, 8500].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {RPM_ZONES_BREAK_IN.map((z) => {
                  const t = TONE_STYLES[z.tone];
                  return (
                    <div
                      key={z.label}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                    >
                      <span className={cn("mt-1 size-2.5 shrink-0 rounded-full", t.bar)} />
                      <div>
                        <div className={cn("text-[12.5px] font-semibold", t.text)}>
                          {z.label}
                          <span className="ml-2 font-mono text-[10px] font-medium text-carbon-300">
                            {z.from}–{z.to}
                          </span>
                        </div>
                        <div className="text-[12px] text-carbon-200">{z.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Aktif aşama snapshot */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <SmallStat
                icon={Gauge}
                label="Aktif faz hedefi"
                value={
                  phase.rpmSafe[0] === 0
                    ? "Bakım"
                    : `${phase.rpmSafe[0]}-${phase.rpmSafe[1]}`
                }
                unit={phase.rpmSafe[0] === 0 ? "" : "RPM"}
                tone={phase.tone}
              />
              <SmallStat
                icon={Timer}
                label="Pencere"
                value={phase.km.split(" — ")[0] ?? phase.km}
                unit=""
                tone={phase.tone}
              />
              <SmallStat
                icon={ShieldAlert}
                label="Üst sınır"
                value={`${model.rpmBreakInCeiling}`}
                unit="RPM"
                tone="rose"
              />
            </div>

            {/* Why-not-constant */}
            <div className="mt-6 rounded-2xl border border-amber-400/25 bg-amber-400/[0.05] p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-300" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200">
                  Neden sabit hızda gitmemelisin?
                </span>
              </div>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-carbon-100">
                Sabit düşük devirde yanma odasındaki gaz basıncı (P
                <sub>gas</sub>) sabit ve düşük kalır. Segmanlar silindir
                duvarına yeterli kuvvetle bastırılamaz; mikroskopik vadiler
                kurum ile dolar, yüzey camlaşır (glazing) ve yağ tutma
                yeteneğini kalıcı olarak kaybeder.
                <span className="ml-1 text-emerald-200">
                  Doğru yöntem: Değişken Devir × Değişken Yük.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONCEPTS */}
      <section className="container-x py-20">
        <SectionEyebrow
          eyebrow="Metalurji & şanzıman kütüphanesi"
          title="4 kavram — kalıcı motor sağlığının tüm sırrı."
          description="Bu dört prensibi içselleştiren bir sürücü, doğru rodajı zaten yapar."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {CONCEPTS.map((c) => {
            const t = TONE_STYLES[c.tone];
            const open = openConcept === c.id;
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setOpenConcept(open ? null : c.id)}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border bg-white/[0.02] p-6 text-left transition-all duration-300 hover:-translate-y-0.5 sm:p-7",
                  open
                    ? cn("border-white/[0.16] bg-white/[0.04]", t.glow)
                    : "border-white/[0.07] hover:border-white/[0.12]"
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500",
                    t.bgSoft,
                    open ? "opacity-100" : "opacity-40"
                  )}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-xl border",
                        t.border,
                        t.bgSoft,
                        t.text
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className={cn("font-mono text-[10px] uppercase tracking-[0.22em]", t.text)}>
                      {c.metric.label} · {c.metric.value}
                    </span>
                  </div>
                  <h3 className="h-display mt-5 text-xl font-semibold leading-tight text-white sm:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-carbon-300">{c.subtitle}</p>
                  <p className="mt-4 text-[14px] leading-relaxed text-carbon-100">
                    {c.summary}
                  </p>
                  <div
                    className={cn(
                      "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-in-out",
                      open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="min-h-0">
                      <div className="border-t border-white/[0.06] pt-4 text-[13.5px] leading-relaxed text-carbon-100">
                        {c.detail}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-carbon-300 transition-colors duration-300 group-hover:text-white">
                    {open ? "Kapat" : "Detayı aç"}
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 transition-transform duration-300",
                        open ? "rotate-90" : "group-hover:translate-x-0.5"
                      )}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* MISTAKES — KARA LİSTE */}
      <section className="container-x py-20">
        <SectionEyebrow
          eyebrow="Atölye hataları · kara liste"
          title="Yapma — yapanların başına gelenleri yaşamak istemezsin."
          description="Mühendislik standartlarına tamamen aykırı, ama hâlâ sıkça tekrarlanan üç klasik rodaj hatası."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {MISTAKES.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/[0.08] via-rose-500/[0.02] to-transparent p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-400/50 sm:p-7"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-500/15 blur-3xl"
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl border border-rose-500/40 bg-rose-500/15 text-rose-200">
                      <AlertTriangle className="h-[18px] w-[18px]" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-200">
                      Kırmızı çizgi
                    </span>
                  </div>
                  <h3 className="h-display mt-5 text-xl font-semibold leading-tight text-white">
                    <Icon className="mr-2 inline-block h-4 w-4 text-rose-300" />
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-rose-100/90">
                    {m.consequence}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {m.chain.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-carbon-100"
                      >
                        <span className="mt-1 inline-grid size-4 shrink-0 place-items-center rounded-full border border-rose-500/40 bg-rose-500/10 font-mono text-[9px] text-rose-200">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA / FOOTNOTE */}
      <section className="container-x pb-28 pt-8">
        <div className="glass-frost relative overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-amber-400/[0.07] blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                Özet · 1600 km&apos;nin doğal kontratı
              </div>
              <h3 className="h-display mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Rodajı doğru yap — motor sana{" "}
                <span className="text-electric">100.000 km</span> ile geri öder.
              </h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-carbon-100">
                Mühendislik ilkelerine dayalı bir rodaj, XMAX 250 ve 300
                modellerinin gelecekteki yakıt ekonomisini, mekanik
                sessizliğini ve maksimum güç üretim potansiyelini belirleyen
                yegane unsurdur. Bu sayfayı garajda açık bırak.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/periyodik-bakim"
                  className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] px-5 py-3 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-cyan-400/[0.14]"
                >
                  1000 km bakım planı
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/varyator"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.06]"
                >
                  CVT &amp; varyatör rehberi
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              <FootnoteRow
                icon={Snowflake}
                label="1600 km sonrası"
                value="Tam sentetik yağa kalıcı geçiş"
              />
              <FootnoteRow
                icon={ShieldCheck}
                label="Garanti"
                value="Yamaha el kitabı limitleri (4500 / 5400 RPM)"
              />
              <FootnoteRow
                icon={Sparkles}
                label="Kaynak"
                value="DiASil teknolojisi · Yamaha Motor Co. teknik yayınları"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- atomic subcomponents ---------- */

function HeroStat({
  icon: Icon,
  value,
  label,
  tone
}: {
  icon: typeof Gauge;
  value: string;
  label: string;
  tone: Tone;
}) {
  const t = TONE_STYLES[tone];
  return (
    <div className="glass-quiet flex items-start gap-3 p-4 sm:p-5">
      <span className={cn("grid size-9 place-items-center rounded-lg border", t.border, t.bgSoft, t.text)}>
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
          {label}
        </div>
        <div className="mt-0.5 font-display text-xl font-semibold leading-tight tracking-tightish text-white">
          {value}
        </div>
      </div>
    </div>
  );
}

function SectionEyebrow({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-carbon-300">
        {eyebrow}
      </span>
      <h2 className="h-display text-balance text-3xl font-semibold leading-[1.05] tracking-tightest text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="text-[15px] leading-relaxed text-carbon-200">{description}</p>
    </div>
  );
}

function KvBox({ label, value, tone }: { label: string; value: string; tone: Tone }) {
  const t = TONE_STYLES[tone];
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
        {label}
      </div>
      <div className={cn("mt-1 font-display text-base font-semibold leading-tight", t.text)}>
        {value}
      </div>
    </div>
  );
}

function DosCard({ items, tone }: { items: string[]; tone: Tone }) {
  const t = TONE_STYLES[tone];
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-gradient-to-br from-emerald-400/[0.06] via-transparent to-transparent p-6 sm:p-7",
        t.border
      )}
    >
      <div className="flex items-center gap-2">
        <Check className={cn("h-4 w-4", t.text)} />
        <span className={cn("font-mono text-[10px] uppercase tracking-[0.22em]", t.text)}>
          Hayati doğrular
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((d, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-carbon-100"
          >
            <span className="mt-0.5 inline-grid size-4 shrink-0 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/15 text-emerald-300">
              <Check className="h-2.5 w-2.5" />
            </span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DontsCard({ items }: { items: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/[0.06] via-transparent to-transparent p-6 sm:p-7">
      <div className="flex items-center gap-2">
        <X className="h-4 w-4 text-rose-300" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-200">
          Kırmızı çizgiler
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((d, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-carbon-100"
          >
            <span className="mt-0.5 inline-grid size-4 shrink-0 place-items-center rounded-full border border-rose-500/40 bg-rose-500/15 text-rose-300">
              <X className="h-2.5 w-2.5" />
            </span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 last:border-b-0 last:pb-0">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-carbon-300">
        {label}
      </span>
      <span className="font-display text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function SmallStat({
  icon: Icon,
  label,
  value,
  unit,
  tone
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
  unit: string;
  tone: Tone;
}) {
  const t = TONE_STYLES[tone];
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3.5">
      <div className="flex items-center gap-2">
        <Icon className={cn("h-3.5 w-3.5", t.text)} />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
          {label}
        </span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className={cn("font-display text-lg font-semibold tracking-tightish", t.text)}>
          {value}
        </span>
        {unit && (
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function FootnoteRow({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors duration-300 hover:bg-white/[0.04]">
      <span className="grid size-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-electric-cyan">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
          {label}
        </div>
        <div className="mt-0.5 text-[13px] leading-snug text-carbon-100">{value}</div>
      </div>
    </div>
  );
}
