import Link from "next/link";
import { Logo } from "@/components/logo";
import { NAV, type NavMega, type NavSimple } from "@/lib/nav";
import { SITE } from "@/lib/site";

function isMega(n: NavMega | NavSimple): n is NavMega {
  return "groups" in n;
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-white/[0.05]">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <div>
                <div className="h-display text-xl font-semibold text-white">
                  XMAX <span className="text-electric">Türkiye</span>
                </div>
                <div className="eyebrow !text-[10px]">{SITE.tagline}</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-carbon-200">
              Yamaha XMAX sahipleri için bağımsız teknik kaynak. Modifikasyon
              karşılaştırmaları, servis takvimi, hata kodları ve adım adım
              mekanik rehberler — Türkiye pazarına uyarlanmış.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip">xmaxturkey.com</span>
              <span className="chip">turkxmax.com</span>
            </div>
          </div>

          {NAV.filter(isMega)
            .slice(0, 3)
            .map((col) => (
              <div key={col.href}>
                <div className="eyebrow">{col.label}</div>
                <ul className="mt-4 space-y-2.5">
                  {col.groups
                    .flatMap((g) => g.items)
                    .filter((l) => l.status !== "soon")
                    .slice(0, 5)
                    .map((l) => (
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
            ))}
        </div>
      </div>

      <div className="divider-glow" />

      <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-carbon-400 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Yamaha, Yamaha Motor Co.
          tescilli markasıdır — bu site bağımsız bir topluluk kaynağıdır.
        </p>
        <nav className="flex gap-5">
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
