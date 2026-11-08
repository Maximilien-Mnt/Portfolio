// Pure, seeded random walk. seed → points. Deterministic: the same seed always
// yields the same path. No Math.random — a seeded LCG (same constants as the
// style-tile prototype) keeps the walk reproducible across renders.
const MUL = 1664525;
const INC = 1013904223;
const MOD = 4294967296; // 2^32

export function walk(seed: number, count = 260): number[] {
  let s = (seed * 9973 + 11) >>> 0;
  const r = () => {
    s = (s * MUL + INC) >>> 0;
    return s / MOD;
  };
  const pts: number[] = [];
  let y = 0;
  for (let i = 0; i < count; i++) {
    y += (r() - 0.5) * 0.14 + 0.002;
    pts.push(y);
  }
  return pts;
}
