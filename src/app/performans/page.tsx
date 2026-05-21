import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Gauge, Wrench, CircleAlert, Sparkles, Bike } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "XMAX Performans ve Modifikasyon Kılavuzu",
  description: "Yamaha XMAX için varyatör, silindir-piston kitleri, egzantrik, enjektör ve RPD fren sistemi yükseltmeleri rehberi.",
  alternates: { canonical: "/performans" }
};

const PILLARS = [
  {
    href: "/performans/varyator",
    title: "Varyatör Modifikasyonları",
    description: "TDR Gold, Jcosta ve Malossi Multivar CVT sistemleri.",
    detail: "Baga (roller) ve slider ağırlık seçimi, debriyaj yayları ve kalkış torku optimizasyonları ile XMAX'in tüm potansiyelini yansıtın.",
    icon: Gauge,
    tags: ["TDR Gold", "Jcosta", "Malossi", "Baga Sente"],
    ready: true
  },
  {
    href: "/performans/mekanik",
    title: "Mekanik ve Silindir Kurulumu",
    description: "BRT ve TDR silindir piston kitleri, egzantrik ve enjektör setups.",
    detail: "Komple motor setups: enjektör cc eşleşmeleri, dereceli egzantrik milleri, gaz kelebeği çapları ve güvenli güç artışı yönergeleri.",
    icon: Wrench,
    tags: ["BRT 300cc", "TDR Ceramic", "Enjektör", "Egzantrik"],
    ready: true
  },
  {
    href: "/performans/fren",
    title: "Fren Sistemleri ve Disk Yükseltme",
    description: "RPD fren sistemleri, büyük ön/arka diskler, sinterli balatalar.",
    detail: "Artan gücü dizginlemek için RPD kaliperler, çelik fren hortumları, genişletilmiş dalgalı diskler ve optimum durdurma gücü analizleri.",
    icon: Bike,
    tags: ["RPD", "Çelik Hortum", "Ön Disk", "Arka Disk"],
    ready: true
  }
];

const SETUPS = [
  {
    name: "Şehir İçi Atik Setup (City Tourer)",
    focus: "Tork & Akıcılık",
    description: "Şehir içi yoğun trafikte dur-kalklarda debriyaj silkelemesini önleyen ve sollama ivmesini artıran güvenli modlar.",
    items: [
      "Spectro veya TDR Racing Varyatör (13g Baga ile)",
      "Stok debriyaj + TDR %10 sert debriyaj yayı",
      "RPD sinterli ön/arka fren balataları (Stok diskler)"
    ],
    difficulty: "Kolay",
    cost: "Ekonomik"
  },
  {
    name: "Sportif Sokak Setup (Street Performance)",
    focus: "Son Hız & Agresif Kalkış",
    description: "Hafta sonu turlarında daha yüksek son hız (top speed) ve ara hızlanmalarda yırtıcı bir güç isteyenler için.",
    items: [
      "Malossi Multivar 2000 veya Jcosta Transverse Varyatör",
      "BRT Dereceli Egzantrik Mili (Stage 1)",
      "RPD 267mm Ön Büyük Dalgalı Disk + Çelik Fren Hortumları"
    ],
    difficulty: "Orta",
    cost: "Orta Segment"
  },
  {
    name: "Maksimum Güç Setup (Outlaw Racing)",
    focus: "Maksimum HP & Tork",
    description: "Limitleri zorlamak isteyen, XMAX 250/300 motor hacmini güvenli bir şekilde yükseltip tam verim almayı amaçlayan set.",
    items: [
      "BRT Seramik Silindir Piston Kiti (Enjektör + Gaz Kelebeği Set)",
      "Jcosta EVO 5 Varyatör + Özel Karbon Kayış",
      "RPD Komple Fren Kaliperi ve Disk Seti"
    ],
    difficulty: "İleri (Mekanik Şart)",
    cost: "Premium"
  }
];

export default function PerformanceIndexPage() {
  return (
    <>
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Performans ve Mühendislik"
          title={
            <>
              XMAX potansiyelini{" "}
              <span className="text-electric">serbest bırakın.</span>
            </>
          }
          description="Doğru modifikasyonlar XMAX'i tamamen başka bir motora dönüştürebilir. Sürüş amacınıza uygun varyatör, motor mekaniği ve fren sistemleri yükseltmelerini derinlemesine inceleyin."
        />
      </section>

      <section className="container-x grid gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p, i) => (
          <Reveal key={p.href} delay={i * 0.05}>
            <Link
              href={p.href}
              className="glass gradient-edge group flex h-full flex-col justify-between p-7 transition hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-electric-cyan backdrop-blur-xl">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    Kılavuz
                  </span>
                </div>
                <h3 className="mt-7 h-display text-2xl font-semibold leading-tight text-white transition group-hover:text-electric-cyan">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs text-yamaha-300 font-medium">
                  {p.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                  {p.detail}
                </p>
                <div className="mt-5 flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/[0.07] bg-black/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-carbon-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition group-hover:text-electric-cyan">
                Kılavuzu oku
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* Setup Guide Panel */}
      <section className="container-x py-16">
        <Reveal>
          <div className="glass p-8 sm:p-12 relative overflow-hidden">
            <div
              className="pointer-events-none absolute right-4 top-4 h-[300px] w-[300px] rounded-full bg-electric-violet/10 blur-[100px]"
              aria-hidden
            />
            
            <div className="relative">
              <span className="chip">
                <Sparkles className="size-3.5 text-electric-cyan" />
                SETUP REHBERİ
              </span>
              <h2 className="mt-4 h-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Doğru parçaları yan yana getirin.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-carbon-200">
                Uyumsuz modifikasyonlar yakıt tüketimini artırır ve motor ömrünü kısaltır. Aşağıdaki hazır reçeteler, XMAX topluluklarının test edip onayladığı dengeli performans setuplarıdır.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {SETUPS.map((s, idx) => (
                  <div key={s.name} className="glass-quiet p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                          Setup 0{idx + 1}
                        </span>
                        <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 font-mono text-[9px] text-carbon-300">
                          {s.cost}
                        </span>
                      </div>
                      <h3 className="mt-3 h-display text-lg font-semibold text-white">
                        {s.name}
                      </h3>
                      <span className="text-[10px] text-yamaha-300 tracking-wider uppercase font-mono">Odak: {s.focus}</span>
                      <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                        {s.description}
                      </p>

                      <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
                        {s.items.map((it) => (
                          <li key={it} className="flex gap-2 text-xs text-carbon-100">
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 border-t border-white/[0.04] pt-3 flex items-center justify-between text-[11px] font-mono text-carbon-300">
                      <span>Zorluk Derecesi:</span>
                      <span className="font-semibold text-white">{s.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-2.5 items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-carbon-200">
                <CircleAlert className="h-5 w-5 text-yamaha-300 shrink-0" />
                <span><strong>Önemli Tavsiye:</strong> Mekanik silindir piston kitleri ve dereceli egzantrik milleri, hassas supap ayarı ve yakıt haritalama (remap) gerektirir. Kurulumu uzman ellerde yaptırmanız şiddetle tavsiye edilir.</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
