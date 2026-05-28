"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Wrench, ShoppingBag } from "lucide-react";

export function Hero() {
  const reduced = useReducedMotion();
  const fade = reduced ? { initial: false } : { initial: { opacity: 0, y: 18 } };

  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden sm:min-h-[720px] lg:min-h-[780px]">
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/hero/xmax-hero-desktop.jpg"
          alt="Yamaha XMAX 300, mavi saatte ıslak şehir yolunda X şeklinde LED farıyla."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/hero/xmax-hero-mobile.jpg"
          alt="Yamaha XMAX 300, gece şehir manzarası önünde 3/4 önden, asfaltta cyan yansıma."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-black/85 lg:hidden"
        aria-hidden
      />
      <div
        className="absolute inset-0 hidden bg-gradient-to-l from-black/90 via-black/55 to-black/10 lg:block"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"
        aria-hidden
      />

      <div className="absolute inset-0 grid-faint opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -top-10 right-[18%] h-[300px] w-[560px] rounded-full bg-yamaha-500/12 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-12 right-[6%] h-[240px] w-[240px] rounded-full bg-electric-cyan/10 blur-[100px]"
        aria-hidden
      />

      <div className="container-x relative w-full">
        <div className="max-w-2xl py-20 sm:py-24 lg:ml-auto lg:py-28">
          <motion.div
            {...fade}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="chip">
              <span className="size-1.5 rounded-full bg-electric-cyan shadow-[0_0_10px_2px_rgba(38,232,255,0.6)]" />
              Türkiye&apos;nin XMAX rehberi
            </span>

            <h1 className="mt-6 h-display max-w-[18ch] text-balance text-[clamp(2.4rem,6.5vw,5.2rem)] font-semibold leading-tighter-display tracking-tightest text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
              <span className="text-fade">XMAX&apos;in için</span>
              <br />
              <span className="text-fade">ihtiyacın olan her şey,</span>
              <br />
              <span className="text-electric">tek yerde.</span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-carbon-100 drop-shadow-md sm:text-lg">
              Bakım, satın alma ve modifikasyon — XMAX sahipleri ve almak isteyenler için Türkçe rehber. Hangi model sana uyar, garajda ne yapılır, yolda hangi lamba ne anlama gelir.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.14]"
              >
                <ShoppingBag className="h-4 w-4 text-electric-cyan" />
                XMAX almak istiyorum
              </Link>
            </div>

            <a
              href="#intent-split"
              className="mt-10 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-carbon-200 transition hover:text-electric-cyan"
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
