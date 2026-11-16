export const receiptFonts = [
  { id: "default", name: "Template default", family: "", asset: null },
  { id: "vt323", name: "VT323 (thermal)", family: '"Thermal VT323", "Courier New", monospace', asset: "vt323-latin.woff2" },
  { id: "dotgothic16", name: "DotGothic16 (mixed-case bitmap)", family: '"Shell Receipt Bitmap", "Courier New", monospace', asset: "dotgothic16-latin.woff2" },
  { id: "fake-receipt", name: "Fake Receipt (all-capitals bitmap)", family: '"Fake Receipt Condensed", "Courier New", monospace', asset: "fake-receipt-condensed.woff2" },
  { id: "arial-narrow", name: "Arial Narrow", family: '"Arial Narrow", "Helvetica Neue", Arial, sans-serif', asset: null },
  { id: "share-tech-mono", name: "Share Tech Mono", family: '"Share Tech Mono", "Courier New", monospace', asset: "share-tech-mono-latin.woff2" },
  { id: "press-start", name: "Press Start 2P", family: '"Legacy Press Start 2P", monospace', asset: "press-start-2p-latin.woff2" },
  { id: "nunito", name: "Nunito Sans", family: '"Legacy Nunito Sans", Arial, sans-serif', asset: "nunito-sans-latin.woff2" },
  { id: "arial", name: "Arial", family: 'Arial, Helvetica, sans-serif', asset: null },
  { id: "courier", name: "Courier New", family: '"Courier New", Courier, monospace', asset: null },
] as const;

export type ReceiptFontId = typeof receiptFonts[number]["id"];

export function getReceiptFont(value: unknown) {
  return receiptFonts.find((font) => font.id === value) ?? receiptFonts[0];
}
