import Link from "next/link";
import { ArrowDown, CircleDot, Layers, Check, X } from "lucide-react";
import { Reveal } from "@/components/reveal";

const PATHS = [
  {
    id: "yol-1-baga",
    badge: "Yol 1 · Entry",
    title: "Sadece baga değişimi",
    subtitle: "Stok varyatör korunur, sadece roller weight değişir.",
    badgeTone: "from-electric-cyan/30",
    cost: "Düşük",
    risk: "Düşük",
    revert: "Geri dönülebilir",
    icon: CircleDot,
    pros: [
      "30 dakikalık iş, evde yapılır",
      "Stok motor karakteri korunur",
      "Hafif/ağır gram seçimi karakter belirler",
      "OEM uyumluluk %100"
    ],
    cons: [
      "Marka mühendislik avantajı yok (8-baga, 12-baga, DLC, fan vb.)",
      "Kasnak açısı + rampa geometrisi sınırlı"
    ],
    bestFor:
      "İlk modifikasyon. Stok hissini koruyup karakter ayarı yapmak isteyen kullanıcı."
  },
  {
    id: "yol-2-kit",
    badge: "Yol 2 · Performans",
    title: "Komple varyatör kiti",
    subtitle: "Marka mühendisliği — yeni kasnak, yeni baga sistemi, yeni geometri.",
    badgeTone: "from-electric-violet/30",
    cost: "Yüksek",
    risk: "Orta",
    revert: "Geri dönülebilir (eski parça saklanır)",
    icon: Layers,
    pros: [
      "Marka mühendislik avantajı (Malossi 8-baga, Polini 12-baga + DLC, J.Costa eksenel, TDR Gold dik açı)",
      "Daha geniş ratio bandı + son hız kazancı",
      "Soğutmalı / yağlamalı sistemler aşınmayı azaltır",
      "Setup reçeteleri açılır"
    ],
    cons: [
      "Pahalı (kit + uyumlu yay + bazen çan)",
      "Kayış ve şim kontrolü kritik",
      "Yanlış kit/yay dengesi → kayış kaçırma, yakıt artışı"
    ],
    bestFor:
      "İleri kullanıcı. Stok yetersiz gelmiş, marka karakteri istiyor."
  }
];

export function CvtPathChooser() {
  return (
    <section className="container-x py-20" id="iki-yol">
      <Reveal>
        <div className="max-w-3xl">
          <div className="eyebrow">İki yol</div>
          <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
            XMAX&apos;te varyatör performansını{" "}
            <span className="text-electric">iki yolla</span> alırsın.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
            Birincisi en ucuzu: stok varyatöre dokunmadan sadece roller weight
            (baga) değiştirirsin. İkincisi marka mühendisliği — komple kit
            takarsın. Site bu noktadan ikiye ayrılıyor.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {PATHS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <Link
              href={`#${p.id}`}
              className="glass gradient-edge group relative flex h-full flex-col justify-between overflow-hidden p-8 transition hover:-translate-y-0.5"
            >
              <div
                className={`pointer-events-none absolute -right-32 -top-32 h-[360px] w-[360px] rounded-full bg-gradient-to-br ${p.badgeTone} via-transparent blur-3xl`}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="chip">
                    <p.icon className="h-3 w-3 text-electric-cyan" />
                    {p.badge}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                    Maliyet: {p.cost}
                  </span>
                </div>
                <h3 className="mt-7 h-display text-3xl font-semibold leading-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md text-sm text-carbon-200">
                  {p.subtitle}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.06]">
                  <Tag k="Risk" v={p.risk} />
                  <Tag k="Geri dönüş" v={p.revert} />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                      Artıları
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-carbon-100">
                      {p.pros.map((pro) => (
                        <li key={pro} className="flex gap-1.5">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-electric-cyan" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
                      Sınırlamalar
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-carbon-200">
                      {p.cons.map((con) => (
                        <li key={con} className="flex gap-1.5">
                          <X className="mt-0.5 h-3 w-3 shrink-0 text-carbon-400" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl border border-white/[0.06] bg-black/30 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                    Kime
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white">
                    {p.bestFor}
                  </p>
                </div>
              </div>

              <div className="relative mt-7 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-electric-cyan">
                Bölüme atla
                <ArrowDown className="h-3.5 w-3.5 transition group-hover:translate-y-0.5" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Tag({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-ink-900/80 px-4 py-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-400">
        {k}
      </div>
      <div className="mt-1 text-xs text-white">{v}</div>
    </div>
  );
}
