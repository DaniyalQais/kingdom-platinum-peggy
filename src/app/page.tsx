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
              className="relative grid overflow-hidden rounded-2xl sm:rounded-3xl border border-plum/20 bg-plum-deep shadow-[0_24px_50px_-20px_rgba(42,23,47,0.4)] lg:grid-cols-2"
              data-reveal
            >
              {/* Left Artwork Chamber */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-lavender to-lavender/80 px-6 py-12 sm:p-14 lg:p-16">
                <Image
                  src={bundle.image.src}
                  alt={bundle.image.alt}
                  width={bundle.image.width}
                  height={bundle.image.height}
                  sizes="(min-width: 1024px) 500px, 88vw"
                  className="h-auto w-full max-w-[27rem] object-contain drop-shadow-[0_24px_32px_rgba(56,34,57,0.25)] transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>

              {/* Right Content Chamber */}
              <div className="dark-surface flex flex-col justify-center px-6 py-10 text-ivory sm:px-12 lg:px-16 lg:py-16">
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-ivory/20 bg-ivory/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/90 backdrop-blur-xs">
                  Featured Digital Bundle
                </div>

                <h2 className="mt-4 text-[1.875rem] leading-[1.1] text-ivory sm:text-[2.25rem] lg:text-[2.5rem]">
                  {bundle.title}
                </h2>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-[1.625rem] sm:text-[1.875rem] font-medium text-ivory">
                    {formatPrice(bundle.priceCents)}
                  </span>
                  {bundle.compareAtPriceCents ? (
                    <span className="text-[1.125rem] font-normal text-ivory/50 line-through">
                      {formatPrice(bundle.compareAtPriceCents)}
                    </span>
                  ) : null}
                  <span className="rounded-full bg-blush/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-blush">
                    Best Value
                  </span>
                </div>

                {bundle.excerpt ? (
                  <p className="mt-4 max-w-md text-[15px] sm:text-base leading-[1.7] text-ivory/85">
                    {bundle.excerpt}
                  </p>
                ) : null}

                <div className="mt-8">
                  <BundleDialogButton product={bundle} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ABOUT PEGGY */}
        <section
          id="about"
          className={`border-t border-line/60 bg-ivory-deep ${sectionOffsetClass}`}
        >
          <Container className="py-16 sm:py-20 lg:py-24">
            <div
              className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
              data-reveal
            >
              <div className="mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:mx-0 lg:max-w-[25rem]">
                <div className="overflow-hidden rounded-2xl border border-line/80 bg-blush shadow-[0_20px_40px_-20px_rgba(56,34,57,0.22)]">
                  <Image
                    src={site.portrait.src}
                    alt={site.portrait.alt}
                    width={site.portrait.width}
                    height={site.portrait.height}
                    sizes="(min-width: 1024px) 400px, 88vw"
                    className="h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-ivory px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-soft shadow-xs">
                  About Peggy
                </div>

                <h2 className="mt-3 text-[1.875rem] leading-[1.1] text-plum sm:text-[2.5rem]">
                  {site.about.heading}
                </h2>

                <div className="mt-5 space-y-4 text-[15px] leading-[1.75] text-plum-soft sm:text-base">
                  {site.about.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <blockquote className="mt-8 rounded-2xl border border-plum/12 bg-ivory/80 p-5 sm:p-6 shadow-xs backdrop-blur-xs">
                  <p className="font-display text-[1.125rem] sm:text-[1.25rem] italic leading-[1.6] text-plum">
                    &ldquo;{site.about.verse.text}&rdquo;
                  </p>
                  <footer className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-plum-soft">
                    {site.about.verse.reference}
                  </footer>
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
