import { createFileRoute } from "@tanstack/react-router";
import { Bell, CalendarDays, MapPin, Settings2, ShieldAlert } from "lucide-react";

import { PageHeader, Pill, PreviewBadge } from "@/components/kit/Primitives";
import { PREVIEW_NOTICE, alertCategories, previewAlerts } from "@/lib/preview-data";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Weather Alerts — AI Travel Weather Agent" },
      {
        name: "description",
        content: "Review weather alerts, travel risks and recommended actions for your destinations.",
      },
    ],
  }),
  component: Alerts,
});

const severityTone = {
  high: "danger",
  moderate: "warning",
  low: "success",
} as const;

function Alerts() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Travel risk monitoring"
        title="Weather Alerts"
        description="Stay ahead of changing conditions with destination-specific alerts and clear actions for your journey."
        actions={<PreviewBadge label={PREVIEW_NOTICE} />}
      />

      <section className="mt-8" aria-labelledby="alert-categories">
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-4 text-primary" aria-hidden />
          <h2 id="alert-categories" className="font-medium">
            Alert Preferences
          </h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {alertCategories.map((category) => (
            <button
              key={category}
              type="button"
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
            >
              {category}
            </button>
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary/15"
          >
            <Settings2 className="size-3.5" aria-hidden />
            Manage preferences
          </button>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="active-alerts">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-cyan" aria-hidden />
            <h2 id="active-alerts" className="text-lg font-semibold">
              Active alerts
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">{previewAlerts.length} destinations monitored</span>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {previewAlerts.map((alert) => (
            <article key={alert.id} className="panel rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-danger/10 text-danger">
                    <ShieldAlert className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold">{alert.category}</h3>
                    <Pill tone={severityTone[alert.severity]}>{alert.severity} severity</Pill>
                  </div>
                </div>
              </div>

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4 text-primary" aria-hidden />
                  <dt className="sr-only">Destination</dt>
                  <dd>{alert.destination}</dd>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-4 text-primary" aria-hidden />
                  <dt className="sr-only">Date</dt>
                  <dd>{alert.date}</dd>
                </div>
              </dl>

              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Condition</p>
                <p className="mt-2 text-sm leading-relaxed">{alert.condition}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Recommended action
                </p>
                <p className="mt-2 text-sm leading-relaxed text-primary">{alert.action}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
