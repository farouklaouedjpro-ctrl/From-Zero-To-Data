import * as React from "react";

const SCROLL_THRESHOLD = 10;

export type ScrollDirection = "up" | "down";

/**
 * Detects the current scroll direction.
 * - Returns "up" when at the top of the page (scrollY < threshold).
 * - Only flips direction after scrolling past the threshold to avoid jitter.
 */
export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = React.useState<ScrollDirection>("up");

  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateDirection = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

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

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
}