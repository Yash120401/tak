# Yacht Affair · Concept B "Deep Water"

Static HTML pages for the Yacht Affair website, built on the approved Concept B design and filled with the client's supplied content (About Us, legal documents, contact details and YA logo).

This folder is self-contained and does not touch the Shopify theme files in the rest of the repository.

## Pages

| File | Page | Content source |
| --- | --- | --- |
| `index.html` | Home (Concept B) | Concept B, wired to the new pages, with the real logo, contact details and footer |
| `about.html` | About Us | About Us.pdf |
| `contact.html` | Contact | Information.docx, plus the topic e-mail addresses named in the legal documents |
| `privacy-policy.html` | Privacy Policy | Privacy Policy.pdf |
| `terms-of-use.html` | Terms of Use | Terms of Use.pdf |
| `cookie-policy.html` | Cookie Policy | Cookie Policy.pdf |
| `advertiser-agreement.html` | Advertiser Agreement | Advertiser Agreement.pdf |
| `yachts.html` | Yachts for sale (results with filters) | Sample listings from Concept B |
| `yacht.html` | Single yacht for sale | Sample listing; safety notes from the Terms of Use |
| `charter.html` | Yachts for charter (results with filters) | Sample listings |
| `charter-yacht.html` | Single charter yacht, with rates | Sample listing; charter notes from the Terms of Use |
| `advertiser.html` | Advertiser (brokerage) profile | Sample brokerage; disclosure from the Terms of Use |
| `market-intelligence.html` | Article list | Concept B articles plus sample titles |
| `article.html` | Single article (buyer's checklist) | Written for the prototype from the Terms' buyer advice |
| `advertise.html` | Advertise with us (List With Us) | Advertiser Agreement and Terms of Use (prices to be confirmed) |
| `register.html`, `sign-in.html` | Create account, sign in | Advertiser Agreement "I agree" step |
| `404.html` | Page not found | |

Listings, the brokerage profile and the article bodies are sample content for the design. Yachts, specifications, prices and "Example Yacht Brokers" are placeholders to be replaced with real data.

Legal text is reproduced word for word from the PDFs. The only edits are spacing fixes ("referrals.Third", "STRIPE,LLC"), links for e-mail addresses and section cross-references, and highlighting.

## Preview

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server --directory yacht-affair 8000
```

Add `?figma=1` to any page URL for the static, animation-free mode used for html.to.design imports.

## Structure

- `assets/css/site.css`: design tokens, header, footer and every shared or inner-page component
- `assets/css/home.css`: home page sections (hero, search, listings, insights, partners)
- `assets/js/site.js`: header, mobile menu, legal contents tracking and contact-form topic (`contact.html?topic=advertising`, `privacy`, `report` and so on)
- `assets/img/`: supplied YA logo (`ya-logo.svg`, `ya-logo.png`) and favicon

Photography is the same Unsplash placeholder set as Concept B.

## Open points for the client

1. **Legal drafts.** Text in square brackets in the PDFs (for example `[2]` business days, `[$100 / $500]`, `[EMAIL]`, `[insert link]`, "(add a web form)") is highlighted in amber on the pages, under a "Draft for review" note. These need confirming with counsel before launch, and the note removing.
2. **Positioning.** The Terms of Use and Advertiser Agreement state Yacht Affair is not a broker and gives no brokerage advice. The home page headline ("A new course for yacht brokerage") and the Services section (Yacht Sales & Acquisition, Owner Advisory) still carry Concept B's placeholder brokerage copy. Only the hero label was changed (to "Yacht marketplace · Sale & charter").
3. **Location.** The legal documents say Yacht Affair is based in Calgary, Alberta. The contact address supplied is in Vancouver. Concept B's Dubai office was removed because no Dubai details were supplied.
4. **Dates and addresses.** The Terms are dated October 12, 2026 and the other documents October 8, 2026. The Terms use contact@yachtaffair.com once, while every other reference is info@yachtaffair.com.
5. **Charter in the navigation.** A Charter item was added to the main navigation (the content describes a marketplace for sale and charter), and "List With Us" now opens the Advertise page.
6. **Package prices.** The Advertise page shows `[Price]` placeholders for the four packages until pricing is confirmed.
7. **Not built yet.** A Services page (its copy needs the client's real services, see point 2), the cookie consent banner and "Cookie settings" link the Cookie Policy describes, and the signed-in account area for managing listings.
8. **Forms.** The contact forms are front-end only and show a "prototype" message on submit.
