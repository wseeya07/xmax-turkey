"use client";

import Link from "next/link";
import { ArrowRight, Coins, Gauge, Map, Thermometer } from "lucide-react";
import { RIDER_PROFILES } from "@/data/buying-guide";
import { Reveal } from "@/components/reveal";

const PROFILE_ICONS: Record<string, any> = {
  "sehir-ici": Coins,
  "otoyol-artci": Gauge,
  "uzun-tur": Map,
  "kisin-konfor": Thermometer,
};

const PROFILE_COLORS: Record<string, string> = {
  "sehir-ici": "text-emerald-400 border-emerald-500/10 hover:border-emerald-500/30 bg-emerald-500/5",
  "otoyol-artci": "text-electric-cyan border-electric-cyan/10 hover:border-electric-cyan/30 bg-electric-cyan/5",
  "uzun-tur": "text-amber-400 border-amber-500/10 hover:border-amber-500/30 bg-amber-500/5",
  "kisin-konfor": "text-electric-violet border-electric-violet/10 hover:border-electric-violet/30 bg-electric-violet/5",
};

export function BuyingGuidePromo() {
  return (
    <section className="container-x py-24 relative overflow-hidden">
      <div 
        className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-electric-cyan/10 blur-3xl"
        aria-hidden
      />
      <div 
        className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-yamaha-500/10 blur-3xl"
        aria-hidden
      />

      <Reveal>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">Karşılaştırma · Satın Alma Rehberi</div>
            <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Hangi XMAX <span className="text-electric">sana daha uygun?</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-carbon-200">
              Sürüş tarzına en çok uyan profili seç — bütçeni, ihtiyaçlarını ve kullanım alanını optimize eden en doğru XMAX jenerasyonunu hemen gör.
            </p>
          </div>
          <Link
            href="/satin-alma-rehberi"
            className="group inline-flex items-center gap-1.5 self-start rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition hover:border-yamaha-400/40 hover:text-white sm:self-end"
          >
            Tam Rehbere Git
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {RIDER_PROFILES.map((p, i) => {
          const Icon = PROFILE_ICONS[p.slug];
          const colorClass = PROFILE_COLORS[p.slug];
          return (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link
                href="/satin-alma-rehberi"
                className={`glass gradient-edge group flex h-full flex-col justify-between p-6 transition duration-300 hover:-translate-y-1 hover:shadow-ambient-blue ${colorClass}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 transition group-hover:bg-white/[0.05]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-carbon-400">
                      Profil {i + 1}
                    </span>
                  </div>
                  
                  <h3 className="mt-6 h-display text-lg font-semibold leading-tight text-white group-hover:text-electric-cyan transition-colors">
                    {p.title}
                  </h3>
                  
                  <p className="mt-3 text-xs leading-relaxed text-carbon-300">
                    {p.tagline}
                  </p>
                  
                  <div className="mt-4 inline-flex items-center gap-1 bg-white/[0.03] rounded-full px-3 py-1 border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-carbon-300">Öneri:</span>
                    <span className="text-[10px] font-semibold text-white">{p.recommendedModel}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-white">
                  Profili analiz et
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
