"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Gauge, Wrench, BookOpen, Database } from "lucide-react";

const PILLARS = [
  { icon: Gauge, label: "Varyatör Modifikasyonu" },
  { icon: Wrench, label: "Periyodik Bakım" },
  { icon: BookOpen, label: "Nasıl Yapılır" },
  { icon: Database, label: "Teknik Özellikler" }
];

const STATS = [
  { value: "4", suffix: "", label: "Jenerasyon" },
  { value: "20K+", suffix: "", label: "KM Bakım Planı" },
  { value: "3", suffix: "", label: "Varyatör Markası" },
  { value: "100%", suffix: "", label: "Türkçe İçerik" }
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pt-20">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-yamaha-500/20 blur-3xl"
        aria-hidden
      />

      <div className="container-x relative">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6"
        >
          <span className="chip">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yamaha-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-yamaha-300" />
            </span>
            Türkiye&apos;nin XMAX Bilgi Platformu
          </span>

          <h1 className="h-display max-w-[18ch] text-balance text-4xl font-semibold leading-[0.98] text-white sm:text-6xl md:text-7xl">
            XMAX için{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-br from-white via-yamaha-200 to-yamaha-500 bg-clip-text text-transparent">
                teknik
              </span>
            </span>{" "}
            ve{" "}
            <span className="bg-gradient-to-br from-yamaha-300 via-yamaha-500 to-neon-cyan bg-clip-text text-transparent">
              mekanik
            </span>{" "}
            referans.
          </h1>

          <p className="max-w-2xl text-pretty text-base leading-relaxed text-carbon-200 sm:text-lg">
            Varyatör modifikasyonlarından kilometre bazlı bakım planına, antifriz
            değişiminden jenerasyon karşılaştırmasına — Yamaha XMAX sahibinin
            ihtiyacı olan her bilginin tek adresi.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/teknik-ozellikler"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-yamaha-400 to-yamaha-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:from-yamaha-300 hover:to-yamaha-500"
            >
              Modelimi bul
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/periyodik-bakim"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Bakım planlayıcıyı aç
            </Link>
          </div>

          <ul className="mt-2 flex flex-wrap gap-2">
            {PILLARS.map((p) => (
              <li
                key={p.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-carbon-200"
              >
                <p.icon className="h-3.5 w-3.5 text-yamaha-300" />
                {p.label}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.dl
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-2 gap-3 sm:mt-20 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="panel gradient-border px-5 py-5"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                {s.label}
              </dt>
              <dd className="mt-2 h-display text-3xl font-semibold text-white sm:text-4xl">
                {s.value}
                <span className="text-yamaha-300">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
