import { createFileRoute } from "@tanstack/react-router";
import { PhoneCall } from "lucide-react";

import { EmptyState, PageHeader, PreviewBadge } from "@/components/kit/Primitives";
import { PREVIEW_NOTICE } from "@/lib/preview-data";

export const Route = createFileRoute("/calls")({
  head: () => ({ meta: [{ title: "AI Calls — AI Travel Weather Agent" }] }),
  component: Calls,
});

function Calls() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Conversation history"
        title="AI Calls"
        description="Review voice conversations and travel recommendations from your connected assistant."
        actions={<PreviewBadge label={PREVIEW_NOTICE} />}
      />
      <div className="mt-10">
        <EmptyState
          icon={PhoneCall}
          title="No AI calls available"
          message="Call history will appear here after the voice service and backend are connected."
        />
      </div>
    </div>
  );
}
