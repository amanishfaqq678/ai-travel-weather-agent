import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Menu,
  MessageSquare,
  Radar,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useAIChat } from "@/components/ai/AIChatProvider";
import { cn } from "@/lib/utils";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/plan-trip", label: "Plan Trip" },
  { to: "/live-weather", label: "Live Weather" },
  { to: "/ai-insights", label: "AI Insights" },
  { to: "/trips", label: "My Trips" },
  { to: "/alerts", label: "Alerts" },
  { to: "/voice", label: "Voice AI" },
] as const;

export const secondaryLinks = [
  { to: "/calls", label: "AI Calls" },
  { to: "/settings", label: "Settings" },
  { to: "/about", label: "About" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="AI Travel Weather Agent home">
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-brand glow">
        <Radar className="size-4.5 text-primary-foreground" aria-hidden />
      </span>
      <span className="hidden flex-col leading-tight sm:flex">
        <span className="font-display text-sm font-semibold tracking-tight">
          AI Travel Weather
        </span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Agent
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { toggle } = useAIChat();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-300",
          scrolled ? "glass" : "border border-transparent",
        )}
        aria-label="Primary"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-primary/12 data-[status=active]:text-foreground"
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggle}
            className="hidden items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/20 sm:inline-flex"
          >
            <MessageSquare className="size-4 text-primary" aria-hidden />
            AI Chat
          </button>
          <Link
            to="/alerts"
            aria-label="Notifications"
            className="relative flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
          >
            <Bell className="size-4" aria-hidden />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-cyan" />
          </Link>
          <Link
            to="/settings"
            aria-label="Profile and settings"
            className="flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
          >
            <User className="size-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-3 lg:hidden"
          >
            <ul className="grid gap-1">
              {[...navLinks, ...secondaryLinks].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    activeOptions={{ exact: link.to === "/" }}
                    className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary data-[status=active]:bg-primary/12 data-[status=active]:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                toggle();
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-medium text-primary-foreground"
            >
              <MessageSquare className="size-4" aria-hidden />
              Open AI Chat
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
