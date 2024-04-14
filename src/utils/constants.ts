import { InitialValues } from "./types";

// Типы для поиска
export const filters = [
  {
    value: "name",
    label: "Поиск по названию",
  },
  {
    value: "year",
    label: "Поиск по году",
  },
];

// Количество актеров на страницу
export const ACTORS_PER_PAGE = 10;

// Количество фильмов на страницу
export const INITIAL_MOVIES_PER_PAGE = 10;

// Количество отзывов на страницу
export const REVIEWS_PER_PAGE = 4;

// Количество изображений на страницу
export const IMAGES_PER_PAGE = 3;

// Количество изображений на страницу на мобильных устройствах
export const ONE_ELEMENTS_PER_PAGE = 1;

// Количество изображений на страницу на мобильных устройствах
export const TWO_ELEMENTS_PER_PAGE = 2;

export const BREAKPOINTS = {
  oneElement: "(max-width:704px)",
  twoElements: "(max-width:1093px)",
};

// Брейкпоинты для рейтинга
export const BREAKPOINTS_FOR_RATING = {
  success: 7,
  warning: 4,
};

// Задержка перед отправкой поиского запроса
export const SEARCH_DELAY_MS = 1000;

export const TYPES = {
  "animated-series": "мультсериал",
  anime: "аниме",
  cartoon: "мультфильм",
  movie: "фильм",
  "tv-series": "телесериал",
};

export const AGE_RATINGS: InitialValues[] = [
  { name: "None", slug: "none" },
  { name: "Все", slug: "all" },
  { name: "0+", slug: "0-5" },
  { name: "6+", slug: "6-11" },
  { name: "12+", slug: "12-15" },
  { name: "16+", slug: "16-17" },
  { name: "18+", slug: "18" },
];

export const FILTER_TYPES = {
  ageRating: "Возраст",
  genres: "Жанры",
  countries: "Страны",
};
