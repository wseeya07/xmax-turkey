"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Gauge, Wrench, Bike, AlertCircle } from "lucide-react";

const QUICK = [
  { icon: Gauge, label: "Varyatör", href: "/varyator" },
  { icon: Wrench, label: "Bakım", href: "/periyodik-bakim" },
  { icon: Bike, label: "Modeller", href: "/teknik-ozellikler" },
  { icon: AlertCircle, label: "Hata kodları", href: "/bilgi/hata-kodlari" }
];

const HERO_SPEC = [
  { k: "Motor", v: "292 cc · Blue Core" },
  { k: "Tepe güç", v: "28 hp @ 7250" },
  { k: "Tork", v: "29 Nm @ 5750" },
  { k: "Ağırlık", v: "183 kg" }
];

export function Hero() {
  const reduced = useReducedMotion();
  const fade = reduced ? { initial: false } : { initial: { opacity: 0, y: 18 } };

  return (
    <section className="relative overflow-hidden pb-24 pt-16 sm:pt-24">
      <div className="absolute inset-0 grid-faint" aria-hidden />
      <div
        className="pointer-events-none absolute top-4 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-yamaha-500/20 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-4 right-[10%] h-[300px] w-[300px] rounded-full bg-electric-violet/15 blur-[100px]"
        aria-hidden
      />

      <div className="container-x relative">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <motion.div
            {...fade}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <span className="chip">
              <span className="size-1.5 rounded-full bg-electric-cyan shadow-[0_0_10px_2px_rgba(38,232,255,0.6)]" />
              XMAX teknik referansı
            </span>

            <h1 className="mt-6 h-display max-w-[16ch] text-balance text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              <span className="text-fade">Performans &</span>
              <br />
              <span className="text-fade">Mühendislik.</span>
              <br />
              <span className="text-electric">XMAX Bilgi Portalı.</span>
            </h1>

            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-carbon-200 sm:text-lg">
              Varyatör modifikasyonları, mekanik silindir ve tork setups, fren sistemi yükseltmeleri ve kilometre bazlı bakım takvimi — doğrudan sürücülerin ihtiyacı olan teknik doğrulukla.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/teknik-ozellikler"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-yamaha-400 to-yamaha-700 px-5 py-3 text-sm font-semibold text-white shadow-ambient-blue transition hover:from-yamaha-300 hover:to-yamaha-600"
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.4),transparent_60%)] opacity-70" />
                <span className="relative">Modelimi bul</span>
                <ArrowUpRight className="relative h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/periyodik-bakim"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/15 hover:bg-white/[0.07]"
              >
                Bakım takvimini aç
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-1.5">
              {QUICK.map((q) => (
                <li key={q.label}>
                  <Link
                    href={q.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 text-xs font-medium text-carbon-200 backdrop-blur-xl transition hover:border-white/15 hover:text-white"
                  >
                    <q.icon className="h-3.5 w-3.5 text-yamaha-300 transition group-hover:text-electric-cyan" />
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Floating spec card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div className="glass-frost gradient-edge relative overflow-hidden p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="eyebrow">Spec snapshot</div>
                  <div className="mt-1 h-display text-xl font-semibold text-white">
                    XMAX 300 · 2023+
                  </div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                  Euro 5
                </div>
              </div>

              <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-white/[0.06]">
                {HERO_SPEC.map((s) => (
                  <div
                    key={s.k}
                    className="flex items-baseline justify-between bg-ink-900/80 px-4 py-3"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                      {s.k}
                    </dt>
                    <dd className="font-mono text-sm text-white">{s.v}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/teknik-ozellikler/xmax-300-2023"
                className="mt-6 inline-flex w-full items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm font-medium text-white transition hover:border-yamaha-400/40"
              >
                Tam teknik profil
                <ArrowUpRight className="h-4 w-4 text-yamaha-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
