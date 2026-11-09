// ═════════════════════════════════════════════════════════════════════════════
// books.ts — placeholder (placeholder: true). Rewrite with real books.
// ═════════════════════════════════════════════════════════════════════════════

import { Book } from "./schema";

export const books = Book.parse([
  {
    id: "book-1",
    title: "The Name of the Rose",
    author: "Umberto Eco",
    year: 1980,
    note: "Chapter 5 on Aristotle's Poetics — models for a tentative theory of the humanities.",
    placeholder: true,
  },
  {
    id: "book-2",
    title: "The Black Swan",
    author: "Nassim Nicholas Taleb",
    year: 2007,
    note: "Fat tails, uncertainty and why the world is predictable in ways that matter.",
    placeholder: true,
  },
  {
    id: "book-3",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: 2011,
    note: "System 1 / System 2 — heuristics, biases, and the architecture of judgment.",
    placeholder: true,
  },
  {
    id: "book-4",
    title: "The Art of Computer Programming",
    author: "Donald E. Knuth",
    year: 1968,
    note: "Volume 1, fascicle 2 — seduced by the exhaust of the machine.",
    placeholder: true,
  },
]);

export type { Book };
