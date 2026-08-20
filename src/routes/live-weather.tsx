import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Eye, Gauge, Search, Sun, Sunrise, Sunset, Wind } from "lucide-react";
import { useState } from "react";

import { ForecastCard, MetricCard, WeatherCard } from "@/components/kit/DataCards";
import { WeatherChart } from "@/components/kit/WeatherChart";
import { EmptyState, PageHeader, Panel, PreviewBadge } from "@/components/kit/Primitives";
import { PREVIEW_NOTICE, previewDaily, previewHourly } from "@/lib/preview-data";
import { isBackendConfigured } from "@/services/travelWeatherApi";

export const Route = createFileRoute("/live-weather")({
  head: () => ({
    meta: [
      { title: "Live Weather Intelligence — AI Travel Weather Agent" },
      {
        name: "description",
        content:
          "Search a destination and review live conditions, hourly and daily forecasts, wind, humidity and visibility.",
      },
      { property: "og:title", content: "Live Weather Intelligence" },
      {
        property: "og:description",
        content: "Professional weather intelligence dashboard for travel decisions.",
      },
    ],
  }),
  component: LiveWeather;
});

function LiveWeather() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <div className="page">
      <PageHeader
        eyebrow="Weather intelligence"
        title="Live Weather"
        description="Search any destination for current conditions and the forecast that matters to your journey."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearched(true);
        }}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
        role="search"
      >
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <label htmlFor="weather-search" className="sr-only">
            Search a destination
          </label>
          <input
            id="weather-search"
            className="field pl-11"
            placeholder="Search a destination — e.g. Islamabad"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>

      {searched && !isBackendConfigured() ? (
        <div className="mt-6">
          <EmptyState
            title="Live lookup isn't connected yet"
            message="Weather is served through the orchestration backend. Once the webhook URL is configured, real results for your search appear here instead of the preview dashboard below."
          />
        </div>
      ) : null}

      <div className="mt-10 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Dashboard layout</h2>
          <PreviewBadge label={PREVIEW_NOTICE} />
        </div>

        <WeatherCard
          location="Islamabad"
          country="Pakistan"
          temperature={31}
          feelsLike={34}
          condition="Partly cloudy with building afternoon convection"
          updatedAt="—"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Humidity" value="58" unit="%" icon={Droplets} />
          <MetricCard label="Wind" value="18" unit="km/h" hint="WSW" icon={Wind} />
          <MetricCard label="Visibility" value="9.4" unit="km" icon={Eye} />
          <MetricCard label="UV Index" value="7" hint="High" icon={Sun} accent />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <WeatherChart
            title="Hourly temperature"
            subtitle="Next 14 hours"
            variant="temperature"
            data={previewHourly}
            xKey="time"
          />
          <WeatherChart
            title="Rain probability"
            subtitle="Chance of precipitation"
            variant="rain"
            data={previewHourly}
            xKey="time"
          />
          <WeatherChart
            title="Wind speed"
            subtitle="Sustained wind through the day"
            variant="wind"
            data={previewHourly}
            xKey="time"
          />
          <Panel className="p-6">
            <h3 className="font-medium">Daily forecast</h3>
            <p className="mt-1 text-xs text-muted-foreground">High / low and rain chance</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {previewDaily.map((day) => (
                <ForecastCard
                  key={day.day}
                  label={day.day}
                  high={day.high}
                  low={day.low}
                  rain={day.rain}
                />
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <MetricCard label="Sunrise" value="05:52" icon={Sunrise} />
          <MetricCard label="Sunset" value="18:34" icon={Sunset} />
          <MetricCard label="Pressure" value="1008" unit="hPa" icon={Gauge} />
        </div>
      </div>
    </div>
  );
}
