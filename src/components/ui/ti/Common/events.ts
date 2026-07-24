import { useEffect, useRef } from "react";

export type CustomEventHandler<T = never> = (event: CustomEventInit<T>) => void;

export function useEventListenerRef(
  /** Config object with { "eventName": eventHandler } to allow an arbitrary number of events */
  config: Record<string, CustomEventHandler | undefined>,
  originalRef?: React.RefObject<HTMLElement | null>,
) {
  const newRef = useRef<HTMLElement>(null);

  const ref = originalRef ?? newRef;

  useEffect(() => {
    const paginationElement = ref.current;

    if (!paginationElement) {
      return;
    }

    Object.keys(config).forEach((eventName) => {
      const eventHandler = config[eventName];
      if (eventHandler) {
        paginationElement?.addEventListener(eventName, eventHandler);
      }
    });

    return () => {
      Object.keys(config).forEach((eventName) => {
        const eventHandler = config[eventName];
        if (eventHandler) {
          paginationElement?.removeEventListener(eventName, eventHandler);
        }
      });
    };
  }, [config, ref]);

  return ref;
}
