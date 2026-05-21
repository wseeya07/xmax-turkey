import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight, Cpu, Wrench, ShieldCheck, Flame } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "XMAX Mekanik Motor Modifikasyonu ve Silindir Kitleri",
  description: "Yamaha XMAX 250 ve 300 için BRT Seramik, TDR Silindir Piston yükseltmeleri, dereceli egzantrik milleri, enjektör ve gaz kelebeği modifikasyonları.",
  alternates: { canonical: "/performans/mekanik" }
};

const KITS = [
  {
    brand: "BRT Racing Ceramic Block Kit",
    origin: "Endonezya / Brezilya",
    material: "Seramik Alüminyum Alaşım",
    displacement: "XMAX 250 -> 300 cc / XMAX 300 -> 340 cc",
    hpGain: "+4.5 - +6.2 HP (Harita ve Egzantrik ile)",
    details: "Döküm demir gömleklere kıyasla ısıyı %30 daha hızlı tahliye eder. BRT'nin çift segmanlı dövme (forged) pistonu yüksek kompresyona dayanıklıdır.",
    requirements: "30-32 delikli yüksek akışlı enjektör, 36mm veya 38mm Gaz Kelebeği, Stage 1 Dereceli Egzantrik ve ECU Remap."
  },
  {
    brand: "TDR Ceramic Cylinder Block Set",
    origin: "Tayvan / Endonezya",
    material: "Seramik Kaplama Ni-Resist Gömlek",
    displacement: "XMAX 250 -> 285 cc / XMAX 300 -> 320 cc",
    hpGain: "+3.2 - +4.8 HP (Komple Egzoz & Hava Filtresi ile)",
    details: "Piston eteklerinde teflon-molibden kaplama yer alır. Bu sayede ilk çalıştırma aşınması sıfıra indirilir. Uzun turlar ve dayanıklılık odaklıdır.",
    requirements: "Geliştirilmiş yakıt regülatörü, Keihin / TDR yüksek debili enjektör, dereceli egzantrik."
  }
];

const MATCHES = [
  { part: "Enjektör (Injector)", stock: "110-120 cc/dk", upgrade: "140 cc/dk (300cc için) / 160 cc/dk (340cc için)", function: "Artan silindir hacminin ihtiyacı olan zengin karışımı (A/F oranı) sağlamak için gereklidir." },
  { part: "Dereceli Egzantrik (Camshaft)", stock: "Stok Profil", upgrade: "BRT Stage 1 (Street) / BRT Stage 2 (Race)", function: "Supapların açık kalma süresini ve milimetrik yüksekliğini (lift) artırarak yüksek devirde nefes almayı kolaylaştırır." },
  { part: "Gaz Kelebeği (Throttle Body)", stock: "32 mm (XMAX 250/300)", upgrade: "36 mm / 38 mm CNC Delikli Kelebek", function: "Giriş manifolduna giren hava hacmini genişleterek gaz tepkisini ve tork doldurmasını anında hızlandırır." }
];

export default function MechanicalPerformancePage() {
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
            <span className="chip">Silindir & Güç setups</span>
            <h1 className="mt-4 h-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Mekanik setups: <span className="text-electric">Hacim ve Güç.</span>
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-carbon-200">
              Varyatör modifikasyonları motorun mevcut gücünü daha iyi iletmesini sağlarken, mekanik motor setups **doğrudan beygir (HP) ve tork (Nm) üretir**. XMAX 250 ve 300 Blue Core motorları, doğru silindir piston kitleri, dereceli egzantrik milleri ve yakıt elemanlarıyla birleştirildiğinde yüksek dayanıklılıkla güçlendirilebilir.
            </p>
          </header>
        </Reveal>

        {/* Cylinder block comparison */}
        <section className="mt-12 space-y-6">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Uyumlu Yüksek Performans Silindir Kitleri
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {KITS.map((k, i) => (
              <Reveal key={k.brand} delay={i * 0.06}>
                <div className="glass gradient-edge p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-electric-cyan">
                        Menşei: {k.origin}
                      </span>
                      <span className="font-mono text-xs text-carbon-300">
                        {k.material}
                      </span>
                    </div>

                    <h3 className="mt-4 h-display text-2xl font-semibold text-white">
                      {k.brand}
                    </h3>
                    <div className="mt-2 text-xs text-yamaha-300 font-semibold uppercase tracking-wide">
                      Hacim: {k.displacement}
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-carbon-200">
                      {k.details}
                    </p>

                    <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs">
                      <div className="font-semibold text-white">Gerekli Ek Parçalar:</div>
                      <p className="mt-1 text-carbon-300 leading-relaxed">{k.requirements}</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/[0.06] pt-3 flex items-center justify-between font-mono text-xs">
                    <span className="text-carbon-400">Tahmini Güç Kazancı:</span>
                    <span className="font-bold text-electric-cyan">{k.hpGain}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Dynamic setup matchings */}
        <section className="mt-16">
          <Reveal>
            <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
              Komple Motor setups & Parça Eşleşmeleri
            </h2>
            <p className="mt-2 text-sm text-carbon-200">
              Sadece silindir büyütmek motorun fakir karışımda (lean) kalmasına ve aşırı ısınarak piston eritmesine sebep olur. Sağlıklı bir modifikasyon için aşağıdaki 3 parça eş zamanlı olarak büyütülmelidir:
            </p>
          </Reveal>

          <div className="mt-8 glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    {["Bileşen (Parça)", "Stok Değeri", "Önerilen Yükseltme", "Modifikasyon Rolü"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATCHES.map((m) => (
                    <tr key={m.part} className="border-b border-white/[0.04] transition hover:bg-white/[0.02]">
                      <td className="px-6 py-5 font-semibold text-white">
                        {m.part}
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-carbon-200">
                        {m.stock}
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-electric-cyan font-semibold">
                        {m.upgrade}
                      </td>
                      <td className="px-6 py-5 text-xs leading-relaxed text-carbon-300">
                        {m.function}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Warning Panel */}
        <section className="mt-16 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 h-full">
              <div className="flex gap-3">
                <Flame className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-200">Aşırı Isınma & Fakir Karışım Riski</h4>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                    Silindir büyütüldüğünde, stok enjektörün püskürttüğü yakıt miktarı silindir içine giren fazla havaya kıyasla yetersiz kalır. Bu durum **fakir karışım (lean mixture)** yaratır. Yüksek kompresyonda fakir karışım yanma odasında olağanüstü yüksek sıcaklıklara yol açarak supapların erimesine veya pistonun bloğa kaynamasına neden olur. Yakıt haritası (remap) yapılmadan motor sürülmemelidir.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 h-full">
              <div className="flex gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-emerald-200">Güvenli Sokak Setup Önerisi</h4>
                  <p className="mt-2 text-xs leading-relaxed text-carbon-200">
                    Gündelik kullanımda motor ömründen feragat etmeden maksimum tork almak istiyorsanız: **BRT Seramik Silindir (XMAX 250 için 285cc / XMAX 300 için 320cc)**, stok dereceli egzantrik veya **BRT Stage 1 egzantrik**, **140cc enjektör** ve **stok gaz kelebeği** tercih edebilirsiniz. Bu kurulum stok motor gibi pürüzsüz çalışırken yokuş yukarı iki kişiyle çekişi dramatik ölçüde artırır.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </article>
    </>
  );
}
