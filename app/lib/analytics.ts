export function trackEvent(name: string, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & {
    gtag?: (command: "event", eventName: string, eventParameters?: Record<string, unknown>) => void;
  };
  analyticsWindow.gtag?.("event", name, parameters);
}
