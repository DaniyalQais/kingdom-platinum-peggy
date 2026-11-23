import { chromium } from "playwright";

async function verifySocialBar() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const viewports = [
    { name: "320px mobile", width: 320, height: 640 },
    { name: "375px mobile", width: 375, height: 667 },
    { name: "768px tablet", width: 768, height: 1024 },
    { name: "1440px desktop", width: 1440, height: 900 },
  ];

  let passed = true;

  for (const vp of viewports) {
    console.log(`\n=== Testing Floating Social Bar on ${vp.name} ===`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    const bar = page.locator("nav.floating-social-bar");
    const barBox = await bar.boundingBox();
    console.log(`Bar dimensions: ${barBox?.width}w x ${barBox?.height}h at x=${barBox?.x}, y=${barBox?.y}`);

    if (!barBox) {
      console.error("FAIL: Floating social bar not found!");
      passed = false;
      continue;
    }

    // Check position: centered horizontally and near bottom
    const expectedCenterX = vp.width / 2;
    const actualCenterX = barBox.x + barBox.width / 2;
    console.log(`Center X check: expected ${expectedCenterX}, actual ${actualCenterX}`);
    if (Math.abs(expectedCenterX - actualCenterX) > 3) {
      console.error(`FAIL: Bar is not horizontally centered! Diff=${Math.abs(expectedCenterX - actualCenterX)}`);
      passed = false;
    } else {
      console.log("PASS: Bar is centered horizontally.");
    }

    // Check width fits inside viewport with margins
    if (barBox.width > vp.width - 20) {
      console.error(`FAIL: Bar is too wide for ${vp.name}!`);
      passed = false;
    } else {
      console.log(`PASS: Bar fits cleanly inside ${vp.name} (${barBox.width}px < ${vp.width}px).`);
    }

    // Check links
    const links = bar.locator("ul li a");
    const linkCount = await links.count();
    console.log(`Link count: ${linkCount} (expected 4: FB, IG, TikTok, Email)`);
    if (linkCount !== 4) {
      console.error(`FAIL: Expected 4 links, got ${linkCount}`);
      passed = false;
    }

    const expectedItems = [
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584447508583", external: true },
      { label: "Instagram", href: "https://www.instagram.com/kingdomplatinumsolutionsllc/", external: true },
      { label: "TikTok", href: "https://www.tiktok.com/@kingdomplatinumsolutions", external: true },
      { label: "Email", href: "mailto:peggy.saunders1@aol.com", external: false },
    ];

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const box = await link.boundingBox();
      const href = await link.getAttribute("href");
      const target = await link.getAttribute("target");
      const rel = await link.getAttribute("rel");
      const ariaLabel = await link.getAttribute("aria-label");

      console.log(` Link ${i + 1}: ${ariaLabel} (${box?.width}x${box?.height}) -> ${href}`);

      if (!box || box.width < 44 || box.height < 44) {
        console.error(` FAIL: Tap area too small: ${box?.width}x${box?.height} (expected >= 44x44)`);
        passed = false;
      }
      if (href !== expectedItems[i].href) {
        console.error(` FAIL: Expected href "${expectedItems[i].href}", got "${href}"`);
        passed = false;
      }
      if (expectedItems[i].external) {
        if (target !== "_blank" || !rel?.includes("noreferrer")) {
          console.error(` FAIL: External social link missing target="_blank" or rel="noreferrer"`);
          passed = false;
        }
      }
    }

    // Test tooltips on hover
    const firstLink = links.first();
    await firstLink.hover();
    await page.waitForTimeout(150);
    const tooltip = firstLink.locator('span[role="tooltip"]');
    const tooltipOpacity = await tooltip.evaluate((el) => window.getComputedStyle(el).opacity);
    console.log(`Tooltip opacity on hover: ${tooltipOpacity}`);
    if (tooltipOpacity !== "1") {
      console.error(`FAIL: Tooltip not visible on hover (opacity: ${tooltipOpacity})`);
      passed = false;
    } else {
      console.log("PASS: Tooltip is visible on hover.");
    }

    // Test back-to-top coordination on mobile (e.g. 320px/375px)
    if (vp.width < 640) {
      // Scroll to show back to top
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(300);
      const btt = page.locator(".back-to-top");
      const bttBox = await btt.boundingBox();
      console.log(`Back-to-top position on mobile: x=${bttBox?.x}, y=${bttBox?.y}, bottom distance=${vp.height - ((bttBox?.y ?? 0) + (bttBox?.height ?? 0))}px`);

      if (bttBox && barBox) {
        // Back-to-top top edge should be above or bottom distance higher than bar
        const bttBottomDist = vp.height - (bttBox.y + bttBox.height);
        const barBottomDist = vp.height - (barBox.y + barBox.height);
        console.log(`BTT bottom dist: ${bttBottomDist}px, Bar bottom dist: ${barBottomDist}px`);
        if (bttBottomDist <= barBottomDist) {
          console.error(`FAIL: Back-to-top is not positioned above the floating bar on narrow screens!`);
          passed = false;
        } else {
          console.log(`PASS: Back-to-top is safely elevated above the floating bar on mobile!`);
        }
      }
    }

    // Test hide when mobile menu is open (on mobile)
    if (vp.width < 768) {
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await menuBtn.click();
      await page.waitForTimeout(200);

      const isInert = await bar.getAttribute("inert");
      const barOpacity = await bar.evaluate((el) => window.getComputedStyle(el).opacity);
      console.log(`Bar state with menu open: inert=${isInert}, opacity=${barOpacity}`);
      if (isInert === null || barOpacity !== "0") {
        console.error(`FAIL: Bar should be hidden and inert when menu is open!`);
        passed = false;
      } else {
        console.log(`PASS: Bar is hidden and inert when mobile menu is open.`);
      }

      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);
    }

    // Test hide when product dialog is open
    const firstProductBtn = page.locator('.product-card button[aria-haspopup="dialog"]').first();
    await firstProductBtn.click();
    await page.waitForTimeout(250);

    const isInertDialog = await bar.getAttribute("inert");
    const barOpacityDialog = await bar.evaluate((el) => window.getComputedStyle(el).opacity);
    console.log(`Bar state with dialog open: inert=${isInertDialog}, opacity=${barOpacityDialog}`);
    if (isInertDialog === null || barOpacityDialog !== "0") {
      console.error(`FAIL: Bar should be hidden and inert when dialog is open!`);
      passed = false;
    } else {
      console.log(`PASS: Bar is hidden and inert when product dialog is open.`);
    }

    await page.keyboard.press("Escape");
    await page.waitForTimeout(250);

    // Test footer clearance: scroll all the way to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const footerCopyright = page.locator("footer div.border-t");
    const copyrightBox = await footerCopyright.boundingBox();
    const updatedBarBox = await bar.boundingBox();
    if (copyrightBox && updatedBarBox) {
      console.log(`Copyright bottom: ${copyrightBox.y + copyrightBox.height}px, Bar top: ${updatedBarBox.y}px`);
      if (copyrightBox.y + copyrightBox.height > updatedBarBox.y) {
        console.error(`FAIL: Copyright text overlaps behind floating bar at bottom of page!`);
        passed = false;
      } else {
        console.log(`PASS: Footer copyright scrolls fully above the floating bar with ${(updatedBarBox.y - (copyrightBox.y + copyrightBox.height)).toFixed(1)}px clearance!`);
      }
    }

    await page.close();
  }

  await browser.close();

  console.log("\n=================================");
  if (passed) {
    console.log("ALL FLOATING SOCIAL BAR TESTS PASSED! ✓");
  } else {
    console.log("SOME TESTS FAILED! ✗");
    process.exit(1);
  }
}

verifySocialBar().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});

