export interface SearchFormValues {
  keyword: string;
  searchType: string;
}

export interface FiltersFormValues {
  country: string;
  genre: string;
  ageRating: string;
}

export interface MoviesAmountValues {
  amount: number;
}

export interface GetMoviesResponse {
  docs: Doc[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface Doc {
  status: null;
  rating: Rating;
  votes: Votes;
  backdrop: Image;
  movieLength: number;
  id: number;
  type: "animated-series" | "anime" | "cartoon" | "movie" | "tv-series";
  name: string;
  description: string;
  year: number;
  poster: Image;
  genres: Genre[];
  countries: Country[];
  typeNumber: number;
  alternativeName: string | null;
  enName: string | null;
  names: Name[];
  ratingMpaa: string | null;
  shortDescription: string;
  ticketsOnSale: boolean;
  ageRating: number;
  logo: Logo | null;
  top10: null | number;
  top250: null | number;
  isSeries: boolean;
  seriesLength: null | number;
  totalSeriesLength: null | number;
}

interface Rating {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: null | number;
}

interface Votes {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

interface Image {
  url: string;
  previewUrl: string;
}

interface Genre {
  name: string;
}

interface Country {
  name: string;
}

interface Name {
  name: string;
  language?: string;
  type?: string | null;
}

interface Logo {
  url: string;
}

interface CurrencyAmount {
  value: number;
  currency: string;
}

interface ExternalIds {
  imdb: string;
  tmdb: number;
  kpHD: string;
}

interface Ratings {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number | null;
}

interface Votes {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

interface ImageUrls {
  url: string;
  previewUrl: string | null;
}

interface ProductionCompany {
  name: string;
  url: string | null;
  previewUrl: string | null;
}

interface LanguageInfo {
  name: string;
  nameEn: string;
}

interface PremiereDates {
  world: string;
  russia: string;
  bluray: string;
  dvd: string;
}

interface Fact {
  value: string;
  type: string;
  spoiler: boolean;
}

interface Genre {
  name: string;
}

interface Country {
  name: string;
}

export interface Person {
  id: number;
  photo: string;
  name: string;
  enName: string | null;
  description: string | null;
  profession: string;
  enProfession: string;
}

export interface MovieList {
  id: number;
  name: string;
  enName: string | null;
  alternativeName: string;
  type: string;
  poster: ImageUrls;
  year: number;
  rating: Ratings;
}

interface TechnologyInfo {
  hasImax: boolean;
  has3D: boolean;
}

interface StreamingServiceInfo {
  name: string;
  logo: ImageUrls;
  url: string;
}

interface VideoInfo {
  url: string;
  name: string;
  site: string;
  type: string;
}

interface SeasonInfo {
  number: number;
  episodesCount: number;
}
export interface MovieDetail {
  fees: {
    world: CurrencyAmount;
    russia: CurrencyAmount;
    usa: CurrencyAmount;
  };
  status: null;
  externalId: ExternalIds;
  rating: Ratings;
  votes: Votes;
  backdrop: ImageUrls;
  movieLength: number;
  images: {
    postersCount: number;
    backdropsCount: number;
    framesCount: number;
  };
  productionCompanies: ProductionCompany[];
  spokenLanguages: LanguageInfo[];
  id: number;
  type: string;
  name: string;
  description: string;
  distributors: {
    distributor: string;
    distributorRelease: string;
  };
  premiere: PremiereDates;
  slogan: string;
  year: number;
  budget: CurrencyAmount;
  poster: ImageUrls;
  facts: Fact[];
  genres: Genre[];
  countries: Country[];
  seasonsInfo: SeasonInfo[];
  persons: Person[];
  lists: string[];
  typeNumber: number;
  alternativeName: string;
  enName: string | null;
  names: {
    name: string;
    language?: string;
    type?: string;
  }[];
  similarMovies: MovieList[];
  updatedAt: string;
  imagesInfo: {
    framesCount: number;
  };
  sequelsAndPrequels: any[];
  ratingMpaa: string;
  shortDescription: string;
  technology: TechnologyInfo;
  ticketsOnSale: boolean;
  ageRating: number;
  logo: ImageUrls;
  watchability: {
    items: StreamingServiceInfo[];
  };
  top10: null;
  top250: number;
  audience: {
    count: number;
    country: string;
  }[];
  deletedAt: null;
  isSeries: boolean;
  seriesLength: null;
  totalSeriesLength: null;
  networks: null;
  videos: {
    trailers: VideoInfo[];
  };
}

export interface Filters {
  year?: string[];
  genre?: string[];
  country?: string[];
  ageRating?: string[];
}

export interface Review {
  id: number;
  movieId: number;
  title: string;
  type: string;
  review: string;
  date: string;
  author: string;
  userRating: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  docs: Review[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface ImageItem {
  movieId: number;
  type: string;
  url: string;
  previewUrl: string;
  height: number;
  width: number;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface ImagesResponse {
  docs: ImageItem[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface InitialValues {
  name: string;
  slug: string;
}

export type InitialVlue = "countries.name" | "genres.name";

interface ImageInfo {
  url: string | null;
  previewUrl: string | null;
}

export interface Episode {
  number: number;
  name: string;
  enName: string;
  still: ImageInfo;
  duration: number;
  date: string | null;
  description: string;
  airDate: string | null;
  enDescription: string;
}

export interface SpecialMaterials {
  movieId: number;
  number: number;
  episodes: Episode[];
  name: string;
  still: ImageInfo;
  id: string;
}

export interface SeaonsResponse {
  docs: SpecialMaterials[];
  total: number;
  limit: number;
  page: number;
  pages: number;
  poster: ImageInfo;
}
