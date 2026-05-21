import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function FinalCTA() {
  return (
    <section className="container-x pb-24 pt-12">
      <Reveal>
        <div className="glass-frost gradient-edge relative overflow-hidden p-10 sm:p-16">
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-yamaha-500/35 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-electric-violet/25 blur-3xl"
            aria-hidden
          />

          <div className="relative grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="eyebrow">Sahip kaynağı</div>
              <h2 className="mt-4 h-display text-balance text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-tighter-display tracking-tightest text-white">
                XMAX&apos;ini doğru veriyle{" "}
                <span className="text-electric">çalıştır.</span>
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-carbon-200">
                Modelinin parça kodlarına, varyatör seçimine, lastik basıncına,
                hata kodlarına ve adım adım rehberlere aynı yerden ulaş.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/teknik-ozellikler"
                className="group relative inline-flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-yamaha-400 to-yamaha-700 px-5 py-4 text-sm font-semibold text-white shadow-ambient-blue transition hover:from-yamaha-300 hover:to-yamaha-600"
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.4),transparent_60%)]" />
                <span className="relative">Modelimi seç</span>
                <ArrowUpRight className="relative h-4 w-4" />
              </Link>
              <Link
                href="/varyator"
                className="inline-flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/15"
              >
                Varyatör karşılaştırması
                <ArrowUpRight className="h-4 w-4 text-yamaha-300" />
              </Link>
              <Link
                href="/bilgi/hata-kodlari"
                className="inline-flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/15"
              >
                Hata kodu sözlüğü
                <ArrowUpRight className="h-4 w-4 text-yamaha-300" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
