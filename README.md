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
- a receipt-font dropdown for every layout, with saved font choices
- Shell site/POS and FSSAI details, operator, discounts, payment and loyalty fields
- copyable plain-text summary
- tightly cropped PDF downloads sized to the receipt instead of A4 paper
- PDF downloads without document metadata, software tags or timestamps
- a separate browser print option for physical printing
- versioned JSON history in browser storage, with clone and delete controls
- automatic history save when printing and a manual Save bill action
- local-only data; receipt history is never uploaded

## Receipt fonts

The **Receipt font** dropdown beneath the layout picker works with all six
templates. **Template default** preserves each layout's original font: Arial for
Template 1, Nunito Sans for Template 2, Press Start 2P for Templates 3 and 4, and
VT323 for Template 5 and Shell. Shell's default matches the last-pushed version,
not the later font experiments.

The alternatives are VT323, DotGothic16, Fake Receipt, Arial Narrow, Share Tech
Mono, Press Start 2P, Nunito Sans, Arial, and Courier New. A selected override
applies when switching layouts and is preserved by save/clone, printing and PDF
download. Older saved receipts use **Template default**. Loading the Shell demo
keeps your selected font; clearing the form resets it.

DotGothic16 is a locally bundled Latin subset with fixed-width characters and
distinct uppercase/lowercase glyphs. It comes from
[Google Fonts](https://github.com/google/fonts/tree/main/ofl/dotgothic16) under
the SIL Open Font License, included in `public/dotgothic16-OFL.txt`.
Fake Receipt has a rough bitmap appearance but renders lowercase as capitals.
Its bundled, condensed variant scales horizontal outlines/advances to 70%;
the original is [CC0/public domain](https://typodermicfonts.com/public-domain/#fake-receipt).
See `public/fake-receipt-LICENSE.txt` for provenance and license details.

Arial, Arial Narrow and Courier New use system-font fallbacks, so their appearance
can vary by device. The other options are bundled and require no external font
request. Printer-style options are visual approximations, not verified ESC/POS
Font A or printer-ROM extractions. Fonts are rasterized into PDFs, not embedded
as font files or copied into PDF metadata.

## Shell receipt

Select **Shell** in the layout picker to use the supplied photo's receipt structure:
centered station details, asterisk dividers, operator and pump details, a fuel line,
discount, sale/payment/invoice totals, customer and loyalty sections, and feedback
footer. **Replace fields with Shell demo** loads the photo's example amounts with
placeholder identifiers; personal details from the photo are not bundled with the app.
Optional blank fields are omitted. The fuel-line payment label is independent of
the payment method in the totals. **Subtext below invoice number** supports
multiple lines, independently of the cashier name. **Show POS beside date** hides
or shows POS without discarding the entered number; copied summaries respect this
setting, and both settings are preserved when saving and cloning.

Enter the **fuel amount before discount**. Quantity is calculated from that amount
divided by the rate; the discount reduces the payable total, not the fuel quantity.
For example, 4200.30 at 127.98/L displays 32.82 L, and a 70.00 discount gives a
4130.30 invoice. Preview, copied summary, saved history, print and PDF use that
same payable total. Negative discounts and discounts larger than the fuel amount
block saving/exporting.

The layout defaults to an **estimated 80 mm** paper width, with a 58 mm option.
The photograph does not establish an exact physical size or printer font. VT323
is the default; use **Receipt font** to compare the other options.

A transparent monochrome PNG is extracted from the supplied Shell logo image. Faint paper emblems
repeat at closer, fixed spacing rather than stretching apart with the receipt
height. It does not reproduce the photograph's creases, perspective or worn ink.
Emblems can be turned off. The feedback address is transcribed from the sample
and is editable.
Existing version-1 history remains compatible; older receipts receive
empty/default values for the new fields.

## PDF privacy

**Download receipt PDF** creates an image-only PDF with metadata generation
disabled. All templates omit the document Info dictionary, XMP metadata, title,
subject, author, creator, producer, creation/modification timestamps and document
ID. The receipt is re-rasterized, so source image metadata is not copied into the
PDF. Page dimensions and the visible receipt content remain, and the download
filename still includes the receipt number; this is not an anonymity guarantee.

macOS may show **Where from** in Finder, containing the local or deployed website
URL. The browser writes this to the file's `com.apple.metadata:kMDItemWhereFroms`
extended attribute after downloading; it is not embedded in the PDF bytes. A
website cannot prevent or clear that operating-system attribute. To remove it
from a specific downloaded file on your Mac:

```bash
xattr -d com.apple.metadata:kMDItemWhereFroms "/path/to/receipt.pdf"
```

This removes only the download-origin attribute, not quarantine/security
attributes. Finder can also show the **PDF format version** (such as 1.7), which
is required file-format information and cannot be removed from a valid PDF.

**Print receipt** uses the browser's print dialog. A browser or printer driver's
**Save as PDF** option may insert its own metadata and cannot be controlled by
this app. Use the dedicated download button when you need the metadata-free file.

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
