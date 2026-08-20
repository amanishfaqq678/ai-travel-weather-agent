import { Link } from "@tanstack/react-router";

import { Logo, navLinks, secondaryLinks } from "@/components/layout/Navbar";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Travel intelligence that combines real-time weather data with AI analysis, so every
            journey starts with a clear answer.
          </p>
        </div>

        <nav aria-label="Product">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Product
          </p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="More">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            More
          </p>
          <ul className="mt-4 space-y-2.5">
            {secondaryLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground sm:px-8">
        AI Travel Weather Agent — interface layer. Weather, AI and voice services connect through
        the orchestration backend.
      </div>
    </footer>
  );
}
