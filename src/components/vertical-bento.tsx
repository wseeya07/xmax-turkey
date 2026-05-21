import Link from "next/link";
import { ArrowUpRight, Gauge, Wrench, BookOpen, Database } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

const CARDS = [
  {
    href: "/varyator",
    eyebrow: "Performans",
    title: "Varyatör Modifikasyonları",
    description:
      "Malossi, Spectro ve TDR varyatörlerinin karşılaştırması, baga ağırlığı seçim mantığı, tork koni ve debriyaj yayı önerileri.",
    icon: Gauge,
    accent: "from-yamaha-500/30 via-yamaha-700/20 to-transparent",
    badges: ["Malossi", "Spectro", "TDR", "Baga Ağırlığı"],
    big: true
  },
  {
    href: "/periyodik-bakim",
    eyebrow: "Plan",
    title: "Periyodik Bakım",
    description:
      "1.000 km'den 40.000 km'ye kilometre bazlı bakım kalemleri, yağ-filtre takvimi.",
    icon: Wrench,
    accent: "from-neon-cyan/20 via-yamaha-700/10 to-transparent",
    badges: ["1K", "5K", "10K", "20K", "40K"]
  },
  {
    href: "/nasil-yapilir",
    eyebrow: "Rehber",
    title: "Mekanik Nasıl Yapılır",
    description:
      "Varyatör temizliği, antifriz değişimi ve sistem havasının alınması — adım adım fotoğraflı rehberler.",
    icon: BookOpen,
    accent: "from-yamaha-500/20 via-yamaha-700/10 to-transparent",
    badges: ["Varyatör", "Antifriz", "Hava Alma"]
  },
  {
    href: "/teknik-ozellikler",
    eyebrow: "Veritabanı",
    title: "Teknik Özellikler",
    description:
      "XMAX 250, 300, Tech MAX jenerasyonlarının tork, beygir, ağırlık ve parça kodları — yan yana karşılaştırma.",
    icon: Database,
    accent: "from-neon-violet/20 via-yamaha-700/10 to-transparent",
    badges: ["XMAX 250", "XMAX 300", "Tech MAX"],
    big: true
  }
];

export function VerticalBento() {
  return (
    <section className="container-x py-24" id="rehberler">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="chip">
              <span className="size-1.5 rounded-full bg-yamaha-300" />
              Dört Ana Dikey
            </span>
            <h2 className="mt-4 h-display text-balance text-3xl font-semibold leading-[1.05] text-white sm:text-4xl md:text-5xl">
              Bir XMAX sahibinin
              <br className="hidden sm:block" />
              <span className="text-yamaha-300">aradığı her şey.</span>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-carbon-300">
            İçerik dört dikeyde yapılandırıldı: performans, plan, mekanik ve veri.
            Her dikey bir sahip olarak en sık çarptığınız soruya cevap vermek için
            tasarlandı.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map((card, i) => (
          <Reveal
            key={card.href}
            delay={i * 0.05}
            className={cn(card.big ? "md:col-span-2" : "md:col-span-1")}
          >
            <Link
              href={card.href}
              className={cn(
                "panel gradient-border group relative flex h-full flex-col justify-between overflow-hidden p-7 transition",
                "hover:-translate-y-0.5 hover:shadow-glow"
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70",
                  card.accent
                )}
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="chip">{card.eyebrow}</span>
                  <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-yamaha-300 transition group-hover:bg-yamaha-500/20 group-hover:text-yamaha-200">
                    <card.icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-7 h-display text-2xl font-semibold leading-tight text-white md:text-3xl">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-carbon-200">
                  {card.description}
                </p>
              </div>
              <div className="relative mt-10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {card.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-carbon-200"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-yamaha-100">
                  Aç
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
