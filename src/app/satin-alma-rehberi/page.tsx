"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Coins,
  Gauge,
  Map,
  Thermometer,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  Banknote,
  Calendar,
  Bike
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

type Usage = "sehir" | "karma" | "tur";
type Budget = "dar" | "orta" | "genis";
type License = "a2" | "a";

type Recommendation = {
  model: string;
  generation: string;
  reason: string;
  icon: typeof Coins;
  tone: string;
  warning?: string;
};

const USAGE_OPTIONS: { value: Usage; label: string; sub: string; icon: typeof Coins }[] = [
  { value: "sehir", label: "Şehir içi", sub: "İşe gidiş, trafik, kısa mesafe", icon: Coins },
  { value: "karma", label: "Karma", sub: "Şehir + hafta sonu otoyol", icon: Gauge },
  { value: "tur", label: "Uzun tur", sub: "Otoban, şehirlerarası, eşli", icon: Map }
];

const BUDGET_OPTIONS: { value: Budget; label: string; sub: string }[] = [
  { value: "dar", label: "0 – 150.000 TL", sub: "2. el odaklı" },
  { value: "orta", label: "150.000 – 300.000 TL", sub: "Yakın model 2. el / sıfır 250" },
  { value: "genis", label: "300.000+ TL", sub: "Sıfır Tech MAX / 300 / 400" }
];

const LICENSE_OPTIONS: { value: License; label: string; sub: string }[] = [
  { value: "a2", label: "A2 (35 kW)", sub: "250 ve 300 uygun, 400 limit dışı" },
  { value: "a", label: "A (sınırsız)", sub: "Tüm XMAX modelleri" }
];

function recommend(usage: Usage, budget: Budget, license: License): Recommendation {
  if (usage === "tur" && license === "a" && budget !== "dar") {
    return {
      model: "XMAX 400 Tech MAX",
      generation: "2018–2020 (Gen 4, DOHC)",
      reason: "Uzun otoban kararlılığı, çift ön disk ve 36 Nm tork uzun turun gerçek karşılığı. Aynı bütçeye sıfır 300 yerine 2. el 400, ağırlığı ve duruşuyla fark yaratır.",
      icon: Map,
      tone: "from-amber-500/15 to-amber-500/0 border-amber-500/30 text-amber-300"
    };
  }
  if (usage === "tur") {
    return {
      model: "XMAX 300 Tech MAX",
      generation: "2023–2024 (Gen 5)",
      reason: "A2 sınırı içinde otoban performansının zirvesi. 29 Nm tork, ikili TFT ekran, 250 ile aynı şasi ağırlığı.",
      icon: Map,
      tone: "from-electric-cyan/15 to-electric-cyan/0 border-electric-cyan/30 text-electric-cyan",
      warning: license === "a2" ? "A2 ehliyet sınırına yakın, 400 modeli ehliyetinizi aşar." : undefined
    };
  }
  if (usage === "karma" && budget === "genis") {
    return {
      model: "XMAX 250 Tech MAX Plus",
      generation: "2025–2026 (Gen 6)",
      reason: "Elektrikli cam, ısıtmalı sele/elcik, Garmin navigasyon. %8 ÖTV bareminde maksimum konfor — vergi yükünden kaçıp donanımı yakalıyorsun.",
      icon: Thermometer,
      tone: "from-electric-violet/15 to-electric-violet/0 border-electric-violet/30 text-electric-violet"
    };
  }
  if (usage === "karma" && budget === "orta") {
    return {
      model: "XMAX 250 (Gen 5) veya 300 (2. el)",
      generation: "2023–2024",
      reason: "Bu bütçede yakın model 2. el sweet spot. Şehir kıvraklığı + ara sıra otoyol için 250 Gen 5 yeterli; tork önemliyse 2. el 300 bak.",
      icon: Gauge,
      tone: "from-electric-cyan/15 to-electric-cyan/0 border-electric-cyan/30 text-electric-cyan"
    };
  }
  if (usage === "karma") {
    return {
      model: "XMAX 250 (Gen 4)",
      generation: "2018–2022 (Blue Core)",
      reason: "Bu bütçenin altın motorudur. Blue Core'la 3.1 L/100 km, TCS standart, ikinci el likiditesi en yüksek. Şehir+ara sıra otoban için yeterli güç.",
      icon: Gauge,
      tone: "from-emerald-500/15 to-emerald-500/0 border-emerald-500/30 text-emerald-300"
    };
  }
  if (usage === "sehir" && budget === "genis") {
    return {
      model: "XMAX 250 Tech MAX Plus",
      generation: "2025–2026 (Gen 6)",
      reason: "Şehir içi tek bineceksen tork değil, konfor ve teknoloji belirleyici. %8 ÖTV ile yıllık MTV de düşük kalır.",
      icon: Thermometer,
      tone: "from-electric-violet/15 to-electric-violet/0 border-electric-violet/30 text-electric-violet"
    };
  }
  return {
    model: "XMAX 250 (Gen 4)",
    generation: "2018–2022 (Blue Core)",
    reason: "Şehir içi senaryoda en akılcı tercih. Yakıt ekonomisi 3.1 L/100 km, TCS standart, en yüksek 2. el likiditesi ve düşük MTV (1.069 TL/yıl).",
    icon: Coins,
    tone: "from-emerald-500/15 to-emerald-500/0 border-emerald-500/30 text-emerald-300"
  };
}

