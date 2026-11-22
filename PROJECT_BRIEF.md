# Kingdom Platinum Solutions — Storefront Preview

**Client:** Kingdom Platinum Solutions, LLC (Peggy Saunders)
**Prepared by:** The Nexus Dynamics
**Type:** Prospective-client design preview
**Status:** Preview-ready — complete single-page site on `/`, with product dialogs, verified About, community, and contact sections
**Verified content captured:** 2026-11-21 (catalog) and 2026-11-22 (About, community, contact)

---

## 1. Purpose

A premium, responsive single-page digital-product storefront preview for the **Grace Through Grief** collection. The root page covers the collection, the featured bundle, Peggy Saunders, the community, and contact details. Product detail routes remain as direct-link fallbacks. The preview has no backend, authentication, payment processing, cart, or admin dashboard.

Suggested marketing copy is draft copy for client review. Nothing in this project is a published promise, discount claim, or product specification.

## 2. Verified source material

Primary sources observed during the build:

- Homepage: <https://kingdomplatinumsolutionsllc.com/home-page>
- About Us: <https://kingdomplatinumsolutionsllc.com/about_us>
- Community: <https://kingdomplatinumsolutionsllc.com/join_our_community>
- Product listing: <https://kingdomplatinumsolutionsllc.com/products_list>
- Product pages: `https://kingdomplatinumsolutionsllc.com/product_details/product/<id>`

Verified business facts used:

- Legal name: **Kingdom Platinum Solutions, LLC**
- Founder: **Peggy Saunders**
- About bio, portrait, community copy, contact email, and official social profiles are published on the client's site and reproduced in the preview.
- Pricing is in USD. Current and compare-at prices are taken from the public product listing.

Full provenance, verbatim copy, and unresolved ambiguities are recorded in `CONTENT_SOURCES.md`.

## 3. Verified catalog — Grace Through Grief

| Product | Type | Price | Compare-at | Public description |
| --- | --- | --- | --- | --- |
| Grace Through Grief Bundle | Bundle | $27 | $97 | Yes — verbatim |
| 30 Days from Grief to Grace Devotional | Devotional | $17 | $27 | Not published |
| From Grief to Grace Guided Journal | Guided Journal | $17 | $27 | Not published |
| Prayers Through The Pain Prayer Journal | Prayer Journal | $17 | $27 | Not published |
| Still Remembering You A Memory Keepsake Workbook | Keepsake Workbook | $17 | $27 | Not published |
| The Gentle Healing Planner | Planner | $17 | $27 | Not published |
| Together Through Grief Workbook | Workbook | $17 | $27 | Not published |

Product covers, the brand logo, and the Peggy Saunders portrait are stored locally under `public/images/`. Exact source URLs, dimensions, and verification notes are recorded in `CONTENT_SOURCES.md`.

## 4. Content rules

- **Purpose & Profit is not published.** Its products and details are unverified; no section, collection, route, or placeholder is created.
- Do not invent testimonials, customer counts, credentials, personal history, product contents, discounts, or promises.
- Do not assume file formats or delivery terms. The only format statement in scope is the bundle description's public reference to a journal and ebook.
- The About bio, community description, and Proverbs 3:5-6 verse are client-published content, reproduced verbatim.
- The community section links to the client's live HighLevel signup page. The form is not reimplemented or embedded, and no success state is faked.
- The Contact section uses the email address displayed in the client's footer. No phone number, address, or response-time promise is invented.
- Displayed prices and compare-at prices must be re-confirmed with the client before the preview is presented as current.
- Keep developer notes out of the customer-facing interface.

## 5. Design direction

Editorial storefront: warm-white base, full-bleed lavender hero, deep-plum featured-bundle panel, ivory-deep About band, blush Community band, and a quiet contact list. Fraunces for hero, section, and detail headings; Manrope for body copy, navigation, buttons, prices, and product titles. Generous spacing, hairline borders, 8px radii, and restrained motion.

