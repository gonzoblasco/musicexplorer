// lib/utils/constants.ts
// Actualizar el archivo con una lista de IDs conocidos

export const API_CONSTANTS = {
  BASE_URL: "https://www.theaudiodb.com/api/v1/json",
  API_KEY: "2",
  MAX_REQUESTS_PER_SECOND: 2,
};

export const ARTIST_IDS = {
  COLDPLAY: "111239",
  DAFT_PUNK: "112024",
  MADONNA: "111255",
  METALLICA: "111374",
  PINK_FLOYD: "111378",
  QUEEN: "111390",
  THE_BEATLES: "111319",
  MICHAEL_JACKSON: "110011", // Cambiado este ID, el original estaba duplicado
};

export const POPULAR_ARTIST_IDS = Object.values(ARTIST_IDS);

export const UI_CONSTANTS = {
  PAGE_SIZE: 12,
  DEFAULT_IMAGE_PLACEHOLDER: "/images/placeholder.jpg",
};
