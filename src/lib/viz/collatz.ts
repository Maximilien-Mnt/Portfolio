// Pure, unit-testable math for the Collatz conjecture.
// If n is even: n → n/2. If n is odd: n → 3n + 1.
// The conjecture states that starting from any positive integer,
// repeatedly applying this process always reaches 1.

export interface CollatzResult {
  trajectory: number[]; // full sequence from n to 1
  steps: number; // number of steps to reach 1
  peak: number; // maximum value reached in the trajectory
}

/**
 * Generate the full Collatz trajectory starting from n.
 * Returns the sequence [n, next(n), next(next(n)), ..., 1].
 */
export function collatz(n: number): number[] {
  if (n <= 0) {
    throw new Error(`[viz/collatz] n must be a positive integer, got ${n}`);
  }

  const trajectory: number[] = [n];
  let current = n;

  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    trajectory.push(current);
  }

  return trajectory;
}

/**
 * Analyze a Collatz trajectory: compute steps and peak.
 */
export function analyze(trajectory: number[]): CollatzResult {
  const steps = trajectory.length - 1; // number of transitions
  const peak = Math.max(...trajectory);
  return { trajectory, steps, peak };
}

/**
 * Quick check: how many steps to reach 1 from n.
 * Convenience wrapper that doesn't return the full trajectory.
 */
export function stepCount(n: number): number {
  let current = n;
  let steps = 0;
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }
  return steps;
}

/**
 * Find the peak value reached from n in the Collatz trajectory.
 */
export function maxPeak(n: number): number {
  let current = n;
  let peak = n;
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    if (current > peak) {
      peak = current;
    }
  }
  return peak;
}
