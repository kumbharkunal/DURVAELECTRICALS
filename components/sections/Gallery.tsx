import { Figure } from '@/components/ui/Figure';
import { Lightbox } from '@/components/ui/Lightbox';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { installations } from '@/content/installations';

export function Gallery() {
  const items = installations.map(
    ({ id, image, width, height, alt, caption, location }) => ({
      id,
      image,
      width,
      height,
      alt,
      caption,
      location,
    }),
  );

  // Server-rendered so the build-time missing-file fallback still applies, then
  // handed to the client tile/lightbox component as children.
  const figures = installations.map((item) => (
    <Figure
      key={item.id}
      src={item.image}
      alt={item.alt}
      width={item.width}
      height={item.height}
      sizes={
        item.orientation === 'landscape'
          ? '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw'
          : '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw'
      }
    />
  ));

  return (
    <section
      id="installations"
      className="scroll-mt-28 border-y border-rule bg-mist py-20 md:py-28"
      aria-labelledby="installations-heading"
    >
      <div className="u-container">
        <div id="installations-heading">
          <SectionHeading lead="Photographs of the work, described the way an electrician would describe it. The specificity is the proof.">
            Recent installations
          </SectionHeading>
        </div>

        <Lightbox items={items} figures={figures} />
      </div>
    </section>
  );
}
