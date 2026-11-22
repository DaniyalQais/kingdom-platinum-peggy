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

const eyebrowClass =
  "text-[12px] font-medium uppercase tracking-[0.14em] text-plum-soft";

const h2Class =
  "mt-3 text-[1.875rem] leading-[1.1] text-plum sm:text-[2.5rem]";

const sectionOffsetClass = "scroll-mt-20 md:scroll-mt-24";

const contactRowClass =
  "contact-row -mx-2 flex min-h-14 items-center justify-between gap-4 rounded-lg px-2 py-3 text-[15px]";

export default function HomePage() {
  const collection = collections[0];
  const bundle = getFeaturedBundle();
  const resources = getCollectionResources(collection.slug);
  const [devotional, guidedJournal] = resources;

  return (
    <ProductDialogProvider>
      <ScrollReveal />
      <div className="flex flex-1 flex-col">
        <section id="home" className={`bg-lavender ${sectionOffsetClass}`}>
          <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <p className={`${eyebrowClass} hero-enter`}>
                Grace Through Grief
              </p>
              <h1
                id="home-title"
                tabIndex={-1}
                className="hero-enter mt-5 text-balance text-[2.375rem] leading-[1.06] tracking-[-0.02em] text-plum sm:mt-6 sm:text-[3rem] lg:text-[3.5rem] xl:text-[3.75rem]"
                style={{ animationDelay: "calc(var(--motion-stagger) * 1)" }}
              >
                A little space for reflection.
              </h1>
              <p
                className="hero-enter mx-auto mt-5 max-w-md text-base leading-[1.65] text-plum-soft sm:mt-6 sm:text-lg lg:mx-0"
                style={{ animationDelay: "calc(var(--motion-stagger) * 2)" }}
              >
                Explore the Grace Through Grief collection of devotionals,
                journals, planners, and workbooks.
              </p>
              <div
                className="hero-enter mt-6 flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start"
                style={{ animationDelay: "calc(var(--motion-stagger) * 3)" }}
              >
                <ButtonLink
                  href="/#resources"
                  icon="arrow"
                  className="w-full sm:w-auto"
                >
                  Explore Resources
                </ButtonLink>
                <Link
                  href="/#featured-bundle"
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm px-1 text-[15px] font-medium text-plum underline decoration-plum/30 decoration-1 underline-offset-4 transition-colors hover:decoration-plum"
                >
                  Discover the Bundle
                  <span aria-hidden="true" className="button-arrow">
                    &#8594;
                  </span>
                </Link>
              </div>
            </div>

            <HeroArtwork dominant={devotional} supporting={guidedJournal} />
          </Container>
        </section>

        {/* Legacy anchor retained so earlier "/#collection" links keep working. */}
        <div
          id="collection"
          aria-hidden="true"
          className={sectionOffsetClass}
        />

        <section id="resources" className={sectionOffsetClass}>
          <Container className="py-16 lg:py-24">
            <div
              className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
              data-reveal
            >
              <div>
                <p className={eyebrowClass}>The Collection</p>
                <h2 className={h2Class}>{collection.name}</h2>
              </div>
              <p className="max-w-sm text-[15px] leading-6 text-plum-soft sm:text-base">
                {collection.summary}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 sm:gap-x-6 sm:gap-y-12 lg:mt-16 lg:grid-cols-3 lg:gap-x-8">
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

        <section
          id="featured-bundle"
          className={`pb-16 lg:pb-24 ${sectionOffsetClass}`}
        >
          <Container>
            <div
              className="grid overflow-hidden rounded-lg bg-plum-deep lg:grid-cols-2"
              data-reveal
            >
              <div className="flex items-center justify-center bg-lavender px-6 py-12 sm:p-12">
                <Image
                  src={bundle.image.src}
                  alt={bundle.image.alt}
                  width={bundle.image.width}
                  height={bundle.image.height}
                  sizes="(min-width: 1024px) 480px, 88vw"
                  className="h-auto w-full max-w-[26rem] drop-shadow-[0_20px_26px_rgba(56,34,57,0.18)]"
                />
              </div>

              <div className="dark-surface flex flex-col justify-center px-6 py-12 text-ivory sm:px-12 lg:px-16 lg:py-16">
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-ivory/75">
                  Featured Bundle
                </p>
                <h2 className="mt-3 text-[1.75rem] leading-[1.12] text-ivory sm:text-[2.25rem] lg:text-[2.5rem]">
                  {bundle.title}
                </h2>
                <p className="mt-4 text-[1.375rem] font-medium text-ivory">
                  {formatPrice(bundle.priceCents)}
                </p>
                {bundle.excerpt ? (
                  <p className="mt-4 max-w-md text-base leading-[1.65] text-ivory/85">
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

        <section
          id="about"
          className={`border-t border-line bg-ivory-deep ${sectionOffsetClass}`}
        >
          <Container className="py-16 lg:py-24">
            <div
              className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
              data-reveal
            >
              <div className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-[25rem]">
                <div className="overflow-hidden rounded-lg bg-blush">
                  <Image
                    src={site.portrait.src}
                    alt={site.portrait.alt}
                    width={site.portrait.width}
                    height={site.portrait.height}
                    sizes="(min-width: 1024px) 400px, 88vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="max-w-xl">
                <p className={eyebrowClass}>About Peggy</p>
                <h2 className={h2Class}>{site.about.heading}</h2>

                <div className="mt-5 space-y-4 text-[15px] leading-[1.75] text-plum-soft sm:text-base">
                  {site.about.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <blockquote className="mt-8 border-l-2 border-plum/20 pl-5">
                  <p className="font-display text-[1.125rem] leading-[1.5] text-plum sm:text-[1.25rem]">
                    &ldquo;{site.about.verse.text}&rdquo;
                  </p>
                  <footer className="mt-2 text-[12px] font-medium uppercase tracking-[0.14em] text-plum-soft">
                    {site.about.verse.reference}
                  </footer>
                </blockquote>
              </div>
            </div>
          </Container>
        </section>

        <section
          id="community"
          className={`bg-blush ${sectionOffsetClass}`}
        >
          <Container className="py-16 lg:py-20">
            <div
              className="mx-auto max-w-2xl text-center"
              data-reveal
            >
              <p className={eyebrowClass}>Community</p>
              <h2 className={h2Class}>{site.community.heading}</h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.75] text-plum-soft sm:text-base">
                {site.community.description}
              </p>
              <div className="mt-8 flex flex-col items-center">
                <ButtonLink
                  href={site.community.href}
                  external
                  icon="arrow"
                  className="w-full sm:w-auto"
                >
                  Join the Community
                </ButtonLink>
                <p className="mt-2 text-xs leading-5 text-plum-soft">
                  Opens the current community signup page in a new tab.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section id="contact" className={sectionOffsetClass}>
          <Container className="py-16 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <p className={eyebrowClass}>Contact</p>
                <h2 className={h2Class}>Get in touch.</h2>
                <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-plum-soft sm:text-base">
                  {site.contact.intro}
                </p>
              </div>

              <div>
                <ul className="divide-y divide-line border-y border-line">
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className={contactRowClass}
                    >
                      <span className="font-medium text-plum">Email</span>
                      <span className="text-right text-plum-soft underline decoration-line decoration-1 underline-offset-4">
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
                          className="contact-arrow text-plum-soft"
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
