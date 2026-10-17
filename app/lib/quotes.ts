import { readFileSync } from "fs";
import { join } from "path";

export type Quote = {
  text: string;
  author: string;
};

/** Local curated pool — no network involved. */
function loadQuotes(): Quote[] {
  const filePath = join(process.cwd(), "data", "quotes.json");
  return JSON.parse(readFileSync(filePath, "utf-8")) as Quote[];
}

function pick(list: Quote[]): Quote {
  return list[Math.floor(Math.random() * list.length)];
}

/** A random quote from the local pool (server components / RSC). */
export function getQuote(): Quote {
  return pick(loadQuotes());
}

/** Deterministic quote for the streaming fallback (no network needed). */
export function getFallbackQuote(): Quote {
  return loadQuotes()[0];
}
