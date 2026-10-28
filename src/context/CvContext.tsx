"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const CvContext = createContext<{ open: boolean; setOpen: (value: boolean) => void } | null>(null);

export function CvProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <CvContext.Provider value={{ open, setOpen }}>{children}</CvContext.Provider>;
}

export function useCvModal() {
  const ctx = useContext(CvContext);
  if (!ctx) throw new Error("useCvModal must be used within CvProvider");
  return ctx;
}
