import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PRODUCT_TOPIC = 'Bangus in Soy Sauce';

/**
 * The site should be verified against the running page, not against internal
 * React state. These helpers only load the page and disable smooth scrolling so
 * assertions stay deterministic.
 */
async function openSite(page: Page) {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /Every Mouthful\s+is Delightful!/,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
}

async function stubPopup(page: Page) {
  await page.evaluate(() => {
    (window as unknown as { __openedUrl: string | null }).__openedUrl = null;
    window.open = ((url?: string | URL | null) => {
      (window as unknown as { __openedUrl: string | null }).__openedUrl = url
        ? String(url)
        : null;
      return { opener: null } as unknown as Window;
    }) as typeof window.open;
  });
}

async function openedUrl(page: Page) {
  return page.evaluate(
    () => (window as unknown as { __openedUrl: string | null }).__openedUrl,
  );
}

async function loadLazyContent(page: Page) {
  await page.evaluate(async () => {
    const height = document.documentElement.scrollHeight;
    for (let y = 0; y < height; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 25));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
}

test.describe('Elisha Bay landing page', () => {
  test('renders the brand proposition, sections and configurable product cards', async ({
    page,
  }) => {
    await openSite(page);

    await expect(page).toHaveTitle(/Elisha Bay/);
    for (const id of ['home', 'products', 'quality', 'about', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }

    await expect(
      page.getByRole('heading', { name: 'Delicious Seafood Goodness' }),
    ).toBeVisible();
    await expect(page.locator('#products ul > li')).toHaveCount(4);
    await expect(
      page.getByText(/Product names, packaging and photography are placeholders/),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Elisha Bay on Facebook' }),
    ).toHaveAttribute('href', 'https://www.facebook.com/elishabayfoods/');

    const metadata = await page.evaluate(() => ({
      description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
      structuredData: document.querySelector('script[type="application/ld+json"]')?.textContent,
      manifest: document.querySelector('link[rel="manifest"]')?.getAttribute('href'),
      images: Array.from(document.images).map((image) => ({
        alt: image.alt,
        width: image.getAttribute('width'),
        height: image.getAttribute('height'),
      })),
    }));

    expect(metadata.description).toBeTruthy();
    expect(metadata.ogImage).toContain('og-image.jpg');
    expect(metadata.structuredData).toContain('Organization');
    expect(metadata.manifest).toBe('/site.webmanifest');
    for (const image of metadata.images) {
      expect(image.alt).toBeTruthy();
      expect(image.width).toBeTruthy();
      expect(image.height).toBeTruthy();
    }
  });

  test('withholds unverified certification claims', async ({ page }) => {
    await openSite(page);
    const text = await page.locator('body').innerText();

    expect(text).not.toMatch(/FDA\s+(Certified|Registered|Approved)/i);
    expect(text).not.toMatch(/US FDA Registered Facility/i);
    await expect(page.getByText('Verification pending').first()).toBeVisible();
    await expect(page.getByText(/Certification details are being verified/)).toBeVisible();
  });

  test('sticky navigation reports the section currently in view', async ({ page }) => {
    await openSite(page);
    await page.evaluate(() => document.getElementById('products')?.scrollIntoView());

    await expect
      .poll(async () =>
        page
          .locator('nav[aria-label="Primary"] a[href="#products"]')
          .getAttribute('aria-current'),
      )
      .toBe('location');
    await expect
      .poll(async () =>
        page.evaluate(
          () => getComputedStyle(document.querySelector('header') as HTMLElement).position,
        ),
      )
      .toBe('fixed');
  });

  test('product card pre-fills a valid Messenger inquiry', async ({ page }) => {
    await openSite(page);
    await stubPopup(page);

    await page.locator('#products ul > li a').first().click();

    await expect(page.locator('#inquiry-message')).toHaveValue(
      new RegExp(PRODUCT_TOPIC),
    );
    await expect(page.locator('#inquiry-type')).toHaveValue('Product inquiry');
    await expect(page.getByText(/Asking about:/)).toBeVisible();

    await page.fill('#inquiry-name', 'QA Test');
    await page.fill('#inquiry-email', 'qa@example.com');
    await page.getByRole('button', { name: 'Continue to Messenger' }).click();

    await expect(
      page.getByRole('region', { name: 'Inquiry status' }),
    ).toContainText('Your message is ready in Messenger.');

    const url = await openedUrl(page);
    expect(url).toContain('https://m.me/elishabayfoods?text=');
    const decoded = decodeURIComponent(url ?? '');
    expect(decoded).toContain('Name: QA Test');
    expect(decoded).toContain(PRODUCT_TOPIC);
  });

  test('inquiry form rejects invalid input without opening Messenger', async ({ page }) => {
    await openSite(page);
    await stubPopup(page);
    await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());

    await page.getByRole('button', { name: 'Continue to Messenger' }).click();

    await expect(page.getByText('Please enter your full name.')).toBeVisible();
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
    await expect(page.getByText('Please choose an inquiry type.')).toBeVisible();
    await expect(page.getByText(/at least a short message/)).toBeVisible();
    await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4);
    expect(await openedUrl(page)).toBeNull();
  });

  test('mobile menu opens, closes with Escape and returns focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openSite(page);

    const trigger = page.locator('header button[aria-controls]');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  });

  test('mobile menu navigation closes the menu and reaches the inquiry form', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openSite(page);

    const trigger = page.locator('header button[aria-controls]');
    await trigger.click();
    await page
      .getByRole('navigation', { name: 'Mobile' })
      .getByRole('link', { name: 'Contact Us' })
      .click();

    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#contact')).toBeInViewport();
    await expect(page.locator('#inquiry-name')).toBeVisible();
  });

  test('required breakpoints have no horizontal overflow', async ({ page }) => {
    for (const width of [320, 375, 414, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  });

  test('has no WCAG A/AA accessibility violations at desktop and mobile', async ({
    page,
  }) => {
    await openSite(page);
    await loadLazyContent(page);

    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations, `accessibility violations at ${width}px`).toEqual([]);
    }
  });

  test('skip link is the first stop and moves focus to main', async ({ page }) => {
    await openSite(page);
    await page.keyboard.press('Tab');

    const skipLink = page.locator('a[href="#main"]');
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });

  test('reduced motion keeps content visible', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openSite(page);

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const opacity = await page
      .locator('[data-reveal]')
      .first()
      .evaluate((element) => getComputedStyle(element).opacity);
    expect(opacity).toBe('1');
  });
});
