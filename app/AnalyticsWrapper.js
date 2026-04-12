"use client";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

export default function AnalyticsWrapper() {
  const [excluded, setExcluded] = useState(false);

  useEffect(() => {
    // Check URL for ?notrack or ?track
    const params = new URLSearchParams(window.location.search);
    if (params.has("notrack")) {
      document.cookie = "tt_notrack=1; path=/; max-age=31536000"; // 1 year
      setExcluded(true);
      // Clean the URL
      const url = new URL(window.location.href);
      url.searchParams.delete("notrack");
      window.history.replaceState({}, "", url.pathname + url.search);
    } else if (params.has("track")) {
      document.cookie = "tt_notrack=; path=/; max-age=0";
      setExcluded(false);
      // Clean the URL
      const url = new URL(window.location.href);
      url.searchParams.delete("track");
      window.history.replaceState({}, "", url.pathname + url.search);
    } else {
      // Check existing cookie
      setExcluded(document.cookie.includes("tt_notrack=1"));
    }
  }, []);

  if (excluded) return null;

  return <Analytics />;
}
