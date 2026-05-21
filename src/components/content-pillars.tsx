import Link from "next/link";
import {
  ArrowUpRight,
  Gauge,
  Wrench,
  BookOpen,
  Bike,
  CircleDot,
  Sofa
} from "lucide-react";
import { Reveal } from "@/components/reveal";

const PILLARS = [
  {
    href: "/varyator",
    title: "Performans",
    summary: "CVT, egzoz, hava akışı, ECU.",
    detail:
      "Varyatör marka karakterleri, baga ağırlığı seçim mantığı, slip-on egzoz karşılaştırması, ECU remap notları.",
    icon: Gauge,
    tags: ["Malossi", "Spectro", "TDR", "Akrapovic"],
    accent: "from-yamaha-500/40 via-yamaha-700/15",
    span: "lg:col-span-7 lg:row-span-2"
  },
  {
    href: "/periyodik-bakim",
    title: "Bakım",
    summary: "Kilometre bazlı servis planı.",
    detail: "1.000 → 40.000 km, sıvılar ve filtreler.",
    icon: Wrench,
    tags: ["1K", "5K", "10K", "20K", "40K"],
    accent: "from-electric-cyan/30 via-yamaha-700/10",
    span: "lg:col-span-5"
  },
  {
    href: "/nasil-yapilir",
    title: "Mekanik",
    summary: "Adım adım rehberler.",
    detail: "Varyatör temizliği, antifriz, kayış, fren balata.",
    icon: BookOpen,
    tags: ["Varyatör", "Antifriz", "Kayış", "Buji"],
    accent: "from-electric-violet/30 via-yamaha-700/10",
    span: "lg:col-span-5"
  },
  {
    href: "/teknik-ozellikler",
    title: "Modeller",
    summary: "Jenerasyon tablosu.",
    detail: "XMAX 250, 300 (eski), 300 (yeni), Tech MAX yan yana.",
    icon: Bike,
    tags: ["250", "300", "Tech MAX"],
    accent: "from-yamaha-400/25 via-electric-cyan/10",
    span: "lg:col-span-4"
  },
  {
    href: "/bilgi/lastik-basinci",
    title: "Bilgi",
    summary: "Hızlı referanslar.",
    detail: "Lastik basıncı, hata kodları, sıvı kapasiteleri, tork tablosu.",
    icon: CircleDot,
    tags: ["Basınç", "Hata", "Kapasite"],
    accent: "from-electric-cyan/25 via-electric-violet/10",
    span: "lg:col-span-3"
  },
  {
    href: "/aksesuar",
    title: "Aksesuar",
    summary: "Uyumlu donanım.",
    detail: "Cam, çanta, sele, LED far, USB tutucu.",
    icon: Sofa,
    tags: ["Cam", "Çanta", "Sele", "LED"],
    accent: "from-electric-ember/20 via-yamaha-700/10",
    span: "lg:col-span-5"
  }
];

export function ContentPillars() {
  return (
    <section className="container-x py-24" id="rehberler">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">Altı dikey</div>
            <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-tighter-display tracking-tightest text-white">
              Bir XMAX sahibinin arayacağı{" "}
              <span className="text-electric">her şey</span> tek katmanda.
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
