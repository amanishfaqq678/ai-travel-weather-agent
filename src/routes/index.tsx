import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  Brain,
  CloudSun,
  Eye,
  Gauge,
  Mic,
  Thermometer,
  Timer,
  Wind,
  CloudRain,
} from "lucide-react";

import { MetricCard } from "@/components/kit/DataCards";
import { Panel, SectionHeading } from "@/components/kit/Primitives";
import { HeroVisual } from "@/components/home/HeroVisual";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Travel Weather Agent — Travel Smarter With Weather Intelligence" },
      {
        name: "description",
        content:
          "Plan every journey with real-time weather data and AI-powered travel recommendations, travel scores and risk analysis.",
      },
      { property: "og:title", content: "Travel Smarter With Weather Intelligence" },
      {
        property: "og:description",
        content:
          "AI travel intelligence combining live weather, risk analysis, alerts and a voice assistant.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    id: "01",
    icon: Brain,
    title: "AI Travel Analysis",
    body: "Conditions interpreted against your trip type and preferences, not just raw numbers.",
  },
  {
    id: "02",
    icon: CloudSun,
    title: "Real-Time Weather",
    body: "Live observations and forecasts pulled through the orchestration layer.",
  },
  {
    id: "03",
    icon: BellRing,
    title: "Smart Weather Alerts",
    body: "Be told when a route, window or destination stops being a good idea.",
  },
  {
    id: "04",
    icon: Mic,
    title: "Voice Travel Assistant",
    body: "Ask about destinations and departure windows hands-free while you pack.",
  },
];

const steps = [
  { id: "01", title: "Choose your destination", body: "Location, date, time, trip type and what you'd rather avoid." },
  { id: "02", title: "We retrieve real weather data", body: "Live conditions and forecasts are fetched through the backend." },
  { id: "03", title: "AI analyzes travel conditions", body: "Risks are weighed against your trip profile and preferences." },
  { id: "04", title: "Receive a practical recommendation", body: "A travel score, a best window, and what to pack or avoid." },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="page pt-10 sm:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-primary"
            >
              <Brain className="size-3.5" aria-hidden />
              AI + Weather + Travel Intelligence
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
            >
              Travel Smarter With <span className="text-gradient">Weather Intelligence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Plan every journey with real-time weather data and AI-powered travel
              recommendations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link to="/plan-trip" className="btn-primary">
                Plan a Trip
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link to="/live-weather" className="btn-ghost">
                Explore Weather
              </Link>
            </motion.div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { k: "Travel Score", v: "0–100" },
                { k: "Risk Signals", v: "4 axes" },
                { k: "Interfaces", v: "Chat + Voice" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {item.k}
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* Features */}
      <section className="page">
        <SectionHeading
          eyebrow="Capabilities"
          title="Your Personal Travel Intelligence"
          description="One system that reads the sky, understands your trip and tells you what to do about it."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <Panel hover className="h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                    <feature.icon className="size-4.5 text-primary" aria-hidden />
                  </span>
                  <span className="font-display text-sm text-muted-foreground">{feature.id}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
              </Panel>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="page">
        <SectionHeading eyebrow="Process" title="How It Works" />
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.id} className="bg-surface/80 p-7">
              <span className="font-display text-3xl font-semibold text-gradient">{step.id}</span>
              <h3 className="mt-4 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="page">
        <SectionHeading
          eyebrow="Output"
          title="Intelligence At A Glance"
          description="An example of the metrics the analysis returns for every planned trip."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard label="Travel Score" value="82" unit="/100" hint="Good conditions" icon={Gauge} accent />
          <MetricCard label="Rain Risk" value="Low" hint="12% chance in window" icon={CloudRain} />
          <MetricCard label="Wind Risk" value="Moderate" hint="Gusts to 24 km/h" icon={Wind} />
          <MetricCard label="Visibility" value="9.6" unit="km" hint="Clear" icon={Eye} />
          <MetricCard label="Temperature" value="27" unit="°C" hint="Feels like 29°C" icon={Thermometer} />
          <MetricCard label="Best Travel Time" value="07:30" hint="Before midday heat" icon={Timer} />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Illustrative values shown to describe the output format — live results come from the
          connected backend.
        </p>
      </section>

      {/* CTA */}
      <section className="page">
        <Panel glass className="relative overflow-hidden p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto size-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-semibold sm:text-4xl">Plan Your Next Journey</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
              Give the agent a destination and a date. It handles the meteorology and gives you a
              decision.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/plan-trip" className="btn-primary">
                Plan a Trip
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link to="/voice" className="btn-ghost">
                Try Voice AI
              </Link>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
