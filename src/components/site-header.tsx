"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleMobileSub = (label: string) => {
    setMobileMenuOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-2xl"
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

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`) ||
              (item.items && item.items.some((sub) => pathname.startsWith(sub.href)));

            if (item.items) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors outline-none",
                      active ? "text-white" : "text-carbon-300 hover:text-white"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-carbon-400 transition-transform duration-200",
                        activeDropdown === item.label && "rotate-180 text-electric-cyan"
                      )}
                    />
                    <span
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left transition-transform duration-300",
                        "bg-gradient-to-r from-electric-cyan to-yamaha-400",
                        active ? "scale-x-100 opacity-90" : "scale-x-0 opacity-0"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 top-full mt-2 w-80 -translate-x-1/2 rounded-2xl border border-white/[0.08] bg-ink-950/95 p-2 shadow-ambient-blue backdrop-blur-2xl"
                      >
                        <div className="grid gap-0.5">
                          {item.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="group flex flex-col rounded-xl px-4 py-3 transition hover:bg-white/[0.04]"
                            >
                              <span className="text-sm font-semibold text-white transition group-hover:text-electric-cyan">
                                {sub.label}
                              </span>
                              <span className="mt-0.5 text-xs text-carbon-300 leading-normal">
                                {sub.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active ? "text-white" : "text-carbon-300 hover:text-white"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-px origin-left transition-transform duration-300",
                    "bg-gradient-to-r from-electric-cyan to-yamaha-400",
                    active ? "scale-x-100 opacity-90" : "scale-x-0 opacity-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

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
            <nav className="container-x flex h-full flex-col gap-2.5 pt-6 pb-12">
              {NAV.map((item, i) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`) ||
                  (item.items && item.items.some((sub) => pathname.startsWith(sub.href)));

                if (item.items) {
                  const subOpen = mobileMenuOpen[item.label];
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
                      className="flex flex-col gap-1.5"
                    >
                      <button
                        type="button"
                        onClick={() => toggleMobileSub(item.label)}
                        className={cn(
                          "flex items-center justify-between rounded-2xl border px-5 py-4 transition text-left w-full",
                          active
                            ? "border-yamaha-400/30 bg-gradient-to-r from-yamaha-500/15 to-transparent"
                            : "border-white/[0.06] bg-white/[0.015]"
                        )}
                      >
                        <div>
                          <div className="h-display text-lg font-semibold text-white">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="mt-0.5 text-xs text-carbon-300">
                              {item.description}
                            </div>
                          )}
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
                            className="overflow-hidden pl-3 flex flex-col gap-1.5"
                          >
                            {item.items.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3 transition"
                              >
                                <div>
                                  <div className="text-sm font-semibold text-white">{sub.label}</div>
                                  <div className="text-[10px] text-carbon-300 mt-0.5">{sub.description}</div>
                                </div>
                                <span className="text-xs text-electric-cyan">→</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border px-5 py-4 transition",
                        active
                          ? "border-yamaha-400/30 bg-gradient-to-r from-yamaha-500/15 to-transparent"
                          : "border-white/[0.06] bg-white/[0.015]"
                      )}
                    >
                      <div>
                        <div className="h-display text-lg font-semibold text-white">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="mt-0.5 text-xs text-carbon-300">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <span
                        className={cn(
                          "h-display text-base font-medium",
                          active ? "text-electric-cyan" : "text-carbon-400"
                        )}
                      >
                        →
                      </span>
                    </Link>
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
