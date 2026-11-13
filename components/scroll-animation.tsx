"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

type ScrollAnimationContextValue = {
  scrollAnimations: boolean;
  toggle: () => void;
};

const ScrollAnimationContext = createContext<ScrollAnimationContextValue>({
  scrollAnimations: true,
  toggle: () => {},
});

const STORAGE_KEY = "scroll-animations";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

function getServerSnapshot(): boolean {
  return true;
}

export function ScrollAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollAnimations = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const toggle = useCallback(() => {
    const next = !getSnapshot();
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {}
    listeners.forEach((listener) => listener());
  }, []);

  return (
    <ScrollAnimationContext.Provider value={{ scrollAnimations, toggle }}>
      {children}
    </ScrollAnimationContext.Provider>
  );
}

export function useScrollAnimation() {
  return useContext(ScrollAnimationContext);
}
