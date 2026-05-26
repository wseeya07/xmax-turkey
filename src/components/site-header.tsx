"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<Record<string, boolean>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setMegaOpen(false);
      setHoveredGroup(null);
    }, 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMega = (label: string) => {
    cancelClose();
    setMegaOpen(true);
    setHoveredGroup(label);
  };

  const isGroupActive = (group: NavGroup) =>
    pathname === group.href ||
    pathname.startsWith(`${group.href}/`) ||
    group.items.some((sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`));

  const toggleMobileSub = (label: string) => {
    setMobileMenuOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || megaOpen
          ? "border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-2xl"
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
          {/* Desktop Nav Bar */}
          <nav
            className="hidden items-center gap-0.5 md:flex mr-1"
            onMouseLeave={scheduleClose}
          >
            {NAV.map((group) => {
              const active = isGroupActive(group);
              const isHovered = hoveredGroup === group.label && megaOpen;
              return (
                <Link
                  key={group.href}
                  href={group.href}
                  onMouseEnter={() => openMega(group.label)}
                  onFocus={() => openMega(group.label)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm font-medium outline-none transition-colors",
                    active || isHovered ? "text-white" : "text-carbon-300 hover:text-white"
                  )}
                  aria-expanded={isHovered}
                  aria-haspopup="true"
                >
                  {group.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gradient-to-r from-electric-cyan to-yamaha-400 transition-transform duration-300",
                      active || isHovered ? "scale-x-100 opacity-90" : "scale-x-0 opacity-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Monochrome Instagram Icon */}
          <a
            href="https://www.instagram.com/turkxmax/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/[0.08] bg-white/[0.04] p-2 text-carbon-200 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all backdrop-blur-xl flex items-center justify-center"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-white/[0.08] bg-white/[0.04] p-2 text-carbon-100 backdrop-blur-xl md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mega Panel — single Apple-style flyout with all categories */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="hidden md:block absolute left-0 right-0 top-full border-b border-white/[0.06] bg-ink-950/95 backdrop-blur-2xl"
          >
            <div className="container-x py-8">
              <div className="grid grid-cols-4 gap-6">
                {NAV.map((group) => {
                  const focused = hoveredGroup === group.label;
                  return (
                    <div
                      key={group.href}
                      onMouseEnter={() => setHoveredGroup(group.label)}
                      className={cn(
                        "group/col relative flex flex-col gap-2 rounded-2xl border p-4 transition-all duration-200",
                        focused
                          ? "border-white/[0.08] bg-white/[0.025]"
                          : "border-transparent bg-transparent"
                      )}
                    >
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300",
                          group.accent,
                          focused && "opacity-100"
                        )}
                        aria-hidden
                      />

                      <Link
                        href={group.href}
                        className="relative flex items-baseline justify-between gap-2 border-b border-white/[0.06] pb-3"
                      >
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                            {group.tagline}
                          </div>
                          <div className="mt-1 h-display text-lg font-semibold text-white">
                            {group.label}
                          </div>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-carbon-400 transition group-hover/col:-translate-y-0.5 group-hover/col:translate-x-0.5 group-hover/col:text-electric-cyan" />
                      </Link>

                      <div className="relative flex flex-col gap-0.5">
                        {group.items.map((sub) => {
                          const Icon = ICONS[sub.icon] ?? CircleDot;
                          const isActive =
                            pathname === sub.href || pathname.startsWith(`${sub.href}/`);
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={cn(
                                "group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition",
                                "hover:bg-white/[0.04]",
                                isActive && "bg-white/[0.03]"
                              )}
                            >
                              <span
                                className={cn(
                                  "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.03] transition",
                                  "group-hover/item:border-electric-cyan/30 group-hover/item:text-electric-cyan",
                                  isActive ? "text-electric-cyan" : "text-carbon-200"
                                )}
                              >
                                <Icon className="h-3.5 w-3.5" />
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[13px] font-semibold text-white">
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
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-14 z-40 h-[calc(100dvh-3.5rem)] overflow-y-auto bg-ink-950/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="container-x flex flex-col gap-2.5 pt-6 pb-12">
              {NAV.map((group, i) => {
                const active = isGroupActive(group);
                const subOpen = mobileMenuOpen[group.label];
                return (
                  <motion.div
                    key={group.href}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
                    className="flex flex-col gap-1.5"
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileSub(group.label)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition",
                        active
                          ? "border-yamaha-400/30 bg-gradient-to-r from-yamaha-500/15 to-transparent"
                          : "border-white/[0.06] bg-white/[0.015]"
                      )}
                    >
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-400">
                          {group.tagline}
                        </div>
                        <div className="mt-0.5 h-display text-lg font-semibold text-white">
                          {group.label}
                        </div>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-carbon-400 transition-transform duration-200",
                          subOpen && "rotate-180 text-electric-cyan"
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {subOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-1.5 overflow-hidden pl-3"
                        >
                          <Link
                            href={group.href}
                            className="flex items-center justify-between rounded-xl border border-electric-cyan/20 bg-electric-cyan/[0.05] px-4 py-3"
                          >
                            <div>
                              <div className="text-sm font-semibold text-white">
                                Genel bakış
                              </div>
                              <div className="mt-0.5 text-[10px] text-carbon-300">
                                {group.label} ana sayfası
                              </div>
                            </div>
                            <ArrowUpRight className="h-3.5 w-3.5 text-electric-cyan" />
                          </Link>
                          {group.items.map((sub) => {
                            const Icon = ICONS[sub.icon] ?? CircleDot;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3"
                              >
                                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-electric-cyan">
                                  <Icon className="h-4 w-4" />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-semibold text-white">
                                    {sub.label}
                                  </div>
                                  <div className="mt-0.5 text-[10px] text-carbon-300">
                                    {sub.description}
                                  </div>
                                </div>
                                <span className="text-xs text-electric-cyan">→</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
