import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { getReceiptFont, receiptFonts } from "../app/receipt-fonts.ts";

test("old and invalid saved font choices use the template default", () => {
  for (const value of [undefined, null, "", "unknown-font", 123, false, {}]) {
    assert.equal(getReceiptFont(value).id, "default");
  }
});

test("all font choices have stable unique identifiers", () => {
  assert.equal(new Set(receiptFonts.map((font) => font.id)).size, receiptFonts.length);
  for (const font of receiptFonts) {
    assert.equal(getReceiptFont(font.id), font);
    if (font.id !== "default") assert.ok(font.family);
  }
});

test("font overrides use the renderer's selected-font attribute", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /data-font=\{selectedFont\.id\}/);
  assert.match(css, /\.receipt-stage\[data-font\]:not\(\[data-font="default"\]\) #receipt\s*\{/);
  assert.match(css, /font-family: var\(--receipt-font\)/);
});

test("bundled options have deployable font assets and license notices", async () => {
  const deployment = await readFile(new URL("../scripts/prepare-github-pages.mjs", import.meta.url), "utf8");
  for (const font of receiptFonts) {
    if (!font.asset) continue;
    await access(new URL(`../public/${font.asset}`, import.meta.url));
    assert.ok(deployment.includes(`"${font.asset}"`), `${font.name} needs a GitHub Pages asset path`);
  }
  const license = await readFile(new URL("../public/fake-receipt-LICENSE.txt", import.meta.url), "utf8");
  assert.match(license, /CC0 1\.0 Universal/);
  await access(new URL("../public/dotgothic16-OFL.txt", import.meta.url));
});
