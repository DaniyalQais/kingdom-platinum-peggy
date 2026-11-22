# Kingdom Platinum Solutions — Storefront Preview

A premium digital-product storefront preview for Kingdom Platinum Solutions, LLC, focused on the **Grace Through Grief** collection.

Prospective-client design preview by **The Nexus Dynamics**.

- Full project scope, verified catalog, and content rules: [PROJECT_BRIEF.md](./PROJECT_BRIEF.md)
- No backend, authentication, payments, or admin dashboard
- Built with Next.js App Router, TypeScript, and Tailwind CSS

## Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build
npm run lint
```

## Content

Product titles, prices, imagery references, and the bundle description live in `src/content/`. Only verified public information is included; products without a public description intentionally have none.

**Purpose & Profit** is not published — its products and details are unverified.

## Preview deployment (Vercel)

This is a client design preview, not the official store. Every route is marked `noindex, nofollow` in page metadata and in the `X-Robots-Tag` response header. That discourages search indexing; it is **not** access protection — anyone with the URL can open the preview.

The app uses the Next.js App Router with Cache Components and Partial Prefetching. Deploy it as a normal Next.js project; do not use `next export` or a static output directory.

1. The site is committed on `main` and published at <https://github.com/DaniyalQais/Kingdom-Platinum>.
2. In Vercel, choose **Add New → Project** and import that repository. Use the repository root.
3. Keep the detected **Next.js** framework preset and these settings:
   - Install Command: `npm install` (or `npm ci`; the lockfile is committed)
   - Build Command: `npm run build`
   - Output Directory: default (`.next`)
   - Node.js: 22.x
4. No environment variables are required.
5. Deploy and use the generated `*.vercel.app` URL.

Do not connect `kingdomplatinumsolutionsllc.com` to this project.
