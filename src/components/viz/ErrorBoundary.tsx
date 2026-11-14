import React, { ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

type FallbackUI = React.ReactNode;

export class ErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: FallbackUI },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  constructor(props: { children: ReactNode; fallback?: FallbackUI }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const fallback: FallbackUI = this.props.fallback ?? (
        <section className="p-8 bg-bg-2 rounded-lg text-fg">
          <h3 className="text-signal-ink mb-4">
            Something went wrong.
          </h3>
          <p className="text-fg-2">
            An unexpected error occurred. Please try again later.
          </p>
        </section>
      );

      return fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;