const QUICK_FLAGS = [
  {
    title: "Km tutarsızlığı",
    detail: "Servis kayıtlarındaki km düşüşü veya gösterge ile lastik/balata aşınmasının uyuşmaması. Saat başına düşen km'ye değil, parçaların yaşına bak."
  },
  {
    title: "Varyatör sesi",
    detail: "Boştan kalkışta 3.000–4.000 rpm arasında titreme veya silkme. Kuru tip santrifüj debriyaj tüm kasaların kronik noktası — sertse pazarlık konusu."
  },
  {
    title: "ABS uyarı lambası",
    detail: "10 km/h'yi geçtikten sonra sönmesi gerekir. Sönmüyorsa Kod 21/46 — hidrolik modül yüksek maliyet."
  },
  {
    title: "Kaporta–şase eşleşmesi",
    detail: "Şasi numarasının ruhsatla, panel boşluklarının her iki yanda simetrik olması. Asimetri = hasar geçmişi sinyali."
  },
  {
    title: "Servis geçmişi & evrak",
    detail: "Yetkili servis damgalı kitap, TRAMER kaydı (SMS 5664), e-Devlet rehin/haciz sorgusu. Belge eksikse fiyat yarı yarıya pazarlık edilebilir."
  }
];

const PRICE_BANDS = [
  { model: "XMAX 250", new: "275 – 310 bin TL", used: "150 – 240 bin TL", note: "%8 ÖTV · 1.069 TL/yıl MTV" },
  { model: "XMAX 300", new: "440 – 490 bin TL", used: "260 – 380 bin TL", note: "%37 ÖTV · 2.215 TL/yıl MTV" },
  { model: "XMAX 400", new: "—", used: "230 – 340 bin TL", note: "Türkiye'de sıfır satışı yok, sadece 2. el" }
];

