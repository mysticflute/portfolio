import { test, expect, type Page } from '@playwright/test';

/** Common locators for the page. */
const locators = {
  /** The top navigation bar. */
  mainNavigation: {
    /** The link containing the site logo image. */
    siteLogo: (page: Page) =>
      page
        .getByRole('banner')
        .getByRole('link', { name: 'Nathan David McWilliams' }),

    /** The "Home" text link. */
    homeLink: (page: Page) =>
      page
        .getByRole('banner') //
        .getByRole('link', { name: 'Home' }),

    /** The "About" text link. */
    aboutLink: (page: Page) =>
      page
        .getByRole('banner') //
        .getByRole('link', { name: 'About' }),

    /** The "Portfolio" text link. */
    portfolioLink: (page: Page) =>
      page
        .getByRole('banner') //
        .getByRole('link', { name: 'Portfolio' }),

    /** The "Contact" text link. */
    contactLink: (page: Page) =>
      page
        .getByRole('banner')
        .getByRole('list')
        .getByRole('link', { name: 'Contact' }),

    /** The link containing the contact icon. */
    contactIconLink: (page: Page) =>
      page
        .getByRole('banner') //
        .getByRole('img', { name: 'Contact' }),

    /** The button to open and close the nav overlay. */
    overlayButton: (page: Page) =>
      page
        .getByRole('banner')
        .getByRole('button', { name: /(open|close) main menu/i }),
  },

  /** The site footer. */
  footer: {
    /** The link containing the site logo image. */
    siteLogo: (page: Page) =>
      page
        .getByRole('contentinfo')
        .getByRole('link', { name: 'Nathan David McWilliams' }),

    /** The "Home" text link. */
    homeLink: (page: Page) =>
      page
        .getByRole('contentinfo') //
        .getByRole('link', { name: 'Home' }),

    /** The "About" text link. */
    aboutLink: (page: Page) =>
      page
        .getByRole('contentinfo') //
        .getByRole('link', { name: 'About' }),

    /** The "Portfolio" text link. */
    portfolioLink: (page: Page) =>
      page
        .getByRole('contentinfo') //
        .getByRole('link', { name: 'Portfolio' }),

    /** The "Contact" text link. */
    contactLink: (page: Page) =>
      page
        .getByRole('contentinfo') //
        .getByRole('link', { name: 'Contact' }),
  },
};

test.describe('main navigation bar', { tag: '@desktop-only' }, () => {
  test('navigates across the website', async ({ page }) => {
    const siteLogo = locators.mainNavigation.siteLogo(page);
    const homeLink = locators.mainNavigation.homeLink(page);
    const aboutLink = locators.mainNavigation.aboutLink(page);
    const portfolioLink = locators.mainNavigation.portfolioLink(page);
    const contactLink = locators.mainNavigation.contactLink(page);
    const contactIconButton = locators.mainNavigation.contactIconLink(page);

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
  test('navigates across the website', async ({ page, isMobile }) => {
    const overlayButton = locators.mainNavigation.overlayButton(page);
    const homeLink = locators.mainNavigation.homeLink(page);
    const aboutLink = locators.mainNavigation.aboutLink(page);
    const portfolioLink = locators.mainNavigation.portfolioLink(page);
    const contactLink = locators.mainNavigation.contactLink(page);

    if (!isMobile) {
      page.setViewportSize({ width: 390, height: 844 });
    }

    await page.goto('/');
    await overlayButton.click();

    // click the About link
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
});
