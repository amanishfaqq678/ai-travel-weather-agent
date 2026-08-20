import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { TripCard } from "@/components/kit/DataCards";
import { EmptyState, PageHeader, PreviewBadge } from "@/components/kit/Primitives";
import { PREVIEW_NOTICE, previewTrips, type TripStatus } from "@/lib/preview-data";

export const Route = createFileRoute("/trips/")({
  head: () => ({
    meta: [
      { title: "My Trips — AI Travel Weather Agent" },
      {
        name: "description",
        content:
          "Manage planned journeys with travel scores, weather status, search, filters and sorting.",
      },
      { property: "og:title", content: "My Trips" },
      {
        property: "og:description",
        content: "A trip management dashboard driven by weather intelligence.",
      },
    ],
  }),
  component: Trips,
});

const statuses: Array<TripStatus | "All"> = [
  "All",
  "Good Conditions",
  "Moderate Risk",
  "High Risk",
];

function Trips() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<TripStatus | "All">("All");
  const [sort, setSort] = useState<"date" | "score">("date");

  const trips = useMemo(() => {
    return previewTrips
      .filter((t) =>
        query.trim()
          ? t.destination.toLowerCase().includes(query.trim().toLowerCase())
          : true,
      )
      .filter((t) => (status === "All" ? true : t.status === status))
      .sort((a, b) =>
        sort === "score" ? b.score - a.score : a.date.localeCompare(b.date),
      );
  }, [query, status, sort]);

  return (
    <div className="page">
      <PageHeader
        eyebrow="Trip management"
        title="My Trips"
        description="Every planned journey with its latest travel score and weather status."
        actions={
          <>
            <PreviewBadge label={PREVIEW_NOTICE} />
            <Link to="/plan-trip" className="btn-primary">
              <Plus className="size-4" aria-hidden />
              Plan New Trip
            </Link>
          </>
        }
      />

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <label htmlFor="trip-search" className="sr-only">
            Search trips
          </label>
          <input
            id="trip-search"
            className="field pl-11"
            placeholder="Search destinations"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {statuses.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatus(option)}
              aria-pressed={status === option}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                status === option
                  ? "border-primary/50 bg-primary/15"
                  : "border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="trip-sort" className="sr-only">
            Sort trips
          </label>
          <select
            id="trip-sort"
            className="field"
            value={sort}
            onChange={(e) => setSort(e.target.value as "date" | "score")}
          >
            <option value="date">Sort by date</option>
            <option value="score">Sort by travel score</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Trips are not persisted yet — this dashboard is prepared for the database integration.
      </p>

      {trips.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No trips yet"
            message="Plan a journey and its weather intelligence will appear here."
            action={
              <Link to="/plan-trip" className="btn-primary">
                Plan Your First Trip
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}
