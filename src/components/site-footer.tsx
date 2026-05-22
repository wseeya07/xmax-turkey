import Link from "next/link";
import { Logo } from "@/components/logo";
import { NAV } from "@/lib/nav";
import { SITE } from "@/lib/site";

const RESOURCE_LINKS = [
  { href: "/varyator", label: "Varyatör karşılaştırması" },
  { href: "/periyodik-bakim", label: "Periyodik bakım takvimi" },
  { href: "/nasil-yapilir/varyator-bakimi-ve-temizligi", label: "Varyatör bakımı" },
  { href: "/nasil-yapilir/antifriz-degisimi-ve-hava-alma", label: "Antifriz değişimi" },
  { href: "/bilgi/lastik-basinci", label: "Lastik basıncı" },
  { href: "/bilgi/hata-kodlari", label: "Hata kodları" }
];

const MODEL_LINKS = [
  { href: "/teknik-ozellikler/xmax-250-2018", label: "XMAX 250 (Ara Kasa)" },
  { href: "/teknik-ozellikler/xmax-250-2025", label: "XMAX 250 (Plus)" },
  { href: "/teknik-ozellikler/xmax-300-2025", label: "XMAX 300 (Plus)" },
  { href: "/teknik-ozellikler/xmax-400-2018", label: "XMAX 400 (Ara Kasa)" }
];

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-white/[0.05]">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_repeat(2,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9" />
              <div className="h-display text-lg font-semibold text-white">
                XMAX <span className="text-electric">Türkiye</span>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-carbon-200">
              Yamaha XMAX sahipleri için bağımsız teknik kaynak. Modifikasyon
              karşılaştırmaları, servis takvimi, hata kodları ve adım adım
              mekanik rehberler.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip">xmaxturkey.com</span>
              <span className="chip">turkxmax.com</span>
            </div>
          </div>

          <div>
            <div className="eyebrow">Kaynaklar</div>
            <ul className="mt-4 space-y-2.5">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-carbon-200 transition hover:text-electric-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow">Modeller</div>
            <ul className="mt-4 space-y-2.5">
              {MODEL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-carbon-200 transition hover:text-electric-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="divider-glow" />

      <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-carbon-400 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Yamaha, Yamaha Motor Co.
          tescilli markasıdır — bu site bağımsız bir topluluk kaynağıdır.
        </p>
        <nav className="flex flex-wrap gap-5">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-electric-cyan">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
