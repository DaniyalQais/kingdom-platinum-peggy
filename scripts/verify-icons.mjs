import { chromium } from 'playwright';
import path from 'path';

const artifactDir = 'C:\\Users\\Daniyal Qais\\.gemini\\antigravity\\brain\\7db481ac-d7f7-4349-be76-37c4dfbcc62d\\screenshots';

async function run() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // 1. Mobile viewport - Navbar menu icon & open state
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);

  // Closed navbar with Menu icon
  const header = mobilePage.locator('header');
  await header.screenshot({ path: path.join(artifactDir, 'icon-mobile-header-closed.png') });
  console.log('Saved icon-mobile-header-closed.png');

  // Open menu with X icon
  const menuButton = mobilePage.locator('button[aria-label*="navigation menu"]');
  await menuButton.click();
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({ path: path.join(artifactDir, 'icon-mobile-menu-open.png') });
  console.log('Saved icon-mobile-menu-open.png');

  // Close menu
  await menuButton.click();
  await mobilePage.waitForTimeout(300);

  // 2. Desktop viewport
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(500);

  // Hero CTAs
  const heroSection = desktopPage.locator('#home');
  await heroSection.screenshot({ path: path.join(artifactDir, 'icon-hero-ctas.png') });
  console.log('Saved icon-hero-ctas.png');

  // Product cards
  const resourcesSection = desktopPage.locator('#resources');
  await resourcesSection.screenshot({ path: path.join(artifactDir, 'icon-product-cards.png') });
  console.log('Saved icon-product-cards.png');

  // Open product dialog
  const firstProductBtn = desktopPage.locator('article.product-card button').first();
  await firstProductBtn.click();
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: path.join(artifactDir, 'icon-product-dialog.png') });
  console.log('Saved icon-product-dialog.png');

  // Close product dialog with Escape
  await desktopPage.keyboard.press('Escape');
  await desktopPage.waitForTimeout(300);

  // Contact section
  const contactSection = desktopPage.locator('#contact');
  await contactSection.screenshot({ path: path.join(artifactDir, 'icon-contact-section.png') });
  console.log('Saved icon-contact-section.png');

  // Scroll to trigger back to top
  await desktopPage.evaluate(() => window.scrollTo(0, 1500));
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(artifactDir, 'icon-floating-and-backtotop.png') });
  console.log('Saved icon-floating-and-backtotop.png');

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
