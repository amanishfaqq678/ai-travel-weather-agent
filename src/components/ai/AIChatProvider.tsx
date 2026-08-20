import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface AIChatContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
}

const AIChatContext = createContext<AIChatContextValue | null>(null);

export function AIChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);
  return <AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>;
}

export function useAIChat(): AIChatContextValue {
  const ctx = useContext(AIChatContext);
  if (!ctx) throw new Error("useAIChat must be used within AIChatProvider");
  return ctx;
}
