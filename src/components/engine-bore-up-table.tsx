"use client";

import { useMemo, useState } from "react";
import { Maximize2, Sparkles, Award } from "lucide-react";
import { BORE_UP_TABLE, BORE_UP_PRINCIPLES } from "@/data/engine-bore-up";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

const MODELS = ["XMAX 250", "XMAX 300", "XMAX 400"] as const;
const ICONS = [Maximize2, Sparkles, Award];

export function EngineBoreUpTable() {
  const [model, setModel] = useState<(typeof MODELS)[number]>("XMAX 300");
  const rows = useMemo(
    () => BORE_UP_TABLE.filter((r) => r.model === model),
    [model]
  );
  const stock = rows.find((r) => r.isStock);

  return (
    <section className="container-x py-24" id="bore-up">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
          <Maximize2 className="h-4 w-4" />
        </span>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
          Adım 1 · Silindir-Piston · CC Büyütme
        </div>
      </div>

      <Reveal>
        <div className="mt-5 max-w-3xl">
          <h2 className="h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
            Strok sabit,{" "}
            <span className="text-electric">çap büyür.</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
            XMAX serisinde hacim artışı strok değiştirilmeden silindir çapı
            büyütülerek elde edilir. <code className="rounded bg-white/[0.04] px-1.5 py-0.5 font-mono text-xs text-electric-cyan">V = π × (D/2)² × S</code>{" "}
            formülünde çap kare olarak girer — küçük bir bore artışı bile büyük
            hacim getirir.
          </p>
        </div>
      </Reveal>

      {/* Principle cards */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {BORE_UP_PRINCIPLES.map((p, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="glass-quiet h-full p-6">
                <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="mt-4 h-display text-lg font-semibold leading-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  {p.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Model selector */}
      <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="eyebrow">Hacim hesap tablosu</div>
          <h3 className="mt-2 h-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Modelini seç — kit ölçüsüne göre net hacim ve artış oranı.
          </h3>
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

      <Reveal>
        <div className="mt-8 glass overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  {["Varyant", "Piston Çapı", "Strok", "Net Hacim", "Artış", "Not"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={`${r.model}-${r.variant}`}
                    className={cn(
                      "border-b border-white/[0.04] transition hover:bg-white/[0.02] last:border-0",
                      r.isStock && "bg-white/[0.015]"
                    )}
                  >
                    <td className="px-6 py-5 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        {r.variant}
                        {r.isStock && (
                          <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-carbon-300">
                            OEM
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-mono text-xs text-electric-cyan">
                      {r.pistonDiameter.toFixed(1)} mm
                    </td>
                    <td className="px-6 py-5 font-mono text-xs text-carbon-200">
                      {r.strokeLength.toFixed(1)} mm
                    </td>
                    <td className="px-6 py-5 font-mono text-sm font-semibold text-white">
                      {r.netVolume.toFixed(2)} cc
                    </td>
                    <td
                      className={cn(
                        "px-6 py-5 font-mono text-xs font-semibold",
                        r.isStock ? "text-carbon-400" : "text-electric-violet"
                      )}
                    >
                      {r.growth}
                    </td>
                    <td className="max-w-[320px] px-6 py-5 text-xs leading-relaxed text-carbon-300">
                      {r.note ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {stock && (
            <div className="border-t border-white/[0.05] bg-white/[0.015] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
              {model} OEM referansı · {stock.pistonDiameter} × {stock.strokeLength} mm ·{" "}
              {stock.netVolume.toFixed(2)} cc
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
