"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function TopLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Hide loader when route changes (navigation complete)
  useEffect(() => {
    setLoading(false);
    setProgress(100);
    const t = setTimeout(() => setProgress(0), 300);
    return () => clearTimeout(t);
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
      // Only internal links
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      } catch {
        return;
      }
      setLoading(true);
      setProgress(20);
      // Animate progress
      let p = 20;
      const interval = setInterval(() => {
        p = Math.min(90, p + Math.random() * 10);
        setProgress(p);
      }, 200);
      // Store interval to clear on completion
      (window as any).__topLoaderInterval = interval;
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Clear interval when loading stops
  useEffect(() => {
    if (!loading) {
      const interval = (window as any).__topLoaderInterval;
      if (interval) {
        clearInterval(interval);
        (window as any).__topLoaderInterval = null;
      }
    }
  }, [loading]);

  if (!loading && progress === 0) return null;

  return (
    <div className="top-loader" aria-hidden="true">
      <div className="top-loader-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}