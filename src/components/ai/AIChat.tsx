import { AnimatePresence, motion } from "framer-motion";
import { Mic, RotateCcw, Send, Sparkle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAIChat } from "@/components/ai/AIChatProvider";
import { ApiError } from "@/services/travelWeatherApi";
import { isChatConfigured, sendChatMessage } from "@/services/aiChatApi";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

const suggestions = [
  "Should I travel tomorrow?",
  "What's the weather in Islamabad?",
  "Best time to travel to Murree?",
  "Will rain affect my road trip?",
];

const introMessage: Message = {
  id: "intro",
  role: "system",
  content: isChatConfigured()
    ? "Ask me about destinations, weather windows and travel conditions."
    : "I'm the travel assistant interface. The AI orchestration endpoint isn't connected yet, so I won't invent forecasts — once it's wired up, live answers appear here.",
};

export function AIChatButton() {
  const { open, toggle } = useAIChat();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-brand glow transition-transform hover:scale-105 active:scale-95"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={open ? "close" : "open"}
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 30 }}
          transition={{ duration: 0.15 }}
        >
          {open ? (
            <X className="size-5 text-primary-foreground" aria-hidden />
          ) : (
            <Sparkle className="size-5 text-primary-foreground" aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function ChatMessage({ message }: { message: Message }) {
  if (message.role === "system") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-surface-2/50 px-4 py-3 text-xs leading-relaxed text-muted-foreground"
      >
        {message.content}
      </motion.p>
    );
  }
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser ? (
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand">
          <Sparkle className="size-3.5 text-primary-foreground" aria-hidden />
        </span>
      ) : null}
      <div
        className={cn(
          "max-w-[80%] text-sm leading-relaxed",
          isUser
            ? "rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-foreground"
            : "text-foreground",
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 text-muted-foreground">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
      <span className="ml-2 text-xs">Thinking…</span>
    </div>
  );
}

export function AIChatPanel() {
  const { open, setOpen } = useAIChat();
  const [messages, setMessages] = useState<Message[]>([introMessage]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function submit(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: value };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setBusy(true);
    try {
      const history = [...messages, userMessage]
        .filter((m): m is Message & { role: "user" | "assistant" } => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.content }));
      const result = await sendChatMessage(history);
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", content: result.reply },
      ]);
    } catch (error) {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "system",
          content:
            error instanceof ApiError ? error.message : "The assistant couldn't be reached.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          role="dialog"
          aria-label="AI travel assistant"
          className="glass fixed inset-0 z-50 flex flex-col sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[min(620px,80vh)] sm:w-[400px] sm:rounded-3xl"
        >
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand glow">
                <Sparkle className="size-4 text-primary-foreground" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium">Travel Assistant</p>
                <p className="text-[11px] text-muted-foreground">
                  {isChatConfigured() ? "Connected" : "Awaiting backend connection"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages([introMessage])}
                aria-label="Clear conversation"
                className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-secondary"
              >
                <RotateCcw className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-secondary"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
            {busy ? <TypingIndicator /> : null}
          </div>

          <div className="border-t border-border px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  disabled={busy}
                  className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void submit(input);
              }}
              className="flex items-end gap-2 rounded-2xl border border-border bg-surface-2/60 p-2"
            >
              <label className="sr-only" htmlFor="ai-chat-input">
                Message the travel assistant
              </label>
              <textarea
                id="ai-chat-input"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void submit(input);
                  }
                }}
                placeholder="Ask about weather, routes or timing…"
                className="max-h-28 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                aria-label="Voice input (coming with voice integration)"
                title="Voice input arrives with the voice integration"
                className="flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary"
              >
                <Mic className="size-4" aria-hidden />
              </button>
              <button
                type="submit"
                disabled={!input.trim() || busy}
                aria-label="Send message"
                className="flex size-9 items-center justify-center rounded-xl bg-brand text-primary-foreground transition-opacity disabled:opacity-40"
              >
                <Send className="size-4" aria-hidden />
              </button>
            </form>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
