import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight, Gauge, Cog, Scale, ShieldAlert } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "XMAX Varyatör Performans Yükseltme Kılavuzu",
  description: "Yamaha XMAX için TDR Gold, Jcosta Transverse ve Malossi Multivar varyatör kitleri karşılaştırması ve baga ağırlığı seçim kuralları.",
  alternates: { canonical: "/performans/varyator" }
};

const BRANDS = [
  {
    name: "TDR Gold Varyatör Kit",
    origin: "Tayvan / Endonezya",
    type: "Geleneksel Makaralı",
    pricing: "Ekonomik",
    characteristic: "Düşük bütçeyle debriyaj silkelemesini kesmek ve atik kalkış sağlamak için ideal.",
    pro: "Altın sarısı teflon kaplama sayesinde sürtünmeyi ve ısınmayı azaltır. İçinden çıkan bagalar dengeli bir şehir içi torku verir.",
    con: "Uzun ömürlülük açısından slider aşınma hızı Malossi veya Jcosta'ya göre biraz daha yüksektir. Yüksek devir pürüzsüzlüğü sınırlıdır.",
    setups: [
      { gen: "XMAX 250 (2014-2017)", roller: "12g / 13g karışık veya direkt 12g", note: "Kalkıştaki hantallığı mükemmel şekilde giderir." },
      { gen: "XMAX 300 (2017-2022)", roller: "13g TDR Baga", note: "Şehir içi esnekliği ve sollama kabiliyetini artırır." }
    ]
  },
  {
    name: "Jcosta Transverse (EVO serisi)",
    origin: "İspanya",
    type: "Transvers (Çubuk Pim Yapılı)",
    pricing: "Premium",
    characteristic: "Ezber bozan pim yapısıyla doğrusal hızlanma ve kayıpsız güç aktarımı arayanlar.",
    pro: "Geleneksel yuvarlak bagalar yerine çubuk şeklinde ağırlık pimleri kullanır. Kasnağı doğrudan ittiği için debriyaj kaydırması sıfıra yakındır ve son hız (top speed) artışı verir.",
    con: "Özel pim yapısı nedeniyle yedek ağırlık bulmak zordur. Bakım aralıkları daha kısadır ve montaj torkuna aşırı hassastır.",
    setups: [
      { gen: "XMAX 300 (2017-2022)", roller: "14g Jcosta Özel Pim", note: "155 km/h limitörünü daha akıcı şekilde yakalar." },
      { gen: "XMAX 300 (2023+)", roller: "13.5g Jcosta Özel Pim", note: "Agresif kalkış ve orta devir gücü muazzamdır." }
    ]
  },
  {
    name: "Malossi Multivar 2000",
    origin: "İtalya",
    type: "Geleneksel Makaralı (Gelişmiş Rampa)",
    pricing: "Premium",
    characteristic: "Performans dünyasının altın standardı. Yüksek kaliteli rampa açıları ve pist odaklı devir.",
    pro: "CNC ile işlenmiş rampa yatakları bagaların pürüzsüz kaymasını sağlar. Türkiye'de yedek baga, slider ve servis kiti bulmak en kolay markadır. Karbon takviyeli kayışla mükemmel uyumludur.",
    con: "Sert sarı veya kırmızı debriyaj yaylarıyla kombine edildiğinde yüksek devirde kalma eğilimi gösterir. Yakıt tüketimi %5-10 artabilir.",
    setups: [
      { gen: "XMAX 300 (2017+)", roller: "12g / 13g Malossi HT Rollers", note: "Sarı debriyaj yayı ile birleştiğinde mükemmel sokak setup." },
      { gen: "XMAX Tech MAX", roller: "11g (Pist odaklı) / 12g (Gündelik)", note: "Maksimum ivmelenme torku sağlar." }
    ]
  }
];

