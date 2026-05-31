/* eslint-disable react/no-unescaped-entities */
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Route,
  Mountain,
  Sparkle,
  History,
  Sofa,
  Zap,
  Fuel,
  Trophy,
  Award,
  RotateCcw,
  Trophy as TrophyIcon,
  CheckCircle2,
  AlertCircle,
  Wallet,
  Star,
  Crown,
  type LucideIcon
} from "lucide-react";
import {
  scoreCompetitors,
  type QuizUsage,
  type AcquisitionTag,
  type QuizPreference,
  type QuizBudget
} from "@/data/rakipler";

type StepOption<T extends string> = {
  value: T;
  label: string;
  sub: string;
  icon: LucideIcon;
};

const USAGE_OPTS: StepOption<QuizUsage>[] = [
  { value: "sehir", label: "Şehir içi", sub: "Trafik · kısa mesafe · işe gidiş", icon: Building2 },
  { value: "karma", label: "Karma kullanım", sub: "Hafta içi şehir, hafta sonu otoban", icon: Route },
  { value: "uzunyol", label: "Uzun yol odaklı", sub: "Otoban · şehirlerarası · tur", icon: Mountain }
];

const ACQ_OPTS: StepOption<AcquisitionTag>[] = [
  { value: "sifir", label: "Sıfır model", sub: "Fabrika garantisi · son kasa", icon: Sparkle },
  { value: "ikinci-el", label: "İkinci el", sub: "Daha esnek bütçe · klasik kasalar dahil", icon: History }
];

const PREF_OPTS: StepOption<QuizPreference>[] = [
  { value: "konfor", label: "Konfor", sub: "Yumuşak şasi · düşük sele", icon: Sofa },
  { value: "performans", label: "Performans", sub: "Sportif tepki · agresif sürüş", icon: Zap },
  { value: "yakit", label: "Yakıt tasarrufu", sub: "Düşük tüketim · düşük TCO", icon: Fuel },
  { value: "donanim-butce", label: "Donanım/bütçe", sub: "Fiyat başına maksimum özellik", icon: Trophy },
  { value: "prestij", label: "Prestij", sub: "Marka değeri · koleksiyonluk", icon: Award }
];

const BUDGET_OPTS: StepOption<QuizBudget>[] = [
  { value: "giris", label: "Giriş segment", sub: "150–250cc altı, küçük gövde", icon: Wallet },
  { value: "orta", label: "Orta segment", sub: "250–300cc maksi-scooter", icon: Star },
  { value: "ust", label: "Üst segment", sub: "300cc Tech MAX · flagship sınıfı", icon: TrophyIcon },
  { value: "flagship", label: "Flagship", sub: "400cc+ · maksimum gövde, konfor", icon: Crown }
];

type Step = 1 | 2 | 3 | 4;

