import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { PDFDict, PDFDocument, PDFName, PDFRawStream } from "pdf-lib";
import { createReceiptPdf } from "../app/receipt-pdf.ts";

const png = await readFile(new URL("../public/shell-paper-logo-mono.png", import.meta.url));
const image = `data:image/png;base64,${png.toString("base64")}`;

for (const [name, width, height] of [
  ["80 mm Shell", 80 * 72 / 25.4, 540],
  ["58 mm Shell", 58 * 72 / 25.4, 390],
  ["legacy portrait", 439, 680],
  ["landscape", 540, 226],
]) {
  test(`${name} PDFs preserve the page and image without document metadata`, async () => {
    const bytes = await createReceiptPdf(image, width, height);
    const pdf = await PDFDocument.load(bytes, { updateMetadata: false });

    assert.equal(pdf.getPageCount(), 1);
    assert.deepEqual(pdf.getPage(0).getSize(), { width, height });
    assert.equal(pdf.context.trailerInfo.Info, undefined);
    assert.equal(pdf.context.trailerInfo.ID, undefined);
    assert.deepEqual(pdf.catalog.keys().map((key) => key.toString()).sort(), ["/Pages", "/Type"]);

    let hasImage = false;
    for (const [, object] of pdf.context.enumerateIndirectObjects()) {
      const dict = object instanceof PDFRawStream ? object.dict : object;
      if (!(dict instanceof PDFDict)) continue;
      for (const key of [
        "Metadata", "Author", "Title", "Subject", "Keywords",
        "Creator", "Producer", "CreationDate", "ModDate", "PieceInfo",
      ]) {
        assert.equal(dict.has(PDFName.of(key)), false, `${key} must not be written`);
      }
      if (dict.get(PDFName.of("Subtype")) === PDFName.of("Image")) hasImage = true;
    }
    assert.ok(hasImage, "The receipt image must remain embedded");
  });
}

test("PDF creation rejects invalid dimensions instead of downloading an invalid file", async () => {
  for (const [width, height] of [[0, 100], [100, -1], [NaN, 100], [100, Infinity]]) {
    await assert.rejects(createReceiptPdf(image, width, height), /finite and positive/);
  }
});

test("PDF creation surfaces unreadable image data", async () => {
  await assert.rejects(createReceiptPdf("data:image/png;base64,aW52YWxpZA==", 200, 400));
});
