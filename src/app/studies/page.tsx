import { Metadata } from "next";
import { Plate } from "@/components/ui/Plate";
import { favouriteMathAreas } from "@/lib/content";
import { studies, competitions, books } from "@/content/studies";
import type { Subject, Competition, Book } from "@/content/schema";

export const metadata: Metadata = { title: "Studies" };

export default function StudiesPage() {
  const subjects = studies as unknown as Subject[];
  const competitionsList = competitions as unknown as Competition[];
  const booksList = books as unknown as Book[];
  const favouriteAreas = favouriteMathAreas;

  return (
    <Plate coordinate="§04 · (x 0.00, y 0.00)">
      <h1 className="font-display text-2xl">Studies</h1>

      {/* (a) "Transcript" Plate listing EB subjects/languages */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="plate p-4 border rounded-md hover:border-signal transition-colors"
          >
            <span className="label text-sm uppercase tracking-wider text-fg-2 mb-2 block">
              {subject.language}
            </span>
            <h3 className="font-display text-lg">{subject.name}</h3>
            {subject.showGrade && subject.grade !== null ? (
              <p className="mt-2 font-mono text-fg-3">
                Level {subject.level} — Grade {subject.grade}/6
              </p>
            ) : (
              <p className="mt-2 font-mono text-fg-3">{subject.level}</p>
            )}
          </div>
        ))}
      </section>

      {/* (b) Competitions list */}
      <section className="mt-8">
        <h2 className="font-display text-xl mb-4">Competitions</h2>
        <ul className="space-y-2 text-fg-3">
          {competitionsList.map((comp) => (
            <li key={comp.id} className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: "var(--azure)" }} />
              <span>
                <strong>{comp.name}</strong> {comp.level}
              </span>
              {comp.result && <span className="ml-2 text-signal">({comp.result})</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* (c) "What I love in maths" tag cloud */}
      <section className="mt-8 grid grid-cols-2 gap-3">
        {favouriteAreas.map((area) => (
          <span
            key={area}
            className="inline-block px-3 py-1.5 bg-bg-2 rounded text-[0.75rem] font-mono text-fg-3 hover:bg-signal hover:text-bg"
          >
            {area}
          </span>
        ))}
      </section>

      {/* (d) Books as a shelf with one-line takeaways */}
      <section className="mt-8">
        <h2 className="font-display text-xl mb-4">Reading List</h2>
        <div className="grid grid-cols-2 gap-4">
          {booksList.map((book: Book) => (
            <div
              key={book.id}
              className="plate p-3 border rounded-md border-line flex flex-col h-full"
            >
              <h3 className="font-mono text-[0.7rem] uppercase tracking-wider text-fg-2 mb-1">{book.title}</h3>
              <p className="flex-1 text-fg-3 line-clamp-3">{book.note}</p>
              {book.year && (
                <p className="text-xs text-fg-3 mt-1">
                  {book.year}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </Plate>
  );
}
