import Image from "next/image";
import Link from "next/link";
import { HeroArtwork } from "@/components/home/HeroArtwork";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BundleDialogButton } from "@/components/product/BundleDialogButton";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDialogProvider } from "@/components/product/ProductDialogProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { collections } from "@/content/collections";
import {
  getCollectionResources,
  getFeaturedBundle,
} from "@/content/products";
import { site } from "@/content/site";
import { formatPrice } from "@/lib/format";

const sectionOffsetClass = "scroll-mt-20 md:scroll-mt-24";

const contactRowClass =
  "contact-row group -mx-2 flex min-h-14 items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-[15px] border border-transparent transition-all duration-[var(--motion-hover)] hover:border-line/70 hover:bg-ivory-deep/80 focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2";

export default function HomePage() {
  const collection = collections[0];
  const bundle = getFeaturedBundle();
  const resources = getCollectionResources(collection.slug);
  const [devotional, guidedJournal] = resources;

  return (
    <ProductDialogProvider>
      <ScrollReveal />
      <div className="flex flex-1 flex-col">
        {/* HERO SECTION */}
        <section
          id="home"
          className={`relative overflow-hidden border-b border-line/50 bg-gradient-to-b from-lavender/95 via-lavender/80 to-ivory ${sectionOffsetClass}`}
        >
          {/* Subtle Ambient Radial Highlight & Background Atmosphere */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[32rem] w-[54rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-blush/40 via-lavender/30 to-transparent blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-blush/20 blur-2xl"
          />

          <Container className="relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              {/* Luxury Badge */}
              <div className="hero-enter inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 shadow-[0_4px_12px_rgba(56,34,57,0.06)] backdrop-blur-md">
                <span className="size-2 rounded-full bg-plum/70 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">
                  Grace Through Grief Collection
                </span>
              </div>

              <h1
                id="home-title"
                tabIndex={-1}
                className="hero-enter mt-5 text-balance text-[2.5rem] leading-[1.04] tracking-[-0.03em] text-plum sm:mt-6 sm:text-[3.25rem] lg:text-[3.65rem] xl:text-[4rem]"
                style={{ animationDelay: "calc(var(--motion-stagger) * 1)" }}
              >
                A little space for{" "}
                <span className="font-serif italic font-normal text-plum-deep underline decoration-blush/80 decoration-4 underline-offset-6">
                  reflection.
                </span>
              </h1>

              <p
                className="hero-enter mx-auto mt-5 max-w-lg text-[16px] leading-[1.75] text-plum-soft sm:mt-6 sm:text-[18px] lg:mx-0"
                style={{ animationDelay: "calc(var(--motion-stagger) * 2)" }}
              >
                Gentle devotionals, guided journals, planners, and workbooks designed by
                Peggy Saunders to bring comfort, faith, and purposeful healing.
              </p>

              <div
                className="hero-enter mt-8 flex flex-col items-center gap-3.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start"
                style={{ animationDelay: "calc(var(--motion-stagger) * 3)" }}
              >
                <ButtonLink
                  href="/#resources"
                  icon="arrow"
                  className="w-full shadow-[0_12px_28px_-6px_rgba(56,34,57,0.45)] transition-all hover:shadow-[0_16px_36px_-6px_rgba(56,34,57,0.55)] hover:-translate-y-0.5 sm:w-auto"
                >
                  Explore Resources
                </ButtonLink>
                <Link
                  href="/#featured-bundle"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-plum/20 bg-ivory/80 px-5 text-[15px] font-medium text-plum shadow-xs backdrop-blur-xs transition-all hover:border-plum hover:bg-ivory hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
                >
                  <span>Discover the Bundle</span>
                  <span aria-hidden="true" className="button-arrow">
                    &#8594;
                  </span>
                </Link>
              </div>

              {/* Verified Reassurance Trust Strip */}
              <div
                className="hero-enter mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-plum/10 pt-6 text-[12px] sm:text-[13px] font-medium text-plum/75 lg:justify-start"
                style={{ animationDelay: "calc(var(--motion-stagger) * 4)" }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-plum font-bold">✓</span> Instant Digital Access
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-plum font-bold">✓</span> 7 Verified Editions
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-plum font-bold">✓</span> Faith & Healing Centered
                </div>
              </div>
            </div>

            <HeroArtwork dominant={devotional} supporting={guidedJournal} />
          </Container>
        </section>

        {/* Legacy anchor retained so earlier "/#collection" links keep working */}
        <div
          id="collection"
          aria-hidden="true"
          className={sectionOffsetClass}
        />

        {/* RESOURCE COLLECTION */}
        <section id="resources" className={`relative ${sectionOffsetClass}`}>
          {/* Subtle atmospheric ambient glow behind the collection */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-lavender/30 to-transparent"
            aria-hidden="true"
          />

          <Container className="relative py-16 sm:py-20 lg:py-24">
            <div
              className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10 border-b border-plum/10 pb-8 sm:pb-10"
              data-reveal
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/80 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-soft shadow-xs backdrop-blur-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-plum/60" />
                  <span>The Collection</span>
                </div>
                <h2 className="mt-3.5 text-[2rem] leading-[1.08] text-plum sm:text-[2.5rem] lg:text-[2.75rem]">
                  {collection.name}
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-[15px] leading-relaxed text-plum-soft sm:text-base">
                  {collection.summary}
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-medium text-plum/75">
                  <span className="flex items-center gap-1.5">
                    <span className="text-plum font-bold">✓</span> 6 Curated Editions
                  </span>
                  <span className="text-plum/30">•</span>
                  <span>Instant PDF & EPUB</span>
                  <span className="text-plum/30">•</span>
                  <span>Verified Guidance</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3.5 sm:mt-12 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {resources.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  headingLevel={3}
                  revealGroup="resources"
                />
              ))}
            </div>
          </Container>
        </section>

        {/* FEATURED BUNDLE */}
        <section
          id="featured-bundle"
          className={`pb-16 sm:pb-20 lg:pb-24 ${sectionOffsetClass}`}
        >
          <Container>
            <div
              className="relative grid overflow-hidden rounded-2xl sm:rounded-3xl border border-plum/20 bg-gradient-to-br from-plum-deep via-[#311b37] to-plum-deep shadow-[0_28px_60px_-20px_rgba(42,23,47,0.45)] ring-1 ring-white/10 lg:grid-cols-2"
              data-reveal
            >
              {/* Left Artwork Chamber */}
              <div className="relative flex items-center justify-center bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.85)_0%,rgba(234,225,240,0.65)_50%,rgba(215,200,222,0.45)_100%)] px-6 py-12 sm:p-14 lg:p-16">
                {/* Floating 2-in-1 Pill */}
                <span className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-plum/12 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-plum shadow-xs backdrop-blur-md">
                  <span className="text-plum font-bold">✦</span> 2-in-1 Digital Collection
                </span>

                <Image
                  src={bundle.image.src}
                  alt={bundle.image.alt}
                  width={bundle.image.width}
                  height={bundle.image.height}
                  sizes="(min-width: 1024px) 500px, 88vw"
                  className="h-auto w-full max-w-[27rem] object-contain drop-shadow-[0_24px_35px_rgba(56,34,57,0.30)] transition-transform duration-500 ease-out hover:scale-[1.03]"
                />
              </div>

              {/* Right Content Chamber */}
              <div className="dark-surface flex flex-col justify-center px-6 py-10 text-ivory sm:px-12 lg:px-16 lg:py-16">
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-ivory/20 bg-ivory/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/90 backdrop-blur-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-blush" />
                  <span>Featured Digital Bundle</span>
                </div>

                <h2 className="mt-4 text-[1.875rem] leading-[1.1] text-ivory sm:text-[2.25rem] lg:text-[2.6rem]">
                  Grace Through Grief <span className="font-serif italic font-normal text-blush">Bundle</span>
                </h2>

                <div className="mt-5 flex flex-wrap items-baseline gap-3">
                  <span className="text-[2rem] sm:text-[2.25rem] font-bold tracking-tight text-ivory">
                    {formatPrice(bundle.priceCents)}
                  </span>
                  {bundle.compareAtPriceCents ? (
                    <span className="text-[1.25rem] font-normal text-ivory/45 line-through">
                      {formatPrice(bundle.compareAtPriceCents)}
                    </span>
                  ) : null}
                  <span className="rounded-full border border-blush/30 bg-blush/15 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-blush shadow-xs">
                    Save $70 • 72% Off
                  </span>
                </div>

                {bundle.excerpt ? (
                  <p className="mt-4 max-w-lg text-[15px] sm:text-base leading-[1.75] text-ivory/85">
                    {bundle.excerpt}
                  </p>
                ) : null}

                {/* Bundle Inclusions Checklist */}
                <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                  <div className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-ivory/90">
                    <span className="text-blush font-bold shrink-0">✓</span>
                    <span><strong>Breakthrough Processing Journal:</strong> Daily anchors, permission slips & glimmer trackers.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-ivory/90">
                    <span className="text-blush font-bold shrink-0">✓</span>
                    <span><strong>Grace Through Grief Ebook:</strong> Restorative guide by Peggy Saunders to rebuild after loss.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-ivory/90">
                    <span className="text-blush font-bold shrink-0">✓</span>
                    <span><strong>Multi-Device Ready:</strong> Instant PDF & tablet-optimized interactive format.</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
                  <BundleDialogButton product={bundle} />
                  <span className="text-[12px] font-medium text-ivory/60">
                    Instant digital download • Lifetime access
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ABOUT PEGGY */}
        <section
          id="about"
          className={`relative border-t border-line/60 bg-ivory-deep overflow-hidden ${sectionOffsetClass}`}
        >
          {/* Ambient warm radial glow behind the portrait */}
          <div
            className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,224,231,0.65)_0%,rgba(246,241,234,0)_70%)]"
            aria-hidden="true"
          />

          <Container className="relative py-16 sm:py-20 lg:py-24">
            <div
              className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
              data-reveal
            >
              {/* Left Column: Architectural Portrait Stage */}
              <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[23rem] lg:mx-0 lg:max-w-[26rem]">
                {/* Backdrop decorative aura */}
                <div
                  className="pointer-events-none absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-tr from-lavender/60 via-blush/40 to-white/70 shadow-lg blur-xs"
                  aria-hidden="true"
                />

                {/* Primary Framed Portrait */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-white/90 bg-blush shadow-[0_24px_50px_-15px_rgba(56,34,57,0.25)] ring-1 ring-plum/10">
                  <Image
                    src={site.portrait.src}
                    alt={site.portrait.alt}
                    width={site.portrait.width}
                    height={site.portrait.height}
                    sizes="(min-width: 1024px) 420px, 88vw"
                    className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>

                {/* Floating Author Signature Seal Badge */}
                <div className="absolute -bottom-4 right-3 sm:-bottom-5 sm:right-5 z-10 flex items-center gap-3 rounded-2xl border border-plum/12 bg-white/95 px-4 py-2.5 shadow-[0_14px_30px_-6px_rgba(56,34,57,0.22)] backdrop-blur-md">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-plum to-plum-deep text-[12px] font-bold tracking-wider text-ivory shadow-xs">
                    PS
                  </div>
                  <div>
                    <p className="text-[12px] font-bold leading-tight text-plum">Peggy Saunders</p>
                    <p className="text-[10px] font-medium tracking-wide text-plum-soft">Founder & Author</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Bio & Scripture Plaque */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/80 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-soft shadow-xs backdrop-blur-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-plum/60" />
                  <span>About The Author</span>
                </div>

                <h2 className="mt-3.5 text-[2rem] leading-[1.08] text-plum sm:text-[2.5rem] lg:text-[2.75rem]">
                  Meet <span className="font-serif italic font-normal text-plum-deep">Peggy Saunders</span>
                </h2>

                <p className="mt-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-plum-soft/80">
                  Faith-Driven Entrepreneur • Digital Creator • Author
                </p>

                <div className="mt-6 space-y-4 text-[15px] leading-[1.78] text-plum-soft sm:text-[16px]">
                  {site.about.paragraphs.map((paragraph, index) => (
                    <p key={index} className={index === 0 ? "text-[16px] sm:text-[17px] font-normal leading-[1.8] text-plum/90" : undefined}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Author Trust Pillars */}
                <div className="mt-7 flex flex-wrap items-center gap-2 text-[11px] sm:text-[12px] font-medium text-plum/80">
                  <span className="rounded-full border border-plum/12 bg-white/70 px-3 py-1 shadow-xs">
                    ✦ Grief Healing Lifeline
                  </span>
                  <span className="rounded-full border border-plum/12 bg-white/70 px-3 py-1 shadow-xs">
                    ✦ Biblical Merch Planner
                  </span>
                  <span className="rounded-full border border-plum/12 bg-white/70 px-3 py-1 shadow-xs">
                    ✦ Faith-Rooted Guidance
                  </span>
                </div>

                {/* Luxury Scripture Plaque */}
                <blockquote className="relative mt-8 overflow-hidden rounded-2xl sm:rounded-3xl border border-plum/15 bg-gradient-to-br from-white/95 via-ivory/90 to-lavender/30 p-6 sm:p-7 shadow-[0_14px_32px_-8px_rgba(56,34,57,0.10)] backdrop-blur-sm">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-4 -left-1 font-serif text-[6rem] leading-none text-plum/[0.06] select-none"
                  >
                    “
                  </span>
                  <div className="relative">
                    <p className="font-display text-[1.125rem] sm:text-[1.25rem] italic leading-[1.65] text-plum">
                      &ldquo;{site.about.verse.text}&rdquo;
                    </p>
                    <footer className="mt-4 flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.18em] text-plum/70">
                      <span className="h-px w-6 bg-plum/30" />
                      <span>{site.about.verse.reference}</span>
                    </footer>
                  </div>
                </blockquote>
              </div>
            </div>
          </Container>
        </section>

        {/* JOIN COMMUNITY */}
        <section
          id="community"
          className={`border-y border-line/60 bg-gradient-to-b from-blush/90 to-blush ${sectionOffsetClass}`}
        >
          <Container className="py-16 sm:py-20 lg:py-24">
            <div
              className="mx-auto max-w-2xl text-center"
              data-reveal
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-ivory/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-plum shadow-xs">
                Community
              </div>

              <h2 className="mt-3 text-[1.875rem] leading-[1.1] text-plum sm:text-[2.5rem]">
                {site.community.heading}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.75] text-plum-soft sm:text-base">
                {site.community.description}
              </p>

              <div className="mt-8 flex flex-col items-center">
                <ButtonLink
                  href={site.community.href}
                  external
                  icon="external"
                  className="w-full shadow-[0_8px_20px_-8px_rgba(56,34,57,0.35)] sm:w-auto"
                >
                  Join the Community
                </ButtonLink>
                <p className="mt-2.5 text-xs leading-5 text-plum-soft">
                  Opens the official community signup page in a new tab.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CONTACT */}
        <section id="contact" className={sectionOffsetClass}>
          <Container className="py-16 sm:py-20 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-ivory-deep px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-soft">
                  Contact
                </div>
                <h2 className="mt-3 text-[1.875rem] leading-[1.1] text-plum sm:text-[2.5rem]">
                  Get in touch.
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-plum-soft sm:text-base">
                  {site.contact.intro}
                </p>
              </div>

              <div>
                <ul className="divide-y divide-line/60 border-y border-line/60">
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className={contactRowClass}
                    >
                      <span className="shrink-0 font-medium text-plum">Email</span>
                      <span className="break-all text-right text-[14px] sm:text-[15px] text-plum-soft underline decoration-line decoration-1 underline-offset-4 transition-colors group-hover:text-plum sm:break-normal">
                        {site.contact.email}
                      </span>
                    </a>
                  </li>
                  {site.contact.socials.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className={contactRowClass}
                      >
                        <span className="font-medium text-plum">
                          {social.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="contact-arrow text-base text-plum-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-plum"
                        >
                          &#8599;
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-5 text-plum-soft">
                  Social links open in a new tab.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </ProductDialogProvider>
  );
}
