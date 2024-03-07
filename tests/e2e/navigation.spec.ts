import { test, expect, type Page } from '@playwright/test';

// TODO: revisit some of these locators after improving accessibility of the
// main nav bar. Probably will not have to use `first()` anymore, or as many
// test ids.
/** Common locators for the page. */
const locators = {
  /** The main navigation bar. */
  navigationBar: {
    /** The link containing the site logo image. */
    siteLogo: (page: Page) => page.getByTestId('logo-link'),

    /** The "Home" text link. */
    homeLink: (page: Page) =>
      page.getByTestId('nav-middle').getByRole('link', { name: 'Home' }),

    /** The "About" text link. */
    aboutLink: (page: Page) =>
      page.getByTestId('nav-middle').getByRole('link', { name: 'About' }),

    /** The "Portfolio" text link. */
    portfolioLink: (page: Page) =>
      page.getByTestId('nav-middle').getByRole('link', { name: 'Portfolio' }),

    /** The "Contact" text link. */
    contactLink: (page: Page) =>
      page.getByTestId('nav-middle').getByRole('link', { name: 'Contact' }),

    /** The link containing the contact icon. */
    contactIcon: (page: Page) => page.getByTestId('contact-icon-link'),
  },

  /** The main navigation overlay. */
  navigationOverlay: {
    /** The button to open and close the nav overlay. */
    button: (page: Page) =>
      page.getByRole('banner').getByRole('button', { name: 'Menu' }),

    /** The "Home" text link. */
    homeLink: (page: Page) =>
      page.getByTestId('nav-overlay').getByRole('link', { name: 'Home' }),

    /** The "About" text link. */
    aboutLink: (page: Page) =>
      page.getByTestId('nav-overlay').getByRole('link', { name: 'About' }),

    /** The "Portfolio" text link. */
    portfolioLink: (page: Page) =>
      page.getByTestId('nav-overlay').getByRole('link', { name: 'Portfolio' }),

    /** The "Contact" text link. */
    contactLink: (page: Page) =>
      page.getByTestId('nav-overlay').getByRole('link', { name: 'Contact' }),
  },

  /** The site footer. */
  footer: {
    /** The link containing the site logo image. */
    siteLogo: (page: Page) => page.getByTestId('footer-logo-link'),

    /** The "Home" text link. */
    homeLink: (page: Page) => page.getByRole('contentinfo').getByText('Home'),

    /** The "About" text link. */
    aboutLink: (page: Page) =>
      page.getByRole('contentinfo').getByRole('link', { name: 'About' }),

    /** The "Portfolio" text link. */
    portfolioLink: (page: Page) =>
      page.getByRole('contentinfo').getByRole('link', { name: 'Portfolio' }),

    /** The "Contact" text link. */
    contactLink: (page: Page) =>
      page.getByRole('contentinfo').getByRole('link', { name: 'Contact' }),
  },
};

test.describe('main navigation bar', { tag: '@desktop-only' }, () => {
  test('navigates across the website', async ({ page }) => {
    const siteLogo = locators.navigationBar.siteLogo(page);
    const homeLink = locators.navigationBar.homeLink(page);
    const aboutLink = locators.navigationBar.aboutLink(page);
    const portfolioLink = locators.navigationBar.portfolioLink(page);
    const contactLink = locators.navigationBar.contactLink(page);
    const contactIconButton = locators.navigationBar.contactIcon(page);

    await page.goto('/');

    await expect(homeLink).toHaveAttribute('aria-current', 'page');

    // click the About link
    await aboutLink.click();

    await expect(page).toHaveURL(/.*#about/);

    // click the Portfolio link
    await portfolioLink.click();

    await expect(page).toHaveURL(/.*#portfolio/);

    // click the Contact (text) link
    await contactLink.click();

    await expect(page).toHaveURL('/contact');
    await expect(contactLink).toHaveAttribute('aria-current', 'page');
    await expect(homeLink).not.toHaveAttribute('aria-current', 'page');

    // click the Home link
    await homeLink.click();

    await expect(page).toHaveURL('/');
    await expect(homeLink).toHaveAttribute('aria-current', 'page');

    // click the Contact (icon) link
    await contactIconButton.click();

    await expect(page).toHaveURL('/contact');
    await expect(contactLink).toHaveAttribute('aria-current', 'page');

    // click the Site Logo
    await siteLogo.click();

    await expect(page).toHaveURL('/');
  });
});

test.describe('main navigation overlay', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('navigates across the website', async ({ page }) => {
    const overlayButton = locators.navigationOverlay.button(page);
    const homeLink = locators.navigationOverlay.homeLink(page);
    const aboutLink = locators.navigationOverlay.aboutLink(page);
    const portfolioLink = locators.navigationOverlay.portfolioLink(page);
    const contactLink = locators.navigationOverlay.contactLink(page);

    await page.goto('/');

    await expect(homeLink).toHaveAttribute('aria-current', 'page');

    // click the About link
    await overlayButton.click();
    await aboutLink.click();

    await expect(page).toHaveURL(/.*#about/);

    // click the Portfolio link
    await overlayButton.click();
    await portfolioLink.click();

    await expect(page).toHaveURL(/.*#portfolio/);

    // click the Contact (text) link
    await overlayButton.click();
    await contactLink.click();

    await expect(page).toHaveURL('/contact');
    await expect(contactLink).toHaveAttribute('aria-current', 'page');
    await expect(homeLink).not.toHaveAttribute('aria-current', 'page');

    // click the Home link
    await overlayButton.click();
    await homeLink.click();

    await expect(page).toHaveURL('/');
    await expect(homeLink).toHaveAttribute('aria-current', 'page');
  });
});

test.describe('footer navigation', () => {
  test('navigates across the website', async ({ page }) => {
    const siteLogo = locators.footer.siteLogo(page);
    const homeLink = locators.footer.homeLink(page);
    const aboutLink = locators.footer.aboutLink(page);
    const portfolioLink = locators.footer.portfolioLink(page);
    const contactLink = locators.footer.contactLink(page);

    await page.goto('/');

    await expect(homeLink).toHaveAttribute('aria-current', 'page');

    // click the About link
    await aboutLink.click();

    await expect(page).toHaveURL(/.*#about/);

    // click the Portfolio link
    await portfolioLink.click();

    await expect(page).toHaveURL(/.*#portfolio/);

    // click the Contact link
    await contactLink.click();

    await expect(page).toHaveURL('/contact');
    await expect(contactLink).toHaveAttribute('aria-current', 'page');
    await expect(homeLink).not.toHaveAttribute('aria-current', 'page');

    // click the Home link
    await homeLink.click();

    await expect(page).toHaveURL('/');
    await expect(homeLink).toHaveAttribute('aria-current', 'page');

    // click the logo image
    await siteLogo.click();

    await expect(page).toHaveURL('/');
  });

  test('contains social media links', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('link', { name: 'Nathan on Twitter' }),
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Nathan on Instagram' }),
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Nathan on YouTube' }),
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Nathan on SoundCloud' }),
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Nathan on Linktree' }),
    ).toBeVisible();
  });
});
