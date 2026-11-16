import { useEffect, useState } from 'react';

/**
 * Tracks which page section is currently in view for navigation highlighting.
 *
 * The active section is the one whose top is closest above the scroll marker,
 * which means the result follows the *document* order, not the order of `ids`.
 * That matters here: the nav lists About Us before Quality & Certifications,
 * but the About section is rendered after Quality, so "last matching id wins"
 * highlighted the wrong link.
 */
export function useScrollSpy(ids: string[], offset = 140) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = window.scrollY + offset;
      let current = ids[0] ?? '';
      let currentTop = Number.NEGATIVE_INFINITY;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;

        const top = element.getBoundingClientRect().top + window.scrollY;
        // `>` keeps document order for sections that share a top; sections below
        // the marker never become the nearest one above it.
        if (top <= marker && top > currentTop) {
          current = id;
          currentTop = top;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
      if (nearBottom) current = ids[ids.length - 1] ?? current;

      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return active;
}
