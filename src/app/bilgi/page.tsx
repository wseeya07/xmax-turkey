import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CircleDot, AlertCircle, Droplets, GaugeCircle, BookOpen, Bike, Atom } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "XMAX Bilgi Merkezi",
  description:
    "Yamaha XMAX için hızlı referanslar: lastik basıncı, hata kodları, sıvı kapasiteleri, tork tablosu, 2.el alım rehberi.",
  alternates: { canonical: "/bilgi" }
};

const ITEMS = [
  {
    href: "/bilgi/rodaj",
    icon: Atom,
    title: "Rodaj kılavuzu",
    description: "DiASil silindir · segman alıştırma · 1600 km bilimsel plan.",
    ready: true
  },
  {
    href: "/bilgi/lastik-basinci",
    icon: CircleDot,
    title: "Lastik basıncı",
    description: "Tek/çift kişi · soğuk değer · tüm jenerasyonlar.",
    ready: true
  },
  {
    href: "/bilgi/hata-kodlari",
    icon: AlertCircle,
    title: "Hata kodları",
    description: "ECU · ABS · TCS · Immobilizer uyarıları.",
    ready: true
  },
  {
    href: "/bilgi/sivilar",
    icon: Droplets,
    title: "Sıvı kapasiteleri",
    description: "Motor yağı, antifriz, fren hidroliği, final dişli.",
    ready: false
  },
  {
    href: "/bilgi/tork-tablosu",
    icon: GaugeCircle,
    title: "Tork tablosu",
    description: "Cıvata sıkma değerleri kademeli liste.",
    ready: false
  },
  {
    href: "/bilgi/ikinci-el",
    icon: BookOpen,
    title: "2.el alım rehberi",
    description: "Bakılması gereken yerler, fiyatlama, kırmızı bayraklar.",
    ready: false
  },
  {
    href: "/bilgi/rakipler",
    icon: Bike,
    title: "Rakip karşılaştırması",
    description: "XMAX vs Forza 250 · Burgman 400 · Beverly · Vespa GTS · NMAX · PCX · Zontes — interaktif eşleyici + 34 kaynak.",
    ready: true
  }
];

export default function InfoIndex() {
  return (
    <>
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Bilgi"
          title={
            <>
              Hızlı referanslar,{" "}
              <span className="text-electric">tek tıkta.</span>
            </>
          }
          description="Sürüş sırasında, garajda veya alıcı koltuğunda — uzun makaleye girmeden ihtiyacın olan bilgi."
        />
      </section>

      <section className="container-x grid gap-4 py-12 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it, i) => {
          const cardClass = `glass gradient-edge group flex h-full flex-col justify-between p-7 transition ${
            it.ready ? "hover:-translate-y-0.5" : "cursor-not-allowed opacity-55"
          }`;
          const inner = (
            <>
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-electric-cyan backdrop-blur-xl">
                    <it.icon className="h-4 w-4" />
                  </span>
                  {!it.ready && (
                    <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-300">
                      Yakında
                    </span>
                  )}
                </div>
                <h3 className="mt-7 h-display text-2xl font-semibold leading-tight text-white">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  {it.description}
                </p>
              </div>
              {it.ready && (
                <div className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-electric-cyan">
                  Aç
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              )}
            </>
          );

          return (
            <Reveal key={it.href} delay={i * 0.04}>
              {it.ready ? (
                <Link href={it.href} className={cardClass}>
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