export function RakipRecommender() {
  const [usage, setUsage] = useState<QuizUsage | null>(null);
  const [acquisition, setAcquisition] = useState<AcquisitionTag | null>(null);
  const [preference, setPreference] = useState<QuizPreference | null>(null);
  const [budget, setBudget] = useState<QuizBudget | null>(null);

  const top3 = useMemo(() => {
    if (!usage || !acquisition || !preference || !budget) return null;
    return scoreCompetitors({ usage, acquisition, preference, budget }).slice(0, 3);
  }, [usage, acquisition, preference, budget]);

  const reset = () => {
    setUsage(null);
    setAcquisition(null);
    setPreference(null);
    setBudget(null);
  };

  const stepActive: Step =
    !usage ? 1 : !acquisition ? 2 : !preference ? 3 : !budget ? 4 : 4;

  const progress =
    ((usage ? 1 : 0) + (acquisition ? 1 : 0) + (preference ? 1 : 0) + (budget ? 1 : 0)) / 4;

  return (
    <div className="glass p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <span className="chip">İnteraktif eşleyici · 4 soru</span>
          <h2 className="mt-3 h-display text-2xl font-semibold text-white sm:text-3xl">
            Profilini gir, top 3 öneriyi gör.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-carbon-300 max-w-2xl">
            13 modelli veri seti — kullanım, sıfır/2.el, öncelik ve bütçe segmentine göre
            puanlanır. Skorlama yapay zeka değil; PDF'deki teknik karşılaştırma matrisinden
            türetilmiş ağırlıklı kriterlerdir.
          </p>
        </div>
        {(usage || acquisition || preference || budget) && (
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

      {/* Progress strip */}
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
        <motion.div
          className="h-full bg-gradient-to-r from-electric-cyan via-yamaha-400 to-electric-violet"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="mt-8 space-y-8">
        <Step
          step={1}
          active={stepActive >= 1}
          question="Çoğunlukla nerede süreceksin?"
          value={usage}
          onChange={setUsage}
          options={USAGE_OPTS}
        />
        <Step
          step={2}
          active={stepActive >= 2}
          disabled={!usage}
          question="Sıfır mı ikinci el mi alacaksın?"
          value={acquisition}
          onChange={setAcquisition}
          options={ACQ_OPTS}
        />
        <Step
          step={3}
          active={stepActive >= 3}
          disabled={!acquisition}
          question="Senin için en önemli ne?"
          value={preference}
          onChange={setPreference}
          options={PREF_OPTS}
        />
        <Step
          step={4}
          active={stepActive >= 4}
          disabled={!preference}
          question="Hangi bütçe / segment?"
          value={budget}
          onChange={setBudget}
          options={BUDGET_OPTS}
        />
      </div>

      <AnimatePresence>
        {top3 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-electric-cyan">
              <TrophyIcon className="h-3.5 w-3.5" />
              Profiline en uygun 3 motor
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {top3.map((entry, i) => {
                const c = entry.competitor;
                const isTop = i === 0;
                return (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className={`relative flex flex-col rounded-3xl border p-5 transition ${
                      isTop
                        ? "border-yamaha-400/40 bg-gradient-to-br from-yamaha-500/12 via-electric-cyan/5 to-transparent"
                        : "border-white/[0.06] bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                          #{i + 1} · {c.brand}
                        </div>
                        <h3 className="mt-1 h-display text-xl font-semibold text-white">
                          {c.model}
                        </h3>
                        <div className="mt-1 text-[11px] text-carbon-300">{c.segment}</div>
                      </div>
                      <div
                        className={`rounded-2xl border px-3 py-1.5 text-center ${
                          isTop
                            ? "border-yamaha-400/50 bg-yamaha-500/15 text-yamaha-100"
                            : "border-white/[0.08] bg-white/[0.04] text-carbon-200"
                        }`}
                      >
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-75">
                          Skor
                        </div>
                        <div className="font-display text-xl font-bold leading-none">
                          {entry.score}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-carbon-100">
                      {c.highlight}
                    </p>

                    {/* Specs strip */}
                    <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-white/[0.06] bg-black/30 p-3 text-center">
                      <Spec label="Güç" value={`${c.specs.powerHp} HP`} />
                      <Spec label="Tork" value={`${c.specs.torqueNm} Nm`} />
                      <Spec label="Yakıt" value={`${c.specs.fuelLPer100}`} />
                    </div>

                    {/* Reasons */}
                    {entry.reasons.length > 0 && (
                      <ul className="mt-4 space-y-1.5">
                        {entry.reasons.slice(0, 3).map((r, idx) => {
                          const isWarn = r.startsWith("⚠");
                          return (
                            <li
                              key={idx}
                              className="flex items-start gap-1.5 text-[11px] leading-relaxed text-carbon-200"
                            >
                              {isWarn ? (
                                <AlertCircle className="h-3 w-3 shrink-0 text-electric-ember mt-0.5" />
                              ) : (
                                <CheckCircle2 className="h-3 w-3 shrink-0 text-electric-cyan mt-0.5" />
                              )}
                              <span>{r.replace(/^⚠\s*/, "")}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-5 text-[11px] leading-relaxed text-carbon-400">
              Skorlama notu: 4 kriterin ağırlıklı toplamı (kullanım 35%, öncelik 25%, satın
              alım türü 15%, bütçe 15%, Yamaha bayi-ağı boost 5%, ceza/bonus etkenleri).
              Üreticiden gelmemiş, bağımsız sıralamadır.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Step<T extends string>({
  step,
  question,
  value,
  onChange,
  options,
  disabled,
  active
}: {
  step: number;
  question: string;
  value: T | null;
  onChange: (v: T) => void;
  options: StepOption<T>[];
  disabled?: boolean;
  active: boolean;
}) {
  return (
    <div className={disabled ? "opacity-40 pointer-events-none" : ""}>
      <div className="flex items-center gap-3">
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold transition ${
            value
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : active
              ? "border-yamaha-500/40 bg-yamaha-500/10 text-yamaha-100"
              : "border-white/[0.08] bg-white/[0.02] text-carbon-300"
          }`}
        >
          0{step}
        </span>
        <h3 className="h-display text-base font-semibold text-white sm:text-lg">
          {question}
        </h3>
      </div>
      <div
        className={`mt-3 grid gap-2.5 ${
          options.length >= 5
            ? "sm:grid-cols-3 lg:grid-cols-5"
            : options.length === 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : options.length === 3
            ? "sm:grid-cols-3"
            : "sm:grid-cols-2"
        }`}
      >
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={isActive}
              className={`group flex flex-col gap-1.5 rounded-2xl border p-4 text-left transition-all duration-200 ${
                isActive
                  ? "border-yamaha-400/50 bg-gradient-to-b from-yamaha-500/15 to-transparent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "border-white/[0.06] bg-white/[0.015] text-carbon-200 hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  className={`h-4 w-4 transition ${
                    isActive ? "text-electric-cyan" : "text-carbon-300"
                  }`}
                />
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

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-carbon-400">
        {label}
      </div>
      <div className="mt-0.5 text-xs font-semibold text-white">{value}</div>
    </div>
  );
}
