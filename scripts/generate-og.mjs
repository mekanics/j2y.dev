#!/usr/bin/env node
/**
 * Generate the OG default image from the HTML template.
 *
 * Usage:
 *   node scripts/generate-og.mjs
 *
 * Requires: playwright (`npm i -D playwright` or global install)
 * Input:    public/og-template.html
 * Output:   public/og-default.png (1200×630)
 */
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  // fallback to global install
  const { createRequire } = await import('module');
  const req = createRequire(import.meta.url);
  ({ chromium } = req('/usr/local/lib/node_modules/playwright'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const template = `file://${resolve(root, 'public/og-template.html')}`;
const output = resolve(root, 'public/og-default.png');

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.goto(template, { waitUntil: 'domcontentloaded' });
await page.screenshot({ path: output, fullPage: false });
await browser.close();

console.log(`✅ ${output} (1200×630)`);
