export type ShellFields = {
  siteId: string;
  posNumber: string;
  cashierName: string;
  fssaiNumber: string;
  shellProductName: string;
  itemPaymentMethod: string;
  discountAmount: string;
  discountDescription: string;
  loyaltyName: string;
  loyaltyCustomerId: string;
  feedbackText: string;
  feedbackUrl: string;
  shellPaperWidth: "58" | "80";
  showShellWatermarks: boolean;
};

export const shellDefaults: ShellFields = {
  siteId: "",
  posNumber: "",
  cashierName: "",
  fssaiNumber: "",
  shellProductName: "",
  itemPaymentMethod: "",
  discountAmount: "",
  discountDescription: "",
  loyaltyName: "Shell Go+",
  loyaltyCustomerId: "",
  feedbackText: "Tell us about your visit at",
  feedbackUrl: "www.shell.com/india/tellshell",
  shellPaperWidth: "80",
  showShellWatermarks: true,
};

export function calculateShellSale(gross: number, discountValue: string) {
  const discount = Number(discountValue);
  if (!Number.isFinite(discount) || discount < 0) {
    return { discount: 0, netTotal: null, error: "Enter a valid discount of zero or more." };
  }
  if (discount > gross) {
    return { discount, netTotal: null, error: "Discount cannot exceed the fuel amount." };
  }

  // Subtract integer paise so all totals agree with the printed two-decimal amounts.
  const netTotal = (Math.round(gross * 100) - Math.round(discount * 100)) / 100;
  return { discount, netTotal, error: null };
}

export function formatShellDate(value: string) {
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}-${month}-${year}` : "";
}
