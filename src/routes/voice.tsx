import { createFileRoute } from "@tanstack/react-router";
import { Mic, ShieldCheck } from "lucide-react";

import { EmptyState, PageHeader, PreviewBadge } from "@/components/kit/Primitives";
import { PREVIEW_NOTICE } from "@/lib/preview-data";

export const Route = createFileRoute("/voice")({
  head: () => ({ meta: [{ title: "Voice AI — AI Travel Weather Agent" }] }),
  component: Voice,
});

function Voice() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Hands-free travel intelligence"
        title="Voice AI"
        description="Start a voice session to ask about destinations, weather windows and travel conditions."
        actions={<PreviewBadge label={PREVIEW_NOTICE} />}
      />
      <div className="mt-10">
        <EmptyState
          icon={Mic}
          title="Voice service isn't connected yet"
          message="Voice sessions require a server-issued token and the configured voice service. No session is started until that integration is enabled."
          action={
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              Your browser microphone is not requested
            </span>
          }
        />
      </div>
    </div>
  );
}
