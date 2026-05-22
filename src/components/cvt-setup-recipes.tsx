"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Flag, Wrench } from "lucide-react";
import { CVT_SETUPS } from "@/data/cvt-setups";
import { cn } from "@/lib/cn";

const MODELS = ["XMAX 250", "XMAX 300", "XMAX 400"] as const;

export function CvtSetupRecipes() {
  const [model, setModel] = useState<(typeof MODELS)[number]>("XMAX 300");
  const filtered = CVT_SETUPS.filter((s) => s.modelGroup === model);

  return (
    <section className="container-x py-24" id="setuplar">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <div className="eyebrow">Reçeteler</div>
          <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
            Yedi kurulum,{" "}
            <span className="text-electric">üç model.</span>
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-carbon-200">
            Tayland yarış pistlerinden, Endonezya stop-and-go atölyelerinden ve
            İtalyan agresif cadde kurulumlarından derlenen kanıtlanmış kombinasyonlar.
          </p>
        </div>

        <div className="flex gap-1 self-start rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
          {MODELS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setModel(m)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition",
                model === m
                  ? "bg-gradient-to-b from-yamaha-400/40 to-yamaha-700/40 text-white"
                  : "text-carbon-300 hover:text-white"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((s, i) => (
            <motion.article
              key={s.slug}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="glass gradient-edge relative overflow-hidden p-7 sm:p-8"
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl",
                  s.modelGroup === "XMAX 250" && "bg-electric-cyan/20",
                  s.modelGroup === "XMAX 300" && "bg-yamaha-500/25",
                  s.modelGroup === "XMAX 400" && "bg-electric-violet/25"
                )}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="chip">
                    <Flag className="h-3 w-3 text-electric-cyan" />
                    Reçete 0{s.number}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    {s.style}
                  </span>
                </div>

                <h3 className="mt-6 h-display text-2xl font-semibold leading-tight text-white">
                  {s.shortTitle}
                </h3>
                <p className="mt-1 text-xs text-carbon-300">{s.targetUse}</p>

                <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.06]">
                  <Metric label="Gaz tepkisi" value={s.metrics.throttle} />
                  <Metric label="Kavrama" value={s.metrics.engagementRPM} />
                  <Metric label="Sürüş devri" value={s.metrics.cruisingRPM} />
                  <Metric label="Son hız" value={s.metrics.topSpeedDelta} accent />
                </div>

                <div className="mt-6 space-y-3 text-xs leading-relaxed text-carbon-200">
                  <Row label="Ön varyatör" value={s.front.variator} />
                  <Row label="Baga" value={s.front.rollers} />
                  {s.front.shim && s.front.shim !== "Yok" && (
                    <Row label="Şim" value={s.front.shim} />
                  )}
                  <Row label="Debriyaj" value={s.rear.clutch} />
                  <Row label="Çan" value={s.rear.bell} />
                  <Row label="Yaylar" value={s.rear.springs} />
                </div>

                {s.modifications && s.modifications.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-yamaha-400/20 bg-yamaha-500/[0.06] p-4">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-3.5 w-3.5 text-yamaha-200" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                        Ek atölye işlemi
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-yamaha-50">
                      {s.modifications.map((m) => (
                        <li key={m} className="flex gap-1.5">
                          <span className="mt-1.5 size-1 shrink-0 rounded-full bg-yamaha-300" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.05] pt-5 text-xs">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    Kayış · {s.metrics.belt}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                    Bakım · {s.metrics.serviceInterval}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 text-center text-xs text-carbon-400">
        Reçeteler PDF kaynağından derlenmiş kanıtlanmış kombinasyonlardır.
        Kişisel kurulumlar farklı kombinasyonlar gerektirebilir.
      </div>
    </section>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-ink-900/80 px-4 py-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-400">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 font-mono text-sm",
          accent ? "text-electric-cyan" : "text-white"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-carbon-300">
        {label}
      </span>
      <span className="text-carbon-100">{value}</span>
    </div>
  );
}
