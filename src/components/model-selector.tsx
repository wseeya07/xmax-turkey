"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GENERATIONS, type Generation } from "@/data/generations";
import { cn } from "@/lib/cn";

const GROUPS = ["XMAX 250", "XMAX 300", "XMAX 400"] as const;

function detectGroup(g: Generation): (typeof GROUPS)[number] {
  if (g.slug.startsWith("xmax-250")) return "XMAX 250";
  if (g.slug.startsWith("xmax-300")) return "XMAX 300";
  return "XMAX 400";
}

export function ModelSelector() {
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("XMAX 300");

  const generationsByGroup = useMemo(() => {
    return GROUPS.reduce<Record<string, Generation[]>>((acc, g) => {
      acc[g] = GENERATIONS.filter((gen) => detectGroup(gen) === g);
      return acc;
    }, {});
  }, []);

  const groupItems = generationsByGroup[group] ?? [];
  const [activeSlug, setActiveSlug] = useState(
    groupItems[groupItems.length - 1]?.slug ?? GENERATIONS[0].slug
  );

  const current = useMemo(() => {
    const inGroup = groupItems.find((g) => g.slug === activeSlug);
    return inGroup ?? groupItems[groupItems.length - 1] ?? GENERATIONS[0];
  }, [activeSlug, groupItems]);

  const handleGroup = (g: (typeof GROUPS)[number]) => {
    setGroup(g);
    const next = generationsByGroup[g];
    if (next && next.length > 0) setActiveSlug(next[next.length - 1].slug);
  };

  return (
    <section className="container-x py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <div>
            <div className="eyebrow">Modelimi tanı</div>
            <h2 className="mt-3 h-display text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Doğru modele kilitlen,{" "}
              <span className="text-electric">veri seninle gelsin.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-carbon-200">
              XMAX&apos;inin model grubunu ve yılını seç — motor, ağırlık, parça
              kodları ve uyumlu modifikasyon listesi otomatik dolar.
            </p>
          </div>

          {/* Model group tabs */}
          <div className="flex gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 self-start">
            {GROUPS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => handleGroup(g)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition",
                  group === g
                    ? "bg-gradient-to-b from-yamaha-400/40 to-yamaha-700/40 text-white"
                    : "text-carbon-300 hover:text-white"
                )}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Generation list */}
          <div className="flex flex-col gap-2">
            {groupItems.map((g) => {
              const isActive = g.slug === current.slug;
              return (
                <button
                  key={g.slug}
                  type="button"
                  onClick={() => setActiveSlug(g.slug)}
                  className={cn(
                    "group relative flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition",
                    isActive
                      ? "border-yamaha-400/40 bg-gradient-to-r from-yamaha-500/15 to-transparent"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/15"
                  )}
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                      {g.yearRange} · {g.euro}
                    </div>
                    <div className="mt-1 h-display text-base font-semibold text-white">
                      {g.model}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "size-2 rounded-full transition",
                      isActive
                        ? "bg-electric-cyan shadow-[0_0_12px_2px_rgba(38,232,255,0.6)]"
                        : "bg-white/15"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={current.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="glass-frost gradient-edge relative flex h-full flex-col overflow-hidden p-8"
        >
          <div
            className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-yamaha-500/25 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="eyebrow">Seçili</div>
                <div className="mt-2 h-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  {current.model}
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-carbon-300">
                  {current.yearRange} · {current.euro}
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-carbon-200">
              {current.highlight}
            </p>

            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.06] sm:grid-cols-4">
              <Cell k="Motor" v={current.displacement} />
              <Cell k="Beygir" v={`${current.power.hp} hp`} />
              <Cell k="Tork" v={`${current.torque.nm} Nm`} />
              <Cell k="Ağırlık" v={`${current.weight.wet} kg`} />
            </dl>

            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              <Link
                href={`/teknik-ozellikler/${current.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-medium text-white transition hover:border-yamaha-400/40"
              >
                Tam teknik profil
                <ArrowUpRight className="h-4 w-4 text-yamaha-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/varyator"
                className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-medium text-white transition hover:border-yamaha-400/40"
              >
                Bu modele uygun varyatörler
                <ArrowUpRight className="h-4 w-4 text-yamaha-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-ink-900/80 px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
        {k}
      </div>
      <div className="mt-1 font-mono text-sm text-white">{v}</div>
    </div>
  );
}
