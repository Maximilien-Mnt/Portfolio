/**
 * Haversine distance in km between two lat/lon points.
 * Used for the "You are N km from origin" visitor arc.
 */
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
}

/**
 * Capital/labels for each tracked country, used for the visitor arc.
 * Keys match the region keys in src/content/atlas.ts.
 */
export const CountryCaps = {
  UK: { label: "UK", lat: 51.5074, lon: -0.1278 },
  US: { label: "US", lat: 38.9072, lon: -77.0369 },
  CA: { label: "CA", lat: 45.4215, lon: -75.6972 },
  FR: { label: "FR", lat: 48.8566, lon: 2.3522 },
  SG: { label: "SG", lat: 1.3521, lon: 103.8198 },
} as const;

export type CountryKey = keyof typeof CountryCaps;