import * as React from "react";

const SCROLL_THRESHOLD = 10;

// How long a programmatic anchor scroll (smooth-scroll to #section) suppresses
// the auto-hide, so clicking a nav link doesn't make the header vanish mid-flight.
const ANCHOR_SCROLL_SUPPRESS_MS = 1200;

export type ScrollDirection = "up" | "down";

/**
 * Detects the current scroll direction.
 * - Returns "up" when at the top of the page (scrollY < threshold).
 * - Only flips direction after scrolling past the threshold to avoid jitter.
 * - Suppresses "down" while a same-page anchor navigation is in progress:
 *   the smooth scroll toward the target would otherwise look like a user
 *   scroll-down and hide the header the user just used to navigate.
 */
export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = React.useState<ScrollDirection>("up");

  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let suppressUntil = 0;

    const updateDirection = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      // Keep the header visible while a same-page anchor navigation runs.
      if (Date.now() < suppressUntil) {
        setDirection("up");
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      // Always visible at the very top of the page.
      if (currentScrollY < SCROLL_THRESHOLD) {
        setDirection("up");
      } else if (Math.abs(delta) > SCROLL_THRESHOLD) {
        setDirection(delta > 0 ? "down" : "up");
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateDirection);
      }
    };

    // Any click on a same-page anchor starts a programmatic smooth scroll.
    // Flag it so the scroll events it produces don't trigger auto-hide.
    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.('a[href^="#"]');
      if (!anchor) return;
      suppressUntil = Date.now() + ANCHOR_SCROLL_SUPPRESS_MS;
      setDirection("up");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onAnchorClick, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  return direction;
}