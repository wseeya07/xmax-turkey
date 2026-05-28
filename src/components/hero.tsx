"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Wrench, ShoppingBag } from "lucide-react";

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
        <div className="max-w-4xl">
          <motion.div
            {...fade}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="chip">
              <span className="size-1.5 rounded-full bg-electric-cyan shadow-[0_0_10px_2px_rgba(38,232,255,0.6)]" />
              Türkiye&apos;nin XMAX rehberi
            </span>

            <h1 className="mt-6 h-display max-w-[18ch] text-balance text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              <span className="text-fade">XMAX&apos;in için</span>
              <br />
              <span className="text-fade">ihtiyacın olan her şey,</span>
              <br />
              <span className="text-electric">tek yerde.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-carbon-200 sm:text-lg">
              Bakım, satın alma ve modifikasyon — XMAX sahipleri ve almak isteyenler için Türkçe rehber. Hangi model sana uyar, garajda ne yapılır, yolda hangi lamba ne anlama gelir.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#intent-split"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-yamaha-400 to-yamaha-700 px-5 py-3 text-sm font-semibold text-white shadow-ambient-blue transition hover:from-yamaha-300 hover:to-yamaha-600"
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.4),transparent_60%)] opacity-70" />
                <Wrench className="relative h-4 w-4" />
                <span className="relative">XMAX&apos;im var</span>
              </Link>
              <Link
                href="#intent-split"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/15 hover:bg-white/[0.07]"
              >
                <ShoppingBag className="h-4 w-4 text-electric-cyan" />
                XMAX almak istiyorum
              </Link>
            </div>

            <a
              href="#intent-split"
              className="mt-10 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-carbon-300 transition hover:text-electric-cyan"
            >
              <ArrowDown className="h-3 w-3" />
              Yolunu seç
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
