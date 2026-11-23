import { chromium } from 'playwright';
import path from 'path';

const artifactDir = 'C:\\Users\\Daniyal Qais\\.gemini\\antigravity\\brain\\7db481ac-d7f7-4349-be76-37c4dfbcc62d\\screenshots';

async function run() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktopContext.newPage();
  await page.goto('http://localhost:3001/#about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const aboutSection = page.locator('#about');
  await aboutSection.screenshot({ path: path.join(artifactDir, 'luxury-about-desktop.png') });
  console.log('Saved luxury-about-desktop.png');

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3001/#about', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileAbout = mobilePage.locator('#about');
  await mobileAbout.screenshot({ path: path.join(artifactDir, 'luxury-about-mobile.png') });
  console.log('Saved luxury-about-mobile.png');

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
