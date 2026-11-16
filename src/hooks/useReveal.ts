import { useEffect } from 'react';

/**
 * Adds the `js` flag, then reveals `[data-reveal]` elements as they enter the
 * viewport. Falls back to fully visible content when motion is reduced.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}
