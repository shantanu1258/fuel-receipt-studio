# Fuel Receipt Studio

A responsive React fuel-bill generator rebuilt from the supplied saved webpage.
It creates petrol, diesel, CNG, and EV charging receipts with six live-preview
layouts, local receipt history, cloning, and browser-based PDF printing.

> **Disclaimer:** Fuel Receipt Studio is provided for educational purposes only.
> Do not use it to create fraudulent or misleading documents.

## Features

- live receipt preview while editing
- rate and total-based quantity calculation
- petrol, diesel, CNG, and EV units
- optional GSTIN, CST TIN, or transaction number
- six formal and thermal receipt layouts, including a photo-based Shell receipt
- Shell site/POS and FSSAI details, operator, discounts, payment and loyalty fields
- copyable plain-text summary
- tightly cropped PDF downloads sized to the receipt instead of A4 paper
- a separate browser print option for physical printing
- versioned JSON history in browser storage, with clone and delete controls
- automatic history save when printing and a manual Save bill action
- local-only data; receipt history is never uploaded

## Shell receipt

Select **Shell** in the layout picker to use the supplied photo's receipt structure:
centered station details, asterisk dividers, operator and pump details, a fuel line,
discount, sale/payment/invoice totals, customer and loyalty sections, and feedback
footer. **Replace fields with Shell demo** loads the photo's example amounts with
placeholder identifiers; personal details from the photo are not bundled with the app.
Optional blank fields are omitted. The fuel-line payment label is independent of
the payment method in the totals.

Enter the **fuel amount before discount**. Quantity is calculated from that amount
divided by the rate; the discount reduces the payable total, not the fuel quantity.
For example, 4200.30 at 127.98/L displays 32.82 L, and a 70.00 discount gives a
4130.30 invoice. Preview, copied summary, saved history, print and PDF use that
same payable total. Negative discounts and discounts larger than the fuel amount
block saving/exporting.

The layout defaults to an **estimated 80 mm** paper width, with a 58 mm option.
The photograph does not establish an exact physical size or printer font: the
template uses the bundled VT323 font and a transparent PNG extracted from the
supplied Shell logo image, colored red and yellow and printed as small, faint
paper emblems. It does not reproduce the photograph's creases, perspective or worn
ink. Emblems can be turned off. The feedback address is transcribed from the sample and is editable.
No external font or logo request is required. Existing version-1 history remains
compatible; older receipts receive empty/default values for the new fields.

## Requirements

- Node.js `>=22.13.0`

## Run locally

The project-local `.npmrc` selects the public npm registry without changing your
user-level npm configuration. Network or VPN access policies still apply.

```bash
npm install
npm run dev
```

Open the local address printed in the terminal.

## Verify

```bash
npm run build
npm test
```

The application is a public React 19 and TypeScript reference project. It uses
Next-compatible routing through vinext and also produces a static GitHub Pages
export. No database, account, or external service is required.

## GitHub Pages

The repository includes a GitHub Actions workflow that builds a static export
and deploys it to GitHub Pages whenever `main` is updated. In the GitHub
repository, set **Settings → Pages → Source** to **GitHub Actions** if it is not
selected automatically.

Browser history is specific to each browser, device, and website origin. It does
not sync between devices, and history created on `localhost` will not transfer
automatically to the public GitHub Pages address.

## Live site

The public app is available at
[https://shantanu1258.github.io/fuel-receipt-studio/](https://shantanu1258.github.io/fuel-receipt-studio/).
