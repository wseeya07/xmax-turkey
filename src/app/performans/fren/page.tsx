import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight, ShieldCheck, Zap, Anchor, CircleAlert } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "XMAX Fren Yükseltmesi ve RPD Fren Sistemleri",
  description: "Yamaha XMAX için RPD fren kaliperleri, ön/arka büyük disk yükseltmeleri, çelik fren hortumları ve sinterli balata karşılaştırması.",
  alternates: { canonical: "/performans/fren" }
};

const DISCS = [
  {
    name: "RPD Ön Büyük Dalgalı Yüzer Disk (Floating)",
    size: "267 mm (Stok: 245 mm)",
    compatibility: "Tüm Jenerasyonlar (XMAX 250 / 300 / Tech MAX)",
    pro: "Yüzer disk (floating) yapısı sayesinde disk ısındığında genleşerek dalgalanmaz, frenleme hissi kaybolmaz. 267 mm genişletilmiş çap kaldıraç gücünü artırarak duruş mesafesini kısaltır.",
    price: "Orta / Premium"
  },
  {
    name: "RPD Arka Genişletilmiş Çelik Disk",
    size: "245 mm (Stok: 240 mm)",
    compatibility: "Tüm XMAX Jenerasyonları",
    pro: "Özellikle iki kişi ve yüklü seyahatlerde arka frenin şişmesini ve kilitlenmesini engeller. Isı tahliye kanalları sayesinde balata ömrünü uzatır.",
    price: "Ekonomik / Orta"
  }
];

const COMPONETS = [
  {
    part: "RPD 4 Pistonlu Kaliper (Caliper)",
    description: "Stokta yer alan çift pistonlu kaliper yerine 4 pistonlu RPD kaliper geçişidir. Balataya basan yüzey alanını ikiye katlayarak milimetrik fren kontrolü sağlar.",
    gain: "Maksimum duruş gücü ve dozajlama hassasiyeti."
  },
  {
    part: "Çelik Örgülü Fren Hortumları (Braided Hoses)",
    description: "Stok kauçuk hortumlar fren sıkıldığında iç basınçtan ötürü genleşir. Çelik örgülü hortumlar genleşmediği için manetteki kuvveti kayıpsız olarak doğrudan kaliper pistonuna iletir.",
    gain: "Sert fren hissiyatı ve süngerimsi manet yumuşamasının yok edilmesi."
  },
  {
    part: "Sinterli Metal Balatalar (Sintered Pads)",
    description: "Organik balatalara kıyasla yüksek bakır ve metal tozları içerir. Aşırı ısınmalarda (fading) dahi fren sürtünme katsayısını korurlar.",
    gain: "Isındıkça daha iyi tutan, agresif duruş karakteri."
  }
];

export default function BrakePerformancePage() {
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
            <span className="chip">Fren & Güvenlik</span>
            <h1 className="mt-4 h-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Fren yükseltmesi: <span className="text-electric">Kontrollü Durdurma.</span>
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200">
              XMAX&apos;e yapılan performans varyatörü veya silindir piston yükseltmesi motorun hızlanma potansiyelini yükseltir. Ancak en az hızlanmak kadar, **güvenli bir şekilde durabilmek** de kritik önem taşır. RPD (Racing Performance Development) fren elemanları, XMAX&apos;in ağır gövdesini ve artan gücünü mükemmel bir şekilde dizginlemek için tasarlanmıştır.
            </p>
          </header>
        </Reveal>

        {/* Floating Discs section */}
        <section className="mt-14 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              RPD Genişletilmiş Ön ve Arka Diskler
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {DISCS.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.05}>
                <div className="glass gradient-edge p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-electric-cyan">
                        Ölçü: {d.size}
                      </span>
                      <span className="font-mono text-[10px] text-carbon-300">
                        Fiyat: {d.price}
                      </span>
                    </div>

                    <h3 className="mt-4 h-display text-xl font-semibold text-white">
                      {d.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-carbon-300 font-mono">Uyum: {d.compatibility}</p>

                    <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                      {d.pro}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.04] pt-3 text-[10px] text-carbon-400 font-mono">
                    Montaj braketi (adaptör) kit içinde sunulur.
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Upgrade components */}
        <section className="mt-16">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Kaliper, Hortum ve Sinterli Balata Yükseltmesi
            </h2>
            <p className="mt-2 text-sm text-carbon-200">
              Gerçek bir fren performansı disk çapını büyütmekle sınırlı değildir. Doğru hidrolik basınç ve sürtünme katsayısı için diğer bileşenler:
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {COMPONETS.map((c, i) => (
              <Reveal key={c.part} delay={i * 0.06}>
                <div className="glass p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-white">
                        {c.part}
                      </span>
                      <Zap className="h-4 w-4 text-electric-cyan" />
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-carbon-200">
                      {c.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/[0.06] pt-3 text-[11px] font-medium text-yamaha-300">
                    Kazanım: {c.gain}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Safety tips */}
        <section className="mt-16 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 h-full flex gap-3">
              <CircleAlert className="h-6 w-6 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-yellow-200">ABS Sensör Kalibrasyonu</h4>
                <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                  Disk boyutu büyütüldüğünde ABS okuyucu pulun (grid ring) diş aralığı ve sensör mesafesi korunmalıdır. Disk adaptör montajı sırasında sensör ile pul arasında kalan boşluğun (clearance) tam olarak **0.8 mm - 1.2 mm** aralığında olması gerekir. Aksi halde ABS arıza kodu vererek devre dışı kalabilir.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 h-full flex gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-emerald-200">Sinterli Balata Alıştırma (Bedding-in)</h4>
                <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                  Yeni sinterli metal balata ve yeni disk takıldığında frenlerin tam güce ulaşması için rodaj gerekir. İlk 100-150 km boyunca ani ve yüksek hızda frenlemelerden kaçınılmalıdır. Hafif bas-çeklerle balatanın disk yüzeyine uyum sağlaması ve koruyucu transfer tabakası oluşturması beklenmelidir.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </article>
    </>
  );
}
