"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Beaker,
  Cog,
  Cpu,
  Droplets,
  Wind,
  Thermometer,
  Target
} from "lucide-react";
import { ENGINE_SETUPS } from "@/data/engine-setups";
import { cn } from "@/lib/cn";

const MODELS = ["XMAX 250", "XMAX 300", "XMAX 400"] as const;

const STYLE_TONE = {
  "Stage 1 · Cadde": "text-electric-cyan border-electric-cyan/30 bg-electric-cyan/[0.06]",
  "Stage 2 · Tork + Touring":
    "text-yamaha-200 border-yamaha-400/30 bg-yamaha-500/[0.08]",
  "Stage 3 · Drag / Pist":
    "text-electric-violet border-electric-violet/40 bg-electric-violet/[0.08]"
} as const;

export function EngineSetupRecipes() {
  const [model, setModel] = useState<(typeof MODELS)[number]>("XMAX 300");
  const setup = ENGINE_SETUPS.find((s) => s.modelGroup === model);

  return (
    <section className="container-x py-24" id="receteler">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <div className="eyebrow">Reçeteler</div>
          <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
            Üç model,{" "}
            <span className="text-electric">üç eksiksiz kurulum.</span>
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-carbon-200">
            Tayland, Endonezya ve Malezya atölyelerinde en yüksek verim +
            dayanıklılık elde eden doğrulanmış kurulum parametreleri. Her reçete
            silindir, sıkıştırma, eksantrik, hava-yakıt ve ECU değerlerini
            birlikte verir.
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

      <AnimatePresence mode="wait">
        {setup && (
          <motion.article
            key={setup.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 glass gradient-edge relative overflow-hidden p-8 sm:p-12"
          >
            <div
              className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-electric-violet/15 blur-3xl"
              aria-hidden
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${
                      STYLE_TONE[setup.style as keyof typeof STYLE_TONE] ?? ""
                    }`}
                  >
                    {setup.style}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    Reçete · 0{setup.number}
                  </span>
                </div>
                <h3 className="mt-5 h-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  {setup.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-carbon-100">
                  {setup.intent}
                </p>

                {/* Block + compression */}
                <div className="mt-7 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                    <Beaker className="h-3 w-3" /> Silindir & Piston
                  </div>
                  <div className="mt-3 text-sm font-semibold text-white">
                    {setup.block.kit}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-electric-cyan">
                    {setup.block.netVolume}
                  </div>
                  <div className="mt-2 text-xs leading-relaxed text-carbon-200">
                    {setup.block.piston}
                  </div>
                  {setup.block.spark && (
                    <div className="mt-1 text-xs leading-relaxed text-carbon-300">
                      Buji · {setup.block.spark}
                    </div>
                  )}
                  <div className="mt-4 border-t border-white/[0.05] pt-3 text-xs">
                    <span className="font-mono uppercase tracking-wider text-carbon-400">
                      Sıkıştırma ·{" "}
                    </span>
                    <span className="text-white">{setup.compression}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="mt-6 space-y-2">
                  {setup.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2 text-sm leading-relaxed text-carbon-100"
                    >
                      <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric-cyan" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column — spec grid */}
              <div className="space-y-4">
                <SpecBlock
                  icon={Cog}
                  label="Eksantrik mili"
                  body={setup.camshaft}
                />
                <SpecBlock
                  icon={Wind}
                  label="Throttle & Hava akışı"
                  body={setup.throttleAndAir}
                />
                <SpecBlock
                  icon={Droplets}
                  label="Enjektör"
                  body={setup.injector}
                />

                <div className="rounded-2xl border border-electric-violet/30 bg-electric-violet/[0.06] p-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-electric-violet">
                    <Cpu className="h-3 w-3" /> ECU · {setup.ecu.unit}
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <EcuRow k="Rölanti" v={setup.ecu.idleRpm} />
                    <EcuRow k="Devir limit" v={setup.ecu.rpmLimit} />
                    <EcuRow k="AFR haritası" v={setup.ecu.afrMap} full />
                    <EcuRow k="Ateşleme avansı" v={setup.ecu.ignition} full />
                  </dl>
                </div>

                {setup.thermal && setup.thermal.length > 0 && (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.05] p-5">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-red-300">
                      <Thermometer className="h-3 w-3" /> Isı yönetimi (kritik)
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {setup.thermal.map((t) => (
                        <li
                          key={t}
                          className="flex gap-2 text-xs leading-relaxed text-carbon-100"
                        >
                          <Flame className="mt-0.5 h-3 w-3 shrink-0 text-red-300" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}

function SpecBlock({
  icon: Icon,
  label,
  body
}: {
  icon: typeof Cog;
  label: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white">{body}</p>
    </div>
  );
}

function EcuRow({ k, v, full = false }: { k: string; v: string; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-400">
        {k}
      </div>
      <div className="mt-1 text-xs text-white leading-snug">{v}</div>
    </div>
  );
}
