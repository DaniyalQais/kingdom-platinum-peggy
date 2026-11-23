import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("baseline-screenshots");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const viewports = [
    { name: "mobile-360", width: 360, height: 740 },
    { name: "mobile-390", width: 390, height: 844 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "desktop-1440", width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Full page screenshot
    await page.screenshot({ path: path.join(outDir, `${vp.name}-full.png`), fullPage: true });

    // Header & Hero screenshot
    await page.screenshot({ path: path.join(outDir, `${vp.name}-hero.png`) });

    // Open mobile menu screenshot (for mobile/tablet)
    if (vp.width < 768) {
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      if (await menuBtn.isVisible()) {
        await menuBtn.click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(outDir, `${vp.name}-menu-open.png`) });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
      }
    }

    // Open product dialog screenshot
    const firstProductBtn = page.locator('.product-card button[aria-haspopup="dialog"]').first();
    if (await firstProductBtn.isVisible()) {
      await firstProductBtn.click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(outDir, `${vp.name}-dialog.png`) });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
    }

    await page.close();
  }

  await browser.close();
  console.log("Baseline screenshots captured in baseline-screenshots/");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});

