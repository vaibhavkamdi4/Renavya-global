# Renavya Global — Website

A bright, responsive static website for Renavya Global, designed for GitHub Pages using HTML5, CSS3, and vanilla JavaScript.

**Brand tagline:** “India’s Heritage. The World’s Market.”

## Project structure

```text
renavya-global/
├── index.html
├── privacy-policy.html
├── 404.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
        └── favicon.svg
```

## Before publishing: owner configuration checklist

Search the project for these placeholders and replace them:

1. `YOUR_FORMSPREE_FORM_ID` — your real Formspree form ID.
2. `COUNTRYCODENUMBER` — WhatsApp number in international format, digits only. For an Indian number, use country code `91` plus the number, with no `+`, spaces, or punctuation.
3. `YOUR-BUSINESS-EMAIL@example.com` — a monitored business email address, in both `index.html` and the contact details/footer. Use the same email in the mailto links.
4. `YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY` — the canonical URL and Open Graph URL in `index.html`. If using a custom domain, use that domain instead.
5. Privacy policy — confirm the policy matches the form provider and the way inquiries will actually be stored/handled.
6. Product photos — review image licences and replace the remote Unsplash photos if needed. Images are currently served from Unsplash URLs, so an internet connection is required to load them.

Do not add a business address, registration number, IEC, GSTIN, certifications, inventory claims, or company history unless verified.

## Configure Formspree

1. Create an account at [Formspree](https://formspree.io/) and create a new form.
2. Set the destination/notification email to the business email you control and verify it with Formspree.
3. Copy the form ID shown by Formspree.
4. In `index.html`, replace `YOUR_FORMSPREE_FORM_ID` in the form action:
   `https://formspree.io/f/YOUR_FORMSPREE_FORM_ID`
5. Deploy the site and submit a real test inquiry. Confirm it appears in Formspree and reaches the verified notification inbox.
6. Test an invalid email and an unsuccessful submission. The site uses browser validation and shows an error if Formspree rejects the submission or the network request fails.

The form uses Formspree's browser-compatible endpoint; no SMTP credentials or private API key are placed in the website. The included honeypot is basic spam protection, not a guarantee against spam. Formspree settings and its current plan limits may change.

**Important:** The form intentionally shows a configuration message instead of pretending to submit successfully when the placeholder ID remains.

## Configure WhatsApp

In `index.html`, find the link with `id="whatsapp-link"`. Replace `COUNTRYCODENUMBER` in its `href` with your business WhatsApp number in international format, digits only. Example format only: `https://wa.me/919876543210?text=...` — this is a format example, not a suggested business number.

The prefilled message is URL-encoded and reads:

> Hello Renavya Global, I am interested in importing products from India. Please share product details, availability, and export information.

Test the link on both desktop and mobile. The business must have WhatsApp enabled for that number. Until configured, clicking the WhatsApp button displays a clear message rather than opening an invalid chat.

## Deploy to GitHub Pages

1. Create a GitHub repository, for example `renavya-global`.
2. Upload the project files and folders to the repository root. Ensure `index.html` is at the root of the published folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. The repository's Pages settings will show the published URL.
7. Update the canonical URL and Open Graph URL in `index.html` to match the actual public URL.
8. If using a custom domain, configure it under Pages settings and follow GitHub's DNS/HTTPS instructions. Do not enable a custom domain until you control it.
9. Confirm `privacy-policy.html` and `404.html` work from the published site.

GitHub Pages project sites often live under a repository subdirectory. Internal navigation uses page anchors and relative file paths to work in this setup. If you later add more pages, continue using relative paths for internal assets and links.

## Local preview

You can open `index.html` directly in a browser for a quick layout check. For a more realistic local preview, run a static server from the project directory:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Testing checklist

- [ ] Check layout at mobile (320–390 px), tablet, laptop, and wide desktop sizes.
- [ ] Open and close the mobile navigation; test keyboard focus and Escape key.
- [ ] Follow every navigation item, CTA, footer link, product quote link, and privacy link.
- [ ] Confirm product cards populate the matching product in the inquiry form.
- [ ] Submit the form with required fields empty and with an invalid email.
- [ ] Configure Formspree and verify a real submission arrives at the correct inbox.
- [ ] Test network/offline or Formspree error handling; ensure success is never shown on failure.
- [ ] Configure and test WhatsApp on desktop and mobile.
- [ ] Check image loading, image alt text, keyboard focus, contrast, and browser console.
- [ ] Run Lighthouse (Performance, Accessibility, Best Practices, SEO) after deployment.
- [ ] Verify the canonical URL, Open Graph URL, page title, description, and favicon.
- [ ] Review privacy wording and ensure contact details are correct.
- [ ] Verify all product availability and regulatory statements remain accurate.

## Notes

- This is a static site. GitHub Pages does not run a backend or send email by itself; the form depends on Formspree or a similar third-party service.
- Product categories are presented as areas of exploration, not confirmed inventory.
- The India-to-Dubai map graphic is illustrative and does not claim existing offices, warehouses, routes, or distribution operations.
- The photos are remote Unsplash images. For a fully self-contained/offline website, download appropriately licensed image files into `assets/images/` and update the image `src` values.
- Google Fonts are imported remotely; fallback fonts are defined if they cannot load.
