import Link from "next/link";
import {
  ArrowUpRight,
  Wrench,
  AlertCircle,
  Bike,
  ShoppingBag,
  ClipboardList,
  Coins
} from "lucide-react";
import { Reveal } from "@/components/reveal";

const OWNER_LINKS = [
  {
    href: "/teknik-ozellikler",
    icon: Bike,
    label: "Modelimi karşılaştır",
    detail: "9 jenerasyon yan yana"
  },
  {
    href: "/periyodik-bakim",
    icon: Wrench,
    label: "Bakım takvimi",
    detail: "1K → 40K km neler yapılır"
  },
  {
    href: "/bilgi/hata-kodlari",
    icon: AlertCircle,
    label: "Hata kodu sözlüğü",
    detail: "ECU · ABS · TCS uyarıları"
  }
];

const BUYER_LINKS = [
  {
    href: "/satin-alma-rehberi",
    icon: Coins,
    label: "Hangi XMAX bana uyar?",
    detail: "4 sürücü profili — bütçe ve ihtiyaç"
  },
  {
    href: "/satin-alma-rehberi/ekspertiz",
    icon: ClipboardList,
    label: "50 maddelik kontrol listesi",
    detail: "2. el alırken bakılacak yerler"
  },
  {
    href: "/teknik-ozellikler",
    icon: Bike,
    label: "250 mi, 300 mü, 400 mü?",
    detail: "Vergi · konfor · performans"
  }
];

export function IntentSplit() {
  return (
    <section id="intent-split" className="container-x py-20 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Nereden başlamak istiyorsun?</div>
          <h2 className="mt-3 h-display text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tighter-display tracking-tightest text-white">
            <span className="text-electric">İki yol</span> — sahibim ya da almak istiyorum.
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="glass gradient-edge group relative h-full overflow-hidden p-8 transition hover:-translate-y-0.5 sm:p-10">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yamaha-500/15 via-yamaha-700/5 to-transparent opacity-80"
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl border border-yamaha-400/30 bg-yamaha-500/10 text-yamaha-200">
                  <Wrench className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-yamaha-200">
                  Sahibim
                </span>
              </div>

              <h3 className="mt-7 h-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                XMAX&apos;im var.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-carbon-200">
                Bakım takvimi, parça kodları, hata sözlüğü ve nasıl yapılır rehberleri — tek yerden.
              </p>

              <ul className="mt-8 space-y-2">
                {OWNER_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3.5 transition hover:border-yamaha-400/30 hover:bg-white/[0.05]"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-black/40 text-yamaha-200">
                        <l.icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-white">
                          {l.label}
                        </span>
                        <span className="block text-[11px] text-carbon-300">
                          {l.detail}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-carbon-300 transition group-hover:text-yamaha-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="glass gradient-edge group relative h-full overflow-hidden p-8 transition hover:-translate-y-0.5 sm:p-10">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-electric-cyan/15 via-electric-violet/5 to-transparent opacity-80"
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan">
                  <ShoppingBag className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-cyan">
                  Alıcıyım
                </span>
              </div>

              <h3 className="mt-7 h-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                XMAX almak istiyorum.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-carbon-200">
                250 mi 300 mü? Hangi yıl, hangi bütçe? 2. el alırken nelere bakmalı?
              </p>

              <ul className="mt-8 space-y-2">
                {BUYER_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3.5 transition hover:border-electric-cyan/30 hover:bg-white/[0.05]"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-black/40 text-electric-cyan">
                        <l.icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-white">
                          {l.label}
                        </span>
                        <span className="block text-[11px] text-carbon-300">
                          {l.detail}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-carbon-300 transition group-hover:text-electric-cyan" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
