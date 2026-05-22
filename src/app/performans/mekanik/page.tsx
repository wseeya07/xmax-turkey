import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { MekanikDashboard } from "@/components/mekanik-dashboard";

export const metadata: Metadata = {
  title: "XMAX Mekanik Motor Modifikasyonu ve Silindir Kitleri",
  description: "Yamaha XMAX 250 ve 300 için Kademeli Mekanik Güçlendirme (Stage 1 - Stage 4). Seramik silindir kitleri, dövme krank, biyel kolu ve standalone ECU haritalama rehberi.",
  alternates: { canonical: "/performans/mekanik" }
};

export default function MechanicalPerformancePage() {
  return (
    <>
      <article className="container-x py-16">
        <Link
          href="/performans"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-electric-cyan"
        >
          <ChevronLeft className="h-4 w-4" />
          Performans Paneli
        </Link>

        <Reveal>
          <header className="mt-6 max-w-4xl">
            <span className="chip">Silindir & Güç setups</span>
            <h1 className="mt-4 h-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Mekanik setups: <span className="text-electric">Güç ve Hacim Kademeleri.</span>
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200">
              Varyatör modifikasyonları motorun mevcut gücünü daha iyi iletirken, mekanik setups <strong className="text-white">doğrudan beygir (HP) ve tork (Nm) üretir</strong>. XMAX 250 ve 300 Blue Core motorları için bilimsel Ar-Ge çalışmalarına dayalı kademeli güçlendirme aşamalarını inceleyin.
            </p>
            <div className="mt-5">
              <Link
                href="/motor-modifikasyon"
                className="group inline-flex items-center gap-2 rounded-2xl border border-electric-violet/30 bg-electric-violet/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-electric-violet/60"
              >
                Derinlemesine motor modifikasyon makalesine geç — aRacer, wideband AFR ve 3 model reçetesi
                <ArrowUpRight className="h-4 w-4 text-electric-violet transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </header>
        </Reveal>

        {/* Interactive Stages Dashboard */}
        <section className="mt-12">
          <Reveal>
            <MekanikDashboard />
          </Reveal>
        </section>
      </article>
    </>
  );
}
