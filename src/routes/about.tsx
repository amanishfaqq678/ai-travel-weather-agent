import { createFileRoute } from "@tanstack/react-router";
import { Radar, Route as RouteIcon, ShieldCheck } from "lucide-react";

import { PageHeader, Panel, PreviewBadge } from "@/components/kit/Primitives";
import { PREVIEW_NOTICE } from "@/lib/preview-data";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — AI Travel Weather Agent" }] }),
  component: About,
});

function About() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="About the product"
        title="AI Travel Weather Agent"
        description="A travel intelligence interface that turns weather conditions into clearer journey decisions."
        actions={<PreviewBadge label={PREVIEW_NOTICE} />}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <InfoCard icon={Radar} title="Weather intelligence" text="Forecast and risk surfaces are prepared for the live orchestration service." />
        <InfoCard icon={RouteIcon} title="Trip planning" text="Plan journeys around conditions, timing and your travel preferences." />
        <InfoCard icon={ShieldCheck} title="Connection-safe" text="Provider keys and external services stay outside the frontend." />
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: typeof Radar; title: string; text: string }) {
  return (
    <Panel className="p-6">
      <Icon className="size-5 text-primary" aria-hidden />
      <h2 className="mt-4 font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </Panel>
  );
}