export default function VariatorPerformancePage() {
  return (
    <>
      <article className="container-x py-16">
        <Link
          href="/performans"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yamaha-200 hover:text-electric-cyan"
        >
          <ChevronLeft className="h-4 w-4" />
          Performans Paneli
        </Link>

        <Reveal>
          <header className="mt-6 max-w-3xl">
            <span className="chip">CVT & Modifikasyon</span>
            <h1 className="mt-4 h-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Doğru Varyatörle, <span className="text-electric">Doğru Karakter.</span>
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200">
              Yamaha XMAX motorlarında gücü arka tekerleğe aktaran organ **CVT (Varyatör)** sistemidir. Stok varyatör çevre emisyonları ve yakıt ekonomisi kaygılarıyla tasarlanmıştır. Kaliteli bir performans varyatörü ise motorun tork eğrisini ideal devir bandında sabit tutarak bambaşka bir ivme yaratır.
            </p>
          </header>
        </Reveal>

        {/* CVT Physics / Baga Logic */}
        <section className="mt-14 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <div className="glass p-6 h-full flex flex-col justify-between">
              <div>
                <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                  <Scale className="h-4 w-4" />
                </span>
                <h3 className="mt-5 h-display text-xl font-semibold text-white">
                  Baga Gramaj Mantığı
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  Varyatör bagası (roller) hafifledikçe, merkezkaç kuvvetinin kasnağı itmesi zorlaşır. Motor daha yüksek devirlere çıkarak kalkışta ve ara hızlanmalarda atikleşir. Baga ağırlaştıkça kasnak erken açılır, motor devri düşer, son hız (top speed) ve yakıt ekonomisi hedeflenir.
                </p>
              </div>
              <div className="mt-5 border-t border-white/[0.06] pt-3 text-[11px] text-carbon-300 font-mono">
                Stok XMAX 300: 14.0 Gram
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="glass p-6 h-full flex flex-col justify-between">
              <div>
                <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                  <Cog className="h-4 w-4" />
                </span>
                <h3 className="mt-5 h-display text-xl font-semibold text-white">
                  Slider Kanalları ve Aşınma
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  Slider&apos;lar varyatör tırnaklarının metal yüzeye sürtünmesini engelleyen plastik kılavuzlardır. Aşındıklarında veya çentiklendiklerinde varyatör akıcı hareket edemez, vites geçişlerinde tekleme veya devir düşüşü hissedilir. Her 10.000 km&apos;de bir mutlaka temizlenip kontrol edilmelidir.
                </p>
              </div>
              <div className="mt-5 border-t border-white/[0.06] pt-3 text-[11px] text-carbon-300 font-mono">
                Kuru montaj yapılır, gres sürülmez!
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass p-6 h-full flex flex-col justify-between">
              <div>
                <span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-electric-cyan">
                  <Gauge className="h-4 w-4" />
                </span>
                <h3 className="mt-5 h-display text-xl font-semibold text-white">
                  Tork Yayı Eşleşmesi
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-carbon-200">
                  Arka debriyajda yer alan tork koni yayı (contrast spring), kayışın sıkışmasını kontrol eder. Ön varyatör bagaları hafifletildiğinde, tork yayının da hafif sertleştirilmesi (%10 - %20) kayışın kaymasını (slipping) engeller ve rampa yukarı ivmelenmeyi zirveye taşır.
                </p>
              </div>
              <div className="mt-5 border-t border-white/[0.06] pt-3 text-[11px] text-carbon-300 font-mono">
                Malossi Yellow (+%20) popülerdir.
              </div>
            </div>
          </Reveal>
        </section>

        {/* Detailed Brand Showcase */}
        <section className="mt-16 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Öne Çıkan Performans Varyatörleri
            </h2>
          </Reveal>

          {BRANDS.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.05}>
              <div className="glass gradient-edge p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-electric-cyan">
                      {b.pricing} Segment
                    </span>
                    <h3 className="mt-2 h-display text-2xl font-semibold text-white">
                      {b.name}
                    </h3>
                  </div>
                  <div className="text-right text-xs font-mono text-carbon-300">
                    <div>Menşei: {b.origin}</div>
                    <div>Yapı: {b.type}</div>
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-yamaha-300">{b.characteristic}</p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="glass-quiet p-5">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-electric-cyan">Artıları / Çalışma Prensibi</h4>
                    <p className="mt-2 text-xs leading-relaxed text-carbon-200">{b.pro}</p>
                  </div>
                  <div className="glass-quiet p-5">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-carbon-300">Dezavantajları / Bakım Kısıtları</h4>
                    <p className="mt-2 text-xs leading-relaxed text-carbon-200">{b.con}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-carbon-400">Tavsiye Edilen Ağırlık / Setup Ayarları</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {b.setups.map((s) => (
                      <div key={s.gen} className="border border-white/[0.04] bg-white/[0.01] rounded-xl p-4">
                        <div className="font-semibold text-xs text-white">{s.gen}</div>
                        <div className="mt-1 font-mono text-sm text-electric-cyan font-medium">{s.roller}</div>
                        <div className="mt-1.5 text-[11px] text-carbon-300">{s.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="mt-16">
          <Reveal>
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex gap-3">
              <ShieldAlert className="h-6 w-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-yellow-200">Kritik Montaj Notu!</h4>
                <p className="mt-1 text-xs leading-relaxed text-carbon-200">
                  Varyatör somunları sıkılırken **kesinlikle havalı tabanca kullanılmamalıdır**. Krank milinin dişleri zarar görebilir veya aşırı sıkılmadan dolayı kasnak çatlayabilir. Birincil kasnak somunu tork anahtarı kullanılarak **95 Nm** değerinde sıkılmalı, somunda fabrika verisi yeni kilit pulu tercih edilmelidir.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </article>
    </>
  );
}
