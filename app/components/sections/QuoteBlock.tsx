import type { Quote } from "@/app/lib/quotes";
import { getQuote } from "@/app/lib/quotes";

/** Presentational block — also used as the Suspense fallback. */
export const QuoteContent = ({ text, author }: Quote) => (
  <>
    <p className="text-sm leading-6 text-[var(--soft)]">
      &ldquo;{text}&rdquo;
    </p>
    <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--muted)]">
      &mdash; {author}
    </p>
  </>
);

const QuoteBlock = async () => {
  const quote = await getQuote();
  return <QuoteContent {...quote} />;
};

export default QuoteBlock;
