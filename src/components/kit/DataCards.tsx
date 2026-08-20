import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  MapPin,
  ShieldAlert,
} from "lucide-react";
import type { ReactNode } from "react";

import { Panel, Pill } from "@/components/kit/Primitives";
import type { RiskLevel, TripStatus, PreviewTrip, PreviewAlert } from "@/lib/preview-data";
import { cn } from "@/lib/utils";

/* ------------------------------- MetricCard -------------------------------- */

export function MetricCard({
  label,
  value,
  unit,
  hint,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
  icon?: LucideIcon;
  accent?: boolean;
}) {
  return (
    <Panel
      hover
      className={cn("p-5", accent && "border-primary/30 bg-primary/5")}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
        {Icon ? (
          <Icon
            className={cn("size-4", accent ? "text-primary" : "text-muted-foreground")}
            aria-hidden
          />
        ) : null}
      </div>
      <p className="mt-4 font-display text-3xl font-semibold">
        {value}
        {unit ? (
          <span className="ml-1 text-base font-normal text-muted-foreground">{unit}</span>
        ) : null}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </Panel>
  );
}

/* ------------------------------- TravelScore ------------------------------- */

export function scoreTone(score: number): RiskLevel {
  if (score >= 75) return "low";
  if (score >= 55) return "moderate";
  return "high";
}

const riskColorVar: Record<RiskLevel, string> = {
  low: "var(--success)",
  moderate: "var(--warning)",
  high: "var(--danger)",
};

export function TravelScore({
  score,
  status,
  size = 200,
}: {
  score: number;
  status: string;
  size?: number;
}) {
  const tone = scoreTone(score);
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-6 rounded-full blur-2xl opacity-40"
          style={{ background: riskColorVar[tone] }}
          aria-hidden
        />
        <svg width={size} height={size} className="relative -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={riskColorVar[tone]}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - score / 100) }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl font-semibold">{score}</span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            / 100
          </span>
        </div>
      </div>
      <Pill tone={tone === "low" ? "success" : tone === "moderate" ? "warning" : "danger"}>
        {status}
      </Pill>
    </div>
  );
}

/* --------------------------------- RiskCard -------------------------------- */

export function RiskCard({
  label,
  level,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  level: RiskLevel;
  value: number;
  detail: string;
  icon: LucideIcon;
}) {
  const tone = level === "low" ? "success" : level === "moderate" ? "warning" : "danger";
  return (
    <Panel hover className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Icon className="size-4 text-muted-foreground" aria-hidden />
          <p className="text-sm font-medium">{label}</p>
        </div>
        <Pill tone={tone} className="capitalize">
          {level}
        </Pill>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full"
          style={{ background: riskColorVar[level] }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{detail}</p>
    </Panel>
  );
}

/* -------------------------------- TripCard --------------------------------- */

const statusTone: Record<TripStatus, "success" | "warning" | "danger"> = {
  "Good Conditions": "success",
  "Moderate Risk": "warning",
  "High Risk": "danger",
};

export function TripCard({ trip }: { trip: PreviewTrip }) {
  return (
    <Panel hover className="group flex flex-col gap-5 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden />
            <span className="text-xs uppercase tracking-[0.16em]">{trip.country}</span>
          </div>
          <h3 className="mt-1.5 text-xl font-semibold">{trip.destination}</h3>
        </div>
        <Pill tone={statusTone[trip.status]}>{trip.status}</Pill>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{trip.summary}</p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5" aria-hidden />
          {trip.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" aria-hidden />
          {trip.time}
        </span>
        <span className="rounded-full border border-border px-2 py-0.5">{trip.type}</span>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Travel Score
          </p>
          <p className="font-display text-2xl font-semibold">{trip.score}</p>
        </div>
        <Link
          to="/trips/$tripId"
          params={{ tripId: trip.id }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-primary/10"
        >
          View details
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </Panel>
  );
}

/* -------------------------------- AlertCard -------------------------------- */

export function AlertCard({ alert }: { alert: PreviewAlert }) {
  const tone =
    alert.severity === "low" ? "success" : alert.severity === "moderate" ? "warning" : "danger";
  return (
    <Panel hover className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="size-4 text-muted-foreground" aria-hidden />
          <h3 className="font-medium">{alert.category}</h3>
        </div>
        <Pill tone={tone} className="capitalize">
          {alert.severity} severity
        </Pill>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5" aria-hidden />
          {alert.destination}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5" aria-hidden />
          {alert.date}
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed">{alert.condition}</p>
      <div className="mt-4 rounded-xl border border-border bg-surface-2/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Recommended action
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">{alert.action}</p>
      </div>
    </Panel>
  );
}

/* ------------------------------ Weather cards ------------------------------ */

export function WeatherCard({
  location,
  country,
  temperature,
  feelsLike,
  condition,
  updatedAt,
  children,
}: {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  updatedAt: string;
  children?: ReactNode;
}) {
  return (
    <Panel glass className="relative overflow-hidden p-7">
      <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden />
            <span className="text-xs uppercase tracking-[0.18em]">{country}</span>
          </div>
          <h2 className="mt-2 text-3xl font-semibold">{location}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{condition}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-6xl font-semibold leading-none">
            {temperature}
            <span className="align-top text-2xl text-muted-foreground">°C</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Feels like {feelsLike}°C</p>
        </div>
      </div>
      {children}
      <p className="relative mt-6 text-xs text-muted-foreground">Last updated {updatedAt}</p>
    </Panel>
  );
}

export function ForecastCard({
  label,
  high,
  low,
  rain,
}: {
  label: string;
  high: number;
  low: number;
  rain: number;
}) {
  return (
    <Panel hover className="flex flex-col items-center gap-2 p-4 text-center">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="font-display text-xl font-semibold">{high}°</p>
      <p className="text-xs text-muted-foreground">{low}° low</p>
      <p className="text-xs text-cyan">{rain}% rain</p>
    </Panel>
  );
}
