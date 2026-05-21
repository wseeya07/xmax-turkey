"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label={SITE.name}
          className="group flex items-center gap-2.5"
        >
          <Logo className="h-8 w-8 text-yamaha-400 transition-transform group-hover:rotate-6" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold tracking-tightest text-white">
              XMAX <span className="text-yamaha-400">Türkiye</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-carbon-300">
              {SITE.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "text-white"
                    : "text-carbon-200 hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-yamaha-500/30 to-yamaha-700/30 ring-1 ring-yamaha-400/30"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/teknik-ozellikler"
            className="group inline-flex items-center gap-2 rounded-full border border-yamaha-400/30 bg-yamaha-500/10 px-4 py-1.5 text-sm font-medium text-yamaha-100 transition hover:bg-yamaha-500/20"
          >
            <span className="size-1.5 rounded-full bg-yamaha-300 shadow-[0_0_10px_2px_rgba(46,133,255,0.7)]" />
            Modelimi Bul
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menüyü aç"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-white/10 bg-white/[0.03] p-2 text-carbon-100 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden"
          >
            <nav className="container-x flex flex-col gap-1 pb-5">
              {NAV_ITEMS.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium ring-1",
                      active
                        ? "bg-yamaha-500/15 text-white ring-yamaha-400/30"
                        : "ring-white/5 text-carbon-200 hover:bg-white/[0.03]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
