/* Renders cv.html to assets/Goshgar_Hasanov_CV.pdf.
   The PDF and the site are then the same document in two forms — edit cv.html
   and re-run, rather than maintaining a separate file in a design tool.

   Usage: node scripts/build-cv.mjs */
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(root, 'cv.html');
const out = path.join(root, 'assets', 'Goshgar_Hasanov_CV.pdf');

const CHROME = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean).find((p) => { try { return fs.existsSync(p); } catch { return false; } });

if (!CHROME) {
  console.error('Chrome not found. Set CHROME_PATH.');
  process.exit(1);
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();

await page.goto('file://' + source, { waitUntil: 'networkidle' });
/* The layout depends on the webfont's metrics, so wait for it rather than
   racing it — a fallback face changes where the page breaks. */
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);

await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

await browser.close();

const bytes = fs.statSync(out).size;
const pages = (fs.readFileSync(out).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
console.log(`${path.relative(root, out)} — ${(bytes / 1024).toFixed(0)} KB, ${pages} page(s)`);
