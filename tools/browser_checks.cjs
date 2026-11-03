const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require(process.env.HORUS_PLAYWRIGHT_MODULE || 'playwright');

const root = path.resolve(__dirname, '..');
const output = process.env.HORUS_SITE_SCREENSHOTS;
const routes = ['/', '/papers/ur-2026/', '/papers/ro-man-2026/', '/papers/irim-2026/'];
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

async function main() {
  const server = http.createServer(async (request, response) => {
    let relative = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (relative.endsWith('/')) relative += 'index.html';
    const file = path.resolve(root, '.' + relative);
    if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
    try {
      response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
      response.end(await fs.readFile(file));
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.HORUS_BROWSER_EXECUTABLE || undefined, headless: true });
    const origin = `http://127.0.0.1:${server.address().port}`;
    const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
    if (output) await fs.mkdir(output, { recursive: true });
    for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 1000 }]) {
      const page = await context.newPage();
      await page.setViewportSize(viewport);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.url().startsWith(origin) && response.status() >= 400) errors.push(response.url()); });
      for (const route of routes) {
        await page.goto(origin + route, { waitUntil: 'networkidle' });
        assert.deepEqual(errors, [], route);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true, `horizontal overflow: ${route}`);
        assert.equal(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), true, `missing image: ${route}`);
        const copy = page.getByRole('button', { name: 'Copy BibTeX citation', exact: true }).first();
        assert.equal(await copy.count(), 1, `missing citation control: ${route}`);
        await copy.click();
        await page.getByRole('status').filter({ hasText: 'Copied' }).first().waitFor();
        assert.match(await page.evaluate(() => navigator.clipboard.readText()), /^@/);
        if (viewport.width < 1024 && route !== '/') {
          const menu = page.getByRole('button', { name: 'menu', exact: true });
          await menu.focus();
          await page.keyboard.press('Enter');
          assert.equal(await menu.getAttribute('aria-expanded'), 'true');
          assert.equal(await page.locator('#navbarMenu').isVisible(), true);
          await page.keyboard.press('Enter');
          assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        }
        if (output) await page.screenshot({ path: path.join(output, `${route.replaceAll('/', '-') || 'home'}-${viewport.width}.png`), fullPage: true });
      }
      await page.close();
    }
    await context.close();
    console.log('All four pages passed desktop/mobile rendering, image, citation-copy, and keyboard navigation checks.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
