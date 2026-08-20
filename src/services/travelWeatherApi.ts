/**
 * Service layer for the travel-weather orchestration backend (n8n workflow).
 *
 * The frontend never talks to WeatherAPI / OpenAI / Vapi directly and never
 * holds provider keys. It only knows one public endpoint, configured via:
 *
 *   VITE_N8N_WEATHER_WEBHOOK_URL   (this stack's public env prefix)
 *   NEXT_PUBLIC_N8N_WEATHER_WEBHOOK_URL is the equivalent name in a Next.js app.
 */

export type TripPreference =
  | "avoid-rain"
  | "avoid-extreme-heat"
  | "avoid-strong-winds"
  | "prefer-cooler-weather"
  | "prefer-clear-skies";

export interface TripAnalysisRequest {
  location: string;
  tripId: string;
  context: {
    travelDate: string;
    travelTime: string;
    tripType: string;
    preferences: TripPreference[];
  };
}

export interface TripAnalysisResponse {
  success: boolean;
  tripId: string;
  location: string;
  weather: Record<string, unknown>;
  analysis: Record<string, unknown>;
}

export class ApiError extends Error {
  status?: number | undefined;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const DEFAULT_TIMEOUT_MS = 30_000;

export function getWebhookUrl(): string | undefined {
  const env = import.meta.env as Record<string, string | undefined>;
  return env["VITE_N8N_WEATHER_WEBHOOK_URL"] || undefined;
}

export function isBackendConfigured(): boolean {
  return Boolean(getWebhookUrl());
}

export function createTripId(): string {
  return `trip_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function friendlyStatusMessage(status: number): string {
  if (status === 400) return "The trip details couldn't be processed. Please review and try again.";
  if (status === 401 || status === 403) return "The travel intelligence service rejected this request.";
  if (status === 404) return "The travel intelligence endpoint could not be found.";
  if (status === 429) return "Too many analyses at once. Please wait a moment and retry.";
  if (status === 502 || status === 503 || status === 504)
    return "The analysis service is temporarily unreachable. Please try again shortly.";
  return "Something went wrong while analyzing your trip.";
}

/** POST a trip to the orchestration webhook and return the analysis payload. */
export async function analyzeTrip(
  payload: TripAnalysisRequest,
  options: { signal?: AbortSignal; timeoutMs?: number } = {},
): Promise<TripAnalysisResponse> {
  const url = getWebhookUrl();
  if (!url) {
    throw new ApiError(
      "Travel intelligence backend is not connected yet. Add VITE_N8N_WEATHER_WEBHOOK_URL to enable live analysis.",
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  options.signal?.addEventListener("abort", () => controller.abort());

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(friendlyStatusMessage(response.status), response.status);
    }

    const text = await response.text();
    if (!text.trim()) {
      throw new ApiError("The analysis service returned an empty response.");
    }

    let data: TripAnalysisResponse;
    try {
      data = JSON.parse(text) as TripAnalysisResponse;
    } catch {
      throw new ApiError("The analysis service returned an unreadable response.");
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("The analysis timed out. Please try again.");
    }
    throw new ApiError("Network error — check your connection and try again.");
  } finally {
    clearTimeout(timeout);
  }
}