export default function SatinAlmaRehberiPage() {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [license, setLicense] = useState<License | null>(null);

  const result = useMemo(() => {
    if (!usage || !budget || !license) return null;
    return recommend(usage, budget, license);
  }, [usage, budget, license]);

  const reset = () => {
    setUsage(null);
    setBudget(null);
    setLicense(null);
  };

  const ResultIcon = result?.icon;

  return (
    <>
      <section className="container-x pb-12 pt-16 sm:pt-24 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yamaha-500/10 blur-3xl"
          aria-hidden
        />
        <SectionHeading
          eyebrow="XMAX Satın Alma Rehberi"
          title={
            <>
              Hangi XMAX
              <br />
              <span className="text-electric">sana uygun?</span>
            </>
          }
          description="3 soruda model + jenerasyon önerisi. Sonra ne kadar ödeyeceğini, ne kadar masraf çıkacağını ve 2. el alacaksan görmeden önce nelere bakacağını gör."
        />
      </section>

      <section className="container-x pb-12">
        <Reveal>
          <div className="glass p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <span className="chip">3 soruluk hızlı eşleyici</span>
                <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
                  Sürüş tarzını seç, motorunu gör.
                </h2>
              </div>
              {(usage || budget || license) && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-carbon-300 transition hover:border-white/20 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Sıfırla
                </button>
              )}
            </div>

            <div className="mt-8 space-y-8">
              <QuizStep
                step={1}
                question="Çoğunlukla nerede süreceksin?"
                value={usage}
                onChange={setUsage}
                options={USAGE_OPTIONS}
              />
              <QuizStep
                step={2}
                question="Bütçen ne aralıkta?"
                value={budget}
                onChange={setBudget}
                options={BUDGET_OPTIONS}
                disabled={!usage}
              />
              <QuizStep
                step={3}
                question="Ehliyet sınıfın hangisi?"
                value={license}
                onChange={setLicense}
                options={LICENSE_OPTIONS}
                disabled={!budget}
              />
            </div>

            {result && ResultIcon && (
              <div className={`mt-10 rounded-3xl border bg-gradient-to-br p-6 sm:p-8 ${result.tone}`}>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Sana uygun seçenek
                </div>
                <div className="mt-4 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 self-start">
                    <ResultIcon className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="h-display text-3xl font-bold text-white sm:text-4xl">{result.model}</h3>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-xs text-white/80">
                      <Calendar className="h-3.5 w-3.5" />
                      {result.generation}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-carbon-100">{result.reason}</p>
                    {result.warning && (
                      <div className="mt-4 flex items-start gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs leading-relaxed text-rose-100">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{result.warning}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-12">
        <Reveal>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="chip">Adım 2 · Bütçe ölçüsü</span>
              <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
                Sıfır mı, 2. el mi — bugünkü fiyat aralığı.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-carbon-300 max-w-2xl">
                Türkiye pazarı için yaklaşık aralıklar. Bayi listesi, opsiyon paketi ve kasa yılına göre değişir.
              </p>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-carbon-400">
              Mayıs 2026 · Yaklaşık değerler
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="text-left text-[11px] font-mono uppercase tracking-[0.18em] text-carbon-400">
                  <th className="border-b border-white/[0.08] px-4 py-3 font-medium">Model</th>
                  <th className="border-b border-white/[0.08] px-4 py-3 font-medium">Sıfır</th>
                  <th className="border-b border-white/[0.08] px-4 py-3 font-medium">2. El (yakın model)</th>
                  <th className="border-b border-white/[0.08] px-4 py-3 font-medium">Vergi yükü</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_BANDS.map((row) => (
                  <tr key={row.model} className="text-carbon-100">
                    <td className="border-b border-white/[0.04] px-4 py-4 font-semibold text-white">{row.model}</td>
                    <td className="border-b border-white/[0.04] px-4 py-4 text-yamaha-200">{row.new}</td>
                    <td className="border-b border-white/[0.04] px-4 py-4 text-electric-cyan">{row.used}</td>
                    <td className="border-b border-white/[0.04] px-4 py-4 text-xs text-carbon-300">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-12">
        <Reveal>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="chip">Adım 3 · 2. El alıyorsan</span>
              <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
                Görmeden almama: 5 madde.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-carbon-300 max-w-2xl">
                İlanda görüşmeden, telefonda satıcıyla konuşurken ve test sürüşünden önce kontrol et. Üç tanesinde tereddüt varsa motoru görmeye gitme.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_FLAGS.map((flag, i) => (
              <div key={flag.title} className="glass-quiet p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-yamaha-500/30 bg-yamaha-500/10 px-2.5 py-1 font-mono text-[11px] font-bold text-yamaha-200">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="h-display text-base font-semibold text-white">{flag.title}</h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-carbon-300">{flag.detail}</p>
              </div>
            ))}

            <Link
              href="/satin-alma-rehberi/ekspertiz"
              className="group relative flex flex-col justify-between rounded-3xl border border-electric-cyan/30 bg-gradient-to-br from-electric-cyan/15 via-electric-cyan/5 to-transparent p-5 transition hover:-translate-y-0.5 hover:border-electric-cyan/60 hover:shadow-ambient-blue"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-electric-cyan/30 bg-electric-cyan/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-electric-cyan">
                  <ClipboardList className="h-3 w-3" />
                  Ekspertiz protokolü
                </div>
                <h3 className="mt-4 h-display text-lg font-semibold text-white">
                  Aracı görmeye gideceksen — 50 maddelik tam ekspertiz.
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                  Motor, şasi, fren, elektrik, kaporta ve evrak başlıkları altında her birini tek tek kontrol et. Galericiye karşı tam silah.
                </p>
              </div>
              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-electric-cyan transition group-hover:gap-2">
                Ekspertize git
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal>
          <div className="glass p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-yamaha-500/30 bg-yamaha-500/10 p-3">
                <Banknote className="h-5 w-5 text-yamaha-200" />
              </div>
              <div>
                <span className="chip">Adım 4 · Aldıktan sonra</span>
                <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
                  Yıllık toplam masraf yaklaşık.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-carbon-300 max-w-2xl">
                  MTV + zorunlu trafik + ortalama yakıt (10.000 km/yıl, 50 TL/L hesabıyla) + 1 büyük bakım. Kasko ve modifikasyon hariç.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { model: "XMAX 250", mtv: "1.069 TL", fuel: "~15.500 TL", maintenance: "~6.500 TL", total: "≈ 25.000 TL" },
                { model: "XMAX 300", mtv: "2.215 TL", fuel: "~15.000 TL", maintenance: "~7.500 TL", total: "≈ 27.000 TL" },
                { model: "XMAX 400", mtv: "2.215 TL", fuel: "~20.900 TL", maintenance: "~9.000 TL", total: "≈ 34.000 TL" }
              ].map((row) => (
                <div key={row.model} className="glass-quiet p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="h-display text-lg font-bold text-white">{row.model}</h3>
                    <Bike className="h-4 w-4 text-carbon-400" />
                  </div>
                  <dl className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between"><dt className="text-carbon-400">MTV</dt><dd className="text-carbon-100">{row.mtv}</dd></div>
                    <div className="flex justify-between"><dt className="text-carbon-400">Yakıt (10k km)</dt><dd className="text-carbon-100">{row.fuel}</dd></div>
                    <div className="flex justify-between"><dt className="text-carbon-400">Yıllık bakım</dt><dd className="text-carbon-100">{row.maintenance}</dd></div>
                  </dl>
                  <div className="mt-4 border-t border-white/[0.06] pt-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-carbon-400">Toplam</span>
                    <span className="h-display text-base font-bold text-yamaha-200">{row.total}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-carbon-400">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-carbon-400" />
              <span>
                Bu tablo enflasyonla aylık dalgalanır. Kesin tutar için periyodik bakım sayfasındaki kalemler ve sigorta acentenden teklif al.
              </span>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function QuizStep<T extends string>({
  step,
  question,
  value,
  onChange,
  options,
  disabled
}: {
  step: number;
  question: string;
  value: T | null;
  onChange: (v: T) => void;
  options: { value: T; label: string; sub: string; icon?: typeof Coins }[];
  disabled?: boolean;
}) {
  return (
    <div className={disabled ? "opacity-40 pointer-events-none" : ""}>
      <div className="flex items-center gap-3">
        <span className="rounded-full border border-yamaha-500/30 bg-yamaha-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-yamaha-200">
          0{step}
        </span>
        <h3 className="h-display text-base font-semibold text-white sm:text-lg">{question}</h3>
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`group flex flex-col gap-1.5 rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-yamaha-400/50 bg-gradient-to-b from-yamaha-500/15 to-transparent text-white"
                  : "border-white/[0.06] bg-white/[0.015] text-carbon-200 hover:border-white/20 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                <span className="text-sm font-semibold">{opt.label}</span>
              </div>
              <span className="text-[11px] leading-relaxed text-carbon-400 group-hover:text-carbon-300">
                {opt.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
