import { PDFDocument } from "pdf-lib";

export async function createReceiptPdf(png: string, pageWidth: number, pageHeight: number) {
  if (![pageWidth, pageHeight].every((value) => Number.isFinite(value) && value > 0)) {
    throw new Error("Receipt PDF dimensions must be finite and positive");
  }

  // Disable the library's automatic producer, creator and timestamp fields.
  const pdf = await PDFDocument.create({ updateMetadata: false });
  const image = await pdf.embedPng(png);
  const page = pdf.addPage([pageWidth, pageHeight]);
  page.drawImage(image, { x: 0, y: 0, width: pageWidth, height: pageHeight });
  return pdf.save();
}
