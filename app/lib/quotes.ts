import { readFileSync } from "fs";
import { join } from "path";

export type Quote = {
  text: string;
  author: string;
};

/**
 * Two HTTPS sources, merged into one pool:
 *
 * 1. based-dev-quotes — curated programming quotes as static JSON on jsDelivr.
 *    https://github.com/jack-kitto/based-dev-quotes
 *    ~85% of it is community-sourced with `author: "based"`, so attribution
 *    and topic filters are required.
 *
 * 2. programming-quotes-api — 501 classic programming quotes on raw GitHub.
 *    https://github.com/mudroljub/programming-quotes-api
 *    Carries community ratings; entries are filtered by rating and wording so
 *    that generic life advice doesn't reach the hero.
 */
const BASED_DEV_QUOTES =
  "https://cdn.jsdelivr.net/gh/jack-kitto/based-dev-quotes@main/api/v1/all.json";

const PROGRAMMING_QUOTES =
  "https://raw.githubusercontent.com/mudroljub/programming-quotes-api/master/data/quotes.json";

const REVALIDATE_SECONDS = 3600;

/** Placeholder "authors" that exist in both datasets. */
const PLACEHOLDER_AUTHORS = new Set([
  "based",
  "unknown",
  "anonymous",
  "anon",
  "n/a",
  "none",
]);

/** Fictional or joke attributions we don't want in the hero. */
const JOKE_AUTHOR = /grug|homer simpson|sherlock|it crowd|yogi|murphy|coveyou/i;

/** At least one of these keeps a based-dev-quotes entry on-topic. */
const TOPIC_CATEGORIES = new Set([
  "engineering",
  "complexity",
  "debugging",
  "shipping",
  "tools",
  "unix",
  "suffering",
  "science",
]);

/** Categories that are never appropriate for the hero. */
const EXCLUDED_CATEGORIES = new Set(["shitpost", "funny", "humor"]);

/**
 * The classic dataset is on-topic by title but includes general wisdom, so an
 * entry must actually mention software to qualify.
 */
const SOFTWARE_TERMS =
  /\b(code|coding|program|programming|software|computer|computing|bug|debug|language|compil|algorithm|data|function|system|engineer|developer|refactor|test|deploy|type|api|network|internet|web|machine|hardware|memory|complexity|abstraction|codebase|runtime|source|tool)\b/i;

/** Keeps the hero to two or three lines. */
const MIN_LENGTH = 30;
const MAX_LENGTH = 130;

/** Below this community rating, a programming-quotes-api entry is dropped. */
const MIN_RATING = 4;

type BasedDevQuote = {
  text?: unknown;
  author?: unknown;
  categories?: unknown;
};

type RatedQuote = {
  text?: unknown;
  author?: unknown;
  rating?: unknown;
};

function isRealAuthor(author: unknown): author is string {
  if (typeof author !== "string") return false;
  const trimmed = author.trim();
  if (trimmed.length < 3) return false;
  if (PLACEHOLDER_AUTHORS.has(trimmed.toLowerCase())) return false;
  return !JOKE_AUTHOR.test(trimmed);
}

function isGoodLength(text: unknown): text is string {
  return (
    typeof text === "string" &&
    text.length >= MIN_LENGTH &&
    text.length <= MAX_LENGTH
  );
}

/** Curated dataset: needs an explicit software-craft category. */
function parseBasedDevQuotes(payload: unknown): Quote[] {
  const quotes = (payload as { quotes?: unknown })?.quotes;
  if (!Array.isArray(quotes)) return [];

  return quotes.flatMap((entry: BasedDevQuote) => {
    if (!isRealAuthor(entry.author) || !isGoodLength(entry.text)) return [];

    const categories = Array.isArray(entry.categories)
      ? entry.categories.filter((c): c is string => typeof c === "string")
      : [];

    if (categories.some((category) => EXCLUDED_CATEGORIES.has(category))) {
      return [];
    }
    if (!categories.some((category) => TOPIC_CATEGORIES.has(category))) {
      return [];
    }

    return [{ text: entry.text, author: entry.author.trim() }];
  });
}

/** Classic dataset: filtered by community rating and software wording. */
function parseProgrammingQuotes(payload: unknown): Quote[] {
  if (!Array.isArray(payload)) return [];

  return payload.flatMap((entry: RatedQuote) => {
    if (!isRealAuthor(entry.author) || !isGoodLength(entry.text)) return [];

    const rating = typeof entry.rating === "number" ? entry.rating : null;
    if (rating !== null && rating < MIN_RATING) return [];
    if (!SOFTWARE_TERMS.test(entry.text)) return [];

    return [{ text: entry.text, author: entry.author.trim() }];
  });
}

const SOURCES: Array<{ url: string; parse: (payload: unknown) => Quote[] }> = [
  { url: BASED_DEV_QUOTES, parse: parseBasedDevQuotes },
  { url: PROGRAMMING_QUOTES, parse: parseProgrammingQuotes },
];

/** Curated local list — used when every source is unreachable. */
export function getFallbackQuotes(): Quote[] {
  const filePath = join(process.cwd(), "data", "quotes.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Quote[];
}

function pick(list: Quote[]): Quote {
  return list[Math.floor(Math.random() * list.length)];
}

/** The same quote appears in both datasets, so de-duplicate by wording. */
function dedupe(quotes: Quote[]): Quote[] {
  const seen = new Set<string>();
  return quotes.filter(({ text }) => {
    const key = text.toLowerCase().replace(/\s+/g, " ").trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Return a random, properly attributed programming quote, drawn from every
 * source that responds. Each dataset is cached for an hour, so a quote can be
 * chosen per request without re-fetching.
 */
export async function getQuote(): Promise<Quote> {
  const results = await Promise.allSettled(
    SOURCES.map(async ({ url, parse }) => {
      const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
      if (!res.ok) throw new Error(`${url} responded ${res.status}`);
      return parse(await res.json());
    })
  );

  const pool = dedupe(
    results.flatMap((result) =>
      result.status === "fulfilled" ? result.value : []
    )
  );

  return pool.length > 0 ? pick(pool) : pick(getFallbackQuotes());
}

/** Deterministic quote for the streaming fallback (no network needed). */
export function getFallbackQuote(): Quote {
  return getFallbackQuotes()[0];
}
