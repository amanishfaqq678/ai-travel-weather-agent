import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkle } from "lucide-react";
import { useRef, useState } from "react";

import { ErrorState, LoadingState, PageHeader, Panel, Pill } from "@/components/kit/Primitives";
import { preferenceOptions, tripTypes } from "@/lib/preview-data";
import {
  ApiError,
  analyzeTrip,
  createTripId,
  isBackendConfigured,
  type TripAnalysisResponse,
  type TripPreference,
} from "@/services/travelWeatherApi";

export const Route = createFileRoute("/plan-trip")({
  head: () => ({
    meta: [
      { title: "Plan Your Trip — AI Travel Weather Agent" },
      {
        name: "description",
        content:
          "Tell us where you're going and we'll analyze what the weather means for your journey.",
      },
      { property: "og:title", content: "Plan Your Trip — AI Travel Weather Agent" },
      {
        property: "og:description",
        content: "AI trip analysis built on live weather data and your travel preferences.",
      },
    ],
  }),
  component: PlanTrip,
});

interface FormErrors {
  destination?: string;
  travelDate?: string;
  travelTime?: string;
  tripType?: string;
}

function PlanTrip() {
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [tripType, setTripType] = useState("");
  const [preferences, setPreferences] = useState<TripPreference[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<TripAnalysisResponse | null>(null);
  const inFlight = useRef(false);

  function validate(): boolean {
    const next: FormErrors = {};
    if (destination.trim().length < 2) next.destination = "Enter a destination (min 2 characters).";
    if (!travelDate) next.travelDate = "Choose a travel date.";
    if (!travelTime) next.travelTime = "Choose a departure time.";
    if (!tripType) next.tripType = "Select a trip type.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function togglePreference(value: TripPreference) {
    setPreferences((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value],
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (inFlight.current) return;
    if (!validate()) return;

    inFlight.current = true;
    setStatus("loading");
    setMessage("");
    setResult(null);

    try {
      const data = await analyzeTrip({
        location: destination.trim(),
        tripId: createTripId(),
        context: { travelDate, travelTime, tripType, preferences },
      });
      setResult(data);
      setStatus("success");
    } catch (error) {
      setMessage(
        error instanceof ApiError ? error.message : "Unexpected error while analyzing the trip.",
      );
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  const loading = status === "loading";

  return (
    <div className="page">
      <PageHeader
        eyebrow="Trip planner"
        title="Plan Your Trip"
        description="Tell us where you're going. We'll tell you what the weather means for your journey."
        actions={
          <Pill tone={isBackendConfigured() ? "success" : "neutral"}>
            {isBackendConfigured() ? "Analysis backend connected" : "Analysis backend not connected"}
          </Pill>
        }
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        <Panel glass className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label htmlFor="destination" className="mb-2 block text-sm font-medium">
                Destination
              </label>
              <input
                id="destination"
                className="field"
                placeholder="e.g. Swat Valley, Pakistan"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                aria-invalid={Boolean(errors.destination)}
                aria-describedby={errors.destination ? "destination-error" : undefined}
              />
              {errors.destination ? (
                <p id="destination-error" className="mt-1.5 text-xs text-danger">
                  {errors.destination}
                </p>
              ) : null}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="travelDate" className="mb-2 block text-sm font-medium">
                  Travel Date
                </label>
                <input
                  id="travelDate"
                  type="date"
                  className="field"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  aria-invalid={Boolean(errors.travelDate)}
                />
                {errors.travelDate ? (
                  <p className="mt-1.5 text-xs text-danger">{errors.travelDate}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="travelTime" className="mb-2 block text-sm font-medium">
                  Travel Time
                </label>
                <input
                  id="travelTime"
                  type="time"
                  className="field"
                  value={travelTime}
                  onChange={(e) => setTravelTime(e.target.value)}
                  aria-invalid={Boolean(errors.travelTime)}
                />
                {errors.travelTime ? (
                  <p className="mt-1.5 text-xs text-danger">{errors.travelTime}</p>
                ) : null}
              </div>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-medium">Trip Type</legend>
              <div className="flex flex-wrap gap-2">
                {tripTypes.map((type) => {
                  const active = tripType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTripType(type)}
                      aria-pressed={active}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        active
                          ? "border-primary/50 bg-primary/15 text-foreground"
                          : "border-border text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
              {errors.tripType ? (
                <p className="mt-2 text-xs text-danger">{errors.tripType}</p>
              ) : null}
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-sm font-medium">Preferences</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {preferenceOptions.map((option) => {
                  const active = preferences.includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                        active
                          ? "border-primary/45 bg-primary/10"
                          : "border-border hover:bg-secondary"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="size-4 accent-[var(--primary)]"
                        checked={active}
                        onChange={() => togglePreference(option.value)}
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <button type="submit" className="btn-primary" disabled={loading}>
                <Sparkle className="size-4" aria-hidden />
                {loading ? "Analyzing…" : "Analyze Trip"}
              </button>
              <p className="text-xs text-muted-foreground">
                Sent to the orchestration webhook — no provider keys live in this app.
              </p>
            </div>
          </form>
        </Panel>

        <div className="space-y-6">
          {status === "loading" ? <LoadingState label="Analyzing travel conditions…" /> : null}

          {status === "error" ? (
            <ErrorState message={message} onRetry={() => setStatus("idle")} />
          ) : null}

          {status === "success" && result ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Panel className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-medium">Analysis received</h2>
                  <Pill tone="success">{result.location || destination}</Pill>
                </div>
                <pre className="mt-4 max-h-80 overflow-auto rounded-xl border border-border bg-surface-2/60 p-4 text-xs text-muted-foreground">
                  {JSON.stringify(result, null, 2)}
                </pre>
                <Link to="/ai-insights" className="btn-ghost mt-5 w-full">
                  Open AI Insights
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Panel>
            </motion.div>
          ) : null}

          {status === "idle" ? (
            <Panel className="p-6">
              <h2 className="font-medium">What happens next</h2>
              <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
                {[
                  "Your trip is posted to the orchestration workflow.",
                  "Live weather is retrieved for the destination and window.",
                  "The AI layer weighs risks against your trip type and preferences.",
                  "You receive a travel score, best window and recommendations.",
                ].map((line, i) => (
                  <li key={line} className="flex gap-3">
                    <span className="font-display text-xs text-primary">0{i + 1}</span>
                    {line}
                  </li>
                ))}
              </ol>
            </Panel>
          ) : null}

          <Panel className="p-6">
            <h2 className="font-medium">Request contract</h2>
            <pre className="mt-3 overflow-auto rounded-xl border border-border bg-surface-2/60 p-4 text-xs text-muted-foreground">
{`POST $N8N_WEATHER_WEBHOOK_URL
{
  "location": "...",
  "tripId": "...",
  "context": {
    "travelDate": "...",
    "travelTime": "...",
    "tripType": "...",
    "preferences": [...]
  }
}`}
            </pre>
          </Panel>
        </div>
      </div>
    </div>
  );
}
