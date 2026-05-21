"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { NAV, type NavMega, type NavSimple } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

function isMega(n: NavMega | NavSimple): n is NavMega {
  return "groups" in n;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setHovered(null);
  }, [pathname]);

  const onEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHovered(label);
  };
  const onLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHovered(null), 140);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-ink-950/65 backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent"
      )}
      onMouseLeave={onLeave}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label={SITE.name} className="group flex items-center gap-2.5">
          <Logo className="h-8 w-8 transition-transform group-hover:rotate-6" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold tracking-tightest text-white">
              XMAX <span className="text-electric font-display">Türkiye</span>
            </span>
            <span className="eyebrow !text-[9px] !tracking-[0.26em]">
              {SITE.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" onMouseLeave={onLeave}>
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isOpen = isMega(item) && hovered === item.label;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => isMega(item) && onEnter(item.label)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active || isOpen
                      ? "text-white"
                      : "text-carbon-200 hover:text-white"
                  )}
                >
                  {(active || isOpen) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/[0.08] bg-white/[0.05]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                  {isMega(item) && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition",
                        isOpen ? "rotate-180 text-yamaha-300" : "text-carbon-300"
                      )}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <Link
            href="/teknik-ozellikler"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-white backdrop-blur-xl transition hover:border-yamaha-400/40"
          >
            <span className="relative size-1.5 rounded-full bg-electric-cyan shadow-[0_0_12px_2px_rgba(38,232,255,0.7)]" />
            Modelimi bul
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menüyü aç"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-white/[0.08] bg-white/[0.04] p-2 text-carbon-100 backdrop-blur-xl lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop mega-menu */}
      <AnimatePresence>
        {hovered &&
          (() => {
            const item = NAV.find((n) => n.label === hovered);
            if (!item || !isMega(item)) return null;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => onEnter(item.label)}
                className="absolute left-0 right-0 top-full z-40 hidden lg:block"
              >
                <div className="container-x pt-3">
                  <div className="glass-frost gradient-edge overflow-hidden p-6">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-3">
                        <div className="eyebrow">{item.label}</div>
                        <p className="mt-3 text-sm leading-relaxed text-carbon-200">
                          {item.description}
                        </p>
                        {item.featured && (
                          <Link
                            href={item.featured.href}
                            className="mt-6 block rounded-2xl border border-white/[0.08] bg-gradient-to-br from-yamaha-500/20 via-electric-violet/10 to-transparent p-4 transition hover:border-yamaha-400/40"
                          >
                            <div className="eyebrow !text-yamaha-200">
                              {item.featured.eyebrow}
                            </div>
                            <div className="mt-2 h-display text-lg font-semibold leading-snug text-white">
                              {item.featured.title}
                            </div>
                            <div className="mt-2 text-xs leading-relaxed text-carbon-200">
                              {item.featured.description}
                            </div>
                            <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-yamaha-200">
                              Aç
                              <ArrowUpRight className="h-3 w-3" />
                            </div>
                          </Link>
                        )}
                      </div>
                      <div className="col-span-9 grid grid-cols-2 gap-x-6 gap-y-6">
                        {item.groups.map((g) => (
                          <div key={g.title}>
                            <div className="eyebrow">{g.title}</div>
                            <ul className="mt-3 space-y-1">
                              {g.items.map((leaf) => {
                                const Soon = leaf.status === "soon";
                                const Icon = leaf.icon;
                                return (
                                  <li key={leaf.href}>
                                    <Link
                                      href={Soon ? "#" : leaf.href}
                                      aria-disabled={Soon}
                                      onClick={(e) => Soon && e.preventDefault()}
                                      className={cn(
                                        "group/leaf flex items-start gap-3 rounded-xl px-3 py-2.5 transition",
                                        Soon
                                          ? "cursor-not-allowed opacity-50"
                                          : "hover:bg-white/[0.04]"
                                      )}
                                    >
                                      {Icon && (
                                        <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-yamaha-300">
                                          <Icon className="h-4 w-4" />
                                        </span>
                                      )}
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 text-sm font-medium text-white">
                                          {leaf.label}
                                          {Soon && (
                                            <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.2em] text-carbon-300">
                                              Yakında
                                            </span>
                                          )}
                                        </div>
                                        {leaf.description && (
                                          <div className="mt-0.5 text-xs leading-relaxed text-carbon-300">
                                            {leaf.description}
                                          </div>
                                        )}
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden"
          >
            <nav className="container-x flex flex-col gap-2 pb-6 pt-2">
              {NAV.map((item) => (
                <div key={item.href} className="glass-quiet p-3">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between text-sm font-semibold text-white"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-yamaha-300" />
                  </Link>
                  {isMega(item) && (
                    <div className="mt-3 grid grid-cols-2 gap-1.5">
                      {item.groups
                        .flatMap((g) => g.items)
                        .slice(0, 6)
                        .map((leaf) => {
                          const Soon = leaf.status === "soon";
                          return (
                            <Link
                              key={leaf.href}
                              href={Soon ? "#" : leaf.href}
                              onClick={(e) => Soon && e.preventDefault()}
                              className={cn(
                                "rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 text-xs",
                                Soon ? "opacity-40" : "hover:bg-white/[0.05]"
                              )}
                            >
                              {leaf.label}
                            </Link>
                          );
                        })}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
