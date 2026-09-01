import { SectionHeading } from '@/components/ui/SectionHeading';
import { reviews } from '@/content/demo';

/**
 * No stars, no numeric rating, no review count — deliberately.
 *
 * Five gold stars beside invented text is the thing that makes a page read as
 * fake, and an aggregate rating that does not exist would be a claim we cannot
 * support. A paragraph about a loose neutral in the DB does the opposite. No
 * card chrome either: the specificity is the design.
 */
export function Reviews() {
  return (
    <section
      id="reviews"
      className="scroll-mt-28 py-20 md:py-28"
      aria-labelledby="reviews-heading"
    >
      <div className="u-container">
        <div id="reviews-heading">
          <SectionHeading>What customers say</SectionHeading>
        </div>

        <ul className="mt-12 grid gap-x-14 gap-y-10 border-t border-rule pt-10 md:mt-16 md:grid-cols-2">
          {reviews.map((review) => (
            <li key={review.id} className="break-inside-avoid">
              <blockquote>
                <p className="u-measure text-navy">{review.body}</p>
                <footer className="text-body-sm mt-3 text-slate">
                  <cite className="font-medium text-navy not-italic">{review.name}</cite>
                  <span className="mt-0.5 block">
                    {review.locality} — {review.vehicle}
                  </span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
