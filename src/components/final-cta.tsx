import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function FinalCTA() {
  return (
    <section className="container-x pb-24 pt-12">
      <Reveal>
        <div className="panel gradient-border relative overflow-hidden p-10 sm:p-16">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yamaha-500/30 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-neon-cyan/20 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="chip">
                <span className="size-1.5 rounded-full bg-yamaha-300" />
                Topluluk Kaynağı
              </span>
              <h2 className="mt-4 h-display text-balance text-3xl font-semibold leading-[1.05] text-white sm:text-4xl md:text-5xl">
                XMAX&apos;ini en doğru bilgiyle çalıştır.
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200">
                Modelinin parça kodlarına, varyatör seçimine ve bakım takvimine
                aynı yerden ulaş — TR içerik, sahibe-sahip yaklaşım.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/teknik-ozellikler"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-yamaha-400 to-yamaha-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:from-yamaha-300 hover:to-yamaha-500"
              >
                Modelimi seç
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/varyator"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Varyatör rehberi
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