| Token | Value |
| --- | --- |
| Ivory (page) | `#FCFAF7` |
| Ivory deep (About surface) | `#F6F1EA` |
| Blush (Community surface, portrait frame) | `#F4E0E7` |
| Lavender (hero, bundle artwork, dialog artwork) | `#EAE1F0` |
| Plum (primary text and buttons) | `#382239` |
| Plum deep (featured bundle panel, dialog backdrop) | `#2A172F` |
| Plum soft (secondary text) | `#655A65` |
| Line (borders) | `#DDD4DE` |

Typography: Fraunces 500 (display) and Manrope 400/500/600 (body), loaded through `next/font`. Page background, secondary text, and button combinations were checked for readable contrast.

## 6. Tech stack

- Next.js 16.4.6 — App Router, Turbopack, Cache Components
- React 19.3.0
- TypeScript 5
- Tailwind CSS 4.3.3
- npm
- No database, CMS, auth, or payment integration

## 7. Structure

```
public/
  images/brand/                Brand logo and Peggy Saunders portrait
  images/products/             Seven verified product covers
src/
  app/
    layout.tsx                 Root shell, fonts, metadata
    page.tsx                   Single-page site: hero, resources, bundle,
                               About, community, contact
    globals.css                Brand tokens and base styles
    not-found.tsx              Branded 404
    collections/[slug]/        Collection route
    products/[slug]/           Product detail route for all seven products
  components/
    layout/                    Sticky header, desktop nav, mobile menu,
                               active-section hook, footer
    home/                      Hero artwork composition
    product/                   Product card, dialog provider, bundle button
    ui/                        Container, button link, button styles
  content/                     Verified catalog and site content
  lib/                         Types and formatting helpers
CONTENT_SOURCES.md             Asset provenance and verification record
```

## 8. Current status

Complete:

- Project scaffold and dependencies
- Brand tokens, typography, and base styles
- Authentic logo, seven verified covers, and the verified portrait served locally
- Sticky header: logo links to `/#home`; desktop links for Resources, About, Community, and Contact; "Explore Resources" CTA; mobile menu with the same destinations
- Active-section indicator driven by scroll position, with `aria-current="location"`
- Single-page root layout in the briefed order: hero, resources, featured bundle, About Peggy, community, contact
- Anchor offsets below the sticky header, including a legacy `#collection` anchor at Resources
- Hero focused on the collection, with "Explore Resources" and "Discover the Bundle" actions
- Six-resource responsive grid; each product opens an accessible native `<dialog>` from its image, title, or "View details"
- Featured bundle panel whose main action opens the bundle dialog
- Verified About Peggy section with portrait, verbatim bio, and Proverbs 3:5-6 quotation
- Community section using verified copy and linking to the client's live signup page
- Contact section with verified email mailto and official Facebook, Instagram, and TikTok links
- Product detail routes retained at `/products/[slug]` with breadcrumbs, verified data, related resources, and the external "View on Current Store" link
- Functional collection route with illustrated product cards
- Preview title, noindex metadata and response header, and brand favicon
- 44px mobile tap targets for navigation, dialog controls, product links, footer, and contact rows
- Branded 404
- Documentation: `CONTENT_SOURCES.md` and this brief

Next:

- Client confirmation of the primary email address (two are published)
- Copy review of the draft headline and section labels
- Decision on whether the community form should ever be embedded

## 9. Local development

```bash
npm run dev
npm run build
npm run lint
```

Environment note: the C: drive was nearly full during setup, so npm's temp directory is `D:\Qoder\tmp`. `node_modules` and `.next` are normal local directories. If dependencies are ever reinstalled, run with `TMP` and `TEMP` pointed at a drive with free space.

Build verification: `npm run build`, TypeScript, and ESLint on `src` pass as of 2026-11-22.

## 10. Open items for the client

1. Confirm which published email address should be primary (`peggy.saunders1@aol.com` is displayed in the preview).
2. Confirm current prices, compare-at prices, and whether sale pricing should appear.
3. Provide approved descriptions, formats, and delivery terms for each product.
4. Supply Purpose & Profit product details before that collection is added.
5. Approve final marketing copy, including the draft headline and section labels.
6. Confirm whether the HighLevel community form should remain a link or be embedded later.
7. Confirm the product imagery, portrait, and logo usage rights and final brand treatment.
