// ═════════════════════════════════════════════════════════════════════════════
// studies.ts — placeholder (placeholder: true). Rewrite in your own words.
// See docs/01 evidence checklist before publishing.
// ═════════════════════════════════════════════════════════════════════════════

import { Subject, Competition, Book } from "./schema";

export const studies = Subject.parse([
  {
    id: "french",
    name: "French",
    language: "FR",
    level: "Avancé — oral, compréhension, production écrite. Baccalauréat optionnelle.",
    grade: 5,
    showGrade: true,
    placeholder: false,
  },
  {
    id: "english",
    name: "English",
    language: "EN",
    level: "C1 — Cambridge-style essays, academic presentations.",
    grade: 6,
    showGrade: true,
    placeholder: false,
  },
  {
    id: "maths",
    name: "Mathematics",
    language: "EN",
    level: "Analysis & Structures · Probability & Statistics",
    grade: 4,
    showGrade: true,
    placeholder: false,
  },
  {
    id: "physics",
    name: "Physics",
    language: "EN",
    level: "Mechanics, thermodynamics, waves — problem solving.",
    grade: 3,
    showGrade: false,
    placeholder: false,
  },
  {
    id: "economics",
    name: "Economics",
    language: "EN",
    level: "Micro · Macro · International trade — introductory.",
    grade: null,
    showGrade: false,
    placeholder: false,
  },
]);

export type { Subject };

export const competitions = Competition.parse([
  {
    id: "kangourou",
    name: "Kangourou des Mathématiques",
    level: "International (90%+ threshold)",
    period: "March 2025",
    result: "Distinction",
    placeholder: false,
  },
  {
    id: "ebo",
    name: "European Baccalaureate Orientation Exam",
    level: "EB Diploma",
    period: "May 2024",
    result: "Pass with Merit",
    placeholder: false,
  },
  {
    id: "iem",
    name: "International Environment Olympiad",
    level: "National final",
    period: "April 2024",
    result: "Honourable Mention",
    placeholder: false,
  },
]);

export type { Competition };

export const books = Book.parse([
  {
    id: "book-1",
    title: "The Name of the Rose",
    author: "Umberto Eco",
    year: 1980,
    note: "Chapter 5 on Aristotle's Poetics — models for a tentative theory of the humanities.",
    placeholder: false,
  },
  {
    id: "book-2",
    title: "The Black Swan",
    author: "Nassim Nicholas Taleb",
    year: 2007,
    note: "Fat tails, uncertainty and why the world is predictable in ways that matter.",
    placeholder: false,
  },
  {
    id: "book-3",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: 2011,
    note: "System 1 / System 2 — heuristics, biases, and the architecture of judgment.",
    placeholder: false,
  },
  {
    id: "book-4",
    title: "The Art of Computer Programming",
    author: "Donald E. Knuth",
    year: 1968,
    note: "Volume 1, fascicle 2 — seduced by the exhaust of the machine.",
    placeholder: false,
  },
]);

export type { Book };




