import { useEffect, useRef, useState } from 'react';
import { Check, Copy, ExternalLink, Facebook, Send } from 'lucide-react';
import { buildMessengerUrl, site } from '../data/site';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  inquiryType: '',
  message: '',
  website: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s().-]{6,19}$/;

type InquiryFormProps = {
  topic: { name: string; nonce: number } | null;
};

export function InquiryForm({ topic }: InquiryFormProps) {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [messengerUrl, setMessengerUrl] = useState('');
  const [opened, setOpened] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!topic) return;

    setValues((current) => ({
      ...current,
      inquiryType: 'Product inquiry',
      message: `I'd like to know more about ${topic.name}. Please share availability, packaging options, and ordering details.`,
    }));
    setErrors((current) => ({ ...current, inquiryType: undefined, message: undefined }));
    setOpened(false);
    setBlocked(false);
    setCopied(false);
  }, [topic]);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (opened) {
      setOpened(false);
      setBlocked(false);
      setMessengerUrl('');
      setCopied(false);
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (values.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
      next.phone = 'Please enter a valid phone number, or leave this blank.';
    }
    if (!values.inquiryType) next.inquiryType = 'Please choose an inquiry type.';
    if (values.message.trim().length < 10) {
      next.message = 'Please share at least a short message (10 characters or more).';
    }
    if (values.message.length > 800) {
      next.message = 'Please keep your message to 800 characters or fewer.';
    }
    if (values.website) next.website = 'Spam protection triggered.';
    return next;
  };

  const composeMessage = () => {
    const lines = [
      'Hi Elisha Bay! I would like to send an inquiry through your website.',
      '',
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
    ];

    if (values.phone.trim()) lines.push(`Phone: ${values.phone.trim()}`);
    lines.push(`Inquiry type: ${values.inquiryType}`, '', values.message.trim(), '', 'Sent from the Elisha Bay website.');

    return lines.join('\n');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    const errorKeys = Object.keys(nextErrors) as (keyof FormValues)[];

    if (errorKeys.length > 0) {
      setErrors(nextErrors);
      setOpened(false);
      setLiveMessage('Please fix the highlighted fields and try again.');
      const first = errorKeys[0];
      window.setTimeout(() => {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${first}"]`)
          ?.focus({ preventScroll: false });
      }, 30);
      return;
    }

    const composed = composeMessage();
    const url = buildMessengerUrl(composed);
    const popup = window.open(url, '_blank');
    if (popup) popup.opener = null;

    setMessengerUrl(url);
    setBlocked(!popup);
    setOpened(true);
    setCopied(false);
    setLiveMessage(
      popup
        ? 'Your inquiry is ready in Messenger. Review it and press send.'
        : 'Your browser blocked the new tab. Open Messenger below to continue.',
    );
  };

  const copyMessage = async () => {
    const text = composeMessage();
    let success = false;

    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        success = document.execCommand('copy');
      } catch {
        success = false;
      }
      document.body.removeChild(area);
    }

    if (success) {
      setCopied(true);
      setLiveMessage('Inquiry copied to your clipboard.');
      window.setTimeout(() => setCopied(false), 2400);
    } else {
      setLiveMessage('Copying was blocked. Please select and copy the message manually.');
      messageRef.current?.focus();
      messageRef.current?.select();
    }
  };

  const descriptionId = (field: string) => `${field}-error`;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
          <Send className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-[1.28rem] font-semibold leading-tight text-burgundy">
            Send an inquiry
          </h3>
          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-bark-soft">
            Tell us what you need. We&apos;ll open Messenger with your message ready to send.
          </p>
        </div>
      </div>

      {topic && (
        <p className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-3 py-2 text-[0.72rem] text-bark">
          <span className="font-display font-semibold text-burgundy">Asking about:</span>
          <span>{topic.name}</span>
        </p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiry-name" className="eb-label">
            Full name <span className="text-crimson">*</span>
          </label>
          <input
            id="inquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? descriptionId('name') : undefined}
            className="eb-field"
            placeholder="Your name"
          />
          {errors.name && (
            <p id={descriptionId('name')} className="eb-field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="inquiry-email" className="eb-label">
            Email address <span className="text-crimson">*</span>
          </label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? descriptionId('email') : undefined}
            className="eb-field"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id={descriptionId('email')} className="eb-field-error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="inquiry-phone" className="eb-label">
            Phone number <span className="font-normal text-bark-soft">(optional)</span>
          </label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? descriptionId('phone') : undefined}
            className="eb-field"
            placeholder="+63"
          />
          {errors.phone && (
            <p id={descriptionId('phone')} className="eb-field-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="inquiry-type" className="eb-label">
            Inquiry type <span className="text-crimson">*</span>
          </label>
          <div className="relative">
            <select
              id="inquiry-type"
              name="inquiryType"
              value={values.inquiryType}
              onChange={(event) => update('inquiryType', event.target.value)}
              aria-required="true"
              aria-invalid={Boolean(errors.inquiryType)}
              aria-describedby={errors.inquiryType ? descriptionId('inquiryType') : undefined}
              className="eb-field appearance-none pr-10"
            >
              <option value="">Select one</option>
              {site.inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-burgundy"
              fill="none"
            >
              <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {errors.inquiryType && (
            <p id={descriptionId('inquiryType')} className="eb-field-error">
              {errors.inquiryType}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="inquiry-message" className="eb-label">
            Your message <span className="text-crimson">*</span>
          </label>
          <span className="text-[0.66rem] tabular-nums text-bark-soft">
            {values.message.length}/800
          </span>
        </div>
        <textarea
          ref={messageRef}
          id="inquiry-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => update('message', event.target.value.slice(0, 800))}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? descriptionId('message') : 'message-hint'}
          className="eb-field resize-y"
          placeholder="What would you like to know?"
        />
        {errors.message ? (
          <p id={descriptionId('message')} className="eb-field-error">
            {errors.message}
          </p>
        ) : (
          <p id="message-hint" className="mt-1.5 text-[0.68rem] leading-relaxed text-bark-soft">
            Please don&apos;t include sensitive personal or payment information.
          </p>
        )}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="inquiry-website">Leave this field empty</label>
        <input
          id="inquiry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <button type="submit" className="eb-btn eb-btn--primary mt-5 w-full">
        <Facebook className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
        Continue to Messenger
        <Send className="eb-arrow h-4 w-4" aria-hidden="true" />
      </button>

      <p className="mt-2.5 text-center text-[0.68rem] leading-relaxed text-bark-soft">
        Opens Messenger with your message ready to send. You can review it before sending.
      </p>

      <p className="sr-only" role="status" aria-live="polite">
        {liveMessage}
      </p>

      {opened && (
        <div
          className="mt-4 rounded-xl border border-gold/45 bg-gold/[0.12] p-4"
          role="region"
          aria-label="Inquiry status"
        >
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-burgundy text-cream">
              <Check className="h-3 w-3" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-[0.82rem] font-semibold text-burgundy">
                {blocked ? 'Messenger is ready in a new tab.' : 'Your message is ready in Messenger.'}
              </p>
              <p className="mt-1 text-[0.72rem] leading-relaxed text-bark">
                {blocked
                  ? 'Your browser blocked the tab. Use the button below to open Messenger, review your message, and press send.'
                  : 'Review your message in Messenger and press send to reach the Elisha Bay team.'}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={messengerUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full bg-burgundy px-3.5 py-2 text-[0.72rem] font-semibold text-cream transition-colors hover:bg-crimson"
                >
                  Open Messenger
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={copyMessage}
                  className="inline-flex items-center gap-1.5 rounded-full border border-burgundy/30 px-3.5 py-2 text-[0.72rem] font-semibold text-burgundy transition-colors hover:bg-burgundy/5"
                >
                  {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy message'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
