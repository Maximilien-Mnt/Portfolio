export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center">
      <h1 className="text-4xl font-display font-bold tracking-tighter signal-ink">
        No point at these coordinates.
      </h1>
      <p className="mt-4 text-fg-2 max-w-lg mx-auto">
        The point you are looking for does not exist on this plane.
      </p>
      <a href="/" className="mt-6 inline-block text-signal-ink hover:underline">
        Return to the origin
      </a>
    </section>
  );
}