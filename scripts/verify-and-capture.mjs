import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("polished-screenshots");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function verifyAndCapture() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const viewports = [
    { name: "mobile-360", width: 360, height: 740 },
    { name: "mobile-390", width: 390, height: 844 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "desktop-1440", width: 1440, height: 900 },
  ];

  let passed = true;

  for (const vp of viewports) {
    console.log(`\n=== Verifying ${vp.name} (${vp.width}x${vp.height}) ===`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    // Track console errors
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    // 1. Check Horizontal Overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`Viewport width: ${vp.width}, scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    if (scrollWidth > clientWidth) {
      console.error(`FAIL: Horizontal overflow detected on ${vp.name}! scrollWidth=${scrollWidth} > clientWidth=${clientWidth}`);
      passed = false;
    } else {
      console.log(`PASS: No horizontal overflow on ${vp.name}`);
    }

    // 2. Full page screenshot
    await page.screenshot({ path: path.join(outDir, `${vp.name}-full.png`), fullPage: true });
    // Header & Hero screenshot
    await page.screenshot({ path: path.join(outDir, `${vp.name}-hero.png`) });

    // 3. Mobile menu test (if mobile)
    if (vp.width < 768) {
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await menuBtn.click();
      await page.waitForTimeout(250);
      await page.screenshot({ path: path.join(outDir, `${vp.name}-menu-open.png`) });

      // Check all 6 links
      const links = page.locator("#mobile-menu ul li a");
      const count = await links.count();
      if (count !== 6) {
        console.error(`FAIL: Expected 6 mobile menu links, found ${count}`);
        passed = false;
      }

      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);
    }

    // 4. Product Dialog test for each product
    if (vp.name === "desktop-1440" || vp.name === "mobile-390") {
      const productCards = page.locator(".product-card");
      const cardCount = await productCards.count();
      console.log(`Checking ${cardCount} product cards for dialog opening...`);

      for (let i = 0; i < cardCount; i++) {
        const card = productCards.nth(i);
        const title = (await card.locator("h3").innerText()).trim();
        const btn = card.locator('button[aria-haspopup="dialog"]').first();
        await btn.click();
        await page.waitForTimeout(300);

        const dialog = page.locator("dialog.product-dialog");
        const isDialogOpen = await dialog.evaluate((el) => el.open);
        const dialogTitle = (await page.locator("#product-dialog-title").innerText()).trim();

        if (!isDialogOpen || dialogTitle !== title) {
          console.error(`FAIL: Dialog mismatch for product ${i + 1}: expected "${title}", got "${dialogTitle}" (open: ${isDialogOpen})`);
          passed = false;
        }

        if (i === 0) {
          // Take screenshot of dialog
          await page.screenshot({ path: path.join(outDir, `${vp.name}-dialog.png`) });
        }

        // Close with Escape
        await page.keyboard.press("Escape");
        await page.waitForTimeout(250);

        // Verify focus returned to trigger
        const activeTag = await page.evaluate(() => document.activeElement?.tagName);
        if (activeTag !== "BUTTON") {
          console.warn(`Note: Focus returned to ${activeTag} after closing dialog`);
        }
      }

      // Check Featured Bundle dialog
      const bundleBtn = page.locator("#featured-bundle button");
      await bundleBtn.click();
      await page.waitForTimeout(300);
      const bundleDialogOpen = await page.locator("dialog.product-dialog").evaluate((el) => el.open);
      const bundleDialogTitle = (await page.locator("#product-dialog-title").innerText()).trim();
      if (!bundleDialogOpen || !bundleDialogTitle.includes("Bundle")) {
        console.error("FAIL: Bundle dialog failed to open properly");
        passed = false;
      }
      if (vp.name === "desktop-1440") {
        await page.screenshot({ path: path.join(outDir, `${vp.name}-bundle-dialog.png`) });
      }
      await page.keyboard.press("Escape");
      await page.waitForTimeout(250);
    }

    // Check for console errors
    if (consoleErrors.length > 0) {
      console.error(`Console errors on ${vp.name}:`, consoleErrors);
      passed = false;
    } else {
      console.log(`PASS: Zero console errors on ${vp.name}`);
    }

    await page.close();
  }

  // 5. Test Short Viewport (360x380) scrollability
  console.log("\n=== Testing Short Mobile Viewport (360x380) ===");
  const shortPage = await browser.newPage({ viewport: { width: 360, height: 380 } });
  await shortPage.goto("http://localhost:3001", { waitUntil: "networkidle" });
  const shortMenuBtn = shortPage.locator('button[aria-controls="mobile-menu"]');
  await shortMenuBtn.click();
  await shortPage.waitForTimeout(250);

  const shortPanel = shortPage.locator("#mobile-menu");
  const isScrollable = await shortPanel.evaluate((el) => {
    return el.scrollHeight > el.clientHeight && window.getComputedStyle(el).overflowY.includes("auto");
  });
  console.log(`Short screen dropdown is scrollable: ${isScrollable}`);
  if (!isScrollable) {
    console.error("FAIL: Menu dropdown not scrollable on short screens!");
    passed = false;
  } else {
    console.log("PASS: Menu dropdown is scrollable on short screens!");
  }
  await shortPage.close();

  // 6. Test Reduced Motion
  console.log("\n=== Testing Reduced Motion Preference ===");
  const rmContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const rmPage = await rmContext.newPage();
  await rmPage.goto("http://localhost:3001", { waitUntil: "networkidle" });
  const scrollBehavior = await rmPage.evaluate(() => window.getComputedStyle(document.documentElement).scrollBehavior);
  console.log(`Scroll behavior under prefers-reduced-motion: ${scrollBehavior}`);
  if (scrollBehavior !== "auto") {
    console.error(`FAIL: Expected scroll-behavior auto under reduced motion, got ${scrollBehavior}`);
    passed = false;
  } else {
    console.log("PASS: Reduced motion scroll behavior is auto");
  }
  await rmContext.close();

  await browser.close();

  console.log("\n=============================================");
  if (passed) {
    console.log("ALL VERIFICATIONS AND SCREENSHOTS SUCCESSFUL! ✓");
  } else {
    console.log("SOME VERIFICATIONS FAILED! ✗");
    process.exit(1);
  }
}

verifyAndCapture().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});

