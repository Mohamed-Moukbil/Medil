"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type TopLoaderWindow = Window & { __topLoaderInterval?: ReturnType<typeof setInterval> | null };

export function TopLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Hide loader when route changes (navigation complete)
  useEffect(() => {
    const t1 = setTimeout(() => {
      setLoading(false);
      setProgress(100);
    }, 0);
    const t2 = setTimeout(() => setProgress(0), 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  // Show loader on link clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.target === "_blank") return;
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      } catch {
        return;
      }
      setLoading(true);
      setProgress(20);
      const interval = setInterval(() => {
        setProgress((p) => Math.min(90, p + Math.random() * 10));
      }, 200);
      (window as TopLoaderWindow).__topLoaderInterval = interval;
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Clear interval when loading stops
  useEffect(() => {
    if (loading) return;
    const w = window as TopLoaderWindow;
    if (w.__topLoaderInterval) {
      clearInterval(w.__topLoaderInterval);
      w.__topLoaderInterval = null;
    }
  }, [loading]);

  if (!loading && progress === 0) return null;

  return (
    <div className="top-loader" aria-hidden="true">
      <div className="top-loader-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}