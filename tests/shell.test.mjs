import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { calculateShellSale, formatShellDate, shellDefaults } from "../app/shell.ts";

test("the receipt font is bundled as a licensed webfont", async () => {
  const [font, license, css] = await Promise.all([
    readFile(new URL("../public/dotgothic16-latin.woff2", import.meta.url)),
    readFile(new URL("../public/dotgothic16-OFL.txt", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.equal(font.toString("ascii", 0, 4), "wOF2");
  assert.match(license, /SIL OPEN FONT LICENSE Version 1\.1/);
  assert.match(license, /DotGothic16 Project Authors/);
  assert.match(css, /url\("\/dotgothic16-latin\.woff2"\) format\("woff2"\)/);
});

test("the bundled Shell paper emblem is a transparent PNG", async () => {
  const png = await readFile(new URL("../public/shell-paper-logo-mono.png", import.meta.url));
  assert.deepEqual(png.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  assert.equal(png.toString("ascii", 12, 16), "IHDR");
  assert.equal(png[25], 6);
  assert.ok(png.readUInt32BE(16) > 0);
  assert.ok(png.readUInt32BE(20) > 0);
});

test("the photographed sale keeps quantity separate from the discount", () => {
  const gross = 4200.30;
  const sale = calculateShellSale(gross, "70.00");
  assert.equal((gross / 127.98).toFixed(2), "32.82");
  assert.deepEqual(sale, { discount: 70, netTotal: 4130.30, error: null });
});

test("empty and zero discounts preserve the fuel amount", () => {
  for (const discount of ["", "0", "0.00"]) {
    assert.equal(calculateShellSale(2500, discount).netTotal, 2500);
    assert.equal(calculateShellSale(2500, discount).error, null);
  }
});

test("discount calculations use integer paise and allow a fully discounted sale", () => {
  assert.equal(calculateShellSale(0.30, "0.10").netTotal, 0.20);
  assert.equal(calculateShellSale(70, "70").netTotal, 0);
});

test("invalid discounts have no printable payable total", () => {
  for (const discount of ["-1", "not a number", "Infinity", "2500.01"]) {
    const sale = calculateShellSale(2500, discount);
    assert.equal(sale.netTotal, null);
    assert.ok(sale.error);
  }
});

test("Shell dates keep the photo's day-month-year order without timezone conversion", () => {
  assert.equal(formatShellDate("2026-07-26"), "26-07-2026");
  assert.equal(formatShellDate(""), "");
});

test("new fields default safely for older saved receipts", () => {
  assert.equal(shellDefaults.discountAmount, "");
  assert.equal(shellDefaults.loyaltyCustomerId, "");
  assert.equal(shellDefaults.siteId, "");
  assert.equal(shellDefaults.invoiceSubtext, "");
  assert.equal(shellDefaults.showPos, true);
  assert.equal(shellDefaults.shellPaperWidth, "80");
  assert.equal(calculateShellSale(2500, shellDefaults.discountAmount).netTotal, 2500);
});
