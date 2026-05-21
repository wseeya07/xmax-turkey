import type { Metadata } from "next";
import { ArrowUpRight, Wind, BookOpen, Sofa, Lightbulb, Smartphone, CircleDot } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "XMAX Aksesuar Kataloğu",
  description:
    "Yamaha XMAX için uyumlu donanım: cam, çanta-topcase, sele, LED far, USB ve telefon tutucu, lastik markaları.",
  alternates: { canonical: "/aksesuar" }
};

const CATEGORIES = [
  {
    href: "/aksesuar/cam",
    icon: Wind,
    title: "Ön cam",
    description: "Givi · MRA · Puig — yükseklik ve hava akışı farkları.",
    ready: false
  },
  {
    href: "/aksesuar/cantalar",
    icon: BookOpen,
    title: "Çanta · Topcase",
    description: "Givi V46 · Shad SH50 · arka taşıyıcı plakaları.",
    ready: false
  },
  {
    href: "/aksesuar/sele",
    icon: Sofa,
    title: "Sele · Konfor",
    description: "Comfort sele, gel pad, custom döşeme atölyeleri.",
    ready: false
  },
  {
    href: "/aksesuar/aydinlatma",
    icon: Lightbulb,
    title: "LED · Far yükseltme",
    description: "H4/H7 LED dönüşüm, sis farı kit, DRL.",
    ready: false
  },
  {
    href: "/aksesuar/usb-telefon",
    icon: Smartphone,
    title: "USB · Telefon tutucu",
    description: "Quad Lock · SP Connect · USB-C şarj çıkışı kurulumu.",
    ready: false
  },
  {
    href: "/aksesuar/lastik-markalari",
    icon: CircleDot,
    title: "Lastik markaları",
    description: "Pirelli Angel · Michelin City Grip 2 · Bridgestone SC2.",
    ready: false
  }
];

export default function AccessoryIndex() {
  return (
    <>
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Aksesuar"
          title={
            <>
              Uyumlu donanım,{" "}
              <span className="text-electric">karakter ekler.</span>
            </>
          }
          description="Cam, çanta, sele, aydınlatma — sürüş hissini ve günlük kullanımı değiştiren parçalar. Her kategori model uyumluluğu, fiyat ve referans satın alma noktaları ile derleniyor."
        />
      </section>

      <section className="container-x grid gap-4 py-12 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const cardClass = `glass gradient-edge group flex h-full flex-col justify-between p-7 transition ${
            c.ready ? "hover:-translate-y-0.5" : "cursor-not-allowed opacity-55"
          }`;
          const inner = (
            <>
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-electric-cyan backdrop-blur-xl">
                    <c.icon className="h-4 w-4" />
                  </span>
                  {!c.ready && (
                    <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-300">
                      Yakında
                    </span>
                  )}
                </div>
                <h3 className="mt-7 h-display text-2xl font-semibold leading-tight text-white">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  {c.description}
                </p>
              </div>
              {c.ready && (
                <div className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-electric-cyan">
                  Aç
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              )}
            </>
          );

          return (
            <Reveal key={c.href} delay={i * 0.05}>
              {c.ready ? (
                <Link href={c.href} className={cardClass}>
                  {inner}
                </Link>
              ) : (
                <div className={cardClass} aria-disabled>
                  {inner}
                </div>
              )}
            </Reveal>
          );
        })}
      </section>
    </>
  );
}
