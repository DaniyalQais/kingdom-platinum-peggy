import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-24">
      <Container className="max-w-xl text-center">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-plum-soft">
          Page not found
        </p>
        <h1 className="mt-4 text-[2.5rem] leading-[1.06] text-plum sm:text-[3rem]">
          This page has quietly moved on.
        </h1>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/" icon="arrow">
            Return home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
