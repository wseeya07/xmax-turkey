"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Settings2,
  Zap,
  Cog,
  Disc,
  Wrench,
  CircleDot,
  AlertCircle,
  Database,
  BookOpen,
  Atom,
  ShoppingCart,
  Bike,
  Sofa,
  Instagram,
  type LucideIcon
} from "lucide-react";
import { NAV, type NavGroup } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  Settings2,
  Zap,
  Cog,
  Disc,
  Wrench,
  CircleDot,
  AlertCircle,
  Database,
  BookOpen,
  Atom,
  ShoppingCart,
  Bike,
  Sofa
};

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveGroup(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!activeGroup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveGroup(null);
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveGroup(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [activeGroup]);

  const toggleGroup = (label: string) => {
    setActiveGroup((curr) => (curr === label ? null : label));
  };

  const isGroupActive = (group: NavGroup) =>
    pathname === group.href ||
    pathname.startsWith(`${group.href}/`) ||
    group.items.some(
      (sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`)
    );

  const active = activeGroup
    ? NAV.find((g) => g.label === activeGroup) ?? null
    : null;

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || activeGroup
          ? "border-b border-white/[0.06] bg-ink-950/85 backdrop-blur-2xl"
          : "border-b border-transparent"
      )}
    >
      <div className="container-x flex h-14 items-center justify-between">
        <Link
          href="/"
          aria-label={SITE.name}
          className="group flex items-center gap-2.5"
        >
          <Logo className="h-7 w-7 transition-transform group-hover:rotate-6" />
          <span className="font-display text-[15px] font-semibold tracking-tightest text-white">
            XMAX <span className="text-electric">Türkiye</span>
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          <nav className="mr-1 hidden items-center gap-0.5 md:flex">
            {NAV.map((group) => {
              const groupActive = isGroupActive(group);
              const isOpen = activeGroup === group.label;
              return (
                <button
                  key={group.href}
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  aria-expanded={isOpen}
                  aria-controls={`mega-panel`}
                  aria-haspopup="true"
                  className={cn(
                    "relative inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium outline-none transition-colors",
                    groupActive || isOpen
                      ? "text-white"
                      : "text-carbon-300 hover:text-white"
                  )}
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isOpen
                        ? "rotate-180 text-electric-cyan"
                        : "text-carbon-400"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-transform duration-300",
                      groupActive || isOpen
                        ? "scale-x-100 opacity-90"
                        : "scale-x-0 opacity-0"
                    )}
                  />
                </button>
              );
            })}
          </nav>

          <a
            href="https://www.instagram.com/turkxmax/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] p-2 text-carbon-200 backdrop-blur-xl transition-all hover:border-white/[0.12] hover:bg-white/[0.08] hover:text-white"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md border border-white/[0.08] bg-white/[0.04] p-2 text-carbon-100 backdrop-blur-xl md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key={`mega-${active.label}`}
            id="mega-panel"
            role="region"
            aria-label={`${active.label} alt menü`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute inset-x-0 top-full hidden border-b border-white/[0.06] bg-ink-950/95 backdrop-blur-2xl md:block"
          >
            <div className="container-x py-7">
              <div className="flex items-center justify-between gap-6 border-b border-white/[0.06] pb-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                    {active.tagline}
                  </div>
                  <h3 className="mt-1 h-display text-xl font-semibold text-white sm:text-2xl">
                    {active.label}
                  </h3>
                </div>
                <Link
                  href={active.href}
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-yamaha-200 transition hover:border-yamaha-400/40 hover:text-white"
                >
                  Tümünü gör
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div
                className={cn(
                  "relative mt-5 grid gap-3",
                  active.items.length === 2 && "grid-cols-2",
                  active.items.length === 3 && "grid-cols-3",
                  active.items.length >= 4 && "grid-cols-4"
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br opacity-40",
                    active.accent
                  )}
                  aria-hidden
                />
                {active.items.map((sub) => {
                  const Icon = ICONS[sub.icon] ?? CircleDot;
                  const isActive =
                    pathname === sub.href || pathname.startsWith(`${sub.href}/`);
                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={cn(
                        "group/item relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 transition",
                        "hover:-translate-y-0.5 hover:border-electric-cyan/30 hover:bg-white/[0.05]",
                        isActive && "border-electric-cyan/40 bg-electric-cyan/[0.04]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-black/30 text-electric-cyan transition",
                            "group-hover/item:border-electric-cyan/40"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        {sub.comingSoon ? (
                          <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-carbon-400">
                            yakında
                          </span>
                        ) : (
                          <ArrowUpRight className="h-3.5 w-3.5 text-carbon-400 transition group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-electric-cyan" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {sub.label}
                        </div>
                        <div className="mt-1 text-[11px] leading-snug text-carbon-300">
                          {sub.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-14 z-40 h-[calc(100dvh-3.5rem)] overflow-y-auto bg-ink-950/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="container-x flex flex-col gap-8 pt-6 pb-16">
              {NAV.map((group, i) => (
                <motion.section
                  key={group.href}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.04 + i * 0.04 }}
                  className="flex flex-col gap-3"
                >
                  <Link
                    href={group.href}
                    className="group flex items-baseline justify-between border-b border-white/[0.06] pb-2"
                  >
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                        {group.tagline}
                      </div>
                      <div className="mt-0.5 h-display text-xl font-semibold text-white">
                        {group.label}
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-electric-cyan transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                  <ul className="flex flex-col gap-1.5">
                    {group.items.map((sub) => {
                      const Icon = ICONS[sub.icon] ?? CircleDot;
                      const isActive =
                        pathname === sub.href ||
                        pathname.startsWith(`${sub.href}/`);
                      return (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className={cn(
                              "flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3 transition",
                              "hover:border-electric-cyan/25 hover:bg-white/[0.04]",
                              isActive &&
                                "border-electric-cyan/30 bg-electric-cyan/[0.05]"
                            )}
                          >
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/[0.06] bg-black/30 text-electric-cyan">
                              <Icon className="h-4 w-4" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-white">
                                  {sub.label}
                                </span>
                                {sub.comingSoon && (
                                  <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0 font-mono text-[8px] uppercase tracking-[0.2em] text-carbon-400">
                                    yakında
                                  </span>
                                )}
                              </div>
                              <div className="mt-0.5 text-[11px] leading-snug text-carbon-300">
                                {sub.description}
                              </div>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-electric-cyan" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.section>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
