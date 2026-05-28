"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Building2,
  Mountain,
  Route,
  Sparkles,
  RotateCcw,
  Calendar,
  Sparkle,
  History
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

type Usage = "sehir" | "karma" | "tur";
type Preference = "sifir" | "ikinci-el";

type Recommendation = {
  model: string;
  generation: string;
  headline: string;
  reason: string;
  icon: typeof Building2;
  tone: string;
  note?: string;
};

const USAGE_OPTIONS: { value: Usage; label: string; sub: string; icon: typeof Building2 }[] = [
  { value: "sehir", label: "Sadece şehir içi", sub: "İşe gidiş, trafik, kısa mesafe", icon: Building2 },
  { value: "karma", label: "Şehir + uzun yol", sub: "Hafta içi şehir, hafta sonu otoban", icon: Route },
  { value: "tur", label: "Tamamen uzun yol", sub: "Otoban, şehirlerarası, uzun tur", icon: Mountain }
];

const PREFERENCE_OPTIONS: { value: Preference; label: string; sub: string; icon: typeof Sparkle }[] = [
  { value: "sifir", label: "Sıfır / yakın model", sub: "En güncel kasa, fabrika garantisi", icon: Sparkle },
  { value: "ikinci-el", label: "2. el açığım", sub: "Klasik kasaya da bakarım", icon: History }
];

function recommend(usage: Usage, preference: Preference): Recommendation {
  if (usage === "sehir") {
    if (preference === "sifir") {
      return {
        model: "XMAX 250 Tech MAX Plus",
        generation: "2025–2026 (Gen 6)",
        headline: "Şehir için güncel kasa.",
        reason: "Şehir içinde tork değil konfor ve teknoloji belirleyici. Elektrikli cam, ısıtmalı sele/elcik, Garmin navigasyon — %8 ÖTV bareminde maksimum donanım.",
        icon: Sparkle,
        tone: "from-electric-violet/15 to-electric-violet/0 border-electric-violet/30 text-electric-violet"
      };
    }
    return {
      model: "XMAX 250 (Blue Core)",
      generation: "2018–2022 (Gen 4)",
      headline: "Şehir içi için ekonomik tercih.",
      reason: "Şehir içi senaryoda akılcı tercih. Blue Core yakıt ekonomisi 3.1 L/100 km, TCS standart, en yüksek 2. el likiditesi. Smart Key ve tam LED far standartlaştı.",
      icon: Building2,
      tone: "from-emerald-500/15 to-emerald-500/0 border-emerald-500/30 text-emerald-300"
    };
  }

  if (usage === "karma") {
    if (preference === "sifir") {
      return {
        model: "XMAX 300 Tech MAX Plus",
        generation: "2025–2026 (Gen 6)",
        headline: "Şehir + uzun yol için sweet spot.",
        reason: "Otoyolda 29 Nm tork sollamada yetiyor, şehirde 250 ile aynı şasi ağırlığı sayesinde kıvraklığı kaybetmiyor. Elektrikli cam, ısıtmalı sele/elcik ve TFT çift ekran ile tam donanımlı.",
        icon: Route,
        tone: "from-electric-cyan/15 to-electric-cyan/0 border-electric-cyan/30 text-electric-cyan"
      };
    }
    return {
      model: "XMAX 300 Tech MAX",
      generation: "2023–2024 (Gen 5)",
      headline: "Hem şehir hem otoyol — yakın model 2. el.",
      reason: "29 Nm tork ile otoyolda artçılı bile sollama yapabilir, şehirde 250cc kıvraklığı korur. Garmin navigasyonlu çift ekran, radikal X-Dizayn LED far grubu.",
      icon: Route,
      tone: "from-electric-cyan/15 to-electric-cyan/0 border-electric-cyan/30 text-electric-cyan"
    };
  }

  if (preference === "sifir") {
    return {
      model: "XMAX 300 Tech MAX Plus",
      generation: "2025–2026 (Gen 6)",
      headline: "Otoban için güncel kasa zorunluluğu.",
      reason: "Tamamen uzun yol yapıyorsan 400 ideal olur — ama Türkiye'de sıfır 400 satılmıyor. Sıfır almak istiyorsan 300 Tech MAX Plus güncel donanımla en yakın seçenek: ESS acil fren sinyali, elektrikli cam, ısıtmalı sele.",
      icon: Route,
      tone: "from-electric-cyan/15 to-electric-cyan/0 border-electric-cyan/30 text-electric-cyan",
      note: "Sıfır 400 Türkiye pazarında yok. Otoyol kararlılığı önceliğinse 2. el bakmayı düşün."
    };
  }

  return {
    model: "XMAX 400 Tech MAX",
    generation: "2018–2020 (Gen 4, DOHC)",
    headline: "Uzun otoban için gerçek maxi-scooter.",
    reason: "Majesty 400'den miras DOHC bloğu 33 HP / 36 Nm üretir. 210 kg ıslak ağırlık ve çift ön disk yan rüzgârlara karşı tren kararlılığı verir. Otoban sürüş tutkununun gerçek karşılığı.",
    icon: Mountain,
    tone: "from-amber-500/15 to-amber-500/0 border-amber-500/30 text-amber-300"
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
    detail: "10 km/h'yi geçtikten sonra sönmesi gerekir. Sönmüyorsa Kod 21/46 — hidrolik modül arızası ağır maliyetli."
  },
  {
    title: "Kaporta–şase eşleşmesi",
    detail: "Şasi numarasının ruhsatla, panel boşluklarının her iki yanda simetrik olması. Asimetri = hasar geçmişi sinyali."
  },
  {
    title: "Servis geçmişi & evrak",
    detail: "Yetkili servis damgalı kitap, TRAMER kaydı (SMS 5664), e-Devlet rehin/haciz sorgusu. Belge eksikse motoru görmeye gitme."
  }
];

export default function SatinAlmaRehberiPage() {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [preference, setPreference] = useState<Preference | null>(null);

  const result = useMemo(() => {
    if (!usage || !preference) return null;
    return recommend(usage, preference);
  }, [usage, preference]);

  const reset = () => {
    setUsage(null);
    setPreference(null);
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
          description="2 soruda model + jenerasyon önerisi. Sonra 2. el alacaksan görmeden önce nelere bakacağını gör ve hazırsan 50 maddelik tam ekspertiz protokolüne geç."
        />
      </section>

      <section className="container-x pb-12">
        <Reveal>
          <div className="glass p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <span className="chip">2 soruluk hızlı eşleyici</span>
                <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
                  Sürüş tarzını seç, motorunu gör.
                </h2>
              </div>
              {(usage || preference) && (
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
                question="Sıfır mı, 2. el mi açıksın?"
                value={preference}
                onChange={setPreference}
                options={PREFERENCE_OPTIONS}
                disabled={!usage}
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
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/70">
                      {result.headline}
                    </p>
                    <h3 className="mt-1 h-display text-3xl font-bold text-white sm:text-4xl">{result.model}</h3>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-xs text-white/80">
                      <Calendar className="h-3.5 w-3.5" />
                      {result.generation}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-carbon-100">{result.reason}</p>
                    {result.note && (
                      <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 text-xs leading-relaxed text-white/80">
                        {result.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="chip">2. El alıyorsan</span>
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
  options: { value: T; label: string; sub: string; icon?: typeof Building2 }[];
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
