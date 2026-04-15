"use client";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

export default function AnalyticsWrapper() {
  const [excluded, setExcluded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("notrack")) {
      document.cookie = "tt_notrack=1; path=/; max-age=31536000";
      setExcluded(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("notrack");
      window.history.replaceState({}, "", url.pathname + url.search);
    } else if (params.has("track")) {
      document.cookie = "tt_notrack=; path=/; max-age=0";
      setExcluded(false);
      const url = new URL(window.location.href);
      url.searchParams.delete("track");
      window.history.replaceState({}, "", url.pathname + url.search);
    } else {
      setExcluded(document.cookie.includes("tt_notrack=1"));
    }
  }, []);

  if (excluded) return null;

  // scriptSrc proxies through your own domain — see next.config.mjs rewrites
  return <Analytics scriptSrc="/t/script.js" />;
}
