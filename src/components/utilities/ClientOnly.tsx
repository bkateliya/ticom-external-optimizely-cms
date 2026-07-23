"use client";

import { useSyncExternalStore } from "react";

// A store that never changes — we only care about the server vs client snapshot.
const subscribe = () => () => {};

/**
 * Renders children only after the component has hydrated on the client.
 *
 * Use to wrap subtrees that can't hydrate cleanly — e.g. TI web components
 * (TifButton/TifButtonGroup) that mutate their own DOM on upgrade (adding
 * data-first/data-last to grouped children), which the server HTML can't
 * contain and React reports as a hydration mismatch.
 *
 * Implemented with useSyncExternalStore rather than useState + useEffect so it
 * doesn't set state inside an effect (which triggers cascading renders): the
 * server snapshot is false, the client snapshot is true, and React swaps them
 * during hydration without a mismatch.
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true, // client snapshot
    () => false, // server snapshot
  );

  return hydrated ? <>{children}</> : null;
}
