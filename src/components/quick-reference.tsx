import Link from "next/link";
import { ArrowUpRight, AlertCircle, CircleDot } from "lucide-react";
import { TIRE_PRESSURE } from "@/data/tire-pressure";
import { ERROR_CODES } from "@/data/error-codes";
import { Reveal } from "@/components/reveal";

const SEVERITY_TONE: Record<string, string> = {
  kritik: "text-red-300 border-red-500/30 bg-red-500/10",
  yüksek: "text-yamaha-200 border-yamaha-400/30 bg-yamaha-500/10",
  orta: "text-carbon-200 border-white/[0.08] bg-white/[0.03]"
};

export function QuickReference() {
  const tireSample = TIRE_PRESSURE[2];
  const errSample = ERROR_CODES.slice(0, 4);

  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">Hızlı referans</div>
            <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Yol kenarında <span className="text-electric">arayan</span> için.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-carbon-300">
            Lastik basıncı, hata kodu, tork değeri — uzun makaleye girmeden
            ihtiyacın olan bilgi. Tek ekranda.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {/* Tire pressure card */}
        <Reveal>
          <Link
            href="/bilgi/lastik-basinci"
            className="glass gradient-edge group flex h-full flex-col justify-between p-7 transition hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="chip">
                  <CircleDot className="h-3 w-3 text-electric-cyan" />
                  Lastik basıncı
                </span>
                <ArrowUpRight className="h-4 w-4 text-carbon-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric-cyan" />
              </div>

              <h3 className="mt-7 h-display text-2xl font-semibold leading-tight text-white">
                {tireSample.model}
              </h3>
              <p className="mt-2 text-xs text-carbon-300">
                Soğuk · {tireSample.size.front} / {tireSample.size.rear}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.06]">
                <PressureCell
                  position="Ön"
                  solo={tireSample.front.solo}
                  pillion={tireSample.front.pillion}
                />
                <PressureCell
                  position="Arka"
                  solo={tireSample.rear.solo}
                  pillion={tireSample.rear.pillion}
                />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-carbon-300">
                Çift kişi / yüklüyken arka basıncını önerilen değere çek. Soğuk
                lastikte ölç.
              </p>
            </div>

            <div className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-electric-cyan">
              Tüm jenerasyonlar için
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </Reveal>

        {/* Error codes card */}
        <Reveal delay={0.06}>
          <Link
            href="/bilgi/hata-kodlari"
            className="glass gradient-edge group flex h-full flex-col justify-between p-7 transition hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="chip">
                  <AlertCircle className="h-3 w-3 text-electric-cyan" />
                  Hata kodları
                </span>
                <ArrowUpRight className="h-4 w-4 text-carbon-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric-cyan" />
              </div>

              <h3 className="mt-7 h-display text-2xl font-semibold leading-tight text-white">
                ECU · ABS · TCS uyarıları
              </h3>
              <p className="mt-2 text-xs text-carbon-300">
                Pano lambası yandığında ne anlama gelir, ne yapılmalı.
              </p>

              <ul className="mt-6 space-y-1.5">
                {errSample.map((e) => (
                  <li
                    key={e.code}
                    className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-xs ${SEVERITY_TONE[e.severity]}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] font-semibold">
                        {e.code}
                      </span>
                      <span className="text-white/90">{e.title}</span>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
                      {e.system}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-electric-cyan">
              Tüm kodlar
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function PressureCell({
  position,
  solo,
  pillion
}: {
  position: string;
  solo: number;
  pillion: number;
}) {
  return (
    <div className="bg-ink-900/80 p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
        {position}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="h-display text-3xl font-semibold text-white">
          {solo.toFixed(2)}
        </span>
        <span className="font-mono text-xs text-carbon-300">bar</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
          Çift kişi
        </span>
        <span className="font-mono text-xs text-electric-cyan">
          {pillion.toFixed(2)} bar
        </span>
      </div>
    </div>
  );
}
