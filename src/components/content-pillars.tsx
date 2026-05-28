import Link from "next/link";
import {
  ArrowUpRight,
  Wrench,
  Bike,
  ShoppingBag,
  Flame
} from "lucide-react";
import { Reveal } from "@/components/reveal";

const PILLARS = [
  {
    href: "/periyodik-bakim",
    title: "Bakım",
    summary: "Kilometre bazlı servis planı.",
    detail: "1.000 → 40.000 km, sıvılar, filtreler, kontrol noktaları.",
    icon: Wrench,
    tags: ["1K", "10K", "20K", "40K"],
    accent: "from-electric-cyan/30 via-yamaha-700/10",
    span: "lg:col-span-6"
  },
  {
    href: "/satin-alma-rehberi",
    title: "Satın Alma",
    summary: "Hangi XMAX, hangi yıl, hangi bütçe.",
    detail: "4 sürücü profili, 50 maddelik kontrol, vergi tabloları, jenerasyon farkları.",
    icon: ShoppingBag,
    tags: ["250", "300", "400", "2.El"],
    accent: "from-yamaha-500/40 via-yamaha-700/15",
    span: "lg:col-span-6"
  },
  {
    href: "/motor-modifikasyon",
    title: "Modifikasyon",
    summary: "Varyatör, motor, egzoz, ECU.",
    detail: "Stage 1/2/3 reçeteleri, marka mühendislikleri, AFR ve kam millerinin dili.",
    icon: Flame,
    tags: ["Varyatör", "Bore-up", "ECU", "Egzoz"],
    accent: "from-electric-violet/30 via-yamaha-700/10",
    span: "lg:col-span-6"
  },
  {
    href: "/teknik-ozellikler",
    title: "Teknik Özellikler",
    summary: "Dokuz jenerasyon karşılaştırması.",
    detail: "XMAX 250, 300 ve 400 — eski/ara/yeni kasalar yan yana, parça kodları.",
    icon: Bike,
    tags: ["Gen 3", "Gen 4", "Gen 5", "Gen 6"],
    accent: "from-yamaha-400/25 via-electric-cyan/10",
    span: "lg:col-span-6"
  }
];

export function ContentPillars() {
  return (
    <section className="container-x py-24" id="rehberler">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">Dört dikey</div>
            <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Konuya göre <span className="text-electric">tek tıkla</span> dal.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-carbon-300">
            Trafik ışığında akla gelen soru, garajda elinde anahtarla
            karşılaştığın engel — hepsine bu altı dikeyden bir cevap düşer.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 lg:grid-cols-12">
        {PILLARS.map((p, i) => (
          <Reveal key={p.href} delay={i * 0.04} className={p.span}>
            <Link
              href={p.href}
              className="glass gradient-edge group relative flex h-full flex-col justify-between overflow-hidden p-7 transition hover:-translate-y-0.5"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-60`}
                aria-hidden
              />
              <div className="relative flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-electric-cyan backdrop-blur-xl">
                  <p.icon className="h-4 w-4" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-carbon-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric-cyan" />
              </div>

              <div className="relative">
                <h3 className="mt-10 h-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-carbon-200">{p.summary}</p>
                <p className="mt-3 max-w-[44ch] text-xs leading-relaxed text-carbon-300">
                  {p.detail}
                </p>
                <div className="mt-5 flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/[0.07] bg-black/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-carbon-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
