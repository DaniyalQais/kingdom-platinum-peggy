import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const artifactDir = 'C:\\Users\\Daniyal Qais\\.gemini\\antigravity\\brain\\7db481ac-d7f7-4349-be76-37c4dfbcc62d\\screenshots';
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true
  });

  // Desktop 1440
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await desktopContext.newPage();
  await page.goto('http://localhost:3001/#resources', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const resourcesSection = page.locator('#resources');
  await resourcesSection.screenshot({
    path: path.join(artifactDir, 'luxury-resources-desktop.png')
  });
  console.log('Saved luxury-resources-desktop.png');

  // Mobile 390
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3001/#resources', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileResources = mobilePage.locator('#resources');
  await mobileResources.screenshot({
    path: path.join(artifactDir, 'luxury-resources-mobile.png')
  });
  console.log('Saved luxury-resources-mobile.png');

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

