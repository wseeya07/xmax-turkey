import Link from "next/link";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { Logo } from "@/components/logo";

const COLUMNS = [
  {
    title: "Rehberler",
    links: [
      { href: "/varyator", label: "Varyatör Modifikasyonları" },
      { href: "/nasil-yapilir/varyator-bakimi-ve-temizligi", label: "Varyatör Bakımı" },
      { href: "/nasil-yapilir/antifriz-degisimi-ve-hava-alma", label: "Antifriz Değişimi" }
    ]
  },
  {
    title: "Veri",
    links: [
      { href: "/periyodik-bakim", label: "Periyodik Bakım Planı" },
      { href: "/teknik-ozellikler", label: "Tüm Jenerasyonlar" },
      { href: "/teknik-ozellikler/xmax-300-2023", label: "XMAX 300 (2023)" }
    ]
  },
  {
    title: "Topluluk",
    links: [
      { href: "/", label: "Ana Sayfa" },
      { href: "/varyator/malossi", label: "Malossi" },
      { href: "/varyator/spectro", label: "Spectro" },
      { href: "/varyator/tdr", label: "TDR" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/[0.06] bg-ink-950">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-9 w-9 text-yamaha-400" />
            <div className="font-display text-lg font-semibold tracking-tightest text-white">
              XMAX <span className="text-yamaha-400">Türkiye</span>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-carbon-300">
            Yamaha XMAX sahipleri için bağımsız bir bilgi platformu. Varyatör
            kataloğu, kilometre bazlı bakım planlayıcı, adım adım mekanik rehberler
            ve karşılaştırmalı teknik özellikler.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="chip">xmaxturkey.com</span>
            <span className="chip">turkxmax.com</span>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-carbon-300">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-carbon-200 transition hover:text-yamaha-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-carbon-400 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Yamaha, Yamaha Motor Co.
            tescilli markasıdır — bu platform Yamaha ile resmi bağı olmayan
            bağımsız bir topluluk kaynağıdır.
          </p>
          <nav className="flex gap-5">
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="hover:text-yamaha-300"
              >
                {n.short}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
