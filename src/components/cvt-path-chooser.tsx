import Link from "next/link";
import { ArrowDown, CircleDot, Layers, Lock } from "lucide-react";
import { Reveal } from "@/components/reveal";

const PATHS = [
  {
    id: "yol-1-baga",
    badge: "Yol 1 · Entry",
    title: "Ön varyatör · sadece baga",
    subtitle:
      "Stok varyatör korunur, sadece roller weight (baga ağırlığı) değişir.",
    badgeTone: "from-electric-cyan/30",
    cost: "Düşük",
    risk: "Düşük",
    independence: "Bağımsız",
    icon: CircleDot,
    bullets: [
      "30 dakikalık iş, evde yapılır",
      "Stok motor karakteri korunur",
      "Hafif/ağır gram seçimi karakter belirler",
      "Marka mühendislik avantajı yok"
    ],
    bestFor: "İlk modifikasyon. Karakter ayarı yapmak isteyen kullanıcı."
  },
  {
    id: "yol-2-kit",
    badge: "Yol 2 · Performans",
    title: "Ön varyatör · komple kit",
    subtitle:
      "Komple varyatör kiti. Malossi, Polini, J.Costa, TDR Gold — marka mühendisliği gelir.",
    badgeTone: "from-electric-violet/30",
    cost: "Yüksek",
    risk: "Orta",
    independence: "Bağımsız",
    icon: Layers,
    bullets: [
      "8/12 baga sistemleri, eksenel mermi, dik kasnak açısı",
      "DLC kaplama, dahili yağlama, soğutma kanatları",
      "Daha geniş ratio bandı + son hız kazancı",
      "Kontrast yay dengesi şart (yoksa kayış kaçırır)"
    ],
    bestFor: "İleri kullanıcı. Stok yetersiz, marka karakteri arar."
  },
  {
    id: "yol-3-debriyaj",
    badge: "Yol 3 · Arka grup",
    title: "Arka debriyaj · yükseltme",
    subtitle:
      "Ön varyatörden bağımsız iş. Balata, çan, kontrast yayı — sıfır kayma + soğutma.",
    badgeTone: "from-yamaha-500/30",
    cost: "Orta",
    risk: "Düşük",
    independence: "Bağımsız uygulanabilir",
    icon: Lock,
    bullets: [
      "Malossi Maxi Fly (sokak), Maxi Delta (ayarlanabilir yarış)",
      "Dr.Pulley HiT — tork yardımlı kilit, %35 daha kavrama",
      "Malossi Maxi Wing soğutmalı çan (kanatlı fan)",
      "Yol 1 veya Yol 2 olmadan da uygulanabilir"
    ],
    bestFor:
      "Debriyaj kaçırma, balata camlaşma, ısı problemi yaşayan kullanıcı."
  }
];

export function CvtPathChooser() {
  return (
    <section className="container-x py-20" id="uc-yol">
      <Reveal>
        <div className="max-w-3xl">
          <div className="eyebrow">Üç yol</div>
          <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
            XMAX&apos;te CVT performansı{" "}
            <span className="text-electric">üç yoldan</span> alınır.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-carbon-200">
            Birincisi ön varyatörde sadece baga değişimi. İkincisi ön varyatöre
            komple kit. Üçüncüsü ön varyatöre dokunmadan arka debriyaj
            yükseltmesi. Üçü de birbirinden bağımsız uygulanabilir, kombinasyon
            yapılabilir.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {PATHS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <Link
              href={`#${p.id}`}
              className="glass gradient-edge group relative flex h-full flex-col justify-between overflow-hidden p-7 transition hover:-translate-y-0.5"
            >
              <div
                className={`pointer-events-none absolute -right-32 -top-32 h-[360px] w-[360px] rounded-full bg-gradient-to-br ${p.badgeTone} via-transparent blur-3xl`}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-2">
                  <span className="chip">
                    <p.icon className="h-3 w-3 text-electric-cyan" />
                    {p.badge}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-300">
                    Maliyet · {p.cost}
                  </span>
                </div>
                <h3 className="mt-7 h-display text-2xl font-semibold leading-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-carbon-200">{p.subtitle}</p>

                <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.06]">
                  <Tag k="Risk" v={p.risk} />
                  <Tag k="Bağımlılık" v={p.independence} />
                </div>

                <ul className="mt-5 space-y-1.5 text-xs leading-relaxed text-carbon-200">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric-cyan" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/30 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                    Kime
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white">
                    {p.bestFor}
                  </p>
                </div>
              </div>

              <div className="relative mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-electric-cyan">
                Bölüme atla
                <ArrowDown className="h-3.5 w-3.5 transition group-hover:translate-y-0.5" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-carbon-400">
          Kombinasyonların performansı için aşağıdaki{" "}
          <a
            href="#setuplar"
            className="text-electric-cyan underline-offset-4 hover:underline"
          >
            7 setup reçetesi
          </a>{" "}
          tablosuna bak — her reçete ön + arka kombinasyonu içerir.
        </p>
      </Reveal>
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
