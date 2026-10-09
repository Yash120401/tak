# Yacht Affair · Concept B "Deep Water"

Static HTML pages for the Yacht Affair website, built on the approved Concept B design and laid out to the internal Website Design Brief (October 2026). Placeholder data is used where the client has not supplied content yet, as the brief allows.

This folder is self-contained and does not touch the Shopify theme files in the rest of the repository.

## Pages in the brief (section 6)

| File | Page | Notes |
| --- | --- | --- |
| `index.html` | Home | Concept B, with the real logo and both offices |
| `yachts.html` | Yachts for Sale | Filter bar (type, keyword, sort), card grid, pagination |
| `yacht.html` | Yacht Detail | Gallery with thumbnails and enlarge, price and status, summary strip, Request Full Specs / Deck Plans / Brochure (each opens a form), Listed for sale by panel, description, grouped specification, video, More from this broker, enquiry form |
| `broker.html` | Broker Profile | Logo, description, call / email / website, every listed yacht, enquiry form |
| `market-intelligence.html` | Market Intelligence | Category filter, article cards, pagination |
| `article.html` | Article | Headings, image, quote, list and table in the body, share buttons, related articles |
| `about.html` | About Us | Company story (client copy), team, both offices |
| `services.html` | Services | A block per service with image, description and enquiry link |
| `contact.html` | Contact | Form, both offices, map, social links |

Design deliverables (brief section 10):

- `design-direction.html`: colour palette with hex values and reasoning, typography, imagery treatment, grid and logo use
- `components.html`: the components in brief section 7, with their states

Also on the site, outside the brief's design scope: `privacy-policy.html`, `terms-of-use.html`, `cookie-policy.html`, `advertiser-agreement.html` (client's legal text, word for word) and `404.html`.

## Placeholder content

- Yachts, specifications, prices and the brokerage "Example Yacht Brokers" are sample data. The detail page uses a 38-character name, Price on Application, Under Offer and missing specification fields on purpose, to show the layout holds up (brief section 8).
- Team names, photos and biographies are placeholders.
- The Dubai office address and phone number are placeholders until confirmed (brief section 5).
- Services copy follows Concept B's four services; the client's own services content is still to come.
- Article text is written for the prototype.
- Photography is the Concept B Unsplash set.

## Preview and Figma

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server --directory yacht-affair 8000
```

Add `?figma=1` to any page for the static, animation-free mode used for html.to.design imports. The single-file Figma export (desktop, mobile and sheets) is generated from these pages.

## Structure

- `assets/css/site.css`: tokens and every shared component
- `assets/css/home.css`: home page sections
- `assets/js/site.js`: header, menu, gallery and enlarged view, request form, office map, contact topic, legal contents
- `assets/img/`: supplied YA logo and favicon

## Open points for the client

1. **Dubai office.** Address and phone number to confirm. The legal documents also say the company is based in Calgary, Alberta.
2. **Positioning.** The home page and Services describe brokerage services; the Terms of Use and Advertiser Agreement say Yacht Affair is not a broker. The wording needs to line up.
3. **Legal drafts.** Bracketed items in the legal PDFs are highlighted in amber on those pages for counsel to confirm.
4. **Content still to come.** Team, services copy, real listings and brokerage profiles.
5. **Forms.** Front-end only; they show a "prototype" message on submit.
