import { useEffect, useState } from 'react';

/**
 * Tracks which page section is currently in view for navigation highlighting.
 * Keeps the first matching section so the nav never loses its active state
 * between two adjacent sections.
 */
export function useScrollSpy(ids: string[], offset = 140) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = window.scrollY + offset;
      let current = ids[0] ?? '';

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.offsetTop <= marker) current = id;
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
