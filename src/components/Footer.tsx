import { ArrowUp, Facebook, Heart, Instagram, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { site } from '../data/site';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative isolate overflow-hidden bg-burgundy-deep text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-10 opacity-70">
        <svg
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20C230 2 430 36 720 20 1010 4 1230 34 1440 16"
            stroke="#F2BD36"
            strokeWidth="1.2"
            strokeOpacity=".38"
            fill="none"
          />
        </svg>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-burgundy/60 blur-3xl"
      />

      <div className="eb-shell relative z-10 pb-8 pt-14 sm:pt-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <a
            href="#home"
            className="w-fit rounded-2xl bg-cream p-2 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.7)]"
          >
            <Logo className="h-[4.5rem] sm:h-20" />
          </a>

          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.82rem]">
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="h-[1.15rem] w-[1.15rem] shrink-0 text-gold" aria-hidden="true" />
              <span className="font-display font-medium text-cream/90">Quality You Can Trust</span>
            </li>
            <li aria-hidden="true" className="hidden h-7 w-px bg-cream/15 sm:block" />
            <li className="flex items-center gap-2.5">
              <Heart className="h-[1.1rem] w-[1.1rem] shrink-0 text-gold" aria-hidden="true" />
              <span className="font-display font-medium text-cream/90">A Taste of the Philippines</span>
            </li>
          </ul>

          <div className="flex items-center gap-2.5">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Elisha Bay on Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:bg-gold hover:text-burgundy-deep"
            >
              <Facebook className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Elisha Bay on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:bg-gold hover:text-burgundy-deep"
            >
              <Instagram className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="my-8 h-px bg-cream/12 sm:my-9" />

        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-8 items-center text-[0.78rem] text-cream/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[31rem] text-[0.76rem] leading-relaxed text-cream/75">
              Premium Dagupan bangus and seafood products. Made with quality, care, and Filipino
              pride.
            </p>
          </nav>

          <div className="flex flex-col gap-2 text-[0.76rem] text-cream/80">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold/80" aria-hidden="true" />
              {site.location.label}, {site.location.country}
            </span>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex w-fit items-center gap-2 text-cream/80 transition-colors hover:text-gold"
            >
              <Mail className="h-3.5 w-3.5 text-gold/80" aria-hidden="true" />
              {site.contact.email}
            </a>
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="sr-only">Phone</span>
              {site.contact.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={`tel:${phone.href}`}
                  className="inline-flex w-fit items-center text-cream/80 underline decoration-gold/40 decoration-1 underline-offset-4 transition-colors hover:text-gold"
                >
                  {phone.label}
                </a>
              ))}
            </span>
            <a
              href="#contact"
              className="inline-flex w-fit items-center gap-1.5 text-cream/80 underline decoration-gold/50 decoration-1 underline-offset-4 transition-colors hover:text-gold"
            >
              Product &amp; business inquiries
            </a>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-cream/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.68rem] leading-relaxed text-cream/75">
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-script text-[1.15rem] leading-none text-gold/90">{site.tagline}</p>
          <a
            href="#home"
            className="group inline-flex w-fit items-center gap-2 text-[0.7rem] font-medium text-cream/80 transition-colors hover:text-gold"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cream/20 transition-colors group-hover:border-gold/60">
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
