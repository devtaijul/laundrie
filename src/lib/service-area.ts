export const ALLOWED_CITIES = [
  "haarlem",
  "heemstede",
  "zandvoort",
  "bloemendaal",
] as const;

export type AllowedCity = (typeof ALLOWED_CITIES)[number];

export function normalizeCity(city: string): string {
  return city.trim().toLowerCase();
}

export function isAllowedCity(city: string): boolean {
  return ALLOWED_CITIES.includes(normalizeCity(city) as AllowedCity);
}

export const ALLOWED_CITIES_DISPLAY = "Haarlem, Heemstede, Zandvoort, and Bloemendaal";
export const SERVICE_AREA_ERROR = `We only serve ${ALLOWED_CITIES_DISPLAY}`;
