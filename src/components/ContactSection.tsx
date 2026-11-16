import { Facebook, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { site } from '../data/site';
import { WaveScratch } from './Waves';
import { InquiryForm } from './InquiryForm';

type ContactSectionProps = {
  topic: { name: string; nonce: number } | null;
};

export function ContactSection({ topic }: ContactSectionProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="on-dark relative isolate overflow-hidden bg-burgundy pb-16 pt-[8.5rem] text-cream sm:pb-20 sm:pt-[10rem] lg:pb-24 lg:pt-[11rem]"
    >
      {/* cream curved top edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 leading-none">
        <svg
          viewBox="0 0 1440 92"
          preserveAspectRatio="none"
          className="h-[38px] w-full sm:h-[58px] lg:h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h1440v24c-222 62-382-10-682 34C458 102 246 18 0 62Z" fill="#FFF5E9" />
          <path
            d="M0 62C246 18 458 102 758 58 1058 14 1218 86 1440 24"
            stroke="#F2BD36"
            strokeWidth="2"
            strokeOpacity=".8"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_20%,rgba(242,189,54,0.15),transparent_42%),radial-gradient(ellipse_at_90%_90%,rgba(0,0,0,0.22),transparent_48%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 0, transparent 15px, #FFF5E9 16px, #FFF5E9 16.8px, transparent 17.6px)',
          backgroundSize: '44px 28px',
        }}
      />
      <div className="eb-shell relative z-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
          <div data-reveal>
            <p className="eb-eyebrow eb-eyebrow--left !text-gold">Let&apos;s Connect</p>
            <h2
              id="contact-heading"
              className="mt-4 max-w-[31rem] font-script text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[1.04] text-cream"
            >
              Let&apos;s Enjoy the Goodness of Elisha Bay!
            </h2>
            <WaveScratch className="mt-2 h-5 w-32 text-gold" />
            <p className="mt-5 max-w-[27rem] text-[0.98rem] leading-relaxed text-cream/80">
              Partner with us or place an inquiry today. Whether you are shopping for your family,
              stocking a shelf, or exploring distribution, we would love to hear from you.
            </p>

            <div className="mt-8 rounded-2xl border border-cream/15 bg-burgundy-deep/25 p-2 backdrop-blur-sm">
              <ul className="divide-y divide-cream/12">
                <li>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-cream/[0.06]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream/[0.06] text-gold">
                      <Facebook className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold/90">
                        Official Facebook page
                      </span>
                      <span className="mt-0.5 block truncate text-[0.9rem] text-cream">
                        {site.social.handle}
                      </span>
                    </span>
                    <span className="ml-auto text-[0.65rem] text-cream/70" aria-hidden="true">
                      Visit
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.messenger}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-cream/[0.06]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream/[0.06] text-gold">
                      <MessageCircle className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold/90">
                        Messenger
                      </span>
                      <span className="mt-0.5 block text-[0.9rem] text-cream">
                        Message us directly
                      </span>
                    </span>
                    <span className="ml-auto text-[0.65rem] text-cream/70" aria-hidden="true">
                      Open
                    </span>
                  </a>
                </li>
                {site.contact.phone && (
                  <li>
                    <a
                      href={`tel:${site.contact.phone.replace(/[^\d+]/g, '')}`}
                      className="flex items-center gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-cream/[0.06]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream/[0.06] text-gold">
                        <Phone className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold/90">
                          Call us
                        </span>
                        <span className="mt-0.5 block truncate text-[0.9rem] text-cream">{site.contact.phone}</span>
                      </span>
                    </a>
                  </li>
                )}
                {site.contact.email && (
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="flex items-center gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-cream/[0.06]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream/[0.06] text-gold">
                        <Mail className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold/90">
                          Email us
                        </span>
                        <span className="mt-0.5 block truncate text-[0.9rem] text-cream">{site.contact.email}</span>
                      </span>
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-4 px-4 py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream/[0.06] text-gold">
                    <MapPin className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold/90">
                      Located in
                    </span>
                    <span className="mt-0.5 block text-[0.9rem] text-cream">{site.location.label}</span>
                  </span>
                </li>
              </ul>
            </div>

            {!site.contact.phone && !site.contact.email && (
              <p className="mt-4 max-w-[27rem] text-[0.7rem] leading-relaxed text-cream/70">
                Phone and email contact details will be added once confirmed by Elisha Bay.
              </p>
            )}
          </div>

          <div
            className="rounded-[1.9rem] border border-gold/30 bg-cream p-5 text-bark shadow-[0_40px_90px_-40px_rgba(0,0,0,0.65)] sm:p-7 lg:p-8"
            data-reveal
            style={{ transitionDelay: '80ms' }}
          >
            <InquiryForm topic={topic} />
          </div>
        </div>
      </div>
    </section>
  );
}
