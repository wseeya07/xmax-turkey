"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Wrench, Eye } from "lucide-react";
import { WORKSHOP_TECHNIQUES } from "@/data/cvt-workshop";
import { cn } from "@/lib/cn";

const DIFF_TONE = {
  atölye: "text-electric-cyan border-electric-cyan/30 bg-electric-cyan/[0.06]",
  ileri: "text-yamaha-200 border-yamaha-400/30 bg-yamaha-500/[0.08]",
  uzman: "text-electric-violet border-electric-violet/40 bg-electric-violet/[0.08]"
} as const;

const DIFF_LABEL = {
  atölye: "Atölye",
  ileri: "İleri",
  uzman: "Uzman"
} as const;

export function CvtWorkshopTechniques() {
  const [active, setActive] = useState(WORKSHOP_TECHNIQUES[0].slug);
  const current =
    WORKSHOP_TECHNIQUES.find((t) => t.slug === active) ?? WORKSHOP_TECHNIQUES[0];

  return (
    <section className="container-x py-24" id="atolye-sirlari">
      <div className="max-w-3xl">
        <div className="eyebrow">Atölye sırları</div>
        <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
          Hazır kit takmak değil,{" "}
          <span className="text-electric">kit&apos;i milimetrik işlemek.</span>
        </h2>
        <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
          Endonezya (Bubut Derajat) ve Tayland (Kerok Jalur) atölyelerini batılı
          rakiplerinden ayıran şey, hazır parçayı doğrudan takmak yerine torna ve
          frezeyle modifiye etmeleridir.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {WORKSHOP_TECHNIQUES.map((t) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => setActive(t.slug)}
              className={cn(
                "group min-w-[260px] shrink-0 rounded-2xl border px-4 py-3 text-left transition lg:min-w-0",
                t.slug === active
                  ? "border-yamaha-400/40 bg-gradient-to-r from-yamaha-500/15 to-transparent"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/15"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.22em]",
                    t.slug === active ? "text-electric-cyan" : "text-carbon-300"
                  )}
                >
                  {t.origin}
                </div>
                <span
                  className={cn(
                    "rounded-md border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]",
                    DIFF_TONE[t.difficulty]
                  )}
                >
                  {DIFF_LABEL[t.difficulty]}
                </span>
              </div>
              <div className="mt-1.5 h-display text-sm font-semibold leading-tight text-white">
                {t.title}
              </div>
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.article
            key={current.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass gradient-edge relative overflow-hidden p-8 sm:p-10"
          >
            <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-yamaha-500/20 blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip">
                  <MapPin className="h-3 w-3 text-electric-cyan" />
                  {current.origin}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]",
                    DIFF_TONE[current.difficulty]
                  )}
                >
                  {DIFF_LABEL[current.difficulty]}
                </span>
              </div>

              <h3 className="mt-5 h-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {current.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-carbon-200">
                {current.summary}
              </p>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-3.5 w-3.5 text-electric-cyan" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                      İşlem detayı
                    </span>
                  </div>
                  <ol className="mt-3 space-y-2 text-sm leading-relaxed text-carbon-100">
                    {current.steps.map((s, i) => (
                      <li key={s} className="flex gap-2.5">
                        <span className="font-mono text-[10px] font-semibold text-electric-cyan">
                          0{i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-yamaha-500/[0.08] to-transparent p-5">
                    <div className="flex items-center gap-2">
                      <Eye className="h-3.5 w-3.5 text-yamaha-200" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                        Kazanç
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white">
                      {current.benefit}
                    </p>
                  </div>

                  {current.warning && (
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.08] p-5">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-red-300" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-300">
                          Uyarı
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-red-50">
                        {current.warning}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
