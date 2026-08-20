/**
 * Service layer for the AI travel assistant conversation.
 *
 * Chat requests are routed to the orchestration layer (n8n -> OpenAI). No model
 * keys live in the frontend, and no responses are synthesised locally.
 */

import { ApiError } from "./travelWeatherApi";

export interface ChatMessagePayload {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  success: boolean;
  reply: string;
}

export function getChatEndpoint(): string | undefined {
  const env = import.meta.env as Record<string, string | undefined>;
  return env["VITE_N8N_AI_CHAT_URL"] || undefined;
}

export function isChatConfigured(): boolean {
  return Boolean(getChatEndpoint());
}

export async function sendChatMessage(
  messages: ChatMessagePayload[],
  options: { timeoutMs?: number } = {},
): Promise<ChatResponse> {
  const url = getChatEndpoint();
  if (!url) {
    throw new ApiError(
      "The AI assistant isn't connected yet. Once the orchestration endpoint is configured, replies appear here.",
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 30_000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError("The assistant is unavailable right now.", response.status);
    }

    const text = await response.text();
    if (!text.trim()) throw new ApiError("The assistant returned an empty response.");

    return JSON.parse(text) as ChatResponse;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("The assistant took too long to respond.");
    }
    throw new ApiError("Network error — the assistant couldn't be reached.");
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Voice (Vapi) integration point. Intentionally not implemented in the
 * frontend — the session must be started with a server-issued token.
 */
export function isVoiceConfigured(): boolean {
  const env = import.meta.env as Record<string, string | undefined>;
  return Boolean(env["VITE_VAPI_PUBLIC_KEY"] && env["VITE_VAPI_ASSISTANT_ID"]);
}
