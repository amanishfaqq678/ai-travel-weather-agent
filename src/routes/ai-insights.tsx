import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Backpack,
  Ban,
  Clock3,
  CloudRain,
  Eye,
  Thermometer,
  Wind,
} from "lucide-react";

import { RiskCard, TravelScore } from "@/components/kit/DataCards";
import { PageHeader, Panel, Pill, PreviewBadge } from "@/components/kit/Primitives";
import { PREVIEW_NOTICE } from "@/lib/preview-data";

export const Route = createFileRoute("/ai-insights")({
  head: () => ({
    meta: [
      { title: "AI Travel Insights — AI Travel Weather Agent" },
      {
        name: "description",
        content:
          "AI decision support for travel: travel score, risk analysis, best travel time, packing and avoidance guidance.",
      },
      { property: "og:title", content: "AI Travel Insights" },
      {
        property: "og:description",
        content: "Weather risk turned into a clear travel decision.",
      },
    ],
  }),
  component: AIInsights,
});

const risks = [
  { label: "Rain Risk", level: "low" as const, value: 18, icon: CloudRain, detail: "Isolated light showers after 17:00; road surfaces stay usable." },
  { label: "Wind Risk", level: "moderate" as const, value: 52, icon: Wind, detail: "Gusts to 34 km/h on exposed sections — secure roof loads." },
  { label: "Visibility Risk", level: "low" as const, value: 14, icon: Eye, detail: "Visibility holds above 8 km through the travel window." },
  { label: "Temperature Risk", level: "moderate" as const, value: 46, icon: Thermometer, detail: "Peak feels-like 36°C between 13:00 and 16:00." },
];

const packing = ["Light rain shell", "Sun protection", "1.5L water per person", "Offline route map"];
const avoid = ["Midday ridge driving", "Open-air stops 13:00–16:00", "Late departure after 18:00"];

function AIInsights() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Decision support"
        title="AI Travel Insights"
        description="How the AI layer reads current conditions against your trip profile."
        actions={<PreviewBadge label={PREVIEW_NOTICE} />}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[380px_1fr]">
        <Panel glass className="flex flex-col items-center justify-center gap-6 p-8">
          <TravelScore score={82} status="Good Conditions" />
          <p className="text-center text-sm text-muted-foreground">
            Conditions support travel with minor timing adjustments.
          </p>
          <Link to="/plan-trip" className="btn-primary w-full">
            Analyze a real trip
          </Link>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-6">
            <h2 className="font-medium">Weather Summary</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A stable morning airmass gives clear skies and light winds until midday. Heating
              through the afternoon builds isolated convection with brief gusty showers, easing
              after sunset. Visibility remains good throughout.
            </p>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-medium">Travel Recommendation</h2>
              <Pill tone="success">Proceed with timing shift</Pill>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Depart early and complete exposed sections before the afternoon peak. No need to
              postpone the journey.
            </p>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2.5">
              <Clock3 className="size-4 text-primary" aria-hidden />
              <h2 className="font-medium">Best Travel Time</h2>
            </div>
            <p className="mt-3 font-display text-3xl font-semibold">06:30 – 11:00</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Lowest combined rain, wind and heat load across the day.
            </p>
          </Panel>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">Risk Analysis</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {risks.map((risk) => (
            <RiskCard key={risk.label} {...risk} />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <Panel className="p-6">
          <div className="flex items-center gap-2.5">
            <Backpack className="size-4 text-cyan" aria-hidden />
            <h2 className="font-medium">What To Pack</h2>
          </div>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {packing.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-cyan" />
                {item}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel className="p-6">
          <div className="flex items-center gap-2.5">
            <Ban className="size-4 text-danger" aria-hidden />
            <h2 className="font-medium">What To Avoid</h2>
          </div>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {avoid.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-danger" />
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </div>
  );
}
