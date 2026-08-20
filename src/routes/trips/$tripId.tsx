import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";

import { EmptyState, PageHeader, Pill, PreviewBadge } from "@/components/kit/Primitives";
import { PREVIEW_NOTICE, previewTrips } from "@/lib/preview-data";

export const Route = createFileRoute("/trips/$tripId")({
  head: () => ({ meta: [{ title: "Trip Details — AI Travel Weather Agent" }] }),
  component: TripDetails,
});

function TripDetails() {
  const { tripId } = Route.useParams();
  const trip = previewTrips.find((item) => item.id === tripId);

  if (!trip) {
    return (
      <div className="page">
        <EmptyState
          title="Trip not found"
          message="This trip is not available in the current preview workspace."
          action={<Link to="/trips" className="btn-primary">Back to My Trips</Link>}
        />
      </div>
    );
  }

  return (
    <div className="page">
      <PageHeader
        eyebrow="Trip details"
        title={trip.destination}
        description={trip.summary}
        actions={
          <>
            <PreviewBadge label={PREVIEW_NOTICE} />
            <Link to="/trips" className="btn-ghost"><ArrowLeft className="size-4" aria-hidden /> Back to trips</Link>
          </>
        }
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Detail label="Country" value={trip.country} icon={MapPin} />
        <Detail label="Date" value={trip.date} icon={CalendarDays} />
        <Detail label="Time" value={trip.time} icon={Clock} />
        <div className="panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Travel score</p>
          <p className="mt-2 font-display text-3xl font-semibold">{trip.score}</p>
          <Pill tone={trip.status === "High Risk" ? "danger" : trip.status === "Moderate Risk" ? "warning" : "success"} className="mt-2">{trip.status}</Pill>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, icon: Icon }: { label: string; value: string; icon: typeof MapPin }) {
  return (
    <div className="panel rounded-2xl p-5">
      <Icon className="size-4 text-primary" aria-hidden />
      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-medium">{value}</p>
    </div>
  );
}
