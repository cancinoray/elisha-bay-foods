import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Mail, Menu, X } from 'lucide-react';
import { site } from '../data/site';
import { useScrolled } from '../hooks/useScrolled';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { Logo } from './Logo';

const sectionIds = ['home', 'products', 'about', 'quality', 'contact'];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(12);
  const active = useScrollSpy(sectionIds);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const solid = scrolled || open;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusables = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        triggerRef.current?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    const firstLink = panelRef.current?.querySelector<HTMLElement>('a[href]');
    window.setTimeout(() => firstLink?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMenu = () => setOpen(false);

  const dismissMenu = () => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid
          ? 'border-b border-burgundy/10 bg-cream/95 shadow-[0_10px_30px_-24px_rgba(92,9,20,0.5)] backdrop-blur-xl'
          : 'bg-gradient-to-b from-cream/90 via-cream/60 to-transparent'
      }`}
    >
      <div className="eb-shell flex h-[80px] items-center justify-between gap-4 lg:h-[92px]">
        <a href="#home" className="rounded-lg" onClick={closeMenu}>
          <Logo markClassName="h-11 w-11 lg:h-[3.25rem] lg:w-[3.25rem]" />
        </a>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          <ul className="flex items-center gap-1 xl:gap-3">
            {site.nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative inline-flex min-h-[2.75rem] items-center rounded-md px-2.5 py-2 font-display text-[0.78rem] font-medium tracking-[0.01em] transition-colors xl:px-3 xl:text-[0.85rem] ${
                      isActive ? 'text-burgundy' : 'text-bark hover:text-burgundy'
                    } after:absolute after:inset-x-2.5 after:bottom-1 after:h-[2px] after:origin-left after:rounded-full after:bg-gold after:transition-transform after:duration-300 after:content-[''] xl:after:inset-x-3 ${
                      isActive ? 'after:scale-x-100' : 'after:scale-x-0'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="eb-btn eb-btn--primary hidden min-h-[2.9rem] px-5 text-[0.85rem] md:inline-flex"
            onClick={closeMenu}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Inquire Now
            <ArrowRight className="eb-arrow h-4 w-4" aria-hidden="true" />
          </a>

          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-burgundy/20 bg-cream-soft/80 text-burgundy transition-colors hover:border-burgundy/40 hover:bg-cream lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={dismissMenu}
            className="absolute inset-x-0 top-full z-40 h-[calc(100svh-80px)] cursor-default bg-burgundy-deep/35 backdrop-blur-[2px] lg:hidden"
          />
          <div
            id={menuId}
            ref={panelRef}
            className="relative z-50 border-t border-gold/30 bg-cream shadow-[0_28px_45px_-24px_rgba(92,9,20,0.45)] lg:hidden"
          >
            <nav aria-label="Mobile" className="eb-shell py-4">
              <ul className="flex flex-col">
                {site.nav.map((item, index) => {
                  const isActive = active === item.href.slice(1);
                  return (
                    <li key={item.href} className="border-b border-burgundy/10 last:border-b-0">
                      <a
                        href={item.href}
                        aria-current={isActive ? 'location' : undefined}
                        onClick={closeMenu}
                        className={`flex min-h-[3.25rem] items-center justify-between gap-2 font-display text-[0.98rem] font-medium ${
                          isActive ? 'text-burgundy' : 'text-bark'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-script text-[0.9rem] text-gold-deep/80">
                            0{index + 1}
                          </span>
                          {item.label}
                        </span>
                        {isActive && <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                href="#contact"
                onClick={closeMenu}
                className="eb-btn eb-btn--primary mt-4 w-full"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Inquire Now
                <ArrowRight className="eb-arrow h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-4 text-center text-xs text-bark-soft">
                Or message us on{' '}
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-burgundy underline decoration-gold decoration-2 underline-offset-4"
                >
                  Facebook
                </a>
              </p>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
