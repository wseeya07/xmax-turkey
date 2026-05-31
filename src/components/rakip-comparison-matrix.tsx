"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { COMPETITORS, type Competitor } from "@/data/rakipler";

type SortKey =
  | "displacement"
  | "power"
  | "torque"
  | "weight"
  | "seat"
  | "fuel"
  | "underseat"
  | null;

function fuelMin(s: string) {
  return parseFloat(s.split("–")[0].trim());
}

export function RakipComparisonMatrix() {
  const [sort, setSort] = useState<SortKey>(null);
  const [dir, setDir] = useState<"asc" | "desc">("asc");

  const sorted = [...COMPETITORS].sort((a, b) => {
    if (!sort) return 0;
    const aVal =
      sort === "displacement"
        ? a.specs.displacementCc
        : sort === "power"
        ? a.specs.powerHp
        : sort === "torque"
        ? a.specs.torqueNm
        : sort === "weight"
        ? a.specs.wetKg
        : sort === "seat"
        ? a.specs.seatMm
        : sort === "fuel"
        ? fuelMin(a.specs.fuelLPer100)
        : a.specs.underseatL ?? 0;
    const bVal =
      sort === "displacement"
        ? b.specs.displacementCc
        : sort === "power"
        ? b.specs.powerHp
        : sort === "torque"
        ? b.specs.torqueNm
        : sort === "weight"
        ? b.specs.wetKg
        : sort === "seat"
        ? b.specs.seatMm
        : sort === "fuel"
        ? fuelMin(b.specs.fuelLPer100)
        : b.specs.underseatL ?? 0;
    return dir === "asc" ? aVal - bVal : bVal - aVal;
  });

  const toggleSort = (key: SortKey) => {
    if (sort === key) {
      setDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSort(key);
      setDir("desc");
    }
  };

  return (
    <div className="glass-frost overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.025] text-[10px] font-mono uppercase tracking-[0.2em] text-carbon-300">
                <th className="sticky left-0 z-10 bg-ink-900/95 px-4 py-3 backdrop-blur">
                  Model
                </th>
                <SortTh
                  label="Hacim"
                  active={sort === "displacement"}
                  dir={dir}
                  onClick={() => toggleSort("displacement")}
                />
                <th className="px-3 py-3">Motor</th>
                <SortTh
                  label="Güç"
                  active={sort === "power"}
                  dir={dir}
                  onClick={() => toggleSort("power")}
                />
                <SortTh
                  label="Tork"
                  active={sort === "torque"}
                  dir={dir}
                  onClick={() => toggleSort("torque")}
                />
                <SortTh
                  label="Yakıt"
                  active={sort === "fuel"}
                  dir={dir}
                  onClick={() => toggleSort("fuel")}
                />
                <SortTh
                  label="Ağırlık"
                  active={sort === "weight"}
                  dir={dir}
                  onClick={() => toggleSort("weight")}
                />
                <SortTh
                  label="Sele"
                  active={sort === "seat"}
                  dir={dir}
                  onClick={() => toggleSort("seat")}
                />
                <SortTh
                  label="Bagaj"
                  active={sort === "underseat"}
                  dir={dir}
                  onClick={() => toggleSort("underseat")}
                />
                <th className="px-3 py-3">Türkiye notu</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <motion.tr
                  key={c.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`border-b border-white/[0.04] transition hover:bg-white/[0.025] ${
                    c.isXmax ? "bg-yamaha-500/[0.05]" : ""
                  }`}
                >
                  <td className="sticky left-0 z-10 bg-ink-900/95 px-4 py-3.5 backdrop-blur">
                    <div className="flex items-center gap-2">
                      {c.isXmax && (
                        <Star
                          className="h-3.5 w-3.5 shrink-0 text-yamaha-300"
                          aria-label="XMAX"
                        />
                      )}
                      <div>
                        <div className="font-display font-semibold text-white">
                          {c.brand} {c.model}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-carbon-400">
                          {c.segment.split("(")[0].trim()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <Td>{c.specs.displacementCc} cc</Td>
                  <Td>
                    <div className="text-[11px] text-carbon-200">{c.specs.layout}</div>
                    <div className="text-[10px] text-carbon-400">
                      CR {c.specs.compression}
                    </div>
                  </Td>
                  <Td>
                    <div className="font-semibold text-white">
                      {c.specs.powerHp} HP
                    </div>
                    <div className="text-[10px] text-carbon-400">
                      @ {c.specs.powerRpm.toLocaleString("tr-TR")} rpm
                    </div>
                  </Td>
                  <Td>
                    <div className="font-semibold text-white">
                      {c.specs.torqueNm} Nm
                    </div>
                    <div className="text-[10px] text-carbon-400">
                      @ {c.specs.torqueRpm.toLocaleString("tr-TR")} rpm
                    </div>
                  </Td>
                  <Td>{c.specs.fuelLPer100} L/100</Td>
                  <Td>{c.specs.wetKg} kg</Td>
                  <Td>{c.specs.seatMm} mm</Td>
                  <Td>{c.specs.underseatL ?? "—"} L</Td>
                  <td className="px-3 py-3.5 text-[11px] leading-snug text-carbon-200 max-w-[240px]">
                    {c.marketNote}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 p-4 md:hidden">
        {COMPETITORS.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`rounded-2xl border p-4 ${
              c.isXmax
                ? "border-yamaha-400/30 bg-yamaha-500/[0.05]"
                : "border-white/[0.06] bg-white/[0.015]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  {c.isXmax && <Star className="h-3 w-3 text-yamaha-300" />}
                  <div className="font-display text-base font-semibold text-white">
                    {c.brand} {c.model}
                  </div>
                </div>
                <div className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-carbon-400">
                  {c.segment.split("(")[0].trim()}
                </div>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-black/30 px-2 py-1 text-right">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-carbon-400">
                  Hacim
                </div>
                <div className="text-xs font-semibold text-white">
                  {c.specs.displacementCc} cc
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl border border-white/[0.06] bg-black/20 p-2.5 text-center">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-carbon-400">
                  Güç
                </div>
                <div className="text-xs font-semibold text-white">
                  {c.specs.powerHp} HP
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-carbon-400">
                  Tork
                </div>
                <div className="text-xs font-semibold text-white">
                  {c.specs.torqueNm} Nm
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-carbon-400">
                  Yakıt
                </div>
                <div className="text-xs font-semibold text-white">
                  {c.specs.fuelLPer100}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-carbon-300">
              <div>
                <span className="text-carbon-400">Ağırlık · </span>
                <span className="text-white">{c.specs.wetKg} kg</span>
              </div>
              <div>
                <span className="text-carbon-400">Sele · </span>
                <span className="text-white">{c.specs.seatMm} mm</span>
              </div>
              <div>
                <span className="text-carbon-400">Bagaj · </span>
                <span className="text-white">{c.specs.underseatL ?? "—"} L</span>
              </div>
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-carbon-200">
              {c.marketNote}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SortTh({
  label,
  active,
  dir,
  onClick
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
}) {
  return (
    <th className="px-3 py-3">
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 transition ${
          active ? "bg-white/[0.06] text-white" : "hover:text-white"
        }`}
      >
        {label}
        {active &&
          (dir === "asc" ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          ))}
      </button>
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-3 py-3.5 text-[12px] text-carbon-100 whitespace-nowrap">
      {children}
    </td>
  );
}
