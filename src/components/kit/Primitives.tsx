import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ---------------------------------- Panel --------------------------------- */

export function Panel({
  className,
  children,
  glass: isGlass = false,
  hover = false,
}: {
  className?: string;
  children: ReactNode;
  glass?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        isGlass ? "glass" : "panel",
        hover &&
          "transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- Badge --------------------------------- */

type Tone = "brand" | "success" | "warning" | "danger" | "neutral" | "cyan";

const toneMap: Record<Tone, string> = {
  brand: "bg-primary/15 text-primary border-primary/30",
  cyan: "bg-cyan/10 text-cyan border-cyan/30",
  success: "bg-success/12 text-success border-success/30",
  warning: "bg-warning/12 text-warning border-warning/30",
  danger: "bg-danger/12 text-danger border-danger/30",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function Pill({
  tone = "neutral",
  icon: Icon,
  children,
  className,
}: {
  tone?: Tone;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        toneMap[tone],
        className,
      )}
    >
      {Icon ? <Icon className="size-3.5" aria-hidden /> : null}
      {children}
    </span>
  );
}

export function PreviewBadge({ label }: { label: string }) {
  return (
    <Pill tone="neutral" className="uppercase text-[10px] tracking-[0.18em]">
      {label}
    </Pill>
  );
}

/* ------------------------------ Section header ----------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between"
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </motion.header>
  );
}

/* --------------------------------- States --------------------------------- */

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface/60 px-6 py-14 text-center">
      <span className="relative flex size-12 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <Loader2 className="size-6 animate-spin text-primary" aria-hidden />
      </span>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-2xl border border-danger/30 bg-danger/5 px-6 py-12 text-center"
    >
      <AlertTriangle className="size-7 text-danger" aria-hidden />
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  message,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  message?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-surface/40 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl border border-border bg-surface-2">
        <Icon className="size-5 text-muted-foreground" aria-hidden />
      </span>
      <div>
        <p className="font-medium">{title}</p>
        {message ? (
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
